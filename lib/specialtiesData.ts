import React from 'react';

export interface SpecialtyFAQ {
  question: string;
  answer: string;
}

export interface SpecialtyItem {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  iconPath: string;
  heroImage: string;
  description: string;
  services: string[];
  gallery: string[];
  keywords: string[];
  faqs: SpecialtyFAQ[];
}

export const specialtiesList: SpecialtyItem[] = [
  {
    "id": "general-medicine",
    "name": "General Medicine",
    "shortDescription": "Primary care, chronic disease management, and internal medicine specialist care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.generalMedicine",
    "heroImage": "imagePaths.specialties.generalMedicineHero",
    "description": "The Department of General Medicine at SilverLine Multispeciality Hospital provides comprehensive diagnosis, evidence-based treatment, and preventive care for a broad spectrum of acute and chronic adult health conditions in Tiruchirappalli and Central Tamil Nadu.\n\nOur experienced internal medicine physicians work in close coordination with super-specialists to manage lifestyle disorders such as diabetes, hypertension, dyslipidemia, thyroid diseases, infectious ailments, and complex multi-system disorders with personalized care and advanced diagnostics.",
    "services": [
      "Comprehensive health evaluation and adult medical consultation",
      "Diabetes mellitus, hypertension, and metabolic syndrome management",
      "Fever clinic and infectious disease diagnostics (Dengue, Typhoid, Viral infections)",
      "Geriatric care and chronic multi-system illness management",
      "Preventive health check-ups and adult vaccination programs",
      "Thyroid, respiratory, and gastrointestinal medical consultations"
    ],
    "gallery": [],
    "keywords": [
      "general medicine trichy",
      "physician in trichy",
      "internal medicine specialist",
      "diabetes doctor trichy",
      "fever hospital trichy"
    ],
    "faqs": [
      {
        "question": "When should I consult an internal medicine physician at SilverLine Hospital?",
        "answer": "You should consult a General Medicine physician for persistent fever, unexplained fatigue, respiratory symptoms, digestive complaints, or ongoing management of chronic conditions such as diabetes, high blood pressure, and cholesterol disorders."
      },
      {
        "question": "How are chronic conditions like diabetes and hypertension managed?",
        "answer": "Our physicians formulate individualized treatment plans combining regular biometric monitoring, modern pharmacology, dietary planning, lifestyle modifications, and periodic organ health screenings to prevent long-term complications."
      },
      {
        "question": "Does the hospital provide specialized fever and infectious disease diagnosis?",
        "answer": "Yes, our 24/7 diagnostic laboratory and fever clinic provide rapid testing for vector-borne and seasonal infections including dengue, malaria, typhoid, and influenza, supported by round-the-clock medical supervision."
      },
      {
        "question": "Are preventive health check-up packages available under General Medicine?",
        "answer": "Yes, SilverLine Hospital offers tailored master health checkups and executive screening packages designed for early detection of cardiac, metabolic, hepatic, and renal conditions."
      }
    ],
    "icon": "/Icons/1.png"
  },
  {
    "id": "general-surgery",
    "name": "General Surgery",
    "shortDescription": "Advanced general, open, and minimally invasive laparoscopic surgical procedures in Trichy.",
    "iconPath": "imagePaths.specialties.icons.generalSurgery",
    "heroImage": "imagePaths.specialties.generalSurgeryHero",
    "description": "The Department of General Surgery at SilverLine Hospital provides state-of-the-art surgical interventions delivered by skilled surgeons, anesthesiologists, and specialized surgical nursing staff. \n\nWe prioritize minimally invasive laparoscopic techniques that reduce postoperative pain, shorten hospital stays, and promote faster functional recovery for conditions involving the abdomen, digestive tract, thyroid, breast, and soft tissues.",
    "services": [
      "Laparoscopic (Keyhole) Hernia Repair (Inguinal, Umbilical, Incisional)",
      "Laparoscopic Cholecystectomy (Gallbladder stone removal)",
      "Laparoscopic Appendectomy for acute and chronic appendicitis",
      "Thyroidectomy and salivary gland surgeries",
      "Advanced Ano-Rectal procedures (Laser Piles, Fissure, Fistula treatment)",
      "Trauma surgery and emergency abdominal exploration",
      "Diabetic foot ulcer debridement and wound management"
    ],
    "gallery": [],
    "keywords": [
      "general surgery trichy",
      "laparoscopic surgeon trichy",
      "hernia surgery trichy",
      "gallbladder stone surgery trichy",
      "laser piles treatment trichy"
    ],
    "faqs": [
      {
        "question": "What are the main advantages of laparoscopic surgery over open surgery?",
        "answer": "Laparoscopic (keyhole) surgery utilizes miniature incisions, resulting in significantly reduced pain, minimal scarring, lower risk of wound infection, and faster return to normal daily activities within days."
      },
      {
        "question": "How soon can I return to daily activities after laparoscopic hernia or gallbladder surgery?",
        "answer": "Most patients undergoing laparoscopic procedures are mobilized within 12 to 24 hours and can resume light routine activities within 3 to 5 days, depending on clinical progress."
      },
      {
        "question": "What modern treatments are offered for piles, fissure, and fistula?",
        "answer": "We provide advanced minimally invasive and laser ano-rectal procedures that minimize tissue trauma, ensure day-care discharge, and ensure comfortable, pain-free recovery."
      },
      {
        "question": "How do I prepare for a planned elective surgery at SilverLine Hospital?",
        "answer": "Prior to elective surgery, our team conducts pre-anesthesia health evaluations, blood work, imaging tests, and provides specific fasting and medication instructions to ensure maximum patient safety."
      }
    ],
    "icon": "/Icons/2.png"
  },
  {
    "id": "emergency-medicine",
    "name": "Emergency Medicine",
    "shortDescription": "24/7 rapid response trauma, cardiac, stroke, and critical emergency care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.emergencyMedicine",
    "heroImage": "imagePaths.specialties.criticalCareHero",
    "description": "SilverLine Hospital's Emergency Medicine Department operates 24 hours a day, 365 days a year, providing immediate, lifesaving medical intervention for acute medical emergencies, polytrauma, stroke, and cardiac events.\n\nEquipped with dedicated triage zones, state-of-the-art resuscitation bays, advanced life support ambulances, and round-the-clock emergency physicians, our department ensures that the critical \"Golden Hour\" of patient care is strictly protected.",
    "services": [
      "24/7 Polytrauma and road accident emergency resuscitation",
      "Acute chest pain and Primary Angioplasty (PCI) emergency protocol",
      "Rapid acute ischemic stroke intervention and thrombolysis",
      "Advanced Cardiac Life Support (ACLS) and Pediatric Life Support (PALS)",
      "Toxicology, snake bite, and poison treatment protocol",
      "24/7 Advanced Cardiac Life Support (ACLS) Ambulance services"
    ],
    "gallery": [],
    "keywords": [
      "emergency hospital trichy",
      "24 hours hospital trichy",
      "trauma care trichy",
      "casualty hospital trichy",
      "ambulance service trichy"
    ],
    "faqs": [
      {
        "question": "Is the emergency casualty unit at SilverLine Hospital open 24 hours?",
        "answer": "Yes, our Emergency and Trauma Centre operates 24/7 with emergency physicians, trauma surgeons, anesthesiologists, radiographers, and critical care nurses immediately available on-site."
      },
      {
        "question": "How does SilverLine handle acute cardiac and heart attack emergencies?",
        "answer": "Patients presenting with acute chest pain are triaged within minutes for immediate ECG, cardiac biomarkers, and direct Cath Lab activation for emergency primary angioplasty when required."
      },
      {
        "question": "What is the protocol for road accident and trauma emergencies?",
        "answer": "Our trauma team utilizes advanced ATLS (Advanced Trauma Life Support) protocols, with multi-slice CT scanning, immediate surgical suites, and blood bank coordination for rapid stabilization."
      },
      {
        "question": "How can I request an emergency ambulance in Trichy?",
        "answer": "You can reach our 24/7 emergency dispatch helpline immediately at 0431-2906470 or +91 96773 36097 for immediate GPS-enabled ICU ambulance deployment."
      }
    ],
    "icon": "/Icons/3.png"
  },
  {
    "id": "critical-care-medicine",
    "name": "Critical Care",
    "shortDescription": "Advanced Intensive Care Units (ICU) with continuous multi-organ monitoring and life support.",
    "iconPath": "imagePaths.specialties.icons.criticalCare",
    "heroImage": "imagePaths.specialties.criticalCareHero",
    "description": "The Department of Critical Care Medicine at SilverLine Hospital provides 24/7 specialized monitoring and intensive clinical support for patients experiencing life-threatening physiological crises.\n\nOur ICU is equipped with advanced invasive/non-invasive ventilators, continuous hemodynamic monitoring, bedside dialysis, high-flow nasal oxygen systems, and isolation suites managed by qualified intensivists and critical care nursing specialists.",
    "services": [
      "24/7 Multi-disciplinary Medical & Surgical Intensive Care Unit (ICU)",
      "Invasive and non-invasive mechanical ventilation protocols",
      "Continuous hemodynamic and arterial blood gas (ABG) monitoring",
      "Severe sepsis, septic shock, and multi-organ dysfunction syndrome (MODS) management",
      "Bedside Continuous Renal Replacement Therapy (CRRT) and hemodialysis",
      "Post-operative high-dependency monitoring after major complex surgeries"
    ],
    "gallery": [],
    "keywords": [
      "icu hospital trichy",
      "critical care specialist trichy",
      "intensive care unit trichy",
      "ventilator support hospital trichy"
    ],
    "faqs": [
      {
        "question": "What types of intensive care units are available at SilverLine Hospital?",
        "answer": "We maintain specialized Medical Intensive Care Units (MICU), Surgical Intensive Care Units (SICU), Coronary Care Units (CCU), and Post-Operative Recovery Units tailored for distinct patient requirements."
      },
      {
        "question": "How are infection control standards maintained in the ICU?",
        "answer": "Our ICUs adhere to strict international infection control guidelines, including HEPA-filtered air circulation, dedicated barrier nursing, automated hand sanitization stations, and rigorous antibiotic stewardship."
      },
      {
        "question": "What are the visiting guidelines for family members in the ICU?",
        "answer": "To protect critically ill patients from infection while ensuring family reassurance, designated visiting hours are established with protective PPE and counseling briefings by treating intensivists."
      }
    ],
    "icon": "/Icons/4.png"
  },
  {
    "id": "medical-oncology",
    "name": "Medical Oncology",
    "shortDescription": "Evidence-based chemotherapy, targeted therapy, and immunotherapy for cancer care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.medicalOncology",
    "heroImage": "imagePaths.specialties.oncologyHero",
    "description": "The Department of Medical Oncology at SilverLine Hospital provides compassionate, protocol-driven cancer treatment tailored to each patient's molecular and genetic tumor profile.\n\nOur medical oncologists administer intravenous and oral chemotherapies, precision targeted therapies, and modern immunotherapies within modern, comfortable daycare infusion suites designed for patient comfort and safety.",
    "services": [
      "Comprehensive cancer diagnosis, staging, and molecular profiling",
      "Outpatient daycare chemotherapy infusion and biological therapy",
      "Targeted molecular therapy for lung, breast, colorectal, and renal cancers",
      "Immunotherapy regimens targeting immune checkpoint inhibitors",
      "Hormone therapy for breast, ovarian, and prostate malignancies",
      "Palliative cancer care and symptom management"
    ],
    "gallery": [],
    "keywords": [
      "cancer hospital trichy",
      "medical oncology trichy",
      "chemotherapy trichy",
      "cancer specialist trichy",
      "immunotherapy hospital trichy"
    ],
    "faqs": [
      {
        "question": "What cancer types are treated in the Medical Oncology department?",
        "answer": "We treat solid tumors including breast, lung, gastrointestinal, gynecological, head and neck, prostate, and urological cancers, as well as hematologic malignancies like lymphoma and myeloma."
      },
      {
        "question": "Can chemotherapy be administered as a daycare procedure?",
        "answer": "Yes, a significant number of chemotherapy and targeted biological infusions are administered in our dedicated daycare unit, allowing patients to return home the same day."
      },
      {
        "question": "How are chemotherapy side effects managed at SilverLine Hospital?",
        "answer": "Our oncologists prescribe supportive anti-emetics, growth factor injections, nutritional guidance, and protective medications to minimize nausea, hair loss impact, fatigue, and infection risk."
      },
      {
        "question": "What is the role of targeted therapy and immunotherapy in cancer treatment?",
        "answer": "Targeted therapies attack specific genetic mutations in cancer cells while sparing healthy tissue, while immunotherapy empowers the body’s own immune system to recognize and destroy tumor cells."
      }
    ],
    "icon": "/Icons/5.png"
  },
  {
    "id": "surgical-oncology",
    "name": "Surgical Oncology",
    "shortDescription": "Precision tumor resection, organ-preserving surgeries, and oncological resections in Trichy.",
    "iconPath": "imagePaths.specialties.icons.surgicalOncology",
    "heroImage": "imagePaths.specialties.surgicalOncologyHero",
    "description": "The Department of Surgical Oncology at SilverLine Hospital specializes in the surgical diagnosis, staging, and radical resection of benign and malignant tumors.\n\nOur oncological surgeons focus on organ preservation, oncoplastic reconstructions, and minimally invasive techniques to achieve clear tumor margins while maximizing quality of life and functional recovery for cancer patients.",
    "services": [
      "Breast cancer surgery, lumpectomy, and oncoplastic breast reconstruction",
      "Head and neck tumor resection with microvascular reconstructive surgery",
      "Gastrointestinal and colorectal cancer resections (Stomach, Colon, Rectum)",
      "Gynecological oncology surgeries for ovarian, uterine, and cervical cancers",
      "Urological tumor surgeries (Kidney, Bladder, Prostate)",
      "Sentinel lymph node biopsy and radical lymphadenectomy"
    ],
    "gallery": [],
    "keywords": [
      "surgical oncologist trichy",
      "cancer surgery trichy",
      "breast cancer surgery trichy",
      "tumor removal hospital trichy",
      "onco surgeon trichy"
    ],
    "faqs": [
      {
        "question": "What is organ-preserving cancer surgery?",
        "answer": "Organ-preserving surgery aims to remove the entire cancerous tumor with clear margins while preserving as much normal healthy tissue and organ function as possible, such as in breast-conserving surgery (lumpectomy)."
      },
      {
        "question": "Are cancer surgeries evaluated by a multidisciplinary tumor board?",
        "answer": "Yes, complex cancer cases are reviewed in multidisciplinary tumor board meetings involving surgical oncologists, medical oncologists, radiation oncologists, pathologists, and radiologists to decide the optimal sequence of treatment."
      },
      {
        "question": "How long does recovery take after cancer surgery?",
        "answer": "Recovery timelines depend on the specific procedure and whether minimally invasive techniques were used. Most patients are discharged within 3 to 7 days and receive structured post-operative rehabilitation."
      }
    ],
    "icon": "/Icons/6.png"
  },
  {
    "id": "radiation-oncology",
    "name": "Radiation Oncology",
    "shortDescription": "Targeted linear accelerator radiation therapy delivering pinpoint accuracy for cancer treatment.",
    "iconPath": "imagePaths.specialties.icons.radiationOncology",
    "heroImage": "imagePaths.specialties.radiationOncologyHero",
    "description": "The Department of Radiation Oncology delivers advanced radiation treatment protocols designed to destroy cancer cells with sub-millimeter precision while safeguarding adjacent healthy tissues and organs.\n\nUtilizing advanced planning software and computerized beam modulation, our radiation oncologists provide curative, adjuvant, and palliative radiation therapies for patients across Tamil Nadu.",
    "services": [
      "Intensity Modulated Radiation Therapy (IMRT)",
      "Image Guided Radiation Therapy (IGRT)",
      "Stereotactic Radiosurgery (SRS) and Stereotactic Body Radiotherapy (SBRT)",
      "Brachytherapy (Internal radiation therapy)",
      "Palliative radiotherapy for pain and symptom relief in advanced tumors"
    ],
    "gallery": [],
    "keywords": [
      "radiation oncology trichy",
      "radiotherapy trichy",
      "imrt igrt trichy",
      "cancer radiation hospital trichy"
    ],
    "faqs": [
      {
        "question": "How does modern radiation therapy protect healthy organs?",
        "answer": "Advanced techniques like IMRT and IGRT shape high-energy X-ray beams precisely to the contours of the tumor in 3D, delivering maximum therapeutic doses to tumor cells while keeping radiation to surrounding organs at safe minimum levels."
      },
      {
        "question": "Does radiation therapy make the patient radioactive?",
        "answer": "No, external beam radiation therapy (IMRT/IGRT) does not make your body radioactive. You are completely safe to be around family, children, and pregnant individuals immediately after treatment sessions."
      },
      {
        "question": "How long does a typical radiation therapy session last?",
        "answer": "While the actual radiation delivery takes only 2 to 5 minutes, daily appointments typically take 15 to 20 minutes for precise patient positioning and image-guided verification."
      }
    ],
    "icon": "/Icons/7.png"
  },
  {
    "id": "medical-gastroenterology",
    "name": "Medical Gastroenterology",
    "shortDescription": "Comprehensive care for liver, stomach, bowel, pancreatic, and digestive disorders in Trichy.",
    "iconPath": "imagePaths.specialties.icons.medicalGastroenterology",
    "heroImage": "imagePaths.specialties.gastroHero",
    "description": "The Department of Medical Gastroenterology at SilverLine Hospital specializes in the prevention, diagnosis, and non-surgical management of digestive tract, liver, biliary, and pancreatic conditions.\n\nOur state-of-the-art endoscopy suite offers high-definition upper GI endoscopy, colonoscopy, endoscopic mucosal resection (EMR), and ERCP procedures for rapid diagnosis and therapeutic intervention.",
    "services": [
      "Upper Gastrointestinal (GI) Endoscopy and Biopsy",
      "Diagnostic and therapeutic Colonoscopy with Polypectomy",
      "Liver Disease and Hepatitis care clinic (Fatty Liver, Cirrhosis, Viral Hepatitis)",
      "Gastroesophageal Reflux Disease (GERD), acidity, and peptic ulcer treatment",
      "Inflammatory Bowel Disease (IBD: Ulcerative Colitis & Crohn's Disease) management",
      "Endoscopic retrograde cholangiopancreatography (ERCP) for bile duct stones"
    ],
    "gallery": [],
    "keywords": [
      "gastroenterologist trichy",
      "endoscopy hospital trichy",
      "colonoscopy trichy",
      "liver specialist trichy",
      "stomach doctor trichy"
    ],
    "faqs": [
      {
        "question": "When should I consult a gastroenterologist for digestive issues?",
        "answer": "You should seek consultation for persistent acid reflux, difficulty swallowing, unexplained weight loss, chronic abdominal pain, blood in stool, persistent diarrhea, jaundice, or abnormal liver function tests."
      },
      {
        "question": "Is an endoscopy or colonoscopy painful?",
        "answer": "Endoscopic and colonoscopic procedures are performed under gentle intravenous sedation, making them completely comfortable and virtually painless for patients."
      },
      {
        "question": "How is Fatty Liver Disease diagnosed and managed?",
        "answer": "Fatty liver is evaluated through liver ultrasound, blood tests, and FibroScan screening. Treatment focuses on targeted metabolic interventions, lifestyle adjustments, and medication to reverse steatosis and prevent progression."
      }
    ],
    "icon": "/Icons/8.png"
  },
  {
    "id": "surgical-gastroenterology",
    "name": "Surgical Gastroenterology",
    "shortDescription": "Minimally invasive GI surgery for gallstones, stomach, colorectal, liver, and pancreatic disorders.",
    "iconPath": "imagePaths.specialties.icons.surgicalGastroenterology",
    "heroImage": "imagePaths.specialties.surgicalGastroenterologyHero",
    "description": "The Department of Surgical Gastroenterology at SilverLine Hospital delivers surgical care for complex diseases of the gastrointestinal tract, liver, pancreas, and biliary system.\n\nOur GI surgeons utilize advanced laparoscopic and keyhole surgical techniques to treat gallstones, gastrointestinal tumors, intestinal obstructions, complex hernias, and bariatric weight-loss requirements.",
    "services": [
      "Advanced Laparoscopic Cholecystectomy and Bile Duct exploration",
      "Laparoscopic Colorectal Resection for benign and malignant conditions",
      "Hepato-Pancreato-Biliary (HPB) surgery for liver and pancreatic tumors",
      "Surgical management of complex abdominal hernias and enterocutaneous fistulas",
      "Bariatric and metabolic surgery for severe obesity management",
      "Emergency surgery for bowel perforation, obstruction, and GI bleeding"
    ],
    "gallery": [],
    "keywords": [
      "surgical gastroenterologist trichy",
      "gi surgeon trichy",
      "laparoscopic gallstone surgery trichy",
      "pancreatic surgery hospital trichy"
    ],
    "faqs": [
      {
        "question": "What surgical treatments are available for gallstones?",
        "answer": "The standard treatment for symptomatic gallstones is Laparoscopic Cholecystectomy (surgical removal of the gallbladder through tiny keyhole incisions), ensuring fast healing and minimal discomfort."
      },
      {
        "question": "Can you live a normal healthy life without a gallbladder?",
        "answer": "Yes, the liver continues to produce bile for digestion even without a gallbladder. Most patients resume normal dietary habits within a few weeks after surgery."
      },
      {
        "question": "What is Bariatric Surgery and who qualifies for it?",
        "answer": "Bariatric surgery is a metabolic procedure (such as sleeve gastrectomy or gastric bypass) designed for individuals with severe obesity (BMI over 35) or obesity-related type 2 diabetes and hypertension."
      }
    ],
    "icon": "/Icons/9.png"
  },
  {
    "id": "urology",
    "name": "Urology",
    "shortDescription": "Advanced laser kidney stone surgery, prostate management, and urological care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.urology",
    "heroImage": "imagePaths.specialties.urologyHero",
    "description": "The Department of Urology at SilverLine Hospital offers minimally invasive and laser endourological treatments for kidney stones, enlarged prostate (BPH), urinary tract infections, and urological cancers.\n\nOur urologists use advanced laser technology including RIRS, PCNL, and mini-PCNL to fragment stones with precision, enabling painless recovery with minimal hospital stay.",
    "services": [
      "Retrograde Intrarenal Surgery (RIRS) with Flexible Ureteroscopy and Holmium Laser",
      "Percutaneous Nephrolithotomy (PCNL) & Mini-PCNL for large kidney stones",
      "Laser Prostatectomy and Transurethral Resection of the Prostate (TURP for BPH)",
      "Urological Oncology for Kidney, Bladder, and Prostate tumors",
      "Reconstructive urology, urethral stricture repair, and ureteric reimplantation",
      "Andrology, male infertility, and erectile dysfunction clinic"
    ],
    "gallery": [],
    "keywords": [
      "urologist trichy",
      "kidney stone laser surgery trichy",
      "rirs surgery trichy",
      "prostate laser surgery trichy",
      "urology hospital trichy"
    ],
    "faqs": [
      {
        "question": "What is RIRS Laser Kidney Stone Surgery?",
        "answer": "RIRS (Retrograde Intrarenal Surgery) is an incision-free procedure where a flexible scope is passed through the natural urinary tract into the kidney, and the stones are pulverized into dust using high-precision laser energy."
      },
      {
        "question": "What are the symptoms of an enlarged prostate (BPH) in men?",
        "answer": "Common symptoms include weak urinary stream, frequent nighttime urination, hesitancy, sensation of incomplete bladder emptying, and sudden urinary urgency."
      },
      {
        "question": "How long does recovery take after laser kidney stone treatment?",
        "answer": "Because laser stone surgery requires no external cuts or incisions, most patients are discharged within 24 to 48 hours and return to work within a few days."
      }
    ],
    "icon": "/Icons/10.png"
  },
  {
    "id": "nephrology",
    "name": "Nephrology",
    "shortDescription": "Comprehensive renal care, 24/7 hemodialysis, and kidney disease management in Trichy.",
    "iconPath": "imagePaths.specialties.icons.nephrology",
    "heroImage": "imagePaths.specialties.urologyHero",
    "description": "The Department of Nephrology at SilverLine Hospital provides expert care for acute kidney injury (AKI), chronic kidney disease (CKD), glomerulonephritis, and hypertension-related renal disorders.\n\nOur dedicated Dialysis Unit operates 24/7 with advanced bicarbonate hemodialysis machines, high-flux dialyzers, ultra-pure RO water filtration, and comprehensive pre/post-kidney transplant protocols.",
    "services": [
      "Diagnosis and treatment of Acute Kidney Injury and Chronic Kidney Disease (CKD)",
      "24/7 Modern Hemodialysis and Sustained Low-Efficiency Dialysis (SLED)",
      "Ultrasound-guided percutaneous renal biopsy",
      "Temporary and permanent vascular access (Jugular catheters & Permacath insertion)",
      "Diabetic and hypertensive kidney disease management",
      "Pre-transplant evaluation and long-term post-transplant follow-up"
    ],
    "gallery": [],
    "keywords": [
      "nephrologist trichy",
      "dialysis centre trichy",
      "kidney doctor trichy",
      "ckd treatment trichy",
      "hemodialysis hospital trichy"
    ],
    "faqs": [
      {
        "question": "What are the early warning signs of chronic kidney disease (CKD)?",
        "answer": "Early symptoms include swelling in the feet and ankles, persistent fatigue, foamy urine, changes in urination frequency, high blood pressure, and loss of appetite. Routine blood creatinine and urine protein tests are essential for early detection."
      },
      {
        "question": "How does 24/7 Hemodialysis at SilverLine ensure patient safety?",
        "answer": "Our dialysis unit features state-of-the-art hemodialysis machines, double-pass reverse osmosis (RO) purified water, strict single-use dialyzer protocols, and continuous monitoring by nephrologists and certified dialysis technologists."
      },
      {
        "question": "Can kidney disease progression be slowed down without dialysis?",
        "answer": "In early and moderate stages of CKD, strict blood pressure and glucose management, low-sodium renal diets, and renoprotective medications can significantly slow disease progression and delay the need for dialysis."
      }
    ],
    "icon": "/Icons/11.png"
  },
  {
    "id": "orthopedics",
    "name": "Orthopedics",
    "icon": "/Icons/12.png",
    "iconPath": "imagePaths.specialties.icons.orthopedics",
    "shortDescription": "Advanced joint replacement, trauma surgery, arthroscopy, and spine rehabilitation in Trichy.",
    "heroImage": "imagePaths.specialties.orthopedicsHero",
    "description": "The Department of Orthopedics & Joint Replacement at SilverLine Hospital delivers cutting-edge musculoskeletal care, from complex trauma reconstruction and sports injury management to robotic-assisted total knee and hip replacements in Tiruchirappalli.\n\nOur senior orthopedic surgeons employ minimally invasive surgical protocols, accelerated rehabilitation pathways, and state-of-the-art laminar airflow surgical suites to ensure faster recovery, minimal blood loss, and optimal mobility restoration.",
    "services": [
      "Total Knee Replacement (TKR) and Total Hip Replacement (THR)",
      "Arthroscopic knee (ACL/PCL/Meniscus) and shoulder reconstruction",
      "Complex trauma, multi-fragment fractures, and non-union surgeries",
      "Pediatric orthopedics and congenital deformity correction",
      "Spine fracture management and degenerative disc disease care",
      "Geriatric fracture management with same-day mobilization"
    ],
    "gallery": [],
    "keywords": [
      "orthopedic hospital trichy",
      "best orthopedic surgeon trichy",
      "knee replacement trichy",
      "joint replacement silverline",
      "fracture treatment trichy"
    ],
    "faqs": [
      {
        "question": "When is knee replacement surgery recommended?",
        "answer": "Knee replacement is typically advised when severe osteoarthritis causes chronic pain, joint stiffness, and limitation of daily activities that no longer respond to conservative treatments such as medication, physiotherapy, and lifestyle modifications."
      },
      {
        "question": "How quickly can I walk after joint replacement at SilverLine Hospital?",
        "answer": "With our modern surgical techniques, multimodal analgesia, and dedicated physiotherapy team, most patients begin assisted walking within 24 hours of surgery."
      }
    ]
  },
  {
    "id": "cardiology",
    "name": "Cardiology",
    "shortDescription": "24/7 Cath Lab, emergency primary angioplasty, stenting, and pacemaker implantation in Trichy.",
    "iconPath": "imagePaths.specialties.icons.cardiology",
    "heroImage": "imagePaths.specialties.cardiologyHero",
    "description": "The Department of Interventional Cardiology at SilverLine Hospital is dedicated to cardiac emergency response and advanced catheter-based heart interventions in Trichy.\n\nSupported by a 24/7 Flat-Panel Cath Lab, our interventional cardiologists provide emergency primary angioplasty (PCI) during heart attacks, complex coronary stenting, radial angiographies, and pacemaker implantations.",
    "services": [
      "24/7 Emergency Primary Angioplasty (Primary PCI) for acute heart attacks",
      "Coronary Angiography and complex Coronary Angioplasty (PTCA) with Drug-Eluting Stents",
      "Radial artery coronary interventions (Wrist entry for comfortable recovery)",
      "Permanent Pacemaker Implantation (Single, Dual Chamber, and Leadless)",
      "Implantable Cardioverter Defibrillator (ICD) and Cardiac Resynchronization Therapy (CRT)",
      "Non-invasive cardiac evaluation (ECHO, TMT, Holter Monitoring)"
    ],
    "gallery": [],
    "keywords": [
      "cardiologist in trichy",
      "heart hospital trichy",
      "cath lab trichy",
      "angioplasty trichy",
      "heart attack emergency trichy"
    ],
    "faqs": [
      {
        "question": "Why is emergency primary angioplasty (Primary PCI) crucial during a heart attack?",
        "answer": "Primary angioplasty opens the blocked coronary artery immediately to restore blood flow to the heart muscle, minimizing permanent cardiac damage and significantly increasing survival when performed within the golden hour."
      },
      {
        "question": "What is Radial Angiography and how does it benefit the patient?",
        "answer": "Radial angiography is performed through the wrist artery rather than the groin. This allows immediate patient mobility, eliminates groin hematoma risks, and enables same-day discharge in many cases."
      },
      {
        "question": "What is a Drug-Eluting Stent (DES)?",
        "answer": "A Drug-Eluting Stent is an expandable mesh tube coated with medication that slowly elutes to prevent the artery from scarring and narrowing again (restenosis), ensuring long-term vessel patency."
      },
      {
        "question": "What symptoms indicate an urgent cardiac evaluation?",
        "answer": "Severe chest tightness, radiating pain to left arm or jaw, sudden unexplained shortness of breath, cold sweating, and dizziness warrant immediate emergency cardiac assessment."
      }
    ],
    "icon": "/Icons/13.png"
  },
  {
    "id": "cardiothoracic-surgery",
    "name": "Cardiothoracic Surgery",
    "shortDescription": "Advanced open-heart surgery, CABG bypass grafting, heart valve replacement, and lung surgery in Trichy.",
    "iconPath": "imagePaths.specialties.icons.cardiothoracicSurgery",
    "heroImage": "imagePaths.specialties.cardiothoracicSurgeryHero",
    "description": "The Department of Cardiothoracic and Vascular Surgery at SilverLine Hospital performs complex surgical procedures for diseases affecting the heart, heart valves, aorta, and lungs.\n\nOur cardiac surgical team operates in state-of-the-art modular laminar-flow cardiac theaters backed by dedicated post-cardiac surgical ICUs to ensure optimal outcomes for bypass surgery, valve replacements, and thoracic resections.",
    "services": [
      "Coronary Artery Bypass Grafting (CABG - Beating Heart & Off-Pump bypass)",
      "Heart Valve Repair and Replacement (Aortic, Mitral, Double Valve)",
      "Aortic Aneurysm and Aortic Dissection surgical repair",
      "Minimally Invasive Cardiac Surgery (MICS)",
      "Thoracic surgical procedures (Lobectomy, Pleurectomy, Decortication for lung conditions)",
      "Congenital adult heart defect repair (ASD/VSD closure)"
    ],
    "gallery": [],
    "keywords": [
      "cardiothoracic surgeon trichy",
      "bypass surgery trichy",
      "heart valve replacement trichy",
      "cabg hospital trichy"
    ],
    "faqs": [
      {
        "question": "What is Off-Pump (Beating Heart) CABG surgery?",
        "answer": "Off-pump coronary artery bypass surgery is performed on the beating heart without using a heart-lung machine. This technique reduces complications, lowers blood transfusion needs, and speeds up post-surgical recovery."
      },
      {
        "question": "What is the difference between mechanical and tissue heart valve replacements?",
        "answer": "Mechanical valves are durable and last a lifetime but require ongoing blood thinners; tissue (bioprosthetic) valves do not require lifelong anticoagulants but may need replacement after 15-20 years."
      },
      {
        "question": "What is the expected hospital stay after bypass surgery?",
        "answer": "Patients typically spend 1 to 2 days in the dedicated Cardiac ICU and 4 to 6 days in the inpatient recovery ward before returning home with a structured cardiac rehabilitation plan."
      }
    ],
    "icon": "/Icons/14.png"
  },
  {
    "id": "neurology",
    "name": "Neurology",
    "icon": "/Icons/15.png",
    "iconPath": "imagePaths.specialties.icons.neurology",
    "shortDescription": "Comprehensive stroke care, epilepsy clinic, headache disorders, and neurological rehabilitation.",
    "heroImage": "imagePaths.specialties.neurologyHero",
    "description": "The Department of Neurology at SilverLine Multispeciality Hospital provides specialized diagnostic and therapeutic care for disorders affecting the brain, spinal cord, nerves, and neuromuscular junctions in Central Tamil Nadu.\n\nEquipped with 24/7 neuro-imaging (CT/MRI), digital EEG, EMG/NCS, and an acute Stroke Care Unit, our neurologists provide rapid clot-busting thrombolytic therapy and comprehensive neuro-rehabilitation.",
    "services": [
      "24/7 Acute Ischemic Stroke thrombolysis & comprehensive stroke unit",
      "Epilepsy clinic, seizure disorders, and video-EEG monitoring",
      "Parkinson’s disease and movement disorders management",
      "Headache, migraine, and facial pain clinic",
      "Neuromuscular disorders, Myasthenia Gravis, and neuropathy treatment",
      "Dementia, Alzheimer’s disease, and cognitive health management"
    ],
    "gallery": [],
    "keywords": [
      "neurologist in trichy",
      "best neurology hospital trichy",
      "stroke treatment trichy",
      "headache clinic trichy",
      "epilepsy specialist silverline"
    ],
    "faqs": [
      {
        "question": "What is the \"Golden Hour\" in stroke care?",
        "answer": "The Golden Hour refers to the critical initial 3 to 4.5 hours after the onset of acute stroke symptoms. Immediate medical treatment with IV thrombolysis at our 24/7 Stroke Unit can dissolve clots, restore blood flow to the brain, and significantly prevent long-term disability."
      },
      {
        "question": "What symptoms indicate a neurological emergency?",
        "answer": "Sudden facial droop, weakness or numbness on one side of the body, slurred speech, sudden vision loss, severe sudden-onset headache (\"thunderclap\"), or seizures require immediate emergency evaluation."
      }
    ]
  },
  {
    "id": "neuro-surgery",
    "name": "Neuro Surgery",
    "icon": "/Icons/16.png",
    "iconPath": "imagePaths.specialties.icons.neuroSurgery",
    "shortDescription": "Microscopic brain tumor surgery, trauma neurosurgery, aneurysms, and pediatric neurosurgery.",
    "heroImage": "imagePaths.specialties.neurologyHero",
    "description": "The Department of Neurosurgery at SilverLine Hospital features high-precision neurosurgical operating suites equipped with advanced surgical microscopes, neuro-endoscopy, and intraoperative neuromonitoring.\n\nOur board-certified neurosurgeons perform complex cranial and skull base procedures, microsurgical aneurysm clipping, brain tumor excision, and urgent neurotrauma decompression with exceptional clinical precision.",
    "services": [
      "Emergency neuro-trauma and severe head injury surgical management",
      "Microsurgical excision of brain tumors (Gliomas, Meningiomas, Pituitary)",
      "Cerebrovascular surgery for intracranial aneurysms and AVMs",
      "Minimally invasive endoscopic skull base surgery",
      "Hydrocephalus management with VP shunt and endoscopic third ventriculostomy",
      "Pediatric neurosurgery for craniosynostosis and neural tube defects"
    ],
    "gallery": [],
    "keywords": [
      "neurosurgeon in trichy",
      "brain surgery trichy",
      "head injury hospital trichy",
      "brain tumor doctor trichy",
      "neurosurgery silverline"
    ],
    "faqs": [
      {
        "question": "What is minimally invasive neurosurgery?",
        "answer": "Minimally invasive neurosurgery utilizes high-definition endoscopes and tubular retractors to operate through smaller incisions, resulting in less tissue disruption, minimal blood loss, reduced postoperative discomfort, and faster recovery."
      },
      {
        "question": "How are traumatic head injuries managed at SilverLine Hospital?",
        "answer": "Our round-the-clock neurotrauma team conducts immediate CT imaging, rapid surgical intracranial decompression when indicated, and dedicated neuro-ICU care with continuous ICP monitoring."
      }
    ]
  },
  {
    "id": "spine-surgery",
    "name": "Spine Surgery",
    "icon": "/Icons/17.png",
    "iconPath": "imagePaths.specialties.icons.spineSurgery",
    "shortDescription": "Minimally invasive spine surgery, disc herniation, spinal stenosis, and deformity correction.",
    "heroImage": "imagePaths.specialties.orthopedicsHero",
    "description": "The Comprehensive Spine Care Center at SilverLine Multispeciality Hospital specializes in the diagnosis, non-operative management, and surgical treatment of spinal disorders affecting the cervical, thoracic, and lumbosacral spine.\n\nFrom microdiscectomy and endoscopic spine surgery to complex spinal fusion and scoliosis deformity corrections, our surgeons utilize modern navigation and neuromonitoring for superior patient safety and mobility.",
    "services": [
      "Microscopic and endoscopic lumbar & cervical discectomy",
      "Minimally Invasive Spine Surgery (MISS) and tubular retractor surgery",
      "Spinal decompression and stabilization for lumbar canal stenosis",
      "Spinal trauma, vertebral fracture fixation, and kyphoplasty / vertebroplasty",
      "Complex spinal deformity correction (Scoliosis, Kyphosis)",
      "Interventional pain management: transforaminal epidural & facet blocks"
    ],
    "gallery": [],
    "keywords": [
      "spine surgeon trichy",
      "disc prolapse treatment trichy",
      "back pain specialist trichy",
      "endoscopic spine surgery",
      "scoliosis surgery trichy"
    ],
    "faqs": [
      {
        "question": "When is spine surgery needed for a slipped disc?",
        "answer": "Spine surgery is usually recommended if conservative treatments (medications, physiotherapy, epidural injections) fail to relieve persistent sciatica or if you develop neurological symptoms such as severe leg weakness, numbness, or loss of bladder/bowel control."
      },
      {
        "question": "What are the benefits of Minimally Invasive Spine Surgery (MISS)?",
        "answer": "MISS involves smaller incisions, sparing of back muscles, minimal blood loss, lower infection risk, and significantly shorter hospital stays compared to traditional open spine surgery."
      }
    ]
  },
  {
    "id": "pulmonology",
    "name": "Pulmonology",
    "icon": "/Icons/18.png",
    "iconPath": "imagePaths.specialties.icons.pulmonology",
    "shortDescription": "Advanced respiratory care, bronchoscopy, asthma, COPD, and sleep medicine in Trichy.",
    "heroImage": "imagePaths.specialties.pulmonologyHero",
    "description": "The Department of Pulmonology & Respiratory Medicine at SilverLine Hospital offers comprehensive diagnostic and therapeutic services for acute and chronic lung conditions, airway disorders, and sleep-disordered breathing.\n\nEquipped with advanced pulmonary function testing (PFT), fiber-optic video bronchoscopy, and dedicated respiratory intensive care units, our pulmonologists deliver expert clinical care for complex chest ailments.",
    "services": [
      "Comprehensive bronchial asthma and COPD management clinic",
      "Diagnostic and therapeutic flexible video bronchoscopy",
      "Interstitial Lung Disease (ILD) and pulmonary fibrosis multidisciplinary care",
      "Tuberculosis (TB) and post-tubercular respiratory rehabilitation",
      "Level-1 Polysomnography (Sleep Study) for Obstructive Sleep Apnea (OSA)",
      "Pleural effusion diagnostics: thoracocentesis and intercostal drainage"
    ],
    "gallery": [],
    "keywords": [
      "pulmonologist trichy",
      "chest specialist trichy",
      "asthma doctor silverline",
      "bronchoscopy trichy",
      "sleep apnea treatment trichy"
    ],
    "faqs": [
      {
        "question": "What diagnostic tests are performed for persistent cough and breathlessness?",
        "answer": "Our pulmonologists evaluate persistent symptoms using Spirometry (PFT), high-resolution chest CT (HRCT), oxygen saturation monitoring, allergen testing, and fiberoptic bronchoscopy when necessary."
      },
      {
        "question": "How is Obstructive Sleep Apnea (OSA) treated?",
        "answer": "Following an overnight diagnostic sleep study (polysomnography), patients with sleep apnea are treated with customized CPAP therapy, positional therapy, lifestyle weight management, or ENT airway interventions."
      }
    ]
  },
  {
    "id": "vascular-surgery",
    "name": "Vascular Surgery",
    "shortDescription": "Advanced laser varicose vein treatment, diabetic foot salvage, and arterial bypass in Trichy.",
    "iconPath": "imagePaths.specialties.icons.vascularSurgery",
    "heroImage": "imagePaths.specialties.cardiologyHero",
    "description": "The Department of Vascular Surgery at SilverLine Hospital specializes in the surgical and endovascular management of disorders affecting veins, arteries, and lymphatic circulation.\n\nFrom modern laser and radiofrequency ablation for varicose veins to limb-salvage vascular reconstructions for diabetic foot ulcers and dialysis access fistulas, our vascular surgeons ensure comprehensive vascular health.",
    "services": [
      "Endovenous Laser and Radiofrequency Ablation (EVLA/RFA) for Varicose Veins",
      "Arteriovenous (AV) Fistula and AV Graft creation for hemodialysis access",
      "Diabetic Foot Salvage, revascularization, and peripheral arterial disease care",
      "Deep Vein Thrombosis (DVT) management and IVC filter placement",
      "Peripheral Arterial Bypass and Balloon Angioplasty for leg ischemia",
      "Carotid endarterectomy for stroke prevention"
    ],
    "gallery": [],
    "keywords": [
      "vascular surgeon trichy",
      "varicose veins laser treatment trichy",
      "av fistula surgery trichy",
      "diabetic foot hospital trichy"
    ],
    "faqs": [
      {
        "question": "How is Laser Treatment for Varicose Veins performed?",
        "answer": "Laser treatment (EVLA) is a painless, daycare procedure where a thin laser fiber is guided inside the diseased vein under ultrasound to close it without surgical cuts or stitches."
      },
      {
        "question": "Why is AV Fistula creation necessary for dialysis patients?",
        "answer": "An AV fistula connects an artery directly to a vein in the arm, strengthening the vein to provide reliable, long-term, low-infection blood flow for hemodialysis sessions."
      },
      {
        "question": "How does vascular intervention help prevent diabetic foot amputation?",
        "answer": "Vascular angioplasty and bypass surgery restore crucial oxygenated arterial blood flow to non-healing foot ulcers, enabling antibiotic delivery and promoting complete wound healing to save the limb."
      }
    ],
    "icon": "/Icons/19.png"
  },
  {
    "id": "ent",
    "name": "ENT",
    "shortDescription": "Comprehensive ear, nose, throat, voice, and endoscopic sinus surgical care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.ent",
    "heroImage": "imagePaths.specialties.entHero",
    "description": "The Department of Ear, Nose, Throat (ENT) and Head & Neck Surgery at SilverLine Hospital provides advanced medical and surgical treatments for hearing, sinus, voice, and swallowing disorders.\n\nEquipped with high-definition operating microscopes and endoscopic towers, our ENT specialists deliver micro-ear surgeries, Functional Endoscopic Sinus Surgeries (FESS), and vertigo management for adults and children.",
    "services": [
      "Functional Endoscopic Sinus Surgery (FESS) for chronic sinusitis and nasal polyps",
      "Microscopic Ear Surgeries (Tympanoplasty, Mastoidectomy for eardrum perforation)",
      "Tonsillectomy and Adenoidectomy for recurrent infections and snoring",
      "Micro-laryngeal surgery for vocal cord polyps, hoarseness, and voice disorders",
      "Vertigo, dizziness, and vestibular balance diagnostic clinic",
      "Audiometry and hearing aid evaluation"
    ],
    "gallery": [],
    "keywords": [
      "ent doctor trichy",
      "ent specialist hospital trichy",
      "sinus surgery trichy",
      "hearing loss hospital trichy",
      "eardrum surgery trichy"
    ],
    "faqs": [
      {
        "question": "What is FESS (Functional Endoscopic Sinus Surgery)?",
        "answer": "FESS is a minimally invasive procedure where an endoscope is used through the nostrils to clear blocked sinus passages and remove polyps, restoring normal sinus drainage without facial incisions."
      },
      {
        "question": "How is eardrum perforation (hole in eardrum) repaired?",
        "answer": "Eardrum perforations are repaired via Tympanoplasty, a microscopic surgery that reconstructs the eardrum membrane using natural graft tissue, restoring hearing and preventing recurrent ear infections."
      },
      {
        "question": "What causes persistent vertigo and dizziness?",
        "answer": "Vertigo is commonly caused by inner ear conditions like Benign Paroxysmal Positional Vertigo (BPPV), labyrinthitis, or Meniere's disease. Our ENT clinic provides diagnostic testing and repositioning maneuvers for rapid relief."
      }
    ],
    "icon": "/Icons/20.png"
  },
  {
    "id": "robotic-laparoscopic-surgery",
    "name": "Robotic & Laparoscopic Surgery",
    "shortDescription": "Next-generation robotic precision and keyhole surgery with minimal incisions and faster healing.",
    "iconPath": "imagePaths.specialties.icons.roboticSurgery",
    "heroImage": "imagePaths.specialties.generalMedicineHero",
    "description": "The Department of Robotic & Advanced Laparoscopic Surgery at SilverLine Hospital represents the frontier of modern surgical precision in Central Tamil Nadu.\n\nEquipped with 3D high-definition magnification and robotic multi-articulated instrumentation, our surgeons achieve superior maneuverability and millimeter-level accuracy for complex urological, gynecological, colorectal, and oncology surgeries.",
    "services": [
      "Robotic Urological Surgeries (Robotic Prostatectomy, Partial Nephrectomy)",
      "Robotic and Laparoscopic Gynecological Procedures (Hysterectomy, Myomectomy)",
      "Advanced Keyhole Gastrointestinal and Colorectal Resections",
      "Laparoscopic Complex Hernia and Anti-reflux fundoplication surgeries",
      "Single-Incision Laparoscopic Surgery (SILS) for scarless healing"
    ],
    "gallery": [],
    "keywords": [
      "robotic surgery trichy",
      "laparoscopic hospital trichy",
      "keyhole surgery trichy",
      "minimally invasive surgery trichy"
    ],
    "faqs": [
      {
        "question": "How does Robotic Surgery benefit patients compared to standard surgery?",
        "answer": "Robotic surgery offers 3D magnified vision, tremor-free articulation, and microscopic precision, resulting in minimal blood loss, significantly reduced postoperative pain, lower infection risk, and faster return to normal life."
      },
      {
        "question": "Is the robot operating on the patient automatically?",
        "answer": "No, the robotic system never operates on its own. The experienced surgeon is in 100% control at all times, seated at the console translating hand movements into precise micro-movements inside the patient."
      },
      {
        "question": "Which procedures are best suited for robotic surgery?",
        "answer": "Robotic surgery is especially effective for prostate cancer surgery, kidney-saving tumor resections, complex uterine fibroid removals, and delicate pelvic and colorectal resections."
      }
    ],
    "icon": "/Icons/21.png"
  },
  {
    "id": "transplant-surgery",
    "name": "Transplant Surgery",
    "shortDescription": "Multi-organ transplant capabilities with dedicated post-transplant isolation care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.transplantSurgery",
    "heroImage": "imagePaths.specialties.generalSurgeryHero",
    "description": "The Multi-Organ Transplant Program at SilverLine Hospital provides comprehensive evaluation, surgical execution, and long-term immunosuppression management for living and deceased donor kidney transplantation.\n\nSupported by HEPA-filtered sterile transplant ICUs, specialized immunology diagnostics, and multidisciplinary transplant committees, we provide lifelong care for transplant recipients and living donors.",
    "services": [
      "Living Donor and Deceased (Cadaveric) Donor Kidney Transplantation",
      "ABO-Incompatible (Mismatch) Kidney Transplantation capabilities",
      "Comprehensive donor and recipient immunological and pre-transplant workup",
      "Dedicated HEPA-filtered Transplant ICU and protective isolation suites",
      "Long-term post-transplant immunosuppression monitoring and rejection surveillance"
    ],
    "gallery": [],
    "keywords": [
      "kidney transplant hospital trichy",
      "organ transplant trichy",
      "transplant surgeon trichy",
      "renal transplant unit trichy"
    ],
    "faqs": [
      {
        "question": "Who is eligible to be a living kidney donor?",
        "answer": "A living donor must be an adult relative in good health with normal kidney and cardiac function, compatible blood type (or matched program), and free from chronic diseases like uncontrolled diabetes."
      },
      {
        "question": "What is the long-term success rate of kidney transplantation?",
        "answer": "Modern kidney transplants have a 1-year graft survival rate exceeding 95%, offering patients freedom from dialysis, improved vitality, and a significantly higher quality of life."
      },
      {
        "question": "What precautions are required after receiving a kidney transplant?",
        "answer": "Recipients must take prescribed immunosuppressive medications consistently, attend routine blood monitoring, maintain strict hygiene to prevent infections, and follow a balanced diet."
      }
    ],
    "icon": "/Icons/22.png"
  },
  {
    "id": "bone-marrow-transplant",
    "name": "Bone Marrow Transplant",
    "shortDescription": "Advanced stem cell therapies and cellular hematology treatments for blood disorders in Trichy.",
    "iconPath": "imagePaths.specialties.icons.boneMarrowTransplant",
    "heroImage": "imagePaths.specialties.generalMedicineHero",
    "description": "The Bone Marrow & Stem Cell Transplant Unit at SilverLine Hospital offers autologous and allogeneic stem cell therapies for blood cancers and severe non-malignant hematological conditions.\n\nOur specialized unit features positive-pressure HEPA-filtered sterile suites, advanced apheresis cell collection, cryopreservation, and rigorous infection-controlled supportive care.",
    "services": [
      "Autologous Stem Cell Transplantation for Multiple Myeloma and Relapsed Lymphoma",
      "Allogeneic Stem Cell Transplantation (Matched Sibling and Unrelated Donors)",
      "Positive-pressure HEPA-filtered sterile isolation BMT suites",
      "Peripheral blood stem cell harvesting, apheresis, and cryopreservation",
      "Comprehensive post-transplant immunological and graft-versus-host disease (GVHD) management"
    ],
    "gallery": [],
    "keywords": [
      "bone marrow transplant trichy",
      "bmt unit trichy",
      "stem cell transplant trichy",
      "blood cancer hospital trichy"
    ],
    "faqs": [
      {
        "question": "What diseases are treated with Bone Marrow / Stem Cell Transplantation?",
        "answer": "BMT is used to treat hematological malignancies such as Multiple Myeloma, Hodgkin and Non-Hodgkin Lymphoma, Acute and Chronic Leukemia, as well as Aplastic Anemia and Thalassemia Major."
      },
      {
        "question": "What is the difference between Autologous and Allogeneic transplants?",
        "answer": "An autologous transplant uses the patient's own healthy stem cells collected in advance, while an allogeneic transplant uses stem cells from a matched family member or unrelated compatible donor."
      },
      {
        "question": "Why are HEPA-filtered sterile rooms essential during BMT?",
        "answer": "During the transplant process, high-dose conditioning chemotherapy temporarily lowers white blood cell counts. Positive-pressure HEPA-filtered rooms prevent airborne bacteria and fungi from causing infections."
      }
    ],
    "icon": "/Icons/23.png"
  },
  {
    "id": "pain-palliative-care",
    "name": "Pain & Palliative Care",
    "shortDescription": "Holistic chronic pain management and compassionate palliative symptom care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.painPalliativeCare",
    "heroImage": "imagePaths.specialties.generalMedicineHero",
    "description": "The Department of Pain & Palliative Care at SilverLine Hospital is dedicated to improving quality of life for patients experiencing acute, chronic, and oncological pain conditions.\n\nOur team combines interventional pain block procedures, specialized pharmacological regimens, physiotherapy, and psychological support to provide relief and comfort with dignity.",
    "services": [
      "Interventional Pain Management (Epidural injections, Facet joint blocks, Nerve ablations)",
      "Comprehensive Oncology & Cancer Pain Management regimens",
      "Chronic musculoskeletal, neuropathic, and spine pain relief",
      "Palliative symptom control, nutritional guidance, and emotional counseling",
      "End-of-life comfort care and home supportive care planning"
    ],
    "gallery": [],
    "keywords": [
      "pain management trichy",
      "palliative care trichy",
      "cancer pain hospital trichy",
      "chronic pain relief trichy"
    ],
    "faqs": [
      {
        "question": "What conditions benefit from interventional pain management?",
        "answer": "Conditions such as herniated discs, sciatica, chronic lower back and neck pain, trigeminal neuralgia, post-herpetic neuralgia, and persistent cancer pain benefit significantly from targeted pain interventions."
      },
      {
        "question": "Is palliative care only for terminal illness?",
        "answer": "No, palliative care is appropriate at any stage of a serious illness alongside curative treatments, focusing on symptom relief, pain management, and emotional support for the patient and family."
      },
      {
        "question": "What are ultrasound and fluoroscopy-guided pain blocks?",
        "answer": "These are targeted outpatient injections where local anesthetics and anti-inflammatory medications are delivered precisely around irritated nerves using live imaging, reducing pain without surgery."
      }
    ],
    "icon": "/Icons/24.png"
  },
  {
    "id": "psychiatry",
    "name": "Psychiatry",
    "shortDescription": "Compassionate mental healthcare, psychotherapy, mood disorder, and behavioral therapy in Trichy.",
    "iconPath": "imagePaths.specialties.icons.psychiatry",
    "heroImage": "imagePaths.specialties.neurologyHero",
    "description": "The Department of Psychiatry and Behavioral Health at SilverLine Hospital provides compassionate, confidential mental healthcare for individuals facing emotional, psychiatric, and psychological challenges.\n\nOur psychiatrists and psychologists deliver evidence-based clinical assessments, psychotherapy, stress management, and medical management for depression, anxiety, sleep disorders, and addiction.",
    "services": [
      "Depression, Generalized Anxiety Disorder, and Panic Disorder management",
      "Bipolar disorder and mood stabilization therapy",
      "Stress management, cognitive behavioral therapy (CBT), and counseling",
      "De-addiction and substance abuse rehabilitation counseling",
      "Child, adolescent, and geriatric neurobehavioral assessments",
      "Sleep disorder and insomnia therapy"
    ],
    "gallery": [],
    "keywords": [
      "psychiatrist in trichy",
      "mental health hospital trichy",
      "counseling psychologist trichy",
      "depression doctor trichy"
    ],
    "faqs": [
      {
        "question": "When should someone consider consulting a psychiatrist?",
        "answer": "You should seek consultation if you experience persistent sadness, severe anxiety, sudden mood swings, chronic sleep disturbances, overwhelming stress, or difficulty functioning in daily personal and professional life."
      },
      {
        "question": "Are psychiatric consultations kept confidential?",
        "answer": "Yes, all consultations, psychological evaluations, and treatment plans at SilverLine Hospital are conducted with absolute privacy and strict clinical confidentiality."
      },
      {
        "question": "What is the difference between counseling and psychiatric medical treatment?",
        "answer": "Counseling and psychotherapy focus on talk therapy, coping mechanisms, and behavioral change, whereas psychiatric medical treatment involves evaluating biological imbalances and prescribing medications when clinically indicated."
      }
    ],
    "icon": "/Icons/25.png"
  },
  {
    "id": "reconstructive-plastic-surgery",
    "name": "Reconstructive & Plastic Surgery",
    "shortDescription": "Advanced microvascular surgery, trauma wound reconstruction, and post-tumor restoration in Trichy.",
    "iconPath": "imagePaths.specialties.icons.reconstructiveSurgery",
    "heroImage": "imagePaths.specialties.generalSurgeryHero",
    "description": "The Department of Plastic & Reconstructive Surgery at SilverLine Hospital restores form, function, and aesthetics following trauma, burns, congenital defects, or oncological tumor resections.\n\nUsing advanced microvascular techniques, our plastic surgeons perform free tissue transfers, tendon repairs, burn reconstructions, and complex wound closures with precision.",
    "services": [
      "Microvascular Free Flap Reconstruction for head, neck, and limb defects",
      "Complex trauma reconstruction and hand surgery (Tendon & nerve repairs)",
      "Post-cancer resection tissue reconstruction (Breast, Mandible, Soft tissue)",
      "Acute burn management, skin grafting, and post-burn contracture release",
      "Cleft lip, cleft palate, and congenital anomaly repairs",
      "Scar revision and complex non-healing wound management"
    ],
    "gallery": [],
    "keywords": [
      "plastic surgeon trichy",
      "reconstructive surgery trichy",
      "microvascular surgery trichy",
      "burn care hospital trichy",
      "hand surgery trichy"
    ],
    "faqs": [
      {
        "question": "What is reconstructive plastic surgery?",
        "answer": "Reconstructive plastic surgery focuses on restoring anatomical function and normal appearance to body parts affected by trauma, cancer resections, burns, or birth defects."
      },
      {
        "question": "How does microvascular surgery help in cancer defect reconstruction?",
        "answer": "Microvascular surgery enables surgeons to transfer tissue (skin, muscle, or bone) from one part of the body to another, reconnecting tiny blood vessels under a microscope to rebuild structures like the jaw or breast."
      },
      {
        "question": "What treatments are available for post-burn scars and contractures?",
        "answer": "We provide specialized surgical contracture release, skin grafting, tissue expansion, and laser scar revision to restore joint mobility and skin elasticity."
      }
    ],
    "icon": "/Icons/26.png"
  },
  {
    "id": "dermatology-cosmetic-surgery",
    "name": "Dermatology & Cosmetic Surgery",
    "shortDescription": "Clinical skin, hair, nail treatments, laser resurfacing, and aesthetic procedures in Trichy.",
    "iconPath": "imagePaths.specialties.icons.dermatology",
    "heroImage": "imagePaths.specialties.dermatologyHero",
    "description": "The Department of Dermatology & Cosmetic Surgery provides advanced medical dermatology and aesthetic skin treatments in Trichy.\n\nOur dermatologists manage chronic skin diseases such as eczema, psoriasis, and vitiligo alongside evidence-based cosmetic treatments including laser skin resurfacing, chemical peels, and hair loss therapies.",
    "services": [
      "Acne, acne scar revision, and pigmentation laser treatment",
      "Chronic skin disease management (Psoriasis, Eczema, Vitiligo, Urticaria)",
      "Platelet-Rich Plasma (PRP) therapy for hair loss and hair rejuvenation",
      "Laser hair reduction and skin rejuvenation therapies",
      "Skin allergy testing, mole removal, and diagnostic skin biopsies",
      "Anti-aging treatments, chemical peels, and microdermabrasion"
    ],
    "gallery": [],
    "keywords": [
      "dermatologist in trichy",
      "skin specialist trichy",
      "hair loss treatment trichy",
      "laser skin clinic trichy",
      "cosmetic doctor trichy"
    ],
    "faqs": [
      {
        "question": "How is Platelet-Rich Plasma (PRP) used for hair loss treatment?",
        "answer": "PRP therapy involves drawing a small volume of the patient's blood, concentrating growth factors in the plasma, and micro-injecting it into the scalp to stimulate dormant hair follicles and promote natural hair regrowth."
      },
      {
        "question": "What are the modern treatments for severe acne and acne scars?",
        "answer": "We utilize customized combination protocols including medical topicals, oral therapies, chemical peels, and fractional laser skin resurfacing to clear active acne and smooth existing scars."
      },
      {
        "question": "How are chronic conditions like Psoriasis and Eczema controlled?",
        "answer": "We employ advanced topical formulations, phototherapy guidance, targeted systemic immunomodulators, and biologic medications to maintain long-term skin clearance and prevent flare-ups."
      }
    ],
    "icon": "/Icons/27.png"
  },
  {
    "id": "oral-medicine-dental-surgery",
    "name": "Oral Medicine & Dental Surgery",
    "shortDescription": "Complete dental care, dental implants, root canal therapy, and maxillofacial surgery in Trichy.",
    "iconPath": "imagePaths.specialties.icons.dental",
    "heroImage": "imagePaths.specialties.entHero",
    "description": "The Department of Oral Medicine and Maxillofacial Surgery at SilverLine Hospital provides comprehensive dental, periodontal, and facial surgical care.\n\nFrom routine restorative dentistry and painless root canal treatments to dental implant placements and emergency maxillofacial trauma surgery, our dental surgeons ensure optimal oral health and aesthetics.",
    "services": [
      "Advanced Dental Implants and restorative crown & bridge work",
      "Painless Single-Sitting Root Canal Treatments (RCT)",
      "Oral cancer screening, pre-cancerous lesion management, and biopsies",
      "Maxillofacial trauma surgery for facial and jaw bone fractures",
      "Surgical extraction of impacted wisdom teeth",
      "Periodontal gum therapies and cosmetic teeth whitening"
    ],
    "gallery": [],
    "keywords": [
      "dentist in trichy",
      "dental hospital trichy",
      "dental implants trichy",
      "root canal trichy",
      "maxillofacial surgeon trichy"
    ],
    "faqs": [
      {
        "question": "What are the benefits of permanent Dental Implants over dentures?",
        "answer": "Dental implants are titanium posts integrated directly into the jawbone, providing a permanent, stable foundation that looks, feels, and functions just like natural teeth without shifting or affecting adjacent teeth."
      },
      {
        "question": "Is a modern Root Canal Treatment painful?",
        "answer": "With advanced local anesthesia and rotary endodontic equipment, root canal treatments at SilverLine are virtually painless and typically completed in one or two comfortable appointments."
      },
      {
        "question": "What is Oral Cancer screening and who needs it?",
        "answer": "Oral cancer screening involves a careful visual and tactile examination of the mouth and tongue for non-healing ulcers, white/red patches (leukoplakia), and lumps. It is strongly recommended for anyone with tobacco or betel nut exposure."
      }
    ],
    "icon": "/Icons/28.png"
  },
  {
    "id": "ophthalmology",
    "name": "Ophthalmology",
    "shortDescription": "Advanced cataract micro-surgery, glaucoma management, and diabetic eye care in Trichy.",
    "iconPath": "imagePaths.specialties.icons.ophthalmology",
    "heroImage": "imagePaths.specialties.generalMedicineHero",
    "description": "The Department of Ophthalmology at SilverLine Hospital provides comprehensive vision care and micro-surgical interventions for eye diseases.\n\nEquipped with modern diagnostic imaging, our eye specialists provide sutureless phacoemulsification cataract surgeries with premium intraocular lenses (IOLs), glaucoma care, and diabetic retinopathy screenings.",
    "services": [
      "Micro-incision Phacoemulsification Cataract Surgery with Monofocal/Multifocal IOLs",
      "Comprehensive Glaucoma diagnostic screening, visual fields, and laser therapies",
      "Diabetic Retinopathy screening and fundus retinal examination",
      "Refraction and computerized vision correction evaluation",
      "Dry eye syndrome management and corneal ocular surface clinic",
      "Emergency eye trauma and foreign body removal"
    ],
    "gallery": [],
    "keywords": [
      "eye hospital trichy",
      "ophthalmologist trichy",
      "cataract surgery trichy",
      "glaucoma specialist trichy",
      "diabetic eye checkup trichy"
    ],
    "faqs": [
      {
        "question": "What is sutureless Phaco Cataract Surgery?",
        "answer": "Phacoemulsification uses ultrasonic energy through a micro-incision (under 2.2mm) to dissolve the cloudy natural lens, after which a foldable intraocular lens is placed. It requires no stitches, no injections, and allows rapid vision recovery."
      },
      {
        "question": "Why is regular eye screening essential for diabetic patients?",
        "answer": "Diabetes can damage tiny retinal blood vessels (Diabetic Retinopathy) without causing early symptoms. Annual dilated retinal exams detect early changes when treatment is most effective at preventing permanent vision loss."
      },
      {
        "question": "What are the common symptoms of Glaucoma (the \"silent thief of sight\")?",
        "answer": "Chronic glaucoma often develops painlessly with gradual loss of peripheral side vision. Regular intraocular pressure checks and visual field tests are crucial for timely detection and pressure control."
      }
    ],
    "icon": "/Icons/29.png"
  },
  {
    "id": "pediatrics",
    "name": "Pediatrics",
    "shortDescription": "Child-friendly healthcare, newborn care, pediatric vaccination, and growth tracking in Trichy.",
    "iconPath": "imagePaths.specialties.icons.pediatrics",
    "heroImage": "imagePaths.specialties.generalMedicineHero",
    "description": "The Department of Pediatrics at SilverLine Hospital provides compassionate, comprehensive medical care for newborns, infants, children, and adolescents.\n\nOur pediatricians monitor developmental milestones, manage childhood infections and allergies, and administer national and international vaccination schedules in a welcoming, child-centered environment.",
    "services": [
      "Comprehensive pediatric outpatient consultations and acute illness management",
      "Complete child vaccination and immunization program (IAP schedule)",
      "Newborn screening, neonatal monitoring, and infant feeding guidance",
      "Growth, developmental milestone, and nutritional assessment",
      "Childhood asthma, respiratory allergy, and eczema clinic",
      "Pediatric infectious disease management (Dengue, Typhoid, Viral fevers)"
    ],
    "gallery": [],
    "keywords": [
      "pediatrician in trichy",
      "child specialist hospital trichy",
      "baby vaccination trichy",
      "pediatric doctor trichy"
    ],
    "faqs": [
      {
        "question": "What vaccination schedule is followed for infants and children?",
        "answer": "We follow the standardized Indian Academy of Pediatrics (IAP) immunization guidelines, providing essential protection against Hepatitis B, Polio, DPT, MMR, Pneumococcal, Rotavirus, Typhoid, and Varicella."
      },
      {
        "question": "When should a child with fever see a pediatrician urgently?",
        "answer": "You should seek immediate medical care if an infant under 3 months has a fever, or if any child exhibits lethargy, breathing difficulty, persistent vomiting, refusal of fluids, or a fever lasting over 3 days."
      },
      {
        "question": "How are childhood growth and development monitored?",
        "answer": "During routine well-child visits, our pediatricians track physical growth (height, weight, head circumference) using standard growth charts, while evaluating motor, speech, and social milestones."
      }
    ],
    "icon": "/Icons/30.png"
  },
  {
    "id": "pediatric-surgery",
    "name": "Pediatric Surgery",
    "shortDescription": "Delicate surgical care and congenital defect corrections tailored specifically for infants and children.",
    "iconPath": "imagePaths.specialties.icons.pediatricSurgery",
    "heroImage": "imagePaths.specialties.generalSurgeryHero",
    "description": "The Department of Pediatric Surgery at SilverLine Hospital specializes in gentle, precise surgical interventions for neonates, infants, and young children.\n\nOur pediatric surgeons treat congenital anomalies, pediatric hernias, undescended testes, appendicitis, and pediatric surgical emergencies using child-adapted minimally invasive laparoscopic techniques.",
    "services": [
      "Pediatric Inguinal Hernia, Hydrocele, and Umbilical Hernia repairs",
      "Orchiopexy for Undescended Testis (Cryptorchidism)",
      "Pediatric Laparoscopic Appendectomy and abdominal emergency surgeries",
      "Correction of congenital anomalies (Intestinal obstruction, Anorectal malformations)",
      "Tongue-tie release and minor day-care pediatric procedures",
      "Pediatric urological surgeries (Hypospadias repair, Hydronephrosis/Pyeloplasty)"
    ],
    "gallery": [],
    "keywords": [
      "pediatric surgeon trichy",
      "child surgeon hospital trichy",
      "pediatric hernia surgery trichy",
      "congenital defect repair trichy"
    ],
    "faqs": [
      {
        "question": "How safe is surgery and anesthesia for young children and infants?",
        "answer": "Pediatric surgeries at SilverLine are performed by certified pediatric surgeons and pediatric anesthesiologists using specialized micro-equipment, child-safe monitoring, and dedicated pediatric recovery rooms."
      },
      {
        "question": "At what age should an undescended testis (Orchiopexy) be surgically corrected?",
        "answer": "Orchiopexy is typically recommended between 6 and 12 months of age to preserve future testicular function and prevent long-term complications."
      },
      {
        "question": "Can pediatric hernia repairs be performed as a day-care procedure?",
        "answer": "Yes, most pediatric hernia and hydrocele surgeries are minimally invasive and performed as day-care procedures, allowing the child to return home comfortably the same evening."
      }
    ],
    "icon": "/Icons/31.png"
  },
  {
    "id": "obstetrics-gynaecology",
    "name": "Obstetrics & Gynecology",
    "shortDescription": "Comprehensive maternity care, high-risk pregnancy, painless delivery, and women's health in Trichy.",
    "iconPath": "imagePaths.specialties.icons.obstetricsGynaecology",
    "heroImage": "imagePaths.specialties.gynaecologyHero",
    "description": "The Department of Obstetrics & Gynaecology at SilverLine Hospital provides compassionate, comprehensive healthcare for women at every stage of life.\n\nOur team offers antenatal maternity care, high-risk pregnancy management, painless normal delivery, laparoscopic gynecological surgeries for fibroids and cysts, PCOS management, and cancer screenings.",
    "services": [
      "Antenatal, high-risk pregnancy monitoring, and fetal ultrasound scans",
      "Normal delivery and painless labor epidural services",
      "Elective and emergency Cesarean sections (C-Section)",
      "Laparoscopic Gynecological Surgeries (Hysterectomy, Myomectomy, Ovarian Cystectomy)",
      "PCOS, irregular periods, and adolescent gynecological care",
      "Infertility evaluation and follicular monitoring",
      "Cervical cancer screening (Pap Smear, HPV DNA testing) and mammography"
    ],
    "gallery": [],
    "keywords": [
      "gynecologist in trichy",
      "maternity hospital trichy",
      "pregnancy care trichy",
      "painless delivery hospital trichy",
      "laparoscopic hysterectomy trichy"
    ],
    "faqs": [
      {
        "question": "What is High-Risk Pregnancy care and how is it managed?",
        "answer": "High-risk pregnancy involves conditions like gestational diabetes, preeclampsia, twin pregnancies, or advanced maternal age. We provide continuous fetal monitoring, specialized obstetric clinics, and immediate neonatology backup."
      },
      {
        "question": "What is painless delivery and is it safe for mother and child?",
        "answer": "Painless delivery uses labor epidural analgesia to block labor pain sensations while keeping the mother fully alert and able to push naturally, without any adverse effect on the baby."
      },
      {
        "question": "What are the advantages of laparoscopic gynecological surgery for fibroids and cysts?",
        "answer": "Laparoscopic surgery removes uterine fibroids (Myomectomy) or ovarian cysts through small keyhole incisions, resulting in minimal blood loss, preservation of fertility, and quick return to normal life."
      },
      {
        "question": "How often should women undergo cervical cancer screening (Pap smear)?",
        "answer": "Women between ages 21 and 65 are advised to have a routine Pap smear every 3 years (or combined HPV/Pap test every 5 years) for early detection and prevention of cervical abnormalities."
      }
    ],
    "icon": "/Icons/32.png"
  }
];

