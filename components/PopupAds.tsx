// =====================================================
// IMPORTS
// =====================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { popupAds } from '../data/images';


// =====================================================
// POPUP TIMING — CHANGE ONLY HERE
// =====================================================

const POPUP_TIMING = {
  firstDelay: 5000,
  secondDelay: 25000,
  thirdDelay: 40000,
  fourthDelay: 55000,
} as const;


// =====================================================
// POPUP SIZE — CHANGE ONLY HERE
// =====================================================

const POPUP_CONFIG = {
  desktopWidth: 480,
  tabletWidth: 420,
  mobileWidth: 340,
  maxWidth: 'calc(100vw - 32px)',
} as const;


// =====================================================
// POPUP CONTENT — CHANGE ONLY HERE
// =====================================================

const POPUP_AD_CONFIG = [
  {
    image: popupAds[0],
    title: 'Annual Health Check-up Camp',
    date: 'Oct 28 - Nov 5',
    description: 'Join us for our annual health camp. Get comprehensive check-ups at a discounted price and consult with our top specialists.',
    cta: 'Learn More',
    link: '#',
  },
  {
    image: popupAds[1],
    title: 'Save on Dental Care',
    date: 'This Month Only',
    description: 'Get 20% off on all dental procedures, including cosmetic dentistry and regular check-ups. Book your appointment now!',
    cta: 'Learn More',
    link: '#',
  },
  {
    image: popupAds[2],
    title: 'Heart Health Package Offer',
    date: 'Ends Dec 31st',
    description: 'Our comprehensive heart health package is now available with a special 15% discount. Protect your heart today.',
    cta: 'Learn More',
    link: '#',
  },
  {
    image: popupAds[3],
    title: 'Special Offer for New Patients',
    date: 'Limited Time',
    description: 'New to SilverLine? Get a free consultation with any specialist on your first visit. Your health journey starts here.',
    cta: 'Learn More',
    link: '#',
  },
];


// =====================================================
// ROUTE VALIDATION HELPER
// =====================================================

/**
 * Checks if the current route is strictly allowed to display popup advertisements.
 * Restricted strictly to Home ('/' or empty) and About ('/about', '/aboutus').
 * Returns false for any other route (e.g., /specialties, /career, /blogs, etc.).
 */
function isPopupAllowedRoute(): boolean {
  if (typeof window === 'undefined') return false;

  const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/+$/, '');

  // Exact path check
  const isAllowedPath = rawPath === '/' || rawPath === '/about' || rawPath === '/aboutus';

  // If at root path, check if hash designates another route/page
  if (rawPath === '/') {
    if (rawHash && rawHash !== '' && rawHash !== 'home' && rawHash !== 'about' && rawHash !== 'aboutus') {
      return false;
    }
    return true;
  }

  return rawPath === '/about' || rawPath === '/aboutus';
}


// =====================================================
// POPUP COMPONENT
// =====================================================

