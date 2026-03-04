import React from 'react';
import PageHero from '../components/PageHero';

const MarketingPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <PageHero 
        title="Marketing & Events" 
        subtitle="Discover our latest community outreach programs and health events."
        backgroundImage="imagePaths.marketing.hero"
      />
      <div className="py-20 px-4">
        <p>Placeholder for Marketing Page</p>
      </div>
    </div>
  );
};

export default MarketingPage;
