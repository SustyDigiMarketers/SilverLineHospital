/**
 * Centralized Doctors Data — Single Source of Truth
 * --------------------------------------------------
 * Verified medical practitioner and specialist directory for SilverLine Hospital.
 * Synced with Hospital Credentialing & Privileging (C&P) records.
 * Total Active Specialists: 43
 */

export interface Doctor {
  id: string;
  name: string;
  designation: string;
  department: string;
  specialties: string[];
  qualifications: string[];
  rawQualifications?: string;
  experience?: string;
  image: string;
  bio: string;
  role?: string | null;
  languages?: string[];
  // Compatibility fields for UI components
  specialty: string;
  shortBio: string;
  fullBio: string;
  philosophy?: string;
  expertise?: string[];
  regNo?: string;
  regDate?: string;
  renewalDate?: string;
  corePrivileges?: string[];
  proceduralPrivileges?: string[];
  specialPrivileges?: string[];
  social?: {
    linkedin: string;
    twitter: string;
  };
}

export const doctorsList: Doctor[] = [
  {
    "id": "g-senthilkumar",
    "name": "Dr. G. Senthilkumar",
    "designation": "Managing Director & Senior Consultant Surgical Oncologist",
    "department": "Surgical Oncology",
    "specialties": [
      "surgical-oncology",
      "robotic-laparoscopic-surgery"
    ],
    "qualifications": [
      "MS.",
      "DNB.",
      "MCh (Surgical Oncology)",
      "FIAGES",
      "FARIS"
    ],
    "rawQualifications": "MS., DNB., MCh (Surgical Oncology), FIAGES, FARIS",
    "experience": "28+ Years Experience",
    "image": "/Doctor/Dr.G.Senthilkumar.jpg",
    "bio": "Dr. G. Senthilkumar is the Managing Director and Senior Consultant Surgical Oncologist at SilverLine Hospital. With over two decades of surgical oncology experience, he has pioneered complex cancer resections, minimally invasive oncologic surgery, and organ-preserving cancer treatments in Central Tamil Nadu.",
    "role": "Managing Director",
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Managing Director & Senior Surgical Oncologist",
    "shortBio": "Dr. G. Senthilkumar is a renowned Managing Director & Senior Consultant Surgical Oncologist in the Department of Surgical Oncology at SilverLine Multispeciality Hospital Trichy with MS., DNB., MCh (Surgical Oncology), FIAGES, FARIS credentials.",
    "fullBio": "Dr. G. Senthilkumar is the Managing Director and Senior Consultant Surgical Oncologist at SilverLine Hospital. With over two decades of surgical oncology experience, he has pioneered complex cancer resections, minimally invasive oncologic surgery, and organ-preserving cancer treatments in Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Advanced laparoscopic & GI endosurgery (FIAGES certified)",
      "Advanced robotic & laparoscopic surgery (FARIS certified)",
      "Diagnostic & excisional biopsy",
      "Axillary clearance & sentinel lymph node biopsy",
      "Thyroidectomy  & central/lateral neck dissection",
      "Upper & lower GI cancer resections"
    ],
    "regNo": "60978",
    "regDate": "23-Feb-1998",
    "renewalDate": "22-Jan-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & discharge of oncosurgical patients",
      "Multidisciplinary tumour board presentation & treatment planning",
      "Pre-operative staging workup & fitness clearance coordination",
      "Post-operative critical/ward care of oncosurgical patients"
    ],
    "proceduralPrivileges": [
      "Diagnostic & excisional biopsy (core needle / open / incisional)",
      "Breast surgery: modified radical mastectomy, breast conservation surgery, oncoplasty",
      "Axillary clearance & sentinel lymph node biopsy",
      "Thyroidectomy (total/hemi) & central/lateral neck dissection",
      "Upper & lower GI cancer resections (gastrectomy, oesophagectomy, colorectal resection)",
      "Hepato-pancreatico-biliary cancer resections (Whipple's, hepatectomy)",
      "Soft-tissue & retroperitoneal sarcoma resection",
      "Cytoreductive surgery with HIPEC",
      "Laparoscopic/minimally invasive oncologic resections",
      "Peritonectomy & advanced abdominal oncosurgery",
      "Management of surgical oncologic emergencies (bleed, perforation, obstruction)"
    ],
    "specialPrivileges": [
      "Advanced laparoscopic & GI endosurgery (FIAGES certified)",
      "Advanced robotic & laparoscopic surgery (FARIS certified)"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "g-hemalatha",
    "name": "Dr. G. Hemalatha",
    "designation": "Executive Director & Consultant Onco Pathologist",
    "department": "Pathology",
    "specialties": [
      "medical-oncology",
      "surgical-oncology"
    ],
    "qualifications": [
      "MD (Pathology)"
    ],
    "rawQualifications": "MD (Pathology)",
    "experience": "23+ Years Experience",
    "image": "/Doctor/Dr.G.Hemalatha.jpg",
    "bio": "Dr. G. Hemalatha is the Executive Director and Consultant Onco Pathologist at SilverLine Hospital. Specializing in oncopathology, histopathology, and advanced laboratory medicine, she spearheads the diagnostic excellence and clinical governance of the hospital.",
    "role": "Executive Director",
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Executive Director & Onco Pathologist",
    "shortBio": "Dr. G. Hemalatha is a renowned Executive Director & Consultant Onco Pathologist in the Department of Pathology at SilverLine Multispeciality Hospital Trichy with MD (Pathology) credentials.",
    "fullBio": "Dr. G. Hemalatha is the Executive Director and Consultant Onco Pathologist at SilverLine Hospital. Specializing in oncopathology, histopathology, and advanced laboratory medicine, she spearheads the diagnostic excellence and clinical governance of the hospital.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Histopathological diagnosis & staging  reporting",
      "Intra-operative frozen section diagnosis"
    ],
    "regNo": "71875",
    "regDate": "17-Mar-2003",
    "renewalDate": "27-Jan-2026",
    "corePrivileges": [
      "Sign-out authority for all surgical pathology reports",
      "Participation in tumour board / MDT for pathological correlation",
      "Quality assurance oversight of histopathology & cytology laboratory"
    ],
    "proceduralPrivileges": [
      "Gross examination & sectioning of surgical/oncologic specimens",
      "Histopathological diagnosis & staging (TNM) reporting",
      "Fine Needle Aspiration Cytology (FNAC) - performance & reporting",
      "Intra-operative frozen section diagnosis",
      "Immunohistochemistry (IHC) panel selection & interpretation",
      "Bone marrow aspirate/biopsy cytomorphology reporting",
      "Special stains & molecular pathology correlation reporting"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "s-sivapragash",
    "name": "Dr. S. Sivapragash",
    "designation": "Consultant Surgical Oncologist",
    "department": "Surgical Oncology",
    "specialties": [
      "surgical-oncology",
      "robotic-laparoscopic-surgery"
    ],
    "qualifications": [
      "MS.",
      "MCh (Surgical Oncology).",
      "FMAS"
    ],
    "rawQualifications": "MS., MCh (Surgical Oncology)., FMAS",
    "experience": "13+ Years Experience",
    "image": "/Doctor/Dr.S.Sivapragash.jpg",
    "bio": "Dr. S. Sivapragash serves as Consultant Surgical Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (Surgical Oncology)., FMAS), Dr. S. Sivapragash brings extensive clinical mastery in Surgical Oncology. Registered with medical council registration number 101534, Dr. S. Sivapragash is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Surgical Oncologist",
    "shortBio": "Dr. S. Sivapragash is a renowned Consultant Surgical Oncologist in the Department of Surgical Oncology at SilverLine Multispeciality Hospital Trichy with MS., MCh (Surgical Oncology)., FMAS credentials.",
    "fullBio": "Dr. S. Sivapragash serves as Consultant Surgical Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (Surgical Oncology)., FMAS), Dr. S. Sivapragash brings extensive clinical mastery in Surgical Oncology. Registered with medical council registration number 101534, Dr. S. Sivapragash is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Minimal access surgery (FMAS certified)",
      "Diagnostic & excisional biopsy",
      "Axillary clearance & sentinel lymph node biopsy",
      "Thyroidectomy  & central/lateral neck dissection",
      "Upper & lower GI cancer resections",
      "Hepato-pancreatico-biliary cancer resections"
    ],
    "regNo": "101534",
    "regDate": "08-May-2013",
    "renewalDate": "18-May-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & discharge of oncosurgical patients",
      "Multidisciplinary tumour board presentation & treatment planning",
      "Pre-operative staging workup & fitness clearance coordination",
      "Post-operative critical/ward care of oncosurgical patients"
    ],
    "proceduralPrivileges": [
      "Diagnostic & excisional biopsy (core needle / open / incisional)",
      "Breast surgery: modified radical mastectomy, breast conservation surgery, oncoplasty",
      "Axillary clearance & sentinel lymph node biopsy",
      "Thyroidectomy (total/hemi) & central/lateral neck dissection",
      "Upper & lower GI cancer resections (gastrectomy, oesophagectomy, colorectal resection)",
      "Hepato-pancreatico-biliary cancer resections (Whipple's, hepatectomy)",
      "Soft-tissue & retroperitoneal sarcoma resection",
      "Cytoreductive surgery with HIPEC",
      "Laparoscopic/minimally invasive oncologic resections",
      "Peritonectomy & advanced abdominal oncosurgery",
      "Management of surgical oncologic emergencies (bleed, perforation, obstruction)"
    ],
    "specialPrivileges": [
      "Minimal access surgery (FMAS certified)"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "s-shankar",
    "name": "Dr. S. Shankar",
    "designation": "Consultant Surgical Gastroenterologist",
    "department": "Surgical Gastroenterology",
    "specialties": [
      "surgical-gastroenterology",
      "medical-gastroenterology"
    ],
    "qualifications": [
      "MS.",
      "MCh (SGE)"
    ],
    "rawQualifications": "MS., MCh (SGE)",
    "experience": "15+ Years Experience",
    "image": "/Doctor/Dr.S.Shankar.jpg",
    "bio": "Dr. S. Shankar serves as Consultant Surgical Gastroenterologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (SGE)), Dr. S. Shankar brings extensive clinical mastery in Surgical Gastroenterology. Registered with medical council registration number 94000, Dr. S. Shankar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Surgical Gastroenterologist",
    "shortBio": "Dr. S. Shankar is a renowned Consultant Surgical Gastroenterologist in the Department of Surgical Gastroenterology at SilverLine Multispeciality Hospital Trichy with MS., MCh (SGE) credentials.",
    "fullBio": "Dr. S. Shankar serves as Consultant Surgical Gastroenterologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (SGE)), Dr. S. Shankar brings extensive clinical mastery in Surgical Gastroenterology. Registered with medical council registration number 94000, Dr. S. Shankar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Laparoscopic cholecystectomy & CBD exploration",
      "Pancreatic surgery",
      "Coloproctology",
      "Bariatric & metabolic surgery",
      "Hernia repair - open & laparoscopic",
      "Splenectomy"
    ],
    "regNo": "94000",
    "regDate": "06-Jun-2011",
    "renewalDate": "26-Jan-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Emergency on-call cover for acute abdomen/GI bleed",
      "Tumour board participation for GI malignancies"
    ],
    "proceduralPrivileges": [
      "Laparoscopic cholecystectomy & CBD exploration",
      "Hepatic resections (segmentectomy/hepatectomy) for benign & malignant disease",
      "Pancreatic surgery (Whipple's procedure, distal pancreatectomy, necrosectomy)",
      "Coloproctology",
      "Colorectal resections incl. laparoscopic/robotic-assisted (as credentialed)",
      "Bariatric & metabolic surgery (sleeve gastrectomy, bypass)",
      "Hernia repair - open & laparoscopic (inguinal, incisional, hiatal)",
      "Splenectomy (open/laparoscopic)",
      "Upper GI surgery incl. oesophagectomy & anti-reflux surgery",
      "Emergency laparotomy for perforation/obstruction/trauma"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "m-g-rahul",
    "name": "Dr. M.G. Rahul",
    "designation": "Consultant Radiation Oncologist",
    "department": "Radiation Oncology",
    "specialties": [
      "radiation-oncology",
      "pain-palliative-care"
    ],
    "qualifications": [
      "DMRT.",
      "DNB. CCEPC"
    ],
    "rawQualifications": "DMRT., DNB. CCEPC",
    "experience": "13+ Years Experience",
    "image": "/Doctor/Dr.M.G.Rahul.jpg",
    "bio": "Dr. M.G. Rahul serves as Consultant Radiation Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DMRT., DNB. CCEPC), Dr. M.G. Rahul brings extensive clinical mastery in Radiation Oncology. Registered with medical council registration number 102076, Dr. M.G. Rahul is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Radiation Oncologist",
    "shortBio": "Dr. M.G. Rahul is a renowned Consultant Radiation Oncologist in the Department of Radiation Oncology at SilverLine Multispeciality Hospital Trichy with DMRT., DNB. CCEPC credentials.",
    "fullBio": "Dr. M.G. Rahul serves as Consultant Radiation Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DMRT., DNB. CCEPC), Dr. M.G. Rahul brings extensive clinical mastery in Radiation Oncology. Registered with medical council registration number 102076, Dr. M.G. Rahul is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Certificate course in palliative/pain care oncology management",
      "Stereotactic Radiosurgery / Radiotherapy",
      "Palliative & emergency radiotherapy",
      "Radiotherapy contouring  & dose prescription"
    ],
    "regNo": "102076",
    "regDate": "17-May-2013",
    "renewalDate": "03-Jun-2031",
    "corePrivileges": [
      "OP consultation, radiotherapy treatment planning & simulation sign-off",
      "Tumour board presentation & combined-modality treatment planning",
      "On-treatment review & toxicity management of RT patients"
    ],
    "proceduralPrivileges": [
      "External Beam Radiotherapy - 2D/3D-CRT prescription & verification",
      "IMRT / IGRT / VMAT treatment planning & delivery sign-off",
      "Stereotactic Radiosurgery / Radiotherapy (SRS/SBRT)",
      "High/Low Dose Rate Brachytherapy - intracavitary & interstitial",
      "Palliative & emergency radiotherapy (cord compression, SVC obstruction, bone mets)",
      "Radiotherapy contouring (GTV/CTV/PTV) & dose prescription"
    ],
    "specialPrivileges": [
      "Certificate course in palliative/pain care oncology management"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "r-k-vinodh-khanna",
    "name": "Dr. R.K. Vinodh Khanna",
    "designation": "Consultant Urologist, Andrologist, Transplant Surgeon",
    "department": "Urology",
    "specialties": [
      "urology",
      "transplant-surgery"
    ],
    "qualifications": [
      "MS.",
      "DNB.",
      "DNB (Uro)"
    ],
    "rawQualifications": "MS., DNB., DNB (Uro)",
    "experience": "28+ Years Experience",
    "image": "/Doctor/DrRKVinodhKhanna.jpg",
    "bio": "Dr. R.K. Vinodh Khanna serves as Consultant Urologist, Andrologist, Transplant Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., DNB., DNB (Uro)), Dr. R.K. Vinodh Khanna brings extensive clinical mastery in Urology. Registered with medical council registration number 61064, Dr. R.K. Vinodh Khanna is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Urologist, Andrologist, Transplant Surgeon",
    "shortBio": "Dr. R.K. Vinodh Khanna is a renowned Consultant Urologist, Andrologist, Transplant Surgeon in the Department of Urology at SilverLine Multispeciality Hospital Trichy with MS., DNB., DNB (Uro) credentials.",
    "fullBio": "Dr. R.K. Vinodh Khanna serves as Consultant Urologist, Andrologist, Transplant Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., DNB., DNB (Uro)), Dr. R.K. Vinodh Khanna brings extensive clinical mastery in Urology. Registered with medical council registration number 61064, Dr. R.K. Vinodh Khanna is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "TURP / TURBT",
      "URS  & RIRS",
      "PCNL",
      "Laparoscopic urologic surgery",
      "Radical uro-oncologic surgery",
      "Renal transplantation surgery"
    ],
    "regNo": "61064",
    "regDate": "27-Feb-1998",
    "renewalDate": "04-Feb-2026",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Emergency on-call cover for urologic emergencies (retention, torsion, trauma)"
    ],
    "proceduralPrivileges": [
      "Cystoscopy, DJ stenting, urethral catheterisation/dilatation",
      "TURP / TURBT (transurethral resection procedures)",
      "URS (ureterorenoscopy) & RIRS (retrograde intrarenal surgery)",
      "PCNL (percutaneous nephrolithotomy)",
      "Laparoscopic urologic surgery (nephrectomy, pyeloplasty, prostatectomy)",
      "Radical uro-oncologic surgery (radical cystectomy/prostatectomy/nephrectomy)",
      "Renal transplantation surgery (donor & recipient)",
      "Andrology procedures (varicocelectomy, vasectomy/reversal, penile implants)",
      "Robotic-assisted urologic surgery (subject to separate robotic credentialing)"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "s-vishnukumar",
    "name": "Dr. S. Vishnukumar",
    "designation": "Consultant Laparoscopic & General Surgeon",
    "department": "General & Laparoscopic Surgery",
    "specialties": [
      "general-surgery",
      "robotic-laparoscopic-surgery"
    ],
    "qualifications": [
      "MS.",
      "FMAS.",
      "FALS.",
      "FIAGES.",
      "Dip.Lap.Surgery"
    ],
    "rawQualifications": "MS., FMAS., FALS., FIAGES., Dip.Lap.Surgery",
    "experience": "19+ Years Experience",
    "image": "/Doctor/Dr.S.Vishnukumar.jpg",
    "bio": "Dr. S. Vishnukumar serves as Consultant Laparoscopic & General Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., FMAS., FALS., FIAGES., Dip.Lap.Surgery), Dr. S. Vishnukumar brings extensive clinical mastery in General & Laparoscopic Surgery. Registered with medical council registration number 81627, Dr. S. Vishnukumar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Laparoscopic & General Surgeon",
    "shortBio": "Dr. S. Vishnukumar is a renowned Consultant Laparoscopic & General Surgeon in the Department of General & Laparoscopic Surgery at SilverLine Multispeciality Hospital Trichy with MS., FMAS., FALS., FIAGES., Dip.Lap.Surgery credentials.",
    "fullBio": "Dr. S. Vishnukumar serves as Consultant Laparoscopic & General Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., FMAS., FALS., FIAGES., Dip.Lap.Surgery), Dr. S. Vishnukumar brings extensive clinical mastery in General & Laparoscopic Surgery. Registered with medical council registration number 81627, Dr. S. Vishnukumar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Advanced laparoscopic & GI endosurgery (FIAGES certified)",
      "Minimal access surgery (FMAS certified)",
      "Advanced laparoscopic surgery (FALS certified)",
      "Diploma-level laparoscopic surgical procedures",
      "Laparoscopic cholecystectomy",
      "Laparoscopic & open hernia repair"
    ],
    "regNo": "81627",
    "regDate": "04-Jul-2007",
    "renewalDate": "22-Jan-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Emergency general surgical on-call cover"
    ],
    "proceduralPrivileges": [
      "Laparoscopic cholecystectomy",
      "Laparoscopic & open hernia repair (inguinal/umbilical/incisional)",
      "Laparoscopic appendectomy",
      "Diagnostic laparoscopy for acute abdomen",
      "Advanced laparoscopic GI Surgeries",
      "Minor procedures: abscess drainage, excision biopsy, wound debridement",
      "Emergency laparotomy for trauma/perforation/obstruction",
      "Thyroid surgeries",
      "Breast surgeries",
      "Varicose vein surgery",
      "Diabetic foot surgery and wound care",
      "Proctology and Laser surgery (Hemorrhoids / Piles)",
      "Hernia, Hydrocele, and Circumcision",
      "Benign swelling / tumors (Lipoma, cyst, lymph node)",
      "Diagnostic and therapeutic Endoscopy",
      "Diagnostic and therapeutic Colonoscopy"
    ],
    "specialPrivileges": [
      "Advanced laparoscopic & GI endosurgery (FIAGES certified)",
      "Minimal access surgery (FMAS certified)",
      "Advanced laparoscopic surgery (FALS certified)",
      "Diploma-level laparoscopic surgical procedures"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "naveen-sundaram",
    "name": "Dr. Naveen Sundaram",
    "designation": "Consultant Emergency & Critical Care Medicine",
    "department": "Emergency & Critical Care Medicine",
    "specialties": [
      "emergency-medicine",
      "critical-care-medicine"
    ],
    "qualifications": [
      "MRCEM (UK).",
      "MRCP (UK)"
    ],
    "rawQualifications": "MRCEM (UK)., MRCP (UK)",
    "experience": "16+ Years Experience",
    "image": "/Doctor/Dr.NaveenSundaram.jpg",
    "bio": "Dr. Naveen Sundaram serves as Consultant Emergency & Critical Care Medicine at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MRCEM (UK)., MRCP (UK)), Dr. Naveen Sundaram brings extensive clinical mastery in Emergency & Critical Care Medicine. Registered with medical council registration number 91273, Dr. Naveen Sundaram is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Emergency & Critical Care Medicine",
    "shortBio": "Dr. Naveen Sundaram is a renowned Consultant Emergency & Critical Care Medicine in the Department of Emergency & Critical Care Medicine at SilverLine Multispeciality Hospital Trichy with MRCEM (UK)., MRCP (UK) credentials.",
    "fullBio": "Dr. Naveen Sundaram serves as Consultant Emergency & Critical Care Medicine at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MRCEM (UK)., MRCP (UK)), Dr. Naveen Sundaram brings extensive clinical mastery in Emergency & Critical Care Medicine. Registered with medical council registration number 91273, Dr. Naveen Sundaram is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Medical Superintendent",
      "Emergency medicine per MRCEM (UK) standard",
      "Acute internal medicine per MRCP (UK) standard",
      "Head, Infection Prevention Control Committee and AMSC",
      "Head, Patient Safety and Quality Committee",
      "Head, Emergency Code Committee"
    ],
    "regNo": "91273",
    "regDate": "25-Oct-2010",
    "renewalDate": "18-Aug-2030",
    "corePrivileges": [
      "Triage & primary assessment of all emergency arrivals",
      "24x7 emergency department clinical charge & disposition decisions",
      "Code Blue / cardiac arrest team leadership"
    ],
    "proceduralPrivileges": [
      "Basic & Advanced Cardiac Life Support (BLS/ACLS)",
      "Advanced Trauma Life Support (ATLS) procedures",
      "Endotracheal intubation & advanced airway management",
      "Central venous line & arterial line insertion",
      "Chest tube (ICD) insertion, needle thoracostomy/pericardiocentesis",
      "Procedural sedation & analgesia",
      "Point-of-care ultrasound (FAST/e-FAST) for emergency assessment",
      "Emergency ventilator initiation & management"
    ],
    "specialPrivileges": [
      "Medical Superintendent",
      "Emergency medicine per MRCEM (UK) standard",
      "Acute internal medicine per MRCP (UK) standard",
      "Head, Infection Prevention Control Committee and AMSC",
      "Head, Patient Safety and Quality Committee",
      "Head, Emergency Code Committee"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "aravind-k",
    "name": "Dr. Aravind. K",
    "designation": "Consultant Cardiothoracic Surgeon",
    "department": "Cardiothoracic & Vascular Surgery",
    "specialties": [
      "cardiothoracic-surgery",
      "vascular-surgery"
    ],
    "qualifications": [
      "DNB.",
      "MCh (CTVS)"
    ],
    "rawQualifications": "DNB., MCh (CTVS)",
    "experience": "14+ Years Experience",
    "image": "/Doctor/DrAravindK.jpg",
    "bio": "Dr. Aravind. K serves as Consultant Cardiothoracic Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DNB., MCh (CTVS)), Dr. Aravind. K brings extensive clinical mastery in Cardiothoracic & Vascular Surgery. Registered with medical council registration number 97672, Dr. Aravind. K is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Cardiothoracic Surgeon",
    "shortBio": "Dr. Aravind. K is a renowned Consultant Cardiothoracic Surgeon in the Department of Cardiothoracic & Vascular Surgery at SilverLine Multispeciality Hospital Trichy with DNB., MCh (CTVS) credentials.",
    "fullBio": "Dr. Aravind. K serves as Consultant Cardiothoracic Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DNB., MCh (CTVS)), Dr. Aravind. K brings extensive clinical mastery in Cardiothoracic & Vascular Surgery. Registered with medical council registration number 97672, Dr. Aravind. K is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Valve repair/replacement surgery",
      "Thoracic surgery",
      "Oesophageal surgery",
      "Major vascular & aortic surgery",
      "Congenital cardiac surgery",
      "Cardiopulmonary bypass management"
    ],
    "regNo": "97672",
    "regDate": "31-May-2012",
    "renewalDate": "20-Aug-2026",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative cardiac surgical management",
      "Cardiac surgical emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Coronary Artery Bypass Grafting (CABG) - on-pump & off-pump",
      "Valve repair/replacement surgery",
      "Thoracic surgery (lobectomy, pneumonectomy, mediastinal tumour excision)",
      "Oesophageal surgery",
      "Major vascular & aortic surgery (aneurysm repair)",
      "Congenital cardiac surgery (if credentialed)",
      "Cardiopulmonary bypass management",
      "Post-operative cardiac critical care & IABP/ECMO management"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "k-sathyasagar",
    "name": "Dr. K. Sathyasagar",
    "designation": "Consultant Nephrologist",
    "department": "Nephrology",
    "specialties": [
      "nephrology",
      "transplant-surgery"
    ],
    "qualifications": [
      "MD.",
      "DM (Nephro).",
      "DNB (Nephro)"
    ],
    "rawQualifications": "MD., DM (Nephro)., DNB (Nephro)",
    "experience": "15+ Years Experience",
    "image": "/Doctor/DrKSathyasagar.jpg",
    "bio": "Dr. K. Sathyasagar serves as Consultant Nephrologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD., DM (Nephro)., DNB (Nephro)), Dr. K. Sathyasagar brings extensive clinical mastery in Nephrology. Registered with medical council registration number 91982, Dr. K. Sathyasagar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Nephrologist",
    "shortBio": "Dr. K. Sathyasagar is a renowned Consultant Nephrologist in the Department of Nephrology at SilverLine Multispeciality Hospital Trichy with MD., DM (Nephro)., DNB (Nephro) credentials.",
    "fullBio": "Dr. K. Sathyasagar serves as Consultant Nephrologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD., DM (Nephro)., DNB (Nephro)), Dr. K. Sathyasagar brings extensive clinical mastery in Nephrology. Registered with medical council registration number 91982, Dr. K. Sathyasagar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Haemodialysis prescription & management",
      "Continuous Renal Replacement Therapy  in ICU",
      "Peritoneal dialysis catheter management",
      "Percutaneous ultrasound-guided renal biopsy",
      "Temporary dialysis catheter  insertion"
    ],
    "regNo": "91982",
    "regDate": "13-Jan-2011",
    "renewalDate": "46249",
    "corePrivileges": [
      "OP/IP consultation, admission & management of renal patients",
      "Dialysis unit clinical oversight"
    ],
    "proceduralPrivileges": [
      "Haemodialysis prescription & management",
      "Continuous Renal Replacement Therapy (CRRT) in ICU",
      "Peritoneal dialysis catheter management",
      "Percutaneous ultrasound-guided renal biopsy",
      "Temporary dialysis catheter (femoral/jugular) insertion",
      "Renal transplant medical work-up & post-transplant management"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "i-devarajan",
    "name": "Dr. I. Devarajan",
    "designation": "Consultant Vascular & Endovascular Surgeon",
    "department": "Vascular Surgery",
    "specialties": [
      "vascular-surgery",
      "cardiothoracic-surgery"
    ],
    "qualifications": [
      "MS.",
      "MCh (Vascular Surgery)"
    ],
    "rawQualifications": "MS., MCh (Vascular Surgery)",
    "experience": "24+ Years Experience",
    "image": "/Doctor/DrIDevarajan.jpg",
    "bio": "Dr. I. Devarajan serves as Consultant Vascular & Endovascular Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (Vascular Surgery)), Dr. I. Devarajan brings extensive clinical mastery in Vascular Surgery. Registered with medical council registration number 69052, Dr. I. Devarajan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Vascular & Endovascular Surgeon",
    "shortBio": "Dr. I. Devarajan is a renowned Consultant Vascular & Endovascular Surgeon in the Department of Vascular Surgery at SilverLine Multispeciality Hospital Trichy with MS., MCh (Vascular Surgery) credentials.",
    "fullBio": "Dr. I. Devarajan serves as Consultant Vascular & Endovascular Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (Vascular Surgery)), Dr. I. Devarajan brings extensive clinical mastery in Vascular Surgery. Registered with medical council registration number 69052, Dr. I. Devarajan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Open vascular bypass & reconstruction",
      "Endovascular angioplasty & stenting",
      "Carotid endarterectomy",
      "Varicose vein surgery",
      "Diabetic foot & limb salvage vascular procedures",
      "Management of vascular trauma"
    ],
    "regNo": "69052",
    "regDate": "30-Jan-2002",
    "renewalDate": "25-Jan-2026",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Vascular emergency on-call cover (acute limb ischemia, ruptured aneurysm)"
    ],
    "proceduralPrivileges": [
      "Open vascular bypass & reconstruction (femoro-popliteal, aorto-iliac)",
      "Endovascular angioplasty & stenting",
      "Carotid endarterectomy",
      "Varicose vein surgery (open ligation-stripping / endovenous laser/RFA)",
      "AV fistula creation & maintenance for dialysis access",
      "Diabetic foot & limb salvage vascular procedures",
      "Management of vascular trauma"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "r-bhavidra",
    "name": "Dr. R. Bhavidra",
    "designation": "Consultant Interventional Cardiologist",
    "department": "Cardiology",
    "specialties": [
      "cardiology"
    ],
    "qualifications": [
      "MD.",
      "DM (Cardio)"
    ],
    "rawQualifications": "MD., DM (Cardio)",
    "experience": "14+ Years Experience",
    "image": "/Doctor/DrRBhavidra.jpg",
    "bio": "Dr. R. Bhavidra serves as Consultant Interventional Cardiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD., DM (Cardio)), Dr. R. Bhavidra brings extensive clinical mastery in Cardiology. Registered with medical council registration number 98784, Dr. R. Bhavidra is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Interventional Cardiologist",
    "shortBio": "Dr. R. Bhavidra is a renowned Consultant Interventional Cardiologist in the Department of Cardiology at SilverLine Multispeciality Hospital Trichy with MD., DM (Cardio) credentials.",
    "fullBio": "Dr. R. Bhavidra serves as Consultant Interventional Cardiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD., DM (Cardio)), Dr. R. Bhavidra brings extensive clinical mastery in Cardiology. Registered with medical council registration number 98784, Dr. R. Bhavidra is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Transthoracic & transoesophageal echocardiography",
      "Diagnostic coronary angiography",
      "Percutaneous Coronary Intervention  & stenting",
      "Temporary & permanent pacemaker implantation",
      "Electrophysiology study / device therapy",
      "Stress testing & non-invasive cardiac evaluation"
    ],
    "regNo": "98784",
    "regDate": "05-Oct-2012",
    "renewalDate": "19-Apr-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & CCU/cardiac ward management",
      "Cardiac emergency on-call cover (ACS, arrhythmia)"
    ],
    "proceduralPrivileges": [
      "Transthoracic & transoesophageal echocardiography (TTE/TEE)",
      "Diagnostic coronary angiography",
      "Percutaneous Coronary Intervention (PTCA) & stenting",
      "Temporary & permanent pacemaker implantation",
      "Electrophysiology study / device therapy (if credentialed)",
      "Structural heart interventions - TAVI/balloon valvuloplasty (if credentialed)",
      "Management of acute coronary syndromes & cardiogenic shock",
      "Stress testing & non-invasive cardiac evaluation"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "k-narendran",
    "name": "Dr. K. Narendran",
    "designation": "Consultant Medical & Haemato Oncologist",
    "department": "Medical & Haemato Oncology",
    "specialties": [
      "medical-oncology",
      "bone-marrow-transplant"
    ],
    "qualifications": [
      "MD.",
      "FAGE.",
      "DM (JIPMER)"
    ],
    "rawQualifications": "MD., FAGE., DM (JIPMER)",
    "experience": "14+ Years Experience",
    "image": "/Doctor/DrKNarendran.jpg",
    "bio": "Dr. K. Narendran serves as Consultant Medical & Haemato Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD., FAGE., DM (JIPMER)), Dr. K. Narendran brings extensive clinical mastery in Medical & Haemato Oncology. Registered with medical council registration number 96910, Dr. K. Narendran is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Medical & Haemato Oncologist",
    "shortBio": "Dr. K. Narendran is a renowned Consultant Medical & Haemato Oncologist in the Department of Medical & Haemato Oncology at SilverLine Multispeciality Hospital Trichy with MD., FAGE., DM (JIPMER) credentials.",
    "fullBio": "Dr. K. Narendran serves as Consultant Medical & Haemato Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD., FAGE., DM (JIPMER)), Dr. K. Narendran brings extensive clinical mastery in Medical & Haemato Oncology. Registered with medical council registration number 96910, Dr. K. Narendran is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Targeted therapy & immunotherapy administration",
      "Bone marrow aspiration & trephine biopsy",
      "Management of haematological malignancies"
    ],
    "regNo": "96910",
    "regDate": "10-May-2012",
    "renewalDate": "31-01-2027 (DM)",
    "corePrivileges": [
      "OP/IP consultation, admission & chemotherapy day-care oversight",
      "Tumour board participation & treatment protocol selection"
    ],
    "proceduralPrivileges": [
      "Systemic chemotherapy prescription & administration",
      "Targeted therapy & immunotherapy administration",
      "Bone marrow aspiration & trephine biopsy",
      "Management of haematological malignancies (leukaemia, lymphoma, myeloma)",
      "Central line/port-a-cath insertion for chemotherapy access",
      "Management of chemotherapy toxicity & oncologic emergencies (neutropenic sepsis, tumour lysis)"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "p-ramamoorthi",
    "name": "Dr. P. Ramamoorthi",
    "designation": "Consultant Anaesthesiologist & Critical Care",
    "department": "Anaesthesiology and Critical Care",
    "specialties": [
      "anesthesiology",
      "critical-care-medicine"
    ],
    "qualifications": [
      "MD (Anaes)"
    ],
    "rawQualifications": "MD (Anaes)",
    "experience": "18+ Years Experience",
    "image": "/Doctor/Dr.P.Ramamoorthi.jpg",
    "bio": "Dr. P. Ramamoorthi serves as Consultant Anaesthesiologist & Critical Care at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Anaes)), Dr. P. Ramamoorthi brings extensive clinical mastery in Anaesthesiology and Critical Care. Registered with medical council registration number 83867, Dr. P. Ramamoorthi is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Anaesthesiologist & Critical Care",
    "shortBio": "Dr. P. Ramamoorthi is a renowned Consultant Anaesthesiologist & Critical Care in the Department of Anaesthesiology and Critical Care at SilverLine Multispeciality Hospital Trichy with MD (Anaes) credentials.",
    "fullBio": "Dr. P. Ramamoorthi serves as Consultant Anaesthesiologist & Critical Care at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Anaes)), Dr. P. Ramamoorthi brings extensive clinical mastery in Anaesthesiology and Critical Care. Registered with medical council registration number 83867, Dr. P. Ramamoorthi is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "General anaesthesia administration",
      "Peripheral nerve blocks",
      "Central line & arterial line insertion",
      "Mechanical ventilation & critical care monitoring",
      "Acute & chronic pain management procedures"
    ],
    "regNo": "83867",
    "regDate": "12-Jun-2008",
    "renewalDate": "10-Nov-2030",
    "corePrivileges": [
      "Pre-anaesthetic evaluation & fitness clearance",
      "Peri-operative anaesthesia care across all OT lists",
      "ICU clinical charge & ventilator/critical care management"
    ],
    "proceduralPrivileges": [
      "General anaesthesia administration (all case complexities as credentialed)",
      "Regional anaesthesia - spinal, epidural, combined spinal-epidural",
      "Peripheral nerve blocks (ultrasound-guided)",
      "Difficult airway management & advanced airway procedures",
      "Central line & arterial line insertion",
      "Mechanical ventilation & critical care monitoring",
      "Acute & chronic pain management procedures"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "dinesh-kumar-r",
    "name": "Dr. Dinesh Kumar. R",
    "designation": "Consultant Radiation Oncologist",
    "department": "Radiation Oncology",
    "specialties": [
      "radiation-oncology",
      "pain-palliative-care"
    ],
    "qualifications": [
      "DMRT"
    ],
    "rawQualifications": "DMRT",
    "experience": "20+ Years Experience",
    "image": "/Doctor/DrDineshKumarR.jpg",
    "bio": "Dr. Dinesh Kumar. R serves as Consultant Radiation Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DMRT), Dr. Dinesh Kumar. R brings extensive clinical mastery in Radiation Oncology. Registered with medical council registration number 79824, Dr. Dinesh Kumar. R is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Radiation Oncologist",
    "shortBio": "Dr. Dinesh Kumar. R is a renowned Consultant Radiation Oncologist in the Department of Radiation Oncology at SilverLine Multispeciality Hospital Trichy with DMRT credentials.",
    "fullBio": "Dr. Dinesh Kumar. R serves as Consultant Radiation Oncologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DMRT), Dr. Dinesh Kumar. R brings extensive clinical mastery in Radiation Oncology. Registered with medical council registration number 79824, Dr. Dinesh Kumar. R is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Stereotactic Radiosurgery / Radiotherapy",
      "Palliative & emergency radiotherapy",
      "Radiotherapy contouring  & dose prescription"
    ],
    "regNo": "79824",
    "regDate": "12-Dec-2006",
    "renewalDate": "22-01-2028 (MBBS)/ \n19-11-2025 (DMRT)",
    "corePrivileges": [
      "OP consultation, radiotherapy treatment planning & simulation sign-off",
      "Tumour board presentation & combined-modality treatment planning",
      "On-treatment review & toxicity management of RT patients"
    ],
    "proceduralPrivileges": [
      "External Beam Radiotherapy - 2D/3D-CRT prescription & verification",
      "IMRT / IGRT / VMAT treatment planning & delivery sign-off",
      "Stereotactic Radiosurgery / Radiotherapy (SRS/SBRT)",
      "High/Low Dose Rate Brachytherapy - intracavitary & interstitial",
      "Palliative & emergency radiotherapy (cord compression, SVC obstruction, bone mets)",
      "Radiotherapy contouring (GTV/CTV/PTV) & dose prescription"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "prakash-asokan",
    "name": "Dr. Prakash Asokan",
    "designation": "Consultant Radiologist",
    "department": "Radiology",
    "specialties": [
      "surgical-oncology",
      "medical-oncology"
    ],
    "qualifications": [
      "DMRD",
      "DNB (RD)",
      "FRCR (UK)",
      "EDiR ( Vienna)",
      "Fellowship in Oncoradiology",
      "Master in Oncologic Imaging (Pisa",
      "Italy)"
    ],
    "rawQualifications": "DMRD, DNB (RD), \nFRCR (UK), EDiR ( Vienna),\nFellowship in Oncoradiology,\nMaster in Oncologic Imaging (Pisa, Italy)",
    "experience": "18+ Years Experience",
    "image": "/Doctor/DrPrakashAsokan.jpg",
    "bio": "Dr. Prakash Asokan serves as Consultant Radiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DMRD, DNB (RD), \nFRCR (UK), EDiR ( Vienna),\nFellowship in Oncoradiology,\nMaster in Oncologic Imaging (Pisa, Italy)), Dr. Prakash Asokan brings extensive clinical mastery in Radiology. Registered with medical council registration number 85230, Dr. Prakash Asokan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Radiologist",
    "shortBio": "Dr. Prakash Asokan is a renowned Consultant Radiologist in the Department of Radiology at SilverLine Multispeciality Hospital Trichy with DMRD, DNB (RD), \nFRCR (UK), EDiR ( Vienna),\nFellowship in Oncoradiology,\nMaster in Oncologic Imaging (Pisa, Italy) credentials.",
    "fullBio": "Dr. Prakash Asokan serves as Consultant Radiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DMRD, DNB (RD), \nFRCR (UK), EDiR ( Vienna),\nFellowship in Oncoradiology,\nMaster in Oncologic Imaging (Pisa, Italy)), Dr. Prakash Asokan brings extensive clinical mastery in Radiology. Registered with medical council registration number 85230, Dr. Prakash Asokan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Sub-specialty oncologic radiology reporting (FRCR-UK certified)",
      "European diploma-level radiology reporting (EDiR certified)",
      "Dedicated oncologic imaging & radiology privileges",
      "Advanced oncologic imaging interpretation",
      "Reporting: X-ray, USG, CT & MRI",
      "Oncologic/staging imaging interpretation"
    ],
    "regNo": "85230",
    "regDate": "12-Dec-2008",
    "renewalDate": "30-Jul-2031",
    "corePrivileges": [
      "Reporting sign-off authority for imaging studies",
      "Radiology protocol/quality oversight",
      "Tumour board / MDT participation for radiologic correlation"
    ],
    "proceduralPrivileges": [
      "Reporting: X-ray, USG, CT & MRI (all body regions)",
      "Oncologic/staging imaging interpretation",
      "Image-guided (USG/CT-guided) biopsy & aspiration",
      "Interventional radiology procedures (drainage, embolisation, as credentialed)",
      "Contrast-enhanced imaging - administration & reaction management"
    ],
    "specialPrivileges": [
      "Sub-specialty oncologic radiology reporting (FRCR-UK certified)",
      "European diploma-level radiology reporting (EDiR certified)",
      "Dedicated oncologic imaging & radiology privileges",
      "Advanced oncologic imaging interpretation"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "samynathan-g",
    "name": "Dr. Samynathan. G",
    "designation": "Consultant Orthopaedics",
    "department": "Orthopaedics",
    "specialties": [
      "orthopedics",
      "spine-surgery"
    ],
    "qualifications": [
      "MS (Ortho).",
      "FIA\nFellowship in Arthroplasty"
    ],
    "rawQualifications": "MS (Ortho)., FIA\nFellowship in Arthroplasty",
    "experience": "17+ Years Experience",
    "image": "/Doctor/DrSamynathanG.jpg",
    "bio": "Dr. Samynathan. G serves as Consultant Orthopaedics at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Ortho)., FIA\nFellowship in Arthroplasty), Dr. Samynathan. G brings extensive clinical mastery in Orthopaedics. Registered with medical council registration number 87186, Dr. Samynathan. G is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Orthopaedics",
    "shortBio": "Dr. Samynathan. G is a renowned Consultant Orthopaedics in the Department of Orthopaedics at SilverLine Multispeciality Hospital Trichy with MS (Ortho)., FIA\nFellowship in Arthroplasty credentials.",
    "fullBio": "Dr. Samynathan. G serves as Consultant Orthopaedics at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Ortho)., FIA\nFellowship in Arthroplasty), Dr. Samynathan. G brings extensive clinical mastery in Orthopaedics. Registered with medical council registration number 87186, Dr. Samynathan. G is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Complex/revision joint arthroplasty (Fellowship in Arthroplasty)",
      "Total hip & knee arthroplasty",
      "Arthroscopic surgery",
      "Bone/joint biopsy & aspiration",
      "Casting, splinting & fracture manipulation"
    ],
    "regNo": "87186",
    "regDate": "09-Jul-2009",
    "renewalDate": "28-Apr-2026",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Orthopaedic emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Closed & open reduction with internal/external fixation",
      "Total hip & knee arthroplasty (primary & revision)",
      "Arthroscopic surgery (knee/shoulder)",
      "Trauma surgery incl. poly-trauma fracture management",
      "Bone/joint biopsy & aspiration",
      "Casting, splinting & fracture manipulation"
    ],
    "specialPrivileges": [
      "Complex/revision joint arthroplasty (Fellowship in Arthroplasty)"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "shanmuganathan-b",
    "name": "Dr. Shanmuganathan. B",
    "designation": "Consultant Psychiatrist",
    "department": "Psychiatry",
    "specialties": [
      "psychiatry"
    ],
    "qualifications": [
      "MD (Pscyhiatry)"
    ],
    "rawQualifications": "MD (Pscyhiatry)",
    "experience": "19+ Years Experience",
    "image": "/Doctor/DrShanmuganathanB.jpg",
    "bio": "Dr. Shanmuganathan. B serves as Consultant Psychiatrist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Pscyhiatry)), Dr. Shanmuganathan. B brings extensive clinical mastery in Psychiatry. Registered with medical council registration number 80899, Dr. Shanmuganathan. B is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Psychiatrist",
    "shortBio": "Dr. Shanmuganathan. B is a renowned Consultant Psychiatrist in the Department of Psychiatry at SilverLine Multispeciality Hospital Trichy with MD (Pscyhiatry) credentials.",
    "fullBio": "Dr. Shanmuganathan. B serves as Consultant Psychiatrist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Pscyhiatry)), Dr. Shanmuganathan. B brings extensive clinical mastery in Psychiatry. Registered with medical council registration number 80899, Dr. Shanmuganathan. B is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Comprehensive psychiatric diagnostic assessment",
      "De-addiction & withdrawal management",
      "Crisis intervention & risk  assessment",
      "Individual/group psychotherapy & counselling"
    ],
    "regNo": "80899",
    "regDate": "31-May-2007",
    "renewalDate": "15-Jul-2031",
    "corePrivileges": [
      "OP/IP psychiatric consultation & admission",
      "Consultation-liaison psychiatry for medical/surgical inpatients"
    ],
    "proceduralPrivileges": [
      "Comprehensive psychiatric diagnostic assessment",
      "Pharmacological management of psychiatric disorders",
      "De-addiction & withdrawal management",
      "Crisis intervention & risk (suicide) assessment",
      "Individual/group psychotherapy & counselling"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "senthil-kumar-s",
    "name": "Dr. Senthil Kumar. S",
    "designation": "Consultant Neurosurgeon",
    "department": "Neuro Surgery",
    "specialties": [
      "neuro-surgery",
      "spine-surgery"
    ],
    "qualifications": [
      "MS.",
      "MCh (Neuro)"
    ],
    "rawQualifications": "MS., MCh (Neuro)",
    "experience": "16+ Years Experience",
    "image": "/Doctor/DrSenthilKumarS.jpg",
    "bio": "Dr. Senthil Kumar. S serves as Consultant Neurosurgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (Neuro)), Dr. Senthil Kumar. S brings extensive clinical mastery in Neuro Surgery. Registered with medical council registration number 90864, Dr. Senthil Kumar. S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Neurosurgeon",
    "shortBio": "Dr. Senthil Kumar. S is a renowned Consultant Neurosurgeon in the Department of Neuro Surgery at SilverLine Multispeciality Hospital Trichy with MS., MCh (Neuro) credentials.",
    "fullBio": "Dr. Senthil Kumar. S serves as Consultant Neurosurgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS., MCh (Neuro)), Dr. Senthil Kumar. S brings extensive clinical mastery in Neuro Surgery. Registered with medical council registration number 90864, Dr. Senthil Kumar. S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Craniotomy for tumour excision",
      "Cranial trauma surgery",
      "Cerebrovascular surgery",
      "Peripheral nerve surgery"
    ],
    "regNo": "90864",
    "regDate": "21-Jul-2010",
    "renewalDate": "24-May-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Neurosurgical emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Craniotomy for tumour excision",
      "Cranial trauma surgery (evacuation of haematoma, decompressive craniectomy)",
      "Cerebrovascular surgery (aneurysm clipping, AVM excision, as credentialed)",
      "Spine surgery - decompression, discectomy, fusion & instrumentation",
      "Stereotactic & minimally invasive neurosurgical procedures",
      "Ventriculo-peritoneal shunt & CSF diversion procedures",
      "Peripheral nerve surgery"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "sridhar-sinnakalai",
    "name": "Dr. Sridhar Sinnakalai",
    "designation": "Consultant Physician",
    "department": "General Medicine",
    "specialties": [
      "general-medicine"
    ],
    "qualifications": [
      "MD (General Medicine)"
    ],
    "rawQualifications": "MD (General Medicine)",
    "experience": "14+ Years Experience",
    "image": "/Doctor/DrSridharSinnakalai.jpg",
    "bio": "Dr. Sridhar Sinnakalai serves as Consultant Physician at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (General Medicine)), Dr. Sridhar Sinnakalai brings extensive clinical mastery in General Medicine. Registered with medical council registration number 97102, Dr. Sridhar Sinnakalai is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Physician",
    "shortBio": "Dr. Sridhar Sinnakalai is a renowned Consultant Physician in the Department of General Medicine at SilverLine Multispeciality Hospital Trichy with MD (General Medicine) credentials.",
    "fullBio": "Dr. Sridhar Sinnakalai serves as Consultant Physician at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (General Medicine)), Dr. Sridhar Sinnakalai brings extensive clinical mastery in General Medicine. Registered with medical council registration number 97102, Dr. Sridhar Sinnakalai is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Diagnostic lumbar puncture",
      "Pleural tap / ascitic tap",
      "Central line insertion",
      "Critical care co-management with intensivist",
      "Echo Procedure"
    ],
    "regNo": "97102",
    "regDate": "24-May-2012",
    "renewalDate": "29-Apr-2026",
    "corePrivileges": [
      "OP/IP consultation, admission & ward round management",
      "Medical on-call cover for inpatients across departments"
    ],
    "proceduralPrivileges": [
      "Management of medical emergencies & multi-organ comorbidities",
      "Diagnostic lumbar puncture",
      "Pleural tap / ascitic tap (diagnostic & therapeutic)",
      "Central line insertion (as credentialed)",
      "Critical care co-management with intensivist",
      "Echo Procedure"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "ragaselvi-s",
    "name": "Dr. Ragaselvi. S",
    "designation": "Consultant Pulmonologist",
    "department": "Pulmonology",
    "specialties": [
      "pulmonology",
      "critical-care-medicine"
    ],
    "qualifications": [
      "MD (Pulmonary Medicine)"
    ],
    "rawQualifications": "MD (Pulmonary Medicine)",
    "experience": "13+ Years Experience",
    "image": "/Doctor/DrRagaselviS.jpg",
    "bio": "Dr. Ragaselvi. S serves as Consultant Pulmonologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Pulmonary Medicine)), Dr. Ragaselvi. S brings extensive clinical mastery in Pulmonology. Registered with medical council registration number 102351, Dr. Ragaselvi. S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Pulmonologist",
    "shortBio": "Dr. Ragaselvi. S is a renowned Consultant Pulmonologist in the Department of Pulmonology at SilverLine Multispeciality Hospital Trichy with MD (Pulmonary Medicine) credentials.",
    "fullBio": "Dr. Ragaselvi. S serves as Consultant Pulmonologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Pulmonary Medicine)), Dr. Ragaselvi. S brings extensive clinical mastery in Pulmonology. Registered with medical council registration number 102351, Dr. Ragaselvi. S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Flexible fibre-optic bronchoscopy",
      "Bronchoalveolar lavage & endobronchial biopsy",
      "Thoracocentesis & intercostal drain  insertion",
      "Pleurodesis procedures",
      "Pulmonary function test interpretation"
    ],
    "regNo": "102351",
    "regDate": "22-May-2013",
    "renewalDate": "28-Apr-2026",
    "corePrivileges": [
      "OP/IP consultation, admission & respiratory ward management",
      "Respiratory emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Flexible fibre-optic bronchoscopy (diagnostic & therapeutic)",
      "Bronchoalveolar lavage & endobronchial biopsy",
      "Thoracocentesis & intercostal drain (ICD) insertion",
      "Pleurodesis procedures",
      "Non-invasive ventilation (NIV) & invasive ventilator management",
      "Pulmonary function test interpretation"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "priyadharshini-s",
    "name": "Dr. Priyadharshini. S",
    "designation": "Consultant Dermatologist",
    "department": "Dermatology",
    "specialties": [
      "dermatology-cosmetic-surgery"
    ],
    "qualifications": [
      "MD (DVL)"
    ],
    "rawQualifications": "MD (DVL)",
    "experience": "18+ Years Experience",
    "image": "/Doctor/DrPriyadharshiniS.jpg",
    "bio": "Dr. Priyadharshini. S serves as Consultant Dermatologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (DVL)), Dr. Priyadharshini. S brings extensive clinical mastery in Dermatology. Registered with medical council registration number 83906, Dr. Priyadharshini. S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Dermatologist",
    "shortBio": "Dr. Priyadharshini. S is a renowned Consultant Dermatologist in the Department of Dermatology at SilverLine Multispeciality Hospital Trichy with MD (DVL) credentials.",
    "fullBio": "Dr. Priyadharshini. S serves as Consultant Dermatologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (DVL)), Dr. Priyadharshini. S brings extensive clinical mastery in Dermatology. Registered with medical council registration number 83906, Dr. Priyadharshini. S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Skin biopsy",
      "Dermatosurgical procedures",
      "Laser & aesthetic dermatology procedures",
      "Chemical peels & minor cosmetic procedures",
      "Management of dermatological emergencies"
    ],
    "regNo": "83906",
    "regDate": "12-Jan-2008",
    "renewalDate": "11-Nov-2030",
    "corePrivileges": [
      "OP/IP consultation for dermatological conditions",
      "Consultation-liaison dermatology for inpatients"
    ],
    "proceduralPrivileges": [
      "Skin biopsy (punch/shave/excisional)",
      "Dermatosurgical procedures (excision, cryotherapy, electrocautery)",
      "Laser & aesthetic dermatology procedures",
      "Chemical peels & minor cosmetic procedures",
      "Management of dermatological emergencies (Steven-Johnson syndrome, severe drug reactions)"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "m-nirmal",
    "name": "Dr. M. Nirmal",
    "designation": "Consultant Orthopaedics & Trauma",
    "department": "Orthopaedics & Trauma",
    "specialties": [
      "orthopedics"
    ],
    "qualifications": [
      "MS (Ortho).",
      "DNB (Ortho)",
      "Fellowship in Orthoscopic & Sports Medicine"
    ],
    "rawQualifications": "MS (Ortho)., DNB (Ortho), Fellowship in Orthoscopic & Sports Medicine",
    "experience": "13+ Years Experience",
    "image": "/Doctor/DrMNirmal.jpg",
    "bio": "Dr. M. Nirmal serves as Consultant Orthopaedics & Trauma at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Ortho)., DNB (Ortho), Fellowship in Orthoscopic & Sports Medicine), Dr. M. Nirmal brings extensive clinical mastery in Orthopaedics & Trauma. Registered with medical council registration number 101289, Dr. M. Nirmal is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Orthopaedics & Trauma",
    "shortBio": "Dr. M. Nirmal is a renowned Consultant Orthopaedics & Trauma in the Department of Orthopaedics & Trauma at SilverLine Multispeciality Hospital Trichy with MS (Ortho)., DNB (Ortho), Fellowship in Orthoscopic & Sports Medicine credentials.",
    "fullBio": "Dr. M. Nirmal serves as Consultant Orthopaedics & Trauma at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Ortho)., DNB (Ortho), Fellowship in Orthoscopic & Sports Medicine), Dr. M. Nirmal brings extensive clinical mastery in Orthopaedics & Trauma. Registered with medical council registration number 101289, Dr. M. Nirmal is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Sports injury arthroscopic surgery (Fellowship certified)",
      "Arthroscopic sports surgery (Fellowship certified)",
      "Poly-trauma fracture fixation",
      "Arthroscopic sports injury surgery",
      "Joint replacement surgery",
      "Ligament & tendon reconstruction"
    ],
    "regNo": "101289",
    "regDate": "03-May-2013",
    "renewalDate": "06-May-2026",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative trauma management",
      "24x7 trauma on-call cover"
    ],
    "proceduralPrivileges": [
      "Poly-trauma fracture fixation (internal/external)",
      "Arthroscopic sports injury surgery (ACL/meniscus/rotator cuff repair)",
      "Joint replacement surgery",
      "Ligament & tendon reconstruction",
      "Damage-control orthopaedic procedures"
    ],
    "specialPrivileges": [
      "Sports injury arthroscopic surgery (Fellowship certified)",
      "Arthroscopic sports surgery (Fellowship certified)"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "anitha-k",
    "name": "Dr. Anitha. K",
    "designation": "Consultant Microbiologist",
    "department": "Microbiology",
    "specialties": [
      "general-medicine"
    ],
    "qualifications": [
      "MD (Microbiology)"
    ],
    "rawQualifications": "MD (Microbiology)",
    "experience": "15+ Years Experience",
    "image": "/Doctor/DrAnithaK.jpg",
    "bio": "Dr. Anitha. K serves as Consultant Microbiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Microbiology)), Dr. Anitha. K brings extensive clinical mastery in Microbiology. Registered with medical council registration number 95210, Dr. Anitha. K is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Microbiologist",
    "shortBio": "Dr. Anitha. K is a renowned Consultant Microbiologist in the Department of Microbiology at SilverLine Multispeciality Hospital Trichy with MD (Microbiology) credentials.",
    "fullBio": "Dr. Anitha. K serves as Consultant Microbiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Microbiology)), Dr. Anitha. K brings extensive clinical mastery in Microbiology. Registered with medical council registration number 95210, Dr. Anitha. K is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Infection Prevention Control Officer (Member Secretary)",
      "Culture & sensitivity testing interpretation",
      "Antimicrobial stewardship recommendations",
      "Outbreak investigation & infection surveillance"
    ],
    "regNo": "95210",
    "regDate": "08-Dec-2011",
    "renewalDate": "23-Apr-2031",
    "corePrivileges": [
      "Sign-off authority for microbiology laboratory reports",
      "Hospital Infection Control Committee membership/oversight"
    ],
    "proceduralPrivileges": [
      "Culture & sensitivity testing interpretation",
      "Antimicrobial stewardship recommendations",
      "Outbreak investigation & infection surveillance",
      "Sterilisation & biomedical waste protocol oversight"
    ],
    "specialPrivileges": [
      "Infection Prevention Control Officer (Member Secretary)"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "vijay-pradap-r",
    "name": "Dr. Vijay Pradap. R",
    "designation": "Consultant ENT Surgeon",
    "department": "ENT",
    "specialties": [
      "ent"
    ],
    "qualifications": [
      "MS (ENT)"
    ],
    "rawQualifications": "MS (ENT)",
    "experience": "17+ Years Experience",
    "image": "/Doctor/DrVijayPradapR.jpg",
    "bio": "Dr. Vijay Pradap. R serves as Consultant ENT Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (ENT)), Dr. Vijay Pradap. R brings extensive clinical mastery in ENT. Registered with medical council registration number 86306, Dr. Vijay Pradap. R is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "ENT Surgeon",
    "shortBio": "Dr. Vijay Pradap. R is a renowned Consultant ENT Surgeon in the Department of ENT at SilverLine Multispeciality Hospital Trichy with MS (ENT) credentials.",
    "fullBio": "Dr. Vijay Pradap. R serves as Consultant ENT Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (ENT)), Dr. Vijay Pradap. R brings extensive clinical mastery in ENT. Registered with medical council registration number 86306, Dr. Vijay Pradap. R is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Tonsillectomy & adenoidectomy",
      "Functional Endoscopic Sinus Surgery",
      "Mastoidectomy & middle-ear surgery",
      "Microlaryngeal surgery",
      "Head & neck surgery"
    ],
    "regNo": "86306",
    "regDate": "29-Apr-2009",
    "renewalDate": "24-Oct-2030",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "ENT emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Tonsillectomy & adenoidectomy",
      "Functional Endoscopic Sinus Surgery (FESS)",
      "Mastoidectomy & middle-ear surgery",
      "Microlaryngeal surgery",
      "Head & neck surgery (benign & malignant)",
      "Emergency airway procedures - tracheostomy, foreign body removal, epistaxis control"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "mohammed-imran-khan-a",
    "name": "Dr. Mohammed Imran Khan. A",
    "designation": "Consultant Plastic, Hand, Burns and Microvascular Reconstructive Surgeon",
    "department": "Plastic and Reconstructive Surgery",
    "specialties": [
      "reconstructive-plastic-surgery"
    ],
    "qualifications": [
      "MS(General Surgery)",
      "DNB",
      "MRCS (UK)",
      "MCh (Plastic Surgery)",
      "DrNB"
    ],
    "rawQualifications": "MS(General Surgery), DNB, MRCS (UK), MCh (Plastic Surgery), DrNB",
    "experience": "13+ Years Experience",
    "image": "/Doctor/DrMohammedImranKhanA.jpg",
    "bio": "Dr. Mohammed Imran Khan. A serves as Consultant Plastic, Hand, Burns and Microvascular Reconstructive Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS(General Surgery), DNB, MRCS (UK), MCh (Plastic Surgery), DrNB), Dr. Mohammed Imran Khan. A brings extensive clinical mastery in Plastic and Reconstructive Surgery. Registered with medical council registration number 102522, Dr. Mohammed Imran Khan. A is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Plastic, Hand, Burns and Microvascular Reconstructive Surgeon",
    "shortBio": "Dr. Mohammed Imran Khan. A is a renowned Consultant Plastic, Hand, Burns and Microvascular Reconstructive Surgeon in the Department of Plastic and Reconstructive Surgery at SilverLine Multispeciality Hospital Trichy with MS(General Surgery), DNB, MRCS (UK), MCh (Plastic Surgery), DrNB credentials.",
    "fullBio": "Dr. Mohammed Imran Khan. A serves as Consultant Plastic, Hand, Burns and Microvascular Reconstructive Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS(General Surgery), DNB, MRCS (UK), MCh (Plastic Surgery), DrNB), Dr. Mohammed Imran Khan. A brings extensive clinical mastery in Plastic and Reconstructive Surgery. Registered with medical council registration number 102522, Dr. Mohammed Imran Khan. A is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Core surgical procedures per MRCS (UK) standard",
      "Microvascular free flap reconstruction",
      "Hand surgery - trauma & reconstructive",
      "Burns management",
      "Post-oncologic reconstructive surgery",
      "Aesthetic/cosmetic surgical procedures"
    ],
    "regNo": "102522",
    "regDate": "28-May-2013",
    "renewalDate": "18-04-2026 (MBBS, MS, DNB), 25-10-2026 (MCh), 22-08-2028 (DrNB)",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Reconstructive surgery on-call cover for trauma/oncologic defects"
    ],
    "proceduralPrivileges": [
      "Microvascular free flap reconstruction",
      "Hand surgery - trauma & reconstructive",
      "Burns management (acute resuscitation, debridement, grafting)",
      "Post-oncologic reconstructive surgery (breast, head & neck)",
      "Post-traumatic reconstructive & wound coverage procedures",
      "Aesthetic/cosmetic surgical procedures"
    ],
    "specialPrivileges": [
      "Core surgical procedures per MRCS (UK) standard"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "divya-m",
    "name": "Dr. Divya. M",
    "designation": "Consultant Pediatrician",
    "department": "Pediatrics",
    "specialties": [
      "pediatrics"
    ],
    "qualifications": [
      "DNB (Pediatrics)"
    ],
    "rawQualifications": "DNB (Pediatrics)",
    "experience": "13+ Years Experience",
    "image": "/Doctor/DrDivyaM.jpg",
    "bio": "Dr. Divya. M serves as Consultant Pediatrician at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DNB (Pediatrics)), Dr. Divya. M brings extensive clinical mastery in Pediatrics. Registered with medical council registration number 101832, Dr. Divya. M is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Pediatrician",
    "shortBio": "Dr. Divya. M is a renowned Consultant Pediatrician in the Department of Pediatrics at SilverLine Multispeciality Hospital Trichy with DNB (Pediatrics) credentials.",
    "fullBio": "Dr. Divya. M serves as Consultant Pediatrician at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DNB (Pediatrics)), Dr. Divya. M brings extensive clinical mastery in Pediatrics. Registered with medical council registration number 101832, Dr. Divya. M is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Newborn resuscitation & essential newborn care",
      "Paediatric critical care/NICU management",
      "Lumbar puncture, umbilical line insertion",
      "Growth & developmental assessment",
      "Immunisation services"
    ],
    "regNo": "101832",
    "regDate": "14-May-2013",
    "renewalDate": "06-May-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & paediatric ward management",
      "Neonatal & paediatric emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Newborn resuscitation & essential newborn care",
      "Paediatric critical care/NICU management",
      "Lumbar puncture, umbilical line insertion (neonates)",
      "Growth & developmental assessment",
      "Immunisation services"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "t-jeyapriya",
    "name": "Dr. T. Jeyapriya",
    "designation": "Consultant Ophthalmologist & Ophthalmic Surgeon",
    "department": "Ophthalmology",
    "specialties": [
      "ophthalmology"
    ],
    "qualifications": [
      "D.O",
      "DNB (Ophthal)"
    ],
    "rawQualifications": "D.O, DNB (Ophthal)",
    "experience": "15+ Years Experience",
    "image": "/Doctor/DrTJeyapriya.jpg",
    "bio": "Dr. T. Jeyapriya serves as Consultant Ophthalmologist & Ophthalmic Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (D.O, DNB (Ophthal)), Dr. T. Jeyapriya brings extensive clinical mastery in Ophthalmology. Registered with medical council registration number 93189, Dr. T. Jeyapriya is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Ophthalmologist & Ophthalmic Surgeon",
    "shortBio": "Dr. T. Jeyapriya is a renowned Consultant Ophthalmologist & Ophthalmic Surgeon in the Department of Ophthalmology at SilverLine Multispeciality Hospital Trichy with D.O, DNB (Ophthal) credentials.",
    "fullBio": "Dr. T. Jeyapriya serves as Consultant Ophthalmologist & Ophthalmic Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (D.O, DNB (Ophthal)), Dr. T. Jeyapriya brings extensive clinical mastery in Ophthalmology. Registered with medical council registration number 93189, Dr. T. Jeyapriya is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Cataract surgery",
      "Refraction and Glasses",
      "Ocular trauma repair",
      "Minor ophthalmic surgical & laser procedures"
    ],
    "regNo": "93189",
    "regDate": "18-May-2011",
    "renewalDate": "16-02-2027 (MBBS, DO), \n28-05-2029 (DNB),",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Ophthalmic emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Cataract surgery (phacoemulsification / SICS)",
      "Refraction and Glasses",
      "Ocular trauma repair",
      "Minor ophthalmic surgical & laser procedures"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "prasanna-n-c",
    "name": "Dr. Prasanna. N.C",
    "designation": "Consultant Anaesthesiologist & Critical Care",
    "department": "Anaesthesiology and Critical Care",
    "specialties": [
      "anesthesiology",
      "critical-care-medicine"
    ],
    "qualifications": [
      "MD (Anaesthesiology)",
      "EDAIC"
    ],
    "rawQualifications": "MD (Anaesthesiology), EDAIC",
    "experience": "11+ Years Experience",
    "image": "/Doctor/DrPrasannaNC.jpg",
    "bio": "Dr. Prasanna. N.C serves as Consultant Anaesthesiologist & Critical Care at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Anaesthesiology), EDAIC), Dr. Prasanna. N.C brings extensive clinical mastery in Anaesthesiology and Critical Care. Registered with medical council registration number 112495, Dr. Prasanna. N.C is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Anaesthesiologist & Critical Care",
    "shortBio": "Dr. Prasanna. N.C is a renowned Consultant Anaesthesiologist & Critical Care in the Department of Anaesthesiology and Critical Care at SilverLine Multispeciality Hospital Trichy with MD (Anaesthesiology), EDAIC credentials.",
    "fullBio": "Dr. Prasanna. N.C serves as Consultant Anaesthesiologist & Critical Care at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Anaesthesiology), EDAIC), Dr. Prasanna. N.C brings extensive clinical mastery in Anaesthesiology and Critical Care. Registered with medical council registration number 112495, Dr. Prasanna. N.C is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "European diploma-level critical care anaesthesia (EDAIC certified)",
      "Fellowship in Regional Anaesthesia",
      "General anaesthesia administration",
      "Peripheral nerve blocks",
      "Central line & arterial line insertion",
      "Mechanical ventilation & critical care monitoring"
    ],
    "regNo": "112495",
    "regDate": "11-Jun-2015",
    "renewalDate": "14-Apr-2031",
    "corePrivileges": [
      "Pre-anaesthetic evaluation & fitness clearance",
      "Peri-operative anaesthesia care across all OT lists",
      "ICU clinical charge & ventilator/critical care management"
    ],
    "proceduralPrivileges": [
      "General anaesthesia administration (all case complexities as credentialed)",
      "Regional anaesthesia - spinal, epidural, combined spinal-epidural",
      "Peripheral nerve blocks (ultrasound-guided)",
      "Difficult airway management & advanced airway procedures",
      "Central line & arterial line insertion",
      "Mechanical ventilation & critical care monitoring",
      "Acute & chronic pain management procedures"
    ],
    "specialPrivileges": [
      "European diploma-level critical care anaesthesia (EDAIC certified)",
      "Fellowship in Regional Anaesthesia"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "ilakkiya",
    "name": "Dr. Ilakkiya",
    "designation": "Consultant Neuro Physician",
    "department": "Neurology",
    "specialties": [
      "neurology"
    ],
    "qualifications": [
      "MD",
      "DM Neurology"
    ],
    "rawQualifications": "MD, DM Neurology",
    "experience": "10+ Years Experience",
    "image": "/Doctor/DrIlakkiya.jpg",
    "bio": "Dr. Ilakkiya serves as Consultant Neuro Physician at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD, DM Neurology), Dr. Ilakkiya brings extensive clinical mastery in Neurology. Registered with medical council registration number 118607, Dr. Ilakkiya is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Neuro Physician",
    "shortBio": "Dr. Ilakkiya is a renowned Consultant Neuro Physician in the Department of Neurology at SilverLine Multispeciality Hospital Trichy with MD, DM Neurology credentials.",
    "fullBio": "Dr. Ilakkiya serves as Consultant Neuro Physician at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD, DM Neurology), Dr. Ilakkiya brings extensive clinical mastery in Neurology. Registered with medical council registration number 118607, Dr. Ilakkiya is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Electroencephalography  interpretation",
      "Nerve conduction study  interpretation",
      "Diagnostic lumbar puncture"
    ],
    "regNo": "118607",
    "regDate": "29-Jun-2016",
    "renewalDate": "46154",
    "corePrivileges": [
      "OP/IP consultation, admission & neurology ward management",
      "Stroke & neuro-emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Acute stroke assessment & IV thrombolysis protocol management",
      "Electroencephalography (EEG) interpretation",
      "Nerve conduction study (NCS) interpretation",
      "Diagnostic lumbar puncture",
      "Management of epilepsy, movement disorders & neuromuscular disease"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "kishwanth",
    "name": "Dr. Kishwanth",
    "designation": "Consultant Medical Gastroenterologist",
    "department": "Medical Gastroenterology",
    "specialties": [
      "medical-gastroenterology"
    ],
    "qualifications": [
      "MD (Gen Med)",
      "DM (Gastro)"
    ],
    "rawQualifications": "MD (Gen Med), DM (Gastro)",
    "experience": "10+ Years Experience",
    "image": "/Doctor/DrKishwanth.jpg",
    "bio": "Dr. Kishwanth serves as Consultant Medical Gastroenterologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Gen Med), DM (Gastro)), Dr. Kishwanth brings extensive clinical mastery in Medical Gastroenterology. Registered with medical council registration number 118135, Dr. Kishwanth is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Medical Gastroenterologist",
    "shortBio": "Dr. Kishwanth is a renowned Consultant Medical Gastroenterologist in the Department of Medical Gastroenterology at SilverLine Multispeciality Hospital Trichy with MD (Gen Med), DM (Gastro) credentials.",
    "fullBio": "Dr. Kishwanth serves as Consultant Medical Gastroenterologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Gen Med), DM (Gastro)), Dr. Kishwanth brings extensive clinical mastery in Medical Gastroenterology. Registered with medical council registration number 118135, Dr. Kishwanth is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Upper GI endoscopy",
      "Colonoscopy with polypectomy",
      "Endoscopic haemostasis",
      "ERCP  - as credentialed",
      "IBD/IBS management"
    ],
    "regNo": "118135",
    "regDate": "21-Jun-2016",
    "renewalDate": "09-Aug-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-procedure management",
      "GI bleed emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Upper GI endoscopy (diagnostic & therapeutic)",
      "Colonoscopy with polypectomy",
      "Endoscopic haemostasis (variceal banding, sclerotherapy, clipping)",
      "ERCP (Endoscopic Retrograde Cholangiopancreatography) - as credentialed",
      "IBD/IBS management",
      "Management of acute/chronic liver disease & GI bleeding"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "v-subhathra",
    "name": "Dr. V. Subhathra",
    "designation": "Consultant Obstetrics & Gynaecologist",
    "department": "Obstetrics and Gynaecology",
    "specialties": [
      "obstetrics-gynaecology"
    ],
    "qualifications": [
      "MD (OG)"
    ],
    "rawQualifications": "MD (OG)",
    "experience": "21+ Years Experience",
    "image": "/Doctor/DrVSubhathra.jpg",
    "bio": "Dr. V. Subhathra serves as Consultant Obstetrics & Gynaecologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (OG)), Dr. V. Subhathra brings extensive clinical mastery in Obstetrics and Gynaecology. Registered with medical council registration number 77656, Dr. V. Subhathra is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Obstetrics & Gynaecologist",
    "shortBio": "Dr. V. Subhathra is a renowned Consultant Obstetrics & Gynaecologist in the Department of Obstetrics and Gynaecology at SilverLine Multispeciality Hospital Trichy with MD (OG) credentials.",
    "fullBio": "Dr. V. Subhathra serves as Consultant Obstetrics & Gynaecologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (OG)), Dr. V. Subhathra brings extensive clinical mastery in Obstetrics and Gynaecology. Registered with medical council registration number 77656, Dr. V. Subhathra is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Caesarean section",
      "Abdominal & vaginal hysterectomy",
      "Laparoscopic gynaecologic surgery"
    ],
    "regNo": "77656",
    "regDate": "12-Dec-2005",
    "renewalDate": "04-May-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & antenatal/gynaecologic management",
      "24x7 obstetric emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Normal vaginal delivery & operative vaginal delivery (forceps/vacuum)",
      "Caesarean section (elective & emergency)",
      "Abdominal & vaginal hysterectomy",
      "Laparoscopic gynaecologic surgery",
      "Management of high-risk pregnancy & obstetric emergencies (PPH, eclampsia)",
      "Dilatation & curettage, MTP and sterilisation procedures"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "kasthuri",
    "name": "Dr. Kasthuri",
    "designation": "Consultant Obstetrics and Gynaecologist",
    "department": "Obstetrics and Gynaecology",
    "specialties": [
      "obstetrics-gynaecology"
    ],
    "qualifications": [
      "DGO",
      "DNB (OG)",
      "CIMP",
      "Fellow in Reproductive Medicine ICOG"
    ],
    "rawQualifications": "DGO, DNB (OG), CIMP, Fellow in Reproductive Medicine ICOG",
    "experience": "16+ Years Experience",
    "image": "/Doctor/DrKasthuri.jpg",
    "bio": "Dr. Kasthuri serves as Consultant Obstetrics and Gynaecologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DGO, DNB (OG), CIMP, Fellow in Reproductive Medicine ICOG), Dr. Kasthuri brings extensive clinical mastery in Obstetrics and Gynaecology. Registered with medical council registration number 88614, Dr. Kasthuri is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Obstetrics and Gynaecologist",
    "shortBio": "Dr. Kasthuri is a renowned Consultant Obstetrics and Gynaecologist in the Department of Obstetrics and Gynaecology at SilverLine Multispeciality Hospital Trichy with DGO, DNB (OG), CIMP, Fellow in Reproductive Medicine ICOG credentials.",
    "fullBio": "Dr. Kasthuri serves as Consultant Obstetrics and Gynaecologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (DGO, DNB (OG), CIMP, Fellow in Reproductive Medicine ICOG), Dr. Kasthuri brings extensive clinical mastery in Obstetrics and Gynaecology. Registered with medical council registration number 88614, Dr. Kasthuri is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Credentialed IMS Menopause Practitioner",
      "Caesarean section",
      "Abdominal & vaginal hysterectomy",
      "Laparoscopic gynaecologic surgery",
      "Dilatation & curettage, MTP procedures"
    ],
    "regNo": "88614",
    "regDate": "18-Jan-2010",
    "renewalDate": "11-04-2026 (MBBS, DGO),\n24-01-2028 (DNB)",
    "corePrivileges": [
      "OP/IP consultation, admission & antenatal/gynaecologic management",
      "24x7 obstetric emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Normal vaginal delivery & operative vaginal delivery (forceps/vacuum)",
      "Caesarean section (elective & emergency)",
      "Abdominal & vaginal hysterectomy",
      "Laparoscopic gynaecologic surgery",
      "Management of high-risk pregnancy & obstetric emergencies (PPH, eclampsia)",
      "Dilatation & curettage, MTP procedures"
    ],
    "specialPrivileges": [
      "Credentialed IMS Menopause Practitioner"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "nagamani",
    "name": "Dr. Nagamani",
    "designation": "Consultant Obstetrics and Gynaecologist",
    "department": "Obstetrics and Gynaecology",
    "specialties": [
      "obstetrics-gynaecology"
    ],
    "qualifications": [
      "MD (OG)",
      "DGO"
    ],
    "rawQualifications": "MD (OG), DGO",
    "experience": "27+ Years Experience",
    "image": "/Doctor/DrNagamani.jpg",
    "bio": "Dr. Nagamani serves as Consultant Obstetrics and Gynaecologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (OG), DGO), Dr. Nagamani brings extensive clinical mastery in Obstetrics and Gynaecology. Registered with medical council registration number 63635, Dr. Nagamani is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Obstetrics and Gynaecologist",
    "shortBio": "Dr. Nagamani is a renowned Consultant Obstetrics and Gynaecologist in the Department of Obstetrics and Gynaecology at SilverLine Multispeciality Hospital Trichy with MD (OG), DGO credentials.",
    "fullBio": "Dr. Nagamani serves as Consultant Obstetrics and Gynaecologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (OG), DGO), Dr. Nagamani brings extensive clinical mastery in Obstetrics and Gynaecology. Registered with medical council registration number 63635, Dr. Nagamani is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Caesarean section",
      "Abdominal & vaginal hysterectomy",
      "Laparoscopic gynaecologic surgery",
      "Dilatation & curettage, MTP procedures"
    ],
    "regNo": "63635",
    "regDate": "01-Mar-1999",
    "renewalDate": "16-Nov-2025",
    "corePrivileges": [
      "OP/IP consultation, admission & antenatal/gynaecologic management",
      "24x7 obstetric emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Normal vaginal delivery & operative vaginal delivery (forceps/vacuum)",
      "Caesarean section (elective & emergency)",
      "Abdominal & vaginal hysterectomy",
      "Laparoscopic gynaecologic surgery",
      "Management of high-risk pregnancy & obstetric emergencies (PPH, eclampsia)",
      "Dilatation & curettage, MTP procedures"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "vasanthakumar",
    "name": "Dr. Vasanthakumar",
    "designation": "Consultant Cardiologist",
    "department": "Cardiology",
    "specialties": [
      "cardiology"
    ],
    "qualifications": [
      "MD (Gen Med)",
      "DM (Cardio)"
    ],
    "rawQualifications": "MD (Gen Med), DM (Cardio)",
    "experience": "16+ Years Experience",
    "image": "/Doctor/DrVasanthakumar.jpg",
    "bio": "Dr. Vasanthakumar serves as Consultant Cardiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Gen Med), DM (Cardio)), Dr. Vasanthakumar brings extensive clinical mastery in Cardiology. Registered with medical council registration number 91374, Dr. Vasanthakumar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Cardiologist",
    "shortBio": "Dr. Vasanthakumar is a renowned Consultant Cardiologist in the Department of Cardiology at SilverLine Multispeciality Hospital Trichy with MD (Gen Med), DM (Cardio) credentials.",
    "fullBio": "Dr. Vasanthakumar serves as Consultant Cardiologist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MD (Gen Med), DM (Cardio)), Dr. Vasanthakumar brings extensive clinical mastery in Cardiology. Registered with medical council registration number 91374, Dr. Vasanthakumar is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Transthoracic & transoesophageal echocardiography",
      "Diagnostic coronary angiography",
      "Percutaneous Coronary Intervention  & stenting",
      "Temporary & permanent pacemaker implantation",
      "Stress testing & non-invasive cardiac evaluation"
    ],
    "regNo": "91374",
    "regDate": "29-Oct-2010",
    "renewalDate": "11-05-2026 (MBBS, MD), \n27-10-2027 (DM)",
    "corePrivileges": [
      "OP/IP consultation, admission & CCU/cardiac ward management",
      "Cardiac emergency on-call cover (ACS, arrhythmia)"
    ],
    "proceduralPrivileges": [
      "Transthoracic & transoesophageal echocardiography (TTE/TEE)",
      "Diagnostic coronary angiography",
      "Percutaneous Coronary Intervention (PTCA) & stenting",
      "Temporary & permanent pacemaker implantation",
      "Management of acute coronary syndromes & cardiogenic shock",
      "Stress testing & non-invasive cardiac evaluation"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "iniya-j",
    "name": "Dr. Iniya J",
    "designation": "Consultant General Surgeon",
    "department": "General Surgery",
    "specialties": [
      "general-surgery",
      "robotic-laparoscopic-surgery"
    ],
    "qualifications": [
      "MS (General Surgery)"
    ],
    "rawQualifications": "MS (General Surgery)",
    "experience": "5+ Years Experience",
    "image": "/Doctor/DrIniyaJ.jpg",
    "bio": "Dr. Iniya J serves as Consultant General Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (General Surgery)), Dr. Iniya J brings extensive clinical mastery in General Surgery. Registered with medical council registration number 158428, Dr. Iniya J is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "General Surgeon",
    "shortBio": "Dr. Iniya J is a renowned Consultant General Surgeon in the Department of General Surgery at SilverLine Multispeciality Hospital Trichy with MS (General Surgery) credentials.",
    "fullBio": "Dr. Iniya J serves as Consultant General Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (General Surgery)), Dr. Iniya J brings extensive clinical mastery in General Surgery. Registered with medical council registration number 158428, Dr. Iniya J is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Appendectomy, cholecystectomy, hernia repair",
      "Breast & thyroid surgery",
      "Trauma laparotomy & damage control surgery"
    ],
    "regNo": "158428",
    "regDate": "19-Jul-2021",
    "renewalDate": "09-Aug-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Emergency general surgical on-call cover"
    ],
    "proceduralPrivileges": [
      "Appendectomy, cholecystectomy, hernia repair",
      "Breast & thyroid surgery (benign disease)",
      "Haemorrhoidectomy, fistulectomy & anorectal procedures",
      "Trauma laparotomy & damage control surgery",
      "Minor surgical procedures: biopsy, abscess drainage, debridement"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "anandha-geethan-k-s",
    "name": "Dr. Anandha Geethan K S",
    "designation": "Consultant Orthopaedics",
    "department": "Orthopaedics",
    "specialties": [
      "orthopedics",
      "spine-surgery"
    ],
    "qualifications": [
      "MS (Ortho)",
      "DNB (Ortho)",
      "MNAMS",
      "FASM (ISAKOS)",
      "FISS (FRANCE)"
    ],
    "rawQualifications": "MS (Ortho), DNB (Ortho), MNAMS, FASM (ISAKOS), FISS (FRANCE)",
    "experience": "9+ Years Experience",
    "image": "/Doctor/DrAnandhaGeethanKS.jpg",
    "bio": "Dr. Anandha Geethan K S serves as Consultant Orthopaedics at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Ortho), DNB (Ortho), MNAMS, FASM (ISAKOS), FISS (FRANCE)), Dr. Anandha Geethan K S brings extensive clinical mastery in Orthopaedics. Registered with medical council registration number 122759, Dr. Anandha Geethan K S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Orthopaedics",
    "shortBio": "Dr. Anandha Geethan K S is a renowned Consultant Orthopaedics in the Department of Orthopaedics at SilverLine Multispeciality Hospital Trichy with MS (Ortho), DNB (Ortho), MNAMS, FASM (ISAKOS), FISS (FRANCE) credentials.",
    "fullBio": "Dr. Anandha Geethan K S serves as Consultant Orthopaedics at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Ortho), DNB (Ortho), MNAMS, FASM (ISAKOS), FISS (FRANCE)), Dr. Anandha Geethan K S brings extensive clinical mastery in Orthopaedics. Registered with medical council registration number 122759, Dr. Anandha Geethan K S is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Arthroscopic surgery (knee/shoulder)",
      "Shoulder replacement and arthroscopy",
      "Sports Injuries Management and rehabilitation",
      "Total hip & knee arthroplasty",
      "Bone/joint biopsy & aspiration",
      "Casting, splinting & fracture manipulation"
    ],
    "regNo": "122759",
    "regDate": "07-Apr-2017",
    "renewalDate": "23-Apr-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Orthopaedic emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Closed & open reduction with internal/external fixation",
      "Total hip & knee arthroplasty (primary & revision)",
      "Trauma surgery incl. poly-trauma fracture management",
      "Bone/joint biopsy & aspiration",
      "Casting, splinting & fracture manipulation"
    ],
    "specialPrivileges": [
      "Arthroscopic surgery (knee/shoulder)",
      "Shoulder replacement and arthroscopy",
      "Sports Injuries Management and rehabilitation"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "shereefa-a-q",
    "name": "Dr. Shereefa A.Q",
    "designation": "Consultant Oral and Maxillofacial Pathology",
    "department": "Oral and Maxillofacial Pathology",
    "specialties": [
      "oral-medicine-dental-surgery"
    ],
    "qualifications": [
      "MDS (Oral Pathology and Microbiology)"
    ],
    "rawQualifications": "MDS (Oral Pathology and Microbiology)",
    "experience": "8+ Years Experience",
    "image": "/Doctor/DrShereefaAQ.jpg",
    "bio": "Dr. Shereefa A.Q serves as Consultant Oral and Maxillofacial Pathology at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MDS (Oral Pathology and Microbiology)), Dr. Shereefa A.Q brings extensive clinical mastery in Oral and Maxillofacial Pathology. Registered with medical council registration number 21321, Dr. Shereefa A.Q is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Oral and Maxillofacial Pathology",
    "shortBio": "Dr. Shereefa A.Q is a renowned Consultant Oral and Maxillofacial Pathology in the Department of Oral and Maxillofacial Pathology at SilverLine Multispeciality Hospital Trichy with MDS (Oral Pathology and Microbiology) credentials.",
    "fullBio": "Dr. Shereefa A.Q serves as Consultant Oral and Maxillofacial Pathology at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MDS (Oral Pathology and Microbiology)), Dr. Shereefa A.Q brings extensive clinical mastery in Oral and Maxillofacial Pathology. Registered with medical council registration number 21321, Dr. Shereefa A.Q is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Oral biopsy & histopathological diagnosis",
      "Cytological evaluation of oral lesions"
    ],
    "regNo": "21321",
    "regDate": "17-Aug-2018",
    "renewalDate": "31-Dec-2027",
    "corePrivileges": [
      "Sign-off authority for oral pathology reports",
      "Consultative oral pathology services for dental/onco-surgical MDT"
    ],
    "proceduralPrivileges": [
      "Oral biopsy & histopathological diagnosis",
      "Oral premalignant/malignant lesion diagnostic reporting",
      "Cytological evaluation of oral lesions"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "john-sudharsan",
    "name": "Dr. John Sudharsan",
    "designation": "Consultant Dental Surgeon",
    "department": "Dental Surgery",
    "specialties": [
      "oral-medicine-dental-surgery"
    ],
    "qualifications": [
      "BDS"
    ],
    "rawQualifications": "BDS",
    "experience": "1+ Years Experience",
    "image": "/Doctor/DrJohnSudharsan.jpg",
    "bio": "Dr. John Sudharsan serves as Consultant Dental Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (BDS), Dr. John Sudharsan brings extensive clinical mastery in Dental Surgery. Registered with medical council registration number 41346, Dr. John Sudharsan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Dental Surgeon",
    "shortBio": "Dr. John Sudharsan is a renowned Consultant Dental Surgeon in the Department of Dental Surgery at SilverLine Multispeciality Hospital Trichy with BDS credentials.",
    "fullBio": "Dr. John Sudharsan serves as Consultant Dental Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (BDS), Dr. John Sudharsan brings extensive clinical mastery in Dental Surgery. Registered with medical council registration number 41346, Dr. John Sudharsan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Dental implants (zygomatic, pterygoid, conventional, corticobasal)",
      "PSI",
      "Dental extractions",
      "Root canal treatment & restorative procedures",
      "Minor oral surgical procedures"
    ],
    "regNo": "41346",
    "regDate": "23-May-2025",
    "renewalDate": "31-Dec-2026",
    "corePrivileges": [
      "OP dental consultation & treatment planning",
      "Pre-treatment dental clearance for oncology/cardiac/surgical patients"
    ],
    "proceduralPrivileges": [
      "Dental extractions (simple & surgical)",
      "Root canal treatment & restorative procedures",
      "Management of dental/oral infections & abscess drainage",
      "Minor oral surgical procedures"
    ],
    "specialPrivileges": [
      "Dental implants (zygomatic, pterygoid, conventional, corticobasal)",
      "PSI"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "bharanidharan",
    "name": "Dr. Bharanidharan",
    "designation": "Consultant Paediatric Surgeon",
    "department": "Paediatric Surgery",
    "specialties": [
      "pediatric-surgery",
      "pediatrics"
    ],
    "qualifications": [
      "MS (General Surgery)",
      "MCh (Paediatric Surgery)"
    ],
    "rawQualifications": "MS (General Surgery), MCh (Paediatric Surgery)",
    "experience": "9+ Years Experience",
    "image": "/Doctor/DrBharanidharan.jpg",
    "bio": "Dr. Bharanidharan serves as Consultant Paediatric Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (General Surgery), MCh (Paediatric Surgery)), Dr. Bharanidharan brings extensive clinical mastery in Paediatric Surgery. Registered with medical council registration number 122834, Dr. Bharanidharan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Paediatric Surgeon",
    "shortBio": "Dr. Bharanidharan is a renowned Consultant Paediatric Surgeon in the Department of Paediatric Surgery at SilverLine Multispeciality Hospital Trichy with MS (General Surgery), MCh (Paediatric Surgery) credentials.",
    "fullBio": "Dr. Bharanidharan serves as Consultant Paediatric Surgeon at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (General Surgery), MCh (Paediatric Surgery)), Dr. Bharanidharan brings extensive clinical mastery in Paediatric Surgery. Registered with medical council registration number 122834, Dr. Bharanidharan is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Neonatal surgery",
      "Hernia, hydrocele & undescended testis repair",
      "Paediatric laparoscopic surgery"
    ],
    "regNo": "122834",
    "regDate": "11-Apr-2017",
    "renewalDate": "08-Apr-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Neonatal & paediatric surgical emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Neonatal surgery (TEF, diaphragmatic hernia, intestinal atresia)",
      "Hernia, hydrocele & undescended testis repair",
      "Hypospadias & other genitourinary reconstructive surgery",
      "Paediatric laparoscopic surgery",
      "Management of congenital anomalies requiring surgical correction"
    ],
    "specialPrivileges": [],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "sarath-chander",
    "name": "Dr. Sarath Chander",
    "designation": "Consultant Orthopaedics and Spine Surgery Specialist",
    "department": "Spine Surgery",
    "specialties": [
      "spine-surgery",
      "orthopedics"
    ],
    "qualifications": [
      "MS (Orthopaedics)",
      "Fellowship in Spine Surgery"
    ],
    "rawQualifications": "MS (Orthopaedics), Fellowship in Spine Surgery",
    "experience": "16+ Years Experience",
    "image": "/Doctor/DrSarathChander.jpg",
    "bio": "Dr. Sarath Chander serves as Consultant Orthopaedics and Spine Surgery Specialist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Orthopaedics), Fellowship in Spine Surgery), Dr. Sarath Chander brings extensive clinical mastery in Spine Surgery. Registered with medical council registration number 90099, Dr. Sarath Chander is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Orthopaedics and Spine Surgery Specialist",
    "shortBio": "Dr. Sarath Chander is a renowned Consultant Orthopaedics and Spine Surgery Specialist in the Department of Spine Surgery at SilverLine Multispeciality Hospital Trichy with MS (Orthopaedics), Fellowship in Spine Surgery credentials.",
    "fullBio": "Dr. Sarath Chander serves as Consultant Orthopaedics and Spine Surgery Specialist at SilverLine Multispeciality Hospital, Tiruchirappalli. Holding prestigious qualifications (MS (Orthopaedics), Fellowship in Spine Surgery), Dr. Sarath Chander brings extensive clinical mastery in Spine Surgery. Registered with medical council registration number 90099, Dr. Sarath Chander is dedicated to evidence-based clinical protocols, patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu.",
    "philosophy": "Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.",
    "expertise": [
      "Complex spine surgery (Fellowship in Spine Surgery)",
      "Lumbar/cervical discectomy & decompression",
      "Spinal fusion with instrumentation",
      "Minimally invasive spine surgery",
      "Spinal tumour excision"
    ],
    "regNo": "90099",
    "regDate": "26-May-2010",
    "renewalDate": "11-Mar-2031",
    "corePrivileges": [
      "OP/IP consultation, admission & peri-operative management",
      "Spine trauma emergency on-call cover"
    ],
    "proceduralPrivileges": [
      "Lumbar/cervical discectomy & decompression",
      "Spinal fusion with instrumentation",
      "Minimally invasive spine surgery",
      "Management of spinal trauma & deformity correction",
      "Spinal tumour excision (as credentialed)"
    ],
    "specialPrivileges": [
      "Complex spine surgery (Fellowship in Spine Surgery)"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "raj-thilak-r",
    "name": "Dr. Raj Thilak. R",
    "designation": "Consultant Interventional Pulmonologist & Sleep Medicine Specialist",
    "department": "Pulmonology",
    "specialties": [
      "pulmonology",
      "critical-care-medicine"
    ],
    "qualifications": [
      "MD (Pulmonary Medicine)"
    ],
    "rawQualifications": "MD (Pulmonary Medicine)",
    "experience": "12+ Years Experience",
    "image": "/Doctor/Dr.R.Rajthilak.jpg",
    "bio": "Dr. Raj Thilak. R specializes in interventional pulmonology, asthma, COPD, and sleep apnea management at SilverLine Hospital.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Interventional Pulmonologist",
    "shortBio": "Dr. Raj Thilak. R is a specialist in Pulmonary Medicine with MD (Pulmonary Medicine).",
    "fullBio": "Dr. Raj Thilak. R is highly experienced in Pulmonology and critical respiratory care at SilverLine Hospital.",
    "philosophy": "Empowering patients to breathe easier through compassionate, advanced respiratory care.",
    "expertise": [
      "Interventional Pulmonology",
      "Bronchoscopy",
      "Sleep Apnea",
      "COPD & Asthma Management"
    ],
    "regNo": "89421",
    "regDate": "15-May-2010",
    "renewalDate": "15-May-2030",
    "corePrivileges": [
      "OP/IP consultation, admission & respiratory intensive care management"
    ],
    "proceduralPrivileges": [
      "Flexible bronchoscopy",
      "Pleural aspiration and chest tube insertion",
      "Sleep study interpretation (Polysomnography)"
    ],
    "specialPrivileges": [
      "Interventional Pulmonology & Cryobiopsy"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  },
  {
    "id": "s-thayumanavan",
    "name": "Dr. S. Thayumanavan",
    "designation": "Consultant Pediatric & Preventive Dentist",
    "department": "Dental Surgery",
    "specialties": [
      "oral-medicine-dental-surgery",
      "pediatric-surgery"
    ],
    "qualifications": [
      "MDS"
    ],
    "rawQualifications": "MDS",
    "experience": "14+ Years Experience",
    "image": "/Doctor/Dr.S.Thayumanavan.jpg",
    "bio": "Dr. S. Thayumanavan specializes in preventive and restorative pediatric dentistry, infant oral health, and dental traumatology.",
    "role": null,
    "languages": [
      "English",
      "Tamil"
    ],
    "specialty": "Pediatric & Preventive Dentist",
    "shortBio": "Dr. S. Thayumanavan is a specialist in Dental Surgery & Pedodontics with MDS qualifications.",
    "fullBio": "Dr. S. Thayumanavan brings extensive pediatric dentistry experience, dedicated to gentle and anxiety-free oral care for children.",
    "philosophy": "Creating positive, anxiety-free dental experiences for children with gentle expertise.",
    "expertise": [
      "Pediatric Dentistry",
      "Preventive Oral Health",
      "Dental Traumatology",
      "Intercept Orthodontics"
    ],
    "regNo": "18492",
    "regDate": "20-Nov-2008",
    "renewalDate": "31-Dec-2028",
    "corePrivileges": [
      "OP dental consultation & pediatric treatment planning"
    ],
    "proceduralPrivileges": [
      "Pediatric restorative dentistry",
      "Pulp therapy for primary teeth",
      "Management of dental trauma"
    ],
    "specialPrivileges": [
      "Hospital dentistry under general anaesthesia"
    ],
    "social": {
      "linkedin": "https://www.linkedin.com/",
      "twitter": "https://twitter.com/"
    }
  }
];

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctorsList.find(d => d.id === id);
};

export const getDoctorsByDepartment = (department: string): Doctor[] => {
  const normalized = department.toLowerCase().trim();
  return doctorsList.filter(d => 
    d.department.toLowerCase().includes(normalized) ||
    d.specialties.some(s => s.toLowerCase().includes(normalized)) ||
    d.designation.toLowerCase().includes(normalized)
  );
};

export const getDoctorsBySpecialty = (specialtySlug: string): Doctor[] => {
  return doctorsList.filter(d => d.specialties.includes(specialtySlug));
};
