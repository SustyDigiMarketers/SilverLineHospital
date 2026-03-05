import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItemProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  index: number;
  activeIndex: number;
}

const NavItem: React.FC<NavItemProps> = ({ href, onClick, icon, label, isActive, index, activeIndex }) => {
  const activeColor = isActive ? "text-[#00B5A5]" : "text-gray-400";
  
  const content = (
    <div className="flex flex-col items-center justify-center w-full h-full relative group">
      <motion.div 
        initial={false}
        animate={{
          y: isActive ? -28 : 0,
          scale: isActive ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative z-20 transition-all duration-300 flex items-center justify-center h-10 w-10 mb-1 rounded-full ${isActive ? 'bg-white shadow-lg' : ''}`}
      >
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
            className: `w-6 h-6 ${activeColor} transition-colors duration-300` 
        })}
      </motion.div>
      
      <motion.span 
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0.6,
          y: isActive ? 0 : 4,
          scale: isActive ? 1 : 0.9
        }}
        className={`text-[10px] font-bold uppercase tracking-widest ${activeColor} text-center leading-none mt-1 z-20`}
      >
        {label}
      </motion.span>
    </div>
  );

  const classes = "relative h-full flex flex-col items-center justify-center focus:outline-none tap-highlight-transparent z-20";

  if (href) {
    return (
      <a href={href} onClick={(e) => { e.preventDefault(); window.location.hash = href; }} className={classes} aria-current={isActive ? 'page' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

interface MobileNavProps {
    activeSection: string;
    pageInfo: { page: string, param: string | null };
    onBookAppointmentClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeSection, pageInfo, onBookAppointmentClick }) => {
    const { page } = pageInfo;
    const isSpecialtyActive = activeSection === 'Specialties' || page === 'specialties' || page === 'specialty';
    const isPackagesActive = activeSection === 'Health Packages' || page === 'healthpackages';
    const isContactActive = activeSection === 'Contact' || page === 'contactus' || page === 'faq';

    const items = [
        { id: 'home', label: 'Home', href: '#home', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, active: page === 'home' },
        { id: 'services', label: 'Services', href: '#specialties', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l.477 2.387a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l2.387-.477a2 2 0 00.547-1.022zM9 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, active: isSpecialtyActive },
        { id: 'book', label: 'Book', onClick: onBookAppointmentClick, icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, active: false },
        { id: 'packs', label: 'Packs', href: '#healthpackages', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, active: isPackagesActive },
        { id: 'contact', label: 'Contact', href: '#contactus', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, active: isContactActive },
    ];

    const activeIndex = items.findIndex(item => item.active);

    // Dynamic SVG Curve path based on activeIndex
    const curvePath = useMemo(() => {
        if (activeIndex === -1) return "M0 15 L100 15 L100 100 L0 100 Z";
        const x = activeIndex * 20 + 10;
        return `M0 15 L${x - 12} 15 C${x - 8} 15 ${x - 7} 0 ${x} 0 C${x + 7} 0 ${x + 8} 15 ${x + 12} 15 L100 15 L100 100 L0 100 Z`;
    }, [activeIndex]);

    return (
        <nav 
            className="md:hidden fixed bottom-0 left-0 w-full z-[100] h-20 pb-[env(safe-area-inset-bottom)] pointer-events-none"
            role="navigation" 
        >
            <div className="absolute inset-0 pointer-events-auto">
                {/* SVG Curve Background */}
                <svg className="absolute top-0 w-full h-[120%] drop-shadow-[0_-5px_15px_rgba(0,0,0,0.08)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <motion.path 
                        animate={{ d: curvePath }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        fill="white"
                    />
                </svg>

                <div className="grid grid-cols-5 h-full w-full max-w-md mx-auto relative px-2">
                    {items.map((item, index) => (
                        <NavItem 
                            key={item.id}
                            {...item}
                            isActive={item.active}
                            index={index}
                            activeIndex={activeIndex}
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default MobileNav;
