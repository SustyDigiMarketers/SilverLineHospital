import React, { useState, useContext } from 'react';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import ImageModal from '../components/ImageModal';
import PageHero from '../components/PageHero';

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


const GalleryPage: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Use the new centralized galleryImages array
    const images = config.galleryImages || [];

    return (
        <>
            <PageHero
                title="Our Gallery"
                subtitle="Explore our state-of-the-art facilities, compassionate staff, and the healing environment we've created for our patients."
                backgroundImage="imagePaths.specialties.pageHero"
            />
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {images.map((item: string, index: number) => {
                             const src = resolveImageSrc(config, item);
                             if (!src) return null; // Don't render if src is invalid

                             return (
                                 <div
                                  key={`${item}-${index}`}
                                  onClick={() => setSelectedImage(src)}
                                  className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-square bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:ring-[#00B5A5]"
                                  tabIndex={0}
                                  onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(src)}
                                >
                                  <img
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
                                  />
                                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                  </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
        </>
    );
};

export default GalleryPage;