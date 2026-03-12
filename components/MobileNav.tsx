import React from 'react';
import { Home, Activity, Package, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
    activeSection: string;
    pageInfo: { page: string, param: string | null };
    onBookAppointmentClick?: () => void;
}

const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home', matchPage: ['home'], matchSection: [] },
    { id: 'specialties', label: 'Specialties', icon: Activity, href: '#specialties', matchPage: ['specialties', 'specialty'], matchSection: ['Specialties'] },
    { id: 'healthpackages', label: 'Packages', icon: Package, href: '#healthpackages', matchPage: ['healthpackages'], matchSection: ['Packages'] },
    { id: 'doctor', label: 'Doctors', icon: User, href: '#doctor', matchPage: ['doctor', 'doctor-bio'], matchSection: ['Find Doctor'] },
    { id: 'contactus', label: 'Contact', icon: MessageCircle, href: '#contactus', matchPage: ['contactus', 'faq'], matchSection: ['Contact'] }
];

const MobileNav: React.FC<MobileNavProps> = ({ activeSection, pageInfo }) => {
    const { page } = pageInfo;
    
    // Determine active tab based on exact page or active scroll spy section
    let activeTabId = 'home';
    const currentItem = navItems.find((item) => 
        item.matchPage.includes(page) || item.matchSection.includes(activeSection)
    );
    if (currentItem) {
        activeTabId = currentItem.id;
    }

    return (
        <nav 
            className="md:hidden fixed bottom-0 left-0 w-full z-[100] pb-[env(safe-area-inset-bottom)] pointer-events-none"
            role="navigation" 
            aria-label="Mobile Navigation"
        >
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative flex items-center justify-between pointer-events-auto bg-white/90 backdrop-blur-xl border-t border-[#00B5A5]/10 shadow-[0_-8px_30px_rgba(0,181,165,0.08)] rounded-t-3xl h-[80px] px-1 sm:px-2 w-full max-w-md mx-auto"
            >
                {navItems.map((item) => {
                    const isActive = activeTabId === item.id;
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.hash = item.href;
                            }}
                            className="relative flex flex-col items-center justify-center w-[72px] sm:w-[84px] h-[64px] focus:outline-none z-10 tap-highlight-transparent group"
                        >
                            {/* Sliding Active Background Pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="navPillBackground"
                                    className="absolute inset-0 bg-gradient-to-b from-[#00B5A5]/10 to-[#00B5A5]/5 rounded-2xl"
                                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                                    style={{ 
                                        boxShadow: 'inset 0 2px 10px rgba(0, 181, 165, 0.05)'
                                    }}
                                />
                            )}
                            
                            {/* Icon Container with animation */}
                            <motion.div 
                                className={`relative z-20 flex items-center justify-center mb-1 transition-colors duration-300
                                ${isActive ? 'text-[#00B5A5]' : 'text-[#8E8E93] group-hover:text-[#0E2A47]'}`}
                                animate={{ 
                                    y: isActive ? -1 : 0,
                                    scale: isActive ? 1.1 : 1 
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                <Icon 
                                    className="w-[24px] h-[24px]" 
                                    strokeWidth={isActive ? 2.5 : 2}
                                    style={{
                                        fill: isActive && item.id === 'home' ? 'currentColor' : 'none',
                                    }}
                                />
                                
                                {/* Micro glow dot for active state (Adds a futuristic accent matching the theme) */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00B5A5] rounded-full shadow-[0_0_8px_rgba(0,181,165,0.8)]"
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Label */}
                            <motion.span 
                                className={`relative z-20 text-[10px] font-bold tracking-tight text-center leading-none transition-colors duration-300
                                ${isActive ? 'text-[#00B5A5]' : 'text-[#A0A0A5] group-hover:text-[#0E2A47]'}`}
                                animate={{ 
                                    opacity: isActive ? 1 : 0.8,
                                    scale: isActive ? 1 : 0.95
                                }}
                            >
                                {item.label}
                            </motion.span>
                        </a>
                    );
                })}
            </motion.div>
        </nav>
    );
};

export default MobileNav;
