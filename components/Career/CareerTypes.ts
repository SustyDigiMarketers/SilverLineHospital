export interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experienceLevel?: string;
  experience?: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  salary?: string | number;
  salaryType?: string;
  applicants?: number;
  postedAgo?: string;
  tags?: string[];
  urgent?: boolean;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  experienceYears: string;
  currentRole: string;
  noticePeriod: string;
  coverNote: string;
  resumeFileName?: string;
  resumeFileSize?: string;
}

export interface WhyJoinHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CultureStat {
  label: string;
  value: string;
}

export interface CareerFAQItem {
  question: string;
  answer: string;
}
