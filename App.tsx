import React, { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react';
import Navbar, { NavLink } from './components/Navbar';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import BackToTopButton from './components/BackToTopButton';
import PatientLoginModal from './components/PatientLoginModal';
import PopupAds from './components/PopupAds';
import MobileNav from './components/MobileNav';
import { trackPageView } from './lib/analyticsService'; // Import tracking
import { getSpecialtyById } from './lib/specialtiesData';
import { mainNavLinks } from './data/navigation';

// Lazy load components/pages for better initial performance
const About = lazy(() => import('./components/About'));
const Doctors = lazy(() => import('./components/Doctors'));
const HealthPackages = lazy(() => import('./components/HealthPackages'));
const Contact = lazy(() => import('./components/Contact'));
const EmergencyCare = lazy(() => import('./components/EmergencyCare'));
const PatientPortal = lazy(() => import('./components/PatientPortal'));
const SpecialtiesPage = lazy(() => import('./pages/SpecialtiesPage'));
const SpecialtyDetail = lazy(() => import('./components/SpecialtyDetail'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const postModules = import.meta.glob('./pages/Post/*.tsx');
const DepartmentPostPage = lazy(() => import('./pages/Post/DepartmentPostPage'));
const DoctorBioPage = lazy(() => import('./pages/DoctorBioPage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const InternationalPatientPage = lazy(() => import('./pages/InternationalPatientPage'));
const MediaEventsPage = lazy(() => import('./pages/MediaEventsPage'));
const PatientServicesPage = lazy(() => import('./pages/PatientServicesPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const PressReleasePage = lazy(() => import('./pages/PressRelease/PressReleasePage'));



const getPageInfo = () => {
  let path = window.location.pathname.replace(/^\/+/, '').toLowerCase();
  if (!path) {
    path = window.location.hash.replace('#', '').toLowerCase();
  }
  const parts = path.split('/');
  const root = parts[0] || 'home';

  // Handle specialty routes: /specialty/:id or /specialties/:id or /specialities/:id
  if (root === 'specialty' || root === 'specialties' || root === 'specialities') {
    if (parts[1]) {
      return {
        page: 'specialty',
        param: parts[1],
      };
    }
    return {
      page: 'specialties',
      param: null,
    };
  }

  // Direct specialty slug (e.g. /cardiology)
  if (root !== 'home' && getSpecialtyById(root)) {
    return {
      page: 'specialty',
      param: root,
    };
  }

  // Handle blog routes: /blog/:id or /blogs/:id
  if (root === 'blog' || root === 'blogs') {
    if (parts[1]) {
      return {
        page: 'post',
        param: parts[1],
      };
    }
    return {
      page: 'blog',
      param: null,
    };
  }

  return {
    page: root,
    param: parts[1] || null,
  };
};

const fullNavLinks: NavLink[] = mainNavLinks;

const linkNameMap: { [key: string]: string } = {
    'home': 'Home', 
    'aboutus': 'About',
    'about': 'About',
    'gallery': 'Media & Events',
    'media-events': 'Media & Events',
    'events': 'Media & Events',
    'healthpackages': 'Packages',
    'packages': 'Packages',
    'contactus': 'Contact',
    'contact': 'Contact',
    'faq': 'Contact',
    'doctor': 'Find Doctor',
    'doctors': 'Find Doctor',
    'emergency': 'Emergency',
    'patientportal': 'Patient Portal',
    'career': 'Career',
    'careers': 'Career',
    'international': 'Foreign Patients',
    'foreign-patient': 'Foreign Patients',
    'foreign-patients': 'Foreign Patients',
};

const pageToSectionMap: { [key: string]: string } = {
    'home': 'Home',
    'blog': 'Blogs',
    'blogs': 'Blogs',
    'post': 'Blogs',
    'specialties': 'Specialties',
    'specialities': 'Specialties',
    'specialty': 'Specialties',
    'gallery': 'Media & Events',
    'media-events': 'Media & Events',
    'events': 'Media & Events',
    'aboutus': 'About',
    'about': 'About',
    'healthpackages': 'Packages',
    'packages': 'Packages',
    'contactus': 'Contact',
    'contact': 'Contact',
    'faq': 'Contact',
    'doctor': 'Find Doctor',
    'doctors': 'Find Doctor',
    'emergency': 'Emergency',
    'patientportal': 'Patient Portal',
    'career': 'Career',
    'careers': 'Career',
    'international': 'Foreign Patients',
    'foreign-patient': 'Foreign Patients',
    'foreign-patients': 'Foreign Patients',
};

const App: React.FC = () => {

  const [pageInfo, setPageInfo] = useState(getPageInfo());
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
    window.history.pushState({}, '', '/patientportal');
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const storedPatientId = sessionStorage.getItem('patientId');
    if (storedPatientId) {
      setLoggedInPatientId(storedPatientId);
    }
    
    // Add class to body to signal JS is ready, enabling scroll animations
    document.body.classList.add('js-initialized');
  }, []);

  useEffect(() => {
    const handlePathChange = () => {
      const info = getPageInfo();
      
      setPageInfo((prevInfo) => {
        // Only scroll to top if we are navigating to a DIFFERENT page view
        if (prevInfo.page !== info.page || prevInfo.param !== info.param) {
          window.scrollTo(0, 0);
        }
        return info;
      });

      // Track the page view in Supabase
      trackPageView(info.page);
    };

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Intercept links that should route internally without reload
        if (href && href.startsWith('/')) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          handlePathChange();
        }
      }
    };

    window.addEventListener('hashchange', handlePathChange);
    window.addEventListener('popstate', handlePathChange);
    document.addEventListener('click', handleLinkClick);
    
    // Also run on initial load
    handlePathChange();

    return () => {
      window.removeEventListener('hashchange', handlePathChange);
      window.removeEventListener('popstate', handlePathChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);


  useEffect(() => {
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
    
    // Explicitly manage active section by route
    if (pageInfo.page === 'home' || !pageInfo.page) {
      setActiveSection('Home');
    } else {
      const newActiveSection = pageToSectionMap[pageInfo.page];
      setActiveSection(newActiveSection || '');
    }

    return () => {
      scrollObserver.current?.disconnect();
    };
  }, [pageInfo.page]); // Re-run when page changes to catch new DOM elements
  
  useEffect(() => {
    const handleOpenAppointment = (e: any) => {
      openAppointmentModal(e.detail?.type || 'Appointment', e.detail?.pkgName || null);
    };
    window.addEventListener('open-appointment-modal', handleOpenAppointment);
    return () => window.removeEventListener('open-appointment-modal', handleOpenAppointment);
  }, []);

  useEffect(() => {
    if (pageInfo.page === 'appointment' || pageInfo.page === 'appointments') {
      openAppointmentModal('Appointment');
    }
  }, [pageInfo.page]);

  const renderPage = () => {
    switch (pageInfo.page) {
      case 'home':
        return <HomePage onBookAppointmentClick={openAppointmentModal} />;
      case 'aboutus':
      case 'about':
        return <About />;
      case 'specialties':
      case 'specialities':
        return <SpecialtiesPage />;
      case 'specialty':
        return pageInfo.param ? <SpecialtyDetail specialtyId={pageInfo.param} onBookAppointmentClick={openAppointmentModal} /> : <SpecialtiesPage />;
      case 'blog':
      case 'blogs':
        return <BlogPage />;
      case 'post':
        if (pageInfo.param) {
            const pathKey = Object.keys(postModules).find(p => p.toLowerCase().endsWith(`/${pageInfo.param!.toLowerCase()}.tsx`));
            if (pathKey) {
                const DynamicComponent = lazy(postModules[pathKey] as any);
                return <DynamicComponent postId={pageInfo.param} />;
            }
            return <DepartmentPostPage postId={pageInfo.param} />;
        }
        return <BlogPage />;
      case 'doctor':
      case 'doctors':
         return <Doctors />;
      case 'doctor-bio':
        return pageInfo.param ? <DoctorBioPage doctorId={pageInfo.param} onBookAppointmentClick={openAppointmentModal} /> : <Doctors />;
      case 'healthpackages':
      case 'packages':
        return <HealthPackages onBookPackageClick={openAppointmentModal} />;
      case 'contactus':
      case 'contact':
      case 'faq':
        return <Contact />;
      case 'emergency':
        return <EmergencyCare />;
      case 'patientportal':
      case 'portal':
        return <PatientPortal patientId={loggedInPatientId} onLoginClick={openPatientLoginModal} />;
      case 'career':
      case 'careers':
        return <CareerPage />;
      case 'international':
      case 'foreign-patient':
      case 'foreign-patients':
      case 'foreignpatient':
      case 'foreignpatients':
        return <InternationalPatientPage onBookAppointmentClick={openAppointmentModal} />;
      case 'appointment':
      case 'appointments':
        return <HomePage onBookAppointmentClick={openAppointmentModal} />;
      case 'patientservices':
        return <PatientServicesPage initialSection={pageInfo.param || undefined} />;
      case 'gallery':
      case 'events':
        window.history.replaceState(null, '', '/media-events');
        return <MediaEventsPage />;
      case 'media-events':
        return <MediaEventsPage />;
      case 'pressrelease':
        return <PressReleasePage slug={pageInfo.param || undefined} />;
      default:
        return <HomePage onBookAppointmentClick={openAppointmentModal} />;
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <Navbar
        navLinks={fullNavLinks}
        activeSection={activeSection}
        onBookAppointmentClick={openAppointmentModal}
        onPatientPortalClick={handlePatientPortalClick}
      />
      <main className="animate-page-transition md:pt-[200px] pt-0 pb-24 md:pb-0">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-[#00B5A5]/20 border-t-[#00B5A5] rounded-full animate-spin"></div>
          </div>
        }>
          {renderPage()}
        </Suspense>
      </main>

      <Footer onBookAppointmentClick={openAppointmentModal} />
      {isAppointmentModalOpen && (
        <AppointmentModal 
          onClose={closeAppointmentModal} 
          type={appointmentType}
          packageName={selectedPackage || undefined}
        />
      )}
      {isPatientLoginModalOpen && <PatientLoginModal onClose={closePatientLoginModal} onLogin={handlePatientLogin} />}
      <BackToTopButton />
      <PopupAds />
      <MobileNav 
        activeSection={activeSection} 
        pageInfo={pageInfo} 
        onBookAppointmentClick={openAppointmentModal} 
      />
    </div>
  );
};

export default App;
