import React from 'react';
import { motion, Variants } from 'framer-motion';
import { HeartPulse, Sparkles, Stethoscope, Baby, Pill, ShieldPlus, ArrowRight, CheckCircle2 } from 'lucide-react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';

const features = [
  {
    Icon: HeartPulse,
    configKey: 'patientCare',
    title: 'Patient Care',
    description: 'Empathy driven personalized patient care.',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20'
  },
  {
    Icon: Sparkles,
    configKey: 'cosmeticDentistry',
    title: 'Social Consciousness',
    description: 'Socially conscious organization.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20'
  },
  {
    Icon: Stethoscope,
    configKey: 'experiencedTeam',
    title: 'Experienced Team',
    description: 'Vastly experienced team of doctors with extensive clinical expertise.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20'
  },
  {
    Icon: Baby,
    configKey: 'pediatricDentistry',
    title: 'Pediatric Dentistry',
    description: 'Dedicated and exclusive patient advice and liaison team.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20'
  },
  {
    Icon: Pill,
    configKey: 'affordableMedicines',
    title: 'Affordable Medicines',
    description: 'High quality medical services made affordable.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20'
  },
  {
    Icon: ShieldPlus,
    configKey: 'periodontalTherapy',
    title: 'Nursing & Support',
    description: 'Dedicated nursing and paramedical support.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20'
  },
];

const WhyChooseUs: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section id="why-choose-us" className="relative py-32 bg-white overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00B5A5]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="container mx-auto max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 backdrop-blur-md mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-[#00B5A5]" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Why Choose Us</span>
          </motion.div>
          
          <EditableText
            as="h2"
            configKey="whyChooseUs.title"
            defaultValue="Why SilverLine..."
            className="text-5xl sm:text-6xl font-black text-[#0E2A47] !leading-tight tracking-tighter"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div 
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 border border-gray-100 rounded-[2.5rem] pointer-events-none"></div>
            <div className="absolute -inset-8 border border-gray-50 rounded-[3rem] pointer-events-none opacity-50"></div>
            
            <div className="relative p-3 bg-gray-50 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="w-full h-full overflow-hidden rounded-[2rem]">
                <EditableImage
                  configKey="whyChooseUs.image"
                  alt="SilverLine Hospital Excellence"
                  className="w-full h-full object-cover min-h-[500px] lg:min-h-[650px] transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Overlay Badge */}
              <div className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl max-w-xs shadow-lg">
                <p className="text-[#0E2A47] font-bold text-lg mb-1">Patient-First Philosophy</p>
                <p className="text-gray-600 text-sm">We combine human empathy with cutting-edge medical precision.</p>
              </div>
            </div>
          </motion.div>

          {/* Features Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`group flex items-start p-6 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-500 hover:bg-gray-50 hover:border-[#00B5A5]/30 hover:shadow-lg hover:translate-x-2`}
              >
                <div className={`flex-shrink-0 p-4 rounded-xl ${feature.bg} ${feature.border} border mr-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,181,165,0.1)]`}>
                  <feature.Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <EditableText 
                      as="h3" 
                      configKey={`whyChooseUs.features.${feature.configKey}.title`} 
                      defaultValue={feature.title} 
                      className="text-xl font-bold text-[#0E2A47] transition-colors duration-300 group-hover:text-[#00B5A5]" 
                    />
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#00B5A5] group-hover:translate-x-1 transition-all" />
                  </div>
                  <EditableText 
                    as="p" 
                    configKey={`whyChooseUs.features.${feature.configKey}.description`} 
                    defaultValue={feature.description} 
                    className="text-gray-600 leading-relaxed text-sm" 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
