import React from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { specialtiesList } from '../lib/specialtiesData';

const SpecialtiesSection: React.FC = () => {
  const featuredSpecialties = specialtiesList.slice(0, 6);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.hash = href;
  };

  return (
    <section id="home-specialties" className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Title and Specialties */}
          <div className="animate-on-scroll fade-in-left">
            <EditableText
              as="h2"
              configKey="specialties.title"
              defaultValue="Our Specialties"
              className="text-4xl sm:text-5xl font-bold text-[#0E2A47] !leading-tight mb-12"
            />
            {/* Updated Grid for Specialty Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 stagger-children">
              {featuredSpecialties.map((specialty, index) => (
                <a 
                  key={index}
                  href={`#specialty/${specialty.id}`}
                  onClick={(e) => handleNavClick(e, `#specialty/${specialty.id}`)}
                  className="group flex items-center text-left p-4 bg-white rounded-xl shadow-lg border border-transparent hover:border-teal-100 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-[#00B5A5]/10 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] animate-on-scroll fade-in-up"
                >
                  {/* Content Wrapper */}
                  <div className="flex items-center w-full">
                    <div className="inline-block flex-shrink-0 bg-teal-100 text-teal-600 p-4 rounded-full mr-4 transition-all duration-300 group-hover:bg-[#0E2A47] group-hover:text-white group-hover:scale-110 shadow-sm">
                      {React.cloneElement(specialty.icon as React.ReactElement<{ className?: string }>, { className: 'h-6 w-6' })}
                    </div>
                    <h3 className="flex-grow font-bold text-base text-[#0E2A47] transition-colors duration-300 group-hover:text-[#00B5A5]">
                      {specialty.name}
                    </h3>
                     <div className="ml-auto text-[#00B5A5] group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
             <div className="mt-12 animate-on-scroll fade-in-up delay-300">
                <a 
                    href="#specialties"
                    onClick={(e) => handleNavClick(e, '#specialties')}
                    className="inline-block px-8 py-3 font-semibold text-[#0E2A47] bg-transparent border-2 border-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#0E2A47] hover:text-white transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E2A47]"
                >
                    View All Specialties
                </a>
            </div>
          </div>

          {/* Right Column: Image Block */}
          <div className="animate-on-scroll fade-in-right h-full min-h-[400px] lg:min-h-full">
            <EditableImage 
              configKey="specialties.image"
              alt="Medical professionals at SilverLine, Trichy's leading multi-speciality hospital" 
              className="rounded-2xl w-full h-full object-cover shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;