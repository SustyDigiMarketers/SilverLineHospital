import React from 'react';
import Hero from '../components/Hero';
import IslandBar from '../components/IslandBar';
import Features from '../components/Features';
import Services from '../components/Services';
import HomeGallery from '../components/HomeGallery';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import StatsBar from '../components/StatsBar';
import VideoSection from '../components/VideoSection';
import SEO from '../components/SEO';
import { generateHospitalSchema, generateBreadcrumbSchema } from '../lib/seoConfig';

interface HomePageProps {
  onBookAppointmentClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookAppointmentClick }) => {
  const hospitalSchema = generateHospitalSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' }
  ]);

  return (
    <div>
      <SEO
        title="Best Multispeciality Hospital in Trichy | 24/7 Emergency & Critical Care"
        description="SilverLine Hospital in Trichy offers world-class healthcare, 24/7 emergency & trauma care, advanced cancer care, cardiology, nephrology, urology, and 28+ clinical specialties in Central Tamil Nadu."
        keywords="multispeciality hospital in trichy, best hospital in trichy, emergency hospital trichy, cancer hospital trichy, cardiology trichy, nephrology trichy, best doctors in tiruchirappalli, 24 hours hospital trichy"
        canonical="/"
        schema={[hospitalSchema, breadcrumbSchema]}
      />
      <Hero />
      <IslandBar />
      <Features />
      <Services />
      <HomeGallery />
      <WhyChooseUs />
      <StatsBar />
      <Testimonials />
      <VideoSection />
    </div>
  );
};

export default HomePage;
