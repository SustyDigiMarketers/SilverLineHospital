import React from 'react';
import { motion } from 'framer-motion';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { specialtiesList } from '../lib/specialtiesData';

const SpecialtiesSection: React.FC = () => {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.hash = href;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="specialties" className="relative bg-white py-24 overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="mb-20">
          <EditableText
            as="h2"
            configKey="specialties.title"
            defaultValue="Our Specialties"
            className="text-5xl sm:text-7xl font-bold text-[#0E2A47] tracking-tight mb-4"
          />
          <div className="h-1.5 w-32 bg-teal-500 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Specialties Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
          >
            {specialtiesList.map((specialty, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={`#specialty/${specialty.id}`}
                onClick={(e) => handleNavClick(e, `#specialty/${specialty.id}`)}
                className="group flex items-center p-4 border-b border-gray-100/50 hover:border-teal-400/50 transition-all duration-500 hover:bg-teal-50/20 rounded-lg"
              >
                <div className="flex-shrink-0 mr-4 transition-transform duration-500 group-hover:scale-110">
                  <EditableImage 
                    configKey={specialty.iconPath}
                    alt={specialty.name}
                    className="h-8 w-8 object-contain filter drop-shadow-sm"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-base text-[#0E2A47] group-hover:text-teal-600 transition-colors duration-300">
                    {specialty.name}
                  </h3>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right: NABH Accreditation Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 flex flex-col items-center justify-center p-12 bg-gray-50/50 rounded-3xl backdrop-blur-sm border border-gray-100 shadow-2xl space-y-8 sticky top-24"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-400 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              {/* Using Icon 23 as NABH Logo placeholder as it was discovered in Icons folder */}
              <img 
                src="/Icons/23.png" 
                alt="NABH Accreditation" 
                className="w-48 h-48 object-contain relative z-10"
                onError={(e) => {
                   // Fallback if 23.png is not the NABH logo
                   e.currentTarget.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_S5wPz_U5H0x8Zp9T_Z1-W0c4F-7K4-B-AQ&s";
                }}
              />
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-extrabold text-[#0E2A47] mb-2">NABH</h4>
              <p className="text-xl font-medium text-gray-500 uppercase tracking-widest">Accredited</p>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <p className="text-center text-gray-400 text-lg leading-relaxed px-4">
              Committed to the highest standards of safety and quality of care for our patients.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;

