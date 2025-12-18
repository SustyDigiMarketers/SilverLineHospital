import React, { useState, useEffect, useMemo, createRef, useLayoutEffect, useCallback, useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import { specialtiesList } from '../lib/specialtiesData';
import EditableImage from './MasterSetup/EditableImage';

export interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  activeSection: string;
  onBookAppointmentClick: () => void;
  onPatientPortalClick: () => void;
  navLinks: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onBookAppointmentClick, onPatientPortalClick, navLinks }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusedLinkIndex, setFocusedLinkIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinkRefs = useMemo(
    () => Array(navLinks.length).fill(0).map(() => createRef<HTMLAnchorElement>()),
    [navLinks]
  );

  const [lineStyle, setLineStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (window.location.hash !== href) {
        window.location.hash = href;
    }
    setIsMobileMenuOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const updateLineStyle = useCallback(() => {
    const targetIndex = focusedLinkIndex !== null
      ? focusedLinkIndex
      : navLinks.findIndex((link) => link.name === activeSection);

    if (targetIndex === -1) {
       setLineStyle(currentLineStyle => ({ ...currentLineStyle, opacity: 0 }));
       return;
    }

    const targetLinkRef = navLinkRefs[targetIndex]?.current;
    if (targetLinkRef) {
      const linkWidth = targetLinkRef.offsetWidth;
      const lineWidth = linkWidth * 0.6;
      const lineOffset = targetLinkRef.offsetLeft + (linkWidth - lineWidth) / 2;

      setLineStyle({
        width: `${lineWidth}px`,
        transform: `translateX(${lineOffset}px)`,
        opacity: 1,
      });
    }
  }, [activeSection, navLinkRefs, focusedLinkIndex, navLinks]);


  useLayoutEffect(() => {
    updateLineStyle();
  }, [activeSection, focusedLinkIndex, updateLineStyle]);


  useEffect(() => {
    window.addEventListener('resize', updateLineStyle);
    document.fonts.ready.then(updateLineStyle);
    return () => {
      window.removeEventListener('resize', updateLineStyle);
    };
  }, [updateLineStyle]);

  const handleNavKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const currentIndex = focusedLinkIndex ?? navLinks.findIndex(link => link.name === activeSection);
    let nextIndex;
    if (event.key === 'ArrowRight') {
      nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % navLinks.length;
    } else {
      nextIndex = currentIndex === -1 ? navLinks.length - 1 : (currentIndex - 1 + navLinks.length) % navLinks.length;
    }
    navLinkRefs[nextIndex]?.current?.focus();
  };


  return (
    <>
      <header 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(255,255,255,0.95)' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isScrolled ? 'py-2' : 'py-0'} ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <nav
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          className={`relative flex items-center justify-between backdrop-blur-md bg-white/90 mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 sm:px-6 ${
            isScrolled
              ? 'max-w-7xl rounded-full shadow-lg py-2 border border-gray-100/50'
              : 'w-full shadow-sm py-3 border-b border-transparent'
          }`}
        >
          {/* Logo */}
          <div className="relative group">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-105 z-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] block">
              <EditableImage 
                  configKey="imagePaths.logos.main" 
                  alt="Logo" 
                  className={`w-auto max-w-[180px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
                  style={{ maxHeight: isScrolled ? '48px' : '64px', objectFit: 'contain' }}
              />
            </a>
            <span className="absolute -top-1 -right-4 bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded text-[#0E2A47] uppercase tracking-wider transform rotate-12 shadow-sm pointer-events-none animate-bounce">Beta</span>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center justify-end flex-wrap gap-y-2 gap-x-2 md:gap-x-6">
              {/* Navigation Links */}
              <div
                className="relative flex items-center"
                onKeyDown={handleNavKeyDown}
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#00B5A5] rounded-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={lineStyle}
                />
                {navLinks.map((link, index) => {
                   const isActive = (focusedLinkIndex !== null && focusedLinkIndex === index) || (focusedLinkIndex === null && activeSection === link.name);
                   return (
                      <a
                        key={link.name}
                        href={link.href}
                        ref={navLinkRefs[index]}
                        onClick={(e) => handleNavClick(e, link.href)}
                        onFocus={() => setFocusedLinkIndex(index)}
                        onBlur={() => setFocusedLinkIndex(null)}
                        className={`relative font-medium text-sm lg:text-base transition-all duration-300 whitespace-nowrap px-3 py-2 rounded-md focus:outline-none transform hover:-translate-y-0.5 ${
                           isActive
                           ? 'text-[#00B5A5]'
                           : 'text-gray-600 hover:text-[#00B5A5]'
                        }`}
                      >
                        {link.name}
                      </a>
                   );
                })}
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={(e) => { e.preventDefault(); onPatientPortalClick(); }}
                  className={`font-medium text-white bg-[#00B5A5] rounded-full transition-all duration-500 ease-out hover:bg-[#0E2A47] hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] ${isScrolled ? 'px-4 py-2 text-xs md:text-sm' : 'px-5 py-2.5 text-sm'}`}
                >
                  Patient Portal
                </button>
                <button
                    onClick={onBookAppointmentClick}
                    className={`font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-500 ease-out hover:bg-[#00B5A5] hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] ${isScrolled ? 'px-4 py-2 text-xs md:text-sm' : 'px-5 py-2.5 text-sm'}`}
                >
                    Appointment
                </button>
              </div>
          </div>
          
          {/* Mobile Buttons & Menu Toggle */}
          <div className="md:hidden flex items-center z-50 space-x-2">
             <button
                onClick={(e) => { e.preventDefault(); onPatientPortalClick(); }}
                className="px-3 py-1.5 text-xs font-medium text-white bg-[#00B5A5] rounded-full transition-all duration-300 ease-out hover:bg-[#0E2A47] whitespace-nowrap transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
              >
                Portal
              </button>
              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5A5]"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 transform rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div 
            className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                isMobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
            }`}
        >
            <div className="flex flex-col py-2">
                {navLinks.map((link, index) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        style={{ transitionDelay: `${index * 50}ms` }}
                        className={`px-6 py-4 text-sm font-semibold border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-200 ${
                            activeSection === link.name ? 'text-[#00B5A5]' : 'text-gray-700'
                        } ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} transition-all duration-300`}
                    >
                        {link.name}
                    </a>
                ))}
                <div className={`p-4 bg-gray-50 transition-all duration-500 delay-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <button
                        onClick={() => { setIsMobileMenuOpen(false); onBookAppointmentClick(); }}
                        className="w-full py-3 text-center text-sm font-bold text-white bg-[#0E2A47] rounded-lg shadow-md active:scale-95 transition-transform"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;