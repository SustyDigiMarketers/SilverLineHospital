import React, { useContext } from 'react';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import EditableText from '../components/MasterSetup/EditableText';
import PageHero from '../components/PageHero';
import { specialtiesList } from '../lib/specialtiesData';
import EditableImage from '../components/MasterSetup/EditableImage';
import { addMarketingSubmission } from '../lib/auditLogService';

// Icon components for the services section
const EmergencyIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>;
const DiagnosticsIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l.477 2.387a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l2.387-.477a2 2 0 00.547-1.022zM9 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const SurgeryIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.74 9.26c-.47-.47-1.23-.47-1.7 0l-7 7c-.47.47-.47 1.23 0 1.7.47.47 1.23.47 1.7 0l7-7c.47-.47.47-1.23 0-1.7zM16 6l-5 5"></path></svg>;
const CardiologyIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>;
const OrthopedicsIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16.5 6.3c-1-1.5-2.8-2.3-4.5-2.3s-3.5.8-4.5 2.3c-1.8 2.7-1.8 6.7 0 9.4 1 1.5 2.8 2.3 4.5 2.3s3.5-.8 4.5-2.3c1.8-2.7 1.8-6.7 0-9.4zM12 16.5c-1.5 0-2.8-1-3.2-2.5h6.4c-.4 1.5-1.7 2.5-3.2 2.5zM12 7.5c1.5 0 2.8 1 3.2 2.5H8.8c.4-1.5 1.7-2.5 3.2-2.5z"></path></svg>;
const PediatricsIcon: React.FC = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 18a4 4 0 014-4h8a4 4 0 014 4v2H4v-2zM8 9a4 4 0 118 0 4 4 0 01-8 0z"></path></svg>;

const serviceIcons = [
    <EmergencyIcon />,
    <DiagnosticsIcon />,
    <SurgeryIcon />,
    <CardiologyIcon />,
    <OrthopedicsIcon />,
    <PediatricsIcon />,
];

const MarketingPage: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const marketingContent = config.marketing || {};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const submissionData = Object.fromEntries(formData.entries());
        
        addMarketingSubmission(submissionData);

        alert('Thank you for your inquiry! Our team will contact you shortly.');
        form.reset();
    };

    const inputStyles = "block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B5A5] transition";

    return (
        <>
            <PageHero
                title={marketingContent.hero?.title || 'Start Your Journey to Better Health'}
                subtitle={marketingContent.hero?.subtitle || 'Interested in our services? Fill out the form below to get a callback from our patient care coordinator.'}
                backgroundImage={marketingContent.hero?.image || ''}
            />

            <section id="marketing-services" className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="text-center mb-12 animate-on-scroll fade-in-up">
                        <EditableText
                            as="h2"
                            configKey="marketing.services.title"
                            defaultValue={marketingContent.services?.title || ''}
                            className="text-4xl font-bold text-[#0E2A47]"
                        />
                        <EditableText
                            as="p"
                            configKey="marketing.services.subtitle"
                            defaultValue={marketingContent.services?.subtitle || ''}
                            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(marketingContent.services?.items || []).map((service: any, index: number) => (
                            <div 
                                key={index} 
                                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00B5A5] to-[#0E2A47] shadow-lg mb-6">
                                    {serviceIcons[index % serviceIcons.length]}
                                </div>
                                <EditableText
                                    as="h3"
                                    configKey={`marketing.services.items[${index}].title`}
                                    defaultValue={service.title || ''}
                                    className="text-xl font-bold text-[#0E2A47] mb-3"
                                />
                                <EditableText
                                    as="p"
                                    configKey={`marketing.services.items[${index}].description`}
                                    defaultValue={service.description || ''}
                                    className="text-gray-600 leading-relaxed"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section id="marketing-form-section" className="py-20 bg-white">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="bg-gray-50 rounded-2xl shadow-lg border border-gray-200 animate-on-scroll fade-in-up overflow-hidden">
                       <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Form Column */}
                            <div className="p-8">
                                <div className="text-center lg:text-left mb-8">
                                    <EditableText
                                        as="h2"
                                        configKey="marketing.form.title"
                                        defaultValue={marketingContent.form?.title || ''}
                                        className="text-3xl font-bold text-[#0E2A47]"
                                    />
                                    <EditableText
                                        as="p"
                                        configKey="marketing.form.subtitle"
                                        defaultValue={marketingContent.form?.subtitle || ''}
                                        className="mt-2 text-gray-600"
                                    />
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
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
                                            <input type="tel" id="mobile" name="mobile" required className={inputStyles} placeholder="(555) 123-4567" />
                                        </div>
                                        <div>
                                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number <span className="text-gray-500">(Optional)</span></label>
                                            <input type="tel" id="whatsapp" name="whatsapp" className={inputStyles} placeholder="(555) 123-4567" />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input type="text" id="city" name="city" required className={inputStyles} placeholder="e.g., Wellness City" />
                                        </div>
                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                            <input type="text" id="state" name="state" required className={inputStyles} placeholder="e.g., California" />
                                        </div>
                                        <div>
                                            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service of Interest</label>
                                            <select id="service" name="service" required className={inputStyles}>
                                                <option value="">Select a service...</option>
                                                {specialtiesList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">Where did you hear about us?</label>
                                            <select id="platform" name="platform" required className={inputStyles}>
                                                <option value="">Select an option...</option>
                                                <option value="Google">Google</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Instagram">Instagram</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="Referral">Friend/Referral</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message <span className="text-gray-500">(Optional)</span></label>
                                        <textarea id="message" name="message" rows={3} className={inputStyles} placeholder="Tell us how we can help..."></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full px-6 py-4 font-semibold text-white bg-[#0E2A47] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E2A47]">
                                            <EditableText
                                                as="span"
                                                configKey="marketing.form.buttonText"
                                                defaultValue={marketingContent.form?.buttonText || ''}
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Image Column */}
                            <div className="hidden lg:block">
                                <EditableImage
                                    configKey="marketing.form.image"
                                    alt="A friendly patient care coordinator ready to help"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                       </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MarketingPage;