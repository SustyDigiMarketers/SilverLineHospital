import React from 'react';
import Hero from '../components/Hero';
import IslandBar from '../components/IslandBar';
import Features from '../components/Features';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import StatsBar from '../components/StatsBar';
import VideoSection from '../components/VideoSection';

interface HomePageProps {
  onBookAppointmentClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookAppointmentClick }) => {
  return (
    <div>
      <Hero />
      <IslandBar />
      <Features />
      <Services />
      <WhyChooseUs />
      <StatsBar />
      <Testimonials />
      <VideoSection />
    </div>
  );
};

export default HomePage;
