
import { imagePaths } from './imagePaths';
import type { Doctor } from '../data/doctors';
import { doctorsList } from '../data/doctors';

export const defaultContent = {
  imagePaths: imagePaths,
  doctors: {
    title: 'Meet Our Expert Doctors',
    subtitle: 'Our team of dedicated and experienced professionals is here to serve you.',
    list: doctorsList,
  },
  hero: {
    slides: [
      {
        image: 'imagePaths.hero.slide1',
        title: 'Compassionate Care, Advanced Medicine',
        subtitle: 'Experience world-class healthcare with a personal touch. Our expert team is dedicated to your well-being.',
        headline: 'Compassionate Care, Advanced Medicine',
        paragraph: 'Experience world-class healthcare with a personal touch. Our expert team is dedicated to your well-being.',
        ctaText: 'Book an Appointment',
      },
      {
        image: 'imagePaths.hero.slide2',
        title: 'Your Health is Our Priority',
        subtitle: 'From routine check-ups to specialized treatments, we provide comprehensive services to meet all your needs.',
        headline: 'Your Health is Our Priority',
        paragraph: 'From routine check-ups to specialized treatments, we provide comprehensive services to meet all your needs.',
        ctaText: 'Explore Our Services',
      },
      {
        image: 'imagePaths.hero.slide3',
        title: 'A Partner in Your Health Journey',
        subtitle: 'We believe in building lasting relationships with our patients, providing support and guidance every step of the way.',
        headline: 'A Partner in Your Health Journey',
        paragraph: 'We believe in building lasting relationships with our patients, providing support and guidance every step of the way.',
        ctaText: 'Meet Our Doctors',
      },
    ]
  },
  specialties: {
    title: 'Our Specialties',
    image: 'imagePaths.specialties.promo',
  },
  statsBar: {
    bg: 'imagePaths.statsBar.bg',
    experience: { label: 'Experience' },
    trusted: { label: 'Trusted People' },
    surgeries: { label: 'Surgeries' },
    successRate: { label: 'Success Rate' }
  },
  internationalPatients: {
    title: 'A new standard in<br/>global healthcare',
    description: 'SilverLine is here for you with world-class medical services & support from skilled doctors all around the world, ensuring a seamless healthcare journey.',
    cta1Text: 'About Us',
    cta2Text: 'Learn More',
    stats: {
      stat1: { value: '50+', label: 'Countries Served' },
      stat2: { value: '10K+', label: 'Happy Patients' },
      stat3: { value: '25+', label: 'Specialties' }
    },
    collageImage1: 'imagePaths.internationalPatients.collage1',
    collageImage2: 'imagePaths.internationalPatients.collage2',
    collageImage3: 'imagePaths.internationalPatients.collage3',
  },
  whyChooseUs: {
    title: 'Why SilverLine...',
    image: 'imagePaths.whyChooseUs',
    features: {
      patientCare: { title: 'Patient Care', description: 'Empathy driven personalized patient care.' },
      cosmeticDentistry: { title: 'Social Consciousness', description: 'Socially conscious organization.' },
      experiencedTeam: { title: 'Experienced Team', description: 'Vastly experienced team of doctors with extensive clinical expertise.' },
      pediatricDentistry: { title: 'Patient Advice & Liaison', description: 'Dedicated and exclusive patient advice and liaison team.' },
      affordableMedicines: { title: 'Affordable Medicines', description: 'High quality medical services made affordable.' },
      periodontalTherapy: { title: 'Nursing & Support', description: 'Dedicated nursing and paramedical support.' }
    }
  },
  testimonials: {
    title: 'What Our Patients Say',
    subtitle: 'Their words are the best measure of our care.',
    items: [
      {
        name: 'Sarah L.',
        quote: "The care I received at SilverLine Hospital was exceptional. The doctors and nurses were attentive, compassionate, and highly skilled. I felt safe and well-cared for throughout my entire stay. I can't thank them enough!",
        image: 'imagePaths.testimonials[0]',
        rating: 5,
      },
      {
        name: 'Michael B.',
        quote: "My experience with the orthopedic team was fantastic. Dr. Jones is a miracle worker! He explained everything clearly, and my surgery was a complete success. The physical therapy team was also incredible.",
        image: 'imagePaths.testimonials[1]',
        rating: 5,
      },
      {
        name: 'Jessica P.',
        quote: "As a new mother, I was so nervous, but the pediatric team, especially Dr. Sharma, was amazing. They were so gentle with my baby and answered all of my million questions with patience and kindness. Highly recommend!",
        image: 'imagePaths.testimonials[2]',
        rating: 5,
      },
    ]
  },
  about: {
    hero: {
      title: 'About SilverLine Hospital',
      subtitle: 'Our commitment to excellence, compassion, and innovation in healthcare.'
    },
    heroCarouselSlides: [
       {
        image: 'imagePaths.about.hero1',
        title: 'Our Mission & Vision',
        subtitle: 'Dedicated to providing outstanding patient care with a focus on clinical excellence, patient safety, and innovation.',
      },
      {
        image: 'imagePaths.about.hero2',
        title: 'A Journey of Excellence',
        subtitle: 'From a small clinic to a leading healthcare institution, our commitment to the community has never wavered.',
      },
      {
        image: 'imagePaths.about.hero3',
        title: 'Our Expert Team',
        subtitle: 'Meet the compassionate and skilled professionals who are the heart of our hospital and dedicated to your well-being.',
      },
    ],
    mission: {
      title: 'Our Mission',
      description: 'To deliver affordable, world-class, evidence-based healthcare with empathy, dignity and patient wellbeing.'
    },
    vision: {
      title: 'Our Vision',
      description: 'To redefine the future of healthcare by integrating cutting-edge technology, research and compassionate care.'
    },
    managingDirector: {
      title: "Message from the Managing Director",
      message: "At SilverLine Hospital, our commitment to excellence goes far beyond the boundaries of a clinical setting. From the very first day, our vision has been to build an institution where every patient is treated with dignity, compassion, and the highest standard of medical care. We believe that healing is not merely a medical process — it is a deeply human experience. Our dedicated team of specialists, nurses, and support staff work tirelessly to ensure that each person who walks through our doors leaves healthier, stronger, and reassured. We remain committed to continuous growth, investment in technology, and most importantly — in our people. Thank you for trusting SilverLine as your healthcare partner.",
      name: "Dr. Senthil Kumar",
      designation: "Managing Director",
      image: "/Doctor/Dr.G.Senthilkumar.jpg"
    },
    wordWithCarousel: {
      title: 'Our Commitment to Care',
      message: 'At SilverLine Hospital, our commitment to care goes beyond the clinical. We believe in building a community where every patient feels heard, valued, and respected. Each professional on our team is dedicated to providing the highest standard of medical care, combined with a compassionate touch that helps in speedier recovery and a more pleasant hospital experience.',
      images: ['/Standby/Our Commitment.jpg'],
    },
    team: {
      title: 'Meet Our Dedicated Team',
      subtitle: 'Our world-class doctors are dedicated to your well-being.',
      members: [
        { name: 'Dr. Senthil Kumar', role: 'Managing Director', image: 'imagePaths.doctors.senthilkumar' },
        { name: 'Dr. Hemalatha', role: 'Executive Director', image: 'imagePaths.doctors.hemalatha' }
      ]
    },
    sideBySide: {
      title: 'State-of-the-Art Facilities',
      description: 'We invest in the latest medical technology and state-of-the-art facilities to ensure our patients receive the most accurate diagnoses and effective treatments. Our modern infrastructure is designed for patient comfort and safety, providing a healing environment for all.',
      image: '/Standby/02.jpg'
    },
    aboutContent: {
      tagline: 'Caring for Your Smile,<br /> Enhancing life',
      image: 'imagePaths.about.dentist',
      stats: {
          experience: { label: 'Experience' },
          award: { label: 'Award' },
          doctor: { label: 'Doctor' }
      },
      statsDescription: 'We take meticulous care of your dental needs to ensure a healthy, lasting smile.'
    },
    values: [
      {
        title: 'Ethical',
        description: 'Uncompromising integrity, clinical transparency, and ethical responsibility in every healthcare decision.'
      },
      {
        title: 'Compassion',
        description: 'Empathetic, dignified care that listens attentively and honors the emotional and physical wellbeing of every patient.'
      },
      {
        title: 'Clinical Excellence',
        description: 'Adhering to rigorous global medical standards, diagnostic precision, and superior clinical outcomes.'
      },
      {
        title: 'Innovation & Research',
        description: 'Continuous advancement through modern medical technology, minimally invasive techniques, and ongoing learning.'
      },
      {
        title: 'Patient-Centered Care',
        description: 'Placing patient safety, comfort, and personalized care at the heart of our multidisciplinary treatment pathways.'
      }
    ],
    main: {
      title: 'Welcome to Your Partner in Health',
      description: 'Founded on the principles of compassion, innovation, and excellence, SilverLine Hospital is dedicated to providing comprehensive and personalized medical care. Our mission is to deliver outstanding patient care with a focus on clinical excellence and patient safety.'
    },
    stats: {
      stat1: { value: '8+', label: 'Years Experience' },
      stat2: { value: '98%', label: 'Success Rate' },
      stat3: { value: '25k+', label: 'Trusted Patients' },
      stat4: { value: '10k+', label: 'Surgeries Completed' }
    },
    journey: {
        title: 'Our Journey to Excellence',
        subtitle: 'A timeline of our dedication to healthcare and our community.',
        items: [
            {
                year: '2018',
                title: 'Founded with a Vision',
                description: 'SilverLine Hospital was established with the goal of providing accessible, high-quality healthcare to the community, starting with a small outpatient clinic.',
            },
            {
                year: '2012',
                title: 'Opened Cardiology Wing',
                description: 'We expanded our services with a state-of-the-art cardiology department, equipped with the latest diagnostic and treatment technology.',
            },
            {
                year: '2016',
                title: 'Pediatric Care Center',
                description: 'Recognizing the need for specialized child healthcare, we launched a dedicated pediatric center with a child-friendly environment.',
            },
            {
                year: '2020',
                title: 'Advanced Research Facility',
                description: 'Our commitment to innovation led to the opening of a new research facility, focusing on groundbreaking treatments and medical advancements.',
            },
            {
                year: '2025',
                title: 'Best Community Hospital Award',
                description: 'We were honored to be recognized for our exceptional quality, innovation, and the compassionate care we provide to our community.',
            },
        ]
    }
  },
  packages: {
    heroImage: 'imagePaths.packages.hero',
    title: 'Our Health Packages',
    subtitle: 'Choose a plan that works best for your health needs.',
    basic: { name: 'Basic Checkup' },
    comprehensive: { name: 'Comprehensive Plan' },
    premium: { name: 'Premium Wellness' },
    insuranceSection: {
      title: 'Our Trusted Insurance Partners',
      subtitle: "We partner with a wide range of insurance providers to make your healthcare journey as seamless as possible. For specific questions about your coverage, please contact our billing department.",
      logos: 'imagePaths.insurancePartners',
    }
  },
  contact: {
    heroImage: 'imagePaths.contact.hero',
    title: 'Contact Us',
    subtitle: 'We would love to hear from you. Get in touch with us for any inquiries.',
    info: {
      title: 'Get in Touch',
      address: 'No: 3/332, Chennai National Highways, Palur, Trichy.',
      landline: '0431-2906470 / 71',
      mobile: '96773 36097',
      email: 'contact@silverlinehospital.com',
      hoursTitle: 'Opening Hours:',
      hoursWeekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
      hoursWeekend: 'Sat: 10:00 AM - 4:00 PM',
      followTitle: 'Follow Us'
    },
    form: {
      button: 'Send Message'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services, appointments, and policies.',
      questions: [
        {
          question: 'How do I book an appointment?',
          answer: 'You can book an appointment by calling our front desk at (123) 456-7890, or by using our online appointment booking system available on the homepage. We recommend booking in advance to secure your preferred time and doctor.'
        },
        {
          question: 'What should I bring to my first appointment?',
          answer: 'Please bring a valid photo ID, your insurance card, a list of any current medications you are taking, and any relevant medical records or referral letters from other doctors.'
        },
        {
          question: 'What are your billing and insurance policies?',
          answer: 'We accept a wide range of insurance plans. Please check our Health Packages page for a list of accepted providers. For patients without insurance, we offer flexible payment options. Co-pays and payments are due at the time of service.'
        },
        {
          question: 'How can I access my medical records?',
          answer: 'You can securely access your medical records, including test results and appointment history, through our online Patient Portal. You can log in using your Patient ID from the main menu.'
        }
      ]
    }
  },
  emergency: {
    title: '24/7 Emergency & Critical Care',
    subtitle: 'Immediate medical attention when you need it most.',
    infoBox: {
      title: 'In Case of an Emergency',
      description: "Our 24/7 Emergency Department is built for rapid response and critical care excellence. With expert emergency physicians, advanced life-support systems, and seamless access to diagnostics and specialists, we ensure immediate intervention for trauma, cardiac emergencies, stroke, and more—when time matters the most."
    }
  },
  portal: {
    heroWelcome: 'Welcome,',
    heroSubtitle: 'This is your personal health dashboard, where you can manage your appointments, view medical records, and communicate securely with your care team.',
    dashboardTitle: 'Your Dashboard',
    dashboardSubtitle: 'Here is an overview of your health information.'
  },
  footer: {
    logo: 'imagePaths.logos.white',
    description: 'Providing quality healthcare for a brighter and healthy future. Your wellness is our priority.',
    address: 'No: 3/332, Chennai National Highways, Palur, Trichy.',
    phone: '+91 96773 36097 / 0431 276 0030',
    email: 'appointmentdesk@silverlinehospital.com'
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/profile.php?id=100092393246374',
    twitter: 'https://x.com/Silverline63819',
    instagram: 'https://www.instagram.com/silverlinehospitals/',
    linkedin: 'https://www.linkedin.com/in/silverline-hospital-99a737284/'
  },
  timedPopups: {
    event: {
      isActive: true, // This can be controlled from the master panel
      image: 'imagePaths.popups.event',
      title: 'Annual Health Check-up Camp',
      date: 'Oct 28 - Nov 5',
      time: '9 AM - 5 PM',
      description: 'Join us for our annual health camp. Get comprehensive check-ups at a discounted price and consult with our top specialists.'
    },
    promotion: {
      isActive: true,
      image: 'imagePaths.popups.promo',
      title: 'Save on Dental Care',
      date: 'This Month Only',
      time: 'Limited Slots',
      description: 'Get 20% off on all dental procedures, including cosmetic dentistry and regular check-ups. Book your appointment now!'
    },
    offer: {
      isActive: true,
      image: 'imagePaths.popups.offer',
      title: 'Heart Health Package Offer',
      date: 'Ends Dec 31st',
      time: 'Book Now',
      description: 'Our comprehensive heart health package is now available with a special 15% discount. Protect your heart today.'
    },
    special_offer: {
      isActive: true,
      image: 'imagePaths.popups.specialOffer',
      title: 'Special Offer for New Patients',
      date: 'Limited Time',
      time: 'Welcome!',
      description: 'New to SilverLine? Get a free consultation with any specialist on your first visit. Your health journey starts here.'
    }
  },
  brandAssets: {
    logoHeader: 'imagePaths.logos.main',
    logoFooter: 'imagePaths.logos.white',
    favicon: 'imagePaths.logos.favicon',
    colors: {
        primary: '#00B5A5',
        secondary: '#0E2A47',
        primaryHover: '#0E2A4T',
        secondaryHover: '#00B5A5',
        textDark: '#0E2A47',
        textLight: '#FFFFFF',
    }
  },
  career: {
    hero: {
      badge: 'Careers at SilverLine',
      title: 'Build Your Future With SilverLine Hospital',
      subtitle: 'Join a multidisciplinary team dedicated to delivering compassionate, advanced, and patient-centred healthcare across Central Tamil Nadu.',
      image: 'imagePaths.career.hero',
    },
    opportunitiesSection: {
      title: 'Current Opportunities',
      subtitle: 'Explore current career opportunities and find a role where you can make a meaningful difference in patients\' lives.',
    },
    whyJoinSection: {
      title: 'Why Build Your Career at SilverLine?',
      subtitle: 'We empower healthcare professionals with cutting-edge medical infrastructure, continuous clinical training, and an empathetic, patient-first culture.',
      highlights: [
        {
          id: 'clinical-tech',
          title: 'Advanced Clinical Infrastructure',
          description: 'Work with state-of-the-art laminar airflow surgical suites, flat-panel Cath Labs, 24/7 diagnostic imaging, and modern critical care units.',
          icon: 'Activity'
        },
        {
          id: 'continuous-learning',
          title: 'Continuous CME & Skill Enhancement',
          description: 'Regular certified medical education, advanced resuscitation simulations, and clinical workshops led by esteemed senior consultants.',
          icon: 'GraduationCap'
        },
        {
          id: 'patient-centered',
          title: 'Compassionate Patient-First Culture',
          description: 'Be part of an ethical, patient-centric environment where every doctor, nurse, and allied specialist is valued as an essential caregiver.',
          icon: 'HeartHandshake'
        },
        {
          id: 'multidisciplinary',
          title: 'Multidisciplinary Collaboration',
          description: 'Experience seamless synergy across 32 medical and surgical specialties with comprehensive peer consultation and team-based patient care.',
          icon: 'Users'
        },
        {
          id: 'benefits',
          title: 'Competitive Benefits & Wellness',
          description: 'Attractive compensation packages, medical insurance coverage for employees and families, structured shift schedules, and staff wellness programs.',
          icon: 'ShieldCheck'
        },
        {
          id: 'growth',
          title: 'Structured Career Progression',
          description: 'Clear career pathways with merit-based promotions into supervisory, clinical head, and administrative leadership roles.',
          icon: 'TrendingUp'
        }
      ]
    },
    cultureStats: [
      { label: 'Clinical Specialties', value: '32+' },
      { label: 'Healthcare Professionals', value: '500+' },
      { label: 'Emergency & Trauma Care', value: '24/7' },
      { label: 'Patient-Centric Dedication', value: '100%' }
    ],
    faqs: [
      {
        question: 'What is the recruitment process at SilverLine Hospital?',
        answer: 'Our recruitment process includes online application review, preliminary telephone screening by HR, technical/clinical interview with department heads, and an in-person panel discussion with credential verification.'
      },
      {
        question: 'Are there hostel or accommodation facilities for outstation nursing and allied staff?',
        answer: 'Yes, SilverLine Hospital provides secure, comfortable, and hygienic accommodation and subsidized dining facilities for outstation female nurses and healthcare technicians.'
      },
      {
        question: 'What documents should I bring for the interview?',
        answer: 'Please carry your updated CV, educational certificates (SSLC, HSC, Degree/Diploma marksheets), State Medical/Nursing Council Registration Certificate, experience letters from previous employers, and government photo ID (Aadhaar/PAN).'
      },
      {
        question: 'How can I apply if my specialized role is not currently listed?',
        answer: 'You can submit an open application through our direct email at careers@silverlinehospitals.com with your resume and area of interest. Our talent acquisition team will retain your profile in our active talent pool for forthcoming vacancies.'
      }
    ],
    hrContact: {
      email: 'careers@silverlinehospitals.com',
      phone: '+91 431 290 6470',
      whatsapp: '+91 96773 36097',
      address: 'SilverLine Hospital, Chennai National Highway, Palur, Tiruchirappalli - 620010'
    },
    jobs: [
      {
        id: 'nurse-icu-01',
        title: 'Staff Nurse – ICU & Critical Care',
        department: 'Nursing Care',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Mid-level',
        experience: '1–3 Years Experience',
        description: 'Deliver compassionate, high-dependency nursing care in our modern 24/7 Intensive Care Units. Monitor vital parameters, manage ventilators and infusion pumps, and collaborate with critical care intensivists.',
        responsibilities: [
          'Monitor hemodynamic parameters and administer prescribed medications',
          'Manage invasive and non-invasive mechanical ventilation support',
          'Maintain meticulous nursing documentation and patient safety protocols',
          'Coordinate closely with duty medical officers and intensivists'
        ],
        requirements: [
          'B.Sc Nursing or GNM from a recognized institution',
          'Valid registration with Tamil Nadu Nurses and Midwives Council',
          '1+ years hands-on experience in ICU/CCU preferred; freshers with strong clinical aptitude may be considered',
          'Strong communication skills in Tamil and English'
        ],
        salary: 'Best in Industry + Shift Allowances',
        applicants: 18,
        postedAgo: 'Just now',
        tags: ['Critical Care', 'Shift Rotations', 'Immediate Joiner'],
        urgent: true
      },
      {
        id: 'nurse-ot-02',
        title: 'OT Staff Nurse – Laparoscopic & General Surgery',
        department: 'Nursing Care',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Experienced',
        experience: '2–4 Years Experience',
        description: 'Assist senior surgeons in advanced laparoscopic, robotic, orthopedic, and emergency surgical procedures. Maintain strict aseptic protocols and manage surgical instrumentation.',
        responsibilities: [
          'Prepare operating rooms, sterile drapes, and specialized surgical equipment',
          'Scrub and circulate efficiently during complex elective and trauma operations',
          'Ensure strict inventory and sterilization compliance for surgical instruments',
          'Monitor immediate post-operative patient recovery in PACU'
        ],
        requirements: [
          'B.Sc Nursing or GNM with OT specialization/experience',
          'Valid Tamil Nadu Nursing Council registration',
          '2+ years of scrub experience in multi-specialty operation theatres',
          'Sound knowledge of infection control and sterilization processes'
        ],
        salary: 'Competitive + Incentives',
        applicants: 12,
        postedAgo: '3 days ago',
        tags: ['Surgical OT', 'Sterile Technique', 'Laparoscopy'],
        urgent: false
      },
      {
        id: 'dmo-er-03',
        title: 'Duty Medical Officer (DMO) / Casualty Medical Officer',
        department: 'Emergency & Critical Care',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Entry-to-Mid level',
        experience: '0–2 Years Experience',
        description: 'Provide prompt emergency triage, primary clinical resuscitation, and acute inpatient ward coverage. Ideal for MBBS graduates seeking intensive hands-on clinical exposure in Central Tamil Nadu.',
        responsibilities: [
          'Evaluate acute medical emergencies, trauma admissions, and walk-in patients',
          'Initiate basic and advanced life support (BLS/ACLS) protocols',
          'Conduct routine ward rounds and coordinate with primary consultants',
          'Accurate clinical record documentation and patient counseling'
        ],
        requirements: [
          'MBBS degree from a recognized university / NMC approved institution',
          'Permanent registration with Tamil Nadu Medical Council (TNMC)',
          'BLS/ACLS certification is an added advantage',
          'Willingness to work in rotating shifts including night shifts'
        ],
        salary: 'Attractive Remuneration + Accommodation',
        applicants: 24,
        postedAgo: '2 days ago',
        tags: ['Emergency Care', 'Trauma Triage', '24/7 Shifts'],
        urgent: true
      },
      {
        id: 'cardio-con-04',
        title: 'Consultant Interventional Cardiologist',
        department: 'Medical & Clinical',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Senior level',
        experience: '3–5 Years Post-DM/DNB',
        description: 'Lead coronary angiographies, complex primary angioplasties (PCI), pacemaker implantations, and non-invasive cardiology evaluations in our state-of-the-art Cath Lab unit.',
        responsibilities: [
          'Perform diagnostic coronary catheterizations and elective/emergency primary PCIs',
          'Manage inpatient coronary care unit (ICCU) and cardiac emergencies',
          'Conduct outpatient cardiology consultations and preventive heart checkups',
          'Mentor clinical team and participate in academic hospital forums'
        ],
        requirements: [
          'DM / DNB in Cardiology with recognized medical qualification',
          'Registered with Tamil Nadu Medical Council',
          'Proven competency in coronary interventions and cardiac emergencies',
          'Demonstrated dedication to ethical, evidence-based clinical practices'
        ],
        salary: 'Top Tier Professional Remuneration',
        applicants: 6,
        postedAgo: '1 week ago',
        tags: ['Cath Lab', 'Coronary Angioplasty', 'OPD & IPD'],
        urgent: false
      },
      {
        id: 'dialysis-tech-05',
        title: 'Senior Dialysis Technician',
        department: 'Allied Health & Diagnostics',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Mid-level',
        experience: '1–3 Years Experience',
        description: 'Operate advanced hemodialysis machines, initiate and terminate dialysis sessions, monitor vascular access, and ensure stringent infection prevention standards.',
        responsibilities: [
          'Set up and prime dialyzers and blood lines according to prescribed protocols',
          'Cannulate arteriovenous (AV) fistulas and monitor patient hemodynamics during treatment',
          'Maintain water treatment plant (RO system) quality tests and documentation',
          'Provide prompt first-line troubleshooting of dialysis machine alarms'
        ],
        requirements: [
          'Diploma or B.Sc in Dialysis Technology from a recognized institute',
          '1+ years clinical experience in a busy hospital dialysis unit',
          'Expertise in vascular cannulation and catheter dressings',
          'Empathetic patient interaction and punctual shift adherence'
        ],
        salary: 'Competitive Salary + Performance Allowance',
        applicants: 16,
        postedAgo: '4 days ago',
        tags: ['Hemodialysis', 'Nephrology', 'Water Treatment'],
        urgent: false
      },
      {
        id: 'radio-tech-06',
        title: 'CT / MRI & X-Ray Radiographer',
        department: 'Allied Health & Diagnostics',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Experienced',
        experience: '2–4 Years Experience',
        description: 'Perform diagnostic imaging protocols on multi-slice CT, high-tesla MRI, and digital radiography systems under the supervision of senior consultant radiologists.',
        responsibilities: [
          'Position patients accurately and execute specialized scan protocols',
          'Administer IV contrast agents under radiologist supervision with safety checks',
          'Maintain radiation safety regulations (AERB guidelines) and equipment upkeep',
          'Liaise with emergency and clinical departments for prompt report dispatch'
        ],
        requirements: [
          'B.Sc / Diploma in Medical Imaging Technology (Radiography)',
          '2+ years experience handling high-end CT / MRI scanners',
          'Sound understanding of cross-sectional anatomy and patient safety',
          'Good team coordination and readiness for rotational duties'
        ],
        salary: 'Commensurate with experience',
        applicants: 10,
        postedAgo: '5 days ago',
        tags: ['High-Resolution CT', 'MRI Imaging', 'Radiation Safety'],
        urgent: false
      },
      {
        id: 'pharm-07',
        title: 'Hospital Pharmacist (Inpatient & Outpatient)',
        department: 'Allied Health & Diagnostics',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Mid-level',
        experience: '1–3 Years Experience',
        description: 'Dispense prescribed medications for inpatient and outpatient units, maintain cold-chain storage standards, reconcile drug orders, and verify dosages and interactions.',
        responsibilities: [
          'Accurately dispense doctor prescriptions with clear patient dosage guidance',
          'Maintain inventory records, expiry tracking, and narcotic drug registers',
          'Ensure strict adherence to NABH medication management standards',
          'Coordinate closely with nursing wards for indent dispatches'
        ],
        requirements: [
          'B.Pharm / D.Pharm from a recognized university',
          'Registered Pharmacist under Tamil Nadu Pharmacy Council',
          'Experience in hospital pharmacy software systems',
          'Knowledge of pharmacology, generic substitutions, and patient counseling'
        ],
        salary: 'Standard Hospital Scale + Allowances',
        applicants: 22,
        postedAgo: '6 days ago',
        tags: ['Inpatient Pharmacy', 'Dispensing', 'Drug Safety'],
        urgent: false
      },
      {
        id: 'pcc-admin-08',
        title: 'Patient Care Coordinator / Front Desk Executive',
        department: 'Administration & Operations',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Entry-to-Mid level',
        experience: '1–3 Years Experience',
        description: 'Facilitate seamless patient registrations, guide families through OPD consultations and admission processes, and deliver empathetic assistance in English and Tamil.',
        responsibilities: [
          'Warmly greet patients, manage appointment check-ins, and direct to clinics',
          'Answer incoming telephone queries regarding doctors, tests, and packages',
          'Assist patients with admission paperwork, bed allocations, and discharge formalities',
          'Resolve customer service queries with courteous hospitality standards'
        ],
        requirements: [
          'Any Bachelor Degree / Hospital Administration diploma preferred',
          '1+ years front desk or customer service experience (healthcare preferred)',
          'Excellent verbal communication in Tamil and English',
          'Pleasant personality, empathy, and ability to handle multi-tasking calmly'
        ],
        salary: 'Attractive Salary + Perks',
        applicants: 31,
        postedAgo: '1 day ago',
        tags: ['Patient Relations', 'Admission Desk', 'Hospitality'],
        urgent: false
      },
      {
        id: 'billing-tpa-09',
        title: 'Medical Billing & Insurance (TPA) Executive',
        department: 'Administration & Operations',
        location: 'SilverLine Hospital, Trichy',
        type: 'Full Time',
        experienceLevel: 'Experienced',
        experience: '2–4 Years Experience',
        description: 'Coordinate cashless hospitalization authorizations with major TPA and private insurance companies, process claims documentation, and resolve billing queries.',
        responsibilities: [
          'Verify patient insurance eligibility, initiate pre-authorizations and enhancements',
          'Coordinate with doctors for query clarification and clinical summaries',
          'Process final cashless approvals and dispatch physical claim files to TPAs',
          'Maintain transparent communication with patients regarding non-payable charges'
        ],
        requirements: [
          'Degree in Commerce, Administration, or Life Sciences',
          '2+ years dedicated experience in hospital TPA desk or insurance operations',
          'Familiarity with ICD-10 codes, medical terminology, and insurance portals',
          'Proficiency in hospital information systems (HIS) and spreadsheet reporting'
        ],
        salary: 'Competitive + Incentives',
        applicants: 15,
        postedAgo: '4 days ago',
        tags: ['Cashless Insurance', 'TPA Processing', 'NABH Compliance'],
        urgent: true
      },
      {
        id: 'quality-exec-10',
        title: 'Quality & NABH Accreditation Executive',
        department: 'Administration & Operations',
        location: 'SilverLine Hospital, Trichy',
        type: 'Contract',
        experienceLevel: 'Experienced',
        experience: '2–5 Years Experience',
        description: 'Oversee ongoing hospital quality indicator monitoring, conduct departmental clinical audits, update standard operating procedures, and maintain NABH accreditation documentation.',
        responsibilities: [
          'Collect, validate, and analyze monthly clinical and managerial quality indicators',
          'Conduct regular internal audits for infection control, medication safety, and patient rights',
          'Train staff on incident reporting, sentinel events, and continuous quality improvement',
          'Prepare comprehensive reports for management and NABH assessment visits'
        ],
        requirements: [
          'Master’s in Hospital Administration (MHA) / Healthcare Quality certification',
          '2+ years direct experience in NABH accredited multi-specialty hospitals',
          'Deep understanding of NABH 5th Edition standards and quality tools',
          'Strong analytical, report-writing, and presentation abilities'
        ],
        salary: 'Industry Standard Package',
        applicants: 9,
        postedAgo: '1 week ago',
        tags: ['NABH Standards', 'Clinical Audits', 'Quality Metrics'],
        urgent: false
      }
    ]
  },
  specialtiesPage: {
    heroImage: 'imagePaths.specialties.pageHero',
    title: 'Our Specialties',
    subtitle: 'We offer a comprehensive range of specialized medical services, combining advanced technology with a compassionate, patient-centered approach. Explore our departments to find the expert care you need.',
    testimonialSection: {
      title: 'Trusted Care, Proven Results',
      subtitle: 'PATIENT STORIES',
      description: 'Our commitment to excellence is reflected in the positive experiences of our patients. We are dedicated to providing compassionate, personalized care that meets the unique needs of every individual we serve. Read what our patients have to say about their journey with us.'
    }
  },
  specialtyDetail: {
  },
  doctorSchedules: {},
  gallery: {
    title: 'Care Beyond Hospitals',
    subtitle: 'Extending care into communities through health camps, awareness programs, and preventive initiatives.',
    feature1: 'Advanced Robotic Surgery',
    feature2: 'Varian Halcion Radiotherapy',
    feature3: 'Futurestic Dialysis Unit'
  },
  galleryImages: [
    'imagePaths.specialties.cardiologyGallery[0]',
    'imagePaths.specialties.orthopedicsGallery[1]',
    'imagePaths.specialties.neurologyGallery[2]',
    'imagePaths.internationalPatients.collage1',
    'imagePaths.specialties.gastroGallery[0]',
    'imagePaths.about.hero2',
    'imagePaths.specialties.pulmonologyGallery[3]',
    'imagePaths.doctors.senthilkumar',
    'imagePaths.specialties.criticalCareGallery[1]',
    'imagePaths.marketing.formImage',
    'imagePaths.hero.slide2',
    'imagePaths.whyChooseUs'
  ],
  marketing: {
    hero: {
      title: 'Start Your Journey to Better Health',
      subtitle: 'Interested in our services? Fill out the form below to get a callback from our patient care coordinator.',
      image: 'imagePaths.marketing.hero',
    },
    services: {
        title: 'Our Premier Services',
        subtitle: 'Delivering excellence in every aspect of healthcare, from routine check-ups to advanced surgical procedures.',
        items: [
            {
                title: '24/7 Emergency Care',
                description: 'Our emergency department is always ready to provide immediate, life-saving care around the clock.'
            },
            {
                title: 'Advanced Diagnostics',
                description: 'Utilizing state-of-the-art imaging and lab services for accurate and rapid diagnoses.'
            },
            {
                title: 'Specialized Surgery',
                description: 'Expert surgeons performing a wide range of procedures with the latest minimally invasive techniques.'
            },
            {
                title: 'Cardiology',
                description: 'Comprehensive heart care, from preventive screenings to advanced cardiac interventions.'
            },
            {
                title: 'Orthopedics',
                description: 'Restoring mobility and quality of life with expert care for bones, joints, and muscles.'
            },
            {
                title: 'Pediatrics',
                description: 'Compassionate and specialized medical attention for infants, children, and adolescents.'
            }
        ]
    },
    form: {
        title: 'Request More Information',
        subtitle: 'Our team will get back to you within 24 hours.',
        buttonText: 'Request a Callback',
        image: 'imagePaths.marketing.formImage',
    }
  },
  internationalPatientPage: {
    hero: {
        title: 'Welcome, International Patients',
        subtitle: 'Experience world-class healthcare with personalized care and support, far from home.',
        image: 'imagePaths.internationalPatients.hero',
    },
    services: {
        title: 'A Seamless Healthcare Journey',
        subtitle: 'We provide end-to-end services to make your medical travel comfortable and hassle-free.',
        items: [
            {
                title: 'Visa & Travel Assistance',
                description: 'We help with visa invitation letters and coordinate travel arrangements.'
            },
            {
                title: 'Airport Services',
                description: 'Complimentary airport pickup and drop-off for you and your family.'
            },
            {
                title: 'Accommodations',
                description: 'Assistance with booking comfortable stays near the hospital for your convenience.'
            },
            {
                title: 'Language Interpreters',
                description: 'Professional interpreters to ensure clear communication with your medical team.'
            },
            {
                title: 'Care Coordinator',
                description: 'A dedicated coordinator to manage all your appointments and hospital needs.'
            },
            {
                title: 'Tele-Consultations',
                description: 'Follow-up consultations with your doctor from the comfort of your home country.'
            }
        ]
    },
    journey: {
        title: 'Your Journey With Us',
        subtitle: 'A simple, four-step process for your medical visit.',
        steps: [
            { title: 'Inquiry & Consultation', description: 'Contact us with your medical reports. Our experts will review your case and provide a treatment plan and cost estimate.' },
            { title: 'Plan Your Visit', description: 'Once you confirm, we assist with visa formalities, travel bookings, and accommodation arrangements.' },
            { title: 'Arrival & Treatment', description: 'Upon arrival, your care coordinator will guide you through registration, consultations, and your treatment process.' },
            { title: 'Recovery & Departure', description: 'We provide comprehensive post-treatment care and ensure you are fit to travel back home safely.' }
        ]
    },
    form: {
        title: 'Begin Your Journey',
        subtitle: 'Fill out the form below for a personalized quote and treatment plan.',
        buttonText: 'Submit Inquiry',
    }
  }
};
