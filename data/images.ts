/**
 * Centralized Website Image Registry
 * -----------------------------------
 * This module is the single source of truth for all public website images,
 * icons, heroes, doctor portraits, event galleries, and insurance partners.
 * 
 * All website images are served statically from the `/public` root:
 * - Logos: /logo.svg, /logo-white.svg, /favicon.svg
 * - Hero Images: /Hero/
 * - Doctors: /Doctor/
 * - Specialty Icons: /Icons/ (1.png to 32.png, matching the 32 specialties)
 * - Events & Press: /Gallery/Events/ & /Gallery/Press/
 * - Insurance Partners: /Standby/Insurance/ (1.png to 32.png)
 * - Facilities & General: /Standby/ & /Images/
 */

import { imagePaths } from '../lib/imagePaths';
import insuranceLogos from '../lib/insuranceManifest';
import { galleryEvents, pressImages } from '../lib/galleryEventsData';
import { pressReleases } from '../pages/PressRelease/listOfPressRelease';

export const hero = {
  home1: '/Hero/Home1.jpg',
  home2: '/Hero/Home2.jpg',
  home3: '/Hero/Home3.jpg',
  about: '/Hero/About.jpg',
  aboutVideo: '/Standby/slh-story.mp4',
  specialties: '/Hero/Specialties/Specialities.jpg',
  career: '/Hero/Career.jpg',
  blogs: '/Hero/Blogs.jpg',
  contact: '/Hero/Contact.jpg',
  packages: '/Hero/Package.jpg',
  international: '/Hero/international-hero.jpg',
  mediaEvents: '/Standby/02.jpg',
};

/**
 * Centralized mapping for all individual specialty hero images.
 * Sourced exclusively from /public/Hero/Specialties/.
 */
export const specialtyHeroImages = {
  'general-medicine': '/Hero/Specialties/general-medicine.jpg',
  'general-surgery': '/Hero/Specialties/general-surgery.jpg',
  'emergency-medicine': '/Hero/Specialties/emergency-medicine.jpg',
  'critical-care-medicine': '/Hero/Specialties/critical-care-medicine.jpg',
  'medical-oncology': '/Hero/Specialties/medical-oncology.jpg',
  'surgical-oncology': '/Hero/Specialties/surgical-oncology.jpg',
  'radiation-oncology': '/Hero/Specialties/radiation-oncology.jpg',
  'medical-gastroenterology': '/Hero/Specialties/medical-gastroenterology.jpg',
  'surgical-gastroenterology': '/Hero/Specialties/surgical-gastroenterology.jpg',
  'urology': '/Hero/Specialties/urology.jpg',
  'nephrology': '/Hero/Specialties/nephrology.jpg',
  'orthopedics': '/Hero/Specialties/orthopedics.jpg',
  'cardiology': '/Hero/Specialties/cardiology.jpg',
  'cardiothoracic-surgery': '/Hero/Specialties/cardiothoracic-surgery.jpg',
  'neurology': '/Hero/Specialties/neurology.jpg',
  'neuro-surgery': '/Hero/Specialties/neuro-surgery.jpg',
  'spine-surgery': '/Hero/Specialties/spine-surgery.jpg',
  'pulmonology': '/Hero/Specialties/pulmonology.jpg',
  'vascular-surgery': '/Hero/Specialties/vascular-surgery.jpg',
  'ent': '/Hero/Specialties/ent.jpg',
  'robotic-laparoscopic-surgery': '/Hero/Specialties/robotic-laparoscopic-surgery.jpg',
  'transplant-surgery': '/Hero/Specialties/transplant-surgery.jpg',
  'bone-marrow-transplant': '/Hero/Specialties/bone-marrow-transplant.jpg',
  'pain-palliative-care': '/Hero/Specialties/pain-palliative-care.jpg',
  'psychiatry': '/Hero/Specialties/psychiatry.jpg',
  'reconstructive-plastic-surgery': '/Hero/Specialties/reconstructive-plastic-surgery.jpg',
  'dermatology-cosmetic-surgery': '/Hero/Specialties/dermatology-cosmetic-surgery.jpg',
  'oral-medicine-dental-surgery': '/Hero/Specialties/oral-medicine-dental-surgery.jpg',
  'ophthalmology': '/Hero/Specialties/ophthalmology.jpg',
  'pediatrics': '/Hero/Specialties/pediatrics.jpg',
  'pediatric-surgery': '/Hero/Specialties/pediatric-surgery.jpg',
  'obstetrics-gynaecology': '/Hero/Specialties/obstetrics-gynaecology.jpg',

  // Common aliases
  'oncology': '/Hero/Specialties/medical-oncology.jpg',
  'gastroenterology': '/Hero/Specialties/medical-gastroenterology.jpg',
  'dermatology': '/Hero/Specialties/dermatology-cosmetic-surgery.jpg',
  'dental': '/Hero/Specialties/oral-medicine-dental-surgery.jpg',
  'gynaecology': '/Hero/Specialties/obstetrics-gynaecology.jpg',
} as const;

