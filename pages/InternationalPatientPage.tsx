import React, { useContext } from 'react';
import PageHero from '../components/PageHero';
import EditableText from '../components/MasterSetup/EditableText';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import { addInternationalSubmission } from '../lib/auditLogService';

// Reusable icon components
const VisaIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1M9 14h6" /></svg>;
const AirportIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h8a2 2 0 012 2v2.5a2.5 2.5 0 01-2.5 2.5h-1a2.5 2.5 0 00-2.5 2.5V19m-3-9.5V21m3-11.5H5.021a2 2 0 01-1.995-1.858L2.5 3.021m16.5 0L14 11.5" /></svg>;
const AccommodationIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const InterpreterIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h1m6 4h.01M9 12h.01" /></svg>;
const CoordinatorIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const TelehealthIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

const serviceIcons = [
    <VisaIcon />, <AirportIcon />, <AccommodationIcon />, <InterpreterIcon />, <CoordinatorIcon />, <TelehealthIcon />
];


const InternationalPatientPage: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const content = config.internationalPatientPage || {};
    const journeySteps = content.journey?.steps || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const submissionData = Object.fromEntries(formData.entries());

        addInternationalSubmission(submissionData);

        alert('Thank you for your inquiry! Our international patient coordinator will contact you shortly.');
        form.reset();
    };
    
    const inputStyles = "block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B5A5] transition";

    return (
        <>
            <PageHero
                title={content.hero?.title || ''}
                subtitle={content.hero?.subtitle || ''}
                backgroundImage={content.hero?.image || ''}
            />

            {/* Services Section */}
            <section id="international-services" className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="text-center mb-12 animate-on-scroll fade-in-up">
                        <EditableText as="h2" configKey="internationalPatientPage.services.title" defaultValue={content.services?.title || ''} className="text-4xl font-bold text-[#0E2A47]" />
                        <EditableText as="p" configKey="internationalPatientPage.services.subtitle" defaultValue={content.services?.subtitle || ''} className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(content.services?.items || []).map((service: any, index: number) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00B5A5] to-[#0E2A47] shadow-lg mb-6">
                                    {serviceIcons[index % serviceIcons.length]}
                                </div>
                                <EditableText as="h3" configKey={`internationalPatientPage.services.items[${index}].title`} defaultValue={service.title || ''} className="text-xl font-bold text-[#0E2A47] mb-3" />
                                <EditableText as="p" configKey={`internationalPatientPage.services.items[${index}].description`} defaultValue={service.description || ''} className="text-gray-600 leading-relaxed" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Journey Section */}
            <section id="journey" className="py-20 bg-white">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                    <div className="text-center mb-16 animate-on-scroll fade-in-up">
                        <EditableText as="h2" configKey="internationalPatientPage.journey.title" defaultValue={content.journey?.title || ''} className="text-4xl font-bold text-[#0E2A47]" />
                        <EditableText as="p" configKey="internationalPatientPage.journey.subtitle" defaultValue={content.journey?.subtitle || ''} className="mt-4 text-lg text-gray-600" />
                    </div>
                    <div className="relative">
                        <div className="absolute top-0 h-full w-0.5 bg-gray-200 left-8 md:left-1/2 md:-translate-x-1/2"></div>
                        <div className="space-y-16">
                            {journeySteps.map((step: any, index: number) => (
                                <div key={index} className="relative flex items-start">
                                    <div className="absolute top-0 left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-[#00B5A5] rounded-full border-8 border-white z-10 flex items-center justify-center font-bold text-2xl text-white">{index + 1}</div>
                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:ml-auto md:pl-16'} pl-24 md:pl-0`}>
                                        <div className={`pt-20 md:pt-0 ${index % 2 === 0 ? 'md:text-right' : 'text-left'}`}>
                                            <EditableText as="h3" configKey={`internationalPatientPage.journey.steps[${index}].title`} defaultValue={step.title || ''} className="text-2xl font-bold text-[#0E2A47]" />
                                            <EditableText as="p" configKey={`internationalPatientPage.journey.steps[${index}].description`} defaultValue={step.description || ''} className="text-gray-600 mt-2" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Inquiry Form Section */}
            <section id="international-form" className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <EditableText as="h2" configKey="internationalPatientPage.form.title" defaultValue={content.form?.title || ''} className="text-4xl font-bold text-[#0E2A47]" />
                        <EditableText as="p" configKey="internationalPatientPage.form.subtitle" defaultValue={content.form?.subtitle || ''} className="mt-4 text-lg text-gray-600" />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input type="text" id="name" name="name" required className={inputStyles} placeholder="John Doe" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" id="email" name="email" required className={inputStyles} placeholder="you@example.com" />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                <input type="tel" id="mobile" name="mobile" required className={inputStyles} placeholder="+1 (555) 123-4567" />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
                                <input type="text" id="country" name="country" required className={inputStyles} placeholder="e.g., Canada" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea id="message" name="message" rows={4} className={inputStyles} placeholder="Briefly describe your medical condition and the services you are interested in..."></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full px-6 py-4 font-semibold text-white bg-[#0E2A47] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E2A47]">
                                <EditableText as="span" configKey="internationalPatientPage.form.buttonText" defaultValue={content.form?.buttonText || ''} />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default InternationalPatientPage;