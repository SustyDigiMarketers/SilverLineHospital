import React from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    configKey: 'patientCare',
    title: 'Patient Care',
    description: 'Empathy driven personalized patient care.',
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    configKey: 'cosmeticDentistry',
    title: 'Cosmetic Dentistry',
    description: 'Socially conscious organization.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    configKey: 'experiencedTeam',
    title: 'Experienced Team',
    description: 'Vastly experienced team of doctors with extensive clinical expertise.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v-8" />
    </svg>
    ),
    configKey: 'pediatricDentistry',
    title: 'Pediatric Dentistry',
    description: 'Dedicated and exclusive patient advice and liaison team.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    configKey: 'affordableMedicines',
    title: 'Affordable Medicines',
    description: 'High quality medical services made affordable.',
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2v2m0-2h2m-2 0H8m4 6v2m0-2v-2m0 2h2m-2 0H8m4 6v2m0-2v-2m0 2h2m-2 0H8" />
        </svg>
    ),
    configKey: 'periodontalTherapy',
    title: 'Periodontal Therapy',
    description: 'Dedicated nursing and paramedical support.',
  },
];


const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="bg-gray-50">
       <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center animate-on-scroll fade-in-up mb-12">
            <EditableText
              as="h2"
              configKey="whyChooseUs.title"
              defaultValue="Why SilverLine..."
              className="text-4xl sm:text-5xl font-bold text-[#0E2A47] !leading-tight"
            />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          {/* Image Column */}
          <div className="animate-on-scroll fade-in-left">
              <EditableImage
                  configKey="whyChooseUs.image"
                  alt="Doctor at SilverLine Hospital Trichy discussing results with a patient"
                  className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px] shadow-xl"
              />
          </div>
          {/* Features Column */}
          <div className="animate-on-scroll fade-in-right py-12">
              <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-16">
                  <div className="space-y-6 stagger-children">
                      {features.map((feature, index) => (
                          <div key={index} className="group flex items-start p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:border-[#00B5A5]/50 hover:-translate-y-1 animate-on-scroll fade-in-up">
                              <div className="flex-shrink-0 bg-[#00B5A5] p-5 rounded-full mr-6 shadow-lg shadow-teal-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                  {feature.icon}
                              </div>
                              <div>
                                  <EditableText as="h3" configKey={`whyChooseUs.features.${feature.configKey}.title`} defaultValue={feature.title} className="text-xl font-bold text-[#0E2A47] mb-2 transition-colors duration-300 group-hover:text-[#00B5A5]" />
                                  <EditableText as="p" configKey={`whyChooseUs.features.${feature.configKey}.description`} defaultValue={feature.description} className="text-gray-600 leading-relaxed" />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;