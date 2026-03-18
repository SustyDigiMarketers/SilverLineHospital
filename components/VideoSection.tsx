import React, { useRef, useState } from 'react';
import EditableText from './MasterSetup/EditableText';

const VideoSection: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left side: Content */}
                    <div className="w-full lg:w-1/2 animate-on-scroll fade-in-left">
                        <div className="inline-flex items-center space-x-2 bg-teal-50 text-[#00B5A5] px-4 py-2 rounded-full mb-6">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00B5A5]"></span>
                            </span>
                            <span className="text-sm font-bold tracking-wider uppercase">Our Story</span>
                        </div>
                        
                        <EditableText
                            as="h2"
                            configKey="video.title"
                            defaultValue="Experience World-Class Care Through Our Patients' Eyes"
                            className="text-4xl md:text-5xl font-bold text-[#0E2A47] mb-8 leading-tight"
                        />
                        
                        <EditableText
                            as="p"
                            configKey="video.description"
                            defaultValue="Watch how SilverLine Hospital is transforming lives through advanced medical excellence and compassionate care. Our dedicated team of specialists works around the clock to ensure every patient receives the best possible treatment."
                            className="text-lg text-gray-600 mb-10 leading-relaxed"
                        />

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <div className="text-3xl font-bold text-[#00B5A5] mb-1">15k+</div>
                                <div className="text-sm text-gray-500 font-medium">Successful Surgeries</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#00B5A5] mb-1">98%</div>
                                <div className="text-sm text-gray-500 font-medium">Patient Satisfaction</div>
                            </div>
                        </div>

                        <button className="px-8 py-4 bg-[#0E2A47] text-white rounded-full font-bold hover:bg-[#00B5A5] transition-all duration-300 shadow-xl hover:shadow-[#00B5A5]/20">
                            Book Your Consultation
                        </button>
                    </div>

                    {/* Right side: Video Player */}
                    <div className="w-full lg:w-1/2 animate-on-scroll fade-in-right">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-gray-900 aspect-video">
                            {!isPlaying && (
                                <div 
                                    className="absolute inset-0 z-10 flex items-center justify-center transition-all duration-500"
                                    onClick={togglePlay}
                                >
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-[#0E2A47]/40 group-hover:bg-[#0E2A47]/30 transition-colors"></div>
                                    
                                    {/* Play Button */}
                                    <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-white text-[#00B5A5] shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                                        <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20"></div>
                                        <svg className="w-8 h-8 md:w-12 md:h-12 fill-current ml-1" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    
                                    <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                                        <div className="text-sm font-bold uppercase tracking-widest mb-1 opacity-80">Watch Video</div>
                                        <div className="text-xl font-bold">The SilverLine Journey</div>
                                    </div>
                                </div>
                            )}
                            
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                poster="/Hero/Home1.jpg"
                                preload="metadata"
                                playsInline
                                onClick={togglePlay}
                                onEnded={() => setIsPlaying(false)}
                            >
                                <source src="/SLH AD 50 SEC_1080P.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            
                            {isPlaying && (
                                <button 
                                    className="absolute bottom-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
