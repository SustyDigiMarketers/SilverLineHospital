import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItemProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  index: number;
}

const NavItem: React.FC<NavItemProps> = ({ href, onClick, icon, label, isActive, index }) => {
  return (
    <motion.button
      onClick={onClick || (href ? (e) => { e.preventDefault(); window.location.hash = href; } : undefined)}
      className="relative flex flex-col items-center justify-center w-full h-full focus:outline-none tap-highlight-transparent z-10"
      whileTap={{ scale: 0.9 }}
    >
      <motion.div 
        className={`relative z-10 mb-1 transition-colors duration-300 ${isActive ? 'text-[#00B5A5]' : 'text-gray-400'}`}
        animate={{ 
          y: isActive ? -4 : 0,
          scale: isActive ? 1.2 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
            className: "w-6 h-6" 
        })}
      </motion.div>
      
      <motion.span 
        className={`text-[8px] font-bold uppercase tracking-wider ${isActive ? 'text-[#00B5A5]' : 'text-gray-500'}`}
        animate={{ 
          opacity: isActive ? 1 : 0.6,
          scale: isActive ? 1.1 : 1
        }}
      >
        {label}
      </motion.span>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-x-1 inset-y-1 bg-[#00B5A5]/10 rounded-xl -z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
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

    const navItems = [
        { id: 'home', label: 'Home', href: '#home', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, active: page === 'home' },
        { id: 'services', label: 'Services', href: '#specialties', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l.477 2.387a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l2.387-.477a2 2 0 00.547-1.022zM9 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, active: isSpecialtyActive },
        { id: 'book', label: 'Book', isCenter: true },
        { id: 'packs', label: 'Packs', href: '#healthpackages', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, active: activeSection === 'Health Packages' || page === 'healthpackages' },
        { id: 'contact', label: 'Contact', href: '#contactus', icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, active: activeSection === 'Contact' || page === 'contactus' || page === 'faq' },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-[100] px-4">
            <nav 
                className="bg-white/80 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_15px_50px_rgba(14,42,71,0.2)] h-20 px-2 flex items-center justify-between relative overflow-visible"
                role="navigation" 
                aria-label="Mobile Navigation"
            >
                {navItems.map((item, index) => (
                    item.isCenter ? (
                        <div key={item.id} className="relative w-1/5 flex justify-center h-full items-center">
                            <motion.button 
                                onClick={onBookAppointmentClick}
                                className="absolute -top-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0E2A47] via-[#1d3f7f] to-[#0E2A47] text-white shadow-2xl border-[4px] border-white flex flex-col items-center justify-center transform rotate-45 focus:outline-none"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9, rotate: '40deg' }}
                            >
                                <div className="-rotate-45 flex flex-col items-center">
                                    <svg className="w-7 h-7 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <span className="text-[8px] font-black uppercase tracking-tighter">Book</span>
                                </div>
                                <motion.div 
                                    className="absolute inset-0 bg-white/20 rounded-2xl"
                                    animate={{ opacity: [0, 0.4, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.button>
                        </div>
                    ) : (
                        <div key={item.id} className="w-1/5 h-full">
                            <NavItem 
                                href={item.href} 
                                label={item.label} 
                                icon={item.icon}
                                isActive={!!item.active} 
                                index={index}
                            />
                        </div>
                    )
                ))}
            </nav>
        </div>
    );
};

export default MobileNav;
