import React from 'react';
import EditableText from './MasterSetup/EditableText';

const IslandBar: React.FC = () => {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      event.preventDefault();
      window.location.hash = href;
    }
  };

  const navItems = [
    {
      titleKey: 'island.findDoctor.title',
      defaultTitle: 'Find Doctors',
      href: '#doctor',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      hoverClass: 'hover:bg-teal-50',
      activeColor: 'text-[#00B5A5]',
      iconClass: 'bg-teal-50 text-[#00B5A5] group-hover:bg-[#00B5A5] group-hover:text-white',
    },
    {
      titleKey: 'island.emergency.title',
      defaultTitle: 'Emergency',
      href: '#specialty/critical-care',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      hoverClass: 'hover:bg-red-50',
      activeColor: 'text-[#E11D48]',
      iconClass: 'bg-red-50 text-[#E11D48] group-hover:bg-[#E11D48] group-hover:text-white',
    },
    {
      titleKey: 'island.international.title',
      defaultTitle: 'International Patients',
      href: '#international',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      hoverClass: 'hover:bg-blue-50',
      activeColor: 'text-[#1E3A8A]',
      iconClass: 'bg-blue-50 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white',
    },
  ];

  return (
    <section className="relative z-20">
      <div className="container mx-auto px-4 relative -mt-10 animate-on-scroll fade-in-up">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-row overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-white/50">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`flex-1 py-3 md:py-6 flex items-center justify-center gap-1.5 md:gap-4 transition-all duration-300 group ${item.hoverClass} border-r border-gray-100/50 last:border-0`}
            >
              <div className={`p-1.5 md:p-2.5 rounded-lg md:xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.iconClass}`}>
                {React.cloneElement(item.icon as React.ReactElement, { className: 'w-4 h-4 md:w-6 md:h-6 transition-colors duration-300' })}
              </div>
              <EditableText
                as="span"
                configKey={item.titleKey}
                defaultValue={item.defaultTitle}
                className={`text-[#0E2A47] group-hover:${item.activeColor} text-[10px] md:text-xl font-bold tracking-tight transition-colors duration-300 whitespace-nowrap`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IslandBar;
