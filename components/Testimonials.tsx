import React, { useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import EditableText from './MasterSetup/EditableText';

const Testimonials: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const testimonials = config.testimonials?.items || [];

    return (
        <section id="testimonials" className="py-24 bg-white">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Title and Content */}
                    <div className="animate-on-scroll fade-in-left">
                        <EditableText
                            as="h3"
                            configKey="testimonials.subtitle"
                            defaultValue="PATIENT STORIES"
                            className="text-sm font-bold text-[#00B5A5] uppercase tracking-wider mb-4"
                        />
                        <EditableText
                            as="h2"
                            configKey="testimonials.title"
                            defaultValue="What Our Patients Say"
                            className="text-4xl font-bold text-[#0E2A47] !leading-tight mb-6"
                        />
                        <EditableText
                            as="p"
                            configKey="specialtiesPage.testimonialSection.description" // Reusing description for consistency
                            defaultValue="Our commitment to excellence is reflected in the positive experiences of our patients. We are dedicated to providing compassionate, personalized care that meets the unique needs of every individual we serve. Read what our patients have to say about their journey with us."
                            className="text-gray-600 leading-relaxed"
                        />
                    </div>

                    {/* Right Column: Scrolling Testimonials */}
                    <div className="relative h-[450px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                        <div className="flex flex-col animate-marquee-y group-hover:[animation-play-state:paused]">
                            {/* Duplicate testimonials for seamless loop */}
                            {testimonials.length > 0 && [...testimonials, ...testimonials].map((testimonial: any, index: number) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg p-6 mb-6 flex-shrink-0 border">
                                    <div className="mb-4">
                                        <p className="font-bold text-lg text-[#0E2A47]">{testimonial.name}</p>
                                        <div className="flex mt-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;