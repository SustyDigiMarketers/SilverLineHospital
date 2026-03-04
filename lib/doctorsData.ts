export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string; // Now a reference key
  shortBio: string;
  fullBio: string;
  philosophy: string;
  expertise: string[];
  social: {
    linkedin: string;
    twitter: string;
  };
}