export default function PopupAds() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRouteAllowed, setIsRouteAllowed] = useState(isPopupAllowedRoute);
  const [imageError, setImageError] = useState(false);
  const timeoutIds = useRef<number[]>([]);

  // Monitor route changes to strictly enforce Home + About only
  useEffect(() => {
    const handleRouteChange = () => {
      const allowed = isPopupAllowedRoute();
      setIsRouteAllowed(allowed);
      if (!allowed) {
        setIsVisible(false);
        setCurrentIndex(null);
        timeoutIds.current.forEach(clearTimeout);
        timeoutIds.current = [];
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const showPopup = useCallback((index: number) => {
    if (!isPopupAllowedRoute()) return;
    if (index < 0 || index >= POPUP_AD_CONFIG.length) return;
    setImageError(false);
    setCurrentIndex(index);
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Allow animation to finish before clearing content
    setTimeout(() => {
      setCurrentIndex(null);
    }, 300);
  }, []);

  const handleCtaClick = useCallback(() => {
    const ad = currentIndex !== null ? POPUP_AD_CONFIG[currentIndex] : null;
    handleClose();
    if (ad?.link && ad.link !== '#') {
      if (ad.link.startsWith('#')) {
        window.location.hash = ad.link;
      } else {
        window.location.href = ad.link;
      }
    }
  }, [currentIndex, handleClose]);

  // Timing schedule driven directly by POPUP_TIMING
  useEffect(() => {
    if (!isRouteAllowed) return;

    // Clear any existing timeouts before scheduling new ones
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];

    const schedule = [
      { index: 0, time: POPUP_TIMING.firstDelay },
      { index: 1, time: POPUP_TIMING.secondDelay },
      { index: 2, time: POPUP_TIMING.thirdDelay },
      { index: 3, time: POPUP_TIMING.fourthDelay },
    ];

    const newTimeoutIds = schedule.map(({ index, time }) => {
      return window.setTimeout(() => showPopup(index), time);
    });

    timeoutIds.current = newTimeoutIds;

    return () => {
      timeoutIds.current.forEach(clearTimeout);
    };
  }, [showPopup, isRouteAllowed]);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, handleClose]);

  // Do not render anything if current route is not allowed or no popup is active
  if (!isRouteAllowed || currentIndex === null) {
    return null;
  }

  const currentAd = POPUP_AD_CONFIG[currentIndex];
  if (!currentAd) {
    return null;
  }

  return (
    <div
      className="fixed md:bottom-6 md:right-6 bottom-24 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto z-[60] w-[90vw] md:w-full pointer-events-none origin-bottom"
      style={{
        maxWidth: POPUP_CONFIG.maxWidth,
        width: `min(${POPUP_CONFIG.desktopWidth}px, ${POPUP_CONFIG.maxWidth})`,
      }}
      role="dialog"
      aria-modal="false"
      aria-labelledby="popup-title"
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden transform pointer-events-auto flex flex-row scale-75 md:scale-100 ${
          isVisible ? 'animate-modal-enter' : 'animate-modal-exit'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Horizontal Layout */}
        <div className="flex flex-row w-full">
          {/* Image on Left (Centralized from Standby/Popup/ via data/images.ts) */}
          {!imageError && currentAd.image && (
            <div className="w-1/3 min-h-[140px] flex-shrink-0 relative bg-slate-100 overflow-hidden">
              <img
                src={currentAd.image}
                alt={currentAd.title}
                className="w-full h-full object-cover"
                aria-hidden="true"
                loading="eager"
                decoding="async"
                onError={() => setImageError(true)}
              />
            </div>
          )}

          {/* Content on Right */}
          <div className={`${!imageError && currentAd.image ? 'w-2/3' : 'w-full'} p-5 flex flex-col relative z-10`}>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[#00B5A5] z-20"
              aria-label="Close notification"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {currentAd.date && (
              <div
                className={`flex items-center space-x-3 text-[10px] text-gray-500 mb-2 ${
                  isVisible ? 'animate-content-pop-in' : 'opacity-0'
                }`}
                style={{ animationDelay: '150ms' } as React.CSSProperties}
              >
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-1 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{currentAd.date}</span>
                </div>
              </div>
            )}

            <h2
              id="popup-title"
              className={`text-lg font-bold text-[#0E2A47] leading-tight mb-1.5 ${
                isVisible ? 'animate-content-pop-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '250ms' } as React.CSSProperties}
            >
              {currentAd.title}
            </h2>

            <p
              className={`text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2 ${
                isVisible ? 'animate-content-pop-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '350ms' } as React.CSSProperties}
            >
              {currentAd.description}
            </p>

            <div
              className={`mt-auto flex justify-end ${
                isVisible ? 'animate-content-pop-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '450ms' } as React.CSSProperties}
            >
              <button
                onClick={handleCtaClick}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0E2A47] rounded-full transition-all duration-300 hover:bg-[#00B5A5] transform hover:scale-105 shadow-sm"
              >
                {currentAd.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
