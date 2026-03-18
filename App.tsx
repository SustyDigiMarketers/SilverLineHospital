import React, { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react';
import Navbar, { NavLink } from './components/Navbar';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import MasterSetupPanel from './components/MasterSetup/MasterSetupPanel';
import { useKonamiCode } from './hooks/useKonamiCode';
import BackToTopButton from './components/BackToTopButton';
import PatientLoginModal from './components/PatientLoginModal';
import TimedPopup from './components/TimedPopup';
import MobileNav from './components/MobileNav';
import { trackPageView } from './lib/analyticsService'; // Import tracking

// Lazy load components/pages for better initial performance
const About = lazy(() => import('./components/About'));
const Doctors = lazy(() => import('./components/Doctors'));
const HealthPackages = lazy(() => import('./components/HealthPackages'));
const Contact = lazy(() => import('./components/Contact'));
const EmergencyCare = lazy(() => import('./components/EmergencyCare'));
const PatientPortal = lazy(() => import('./components/PatientPortal'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const MasterDashboard = lazy(() => import('./pages/MasterDashboard'));
const SpecialtiesPage = lazy(() => import('./pages/SpecialtiesPage'));
const SpecialtyDetail = lazy(() => import('./components/SpecialtyDetail'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const DoctorBioPage = lazy(() => import('./pages/DoctorBioPage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const MarketingPage = lazy(() => import('./pages/MarketingPage'));
const InternationalPatientPage = lazy(() => import('./pages/InternationalPatientPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const PatientServicesPage = lazy(() => import('./pages/PatientServicesPage'));
const HomePage = lazy(() => import('./pages/HomePage'));



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
  { name: 'Packages', href: '#healthpackages' },
  { name: 'Contact', href: '#contactus' },
];

const adminNavLinks: NavLink[] = [
  { name: 'About', href: '#aboutus' },
  { name: "Specialties", href: "#specialties" },
  { name: 'Blogs', href: '#blog' },
  { name: 'Contact', href: '#contactus' },
];


const linkNameMap: { [key: string]: string } = {
    'home': '', 
    'aboutus': 'About',
    'healthpackages': 'Packages',
    'contactus': 'Contact',
    'doctor': 'Find Doctor',
    'emergency': 'Emergency',
    'patientportal': 'Patient Portal',
};

const pageToSectionMap: { [key: string]: string } = {
    'blog': 'Blogs',
    'post': 'Blogs',
    'specialties': 'Specialties',
    'specialty': 'Specialties',
    'aboutus': 'About',
    'healthpackages': 'Packages',
    'contactus': 'Contact',
    'doctor': 'Find Doctor',
    'emergency': 'Emergency',
    'patientportal': 'Patient Portal',
};

const App: React.FC = () => {

  const [pageInfo, setPageInfo] = useState(getPageInfoFromHash());
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState<'Appointment' | 'Package' | 'Foregin PT' | 'Contact'>('Appointment');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPatientLoginModalOpen, setIsPatientLoginModalOpen] = useState(false);
  const [loggedInPatientId, setLoggedInPatientId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);
  const scrollObserver = useRef<IntersectionObserver | null>(null);

  const openAppointmentModal = (type: 'Appointment' | 'Package' | 'Foregin PT' | 'Contact' = 'Appointment', pkgName: string | null = null) => {
    setAppointmentType(type);
    setSelectedPackage(pkgName);
    setIsAppointmentModalOpen(true);
  };
  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setSelectedPackage(null);
  };
  
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
    window.location.hash = '#patientportal';
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
      
      setPageInfo((prevInfo) => {
        // Only scroll to top if we are navigating to a DIFFERENT page view
        if (prevInfo.page !== info.page) {
          window.scrollTo(0, 0);
        }
        return info;
      });

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
        return <HealthPackages onBookPackageClick={openAppointmentModal} />;
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
        return <InternationalPatientPage onBookAppointmentClick={openAppointmentModal} />;
      case 'patientservices':
        return <PatientServicesPage initialSection={pageInfo.param || undefined} />;
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
      <main className={!isDashboardPage ? "animate-page-transition md:pt-[200px] pt-0 pb-24 md:pb-0" : ""}>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
             <div className="w-12 h-12 border-4 border-[#00B5A5]/20 border-t-[#00B5A5] rounded-full animate-spin"></div>
          </div>
        }>
          {renderPage()}
        </Suspense>
      </main>

      {!isDashboardPage && <Footer />}
      <MasterSetupPanel />
      {isAppointmentModalOpen && (
        <AppointmentModal 
          onClose={closeAppointmentModal} 
          type={appointmentType}
          packageName={selectedPackage || undefined}
        />
      )}
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
