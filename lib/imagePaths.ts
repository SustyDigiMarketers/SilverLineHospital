
// VIEW-READY CONFIGURATION
// Using external placeholders to bypass local file loading errors.
// This ensures the application UI/UX is fully visible and testable right now.

const PLACEHOLDER_BASE = 'https://placehold.co';

export const imagePaths = {
  logos: {
    main: `${PLACEHOLDER_BASE}/230x60/0E2A47/ffffff?text=SilverLine+Hospital`,
    white: `${PLACEHOLDER_BASE}/230x60/ffffff/0E2A47?text=SilverLine+Hospital`,
    favicon: `${PLACEHOLDER_BASE}/32x32/00B5A5/ffffff?text=S`,
  },
  hero: {
    slide1: `${PLACEHOLDER_BASE}/1920x1080/0E2A47/ffffff?text=Hero+Compassionate+Care`,
    slide2: `${PLACEHOLDER_BASE}/1920x1080/00B5A5/ffffff?text=Hero+Advanced+Medicine`,
    slide3: `${PLACEHOLDER_BASE}/1920x1080/1d3f7f/ffffff?text=Hero+Patient+Care`,
  },
  about: {
    hero1: `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=About+Mission`,
    hero2: `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=About+Journey`,
    hero3: `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=About+Team`,
    dentist: `${PLACEHOLDER_BASE}/600x800/e2e8f0/0E2A47?text=Dentist+Image`,
  },
  contact: {
    hero: `${PLACEHOLDER_BASE}/1920x600/0E2A47/ffffff?text=Contact+Us`,
  },
  packages: {
    hero: `${PLACEHOLDER_BASE}/1920x600/00B5A5/ffffff?text=Health+Packages`,
  },
  career: {
    hero: `${PLACEHOLDER_BASE}/1920x600/1d3f7f/ffffff?text=Join+Our+Team`,
  },
  statsBar: {
    bg: `${PLACEHOLDER_BASE}/1920x400/111111/333333?text=Background+Pattern`,
  },
  specialties: {
    promo: `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Specialties+Promo`,
    pageHero: `${PLACEHOLDER_BASE}/1920x600/0E2A47/ffffff?text=Our+Specialties`,
    
    cardiologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Cardiology+Department`,
    cardiologyGallery: [
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Cardio+1`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Cardio+2`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Cardio+3`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Cardio+4`,
    ],
    
    cardiothoracicSurgeryHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Cardiothoracic`,
    cardiothoracicSurgeryGallery: [
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=CTS+1`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=CTS+2`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=CTS+3`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=CTS+4`,
    ],

    criticalCareHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Critical+Care`,
    criticalCareGallery: [
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ICU+1`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ICU+2`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ICU+3`,
      `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ICU+4`,
    ],

    entHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=ENT`,
    entGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ENT+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ENT+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ENT+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=ENT+4`,
    ],

    generalMedicineHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=General+Medicine`,
    generalMedicineGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GenMed+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GenMed+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GenMed+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GenMed+4`,
    ],

    generalSurgeryHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=General+Surgery`,
    generalSurgeryGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Surgery+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Surgery+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Surgery+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Surgery+4`,
    ],

    radiationOncologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Radiation+Oncology`,
    radiationOncologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Radiation+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Radiation+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Radiation+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Radiation+4`,
    ],

    surgicalGastroenterologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Surgical+Gastro`,
    surgicalGastroenterologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Gastro+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Gastro+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Gastro+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Gastro+4`,
    ],

    surgicalOncologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Surgical+Oncology`,
    surgicalOncologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=SurgOnco+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=SurgOnco+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=SurgOnco+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=SurgOnco+4`,
    ],

    oncologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Medical+Oncology`,
    oncologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=MedOnco+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=MedOnco+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=MedOnco+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=MedOnco+4`,
    ],

    neurologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Neurology`,
    neurologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Neuro+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Neuro+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Neuro+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Neuro+4`,
    ],

    gastroHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Gastroenterology`,
    gastroGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GastroMed+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GastroMed+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GastroMed+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=GastroMed+4`,
    ],

    orthopedicsHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Orthopedics`,
    orthopedicsGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Ortho+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Ortho+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Ortho+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Ortho+4`,
    ],

    pulmonologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Pulmonology`,
    pulmonologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Pulmo+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Pulmo+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Pulmo+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Pulmo+4`,
    ],

    urologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Urology`,
    urologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Uro+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Uro+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Uro+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Uro+4`,
    ],

    dermatologyHero: `${PLACEHOLDER_BASE}/1200x600/e2e8f0/0E2A47?text=Dermatology`,
    dermatologyGallery: [
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Derma+1`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Derma+2`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Derma+3`,
       `${PLACEHOLDER_BASE}/600x400/e2e8f0/0E2A47?text=Derma+4`,
    ],
  },
  doctors: {
    senthilkumar: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Senthil`,
    hemalatha: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Hemalatha`,
    sivapragash: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Sivapragash`,
    shankar: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Shankar`,
    rahul: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Rahul`,
    khanna: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Khanna`,
    kumar: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Kumar`,
    nirmal: `${PLACEHOLDER_BASE}/400x400/00B5A5/ffffff?text=Dr.+Nirmal`,
  },
  blog: [
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+1`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+2`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+3`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+4`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+5`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+6`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+7`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+8`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+9`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+10`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+11`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+12`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+13`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+14`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+15`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+16`,
    `${PLACEHOLDER_BASE}/800x600/e2e8f0/0E2A47?text=Blog+17`,
  ],
  testimonials: [
    `${PLACEHOLDER_BASE}/100x100/e2e8f0/0E2A47?text=User+1`,
    `${PLACEHOLDER_BASE}/100x100/e2e8f0/0E2A47?text=User+2`,
    `${PLACEHOLDER_BASE}/100x100/e2e8f0/0E2A47?text=User+3`,
  ],
  popups: {
    event: `${PLACEHOLDER_BASE}/600x400/FFC700/000000?text=Special+Event`,
    promo: `${PLACEHOLDER_BASE}/600x400/00B5A5/ffffff?text=Promotion`,
    offer: `${PLACEHOLDER_BASE}/600x400/FF5733/ffffff?text=Limited+Offer`,
    specialOffer: `${PLACEHOLDER_BASE}/600x400/0E2A47/ffffff?text=Special+Offer`,
  },
  whyChooseUs: `${PLACEHOLDER_BASE}/800x800/e2e8f0/0E2A47?text=Why+Choose+Us`,
  internationalPatients: {
    hero: `${PLACEHOLDER_BASE}/1920x600/0E2A47/ffffff?text=International+Patients`,
    collage1: `${PLACEHOLDER_BASE}/400x400/e2e8f0/0E2A47?text=Patient+Care`,
    collage2: `${PLACEHOLDER_BASE}/400x400/e2e8f0/0E2A47?text=Medical+Tech`,
    collage3: `${PLACEHOLDER_BASE}/400x400/e2e8f0/0E2A47?text=Staff`,
  },
  marketing: {
    hero: `${PLACEHOLDER_BASE}/1920x600/00B5A5/ffffff?text=Marketing+Hero`,
    formImage: `${PLACEHOLDER_BASE}/800x1000/e2e8f0/0E2A47?text=Contact+Us`,
  },
  insurancePartners: [
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Aetna`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Cigna`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Humana`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=United`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Anthem`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Kaiser`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=BlueCross`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Allianz`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=MetLife`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Prudential`,
    `${PLACEHOLDER_BASE}/150x80/ffffff/000000?text=Zurich`,
  ],
};
