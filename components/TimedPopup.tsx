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

const themeConfig = {
    event: {
        colors: ['#00B5A5', '#0E2A47', '#FFC700', '#FF5733', '#FFFFFF'],
        speed: { min: 4, range: 3 } // Slower, more festive (4-7s)
    },
    promotion: {
        colors: ['#0E2A47', '#00B5A5', '#FFFFFF', '#a0aec0', '#4299e1'], // More corporate/calm
        speed: { min: 5, range: 3 } // A bit more elegant/slower (5-8s)
    },
    offer: {
        colors: ['#FF5733', '#FFC700', '#e53e3e', '#f6ad55', '#FFFFFF'], // Warmer, attention-grabbing
        speed: { min: 3, range: 2 } // Faster, more urgent (3-5s)
    },
    special_offer: {
        colors: ['#FFD700', '#C0C0C0', '#FFFFFF', '#f7fafc', '#e2e8f0'], // Gold, Silver, White
        speed: { min: 2, range: 2 } // Faster, more celebratory (2-4s)
    }
}

const Confetti: React.FC<{ theme: PopupTheme }> = React.memo(({ theme }) => {
  const { colors, speed } = themeConfig[theme];
  const animations = ['animate-flutter-1', 'animate-flutter-2', 'animate-flutter-3'];
  
  const pieces = Array.from({ length: 60 }).map((_, i) => {
    const animationClass = animations[Math.floor(Math.random() * animations.length)];
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: `${Math.random() * speed.range + speed.min}s`,
      animationDelay: `${Math.random() * 2}s`,
      width: `${Math.random() * 6 + 5}px`,
      height: `${Math.random() * 10 + 6}px`,
      opacity: Math.random() * 0.5 + 0.5,
    };
    return <div key={i} className={`absolute top-0 ${animationClass}`} style={style} />;
  });
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{pieces}</div>;
});


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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <Confetti theme={currentTheme} />
      
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden transform ${isVisible ? 'animate-modal-enter' : 'animate-modal-exit'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Image */}
        <div className="w-full md:w-5/12 h-56 md:h-auto flex-shrink-0">
            <img
                src={currentPopupContent.image}
                alt={currentPopupContent.title}
                className="w-full h-full object-cover"
                aria-hidden="true"
            />
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-7/12 p-8 flex flex-col relative">
             <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
              aria-label="Close notification"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div 
              className={`flex items-center space-x-4 text-sm text-gray-500 mb-2 ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
              style={{ animationDelay: '150ms' } as React.CSSProperties}
            >
              <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span>{currentPopupContent.date}</span>
              </div>
               <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{currentPopupContent.time}</span>
              </div>
            </div>
          
            <h2 
              id="popup-title" 
              className={`text-3xl font-bold text-[#0E2A47] !leading-tight mb-3 ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
              style={{ animationDelay: '250ms' } as React.CSSProperties}
            >{currentPopupContent.title}</h2>
            <p 
              className={`text-gray-600 leading-relaxed mb-6 flex-grow ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
              style={{ animationDelay: '350ms' } as React.CSSProperties}
            >{currentPopupContent.description}</p>
          
            <div 
              className={`mt-auto text-right ${isVisible ? 'animate-content-pop-in' : 'opacity-0'}`}
              style={{ animationDelay: '450ms' } as React.CSSProperties}
            >
              <button
                  onClick={handleClose}
                  className="px-6 py-3 font-semibold text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#00B5A5] hover:shadow-lg hover:shadow-teal-400/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#00B5A5]"
                >
                  Learn More
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TimedPopup;