import React from 'react';
import EditableText from '../components/MasterSetup/EditableText';
import { mockPatients } from '../lib/patientData';
import EditableImage from '../components/MasterSetup/EditableImage';

// --- Mock Data is now in lib/patientData.ts ---


// SVG Icons for different UI elements
const CalendarIcon = () => <svg className="w-6 h-6 mr-3 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const MessageIcon = () => <svg className="w-6 h-6 mr-3 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
const RecordIcon = ({ type }: { type: string }) => {
    let path;
    switch (type) {
        case 'Lab Result': path = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"; break;
        case 'Imaging': path = "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"; break;
        default: path = "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";
    }
    return <svg className="w-6 h-6 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path></svg>;
};
const DownloadIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>;

interface PatientPortalProps {
    patientId: string | null;
    onLoginClick: () => void;
}

const PatientPortal: React.FC<PatientPortalProps> = ({ patientId, onLoginClick }) => {
    const patientData = patientId ? mockPatients[patientId] : null;

    if (!patientData) {
        return (
             <section id="patientportal-login-prompt" className="py-20 pt-40 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center p-12 bg-white rounded-xl shadow-2xl max-w-lg mx-auto animate-on-scroll fade-in-up">
                    <svg className="w-16 h-16 mx-auto text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <h1 className="mt-6 text-3xl font-bold text-[#0E2A47]">Patient Portal Access</h1>
                    <p className="mt-4 text-lg text-gray-600">Please log in with your Patient ID to access your personal health dashboard.</p>
                    <p className="mt-2 text-sm text-gray-500">
                        If you do not have a Patient ID, please contact our reception.
                    </p>
                    <button 
                        onClick={onLoginClick}
                        className="mt-8 px-8 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl hover:shadow-teal-400/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                    >
                        Login to Portal
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
            <section 
                className="relative h-screen flex items-center text-white overflow-hidden"
            >
                <div className="fixed top-0 left-0 w-full h-full -z-10">
                    <EditableImage
                        configKey="imagePaths.about.hero3"
                        alt={`Welcome to the Patient Portal, ${patientData.name}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
                    <h1 className="text-5xl md:text-6xl font-bold">
                        <EditableText as="span" configKey="portal.heroWelcome" defaultValue="Welcome, " />
                        {patientData.name}
                    </h1>
                    <EditableText
                        as="p"
                        configKey="portal.heroSubtitle"
                        defaultValue="This is your personal health dashboard, where you can manage your appointments, view medical records, and communicate securely with your care team."
                        className="mt-4 text-lg text-gray-200 max-w-2xl"
                    />
                </div>
            </section>

            <section id="patientportal-dashboard" className="relative py-20 bg-gray-50 min-h-screen">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-12 animate-on-scroll fade-in-up">
                        <h1 className="text-4xl font-bold text-[#0E2A47]">
                            <EditableText as="span" configKey="portal.dashboardTitle" defaultValue="Your Dashboard" />
                        </h1>
                        <EditableText
                          as="p"
                          configKey="portal.dashboardSubtitle"
                          defaultValue="Here is an overview of your health information."
                          className="mt-2 text-lg text-gray-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Upcoming Appointments */}
                            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll fade-in-left">
                                <h2 className="text-2xl font-bold text-[#0E2A47] mb-4 flex items-center"><CalendarIcon />Upcoming Appointments</h2>
                                <div className="space-y-4">
                                    {patientData.upcomingAppointments.length > 0 ? patientData.upcomingAppointments.map((appt, index) => (
                                        <div key={index} className="p-4 bg-blue-50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <div>
                                                <p className="font-bold text-[#0E2A47]">{appt.date} at {appt.time}</p>
                                                <p className="text-gray-600">with {appt.doctor} ({appt.specialty})</p>
                                            </div>
                                            <button 
                                                className="mt-2 sm:mt-0 px-4 py-2 text-sm font-medium text-white bg-[#0E2A47] rounded-full transition-colors hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                                                aria-label={`View details for your appointment on ${appt.date} with ${appt.doctor}`}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    )) : <p className="text-gray-500">No upcoming appointments.</p>}
                                </div>
                            </div>

                            {/* Appointment History */}
                            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll fade-in-left" style={{'--stagger-delay': '100ms'} as React.CSSProperties}>
                                <h2 className="text-2xl font-bold text-[#0E2A47] mb-4">Appointment History</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="border-b-2 border-gray-200">
                                            <tr>
                                                <th className="py-2 px-4 font-semibold text-gray-600">Date</th>
                                                <th className="py-2 px-4 font-semibold text-gray-600">Doctor</th>
                                                <th className="py-2 px-4 font-semibold text-gray-600">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patientData.appointmentHistory.map((appt, index) => (
                                                <tr key={index} className="border-b border-gray-100">
                                                    <td className="py-3 px-4 text-gray-700">{appt.date}</td>
                                                    <td className="py-3 px-4 text-gray-700">{appt.doctor} <span className="text-sm text-gray-500">({appt.specialty})</span></td>
                                                    <td className="py-3 px-4 text-gray-700">{appt.details}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar column */}
                        <div className="space-y-8">
                            {/* Secure Messaging */}
                            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll fade-in-right">
                                <h2 className="text-2xl font-bold text-[#0E2A47] mb-4 flex items-center"><MessageIcon />Secure Messages</h2>
                                <div className="space-y-3">
                                    {patientData.messages.length > 0 ? patientData.messages.map((msg, index) => (
                                        <div key={index} className={`p-3 rounded-md flex justify-between items-center ${!msg.isRead ? 'bg-teal-50 border-l-4 border-teal-400' : 'bg-gray-50'}`}>
                                            <div>
                                                {!msg.isRead && <span className="sr-only">Unread message:</span>}
                                                <p className="font-semibold text-sm text-[#0E2A47]">{msg.from}</p>
                                                <p className="text-sm text-gray-600">{msg.snippet}</p>
                                            </div>
                                            {!msg.isRead && <span className="w-3 h-3 bg-teal-500 rounded-full flex-shrink-0 ml-2" aria-hidden="true"></span>}
                                        </div>
                                    )) : <p className="text-gray-500 text-sm">No new messages.</p>}
                                </div>
                                 <button className="mt-4 w-full px-4 py-2 font-medium text-white bg-[#00B5A5] rounded-full transition-colors hover:bg-[#0E2A47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E2A47]">
                                    New Message
                                </button>
                            </div>

                            {/* Medical Records */}
                            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll fade-in-right" style={{'--stagger-delay': '100ms'} as React.CSSProperties}>
                                <h2 className="text-2xl font-bold text-[#0E2A47] mb-4">Medical Records</h2>
                                <ul className="space-y-3">
                                    {patientData.medicalRecords.length > 0 ? patientData.medicalRecords.map((record, index) => (
                                        <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                            <div className="flex items-center">
                                                <RecordIcon type={record.type} />
                                                <div>
                                                    <p className="font-medium text-sm text-[#0E2A47]">{record.name}</p>
                                                    <p className="text-xs text-gray-500">{record.date}</p>
                                                </div>
                                            </div>
                                            <button aria-label={`Download ${record.name}`} className="p-2 text-gray-500 hover:text-[#00B5A5] rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#00B5A5]">
                                                <DownloadIcon />
                                            </button>
                                        </li>
                                    )) : <p className="text-gray-500 text-sm">No records available.</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PatientPortal;