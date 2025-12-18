import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SpecialtiesSection from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import ActionBar from '../components/ActionBar';
import StatsBar from '../components/StatsBar';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

interface HomePageProps {
  onBookAppointmentClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookAppointmentClick }) => {
  // MedicalOrganization Schema for Google Local Business
  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "SilverLine Hospital",
    "url": "https://silverlinehospitals.com",
    "logo": "https://silverlinehospitals.com/assets/logo.svg",
    "description": "Rated best multispeciality hospital in Trichy offering 24/7 emergency care, cardiology, oncology, nephrology, and pediatrics.",
    "telephone": "+91-96773-36097",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No: 3/332, Chennai National Highways, Palur",
      "addressLocality": "Trichy",
      "addressRegion": "Tamil Nadu",
      "postalCode": "621216",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.894912,
      "longitude": 78.721835
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "medicalSpecialty": [
      "Cardiology",
      "Oncology",
      "Nephrology",
      "Pediatrics",
      "Orthopedics",
      "Neurology"
    ]
  };

  return (
    <>
      <SEO 
        title="Best Multi Speciality Hospital in Trichy"
        description="Looking for the best hospital in Trichy? SilverLine Hospital offers top-rated treatment for Heart, Kidney, Cancer, and Maternity care with 24/7 Emergency services."
        keywords="Best hospital in Trichy, Top multispeciality hospital Trichy, Kidney specialist Trichy, Cancer hospital Trichy, Heart hospital Trichy, Best Pediatrician Trichy"
        schema={hospitalSchema}
      />
      <Hero />
      <ActionBar onBookAppointmentClick={onBookAppointmentClick} />
      <SpecialtiesSection />
      <WhyChooseUs />
      <StatsBar />
      <Testimonials />
      <Features />
    </>
  );
};

export default HomePage;