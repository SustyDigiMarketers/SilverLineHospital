/**
 * Press Release Data Source
 * -------------------------
 * Central list of all press releases.
 * Add new entries here — Blog sidebar will automatically show the latest 6.
 * No need to modify components/Blog.tsx when adding new press releases.
 */

export interface PressRelease {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO format: YYYY-MM-DD
  image: string;
  content?: string;
}

export const pressReleases: PressRelease[] = [
  {
    id: 'pr-001',
    slug: 'silverline-launches-robotic-surgery-program',
    title: 'SilverLine Hospital Launches Advanced Robotic Surgery Program',
    excerpt:
      'SilverLine Hospital announces the launch of its state-of-the-art robotic surgery program, bringing minimally invasive surgical precision to patients in Trichy and Tamil Nadu.',
    date: '2026-07-28',
    image: '/Gallery/Press/01.jpg',
  },
  {
    id: 'pr-002',
    slug: 'silverline-expands-cath-lab-services',
    title: 'Expanded Cath Lab Services Now Available at SilverLine',
    excerpt:
      'SilverLine Hospital expands its cardiac catheterization laboratory with next-generation equipment, enhancing capabilities for complex coronary interventions.',
    date: '2026-07-15',
    image: '/Gallery/Press/02.jpg',
  },
  {
    id: 'pr-003',
    slug: 'silverline-free-cancer-screening-camp',
    title: 'Free Cancer Screening Camp — August 2026',
    excerpt:
      'SilverLine Hospital Oncology Department hosts a free cancer awareness and early detection camp open to all residents of Trichy district.',
    date: '2026-07-05',
    image: '/Gallery/Press/03.jpg',
  },
  {
    id: 'pr-004',
    slug: 'silverline-best-multispeciality-award',
    title: 'SilverLine Receives Best Multi-Speciality Hospital Award',
    excerpt:
      'SilverLine Hospital has been honoured with the Best Multi-Speciality Hospital Award 2026 by the Tamil Nadu Healthcare Excellence Council.',
    date: '2026-06-20',
    image: '/Gallery/Press/04.jpg',
  },
  {
    id: 'pr-005',
    slug: 'silverline-kidney-transplant-milestone',
    title: '100th Successful Kidney Transplant Milestone Achieved',
    excerpt:
      'SilverLine Hospital\'s Nephrology and Urology teams celebrate the 100th successful kidney transplant, reaffirming the hospital\'s leadership in organ transplantation.',
    date: '2026-06-01',
    image: '/Gallery/Press/05.jpg',
  },
  {
    id: 'pr-006',
    slug: 'silverline-digital-health-initiative',
    title: 'SilverLine Launches Digital Health & Patient Portal Initiative',
    excerpt:
      'A new era of patient experience begins as SilverLine Hospital rolls out its integrated Digital Health platform, enabling seamless appointment booking and health record access.',
    date: '2026-05-15',
    image: '/Gallery/Press/06.jpg',
  },
  {
    id: 'pr-007',
    slug: 'silverline-mammography-unit-inauguration',
    title: 'State-of-the-Art Mammography Unit Inaugurated',
    excerpt:
      'SilverLine Hospital inaugurates its new 3D digital mammography unit as part of its commitment to early breast cancer detection and women\'s health.',
    date: '2026-04-22',
    image: '/Gallery/Press/07.jpg',
  },
];
