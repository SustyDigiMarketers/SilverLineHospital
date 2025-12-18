import React from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { specialtiesList } from '../lib/specialtiesData';

const SpecialtiesSection: React.FC = () => {

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.hash = href;
  };

  return (
    <section id="specialties" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
        
        {/* Left Column: Title and Specialties */}
        <div className="animate-on-scroll fade-in-left py-12 order-1">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-16">
            <EditableText
              as="h2"
              configKey="specialties.title"
              defaultValue="Our Specialties"
              className="text-4xl sm:text-5xl font-bold text-[#0E2A47] !leading-tight mb-12"
            />
            {/* Updated Grid for Specialty Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {specialtiesList.map((specialty, index) => (
                <a 
                  key={index}
                  href={`#specialty/${specialty.id}`}
                  onClick={(e) => handleNavClick(e, `#specialty/${specialty.id}`)}
                  className="group flex items-center text-left p-4 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-[#27afaf]/40 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                >
                  {/* Content Wrapper */}
                  <div className="flex items-center w-full">
                    <div className="inline-block flex-shrink-0 bg-teal-100 text-teal-600 p-4 rounded-full mr-4 transition-all duration-300 group-hover:bg-blue-100 group-hover:text-[#1d3f7f] group-hover:scale-110">
                      {React.cloneElement(specialty.icon as React.ReactElement<{ className?: string }>, { className: 'h-6 w-6' })}
                    </div>
                    <h3 className="flex-grow font-bold text-base text-[#0E2A47] transition-colors duration-300 group-hover:text-[#1d3f7f]">
                      {specialty.name}
                    </h3>
                     <div className="ml-auto text-[#00B5A5] group-hover:text-[#27afaf] transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column: Image Block */}
        <div className="animate-on-scroll fade-in-right h-full order-2">
          <EditableImage 
            configKey="specialties.image"
            alt="Medical professionals in a modern hospital setting" 
            className="w-full h-full object-cover min-h-[400px] lg:min-h-full"
          />
        </div>

      </div>
    </section>
  );
};

export default SpecialtiesSection;