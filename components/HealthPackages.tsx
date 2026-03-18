import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import EditableText from './MasterSetup/EditableText';
import PageHero from './PageHero';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import InsurancePartners from './InsurancePartners';

const packages = [
  {
    configKey: 'basic-health',
    name: 'Basic Health Package',
    price: '2500',
    features: [
      'CBC, ESR, FBS, PPBS & HbA1c',
      'RFT & LFT (Kidney & Liver Study)',
      'Lipid Profile (Full Cholesterol Study)',
      'ECG & USG (Abdomen & Pelvis)',
      'Urine Analysis & Physician Consultation',
      'Diet Advice & Complimentary Breakfast',
    ],
    isPopular: true,
  },
  {
    configKey: 'heart',
    name: 'Heart Package',
    price: '4000',
    features: [
      'All Basic Health features',
      'Thyroid Profile (T3, T4, TSH)',
      'Electrolytes & ECHO',
      'TMT (Treadmill Test)',
      'X-Ray Chest (PA View)',
      'Cardiologist Consultation',
    ],
    isPopular: false,
  },
  {
    configKey: 'pro-health',
    name: 'Pro Health Package',
    price: '5000',
    features: [
      'All Heart Package features',
      'Vitamin D & Total PSA (Male)',
      'PAP Smear & Mammogram (Female)',
      'Specialized Physician Consultation',
      'Comprehensive Body Screening',
    ],
    isPopular: true,
  },
  {
    configKey: 'basic-diabetic',
    name: 'Basic Diabetic Package',
    price: '2500',
    features: [
      'CBC, ESR, FBS & PPBS',
      'HbA1c (3 Month Average Sugar)',
      'RFT, LFT & Lipid Profile',
      'ECG & USG (Abdomen)',
      'Urine Analysis & Microalbumin',
      'Physician Consultation & Diet Advice',
    ],
    isPopular: false,
  },
  {
    configKey: 'advanced-diabetic',
    name: 'Advanced Diabetic Package',
    price: '4000',
    features: [
      'All Basic Diabetic features',
      'Thyroid Profile & Electrolytes',
      'ECHO & X-Ray Chest',
      'Foot Study (Diabetic Screening)',
      'Comprehensive Diabetic Review',
    ],
    isPopular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

interface HealthPackagesProps {
  onBookPackageClick?: (type: 'Appointment' | 'Package', pkgName: string) => void;
}

const HealthPackages: React.FC<HealthPackagesProps> = ({ onBookPackageClick }) => {
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
      <section id="healthpackages" className="py-24 bg-white relative overflow-hidden">
        {/* Futuristic Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
           <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-teal-50/50 blur-[120px] animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,181,165,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="container mx-auto max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EditableText
                as="h2"
                configKey="packages.title"
                defaultValue="Our Health Packages"
                className="text-5xl sm:text-6xl font-black text-[#0E2A47] tracking-tight mb-6"
              />
              <div className="h-1.5 w-24 bg-teal-500 mx-auto rounded-full mb-6" />
              <EditableText
                as="p"
                configKey="packages.subtitle"
                defaultValue="Choose a plan that works best for your health needs."
                className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto font-medium"
              />
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-start md:justify-center gap-10 items-stretch relative z-10"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.666rem)] 2xl:w-[calc(33.333%-1.666rem)] group relative flex flex-col bg-white rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(14,42,71,0.15)] border-2 ${
                  pkg.isPopular 
                    ? 'border-teal-500 ring-4 ring-teal-500/5 z-10' 
                    : 'border-gray-50 hover:border-teal-200'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-teal-500 text-white text-sm font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <EditableText
                    as="h3"
                    configKey={`packages.${pkg.configKey}.name`}
                    defaultValue={pkg.name}
                    className="text-2xl font-extrabold text-[#0E2A47] mb-2"
                  />
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-2xl font-bold text-teal-600">₹</span>
                    <span className="text-5xl font-black text-[#0E2A47]">{pkg.price}</span>
                    <span className="text-gray-400 font-medium ml-1">/ checkup</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent mb-8" />

                <ul className="flex-grow space-y-5 text-gray-600 mb-10">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start group/item">
                      <div className="mr-4 mt-1 bg-teal-50 p-1 rounded-lg group-hover/item:bg-teal-500 group-hover/item:text-white transition-colors">
                        <svg className="w-4 h-4 transition-transform group-hover/item:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg font-medium tracking-tight leading-snug text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onBookPackageClick?.('Package', pkg.name)}
                  className={`w-full block text-center px-8 py-5 font-bold rounded-2xl transition-all duration-300 transform active:scale-95 ${
                    pkg.isPopular
                      ? 'bg-[#0E2A47] text-white hover:bg-teal-600 hover:shadow-[0_20px_40px_-10px_rgba(0,181,165,0.4)]'
                      : 'bg-gray-100 text-[#0E2A47] hover:bg-[#0E2A47] hover:text-white'
                  }`}
                >
                  Book Package Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* How it Works / Process Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-4 sm:px-6 relative z-10">
            <div className="text-center mb-16 animate-on-scroll fade-in-up">
              <h2 className="text-4xl font-bold text-[#0E2A47]">How It Works</h2>
              <p className="mt-4 text-lg text-gray-600">Your journey to better health in three simple steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-[#00B5A5]/30 to-transparent z-0" />
              
              {[
                { step: '01', title: 'Choose a Package', desc: 'Browse our comprehensive health packages and select the one that suits your needs.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
                { step: '02', title: 'Schedule Visit', desc: 'Book an appointment online or contact our support team for assistance.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { step: '03', title: 'Get Results', desc: 'Receive your detailed medical report and consult with our expert doctors.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center group animate-on-scroll fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/80 flex items-center justify-center mb-6 text-[#0E2A47] group-hover:-translate-y-2 group-hover:text-[#00B5A5] group-hover:shadow-[0_20px_40px_-10px_rgba(0,181,165,0.25)] group-hover:border-[#00B5A5]/30 transition-all duration-500">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#0E2A47] to-[#00B5A5] text-white flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm">{item.step}</div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0E2A47] mb-3 text-center group-hover:text-[#00B5A5] transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
           <div className="absolute bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#00B5A5]/10 to-transparent blur-3xl opacity-60" />
           <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-[#0E2A47]/5 to-transparent blur-3xl opacity-60" />
        </div>
        <div className="container mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-4 sm:px-6 relative z-10">

          <div className="text-center mb-16 animate-on-scroll fade-in-up">
            <h2 className="text-4xl font-bold text-[#0E2A47]">Why Choose Our Packages?</h2>
            <p className="mt-4 text-lg text-gray-600">Premium healthcare with state-of-the-art facilities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { title: 'Advanced Technology', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
               { title: 'Expert Consultants', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
               { title: 'Fast Results', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
               { title: 'Affordable Care', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
             ].map((feature, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:border-[#00B5A5]/30 hover:shadow-[0_20px_40px_-10px_rgba(0,181,165,0.2)] hover:-translate-y-1 transition-all duration-500 group animate-on-scroll fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-[#00B5A5] mb-4 group-hover:scale-110 group-hover:bg-[#00B5A5] group-hover:text-white transition-all duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors">{feature.title}</h3>
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
