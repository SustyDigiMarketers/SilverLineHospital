import React from 'react';
import EditableImage from './MasterSetup/EditableImage';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string; // This will now be a configKey
  align?: 'left' | 'center';
}

const PageHero: React.FC<PageHeroProps> = ({ title, backgroundImage, align = 'center' }) => {
  return (
    <section
      className="relative h-[200px] md:h-[450px] flex items-center justify-center text-white overflow-hidden bg-[#0E2A47]"
    >
      <EditableImage 
        configKey={backgroundImage} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-fill" 
        priority={true}
      />
    </section>
  );
};

export default PageHero;
