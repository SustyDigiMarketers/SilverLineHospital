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
  const [currentPath, setCurrentPath] = useState(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    setMounted(true);
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const isHomePage = currentPath === '/' || currentPath === '' || currentPath === '/home';

  const matchesCurrentRoute = useCallback((link: { name: string; href: string }) => {
    if (link.name === 'Home' || link.href === '/') {
      return isHomePage;
    }

    if (isHomePage) return false;

    const path = currentPath.toLowerCase().replace(/\/+$/, '');
    const href = link.href.toLowerCase().replace(/\/+$/, '');

    // Check activeSection if not on home
    if (activeSection && activeSection.toLowerCase() === link.name.toLowerCase()) {
      return true;
    }

    // Exact match
    if (path && (path === href || path === `/${link.name.toLowerCase()}`)) {
      return true;
    }

    // Route alias mappings
    if (link.name === 'About' && (path === '/about' || path === '/aboutus')) return true;
    if (link.name === 'Specialties' && (path === '/specialties' || path === '/specialities' || path.startsWith('/specialty/'))) return true;
    if (link.name === 'Media & Events' && (path === '/media-events' || path === '/events' || path.startsWith('/media-events/'))) return true;
    if (link.name === 'Blogs' && (path === '/blog' || path === '/blogs' || path.startsWith('/blog/'))) return true;
    if (link.name === 'Packages' && (path === '/healthpackages' || path === '/packages')) return true;
    if (link.name === 'Contact' && (path === '/contact' || path === '/contactus')) return true;
    if (link.name === 'Career' && (path === '/career' || path === '/careers')) return true;

    return false;
  }, [isHomePage, currentPath, activeSection]);

  const navLinkRefs = useMemo(
    () => Array(navLinks.length).fill(0).map(() => createRef<HTMLAnchorElement>()),
    [navLinks]
  );

  const [blobStyle, setBlobStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (href.startsWith('/')) {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
        setCurrentPath(href);
    } else if (window.location.hash !== href) {
        window.location.hash = href;
    }
    setIsMobileMenuOpen(false);
  };
  
  // Body scroll lock & Escape key listener for Mobile Drawer
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

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
      : navLinks.findIndex((link) => matchesCurrentRoute(link));

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
  }, [focusedLinkIndex, navLinks, matchesCurrentRoute, navLinkRefs]);

  useLayoutEffect(() => {
    updateBlobStyle();
  }, [updateBlobStyle]);


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
        className={`sticky md:fixed top-0 left-0 w-full z-50 transition-all duration-00 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'md:py-4 py-0' : 'py-0'} ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        {/* News Ticker Bar - Persists on mobile, hides on desktop scrolled (pills view) */}
        <div className={`w-full bg-[#0E2A47] text-white py-1.5 overflow-hidden transition-all duration-500 border-b border-white/5 ${isScrolled ? 'md:h-0 md:opacity-0 md:pointer-events-none' : 'h-auto opacity-100'}`}>
           <div className="flex whitespace-nowrap animate-marquee">
              <div className="flex px-4 md:px-0">
                  <span className="px-10 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#27afaf] rounded-full mr-3 animate-pulse"></span>
                    Advanced Robotic Surgery Now Available
                  </span>
                  <span className="px-10 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#27afaf] rounded-full mr-3 animate-pulse"></span>
                    24/7 Emergency & Critical Care Services
                  </span>
                  <span className="px-10 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#27afaf] rounded-full mr-3 animate-pulse"></span>
                    Special Health Checkup Packages
                  </span>
                  {/* Duplicate for seamless marquee effect */}
                  <span className="px-10 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#27afaf] rounded-full mr-3 animate-pulse"></span>
                    Advanced Robotic Surgery Now Available
                  </span>
                  <span className="px-10 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#27afaf] rounded-full mr-3 animate-pulse"></span>
                    24/7 Emergency & Critical Care Services
                  </span>
                  <span className="px-10 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#27afaf] rounded-full mr-3 animate-pulse"></span>
                    Special Health Checkup Packages for Women
                  </span>
                  <span className="px-10 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#27afaf] rounded-full mr-3 animate-pulse"></span>
                    Special Health Checkup Packages for Women
                  </span>
              </div>
           </div>
        </div>

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
              <div className="hidden md:flex items-center justify-between w-full gap-x-4 lg:gap-x-8 xl:gap-x-12">
                {/* LEFT: Logo */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-shrink-0 pr-0">
                  <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex-shrink-0 transition-transform duration-300 hover:scale-105 block">
                    <EditableImage 
                        configKey="imagePaths.logos.main" 
                        alt="Logo" 
                        className="h-16 md:h-20 lg:h-28 xl:h-32 w-auto object-contain"
                    />
                  </a>
                </motion.div>

                {/* RIGHT: Stacked Container */}
                <div className="flex flex-col flex-grow max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full min-w-0">
                  {/* TOP: Actions */}
                  <div className="flex items-center justify-evenly w-full mb-2 md:mb-3 lg:mb-4 px-1 md:px-2 lg:px-6">
                    {['Find Doctor', 'Emergency', 'Book Appointment', 'Patient Portal'].map((label, i) => {
                      const sectionId = label === 'Find Doctor' ? 'doctor' : label.toLowerCase().replace(' ', '');
                      const isActive = !isHomePage && (activeSection.toLowerCase() === sectionId || currentPath.toLowerCase().replace(/\/+$/, '') === `/${sectionId}`);
                      return (
                        <motion.div key={label} custom={i} variants={menuVariants} initial="hidden" animate="visible" className="flex-shrink-0">
                          <MagneticButton
                            onClick={(e) => {
                              if (label === 'Book Appointment') onBookAppointmentClick();
                              else if (label === 'Patient Portal') onPatientPortalClick();
                              else handleNavClick(e as any, `/${sectionId}`);
                            }}
                            className={`px-2.5 py-1.5 md:px-3.5 md:py-1.5 lg:px-6 lg:py-2.5 xl:px-7 xl:py-3 rounded-full font-extrabold text-[11px] md:text-xs lg:text-sm xl:text-base whitespace-nowrap transition-all duration-300 ${
                              isActive 
                                ? 'bg-[#1d3f7f] text-white scale-105 shadow-md' 
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
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="flex justify-center w-full mb-2 md:mb-3 lg:mb-4 origin-center">
                    <div className="w-full h-[1px] bg-gray-200/80" />
                  </motion.div>

                  {/* BOTTOM: Navigation Links */}
                  <div className="relative flex items-center justify-evenly w-full px-1 md:px-2 lg:px-6 py-1" onKeyDown={handleNavKeyDown}>
                    {navLinks.map((link, index) => {
                      const isActive = (focusedLinkIndex !== null && focusedLinkIndex === index) || (focusedLinkIndex === null && matchesCurrentRoute(link));
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
                            className={`relative z-10 font-bold transition-all duration-300 rounded-xl focus:outline-none tracking-tight flex-shrink-0 flex items-center justify-center ${
                              isActive
                              ? 'text-[#27afaf]'
                              : 'text-[#0E2A47] hover:text-[#27afaf]'
                            } text-[11px] md:text-xs lg:text-base xl:text-lg 2xl:text-xl px-1.5 md:px-2 lg:px-3 py-1 md:py-1.5 whitespace-nowrap group`}
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
                                <div className="absolute -bottom-1 inset-x-0 flex justify-center h-[3px]">
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
                                        className="absolute inset-0 bg-[#27afaf]/20 blur-sm rounded-full -z-10" 
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
              <div className="hidden md:flex items-center justify-between w-full min-w-0">
                {/* Logo in Scrolled Mode */}
                <AnimatePresence>
                  <motion.a 
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                    href="/" 
                    onClick={(e) => handleNavClick(e, '/')} 
                    className="flex-shrink-0 transition-transform duration-300 hover:scale-105 mr-2 lg:mr-6"
                  >
                    <EditableImage 
                        configKey="imagePaths.logos.main" 
                        alt="Logo" 
                        className="h-10 md:h-11 lg:h-14 w-auto object-contain"
                    />
                  </motion.a>
                </AnimatePresence>

                {/* Navigation Links — Scrolled Mode */}
                <div className="relative flex items-center justify-center flex-grow mx-1 md:mx-2 gap-x-0.5 md:gap-x-1 lg:gap-x-2 xl:gap-x-2.5 min-w-0" onKeyDown={handleNavKeyDown}>
                  {navLinks.map((link, index) => {
                    const isActive = (focusedLinkIndex !== null && focusedLinkIndex === index) || (focusedLinkIndex === null && matchesCurrentRoute(link));
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
                          className={`relative z-10 font-bold transition-all duration-500 rounded-full focus:outline-none tracking-tight flex-shrink-0 flex items-center justify-center ${
                            isActive
                            ? 'text-[#27afaf]'
                            : 'text-[#0E2A47]/80 hover:text-[#27afaf]'
                          } text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px] px-1 md:px-1.5 lg:px-2.5 xl:px-3 py-1.5 whitespace-nowrap group`}
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
                              <div className="absolute bottom-0 inset-x-0 flex justify-center h-[3px]">
                                <div className="relative w-full flex justify-center">
                                  <motion.div
                                    layoutId="activeUnderline"
                                    className="h-full rounded-full bg-gradient-to-r from-transparent via-[#27afaf] to-transparent"
                                    style={{ width: '90%' }}
                                  />
                                  <motion.div 
                                    layoutId="activeUnderlineGlow"
                                    className="absolute inset-0 bg-[#27afaf]/20 blur-sm rounded-full -z-10" 
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
                    className="flex-shrink-0 flex items-center space-x-2 ml-1 lg:ml-4"
                  >
                    <MagneticButton 
                      onClick={onBookAppointmentClick}
                      className="px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-full bg-gradient-to-r from-[#27afaf] to-[#1d3f7f] text-white font-black text-[11px] md:text-[12px] lg:text-sm whitespace-nowrap transition-all"
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
                  href="/" 
                  onClick={(e) => handleNavClick(e, '/')}
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
                    {navLinks.map((link, index) => {
                        const isActive = matchesCurrentRoute(link);
                        return (
                            <motion.a
                                key={link.name}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-xl font-black transition-all ${
                                    isActive ? 'text-[#27afaf]' : 'text-[#0E2A47]'
                                }`}
                            >
                                {link.name}
                            </motion.a>
                        );
                    })}
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
