import React from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { specialtiesList } from '../lib/specialtiesData';

const SpecialtiesSection: React.FC = () => {
  const allSpecialties = specialtiesList.slice(0, 23);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.hash = href;
  };

  return (
    <section id="home-specialties" className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-[60%]">
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 bg-teal-50 text-[#00B5A5] px-4 py-2 rounded-full mb-6 border border-teal-100/50">
                <span className="text-xs font-bold tracking-wider uppercase">Medical Excellence</span>
              </div>
              <EditableText
                as="h2"
                configKey="specialties.title"
                defaultValue="Our Specialized Departments"
                className="text-4xl font-extrabold text-[#0E2A47] sm:text-5xl"
                data-id="specialties-title"
              />
              <EditableText
                as="p"
                configKey="specialties.description"
                defaultValue="Discover our comprehensive range of medical specialties, where advanced technology meets compassionate care to provide the best possible treatment for our patients."
                className="mt-6 text-lg text-gray-500 max-w-2xl leading-relaxed"
                data-id="specialties-description"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {allSpecialties.map((specialty, index) => (
                <a
                  key={index}
                  href={`#${specialty.id}`}
                  onClick={(e) => handleNavClick(e, specialty.id)}
                  className="group flex items-center p-3 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-teal-50 hover:scale-[1.02] active:scale-95"
                >
                  <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-xl bg-teal-50 group-hover:bg-[#00B5A5] transition-all duration-300 shadow-sm group-hover:shadow-teal-100">
                    <EditableImage 
                      configKey={specialty.iconPath} 
                      alt={specialty.name}
                      className="h-10 w-10 object-contain brightness-0 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  </div>
                  <EditableText
                    as="span"
                    configKey={`specialties.list[${index}].name`}
                    defaultValue={specialty.name}
                    className="ml-4 text-sm font-bold text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors duration-200"
                    data-id={`specialty-name-${index}`}
                  />
                </a>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-[40%] lg:sticky lg:top-24">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <EditableImage
                configKey="specialties.image"
                defaultValue="/placeholder-image.jpg"
                alt="Medical team discussing patient care"
                className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="text-3xl font-bold mb-2">Pioneering Care</div>
                <div className="text-white/80">Committed to excellence in every department.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
