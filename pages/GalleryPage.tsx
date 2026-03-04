import React from 'react';
import PageHero from '../components/PageHero';
import GallerySection from '../components/GallerySection';

const GalleryPage: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="Hospital Gallery" 
        subtitle="A glimpse into our state-of-the-art facilities and compassionate care."
        backgroundImage="imagePaths.specialties.pageHero"
      />
      <GallerySection />
    </div>
  );
};

export default GalleryPage;
