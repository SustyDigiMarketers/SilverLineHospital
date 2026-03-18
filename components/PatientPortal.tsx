import React, { useState } from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { mockPatients } from '../lib/patientData';

// --- Icons for the Grid ---
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-teal-100 bg-teal-50 text-[#00B5A5] group-hover:bg-[#00B5A5] group-hover:text-white transition-all duration-300">
        {children}
    </div>
);

const AppointmentIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v4m-2-2h4" /></svg>
);
const AdmissionsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
const SurgeryIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const EmergencyIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
);
const SafetyIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);
const BillingIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const AmenitiesIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.354 16.354c5.273-5.273 13.819-5.273 19.092 0" /></svg>
);
const RecordsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
);
const StoriesIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const PackagesIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);
const DoctorIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const PaymentIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
);

interface PatientPortalProps {
    patientId: string | null;
    onLoginClick: () => void;
}

const PatientPortal: React.FC<PatientPortalProps> = ({ patientId, onLoginClick }) => {
    const patientData = patientId ? mockPatients[patientId] : null;

    if (patientData) {
        // Logged In Dashboard
        return (
            <section id="patientportal" className="py-20 pt-40 bg-gray-50 min-h-screen">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-12 animate-on-scroll fade-in-up">
                        <h1 className="text-4xl font-bold text-[#0E2A47]">
                            Welcome, {patientData.name}
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">Here is your personal health dashboard.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main column */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll fade-in-left">
                                <h2 className="text-2xl font-bold text-[#0E2A47] mb-4 flex items-center">Upcoming Appointments</h2>
                                <div className="space-y-4">
                                    {patientData.upcomingAppointments.map((appt, idx) => (
                                        <div key={idx} className="p-4 bg-teal-50 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-[#0E2A47]">{appt.date} at {appt.time}</p>
                                                <p className="text-gray-600">{appt.doctor} ({appt.specialty})</p>
                                            </div>
                                            <button className="px-4 py-2 text-sm font-medium text-white bg-[#00B5A5] rounded-full hover:bg-[#0E2A47] transition-all">View Details</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll fade-in-right">
                                <h2 className="text-2xl font-bold text-[#0E2A47] mb-4">Medical Records</h2>
                                <ul className="space-y-3">
                                    {patientData.medicalRecords.map((record, idx) => (
                                        <li key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                            <div>
                                                <p className="font-medium text-sm text-[#0E2A47]">{record.name}</p>
                                                <p className="text-xs text-gray-500">{record.date}</p>
                                            </div>
                                            <button className="text-gray-400 hover:text-[#00B5A5]">Download</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Logged Out landing page (Enhanced with Website Theme)
    return (
        <div className="bg-white min-h-screen relative overflow-hidden">
             {/* Ambient Background Glows */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#00B5A5]/10 to-transparent blur-3xl opacity-70" />
                <div className="absolute bottom-[0%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#0E2A47]/5 to-transparent blur-3xl" />
            </div>

            {/* 1. Brand Header Bar */}
            <div className="bg-[#0E2A47] py-4 mt-20 md:mt-0 relative z-10">
                <div className="container mx-auto px-6 lg:px-20">
                    <h1 className="text-white text-xl md:text-2xl font-bold flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-[#00B5A5] rounded-full"></span>
                        Patients & Visitors
                    </h1>
                </div>
            </div>

            {/* 2. Hero Section */}
            <section className="py-16 lg:py-24 bg-white/50 backdrop-blur-sm relative z-10 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        {/* Left Content */}
                        <div className="lg:w-1/2 animate-on-scroll fade-in-left">
                            <h2 className="text-3xl md:text-5xl font-black text-[#0E2A47] leading-tight mb-8">
                                Welcome to our <span className="text-[#00B5A5]">patients' and visitors' portal!</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                A one-stop-forum to comprehensively and preemptively answer all the doubts you have and might have. The information is designed to answer all your initial questions.
                            </p>
                            <p className="text-[#0E2A47] font-bold text-lg mb-6 border-l-4 border-[#00B5A5] pl-4">
                                This portal's prime endeavour is to provide you with distinguished services that are complemented by:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "The global expertise of our medical and non-medical staff",
                                    "State-of-the-art equipment and space",
                                    "Best in class technology and advanced processes",
                                    "Sterling facilities located in the heart of Trichy"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 text-gray-700 bg-white/40 p-3 rounded-xl border border-white/60 hover:border-[#00B5A5]/30 transition-all">
                                        <div className="w-5 h-5 rounded-full bg-[#00B5A5] flex items-center justify-center mt-0.5 flex-shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Content - Full Image */}
                        <div className="lg:w-1/2 relative animate-on-scroll fade-in-right">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-white group">
                                <EditableImage 
                                    configKey="portal.landingHero" 
                                    defaultValue="/Images/patient_portal_hero.png"
                                    alt="Doctor and Patient"
                                    className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/20 to-transparent"></div>
                                
                                {/* Subtle Badge Attachment */}
                                <div className="absolute top-6 left-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
                                     <div className="w-12 h-1.5 bg-[#00B5A5] rounded-full mb-2"></div>
                                     <p className="text-[10px] uppercase font-black tracking-widest text-[#0E2A47]">Patient Care</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Grid Section */}
            <section className="py-24 bg-gray-50/80 relative z-10">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Admissions', Icon: AdmissionsIcon, id: 'admissions' },
                            { label: 'Preparing for Surgery', Icon: SurgeryIcon, id: 'surgery' },
                            { label: 'Emergency & Urgent Care', Icon: EmergencyIcon, id: 'emergency' },
                            { label: 'Patient Safety', Icon: SafetyIcon, id: 'safety' },
                            { label: 'Billing & Insurance', Icon: BillingIcon, id: 'billing' },
                            { label: 'Amenities', Icon: AmenitiesIcon, id: 'amenities' },
                            { label: 'Medical Records', Icon: RecordsIcon, id: 'records' },
                            { label: 'Patient Stories', Icon: StoriesIcon, id: 'stories' },
                            { label: 'Preventive Health Care Packages', Icon: PackagesIcon, id: 'packages' },
                            { label: 'Ask Your Doctor', Icon: DoctorIcon, id: 'ask-doctor' }
                        ].map((item, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => window.location.hash = `#patientservices/${item.id}`}
                                className="group bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,181,165,0.1)] border border-white transition-all duration-500 flex flex-col items-center text-center gap-5 cursor-pointer animate-on-scroll fade-in-up"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                <IconWrapper>
                                    <item.Icon />
                                </IconWrapper>
                                <span className="font-bold text-[#0E2A47] text-sm group-hover:text-[#00B5A5] transition-colors line-clamp-2">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Strip */}
            <div className="bg-[#0E2A47] py-16 relative z-10 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00B5A5_2px,transparent_2px)] [background-size:24px_24px]"></div>
                <div className="container mx-auto px-6 lg:px-20 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Ready to access your health data?</h3>
                            <p className="text-teal-100/70 text-lg">Manage your records and appointments securely.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button 
                                onClick={onLoginClick}
                                className="px-10 py-4 bg-[#00B5A5] text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 hover:bg-[#009489] transition-all hover:-translate-y-1 transform active:scale-95"
                            >
                                Login to Portal
                            </button>
                            <a 
                                href="tel:04440006000" 
                                className="px-10 py-4 bg-white/10 text-white font-black rounded-2xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all hover:-translate-y-1"
                            >
                                Call Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientPortal;
