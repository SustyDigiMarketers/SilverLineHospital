import React, { useEffect, useRef, useContext } from 'react';
import { specialtiesList } from '../lib/specialtiesData';
import type { Doctor } from '../lib/doctorsData';
import EditableImage from './MasterSetup/EditableImage';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

interface DoctorProfileModalProps {
  doctor: Doctor;
  onClose: () => void;
  triggerElement: HTMLElement | null;
}

const SocialIcon: React.FC<{ type: 'linkedin' | 'twitter', href: string, label: string }> = ({ type, href, label }) => {
    const iconPath = type === 'linkedin' ? "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" : "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z";
    return (
        <a 
            href={href} 
            aria-label={label}
            className="text-gray-500 hover:text-[#0E2A47] transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {type === 'linkedin' && <circle cx="4" cy="4" r="2" />}
                <path d={iconPath} />
            </svg>
        </a>
    )
}

const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ doctor, onClose, triggerElement }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Manages all modal side-effects: focus trapping, keyboard events, and focus restoration.
  useEffect(() => {
    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Set initial focus on the close button for accessibility
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      // Close modal on Escape key
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Trap focus within the modal
      if (event.key === 'Tab') {
        if (event.shiftKey) { // Shift+Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    // Add event listeners and lock body scroll
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Cleanup function: remove listeners, restore scroll, and restore focus
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      triggerElement?.focus();
    };
  }, [onClose, triggerElement]);
  
  // Navigation handler that closes modal first
  const handleNavClick = (href: string) => {
    onClose();
    // Use a short timeout to allow the modal-out animation to start
    // before the page content changes, preventing a visual glitch.
    setTimeout(() => {
      window.location.hash = href;
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-name"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden transform animate-modal-enter"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {/* Image Section */}
        <div className="w-full md:w-1/3 h-64 md:h-auto flex-shrink-0">
          <EditableImage
            configKey={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 flex flex-col">
          <div className="flex-grow overflow-y-auto scrollbar-hide pr-2">
            <div className="flex justify-between items-start">
              <div>
                <h2 id="doctor-name" className="text-3xl font-bold text-[#0E2A47]">{doctor.name}</h2>
                <p className="text-lg font-medium text-[#00B5A5] mt-1">{doctor.specialty}</p>
                <div className="flex space-x-4 mt-4">
                    <SocialIcon type="linkedin" href={doctor.social.linkedin} label={`View ${doctor.name}'s LinkedIn profile`} />
                    <SocialIcon type="twitter" href={doctor.social.twitter} label={`View ${doctor.name}'s Twitter profile`} />
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                aria-label="Close profile"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-[#0E2A47] mb-2 border-b pb-2">About</h3>
                <p className="leading-relaxed">{doctor.shortBio}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0E2A47] mb-2 border-b pb-2">Professional Philosophy</h3>
                <p className="leading-relaxed italic">"{doctor.philosophy}"</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <button
              onClick={() => handleNavClick('#blog')}
              className="flex-1 px-6 py-3 font-medium text-[#0E2A47] bg-gray-200 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E2A47]"
            >
              Visit Our Blog
            </button>
            <button
              onClick={() => handleNavClick(`#doctor-bio/${doctor.id}`)}
              className="flex-1 px-6 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
            >
              Read Full Bio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;