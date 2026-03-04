import React, { useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import EditableText from './MasterSetup/EditableText';

const resolveImageSrc = (config: any, item: string): string => {
    if (typeof item === 'string' && item.startsWith('imagePaths.')) {
        const keys = item.replace(/\[(\d+)\]/g, '.$1').split('.');
        let result = config;
        for (const key of keys) {
            if (result === null || result === undefined) return '';
            result = result[key];
        }
        return result || '';
    }
    return item; // Assumes it's a data URL or a direct path
};

const GallerySection: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const images = config.galleryImages || [];
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.location.hash = '#gallery';
    };

    return (
        <section id="gallery-preview" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-on-scroll fade-in-up">
                    <EditableText
                        as="h2"
                        configKey="gallery.title"
                        defaultValue="Our Gallery"
                        className="text-4xl font-bold text-[#0E2A47]"
                    />
                    <EditableText
                        as="p"
                        configKey="gallery.subtitle"
                        defaultValue="A glimpse into our world-class facilities and compassionate care."
                        className="mt-4 text-lg text-gray-600"
                    />
                </div>
            </div>

            <div className="mt-12 w-full group overflow-x-hidden" tabIndex={0} aria-label="Image gallery carousel">
                {images.length > 0 && (
                    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                        {[...images, ...images].map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-80 mx-4">
                                <img 
                                    src={resolveImageSrc(config, item)} 
                                    alt={`Gallery image ${index + 1}`} 
                                    className="w-full h-56 object-cover rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl" 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="text-center mt-12">
                <a 
                    href="#gallery" 
                    onClick={handleNavClick} 
                    className="inline-block px-8 py-3 font-semibold text-white bg-[#00B5A5] rounded-full transition-all duration-300 ease-in-out hover:bg-[#0E2A47] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                >
                    See More
                </a>
            </div>
        </section>
    );
};

export default GallerySection;