export type SpecialtyHeroKey = keyof typeof specialtyHeroImages;

export const getSpecialtyHeroImage = (id: string): string => {
  if (id && id in specialtyHeroImages) {
    return specialtyHeroImages[id as SpecialtyHeroKey];
  }
  return hero.specialties;
};

export const images = {
  // Brand Logos
  logos: {
    main: '/logo.svg',
    white: '/logo-white.svg',
    favicon: '/favicon.svg',
  },

  // Main Page Hero Headers
  hero,

  // Key Doctor Portraits
  doctors: {
    senthilkumar: '/Doctor/Dr.G.Senthilkumar.jpg',
    hemalatha: '/Doctor/Dr.G.Hemalatha.jpg',
    sivapragash: '/Doctor/Dr.S.Sivapragash.jpg',
    shankar: '/Doctor/Dr.S.Shankar.jpg',
    rahul: '/Doctor/Dr.M.G.Rahul.jpg',
    vishnukumar: '/Doctor/Dr.S.Vishnukumar.jpg',
    naveenSundaram: '/Doctor/Dr.NaveenSundaram.jpg',
    ramamoorthi: '/Doctor/Dr.P.Ramamoorthi.jpg',
  },

  // 1–32 Specialty Icons matching exactly the 32 departments
  specialtyIcons: Array.from({ length: 32 }, (_, i) => `/Icons/${i + 1}.png`),

  // Standby & Infrastructure (Mapped exclusively to existing public/Standby/*.jpg files)
  facilities: {
    ourCommitment: '/Standby/Our Commitment.jpg',
    clinicalInfrastructure: '/Standby/DSC_9806.jpg',
    statsBg: '/Standby/stats-bg.jpg',
    whyChooseUs: '/Standby/Our Commitment.jpg',
    stateOfTheArtFacilities: '/Standby/DSC_9806.jpg',
  },

  // Dynamic Folder-Driven Collections
  events: {
    directory: '/Gallery/Events',
    items: galleryEvents,
  },

  press: {
    directory: '/Gallery/Press',
    images: pressImages,
    articles: pressReleases,
  },

  insurance: {
    directory: '/Standby/Insurance',
    logos: insuranceLogos,
  },

  // Popup Advertisements Registry
  popupAds: undefined as any, // assigned below

  // Standby Section Image Mapping (Single Source of Truth)
  standbySections: undefined as any, // assigned below

  // Full configuration tree for component binding
  config: imagePaths,
};

/**
 * Single source of truth for all section-specific Standby images.
 * All paths verified against actual files in /public/Standby/ and /public/Doctor/.
 */
export const standbyImages = {
  globalExcellence: '/Standby/Global.jpg',
  medicalExcellence: '/Standby/stats-bg.jpg',
  mediaEvents: '/Standby/02.jpg',
  whyChooseUs: '/Standby/Our Commitment.jpg',
  ourStory: '/Standby/Reception.jpg',
  managingDirectorMessage: '/Standby/MD.jpg',
  commitmentToCare: '/Standby/Dial.jpg',
  stateOfTheArtFacilities: '/Standby/02.jpg',
  patientsVisitors: '/Standby/Patient PTL.jpg',
} as const;

/**
 * Dedicated media assets (videos) separated from image fallback logic.
 */
export const mediaAssets = {
  ourStoryVideo: '/Standby/Story.mp4',
  fallbackVideo: '',
  aboutHeroVideo: '/Standby/About.mp4',
} as const;

/**
 * Dedicated popup ads image registry.
 * Strictly contains ONLY image paths from /public/Standby/Popup/.
 */
export const popupAds = [
  '/Standby/Popup/1.jpg',
  '/Standby/Popup/2.jpg',
  '/Standby/Popup/3.jpg',
  '/Standby/Popup/4.jpg',
] as const;

images.popupAds = popupAds;
images.standbySections = standbyImages;
(images as any).specialtyHeroImages = specialtyHeroImages;

export { imagePaths };
export default images;
