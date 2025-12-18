import React from 'react';

// FIX: Define props for icon components to allow passing className.
interface IconProps {
  className?: string;
}

// Generic Icon wrapper for consistent styling
// FIX: Rewritten with React.createElement to be valid in a .ts file.
// FIX: In modern React (v18+), `React.FC` no longer implicitly includes the `children` prop. `React.PropsWithChildren` is used here to explicitly type the `children` prop, resolving the TypeScript error.
const Icon: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "h-6 w-6" }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, children)
);

// Icon definitions
const IconHeart: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" }));
const IconBrain: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.5 13.5c.384.92.93 1.5 1.5 1.5s1.116-.58 1.5-1.5m-3 0c-.384-.92-.93-1.5-1.5-1.5s-1.116.58-1.5 1.5m3 0h-3m3 0v-1.5m0 1.5v1.5m-3-1.5H6.5m3 1.5v1.5m-3-1.5v-1.5m3-3v-1.5m0 0h1.5m-1.5 0h-1.5m3 0v-1.5m0 0h1.5m-1.5 0h-1.5m-1.5 4.5v-1.5m0 0h-1.5m1.5 0H8m3-3v-1.5M9.5 9.5v-3a2.5 2.5 0 012.5-2.5h0a2.5 2.5 0 012.5 2.5v3m-5 0v-3m0 0h.5m4.5 0h-.5m-4.5 0H8m2 0h2.5M15 9.5v-3a2.5 2.5 0 00-2.5-2.5h0a2.5 2.5 0 00-2.5 2.5v3m5 0v-3m0 0h-.5m-4.5 0h.5M12 18a6 6 0 100-12 6 6 0 000 12z" }));
const IconBone: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { d: "M16.5 6.3c-1-1.5-2.8-2.3-4.5-2.3s-3.5.8-4.5 2.3c-1.8 2.7-1.8 6.7 0 9.4 1 1.5 2.8 2.3 4.5 2.3s3.5-.8 4.5-2.3c1.8-2.7 1.8-6.7 0-9.4zM12 16.5c-1.5 0-2.8-1-3.2-2.5h6.4c-.4 1.5-1.7 2.5-3.2 2.5zM12 7.5c1.5 0 2.8 1 3.2 2.5H8.8c.4-1.5 1.7-2.5 3.2-2.5z" }));
const IconLungs: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5.25 10.5A2.25 2.25 0 017.5 8.25h9a2.25 2.25 0 012.25 2.25v3.75a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-3.75zM12 15.75v3" }));
const IconCardiothoracicSurgery: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement(React.Fragment, null, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12l-6-6m2 10l4-4" })));
const IconCriticalCare: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }));
const IconENT: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 10c-1.3 0-2.5.5-3.4 1.4A5 5 0 004 15v4h16v-4a5 5 0 00-1.6-3.6A5 5 0 0015 10h-1m-4 0h4" }));
const IconGeneralMedicine: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7v10l8 4" }));
const IconGeneralSurgery: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.74 9.26c-.47-.47-1.23-.47-1.7 0l-7 7c-.47.47-.47 1.23 0 1.7.47.47 1.23.47 1.7 0l7-7c.47-.47.47-1.23 0-1.7zM16 6l-5 5" }));
const IconMedicalGastroenterology: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement(React.Fragment, null, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.171 5.171a4 4 0 015.656 0L12 8.343l3.172-3.172a4 4 0 115.656 5.656L12 19.657l-8.828-8.828a4 4 0 010-5.656z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v6m3-3H9" })));
const IconMedicalOncology: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 11l3-3 3 3m-6 0l3 3 3-3" }));
const IconNephrologyUrology: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement(React.Fragment, null, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 14s-1-1-1-4 1-4 1-4 1 3 1 4-1 4-1 4zm8 0s-1-1-1-4 1-4 1-4 1 3 1 4-1 4-1 4z" })));
const IconRadiationOncology: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement(React.Fragment, null, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 17v2m6-2v2M9 11v2m6-2v2M5 13h14" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3l-4 4h8l-4-4z" })));
const IconSurgicalGastroenterology: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement(React.Fragment, null, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.171 5.171a4 4 0 015.656 0L12 8.343l3.172-3.172a4 4 0 115.656 5.656L12 19.657l-8.828-8.828a4 4 0 010-5.656z" }), React.createElement('circle', { cx: "9", cy: "12", r: "1" }), React.createElement('path', { d: "M14 10l-4 4m0-4l4 4" })));
const IconSurgicalOncology: React.FC<IconProps> = (props) => React.createElement(Icon, props, React.createElement(React.Fragment, null, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.74 9.26c-.47-.47-1.23-.47-1.7 0l-7 7c-.47.47-.47 1.23 0 1.7.47.47 1.23.47 1.7 0l7-7c.47-.47.47-1.23 0-1.7zM16 6l-5 5" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 7v10m-5-5h10" })));


