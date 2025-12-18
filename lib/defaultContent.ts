
import { imagePaths } from './imagePaths';
import type { Doctor } from './doctorsData';

const doctorList: Doctor[] = [
  {
    id: 'g-senthilkumar',
    name: 'Dr. G. Senthilkumar',
    specialty: 'Surgical Oncologist',
    image: 'imagePaths.doctors.senthilkumar',
    shortBio: 'Dr. G. Senthilkumar is a distinguished Surgical Oncologist, holding qualifications of MS, DNB, and MCh in Surgical Oncology.',
    fullBio: 'With over 15 years of experience in the field, Dr. G. Senthilkumar has pioneered several minimally invasive surgical techniques for cancer treatment in the region. He is an active member of the National Oncology Association and has published numerous papers on advanced surgical oncology. His patient-centric approach ensures that each individual receives a tailored treatment plan designed for the best possible outcome.',
    philosophy: 'Dedicated to providing comprehensive and compassionate cancer care through advanced surgical techniques and a patient-first approach.',
    expertise: ['Minimally Invasive Cancer Surgery', 'Robotic Surgery', 'Head and Neck Oncology', 'Gastrointestinal Cancer'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
  {
    id: 'g-hemalatha',
    name: 'Dr. G. Hemalatha',
    specialty: 'Onco Pathologist',
    image: 'imagePaths.doctors.hemalatha',
    shortBio: 'Dr. G. Hemalatha is an expert Onco Pathologist specializing in the Pathology department. Her qualification is MD in Pathology.',
    fullBio: 'Dr. G. Hemalatha leads our pathology lab with a focus on molecular diagnostics and personalized medicine. Her research in tumor microenvironments has been instrumental in developing more effective, targeted therapies. She works closely with our oncology team to provide precise diagnoses that form the foundation of every treatment strategy.',
    philosophy: 'Committed to accurate diagnosis as the cornerstone of effective treatment, utilizing meticulous pathological analysis to guide patient care.',
    expertise: ['Molecular Diagnostics', 'Tumor Pathology', 'Hematopathology', 'Cytopathology'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
  {
    id: 's-sivapragash',
    name: 'Dr. S. Sivapragash',
    specialty: 'Surgical Oncologist',
    image: 'imagePaths.doctors.sivapragash',
    shortBio: 'Dr. S. Sivapragash is a highly skilled Surgical Oncologist with qualifications including MS, MCh (Surgical Oncology), and FMAS.',
    fullBio: 'Dr. S. Sivapragash is renowned for his expertise in complex cancer surgeries. He holds fellowships in minimal access surgery and is a trainer for advanced laparoscopic procedures. His approach integrates cutting-edge surgical techniques with a deep commitment to patient recovery and quality of life post-treatment.',
    philosophy: 'Believes in combining surgical precision with a holistic view of patient well-being to achieve the best possible outcomes in cancer treatment.',
    expertise: ['Laparoscopic Oncology Surgery', 'Breast Cancer Surgery', 'Thoracic Oncology', 'Soft Tissue Sarcomas'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
  {
    id: 's-shankar',
    name: 'Dr. S. Shankar',
    specialty: 'Surgical Gastroenterologist',
    image: 'imagePaths.doctors.shankar',
    shortBio: 'Dr. S. Shankar specializes in Surgical Gastroenterology, focusing on the liver, pancreas, and gastrointestinal tract. Qualifications: MS, MCh (SGE).',
    fullBio: 'Dr. S. Shankar is a leading expert in hepato-pancreato-biliary (HPB) surgery. He has performed over 500 complex liver and pancreas resections and is a pioneer in liver transplant procedures in our hospital. His dedication to research keeps him at the forefront of gastroenterological surgery.',
    philosophy: 'Striving to restore digestive health through advanced surgical solutions, tailored to each patient\'s unique condition and needs.',
    expertise: ['Liver and Pancreas Surgery', 'Advanced Laparoscopic GI Surgery', 'Bariatric Surgery', 'Endoscopic Procedures'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
   {
    id: 'mg-rahul',
    name: 'Dr. M.G. Rahul',
    specialty: 'Radiation Oncologist',
    image: 'imagePaths.doctors.rahul',
    shortBio: 'Dr. M.G. Rahul is a Radiation Oncologist with expertise in radiation therapy for cancer treatment. His qualifications are DMRT, DNB, and CCEPC.',
    fullBio: 'Dr. M.G. Rahul combines technical expertise with a compassionate approach to patient care. He specializes in advanced radiation techniques like IMRT, IGRT, and Stereotactic Radiosurgery, which allow for highly precise tumor targeting while minimizing side effects. He is also actively involved in clinical trials for new radiation therapies.',
    philosophy: 'Utilizing cutting-edge radiation technology to target cancer with precision, while minimizing impact on surrounding healthy tissue.',
    expertise: ['Stereotactic Radiosurgery (SRS)', 'IMRT and IGRT', 'Brachytherapy', 'Palliative Radiation Therapy'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
  {
    id: 'rk-vinodh-khanna',
    name: 'Dr. R.K. Vinodh Khanna',
    specialty: 'Consultant Urologist, Andrologist, Transplant Surgeon',
    image: 'imagePaths.doctors.khanna',
    shortBio: 'Dr. R.K. Vinodh Khanna is a consultant in the Urology department with qualifications of MS, DNB, and DNB (URO).',
    fullBio: 'Dr. R.K. Vinodh Khanna is a versatile surgeon with extensive experience in urology, andrology, and renal transplant surgery. He is known for his expertise in robotic-assisted prostatectomy and complex reconstructive urology. His holistic approach addresses not just the disease but also the patient\'s overall quality of life.',
    philosophy: 'Providing comprehensive care for urological conditions with a focus on patient comfort, advanced surgical techniques, and long-term health.',
    expertise: ['Robotic Urology Surgery', 'Renal Transplant', 'Andrology and Male Infertility', 'Reconstructive Urology'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
  {
    id: 's-vishnu-kumar',
    name: 'Dr. S. Vishnu Kumar',
    specialty: 'Laparoscopic & General Surgeon',
    image: 'imagePaths.doctors.kumar',
    shortBio: 'Dr. S. Vishnu Kumar is a specialist in General & Laparoscopic Surgery. Qualifications include MS, FMAS, FALS, FIAGES, and Dip.Lap.Surgery.',
    fullBio: 'Dr. S. Vishnu Kumar is a master of minimally invasive techniques, holding multiple fellowships in laparoscopic surgery. He handles a wide range of procedures from gallbladder and hernia repairs to complex abdominal surgeries. Patients appreciate his clear communication and the faster recovery times associated with his surgical approach.',
    philosophy: 'Championing minimally invasive surgery to ensure faster recovery, less pain, and better outcomes for patients requiring surgical intervention.',
    expertise: ['Advanced Laparoscopic Surgery', 'Hernia Repair', 'Gallbladder Surgery', 'Trauma Surgery'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
  {
    id: 'm-nirmal',
    name: 'Dr. M. Nirmal',
    specialty: 'Fellowship in Orthoscopic & Sports Medicine',
    image: 'imagePaths.doctors.nirmal',
    shortBio: 'Dr. M. Nirmal specializes in Orthopaedics & Trauma. His qualifications are MS (Ortho) and DNB (Ortho).',
    fullBio: 'Dr. M. Nirmal is a leading orthopedic surgeon with a special focus on sports medicine and arthroscopic surgery. He has worked with professional athletes and is an expert in treating ligament tears, joint instability, and other sports-related injuries. His goal is to get patients back to their active lifestyles as quickly and safely as possible.',
    philosophy: 'Dedicated to restoring mobility and function. My goal is to help patients overcome musculoskeletal injuries and conditions effectively.',
    expertise: ['Arthroscopic Knee & Shoulder Surgery', 'Sports Injury Management', 'Joint Replacement', 'Complex Trauma Surgery'],
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  }
];

export const defaultContent = {
  imagePaths: imagePaths,
  doctors: {
    title: 'Meet Our Expert Doctors',
    subtitle: 'Our team of dedicated and experienced professionals is here to serve you.',
    list: doctorList,
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
      cosmeticDentistry: { title: 'Cosmetic Dentistry', description: 'Socially conscious organization.' },
      experiencedTeam: { title: 'Experienced Team', description: 'Vastly experienced team of doctors with extensive clinical expertise.' },
      pediatricDentistry: { title: 'Pediatric Dentistry', description: 'Dedicated and exclusive patient advice and liaison team.' },
      affordableMedicines: { title: 'Affordable Medicines', description: 'High quality medical services made affordable.' },
      periodontalTherapy: { title: 'Periodontal Therapy', description: 'Dedicated nursing and paramedical support.' }
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
      description: 'To provide outstanding patient care with a focus on clinical excellence, patient safety, and an unparalleled passion for quality.'
    },
    vision: {
      title: 'Our Vision',
      description: 'To be a leading healthcare institution, recognized for our innovation, compassionate care, and commitment to the communities we serve.'
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
        title: 'Continual Improvement',
        points: [
          'Constantly seeking feedback to enhance our services and patient outcomes.',
          'Investing in the latest medical technologies and continuous professional training.',
          'Promoting a culture of innovation, learning, and development among our staff.',
          'Regularly reviewing our processes to ensure the highest standards of safety and efficiency.',
        ],
      },
      {
        title: 'Heartfelt Personal Touch',
        points: [
          'Greeting each patient with a smile and in a friendly manner',
          'Doing our best to make every patient feel at home',
          'Understanding that each individual has unique needs and has to be helped accordingly',
          'Striving to satisfy all the needs, big or small of our patients',
        ],
      },
      {
        title: 'Ethical',
        points: [
          'Upholding the highest standards of integrity and professional conduct.',
          'Ensuring transparency in all our communications with patients and their families.',
          'Protecting patient confidentiality and privacy with utmost seriousness.',
          'Making decisions based on the best interests of our patients, always.',
        ],
      },
      {
        title: 'Empathetic Care',
        points: [
          'Actively listening to our patients\' concerns and stories with compassion.',
          'Providing emotional support to patients and their loved ones.',
          'Creating a healing environment where patients feel understood and valued.',
          'Treating every individual with the dignity and respect they deserve.',
        ],
      },
      {
        title: 'Real Accountability',
        points: [
          'Taking ownership of our actions and their outcomes.',
          'Maintaining open and honest communication, especially when challenges arise.',
          'Committing to measurable goals for quality and patient satisfaction.',
          'Holding ourselves responsible for the trust our community places in us.',
        ],
      },
      {
        title: 'Service Excellence',
        points: [
          'Striving to exceed expectations in every aspect of our care.',
          'Delivering timely, coordinated, and efficient services.',
          'Ensuring a clean, safe, and comfortable environment for all.',
          'Continuously working to create a seamless and positive healthcare experience.',
        ],
      },
    ],
    main: {
      title: 'Welcome to Your Partner in Health',
      description: 'Founded on the principles of compassion, innovation, and excellence, SilverLine Hospital is dedicated to providing comprehensive and personalized medical care. Our mission is to deliver outstanding patient care with a focus on clinical excellence and patient safety.'
    },
    stats: {
      stat1: { value: '15+', label: 'Years Experience' },
      stat2: { value: '98%', label: 'Success Rate' },
      stat3: { value: '25k+', label: 'Trusted Patients' },
      stat4: { value: '10k+', label: 'Surgeries Completed' }
    },
    journey: {
        title: 'Our Journey to Excellence',
        subtitle: 'A timeline of our dedication to healthcare and our community.',
        items: [
            {
                year: '2008',
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
                year: '2023',
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
      phone: '+91 96773 36097 / 0431 276 0030',
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
      description: "If you are experiencing a life-threatening medical emergency, please call <a href='tel:911' class='text-red-600 font-bold underline hover:text-red-700 transition-colors'>911</a> immediately or visit your nearest emergency room."
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
    email: 'contact@silverlinehospital.com'
  },
  socialMedia: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#'
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
      title: 'Join Our Team of Experts',
      subtitle: 'Make a difference with a career at SilverLine Hospital. We are looking for passionate individuals to join our mission of providing exceptional healthcare.',
      image: 'imagePaths.career.hero',
    },
    jobs: [
      {
        id: 'pd01',
        title: 'Product designer',
        company: 'MetaMask',
        logo: 'https://logo.clearbit.com/metamask.io',
        location: 'Wellness City',
        type: 'Full time',
        experienceLevel: 'Entry level',
        description: 'Doing the right thing for investors is what we’re all about at Vanguard, and that in...',
        salary: 250,
        salaryType: 'hr',
        applicants: 29,
        postedAgo: '12 days ago',
        tags: ['Entry Level', 'Full-Time'],
      },
      {
        id: 'ux01',
        title: 'Sr. UX Designer',
        company: 'Netflix',
        logo: 'https://logo.clearbit.com/netflix.com',
        location: 'Wellness City',
        type: 'Part time',
        experienceLevel: 'Expert',
        description: 'Netflix is one of the world’s leading entertainment service with o...',
        salary: 195,
        salaryType: 'hr',
        applicants: 14,
        postedAgo: '5 days ago',
        tags: ['Expert', 'Part-Time', 'Remote'],
      },
      {
        id: 'pd02',
        title: 'Product designer',
        company: 'Microsoft',
        logo: 'https://logo.clearbit.com/microsoft.com',
        location: 'Wellness City',
        type: 'Full time',
        experienceLevel: 'Intermediate',
        description: 'Welcome to Lightspeed LA, the first U.S.-based, AAA game development studio f...',
        salary: 210,
        salaryType: 'hr',
        applicants: 58,
        postedAgo: '4 days ago',
        tags: ['Intermediate', 'Full-Time'],
      },
      {
        id: 'pd03',
        title: 'Product designer',
        company: 'Reddit',
        logo: 'https://logo.clearbit.com/reddit.com',
        location: 'Wellness City',
        type: 'Part time',
        experienceLevel: 'Expert',
        description: 'Prelim is how banks onboard their customers for business checking accou...',
        salary: 120,
        salaryType: 'hr',
        applicants: 23,
        postedAgo: '22 days ago',
        tags: ['Expert', 'Part-Time'],
      },
      {
        id: 'be01',
        title: 'Backend Dev.',
        company: 'Google',
        logo: 'https://logo.clearbit.com/google.com',
        location: 'Wellness City',
        type: 'Full time',
        experienceLevel: 'Intermediate',
        description: 'Coalfire is on a mission to make the world a safer place by solving our client...',
        salary: 260,
        salaryType: 'hr',
        applicants: 21,
        postedAgo: '5 days ago',
        tags: ['Intermediate', 'Full-Time'],
      },
      {
        id: 'smm01',
        title: 'SMM Manager',
        company: 'Spotify',
        logo: 'https://logo.clearbit.com/spotify.com',
        location: 'Wellness City',
        type: 'Full time',
        experienceLevel: 'Intermediate',
        description: 'Join us as we increase access to banking and financial services, helping banks an...',
        salary: 170,
        salaryType: 'hr',
        applicants: 28,
        postedAgo: '8 days ago',
        tags: ['Intermediate', 'Full-Time'],
      },
      {
        id: 'rn01',
        title: 'Registered Nurse (RN)',
        company: 'SilverLine Hospital',
        logo: 'imagePaths.logos.favicon',
        location: 'Wellness City',
        type: 'Full time',
        experienceLevel: 'Intermediate',
        description: 'We are seeking a compassionate and skilled Registered Nurse to join our Cardiology unit.',
        salary: 50,
        salaryType: 'hr',
        applicants: 15,
        postedAgo: '1 day ago',
        tags: ['Intermediate', 'Full-Time'],
      },
      {
        id: 'ma01',
        title: 'Medical Assistant',
        company: 'SilverLine Hospital',
        logo: 'imagePaths.logos.favicon',
        location: 'Wellness City',
        type: 'Project work',
        experienceLevel: 'Entry level',
        description: 'Support doctors and nurses with patient care duties, including taking vital signs and patient records.',
        salary: 25,
        salaryType: 'hr',
        applicants: 45,
        postedAgo: '3 days ago',
        tags: ['Entry Level', 'Project work'],
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
    title: 'Our Gallery',
    subtitle: "A glimpse into our world-class facilities and compassionate care."
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
