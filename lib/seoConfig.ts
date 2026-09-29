/**
 * SilverLine Hospital SEO, AEO & GEO Configuration & Schema Generator
 * -------------------------------------------------------------------
 * Provides standardized NAP (Name, Address, Phone), metadata, and JSON-LD
 * schema generators for Google Search, AI Answer Engines (AEO), and Local GEO.
 */

export const HOSPITAL_NAP = {
  name: "SilverLine Hospital",
  legalName: "Silverline Multispeciality Hospital",
  alternateNames: [
    "SilverLine Hospital Trichy",
    "Silverline Multispeciality Hospital Tiruchirappalli",
    "Silverline Hospital Palur Trichy"
  ],
  url: "https://silverlinehospitals.com",
  logo: "https://silverlinehospitals.com/logo.svg",
  image: "https://silverlinehospitals.com/Standby/DSC_9806.jpg",
  telephone: "+91-9677336097",
  emergencyPhone: "0431-2906470",
  altPhone: "0431-2906471",
  email: "appointmentdesk@silverlinehospital.com",
  address: {
    streetAddress: "No: 3/332, Chennai National Highways, Palur",
    addressLocality: "Tiruchirappalli",
    addressRegion: "Tamil Nadu",
    postalCode: "620010",
    addressCountry: "IN"
  },
  geo: {
    latitude: "10.8524",
    longitude: "78.6946"
  },
  geoRadius: "50000", // 50km radius covering Central Tamil Nadu
  areaServed: [
    "Tiruchirappalli",
    "Trichy",
    "Central Tamil Nadu",
    "Thanjavur",
    "Karur",
    "Perambalur",
    "Pudukkottai",
    "Ariyalur",
    "Dindigul",
    "Namakkal",
    "Nagapattinam",
    "Tiruvarur"
  ],
  openingHours: "Mo-Su 00:00-23:59", // 24/7 Emergency & Inpatient
  sameAs: [
    "https://www.facebook.com/profile.php?id=100092393246374",
    "https://x.com/Silverline63819",
    "https://www.instagram.com/silverlinehospitals/",
    "https://www.linkedin.com/in/silverline-hospital-99a737284/"
  ],
  priceRange: "$$"
};

/**
 * Generates Root Hospital & MedicalOrganization Schema (JSON-LD)
 */
export const generateHospitalSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "EmergencyService"],
    "@id": `${HOSPITAL_NAP.url}/#hospital`,
    "name": HOSPITAL_NAP.name,
    "legalName": HOSPITAL_NAP.legalName,
    "alternateName": HOSPITAL_NAP.alternateNames,
    "url": HOSPITAL_NAP.url,
    "logo": HOSPITAL_NAP.logo,
    "image": HOSPITAL_NAP.image,
    "telephone": [HOSPITAL_NAP.telephone, HOSPITAL_NAP.emergencyPhone, HOSPITAL_NAP.altPhone],
    "email": HOSPITAL_NAP.email,
    "priceRange": HOSPITAL_NAP.priceRange,
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking, Health Insurance",
    "isAcceptingNewPatients": true,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": HOSPITAL_NAP.address.streetAddress,
      "addressLocality": HOSPITAL_NAP.address.addressLocality,
      "addressRegion": HOSPITAL_NAP.address.addressRegion,
      "postalCode": HOSPITAL_NAP.address.postalCode,
      "addressCountry": HOSPITAL_NAP.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": HOSPITAL_NAP.geo.latitude,
      "longitude": HOSPITAL_NAP.geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
        "description": "24/7 Emergency, Trauma Care, ICU & Inpatient Services"
      }
    ],
    "hasMap": "https://maps.google.com/?q=Silverline+Hospital+Trichy",
    "areaServed": HOSPITAL_NAP.areaServed.map(city => ({
      "@type": "City",
      "name": city
    })),
    "sameAs": HOSPITAL_NAP.sameAs,
    "medicalSpecialty": [
      "https://schema.org/Cardiovascular",
      "https://schema.org/Oncologic",
      "https://schema.org/Surgical",
      "https://schema.org/Emergency",
      "https://schema.org/Pediatric",
      "https://schema.org/Obstetric",
      "https://schema.org/Gynecologic",
      "https://schema.org/Renal",
      "https://schema.org/Gastroenterologic",
      "https://schema.org/Otolaryngologic",
      "https://schema.org/Dermatologic",
      "https://schema.org/PlasticSurgery",
      "https://schema.org/Psychiatric"
    ]
  };
};

/**
 * Generates BreadcrumbList Schema (JSON-LD)
 */
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${HOSPITAL_NAP.url}${item.url.startsWith("/") ? item.url : `/${item.url}`}`
    }))
  };
};

/**
 * Generates FAQPage Schema (JSON-LD)
 */
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generates MedicalWebPage Schema for Department/Specialty Pages
 */
export const generateMedicalWebPageSchema = (options: {
  name: string;
  description: string;
  url: string;
  services?: string[];
  medicalSpecialty?: string;
  faqs?: { question: string; answer: string }[];
}) => {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${options.name} | SilverLine Hospital Trichy`,
    "description": options.description,
    "url": options.url.startsWith("http") ? options.url : `${HOSPITAL_NAP.url}${options.url.startsWith("/") ? options.url : `/${options.url}`}`,
    "hospitalAffiliation": {
      "@type": "Hospital",
      "name": HOSPITAL_NAP.name,
      "url": HOSPITAL_NAP.url,
      "telephone": HOSPITAL_NAP.telephone
    },
    "medicalAudience": "Patients and Medical Seekers",
    "about": {
      "@type": "MedicalSpecialty",
      "name": options.name,
      "description": options.description
    }
  };

  if (options.services && options.services.length > 0) {
    schema["mainContentOfPage"] = {
      "@type": "WebPageElement",
      "name": `${options.name} Services Offered`,
      "description": options.services.join(", ")
    };
  }

  return schema;
};

/**
 * Generates Physician Schema (JSON-LD)
 */
export const generatePhysicianSchema = (doctor: {
  name: string;
  specialty: string;
  shortBio?: string;
  fullBio?: string;
  image?: string;
  expertise?: string[];
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doctor.name,
    "medicalSpecialty": doctor.specialty,
    "description": doctor.shortBio || doctor.fullBio || `${doctor.name} is a specialist in ${doctor.specialty} at SilverLine Hospital Trichy.`,
    "hospitalAffiliation": {
      "@type": "Hospital",
      "name": HOSPITAL_NAP.name,
      "url": HOSPITAL_NAP.url,
      "address": HOSPITAL_NAP.address
    },
    "worksFor": {
      "@type": "Hospital",
      "name": HOSPITAL_NAP.name
    },
    "knowsAbout": doctor.expertise || [doctor.specialty],
    "telephone": HOSPITAL_NAP.telephone
  };
};

/**
 * Generates Article / BlogPosting Schema (JSON-LD)
 */
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  image?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": HOSPITAL_NAP.name,
      "logo": {
        "@type": "ImageObject",
        "url": HOSPITAL_NAP.logo
      }
    },
    "image": article.image || HOSPITAL_NAP.image,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url.startsWith("http") ? article.url : `${HOSPITAL_NAP.url}${article.url.startsWith("/") ? article.url : `/${article.url}`}`
    }
  };
};
