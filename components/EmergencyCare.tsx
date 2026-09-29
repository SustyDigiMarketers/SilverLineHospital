import React from 'react';
import EditableText from './MasterSetup/EditableText';
import SEO from './SEO';
import { generateBreadcrumbSchema, HOSPITAL_NAP } from '../lib/seoConfig';

const EmergencyCare: React.FC = () => {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Emergency Care', url: '/emergency' }
    ]);

    const emergencySchema = {
        "@context": "https://schema.org",
        "@type": "EmergencyService",
        "name": "SilverLine 24/7 Emergency & Trauma Care",
        "description": "24/7 emergency casualty, polytrauma resuscitation, cardiac golden hour intervention, acute stroke care, and ICU ambulance service in Trichy.",
        "url": `${HOSPITAL_NAP.url}/emergency`,
        "telephone": [HOSPITAL_NAP.telephone, HOSPITAL_NAP.emergencyPhone],
        "openingHours": "Mo-Su 00:00-23:59",
        "address": HOSPITAL_NAP.address,
        "geo": HOSPITAL_NAP.geo
    };

    return (
        <>
            <SEO
                title="24/7 Emergency & Trauma Care Hospital in Trichy | SilverLine Hospital"
                description="24/7 Emergency casualty, polytrauma resuscitation, primary angioplasty, and acute stroke response at SilverLine Hospital Trichy. Call 0431-2906470 or +91 96773 36097."
                keywords="emergency hospital trichy, 24 hours hospital trichy, trauma care trichy, casualty trichy, ambulance trichy, heart attack emergency trichy"
                canonical="/emergency"
                schema={[emergencySchema, breadcrumbs]}
            />
            <section id="emergency" className="py-20 pt-40 bg-gray-50 min-h-screen">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                    <div className="text-center mb-12 animate-on-scroll fade-in-up">
                        <EditableText
                          as="h1"
                          configKey="emergency.title"
                          defaultValue="Emergency Care"
                          className="text-5xl font-bold text-red-600"
                        />
                        <EditableText
                          as="p"
                          configKey="emergency.subtitle"
                          defaultValue="“Every Second Saved is a Life Protected”"
                          className="mt-4 text-xl text-gray-700"
                        />
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-xl animate-on-scroll fade-in-up" style={{ '--stagger-delay': '150ms' } as React.CSSProperties}>
                        <EditableText
                          as="h2"
                          configKey="emergency.infoBox.title"
                          defaultValue="In Case of an Emergency"
                          className="text-3xl font-bold text-[#0E2A47] mb-6"
                        />
                        
                        <EditableText
                          as="p"
                          configKey="emergency.infoBox.description"
                          defaultValue="Our 24/7 Emergency Department is built for rapid response and critical care excellence. With expert emergency physicians, advanced life-support systems, and seamless access to diagnostics and specialists, we ensure immediate intervention for trauma, cardiac emergencies, stroke, and more—when time matters the most."
                          className="text-lg text-gray-600 mb-4"
                        />
                        
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                            <div>
                                <h3 className="text-xl font-semibold text-[#0E2A47] mb-3">Our Emergency Services Include:</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>24/7 Level I Polytrauma Resuscitation</li>
                                    <li>Acute Chest Pain & Golden-Hour Cath Lab Activation</li>
                                    <li>Rapid Stroke Thrombolysis Protocol</li>
                                    <li>24-hour Diagnostic Imaging (CT/X-Ray) & Lab</li>
                                    <li>Pediatric & Neonatal Emergency Care</li>
                                    <li>GPS-Enabled Advanced Life Support (ACLS) Ambulances</li>
                                </ul>
                            </div>
                             <div>
                                <h3 className="text-xl font-semibold text-[#0E2A47] mb-3">Contact Information</h3>
                                 <p className="flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <span>
                                        <span className="font-bold">Emergency Helpline: </span>
                                        <a href="tel:04312906470" className="font-bold underline hover:text-gray-900 transition-colors">0431-2906470 / 71</a>
                                    </span>
                                  </p>
                                  <p className="flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                    <span>
                                        <span className="font-bold">24/7 Mobile: </span>
                                        <a href="tel:9677336097" className="font-bold underline hover:text-gray-900 transition-colors">+91 96773 36097</a>
                                    </span>
                                  </p>
                                  <p className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <span>No: 3/332, Chennai National Highways, Palur, Trichy. (Emergency Casualty Entrance)</span>
                                  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmergencyCare;
