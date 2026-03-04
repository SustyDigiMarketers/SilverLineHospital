import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

type PopupTheme = 'event' | 'promotion' | 'offer' | 'special_offer';

type PopupContent = {
  image: string;
  title: string;
  date: string;
  time: string;
  description: string;
};

const TimedPopup: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const [currentTheme, setCurrentTheme] = useState<PopupTheme | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutIds = useRef<number[]>([]);

  const showPopup = useCallback((theme: PopupTheme) => {
    setCurrentTheme(theme);
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Allow animation to finish before clearing content
    setTimeout(() => {
      setCurrentTheme(null);
    }, 300);
  }, []);

  useEffect(() => {
    // Clear any existing timeouts before setting new ones
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];

    // Define the full schedule
    const schedule: { theme: PopupTheme; time: number }[] = [
        { theme: 'event', time: 5000 },
        { theme: 'promotion', time: 25000 },
        { theme: 'offer', time: 40000 },
        { theme: 'special_offer', time: 55000 },
    ];
    
    // Filter the schedule based on the `isActive` config
    const activePopups = schedule.filter(({ theme }) => {
        // Default to true if the property doesn't exist for backward compatibility
        return config.timedPopups?.[theme]?.isActive ?? true;
    });

    // Set timeouts only for active popups
    const newTimeoutIds = activePopups.map(({ theme, time }) => {
        return window.setTimeout(() => showPopup(theme), time);
    });
    
    timeoutIds.current = newTimeoutIds;

    // Cleanup on unmount
    return () => {
      timeoutIds.current.forEach(clearTimeout);
    };
  }, [showPopup, config.timedPopups]);
  
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

  if (!currentTheme || !config.timedPopups || !config.timedPopups[currentTheme]) {
    return null;
  }
  
  const currentPopupContent = config.timedPopups[currentTheme];

  return (
    <div
      className="fixed bottom-6 right-6 z-[60] w-full max-w-[480px] pointer-events-none"
      role="dialog"
      aria-modal="false"
      aria-labelledby="popup-title"
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden transform pointer-events-auto flex flex-row ${isVisible ? 'animate-modal-enter' : 'animate-modal-exit'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Horizontal Layout */}
        <div className="flex flex-row w-full">
            {/* Image on Left */}
            <div className="w-1/3 h-auto flex-shrink-0 relative">
                <img
                    src={currentPopupContent.image}
                    alt={currentPopupContent.title}
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                />
            </div>

            {/* Content on Right */}
            <div className="w-2/3 p-5 flex flex-col relative z-10">
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[#00B5A5] z-20"
                  aria-label="Close notification"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div 
                  className={`flex items-center space-x-3 text-[10px] text-gray-500 mb-2 ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
                  style={{ animationDelay: '150ms' } as React.CSSProperties}
                >
                  <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span>{currentPopupContent.date}</span>
                  </div>
                </div>
              
                <h2 
                  id="popup-title" 
                  className={`text-lg font-bold text-[#0E2A47] leading-tight mb-1.5 ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
                  style={{ animationDelay: '250ms' } as React.CSSProperties}
                >{currentPopupContent.title}</h2>
                
                <p 
                  className={`text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2 ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
                  style={{ animationDelay: '350ms' } as React.CSSProperties}
                >{currentPopupContent.description}</p>
              
                <div 
                  className={`mt-auto flex justify-end ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
                  style={{ animationDelay: '450ms' } as React.CSSProperties}
                >
                  <button
                      onClick={handleClose}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0E2A47] rounded-full transition-all duration-300 hover:bg-[#00B5A5] transform hover:scale-105 shadow-sm"
                    >
                      Learn More
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TimedPopup;
