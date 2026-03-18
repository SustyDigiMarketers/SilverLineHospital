import React, { useState, useEffect, useMemo, createRef, useLayoutEffect, useCallback } from 'react';
import { specialtiesList } from '../lib/specialtiesData';
import EditableImage from './MasterSetup/EditableImage';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

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

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }> = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: mouseX, y: mouseY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <button onClick={onClick} className={className}>
        {children}
      </button>
    </motion.div>
  );
};

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

  const [blobStyle, setBlobStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (window.location.hash !== href) {
        window.location.hash = href;
    }
    setIsMobileMenuOpen(false);
  };
  
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  const updateBlobStyle = useCallback(() => {
    const targetIndex = focusedLinkIndex !== null
      ? focusedLinkIndex
      : navLinks.findIndex((link) => link.name === activeSection);

    if (targetIndex === -1) {
       setBlobStyle(currentStyle => ({ ...currentStyle, opacity: 0 }));
       return;
    }

    const targetLinkRef = navLinkRefs[targetIndex]?.current;
    if (targetLinkRef) {
      setBlobStyle({
        width: `${targetLinkRef.offsetWidth}px`,
        left: `${targetLinkRef.offsetLeft}px`,
        opacity: 1,
      });
    }
  }, [activeSection, navLinkRefs, focusedLinkIndex, navLinks]);


  useLayoutEffect(() => {
    updateBlobStyle();
  }, [activeSection, focusedLinkIndex, updateBlobStyle]);


  useEffect(() => {
    let ticking = false;
    const handleResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateBlobStyle();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('resize', handleResize);
    document.fonts.ready.then(updateBlobStyle);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateBlobStyle]);


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

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <>
      <header 
        className={`sticky md:fixed top-0 left-0 w-full z-50 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'md:py-4 py-0' : 'py-0'} ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div 
          className={`container mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'md:max-w-6xl md:px-4 max-w-full px-0' 
              : 'max-w-full px-0'
          }`}
        >
          <motion.nav
            layout
            className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled
                ? 'bg-white md:bg-white/60 md:backdrop-blur-3xl md:rounded-[2rem] border-b md:border-none border-gray-100 px-8 py-3 lg:py-4 flex items-center justify-between shadow-2xl shadow-black/5'
                : 'bg-white w-full border-b border-gray-100 px-6 sm:px-10 lg:px-20 py-5'
            }`}
          >
            {/* Animated Border for Scrolled Mode */}
            {isScrolled && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 md:rounded-[2rem] p-[1px] -z-10 bg-gradient-to-r from-[#27afaf]/40 via-[#1d3f7f]/40 to-[#27afaf]/40 animate-gradient-x hidden md:block"
                style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}
              />
            )}

            {/* DEFAULT STATE LAYOUT (Logo Left, Stacked Actions/Links Right) */}
            {!isScrolled ? (
              <div className="hidden md:flex items-center justify-center w-full gap-x-10 lg:gap-x-16">
                {/* LEFT: Logo */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-shrink-0 pr-0">
                  <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex-shrink-0 transition-transform duration-300 hover:scale-105 block">
                    <EditableImage 
                        configKey="imagePaths.logos.main" 
                        alt="Logo" 
                        className="h-32 lg:h-40 w-auto object-contain"
                    />
                  </a>
                </motion.div>

                {/* RIGHT: Stacked Container */}
                <div className="flex flex-col flex-grow max-w-3xl">
                  {/* TOP: Actions */}
                  <div className="flex items-center justify-between w-full mb-4">
                    {['Find Doctor', 'Emergency', 'Book Appointment', 'Patient Portal'].map((label, i) => {
                      const sectionId = label === 'Find Doctor' ? 'doctor' : label.toLowerCase().replace(' ', '');
                      const isActive = activeSection.toLowerCase() === sectionId;
                      return (
                        <motion.div key={label} custom={i} variants={menuVariants} initial="hidden" animate="visible">
                          <MagneticButton 
                            onClick={(e) => {
                              if (label === 'Book Appointment') onBookAppointmentClick();
                              else if (label === 'Patient Portal') onPatientPortalClick();
                              else handleNavClick(e as any, `#${sectionId}`);
                            }}
                            className={`px-6 py-2.5 rounded-full font-black text-[12px] lg:text-sm transition-all duration-300 ${
                              isActive 
                                ? 'bg-[#1d3f7f] text-white scale-105' 
                                : 'bg-[#27afaf] text-white hover:bg-[#1d3f7f]'
                            }`}
                          >
                            {label}
                          </MagneticButton>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* MIDDLE: Divider */}
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="flex justify-center w-full mb-4 origin-center">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-gray-200" />
                  </motion.div>

                  {/* BOTTOM: Navigation Links */}
                  <div className="relative flex items-center justify-between w-full" onKeyDown={handleNavKeyDown}>

                    
                    {navLinks.map((link, index) => {
                      const isActive = (focusedLinkIndex !== null && focusedLinkIndex === index) || (focusedLinkIndex === null && activeSection === link.name);
                      return (
                          <motion.a
                            key={link.name}
                            custom={index}
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            href={link.href}
                            ref={navLinkRefs[index]}
                            onClick={(e) => handleNavClick(e, link.href)}
                            onFocus={() => setFocusedLinkIndex(index)}
                            onBlur={() => setFocusedLinkIndex(null)}
                            className={`relative z-10 font-bold transition-all duration-500 rounded-xl focus:outline-none tracking-tight flex items-center justify-center ${
                              isActive
                              ? 'text-[#27afaf]'
                              : 'text-[#0E2A47]/80 hover:text-[#27afaf]'
                            } text-[14px] lg:text-[16px] px-6 py-2.5 group`}
                          >
                            <span className="relative">
                              {link.name}
                              {isActive && (
                                <motion.span 
                                  layoutId="activeTextGlow"
                                  className="absolute inset-0 blur-md bg-[#27afaf]/20 -z-10 rounded-full"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                />
                              )}
                            </span>
                              {isActive && (
                                <div className="absolute -bottom-2.5 inset-x-0 flex justify-center h-[3px]">
                                   <div className="relative w-full flex justify-center">
                                      <motion.div
                                        layoutId="activeUnderline"
                                        className="h-full rounded-full bg-gradient-to-r from-transparent via-[#27afaf] to-transparent"
                                        style={{ width: '90%' }}
                                      >
                                        <motion.div 
                                          className="absolute inset-0 bg-white/40 blur-[1px]"
                                          animate={{ x: ['-100%', '100%'] }}
                                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                        />
                                      </motion.div>
                                      <motion.div 
                                        layoutId="activeUnderlineGlow"
                                        className="absolute -inset-2 bg-[#27afaf]/20 blur-md rounded-full -z-10" 
                                      />
                                   </div>
                                </div>
                              )}
                            </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* SCROLLED STATE LAYOUT (Pill Body) */
              <div className="hidden md:flex items-center justify-between w-full">
                {/* Logo in Scrolled Mode */}
                <AnimatePresence>
                  <motion.a 
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')} 
                    className="flex-shrink-0 transition-transform duration-300 hover:scale-105 mr-8"
                  >
                    <EditableImage 
                        configKey="imagePaths.logos.main" 
                        alt="Logo" 
                        className="h-16 lg:h-20 w-auto object-contain"
                    />
                  </motion.a>
                </AnimatePresence>

                {/* Navigation Links — Scrolled Mode */}
                <div className="relative hidden md:flex items-center justify-end flex-grow gap-x-2 lg:gap-x-1" onKeyDown={handleNavKeyDown}>

                  
                  {navLinks.map((link, index) => {
                    const isActive = (focusedLinkIndex !== null && focusedLinkIndex === index) || (focusedLinkIndex === null && activeSection === link.name);
                    return (
                        <motion.a
                          key={link.name}
                          custom={index}
                          variants={menuVariants}
                          initial="hidden"
                          animate="visible"
                          href={link.href}
                          ref={navLinkRefs[index]}
                          onClick={(e) => handleNavClick(e, link.href)}
                          onFocus={() => setFocusedLinkIndex(index)}
                          onBlur={() => setFocusedLinkIndex(null)}
                          className={`relative z-10 font-bold transition-all duration-500 rounded-full focus:outline-none tracking-tight flex items-center justify-center ${
                            isActive
                            ? 'text-[#27afaf]'
                            : 'text-[#0E2A47]/80 hover:text-[#27afaf]'
                          } text-[14px] lg:text-[15px] px-5 py-2 group`}
                        >
                          <span className="relative">
                            {link.name}
                            {isActive && (
                                <motion.span 
                                  layoutId="activeTextGlowScroll"
                                  className="absolute inset-0 blur-md bg-[#27afaf]/20 -z-10 rounded-full"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                />
                              )}
                          </span>
                          {isActive && (
                              <div className="absolute -bottom-2 inset-x-0 flex justify-center h-[3px]">
                                <div className="relative w-full flex justify-center">
                                  <motion.div
                                    layoutId="activeUnderline"
                                    className="h-full rounded-full bg-gradient-to-r from-transparent via-[#27afaf] to-transparent"
                                    style={{ width: '90%' }}
                                  />
                                  <motion.div 
                                    layoutId="activeUnderlineGlow"
                                    className="absolute -inset-2 bg-[#27afaf]/20 blur-md rounded-full -z-10" 
                                  />
                                </div>
                              </div>
                            )}
                          </motion.a>
                    );
                  })}
                </div>

                {/* Quick Actions in Scrolled Mode */}
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="hidden md:flex items-center space-x-3 ml-8"
                  >
                    <MagneticButton 
                      onClick={onBookAppointmentClick}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#27afaf] to-[#1d3f7f] text-white font-black text-sm lg:text-base transition-all"
                    >
                      Appointment
                    </MagneticButton>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Mobile View Toggle */}
            <div className={`md:hidden flex items-center justify-between w-full`}>
                <motion.a 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="transition-transform duration-300 active:scale-95"
                >
                  <EditableImage 
                     configKey="imagePaths.logos.main" 
                     alt="Logo" 
                     className="h-16 w-auto object-contain" 
                  />
                </motion.a>
               <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-3 text-[#27afaf] rounded-2xl bg-white border border-gray-100 transition-all active:scale-90"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></motion.svg>
                    ) : (
                      <motion.svg key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></motion.svg>
                    )}
                  </AnimatePresence>
                </button>
            </div>
          </motion.nav>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-100 origin-top overflow-hidden"
                style={{ borderRadius: '0 0 2.5rem 2.5rem' }}
            >
                <div className="flex flex-col p-8 space-y-6">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`text-xl font-black transition-all ${
                                activeSection === link.name ? 'text-[#27afaf]' : 'text-[#0E2A47]'
                            }`}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                      <button onClick={onBookAppointmentClick} className="px-5 py-4 bg-gradient-to-r from-[#27afaf] to-[#1d3f7f] text-white rounded-2xl font-black text-sm active:scale-95 transition-transform">Appointment</button>
                      <button onClick={onPatientPortalClick} className="px-5 py-4 bg-[#0E2A47] text-white rounded-2xl font-black text-sm active:scale-95 transition-transform">Portal</button>
                    </motion.div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