// Legacy / alias lookup to guarantee no route breaks
export const legacySpecialties: SpecialtyItem[] = [
  {
    "id": "anesthesiology",
    "name": "Anesthesiology",
    "shortDescription": "Comprehensive perioperative anesthetic care, pain relief, and surgical safety in Trichy.",
    "iconPath": "imagePaths.specialties.icons.anesthesiology",
    "heroImage": "imagePaths.specialties.generalMedicineHero",
    "description": "The Department of Anesthesiology delivers safe, individualized perioperative care across routine, high-risk, and complex surgical procedures at SilverLine Hospital.\n\nOur anesthesiologists conduct thorough pre-anesthesia assessments, maintain continuous physiological stability during surgery, and manage acute postoperative pain relief using advanced regional blocks and multimodal analgesia techniques.",
    "services": [
      "Comprehensive pre-anesthetic health assessment and risk stratification",
      "General, spinal, epidural, and peripheral nerve block anesthesia",
      "Day-care procedural sedation for endoscopy and minor interventions",
      "Postoperative acute pain management and Patient-Controlled Analgesia (PCA)",
      "Labor analgesia (Painless delivery epidural service)"
    ],
    "gallery": [],
    "keywords": [
      "anesthesiology trichy",
      "anesthesiologist hospital trichy",
      "painless delivery trichy",
      "perioperative pain relief"
    ],
    "faqs": [
      {
        "question": "Why is a pre-anesthesia check-up (PAC) important before surgery?",
        "answer": "A pre-anesthesia evaluation allows the anesthesiologist to examine your cardiovascular, respiratory, and medical history, review medications, and customize the safest anesthetic plan for your procedure."
      },
      {
        "question": "Is epidural analgesia safe for painless normal delivery?",
        "answer": "Yes, labor epidural analgesia is widely regarded as a safe and effective method to relieve labor pain without affecting the progress of natural delivery or the baby’s health."
      },
      {
        "question": "How is postoperative pain managed after major surgery?",
        "answer": "We utilize ultrasound-guided nerve blocks, epidural infusions, and multimodal non-opioid medications to ensure patients wake up comfortably with minimal nausea or discomfort."
      }
    ],
    "icon": "/Icons/1.png"
  }
];

export const getSpecialtyById = (id: string): SpecialtyItem | undefined => {
  if (!id) return undefined;
  const cleanId = id.toLowerCase().trim();
  if (cleanId === 'interventional-cardiology') return specialtiesList.find(s => s.id === 'cardiology');
  if (cleanId === 'critical-care') return specialtiesList.find(s => s.id === 'critical-care-medicine');
  const match = specialtiesList.find(s => s.id === cleanId);
  if (match) return match;
  return legacySpecialties.find(s => s.id === cleanId);
};
