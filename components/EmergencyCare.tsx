import React from 'react';
import EditableText from './MasterSetup/EditableText';

const EmergencyCare: React.FC = () => {
    return (
        <section id="emergency" className="py-20 pt-40 bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                <div className="text-center mb-12 animate-on-scroll fade-in-up">
                    <EditableText
                      as="h1"
                      configKey="emergency.title"
                      defaultValue="24/7 Emergency & Critical Care"
                      className="text-5xl font-bold text-red-600"
                    />
                    <EditableText
                      as="p"
                      configKey="emergency.subtitle"
                      defaultValue="Immediate medical attention when you need it most."
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
                      defaultValue="If you are experiencing a life-threatening medical emergency, please call <a href='tel:911' class='text-red-600 font-bold underline hover:text-red-700 transition-colors'>911</a> immediately or visit your nearest emergency room."
                      className="text-lg text-gray-600 mb-4"
                    />
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                        <div>
                            <h3 className="text-xl font-semibold text-[#0E2A47] mb-3">Our Emergency Services Include:</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Level I Trauma Center</li>
                                <li>Comprehensive Stroke Center</li>
                                <li>24-hour Diagnostic Imaging & Lab</li>
                                <li>Pediatric Emergency Care</li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold text-[#0E2A47] mb-3">Contact Information</h3>
                             <p className="flex items-center mb-2">
                                <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span>
                                    <span className="font-bold">Emergency Line: </span>
                                    <a href="tel:1234567890" className="font-bold underline hover:text-gray-900 transition-colors">(123) 456-7890</a>
                                </span>
                              </p>
                              <p className="flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>No: 3/332, Chennai National Highways, Palur, Trichy. (Emergency Entrance)</span>
                              </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmergencyCare;