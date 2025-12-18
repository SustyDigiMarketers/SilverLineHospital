import React, { useState, useEffect, useRef, useMemo } from 'react';
import Navbar, { NavLink } from './components/Navbar';
import About from './components/About';
import Doctors from './components/Doctors';
import HealthPackages from './components/HealthPackages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EmergencyCare from './components/EmergencyCare';
import PatientPortal from './components/PatientPortal';
import AppointmentModal from './components/AppointmentModal';
import MasterSetupPanel from './components/MasterSetup/MasterSetupPanel';
import AdminLogin from './pages/AdminLogin';
import MasterDashboard from './pages/MasterDashboard';
import { useKonamiCode } from './hooks/useKonamiCode';
import BackToTopButton from './components/BackToTopButton';
import SpecialtiesPage from './pages/SpecialtiesPage';
import SpecialtyDetail from './components/SpecialtyDetail';
import PatientLoginModal from './components/PatientLoginModal';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import DoctorBioPage from './pages/DoctorBioPage';
import CareerPage from './pages/CareerPage';
import MarketingPage from './pages/MarketingPage';
import InternationalPatientPage from './pages/InternationalPatientPage';
import GalleryPage from './pages/GalleryPage';
import TimedPopup from './components/TimedPopup';
import HomePage from './pages/HomePage';
import MobileNav from './components/MobileNav';
import { trackPageView } from './lib/analyticsService'; // Import tracking


const getPageInfoFromHash = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const parts = hash.split('/');
  return {
    page: parts[0] || 'home',
    param: parts[1] || null,
  };
};

const fullNavLinks: NavLink[] = [
  { name: 'About', href: '#aboutus' },
  { name: 'Specialties', href: '#specialties' },
  { name: 'Blogs', href: '#blog' },
  { name: 'Health Packages', href: '#healthpackages' },
  { name: 'Contact', href: '#contactus' },
];

const adminNavLinks: NavLink[] = [
  { name: 'About', href: '#aboutus' },
  { name: "Specialties", href: "#specialties" },
  { name: 'Blogs', href: '#blog' },
  { name: 'Contact', href: '#contactus' },
];


