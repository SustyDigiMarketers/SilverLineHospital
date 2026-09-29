/**
 * Centralized Navigation Configuration
 * -------------------------------------
 * Single source of truth for navigation links, mobile menu items, and internal route targets.
 */

export interface NavLinkItem {
  name: string;
  href: string;
}

export const mainNavLinks: NavLinkItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/aboutus' },
  { name: 'Specialties', href: '/specialties' },
  { name: 'Media & Events', href: '/media-events' },
  { name: 'Blogs', href: '/blog' },
  { name: 'Packages', href: '/healthpackages' },
  { name: 'Contact', href: '/contactus' },
];

export const quickActionLinks = [
  { label: 'Find Doctor', href: '/doctor' },
  { label: 'Emergency', href: '/emergency' },
  { label: 'Book Appointment', action: 'book-appointment' },
  { label: 'Patient Portal', action: 'patient-portal' },
];

export const routeSectionMap: Record<string, string> = {
  home: 'Home',
  aboutus: 'About',
  about: 'About',
  gallery: 'Media & Events',
  'media-events': 'Media & Events',
  events: 'Media & Events',
  healthpackages: 'Packages',
  packages: 'Packages',
  contactus: 'Contact',
  contact: 'Contact',
  faq: 'Contact',
  doctor: 'Find Doctor',
  doctors: 'Find Doctor',
  emergency: 'Emergency',
  patientportal: 'Patient Portal',
  career: 'Career',
  careers: 'Career',
  international: 'Foreign Patients',
  'foreign-patient': 'Foreign Patients',
  'foreign-patients': 'Foreign Patients',
  blog: 'Blogs',
  blogs: 'Blogs',
  post: 'Blogs',
  specialties: 'Specialties',
  specialities: 'Specialties',
  specialty: 'Specialties',
};
