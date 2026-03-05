import React from 'react';

interface NavItemProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, onClick, icon, label, isActive }) => {
  const activeColor = isActive ? "text-[#00B5A5]" : "text-gray-400";
  
  const content = (
    <div className="flex flex-col items-center justify-center w-full h-full relative group">
      {/* Floating Active Background / Bubble */}
      <div 
        className={`absolute -top-5 w-12 h-12 bg-white rounded-full shadow-[0_-5px_15px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] 
        ${isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8 pointer-events-none'}`}
      >
        <div className="w-10 h-10 rounded-full bg-[#00B5A5]/10 flex items-center justify-center">
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
                className: `w-5 h-5 text-[#00B5A5] transition-colors duration-300` 
            })}
        </div>
      </div>
      
      {/* Inactive Icon (Stays in the bar) */}
      <div 
        className={`relative transition-all duration-500 flex items-center justify-center h-6 w-6 mt-1 
        ${isActive ? 'opacity-0 translate-y-4 scale-50' : 'opacity-100 translate-y-0 scale-100 group-active:scale-95'}`}
      >
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
            className: `w-full h-full text-gray-400 transition-colors duration-300` 
        })}
      </div>
      
      {/* Label (Fades out when active to make room for the bubble) */}
      <span 
        className={`text-[9.5px] font-semibold mt-1 tracking-wide transition-all duration-500 text-gray-500 text-center leading-none 
        ${isActive ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        {label}
      </span>
      
      {/* Tiny active dot below the name (optional detail to match the image's clean look if needed, but the floating bubble is the main indicator) */}
      <div className={`absolute bottom-[-6px] w-1 h-1 bg-[#00B5A5] rounded-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 scale-0'}`}></div>
    </div>
  );

  const classes = "relative h-full flex flex-col items-center justify-center pt-1 focus:outline-none tap-highlight-transparent w-full";

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

    return (
        <nav 
            className="md:hidden fixed bottom-0 left-0 w-full z-[100] pb-[env(safe-area-inset-bottom)] bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-10px_40px_rgba(14,42,71,0.12)]"
            role="navigation" 
            aria-label="Mobile Navigation"
        >
            {/* Rigid 5-column grid for consistent 20% width per slot */}
            <div className="grid grid-cols-5 h-16 w-full max-w-md mx-auto relative">
                
                {/* 1. Home */}
                <NavItem 
                    href="#home" 
                    label="Home" 
                    icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                    isActive={page === 'home'} 
                />
                
                {/* 2. Services */}
                <NavItem 
                    href="#specialties" 
                    label="Services" 
                    icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l.477 2.387a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l2.387-.477a2 2 0 00.547-1.022zM9 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    isActive={isSpecialtyActive} 
                />

                {/* 3. Center Slot (Floating Action Button) */}
                <div className="flex justify-center items-center relative">
                    <div className="absolute -top-8 flex flex-col items-center">
                        <button 
                            onClick={onBookAppointmentClick}
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0E2A47] via-[#1d3f7f] to-[#0E2A47] text-white shadow-2xl shadow-blue-900/40 border-[4px] border-white flex flex-col items-center justify-center transform transition-all active:scale-90 hover:scale-105 active:shadow-inner rotate-45"
                            aria-label="Book Appointment"
                        >
                            <div className="-rotate-45 flex flex-col items-center">
                                <svg className="w-7 h-7 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span className="text-[8px] font-black uppercase tracking-tighter">Book</span>
                            </div>
                        </button>
                        {/* Glow effect */}
                        <div className="absolute top-0 w-16 h-16 bg-[#00B5A5]/20 blur-xl rounded-full -z-10 animate-pulse"></div>
                    </div>
                </div>

                {/* 4. Packages */}
                <NavItem 
                    href="#healthpackages" 
                    label="Packs" 
                    icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                    isActive={activeSection === 'Health Packages' || page === 'healthpackages'} 
                />
                
                {/* 5. Contact */}
                <NavItem 
                    href="#contactus" 
                    label="Contact" 
                    icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                    isActive={activeSection === 'Contact' || page === 'contactus' || page === 'faq'} 
                />
            </div>
        </nav>
    );
};

export default MobileNav;
