import React from 'react';
import PageHero from '../components/PageHero';

const InternationalPatientPage: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="International Patients" 
        subtitle="World-class healthcare services for patients traveling to Trichy from abroad."
        backgroundImage="imagePaths.internationalPatients.hero"
      />
      <div className="container mx-auto py-12 px-4">
        <p>Placeholder for International Patient Care Page</p>
      </div>
    </div>
  );
};

export default InternationalPatientPage;
