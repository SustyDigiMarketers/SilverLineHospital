import React from 'react';
import EditableText from './MasterSetup/EditableText';
import { insuranceLogos } from '../lib/insuranceManifest';

const InsurancePartners: React.FC = () => {
    const logos = insuranceLogos && insuranceLogos.length > 0 ? insuranceLogos : [];

    if (logos.length === 0) {
        return null;
    }

    return (
        <section id="insurance-partners" className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-12 animate-on-scroll fade-in-up">
                    <EditableText
                        as="h2"
                        configKey="packages.insuranceSection.title"
                        defaultValue="Our Trusted Insurance Partners"
                        className="text-4xl font-bold text-[#0E2A47]"
                    />
                    <EditableText
                        as="p"
                        configKey="packages.insuranceSection.subtitle"
                        defaultValue="We partner with a wide range of insurance providers to make your healthcare journey as seamless as possible. For specific questions about your coverage, please contact our billing department."
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                    />
                </div>
                <div className="relative group overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                        {[...logos, ...logos].map((logoUrl, index) => (
                            <div key={index} className="flex-shrink-0 w-36 mx-0 flex items-center justify-center">
                                <img
                                    src={logoUrl}
                                    alt={`Insurance Partner ${(index % logos.length) + 1}`}
                                    className="h-20 w-auto object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0 hover:!grayscale-0 hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InsurancePartners;
