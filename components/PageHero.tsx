import React from 'react';
import EditableImage from './MasterSetup/EditableImage';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string; // This will now be a configKey
  align?: 'left' | 'center';
}

const PageHero: React.FC<PageHeroProps> = ({ title, backgroundImage, align = 'center' }) => {
  const isDirectPath = backgroundImage.startsWith('/') || backgroundImage.startsWith('http');
  return (
    <section
      className="relative w-full h-[200px] sm:h-[320px] md:h-[500px] xl:h-[550px] flex items-center justify-center text-white overflow-hidden bg-[#0E2A47]"
    >
      <div className="w-full max-w-[480px] sm:max-w-none mx-auto h-full relative">
        <EditableImage 
          configKey={isDirectPath ? undefined : backgroundImage} 
          src={isDirectPath ? backgroundImage : undefined}
          defaultValue={isDirectPath ? backgroundImage : undefined}
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover object-center" 
          priority={true}
        />
      </div>
    </section>
  );
};

export default PageHero;
