import React, { useContext } from 'react';
import EditableText from './MasterSetup/EditableText';
import PageHero from './PageHero';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import InsurancePartners from './InsurancePartners';

const getNestedObjectValue = (obj: any, path: string): any => {
  if (!path || typeof path !== 'string') return undefined;
  // REGEX to handle array accessors like 'slides[0]'
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) {
      return undefined;
    }
    result = result[key];
  }
  return result;
};

const packages = [
  {
    configKey: 'basic',
    name: 'Basic Checkup',
    price: '99',
    features: [
      'Complete Blood Count',
      'Blood Sugar Test',
      'Cholesterol Panel',
      'Physical Examination',
      'ECG Test',
    ],
    isPopular: false,
  },
  {
    configKey: 'comprehensive',
    name: 'Comprehensive Plan',
    price: '199',
    features: [
      'All features in Basic',
      'Ultrasound Scan',
      'Thyroid Function Test',
      'Vitamin D & B12 Levels',
      'Cancer Marker Test',
      'Specialist Consultation',
    ],
    isPopular: true,
  },
  {
    configKey: 'premium',
    name: 'Premium Wellness',
    price: '349',
    features: [
      'All features in Comprehensive',
      'Full Body MRI Scan',
      'Genetic Marker Analysis',
      'Advanced Cardiac Screening',
      'Personalized Diet Plan',
      'Year-long Follow-up',
    ],
    isPopular: false,
  },
];

const HealthPackages: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const heroImageKey = config.packages?.heroImage || '';

  return (
    <>
      <PageHero
        title="Health Packages"
        subtitle="Proactive care for a healthier you. Choose from our curated packages designed for your well-being."
        backgroundImage={heroImageKey}
        align="left"
      />
      <section id="healthpackages" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll fade-in-up">
            <EditableText
              as="h2"
              configKey="packages.title"
              defaultValue="Our Health Packages"
              className="text-4xl font-bold text-[#0E2A47]"
            />
            <EditableText
              as="p"
              configKey="packages.subtitle"
              defaultValue="Choose a plan that works best for your health needs."
              className="mt-4 text-lg text-gray-600"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-8 shadow-lg transition-all duration-300 relative ${pkg.isPopular ? 'border-2 border-[#00B5A5] scale-105 shadow-2xl z-10' : 'hover:shadow-2xl hover:-translate-y-2'}`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 -mt-4 mr-4">
                    <span className="bg-[#00B5A5] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
                  </div>
                )}
                <EditableText
                  as="h3"
                  configKey={`packages.${pkg.configKey}.name`}
                  defaultValue={pkg.name}
                  className="text-2xl font-bold text-center text-[#0E2A47] mb-2"
                />
                <p className="text-center text-gray-500 mb-6">Starting from</p>
                <p className="text-5xl font-extrabold text-center text-[#0E2A47] mb-6">
                  ${pkg.price}
                </p>
                <ul className="space-y-4 text-gray-600 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#appointment"
                  className={`w-full block text-center px-6 py-3 font-medium rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${
                    pkg.isPopular
                      ? 'text-white bg-[#0E2A47] hover:bg-[#00B5A5] hover:shadow-xl hover:shadow-teal-400/50 focus:ring-[#00B5A5]'
                      : 'text-[#0E2A47] bg-gray-200 hover:bg-gray-300 focus:ring-[#0E2A47]'
                  }`}
                >
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InsurancePartners />
    </>
  );
};

export default HealthPackages;