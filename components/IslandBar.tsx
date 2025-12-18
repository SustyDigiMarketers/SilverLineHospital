import React from 'react';
import EditableText from './MasterSetup/EditableText';

const IslandBar: React.FC = () => {
  return (
    // Wrapper to ensure background continuity and allow for negative margin pull-up
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16 animate-on-scroll fade-in-up">
        <div
          // The island styling with shadow, rounded corners, etc.
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-stretch gap-8">
            {/* Mission Section */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0 bg-teal-100 text-teal-600 p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                </div>
                <EditableText
                  as="h3"
                  configKey="about.mission.title"
                  defaultValue="Our Mission"
                  className="text-2xl font-bold text-[#0E2A47]"
                />
              </div>
              <EditableText
                as="p"
                configKey="about.mission.description"
                defaultValue="To provide outstanding patient care with a focus on clinical excellence, patient safety, and an unparalleled passion for quality."
                className="text-base text-gray-600 leading-relaxed"
              />
            </div>
            
            {/* Divider */}
            <div className="w-full h-px bg-gray-200 md:w-px md:h-auto"></div>

            {/* Vision Section */}
            <div className="flex-1">
               <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <EditableText
                  as="h3"
                  configKey="about.vision.title"
                  defaultValue="Our Vision"
                  className="text-2xl font-bold text-[#0E2A47]"
                />
              </div>
              <EditableText
                as="p"
                configKey="about.vision.description"
                defaultValue="To be a leading healthcare institution, recognized for our innovation, compassionate care, and commitment to the communities we serve."
                className="text-base text-gray-600 leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IslandBar;