const App: React.FC = () => {
  const [pageInfo, setPageInfo] = useState(getPageInfoFromHash());
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isPatientLoginModalOpen, setIsPatientLoginModalOpen] = useState(false);
  const [loggedInPatientId, setLoggedInPatientId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);
  const scrollObserver = useRef<IntersectionObserver | null>(null);

  const openAppointmentModal = () => setIsAppointmentModalOpen(true);
  const closeAppointmentModal = () => setIsAppointmentModalOpen(false);
  
  const openPatientLoginModal = () => setIsPatientLoginModalOpen(true);
  const closePatientLoginModal = () => setIsPatientLoginModalOpen(false);

  const handlePatientLogin = (patientId: string) => {
    // In a real app, this would involve an API call to validate the ID.
    // For now, we'll just accept it and store it.
    sessionStorage.setItem('patientId', patientId);
    setLoggedInPatientId(patientId);
    closePatientLoginModal();
    window.location.hash = '#patientportal';
  };

  const handlePatientPortalClick = () => {
    openPatientLoginModal();
  };

  useKonamiCode(() => {
    window.location.hash = '#admin';
  });

  useEffect(() => {
    const storedPatientId = sessionStorage.getItem('patientId');
    if (storedPatientId) {
      setLoggedInPatientId(storedPatientId);
    }
    
    // Add class to body to signal JS is ready, enabling scroll animations
    document.body.classList.add('js-initialized');
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const info = getPageInfoFromHash();
      setPageInfo(info);
      window.scrollTo(0, 0);
      
      // Track the page view in Supabase
      trackPageView(info.page);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Also run on initial load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Scroll Spy Observer
    const sections = document.querySelectorAll('section[id]');
    
    observer.current?.disconnect();
    
    const linkNameMap: { [key: string]: string } = {
        'home': '', 
        'aboutus': 'About',
        'healthpackages': 'Health Packages',
        'contactus': 'Contact',
    };

    observer.current = new IntersectionObserver(
      (entries) => {
        // Only apply scroll-spy behavior on the homepage
        if (getPageInfoFromHash().page !== 'home') return;
        
        let bestVisible: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
            if (entry.isIntersecting) {
                if (!bestVisible || entry.intersectionRatio > bestVisible.intersectionRatio) {
                    bestVisible = entry;
                }
            }
        }
        if (bestVisible) {
            const id = bestVisible.target.getAttribute('id');
            const navName = linkNameMap[id || ''];
            if (navName !== undefined) {
                setActiveSection(navName);
            }
        }
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    // Visibility Animation Observer
    scrollObserver.current?.disconnect();
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    scrollObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            scrollObserver.current?.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
      scrollObserver.current?.observe(el);
    });
    
    // Manually set active section for full pages
    const pageToSectionMap: { [key: string]: string } = {
        'blog': 'Blogs',
        'post': 'Blogs',
        'specialties': 'Specialties',
        'specialty': 'Specialties',
    };
    const newActiveSection = pageToSectionMap[pageInfo.page];
    if (newActiveSection) {
        setActiveSection(newActiveSection);
    } else if (pageInfo.page !== 'home') {
        setActiveSection('');
    }


    return () => {
      observer.current?.disconnect();
      scrollObserver.current?.disconnect();
    };
  }, [pageInfo.page]); // Re-run when page changes to catch new DOM elements
  
  const renderPage = () => {
    switch (pageInfo.page) {
      case 'home':
        return <HomePage onBookAppointmentClick={openAppointmentModal} />;
      case 'aboutus':
        return <About />;
      case 'specialties':
        return <SpecialtiesPage />;
      case 'specialty':
        return pageInfo.param ? <SpecialtyDetail specialtyId={pageInfo.param} onBookAppointmentClick={openAppointmentModal} /> : <SpecialtiesPage />;
      case 'blog':
        return <BlogPage />;
      case 'post':
        return pageInfo.param ? <PostDetailPage postId={pageInfo.param} /> : <BlogPage />;
      case 'doctor':
         return <Doctors />;
      case 'doctor-bio':
        return pageInfo.param ? <DoctorBioPage doctorId={pageInfo.param} onBookAppointmentClick={openAppointmentModal} /> : <Doctors />;
      case 'healthpackages':
        return <HealthPackages />;
      case 'contactus':
      case 'faq':
        return <Contact />;
      case 'admin':
        return <AdminLogin />;
      case 'master-dashboard':
        return <MasterDashboard />;
      case 'emergency':
        return <EmergencyCare />;
      case 'patientportal':
        return <PatientPortal patientId={loggedInPatientId} onLoginClick={openPatientLoginModal} />;
      case 'career':
        return <CareerPage />;
      case 'marketing':
        return <MarketingPage />;
      case 'international':
        return <InternationalPatientPage />;
      case 'gallery':
        return <GalleryPage />;
      default:
        return <HomePage onBookAppointmentClick={openAppointmentModal} />;
    }
  };

  const isDashboardPage = pageInfo.page === 'master-dashboard' || pageInfo.page === 'admin';

  return (
    <div className="bg-white text-gray-800">
      {!isDashboardPage && (
          <Navbar
            navLinks={fullNavLinks}
            activeSection={activeSection}
            onBookAppointmentClick={openAppointmentModal}
            onPatientPortalClick={handlePatientPortalClick}
          />
      )}
      <main className={!isDashboardPage ? "animate-page-transition pt-20 pb-24 md:pb-0" : ""}>
        {renderPage()}
      </main>
      {!isDashboardPage && <Footer />}
      <MasterSetupPanel />
      {isAppointmentModalOpen && <AppointmentModal onClose={closeAppointmentModal} />}
      {isPatientLoginModalOpen && <PatientLoginModal onClose={closePatientLoginModal} onLogin={handlePatientLogin} />}
      {!isDashboardPage && <BackToTopButton />}
      {!isDashboardPage && <TimedPopup />}
      {!isDashboardPage && (
        <MobileNav 
            activeSection={activeSection} 
            pageInfo={pageInfo} 
            onBookAppointmentClick={openAppointmentModal} 
        />
      )}
    </div>
  );
};

export default App;