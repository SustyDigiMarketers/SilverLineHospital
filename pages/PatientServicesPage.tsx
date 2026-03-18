import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const AppointmentIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v4m-2-2h4" /></svg>
);
const AdmissionsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
const SurgeryIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const EmergencyIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
);
const SafetyIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);
const BillingIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const AmenitiesIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.354 16.354c5.273-5.273 13.819-5.273 19.092 0" /></svg>
);
const RecordsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
);
const StoriesIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const PackagesIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);
const DoctorIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const SpecialtyIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.586.347l-2.387-.477a2 2 0 00-1.022.547l-1.1 1.1a2 2 0 00-.547 1.022l-.477 2.387a2 2 0 00.547 1.022l1.1 1.1a2 2 0 001.022.547l2.387.477a2 2 0 001.022-.547l1.1-1.1a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-.547-1.022l-1.1-1.1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 10V4.5M14 10V4.5M10 10H14M10 10V14M14 10V14M10 14H14M10 14V19.5M14 14V19.5" /></svg>
);

const sidebarItems: SidebarItem[] = [
    { id: 'admissions', label: 'Admissions', icon: <AdmissionsIcon /> },
    { id: 'surgery', label: 'Preparing for Surgery', icon: <SurgeryIcon /> },
    { id: 'emergency', label: 'Emergency & Urgent Care', icon: <EmergencyIcon /> },
    { id: 'safety', label: 'Patient Safety', icon: <SafetyIcon /> },
    { id: 'stories', label: 'Patient Stories', icon: <StoriesIcon /> },
    { id: 'billing', label: 'Billing and insurance', icon: <BillingIcon /> },
    { id: 'amenities', label: 'Amenities', icon: <AmenitiesIcon /> },
    { id: 'records', label: 'Medical Records', icon: <RecordsIcon /> },
    { id: 'packages', label: 'Preventive Health Care packages', icon: <PackagesIcon /> },
    { id: 'ask-doctor', label: 'Ask Your Doctor', icon: <DoctorIcon /> },
];

const PatientServicesPage: React.FC<{ initialSection?: string }> = ({ initialSection }) => {
    const [activeId, setActiveId] = useState(initialSection || 'admissions');

    useEffect(() => {
        if (initialSection) {
            setActiveId(initialSection);
        }
    }, [initialSection]);

    const renderContent = () => {
        switch (activeId) {
            case 'admissions':
                return (
                    <div className="animate-on-scroll fade-in-up">
                        <h2 className="text-3xl font-black text-[#0E2A47] mb-6">Admissions</h2>
                        <p className="text-gray-600 text-lg mb-8">Admission to the hospital is under two circumstances:</p>
                        <ul className="space-y-4 mb-12">
                            <li className="flex gap-3 text-gray-700">
                                <span className="text-[#00B5A5] font-bold">•</span>
                                <p><span className="font-bold">Elective:</span> The admission could be because your attending physician has advised you to do so.</p>
                            </li>
                            <li className="flex gap-3 text-gray-700">
                                <span className="text-[#00B5A5] font-bold">•</span>
                                <p><span className="font-bold">Emergency:</span> When a patient is in the emergency room due to the serious nature of their disorder or due to life-threatening conditions.</p>
                            </li>
                        </ul>

                        <h3 className="text-2xl font-bold text-[#0E2A47] mb-6">Admission Checklist</h3>
                        <p className="text-gray-600 mb-6 italic">Advance registrations/admissions are a viable option. The registration form will require the following details –</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            {[
                                "Your name and address",
                                "Health insurance details",
                                "An emergency contact",
                                "Treatment consent",
                                "Consent to release information to insurance company mentioned",
                                "Signature of agreement, consenting payments that are due"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <span className="text-[#00B5A5]">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-2xl font-bold text-[#0E2A47] mb-6">Elements You Will Require for a Seamless Healthcare Experience</h3>
                        <ul className="space-y-4">
                            {[
                                "Your hospital records, test reports (old/recent), list of medications taken",
                                "List of allergies to medications, if any",
                                "Medical summaries or hospital stays, recent in nature, if any",
                                "Your insurance card",
                                "Change of clothes, toiletries, nightwear, slippers, eyeglass/hearing aid/dentures (if using) and any prescription medications taken regularly"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 text-gray-700">
                                    <span className="text-[#00B5A5] font-bold mt-1.5">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                const item = sidebarItems.find(i => i.id === activeId);
                return (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-on-scroll fade-in-up">
                        <div className="w-20 h-20 bg-teal-50 text-[#00B5A5] rounded-full flex items-center justify-center mb-6">
                            {item?.icon}
                        </div>
                        <h2 className="text-3xl font-black text-[#0E2A47] mb-4">{item?.label}</h2>
                        <p className="text-gray-500 max-w-md">Detailed information for {item?.label} is currently being updated. Please contact our support team for immediate assistance.</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <PageHero 
                title="Patient Services" 
                subtitle="Comprehensive care and support for our patients and visitors" 
                backgroundImage="patientservices.hero"
            />
            
            <div className="container mx-auto px-6 lg:px-20 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden sticky top-40">
                            <div className="p-6 bg-[#0E2A47] text-white">
                                <h4 className="font-bold text-lg">Patient Guide</h4>
                                <p className="text-teal-200 text-xs mt-1">Navigate through our services</p>
                            </div>
                            <nav className="p-4">
                                <ul className="space-y-1">
                                    {sidebarItems.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => setActiveId(item.id)}
                                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left border-2 transition-all duration-300 ${
                                                    activeId === item.id
                                                        ? 'bg-[#00B5A5] border-[#00B5A5] text-white shadow-lg shadow-teal-500/20'
                                                        : 'bg-transparent border-transparent text-[#0E2A47] hover:bg-gray-50 hover:border-gray-100'
                                                }`}
                                            >
                                                <span className={activeId === item.id ? 'text-white' : 'text-teal-600'}>
                                                    {item.icon}
                                                </span>
                                                <span className="font-bold text-sm">{item.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-3/4">
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-50">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PatientServicesPage;