export const specialtiesList = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    shortDescription: 'Expert cardiology care in Trichy for heart and vascular conditions.',
    icon: React.createElement(IconHeart),
    heroImage: 'imagePaths.specialties.cardiologyHero',
    description: `Our Cardiology department in Trichy provides comprehensive care for patients with heart and vascular diseases. We offer a full range of services from diagnosis to treatment and rehabilitation, utilizing state-of-the-art technology and a patient-centered approach.`,
    services: ['Echocardiogram', 'Stress Testing', 'Cardiac Catheterization', 'Coronary Angioplasty', 'Heart Rhythm Management', 'Heart Failure Clinic'],
    gallery: [
      'imagePaths.specialties.cardiologyGallery[0]',
      'imagePaths.specialties.cardiologyGallery[1]',
      'imagePaths.specialties.cardiologyGallery[2]',
      'imagePaths.specialties.cardiologyGallery[3]',
    ],
    keywords: ['cardiology', 'cardiologist', 'heart'],
    faqs: [
        {
            question: "What are common symptoms of a heart condition?",
            answer: "Common symptoms include chest pain or discomfort, shortness of breath, palpitations (irregular heartbeats), dizziness or fainting, and swelling in the legs (edema). If you experience any of these, it's crucial to consult a doctor promptly."
        },
        {
            question: "How can I improve my heart health?",
            answer: "A heart-healthy lifestyle includes a balanced diet low in saturated fats and sodium, regular exercise (at least 150 minutes of moderate activity per week), maintaining a healthy weight, avoiding smoking, limiting alcohol, and managing stress."
        },
        {
            question: "What is an Echocardiogram?",
            answer: "An echocardiogram, or 'echo,' is an ultrasound of the heart. It uses sound waves to create moving pictures of your heart, which helps doctors assess its size, shape, and how well its chambers and valves are working."
        }
    ]
  },
   {
    id: 'cardiothoracic-surgery',
    name: 'Cardiothoracic Surgery',
    shortDescription: 'Advanced surgical treatment for heart and chest diseases in Trichy.',
    icon: React.createElement(IconCardiothoracicSurgery),
    heroImage: 'imagePaths.specialties.cardiothoracicSurgeryHero',
    description: 'Specializing in surgical procedures of the heart, lungs, esophagus, and other organs in the chest, our Trichy-based team is a pioneer in the region.',
    services: ['Coronary Artery Bypass Grafting', 'Heart Valve Repair/Replacement', 'Aortic Surgery', 'Lung Cancer Surgery'],
    gallery: [
      'imagePaths.specialties.cardiothoracicSurgeryGallery[0]',
      'imagePaths.specialties.cardiothoracicSurgeryGallery[1]',
      'imagePaths.specialties.cardiothoracicSurgeryGallery[2]',
      'imagePaths.specialties.cardiothoracicSurgeryGallery[3]',
    ],
    keywords: ['cardiothoracic', 'heart surgery'],
    faqs: []
  },
  {
    id: 'critical-care',
    name: 'Critical Care',
    shortDescription: 'Intensive care for critically ill patients in Trichy.',
    icon: React.createElement(IconCriticalCare),
    heroImage: 'imagePaths.specialties.criticalCareHero',
    description: 'Providing advanced monitoring and life-sustaining treatments for patients with life-threatening conditions in our state-of-the-art ICU in Trichy.',
    services: ['24/7 ICU Monitoring', 'Ventilator Management', 'Sepsis Treatment', 'Post-operative Intensive Care'],
    gallery: [
      'imagePaths.specialties.criticalCareGallery[0]',
      'imagePaths.specialties.criticalCareGallery[1]',
      'imagePaths.specialties.criticalCareGallery[2]',
      'imagePaths.specialties.criticalCareGallery[3]',
    ],
    keywords: ['critical care', 'icu', 'intensive care'],
    faqs: []
  },
  {
    id: 'ent',
    name: 'ENT',
    shortDescription: 'Comprehensive care for ear, nose, and throat disorders in Trichy.',
    icon: React.createElement(IconENT),
    heroImage: 'imagePaths.specialties.entHero',
    description: 'Our Trichy ENT specialists provide comprehensive medical and surgical care for conditions affecting the ear, nose, throat, head, and neck.',
    services: ['Sinus Surgery', 'Tonsillectomy', 'Hearing Loss Treatment', 'Voice and Swallowing Disorders'],
    gallery: [
      'imagePaths.specialties.entGallery[0]',
      'imagePaths.specialties.entGallery[1]',
      'imagePaths.specialties.entGallery[2]',
      'imagePaths.specialties.entGallery[3]',
    ],
    keywords: ['ent', 'ear', 'nose', 'throat'],
    faqs: []
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    shortDescription: 'Primary care and management of common illnesses for the Trichy community.',
    icon: React.createElement(IconGeneralMedicine),
    heroImage: 'imagePaths.specialties.generalMedicineHero',
    description: 'The first point of contact for general health issues in Trichy, providing diagnosis, treatment, and preventive care.',
    services: ['Annual Physical Exams', 'Management of Chronic Diseases', 'Preventive Health Screenings', 'Acute Illness Care'],
    gallery: [
      'imagePaths.specialties.generalMedicineGallery[0]',
      'imagePaths.specialties.generalMedicineGallery[1]',
      'imagePaths.specialties.generalMedicineGallery[2]',
      'imagePaths.specialties.generalMedicineGallery[3]',
    ],
    keywords: ['general medicine', 'physician'],
    faqs: []
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    shortDescription: 'A wide range of common surgical procedures performed by top surgeons in Trichy.',
    icon: React.createElement(IconGeneralSurgery),
    heroImage: 'imagePaths.specialties.generalSurgeryHero',
    description: 'Our surgical department in Trichy focuses on abdominal contents including esophagus, stomach, small intestine, large intestine, liver, pancreas, gallbladder, appendix and bile ducts, and often the thyroid gland.',
    services: ['Appendectomy', 'Hernia Repair', 'Gallbladder Removal', 'Colon Surgery'],
    gallery: [
      'imagePaths.specialties.generalSurgeryGallery[0]',
      'imagePaths.specialties.generalSurgeryGallery[1]',
      'imagePaths.specialties.generalSurgeryGallery[2]',
      'imagePaths.specialties.generalSurgeryGallery[3]',
    ],
    keywords: ['general surgery', 'general surgeon', 'laparoscopic'],
    faqs: []
  },
  {
    id: 'medical-gastroenterology',
    name: 'Medical Gastroenterology',
    shortDescription: 'Specialized care for digestive system health in Trichy.',
    icon: React.createElement(IconMedicalGastroenterology),
    heroImage: 'imagePaths.specialties.gastroHero',
    description: `We provide expert gastroenterology care in Trichy for a wide range of digestive diseases. Our team uses the latest diagnostic and therapeutic techniques to ensure the best possible outcomes for our patients.`,
    services: ['Endoscopy and Colonoscopy', 'Liver Disease Management', 'Inflammatory Bowel Disease (IBD) Care', 'Acid Reflux (GERD) Treatment', 'Pancreatic and Biliary Services', 'Nutritional Counseling'],
    gallery: [
      'imagePaths.specialties.gastroGallery[0]',
      'imagePaths.specialties.gastroGallery[1]',
      'imagePaths.specialties.gastroGallery[2]',
      'imagePaths.specialties.gastroGallery[3]',
    ],
    keywords: ['gastroenterology', 'gastroenterologist', 'digestive'],
    faqs: []
  },
  {
    id: 'medical-oncology',
    name: 'Medical Oncology',
    shortDescription: 'Comprehensive cancer treatment and support at Trichy\'s best hospital.',
    icon: React.createElement(IconMedicalOncology),
    heroImage: 'imagePaths.specialties.oncologyHero',
    description: `As Trichy's pioneer multi-speciality hospital, we offer a multidisciplinary approach to cancer care, bringing together experts in medical, surgical, and radiation oncology.`,
    services: ['Chemotherapy', 'Immunotherapy', 'Targeted Therapy', 'Hormone Therapy', 'Genetic Counseling'],
    gallery: [
      'imagePaths.specialties.oncologyGallery[0]',
      'imagePaths.specialties.oncologyGallery[1]',
      'imagePaths.specialties.oncologyGallery[2]',
      'imagePaths.specialties.oncologyGallery[3]',
    ],
    keywords: ['oncology', 'cancer', 'onco pathologist'],
    faqs: []
  },
  {
    id: 'nephrology-urology',
    name: 'Nephrology & Urology',
    shortDescription: 'Leading care for kidney and urinary tract systems in Trichy.',
    icon: React.createElement(IconNephrologyUrology),
    heroImage: 'imagePaths.specialties.urologyHero',
    description: `Our Urology and Nephrology departments in Trichy provide comprehensive diagnostic and treatment services for conditions of the urinary tract and kidneys.`,
    services: ['Kidney Stone Treatment', 'Prostate Health', 'Dialysis', 'Incontinence and Pelvic Floor Disorders', 'Male Infertility', 'Minimally Invasive Surgery'],
    gallery: [
      'imagePaths.specialties.urologyGallery[0]',
      'imagePaths.specialties.urologyGallery[1]',
      'imagePaths.specialties.urologyGallery[2]',
      'imagePaths.specialties.urologyGallery[3]',
    ],
    keywords: ['nephrology', 'urology', 'urologist', 'kidney'],
    faqs: []
  },
  {
    id: 'neurology',
    name: 'Neurology',
    shortDescription: 'Advanced care for brain and nervous system disorders in Trichy.',
    icon: React.createElement(IconBrain),
    heroImage: 'imagePaths.specialties.neurologyHero',
    description: `Our Neurology department in Trichy specializes in the diagnosis and treatment of disorders affecting the brain, spinal cord, and nerves.`,
    services: ['EEG and EMG Testing', 'Stroke Care and Rehabilitation', 'Epilepsy Management', 'Movement Disorder Clinic', 'Headache and Migraine Treatment', 'Memory Disorder Evaluation'],
    gallery: [
      'imagePaths.specialties.neurologyGallery[0]',
      'imagePaths.specialties.neurologyGallery[1]',
      'imagePaths.specialties.neurologyGallery[2]',
      'imagePaths.specialties.neurologyGallery[3]',
    ],
    keywords: ['neurology', 'neurologist', 'brain', 'stroke'],
    faqs: [
        {
            question: "What is the difference between a neurologist and a neurosurgeon?",
            answer: "A neurologist diagnoses and treats disorders of the nervous system with medication and other non-surgical treatments. A neurosurgeon is a medical doctor who is trained to surgically treat these conditions. We have both specialists at SilverLine Hospital."
        },
        {
            question: "When should I see a neurologist?",
            answer: "You should consider seeing a neurologist if you experience chronic headaches or migraines, dizziness, numbness or tingling, movement problems like tremors, or memory problems. Your primary care physician can provide a referral if needed."
        }
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    shortDescription: 'Restoring mobility for bones, joints, and muscles in Trichy.',
    icon: React.createElement(IconBone),
    heroImage: 'imagePaths.specialties.orthopedicsHero',
    description: `Our Orthopedics department in Trichy is dedicated to treating injuries and diseases of the musculoskeletal system. From sports injuries to joint replacements, our team provides comprehensive care.`,
    services: ['Joint Replacement Surgery (Hip, Knee, Shoulder)', 'Sports Medicine', 'Spine Surgery', 'Trauma and Fracture Care', 'Hand and Upper Extremity Surgery', 'Physical Therapy and Rehabilitation'],
    gallery: [
      'imagePaths.specialties.orthopedicsGallery[0]',
      'imagePaths.specialties.orthopedicsGallery[1]',
      'imagePaths.specialties.orthopedicsGallery[2]',
      'imagePaths.specialties.orthopedicsGallery[3]',
    ],
    keywords: ['orthopedics', 'orthopaedic', 'orthoscopic', 'trauma', 'sports medicine', 'bone'],
    faqs: []
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    shortDescription: 'Top treatment for respiratory and lung diseases in Trichy.',
    icon: React.createElement(IconLungs),
    heroImage: 'imagePaths.specialties.pulmonologyHero',
    description: `Our Pulmonology department in Trichy focuses on the diagnosis and management of diseases of the respiratory system, including the lungs, airways, and chest wall.`,
    services: ['Asthma and COPD Management', 'Sleep Apnea Diagnosis and Treatment', 'Pulmonary Function Testing', 'Bronchoscopy', 'Interstitial Lung Disease Care', 'Critical Care Medicine'],
    gallery: [
      'imagePaths.specialties.pulmonologyGallery[0]',
      'imagePaths.specialties.pulmonologyGallery[1]',
      'imagePaths.specialties.pulmonologyGallery[2]',
      'imagePaths.specialties.pulmonologyGallery[3]',
    ],
    keywords: ['pulmonology', 'lungs', 'respiratory'],
    faqs: []
  },
  {
    id: 'radiation-oncology',
    name: 'Radiation Oncology',
    shortDescription: 'Targeted radiation therapy for cancer treatment in Trichy.',
    icon: React.createElement(IconRadiationOncology),
    heroImage: 'imagePaths.specialties.radiationOncologyHero',
    description: 'Using high-energy radiation to shrink tumors and kill cancer cells as part of a comprehensive cancer treatment plan at our advanced facility in Trichy.',
    services: ['IMRT', 'IGRT', 'Stereotactic Radiosurgery (SRS)', 'Brachytherapy'],
    gallery: [
      'imagePaths.specialties.radiationOncologyGallery[0]',
      'imagePaths.specialties.radiationOncologyGallery[1]',
      'imagePaths.specialties.radiationOncologyGallery[2]',
      'imagePaths.specialties.radiationOncologyGallery[3]',
    ],
    keywords: ['radiation oncology', 'radiation'],
    faqs: []
  },
  {
    id: 'surgical-gastroenterology',
    name: 'Surgical Gastroenterology',
    shortDescription: 'Surgical solutions for digestive system diseases in Trichy.',
    icon: React.createElement(IconSurgicalGastroenterology),
    heroImage: 'imagePaths.specialties.surgicalGastroenterologyHero',
    description: 'Our expert surgeons in Trichy provide advanced surgical options for complex diseases of the gastrointestinal tract, liver, and pancreas.',
    services: ['Liver Resection', 'Pancreatic Surgery', 'Esophageal Surgery', 'Laparoscopic Colectomy'],
    gallery: [
      'imagePaths.specialties.surgicalGastroenterologyGallery[0]',
      'imagePaths.specialties.surgicalGastroenterologyGallery[1]',
      'imagePaths.specialties.surgicalGastroenterologyGallery[2]',
      'imagePaths.specialties.surgicalGastroenterologyGallery[3]',
    ],
    keywords: ['surgical gastroenterology'],
    faqs: []
  },
  {
    id: 'surgical-oncology',
    name: 'Surgical Oncology',
    shortDescription: 'Pioneering surgical removal of cancerous tumors in Trichy.',
    icon: React.createElement(IconSurgicalOncology),
    heroImage: 'imagePaths.specialties.surgicalOncologyHero',
    description: 'Our Surgical Oncology department in Trichy specializes in the surgical management of cancer, including biopsies, tumor removal, and complex cancer-related surgeries.',
    services: ['Tumor Resection', 'Mastectomy', 'Lymph Node Biopsy', 'Cytoreductive Surgery'],
    gallery: [
      'imagePaths.specialties.surgicalOncologyGallery[0]',
      'imagePaths.specialties.surgicalOncologyGallery[1]',
      'imagePaths.specialties.surgicalOncologyGallery[2]',
      'imagePaths.specialties.surgicalOncologyGallery[3]',
    ],
    keywords: ['surgical oncology', 'surgical oncologist'],
    faqs: []
  },
];