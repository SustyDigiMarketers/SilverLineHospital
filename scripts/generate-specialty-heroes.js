import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputDir = path.resolve('public/Hero/Specialties');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Copy Specialities.jpg to public/Hero/Specialties/Specialities.jpg
const srcSpecialities = path.resolve('public/Hero/Specialities.jpg');
if (fs.existsSync(srcSpecialities)) {
  fs.copyFileSync(srcSpecialities, path.join(outputDir, 'Specialities.jpg'));
  fs.copyFileSync(srcSpecialities, path.join(outputDir, 'Specialties.jpg'));
  console.log('Copied main Specialities.jpg to public/Hero/Specialties/');
}

// 2. Specialty IDs list matching data/specialties.ts in order 1-32
const specialties = [
  { id: 'general-medicine', num: 1, name: 'General Medicine' },
  { id: 'general-surgery', num: 2, name: 'General Surgery' },
  { id: 'emergency-medicine', num: 3, name: 'Emergency Medicine' },
  { id: 'critical-care-medicine', num: 4, name: 'Critical Care Medicine' },
  { id: 'medical-oncology', num: 5, name: 'Medical Oncology' },
  { id: 'surgical-oncology', num: 6, name: 'Surgical Oncology' },
  { id: 'radiation-oncology', num: 7, name: 'Radiation Oncology' },
  { id: 'medical-gastroenterology', num: 8, name: 'Medical Gastroenterology' },
  { id: 'surgical-gastroenterology', num: 9, name: 'Surgical Gastroenterology' },
  { id: 'urology', num: 10, name: 'Urology' },
  { id: 'nephrology', num: 11, name: 'Nephrology' },
  { id: 'orthopedics', num: 12, name: 'Orthopedics' },
  { id: 'cardiology', num: 13, name: 'Cardiology' },
  { id: 'cardiothoracic-surgery', num: 14, name: 'Cardiothoracic Surgery' },
  { id: 'neurology', num: 15, name: 'Neurology' },
  { id: 'neuro-surgery', num: 16, name: 'Neuro Surgery' },
  { id: 'spine-surgery', num: 17, name: 'Spine Surgery' },
  { id: 'pulmonology', num: 18, name: 'Pulmonology' },
  { id: 'vascular-surgery', num: 19, name: 'Vascular Surgery' },
  { id: 'ent', num: 20, name: 'ENT' },
  { id: 'robotic-laparoscopic-surgery', num: 21, name: 'Robotic & Laparoscopic Surgery' },
  { id: 'transplant-surgery', num: 22, name: 'Transplant Surgery' },
  { id: 'bone-marrow-transplant', num: 23, name: 'Bone Marrow Transplant' },
  { id: 'pain-palliative-care', num: 24, name: 'Pain & Palliative Care' },
  { id: 'psychiatry', num: 25, name: 'Psychiatry' },
  { id: 'reconstructive-plastic-surgery', num: 26, name: 'Reconstructive & Plastic Surgery' },
  { id: 'dermatology-cosmetic-surgery', num: 27, name: 'Dermatology & Cosmetic Surgery' },
  { id: 'oral-medicine-dental-surgery', num: 28, name: 'Oral Medicine & Dental Surgery' },
  { id: 'ophthalmology', num: 29, name: 'Ophthalmology' },
  { id: 'pediatrics', num: 30, name: 'Pediatrics' },
  { id: 'pediatric-surgery', num: 31, name: 'Pediatric Surgery' },
  { id: 'obstetrics-gynaecology', num: 32, name: 'Obstetrics & Gynaecology' }
];

const WIDTH = 1920;
const HEIGHT = 800;

async function generateHero(specialty) {
  const iconPath = path.resolve(`public/Icons/${specialty.num}.png`);
  let iconBuffer = null;
  if (fs.existsSync(iconPath)) {
    try {
      iconBuffer = await sharp(iconPath)
        .resize(320, 320, { fit: 'contain' })
        .png()
        .toBuffer();
    } catch (e) {
      console.warn(`Could not process icon for ${specialty.id}:`, e);
    }
  }

  // Base SVG with luxury clinical dark gradient, tech grid, and ambient glowing cyan/teal medical orb
  const svgOverlay = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="75%" cy="40%" r="55%" fx="70%" fy="35%">
          <stop offset="0%" stop-color="#00B5A5" stop-opacity="0.35"/>
          <stop offset="50%" stop-color="#0E2A47" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#081829" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0E2A47"/>
          <stop offset="60%" stop-color="#091b2e"/>
          <stop offset="100%" stop-color="#040d17"/>
        </linearGradient>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00B5A5" stroke-width="1" stroke-opacity="0.06"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      <!-- Soft ambient medical line accent -->
      <path d="M0 680 C400 640 800 720 1200 660 C1600 600 1800 650 1920 620" fill="none" stroke="#00B5A5" stroke-width="3" stroke-opacity="0.25"/>
    </svg>
  `;

  const composites = [
    { input: Buffer.from(svgOverlay), top: 0, left: 0 }
  ];

  if (iconBuffer) {
    // Composite watermark icon on the right side
    composites.push({
      input: iconBuffer,
      top: 240,
      left: 1400,
      blend: 'over'
    });
  }

  const outputPath = path.join(outputDir, `${specialty.id}.jpg`);
  const numberedPath = path.join(outputDir, `${specialty.num}.jpg`);

  const imgBuffer = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: { r: 14, g: 42, b: 71 }
    }
  })
  .composite(composites)
  .jpeg({ quality: 88, progressive: true })
  .toBuffer();

  fs.writeFileSync(outputPath, imgBuffer);
  fs.writeFileSync(numberedPath, imgBuffer);
  console.log(`Generated: ${specialty.id}.jpg & ${specialty.num}.jpg`);
}

async function run() {
  console.log('Generating 32 specialty hero images in public/Hero/Specialties/...');
  for (const s of specialties) {
    await generateHero(s);
  }
  console.log('Successfully generated all specialty hero images!');
}

run().catch(err => {
  console.error('Failed generating specialty heroes:', err);
  process.exit(1);
});
