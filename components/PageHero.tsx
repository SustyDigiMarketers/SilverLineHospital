import React from 'react';
import EditableImage from './MasterSetup/EditableImage';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string; // This will now be a configKey
  align?: 'left' | 'center';
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImage, align = 'center' }) => {
  const alignmentClass = align === 'left' ? 'text-left' : 'text-center';
  const subtitleMarginClass = align === 'center' ? 'mx-auto' : '';
  
  return (
    <section
      className="relative h-[50vh] md:h-screen flex items-center justify-center text-white overflow-hidden"
    >
      <EditableImage 
        configKey={backgroundImage} 
        alt={title} 
        className="absolute inset-0 w-full h-full" 
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className={`relative ${alignmentClass} animate-on-scroll fade-in-up p-4 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8`}>
        <h1 className="text-5xl md:text-6xl font-bold">{title}</h1>
        <p className={`mt-4 text-lg text-gray-200 max-w-3xl ${subtitleMarginClass}`}>{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;