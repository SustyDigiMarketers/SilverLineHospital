import React from 'react';

// Re-usable icon components. They will inherit color via `currentColor`.
const MedicalBagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

const CriticalCareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 13.5h2l1-2 2 4 1-2h2"/>
    </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const ActionItem: React.FC<{
  text: string;
  href?: string;
  onClick?: () => void;
  baseClasses: string;
  hoverClasses: string;
  ringColor: string;
  icon: React.ReactNode;
  'aria-label': string;
  className?: string;
}> = ({ text, href, onClick, baseClasses, hoverClasses, ringColor, icon, className, 'aria-label': ariaLabel }) => {
  
  const content = (
    <>
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'mr-2 sm:mr-3 flex-shrink-0' })}
      <span className="text-[10px] sm:text-sm font-bold whitespace-nowrap leading-tight">{text}</span>
    </>
  );

  const handleNav = (e: React.MouseEvent, targetHref: string) => {
    e.preventDefault();
    window.location.hash = targetHref;
  };

  const commonClasses = `flex flex-row items-center justify-center px-1 py-3 sm:p-4 text-center transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-0 focus:z-10 ${baseClasses} ${hoverClasses} ${ringColor} ${className || ''}`;

  if (href) {
    return (
      <a href={href} onClick={(e) => handleNav(e, href)} className={commonClasses} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`w-full ${commonClasses}`} aria-label={ariaLabel}>
      {content}
    </button>
  );
};

interface ActionBarProps {
  onBookAppointmentClick: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onBookAppointmentClick }) => {
  return (
    <section aria-label="Quick actions" className="relative z-10 py-4 md:py-0 md:-mt-12">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl md:rounded-full shadow-lg md:shadow-2xl overflow-hidden bg-white border border-gray-200">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
            <ActionItem
                text="Find a Doctor"
                href="#doctor"
                aria-label="Find a doctor and view our specialists"
                baseClasses="bg-[#1d3f7f] text-white"
                hoverClasses="hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-900/30"
                ringColor="focus:ring-blue-500"
                icon={<MedicalBagIcon />}
            />
            <ActionItem
                text="Critical Care"
                href="#emergency"
                aria-label="Find information about our emergency and critical care services"
                baseClasses="bg-white text-[#1d3f7f]"
                hoverClasses="hover:bg-gray-100"
                ringColor="focus:ring-[#1d3f7f]"
                icon={<CriticalCareIcon />}
            />
            <ActionItem
                text="Appointment"
                onClick={onBookAppointmentClick}
                aria-label="Open a modal to book a consultation or appointment"
                baseClasses="bg-[#27afaf] text-white"
                hoverClasses="hover:bg-teal-600 hover:shadow-xl hover:shadow-teal-600/30"
                ringColor="focus:ring-teal-500"
                icon={<CalendarIcon />}
            />
            </div>
        </div>
      </div>
    </section>
  );
};

export default ActionBar;