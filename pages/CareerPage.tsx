import React from 'react';
import PageHero from '../components/PageHero';

const CareerPage: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="Join Our Team" 
        subtitle="Build your career at Trichy's pioneer multi-speciality hospital."
        backgroundImage="imagePaths.career.hero"
      />
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Current Openings</h2>
        <p>Placeholder for Careers Page</p>
      </div>
    </div>
  );
};

export default CareerPage;
