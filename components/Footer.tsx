import React, { useContext, useState, useEffect } from 'react';
import EditableText from './MasterSetup/EditableText';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import EditableImage from './MasterSetup/EditableImage';

const SocialIcon: React.FC<{ href: string, path: string, label: string }> = ({ href, path, label }) => (
    <a 
        href={href} 
        aria-label={label}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 group transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:text-white hover:border-[#00B5A5] hover:scale-110 hover:shadow-lg hover:shadow-[#00B5A5]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0E2A47] focus:ring-[#00B5A5]"
        target="_blank"
        rel="noopener noreferrer"
    >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d={path} />
        </svg>
    </a>
);

interface LinkSectionProps {
  title: string;
  links: { name: string; href: string }[];
  currentPath: string;
  currentHash: string;
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

interface FooterProps {
  onBookAppointmentClick?: () => void;
}

const LinkSection: React.FC<LinkSectionProps> = ({ 
  title, 
  links, 
  currentPath, 
  currentHash, 
  handleLinkClick 
}) => {
  const isLinkActive = (href: string): boolean => {
    if (!href || href === '#') return false;

    // Normalize hash & path
    const cleanHref = href.replace(/^\/+|\/+$/g, '').toLowerCase();
    const cleanPath = currentPath.replace(/^\/+|\/+$/g, '').toLowerCase();

    // Home matching
    if (cleanHref === '' || cleanHref === 'home') {
      return cleanPath === '' || cleanPath === 'home';
    }

    // Check hash targets
    if (href.startsWith('#')) {
      const targetHash = href.toLowerCase();
      const targetPath = href.replace('#', '').toLowerCase();
      return currentHash === targetHash || cleanPath === targetPath;
    }

    // Media & Events matching
    if (cleanHref === 'media-events' || cleanHref === 'events' || cleanHref === 'gallery') {
      return cleanPath === 'media-events' || cleanPath === 'events' || cleanPath === 'gallery';
    }

    // Specialties matching (including /specialty/<id>)
    if (cleanHref === 'specialties' || cleanHref === 'specialities') {
      return cleanPath === 'specialties' || cleanPath === 'specialities' || cleanPath.startsWith('specialty');
    }

    // Doctors matching (including /doctor-bio/<id>)
    if (cleanHref === 'doctor' || cleanHref === 'doctors') {
      return cleanPath === 'doctor' || cleanPath === 'doctors' || cleanPath.startsWith('doctor-bio');
    }

    // Contact matching (including /faq)
    if (cleanHref === 'contactus' || cleanHref === 'contact') {
      return cleanPath === 'contactus' || cleanPath === 'contact' || cleanPath === 'faq';
    }

    // Packages matching
    if (cleanHref === 'healthpackages' || cleanHref === 'packages') {
      return cleanPath === 'healthpackages' || cleanPath === 'packages';
    }

    // About matching
    if (cleanHref === 'aboutus' || cleanHref === 'about') {
      return cleanPath === 'aboutus' || cleanPath === 'about';
    }

    // Career matching
    if (cleanHref === 'career' || cleanHref === 'careers') {
      return cleanPath === 'career' || cleanPath === 'careers';
    }

    // Blog matching
    if (cleanHref === 'blog' || cleanHref === 'blogs') {
      return cleanPath === 'blog' || cleanPath === 'blogs' || cleanPath.startsWith('post');
    }

    // International / Foreign matching
    if (cleanHref === 'international' || cleanHref === 'foreign-patient' || cleanHref === 'foreign-patients') {
      return cleanPath === 'international' || cleanPath === 'foreign-patient' || cleanPath === 'foreign-patients';
    }

    // Patient Portal
    if (cleanHref === 'patientportal' || cleanHref === 'portal') {
      return cleanPath === 'patientportal' || cleanPath === 'portal';
    }

    // Emergency Care
    if (cleanHref === 'emergency') {
      return cleanPath === 'emergency';
    }

    return cleanPath === cleanHref;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 md:border-0 md:pb-0">{title}</h3>
      <ul className="space-y-1.5 text-sm">
        {links.map(link => {
          const active = isLinkActive(link.href);
          return (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)} 
                className={`transition-all duration-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00B5A5] inline-flex items-center py-1.5 px-2.5 ${
                  active 
                    ? 'text-[#00B5A5] font-bold bg-[#00B5A5]/10 border border-[#00B5A5]/30 shadow-sm' 
                    : 'text-gray-300 hover:text-[#00B5A5] hover:bg-white/5'
                }`}
              >
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B5A5] mr-2 shadow-[0_0_8px_rgba(0,181,165,0.9)] animate-pulse" />
                )}
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Footer: React.FC<FooterProps> = ({ onBookAppointmentClick }) => {
   const { config } = useContext(MasterSetupContext);
   const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname.toLowerCase());
   const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash.toLowerCase());

   useEffect(() => {
     const updateLocation = () => {
       setCurrentPath(window.location.pathname.toLowerCase());
       setCurrentHash(window.location.hash.toLowerCase());
     };

     window.addEventListener('popstate', updateLocation);
     window.addEventListener('hashchange', updateLocation);
     return () => {
       window.removeEventListener('popstate', updateLocation);
       window.removeEventListener('hashchange', updateLocation);
     };
   }, []);

   const socialLinks = [
    { label: 'Facebook', key: 'facebook', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
    { label: 'Instagram', key: 'instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163C8.84 0 8.42.012 7.148.07 2.897.22 1.222 1.895 1.07 6.148.01 7.42 0 7.84 0 12s.01 4.58.07 5.852c.15 4.253 1.825 5.928 6.078 6.078 1.27.06 1.69.07 4.852.07s3.582-.01 4.852-.07c4.253-.15 5.928-1.825 6.078-6.078.06-1.27.07-1.69.07-4.852s-.01-3.582-.07-4.852c-.15-4.253-1.825-5.928-6.078-6.078C16.582.01 16.16 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z' },
    { label: 'LinkedIn', key: 'linkedin', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { label: 'Twitter', key: 'twitter', path: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
  ];

  // Quick Links: Home, About, Specialities, Media & Events, Blogs, Contact, Career (Health Packages & Doctors removed)
  const quickLinks = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/aboutus' },
      { name: 'Specialities', href: '/specialties' },
      { name: 'Media & Events', href: '/media-events' },
      { name: 'Blogs', href: '/blog' },
      { name: 'Contact', href: '/contactus' },
      { name: 'Career', href: '/career' },
  ];

  // For Patients: Doctors, Appointments, Health Packages, Foreign Patients, Patient Portal, Emergency Care (Request Info removed)
  const forPatientsLinks = [
      { name: 'Doctors', href: '/doctor' },
      { name: 'Appointments', href: '#appointment' },
      { name: 'Health Packages', href: '/healthpackages' },
      { name: 'Foreign Patients', href: '/international' },
      { name: 'Patient Portal', href: '/patientportal' },
      { name: 'Emergency Care', href: '/emergency' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    // Direct action for Appointment booking
    if (href === '#appointment' || href === '/appointment' || href === '#appointments' || href === '/appointments') {
      if (onBookAppointmentClick) {
        onBookAppointmentClick();
      } else {
        window.dispatchEvent(new CustomEvent('open-appointment-modal', { detail: { type: 'Appointment' } }));
      }
      return;
    }

    if (href.startsWith('/')) {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
        setCurrentPath(href.toLowerCase());
    } else {
        window.location.hash = href;
        setCurrentHash(href.toLowerCase());
    }
  };
  
  return (
    <footer className="bg-[#0E2A47] text-gray-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-105 mb-4 inline-block rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0E2A47] focus:ring-[#00B5A5]">
              <EditableImage
                configKey="footer.logo"
                alt="Logo"
                className="w-full h-auto max-w-[350px] object-contain scale-100"
              />
            </a>
            <EditableText
              as="p"
              configKey="footer.description"
              defaultValue="Providing quality healthcare for a brighter and healthy future. Your wellness is our priority."
              className="text-sm text-gray-400"
            />
            <div className="flex space-x-2">
              {socialLinks.map(link => (
                <SocialIcon 
                  key={link.label} 
                  label={link.label} 
                  path={link.path}
                  href={(config.socialMedia && config.socialMedia[link.key]) || '#'} 
                />
              ))}
            </div>
          </div>

          {/* Column 2 & 3: Quick Links & For Patients with Route-Aware Active States */}
          <LinkSection 
            title="Quick Links" 
            links={quickLinks} 
            currentPath={currentPath}
            currentHash={currentHash}
            handleLinkClick={handleLinkClick} 
          />
          <LinkSection 
            title="For Patients" 
            links={forPatientsLinks} 
            currentPath={currentPath}
            currentHash={currentHash}
            handleLinkClick={handleLinkClick} 
          />
          
           {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 md:border-0 md:pb-0">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <EditableText as="span" configKey="footer.address" defaultValue="No: 3/332, Chennai National Highways, Palur, Trichy." />
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <EditableText as="span" configKey="footer.mobile" defaultValue="96773 36097" />
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <EditableText as="span" configKey="footer.landline" defaultValue="0431-2906470 / 71" />
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <EditableText as="span" configKey="footer.email" defaultValue="appointmentdesk@silverlinehospital.com" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      
       {/* Map Section */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 pb-20 hidden md:block">
        <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1053.446801752651!2d78.72183526958743!3d10.894911999328844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDUzJzQxLjciTiA3OMKwNDMnMjAuOSJF!5e1!3m2!1sen!2sin!4v1761913263294!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title="Hospital Location"
          ></iframe>
        </div>
      </div>

      <div className="bg-black/20 pb-24 md:pb-0">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 sm:gap-0">
          <div className="flex items-center text-sm text-gray-400">
            <span>&copy; 2025 SilverLine Hospital. All Rights Reserved.</span>
          </div>
           <div className="text-sm text-gray-400 hidden md:block">
             <p>Powered With Care By SustyDigiMarketers</p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
