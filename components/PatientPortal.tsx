import React, { useState } from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { mockPatients } from '../lib/patientData';
import { standbyImages } from '../data/images';

// --- Medical Line-Art & Vector SVG Assets ---
const PulseHeartbeatIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2.5-6 4 12 2.5-6h5" />
  </svg>
);

const HealthShieldIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const SecureLockIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4M12 15v2" />
  </svg>
);

const StethoscopeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5a4 4 0 008 0V4M8 13v3a4 4 0 008 0v-1" />
    <circle cx="16" cy="15" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4H2m10 0h-2" />
  </svg>
);

const DigitalClipboardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const MedicalFolderIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6m-3-3h6" />
  </svg>
);

const AppointmentIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const EmergencyPhoneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a4 4 0 014 4m-4-8a8 8 0 018 8" />
  </svg>
);

const DischargeSummaryIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

interface PatientPortalProps {
  patientId: string | null;
  onLoginClick: () => void;
}

const PatientPortal: React.FC<PatientPortalProps> = ({ patientId, onLoginClick }) => {
  const patientData = patientId ? mockPatients[patientId] : null;
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'records'>('overview');

  // Logged-in view
  if (patientData) {
    return (
      <div className="bg-slate-50 min-h-screen pt-28 pb-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-[#0E2A47] to-[#163B66] rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B5A5]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-teal-300 mb-3 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#00B5A5] animate-pulse" />
                  Verified Patient Portal
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                  Welcome, {patientData.name}
                </h1>
                <p className="text-slate-300 mt-1 text-sm sm:text-base">
                  Patient ID: <span className="font-mono font-semibold text-[#00B5A5]">{patientId}</span> • Registered Mobile: {patientData.mobile}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#appointment"
                  className="px-5 py-2.5 bg-[#00B5A5] hover:bg-[#009489] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <AppointmentIcon className="w-4 h-4" />
                  Book Appointment
                </a>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-sm border border-white/20 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex gap-4 mt-8 border-t border-white/10 pt-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 text-sm font-semibold border-b-2 transition-all ${activeTab === 'overview' ? 'border-[#00B5A5] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`pb-2 text-sm font-semibold border-b-2 transition-all ${activeTab === 'appointments' ? 'border-[#00B5A5] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Upcoming Appointments ({patientData.upcomingAppointments?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('records')}
                className={`pb-2 text-sm font-semibold border-b-2 transition-all ${activeTab === 'records' ? 'border-[#00B5A5] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Medical Reports ({patientData.medicalRecords?.length || 0})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              {(activeTab === 'overview' || activeTab === 'appointments') && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-[#0E2A47] flex items-center gap-2.5">
                      <AppointmentIcon className="w-5 h-5 text-[#00B5A5]" />
                      Scheduled Appointments
                    </h2>
                    <a href="#appointment" className="text-sm font-semibold text-[#00B5A5] hover:underline">
                      + New Booking
                    </a>
                  </div>

                  {patientData.upcomingAppointments && patientData.upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {patientData.upcomingAppointments.map((appt, idx) => (
                        <div key={idx} className="p-4 bg-teal-50/60 rounded-xl border border-teal-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#00B5A5] uppercase tracking-wider mb-1">
                              <span>Confirmed</span> • <span>Room 204</span>
                            </div>
                            <p className="font-bold text-[#0E2A47] text-base">{appt.doctor}</p>
                            <p className="text-sm text-slate-600">{appt.specialty}</p>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                              📅 {appt.date} at {appt.time}
                            </p>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <a
                              href="tel:04440006000"
                              className="px-4 py-2 text-xs font-semibold text-[#0E2A47] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-center flex-1 sm:flex-initial"
                            >
                              Call Desk
                            </a>
                            <a
                              href="#appointment"
                              className="px-4 py-2 text-xs font-semibold text-white bg-[#00B5A5] rounded-lg hover:bg-[#009489] transition-all text-center flex-1 sm:flex-initial"
                            >
                              Reschedule
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 py-6 text-center">No upcoming appointments found.</p>
                  )}
                </div>
              )}

              {/* Medical Reports */}
              {(activeTab === 'overview' || activeTab === 'records') && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-[#0E2A47] flex items-center gap-2.5">
                      <DigitalClipboardIcon className="w-5 h-5 text-[#00B5A5]" />
                      Laboratory & Diagnostic Reports
                    </h2>
                  </div>

                  {patientData.medicalRecords && patientData.medicalRecords.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {patientData.medicalRecords.map((record, idx) => (
                        <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#00B5A5] flex-shrink-0 mt-0.5">
                              <MedicalFolderIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-[#0E2A47]">{record.name}</p>
                              <p className="text-xs text-slate-400">Date: {record.date}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => alert(`Report downloaded: ${record.name}`)}
                            className="px-3 py-1.5 text-xs font-semibold text-[#00B5A5] bg-teal-50/80 hover:bg-[#00B5A5] hover:text-white rounded-lg transition-all"
                          >
                            Download PDF
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 py-6 text-center">No diagnostic records available.</p>
                  )}
                </div>
              )}
            </div>

            {/* Right Column / Quick Help Desk */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-[#0E2A47] text-base mb-4 flex items-center gap-2">
                  <HealthShieldIcon className="w-5 h-5 text-[#00B5A5]" />
                  Patient Support & Quick Help
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:04440006000"
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#00B5A5] group-hover:scale-110 transition-transform">
                      <EmergencyPhoneIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0E2A47]">Hospital Help Desk</p>
                      <p className="text-xs text-slate-500">044 4000 6000 (24/7)</p>
                    </div>
                  </a>

                  <a
                    href="#contact"
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#00B5A5] group-hover:scale-110 transition-transform">
                      <DischargeSummaryIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0E2A47]">Discharge Summary Request</p>
                      <p className="text-xs text-slate-500">Records & Claims Dept</p>
                    </div>
                  </a>

                  <a
                    href="#ask-doctor"
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#00B5A5] group-hover:scale-110 transition-transform">
                      <StethoscopeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0E2A47]">Doctor Follow-up Query</p>
                      <p className="text-xs text-slate-500">Direct query to care team</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* HIPAA / Security Notice */}
              <div className="bg-gradient-to-br from-slate-900 to-[#0E2A47] rounded-2xl p-5 text-white shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-[#00B5A5]">
                  <SecureLockIcon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Encrypted Portal</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your medical records, diagnostic reports, and personal health information are protected under strict patient privacy standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged-out state — Refined, Modern, Professional Healthcare Design
  return (
    <div className="bg-slate-50/50 min-h-screen relative overflow-hidden">
      {/* 1. Hospital Brand Header Bar */}
      <div className="bg-[#0E2A47] py-4 mt-20 md:mt-0 relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center">
          <h1 className="text-white text-lg sm:text-xl font-bold flex items-center gap-2.5">
            <span className="w-1.5 h-6 bg-[#00B5A5] rounded-full"></span>
            Patient & Visitor Care Portal
          </h1>
          <button
            onClick={onLoginClick}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00B5A5] hover:bg-[#009489] text-white rounded-lg text-xs font-bold shadow-md transition-all"
          >
            <SecureLockIcon className="w-3.5 h-3.5" />
            Patient Sign In
          </button>
        </div>
      </div>

      {/* 2. Elevated Hero Section */}
      <section className="py-12 lg:py-20 relative z-10 overflow-hidden">
        {/* Subtle Ambient Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B5A5]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0E2A47]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* Left Content */}
            <div className="lg:w-7/12 animate-on-scroll fade-in-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00B5A5] text-xs font-bold uppercase tracking-wider mb-4">
                <PulseHeartbeatIcon className="w-4 h-4 text-[#00B5A5]" />
                Connected Healthcare Portal
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A47] leading-tight mb-5">
                Compassionate Care, <span className="text-[#00B5A5]">Seamless Access</span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Welcome to SilverLine Hospital's digital patient forum — an integrated, secure space to access your medical history, manage appointments, download diagnostic records, and coordinate follow-up care with your medical team.
              </p>

              {/* Portal Gateway / Login Launcher Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-teal-100/80 mb-8 max-w-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#00B5A5] flex-shrink-0">
                      <SecureLockIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0E2A47] text-base">Registered Patient Sign In</h3>
                      <p className="text-xs text-slate-500">Access lab records, prescriptions, and consult follow-ups</p>
                    </div>
                  </div>
                  <button
                    onClick={onLoginClick}
                    className="w-full sm:w-auto px-6 py-3 bg-[#00B5A5] hover:bg-[#009489] text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 text-center text-sm"
                  >
                    Open Portal Login
                  </button>
                </div>
              </div>

              {/* Value Propositions with Vector Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: HealthShieldIcon, text: "NABH compliant security standards" },
                  { icon: StethoscopeIcon, text: "Direct consultant follow-up pathways" },
                  { icon: DigitalClipboardIcon, text: "Instant diagnostic PDF record access" },
                  { icon: EmergencyPhoneIcon, text: "24/7 Rapid Emergency coordination" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/70 text-slate-700 text-xs sm:text-sm font-medium">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#00B5A5] flex-shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Visual Hero Card */}
            <div className="lg:w-5/12 relative animate-on-scroll fade-in-right w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <EditableImage
                  configKey="portal.landingHero"
                  src={standbyImages.patientsVisitors}
                  defaultValue={standbyImages.patientsVisitors}
                  alt="Doctor and Patient Care"
                  className="w-full h-[420px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/80 via-[#0E2A47]/20 to-transparent"></div>
                
                {/* Floating Info Pill */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#00B5A5] text-xs font-bold mb-0.5">
                      <PulseHeartbeatIcon className="w-3.5 h-3.5" />
                      Patient First Always
                    </div>
                    <p className="text-xs text-[#0E2A47] font-semibold">Center of Excellence in Central Tamil Nadu</p>
                  </div>
                  <a
                    href="tel:04440006000"
                    className="px-3 py-1.5 bg-[#0E2A47] text-white rounded-lg text-xs font-bold hover:bg-[#00B5A5] transition-colors"
                  >
                    Support
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRIMARY QUICK ACTIONS (Elevated 5 Core Healthcare Actions) */}
      <section className="py-12 bg-white relative z-10 border-y border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A47]">Essential Quick Actions</h2>
            <p className="text-slate-500 text-sm mt-2">Direct access to the most requested healthcare services and departments</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Book / View Appointments",
                subtitle: "Schedule with 29+ Specialists",
                icon: AppointmentIcon,
                action: () => (window.location.hash = "#appointment"),
                highlight: true
              },
              {
                title: "Lab Reports & Records",
                subtitle: "Download Test Results",
                icon: DigitalClipboardIcon,
                action: onLoginClick,
                highlight: false
              },
              {
                title: "Discharge Summary",
                subtitle: "Request Medical Summaries",
                icon: DischargeSummaryIcon,
                action: () => (window.location.hash = "#contact"),
                highlight: false
              },
              {
                title: "Doctor Follow-up",
                subtitle: "Post-Consultation Guidance",
                icon: StethoscopeIcon,
                action: () => (window.location.hash = "#doctors"),
                highlight: false
              },
              {
                title: "Emergency Help Desk",
                subtitle: "24/7 Rapid Assistance",
                icon: EmergencyPhoneIcon,
                action: () => (window.location.href = "tel:04440006000"),
                highlight: false
              }
            ].map((action, idx) => (
              <div
                key={idx}
                onClick={action.action}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    action.action();
                  }
                }}
                aria-label={action.title}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-start group hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00B5A5] ${
                  action.highlight
                    ? "bg-gradient-to-b from-teal-500 to-[#00B5A5] text-white border-[#00B5A5] shadow-lg shadow-teal-500/20 hover:border-teal-400"
                    : "bg-slate-50 hover:bg-white hover:border-[#00B5A5]/50 border-slate-200/80 text-[#0E2A47]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    action.highlight ? "bg-white/20 text-white" : "bg-teal-50 text-[#00B5A5]"
                  }`}
                >
                  <action.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm leading-tight mb-1">{action.title}</h3>
                <p className={`text-xs ${action.highlight ? "text-teal-100" : "text-slate-500"}`}>{action.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE PATIENT & VISITOR SERVICES DIRECTORY */}
      <section className="py-16 bg-slate-50/70 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A47]">Patient & Visitor Services</h2>
            <p className="text-slate-500 text-sm mt-2">Everything you need to know for a comfortable hospital stay</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { label: 'Admissions & Inpatients', id: 'admissions', icon: DigitalClipboardIcon },
              { label: 'Preparing for Surgery', id: 'surgery', icon: PulseHeartbeatIcon },
              { label: 'Emergency Care 24/7', id: 'emergency', icon: EmergencyPhoneIcon },
              { label: 'Patient Safety Protocols', id: 'safety', icon: HealthShieldIcon },
              { label: 'Billing & TPA Insurance', id: 'billing', icon: DischargeSummaryIcon },
              { label: 'Amenities & Rooms', id: 'amenities', icon: MedicalFolderIcon },
              { label: 'Medical Records Dept', id: 'records', icon: DigitalClipboardIcon },
              { label: 'Patient Testimonials', id: 'stories', icon: PulseHeartbeatIcon },
              { label: 'Preventive Health Packages', id: 'packages', icon: HealthShieldIcon },
              { label: 'Ask Your Doctor', id: 'ask-doctor', icon: StethoscopeIcon }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  window.history.pushState({}, '', `/patientservices/${item.id}`);
                  window.dispatchEvent(new Event('popstate'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200/70 hover:border-[#00B5A5]/30 transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00B5A5] flex items-center justify-center group-hover:bg-[#00B5A5] group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-[#0E2A47] text-xs sm:text-sm group-hover:text-[#00B5A5] transition-colors line-clamp-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PORTAL CALL TO ACTION STRIP */}
      <div className="bg-[#0E2A47] py-14 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-[#00B5A5] text-xs font-bold uppercase tracking-wider mb-2">
                <SecureLockIcon className="w-4 h-4" />
                Secure Patient Record Gateway
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Need to access your hospital records?</h3>
              <p className="text-slate-300 text-sm mt-1">Sign in with your registered Patient ID and Mobile Number.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onLoginClick}
                className="px-8 py-3.5 bg-[#00B5A5] text-white font-bold rounded-xl shadow-lg hover:bg-[#009489] transition-all hover:-translate-y-0.5 text-sm"
              >
                Sign In to Portal
              </button>
              <a
                href="tel:04440006000"
                className="px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm"
              >
                Help Desk: 044 4000 6000
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
