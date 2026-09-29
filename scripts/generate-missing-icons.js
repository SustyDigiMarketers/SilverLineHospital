import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Brand color matching the existing icons
const COLOR = '#27AFAF';

const icons = [
  {
    num: 24,
    name: 'PAIN & PALLIATIVE CARE',
    // Hands gently cupping and supporting a heart with a medical cross inside
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <path d="M250 140 C220 90 140 90 140 170 C140 240 250 310 250 310 C250 310 360 240 360 170 C360 90 280 90 250 140 Z" fill="${COLOR}" fill-opacity="0.12"/>
      <path d="M250 175 V235 M220 205 H280" stroke-width="18"/>
      <path d="M120 340 C140 310 180 300 220 320 L240 330 C270 345 290 345 320 330" />
      <path d="M100 390 C130 360 170 350 210 365 L250 380 C290 395 330 390 370 360 L400 340" />
      <circle cx="250" cy="80" r="14" fill="${COLOR}"/>
    </svg>`
  },
  {
    num: 25,
    name: 'PSYCHIATRY',
    // Head profile with brain pathways and emotional wellness lotus/spark
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <path d="M180 410 V360 C180 340 170 330 160 310 C140 280 140 210 160 160 C190 90 310 80 350 130 C380 170 380 230 360 270 C350 290 350 300 360 310 L380 330 C390 340 380 360 360 360 H340 L330 410" />
      <!-- Brain / mental neurons -->
      <path d="M240 180 C220 160 250 130 270 150 C290 130 320 160 300 180 C320 200 290 230 270 210 C250 230 220 200 240 180 Z" fill="${COLOR}" fill-opacity="0.15"/>
      <circle cx="270" cy="180" r="18" fill="${COLOR}"/>
      <path d="M220 250 C240 235 270 240 290 225" />
      <circle cx="340" cy="200" r="6" fill="${COLOR}"/>
      <circle cx="210" cy="150" r="6" fill="${COLOR}"/>
      <circle cx="290" cy="120" r="6" fill="${COLOR}"/>
    </svg>`
  },
  {
    num: 26,
    name: 'RECONSTRUCTIVE & PLASTIC SURGERY',
    // Aesthetic facial silhouette with surgical precision contour lines & scalpel indicator
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <path d="M190 100 C270 90 330 140 330 220 C330 290 290 350 250 390 C220 370 190 330 180 290" />
      <path d="M170 190 C190 190 210 200 210 220 C210 240 190 250 170 250" />
      <!-- Contouring dashed guide lines -->
      <path d="M240 170 C270 180 290 200 290 230" stroke-dasharray="10 10"/>
      <path d="M230 270 C260 280 280 300 280 330" stroke-dasharray="10 10"/>
      <!-- Crosshairs / Precision markers -->
      <path d="M280 150 L300 150 M290 140 L290 160" stroke-width="10"/>
      <path d="M310 240 L330 240 M320 230 L320 250" stroke-width="10"/>
      <path d="M260 340 L280 340 M270 330 L270 350" stroke-width="10"/>
      <!-- Caliper / Scalpel instrument -->
      <path d="M130 380 L180 330 L200 350 L150 400 Z" fill="${COLOR}" fill-opacity="0.2"/>
      <path d="M180 330 L240 270" stroke-width="14"/>
    </svg>`
  },
  {
    num: 27,
    name: 'DERMATOLOGY & COSMETIC SURGERY',
    // Skin pore/dermal layer with magnifying dermatoscope and glowing sparkle
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="230" cy="210" r="110" />
      <path d="M310 290 L400 380" stroke-width="26"/>
      <!-- Glowing skin radiance / sparkle inside lens -->
      <path d="M230 140 V280 M160 210 H300" stroke-width="10" stroke-dasharray="8 8"/>
      <circle cx="230" cy="210" r="40" fill="${COLOR}" fill-opacity="0.25"/>
      <!-- Sparkle stars -->
      <path d="M340 120 L350 95 L360 120 L385 130 L360 140 L350 165 L340 140 L315 130 Z" fill="${COLOR}"/>
      <path d="M120 140 L126 125 L132 140 L147 146 L132 152 L126 167 L120 152 L105 146 Z" fill="${COLOR}"/>
      <path d="M100 360 C150 330 200 350 250 330 C300 310 350 330 400 310" stroke-width="12"/>
    </svg>`
  },
  {
    num: 28,
    name: 'ORAL MEDICINE & DENTAL SURGERY',
    // Molar tooth with health protection crest & medical cross
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <path d="M170 120 C130 130 110 180 120 230 C130 280 150 320 180 390 C200 430 220 400 230 350 C240 310 260 310 270 350 C280 400 300 430 320 390 C350 320 370 280 380 230 C390 180 370 130 330 120 C290 110 265 140 250 140 C235 140 210 110 170 120 Z" fill="${COLOR}" fill-opacity="0.15"/>
      <path d="M250 200 V270 M215 235 H285" stroke-width="18"/>
      <!-- Dental sparkle -->
      <path d="M350 100 L356 80 L362 100 L382 106 L362 112 L356 132 L350 112 L330 106 Z" fill="${COLOR}"/>
    </svg>`
  },
  {
    num: 29,
    name: 'OPHTHALMOLOGY',
    // Human eye with pupil, iris, and vision focus crosshair
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <path d="M90 250 C140 150 360 150 410 250 C360 350 140 350 90 250 Z" />
      <circle cx="250" cy="250" r="70" fill="${COLOR}" fill-opacity="0.15"/>
      <circle cx="250" cy="250" r="34" fill="${COLOR}"/>
      <circle cx="265" cy="235" r="10" fill="#FFFFFF"/>
      <path d="M250 110 V150 M250 350 V390 M110 250 H150 M350 250 H390" stroke-width="14"/>
    </svg>`
  },
  {
    num: 30,
    name: 'PEDIATRICS',
    // Baby/child head silhouette with baby footprints and loving heart
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="250" cy="180" r="90" fill="${COLOR}" fill-opacity="0.12"/>
      <!-- Cute baby hair curl -->
      <path d="M250 90 C250 65 270 65 270 80" stroke-width="14"/>
      <!-- Baby eyes and smile -->
      <circle cx="220" cy="170" r="8" fill="${COLOR}"/>
      <circle cx="280" cy="170" r="8" fill="${COLOR}"/>
      <path d="M225 210 Q250 235 275 210" stroke-width="12"/>
      <!-- Baby onesie / chest with heart -->
      <path d="M170 310 C170 270 210 270 250 270 C290 270 330 270 330 310 L350 400 H150 Z" />
      <path d="M250 320 C240 300 215 300 215 325 C215 345 250 370 250 370 C250 370 285 345 285 325 C285 300 260 300 250 320 Z" fill="${COLOR}"/>
    </svg>`
  },
  {
    num: 31,
    name: 'PEDIATRIC SURGERY',
    // Child silhouette with surgical cross & delicate precision instruments
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <!-- Pediatric cross -->
      <path d="M190 140 H310 M250 80 V200" stroke-width="24" stroke="${COLOR}"/>
      <!-- Protective shield / pediatric care boundary -->
      <path d="M130 110 C130 270 250 360 250 420 C250 360 370 270 370 110 Z" fill="${COLOR}" fill-opacity="0.1"/>
      <!-- Scalpel and suture loop -->
      <path d="M180 270 L250 340 M250 340 L320 270" stroke-width="14"/>
      <circle cx="250" cy="270" r="28" fill="${COLOR}"/>
    </svg>`
  },
  {
    num: 32,
    name: 'OBSTETRICS & GYNECOLOGY',
    // Expectant mother silhouette tenderly holding belly with maternal bloom
    svg: `<svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${COLOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <!-- Mother's head -->
      <circle cx="260" cy="110" r="40" fill="${COLOR}" fill-opacity="0.2"/>
      <!-- Torso and pregnant belly -->
      <path d="M230 160 C210 200 200 250 200 300 C200 350 220 400 260 410" />
      <path d="M260 160 C300 200 330 250 330 300 C330 350 280 390 250 410" stroke-width="18"/>
      <!-- Tender hands holding belly -->
      <path d="M220 260 C250 290 290 310 320 290" stroke-width="14"/>
      <!-- Gentle heart on womb -->
      <path d="M265 270 C255 255 235 255 235 275 C235 290 265 310 265 310 C265 310 295 290 295 275 C295 255 275 255 265 270 Z" fill="${COLOR}"/>
    </svg>`
  }
];

async function generate() {
  const targetDir = path.resolve('public/Icons');
  for (const item of icons) {
    const filePath = path.join(targetDir, `${item.num}.png`);
    await sharp(Buffer.from(item.svg))
      .resize(500, 500)
      .png({ compressionLevel: 9 })
      .toFile(filePath);
    console.log(`Generated: ${filePath} for ${item.name}`);
  }
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
