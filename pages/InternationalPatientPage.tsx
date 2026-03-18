import PageHero from '../components/PageHero';

interface InternationalPatientPageProps {
  onBookAppointmentClick: (type: 'Foregin PT') => void;
}

const services = [
  {
    title: 'Expert Medical Consultation & Treatment',
    desc: 'We provide access to cutting-edge treatments and consultations with our team of top specialists, ensuring that you receive the best possible care.',
  },
  {
    title: 'Travel & Visa Assistance',
    desc: 'We offer dedicated support for travel arrangements, visa facilitation, and local accommodation to make your experience stress-free.',
  },
  {
    title: '24/7 Patient Coordination',
    desc: 'Our International Patient Coordinators are available around the clock to guide you through every step, from initial inquiry to post-treatment follow-up.',
  },
  {
    title: 'Multi-Lingual & Culturally Sensitive Support',
    desc: 'Our team provides personalized care with language assistance and an understanding of diverse cultural needs, ensuring clear and comfortable communication.',
  }
];

const centersInfo = [
  {
    title: 'Local Expertise & Assistance',
    desc: "Whether you're contacting us from Ethiopia, South Sudan, or another region, our Information Centres are equipped to provide personalized, local support.",
  },
  {
    title: 'Seamless Connection to Healthcare Services',
    desc: 'Get in touch with our specialists and coordinators quickly, with guidance on navigating travel, accommodation, and treatment arrangements.',
  },
  {
    title: 'Expanded Regional Presence',
    desc: 'Our expanding network of Information Centres ensures that expert healthcare information is always within your reach, no matter where you are.',
  }
];

const quickLinks = [
  { title: 'International Patient Guide', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Featured Departments', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { title: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Travel Assistance', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Visitor Information', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' },
  { title: 'Language Assistance', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  { title: 'Billing Support', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z' },
  { title: 'Second Opinion', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { title: 'FAQs', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

const InternationalPatientPage: React.FC<InternationalPatientPageProps> = ({ onBookAppointmentClick }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero 
        title="International Patients" 
        subtitle="World-class healthcare services for patients traveling to Trichy from abroad."
        backgroundImage="imagePaths.internationalPatients.hero"
      />
      
      {/* Overview & Comprehensive Services */}
      <section className="py-20 relative overflow-hidden">
        {/* Futuristic Ambient Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
           <div className="absolute top-0 -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#00B5A5]/10 to-transparent blur-3xl opacity-70" />
           <div className="absolute bottom-[0%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#0E2A47]/5 to-transparent blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl px-4 sm:px-6 relative z-10 text-gray-700 leading-relaxed">
          <p className="text-lg text-center mb-16 animate-on-scroll fade-in-up">
            At SilverLine Hospital, our International Patient Services are designed to provide world-class healthcare tailored to your unique needs — no matter where you are in the world. We strive to make every aspect of your journey seamless, from the moment you reach out to us until your full recovery.
          </p>

          <h2 className="text-3xl font-bold text-[#0E2A47] mb-8 animate-on-scroll fade-in-up">Our Comprehensive Services Include:</h2>
          
          <div className="grid gap-6 animate-on-scroll fade-in-up delay-100">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,181,165,0.15)] hover:border-[#00B5A5]/30 hover:-translate-y-1 group">
                <div className="flex items-start">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <strong className="text-lg text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors">{service.title}:</strong>
                    <span className="ml-2 text-gray-600">{service.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Outreach */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl px-4 sm:px-6 relative z-10 text-gray-700 leading-relaxed">
          <h2 className="text-3xl font-bold text-[#0E2A47] mb-6 animate-on-scroll fade-in-up">Global Outreach Through Our Information Centres</h2>
          
          <p className="mb-10 animate-on-scroll fade-in-up delay-100">
            In addition to our international services, SilverLine Hospital has established a network of Information Centres that serve as local hubs to support your journey. These centres bridge the gap between your location and our world-class healthcare services, offering immediate local assistance.
          </p>

          <h3 className="text-2xl font-semibold text-[#0E2A47] mb-6 animate-on-scroll fade-in-up delay-100">Our Information Centres Provide:</h3>
          
          <div className="grid gap-6 animate-on-scroll fade-in-up delay-200">
             {centersInfo.map((info, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,181,165,0.15)] hover:border-[#00B5A5]/30 hover:-translate-y-1 group">
                <div className="flex items-start">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <strong className="text-lg text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors">{info.title}:</strong>
                    <span className="ml-2 text-gray-600">{info.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 mb-16 italic text-gray-500 animate-on-scroll fade-in-up delay-300">
            We invite you to experience a healthcare journey that combines the best of international expertise with the convenience and local support of our Information Centres.
          </p>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-12 pb-24 relative z-10">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 justify-center">
             {quickLinks.map((link, idx) => (
                <div 
                  key={idx} 
                  onClick={() => link.title === 'Appointments' && onBookAppointmentClick('Foregin PT')}
                  className="flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(225,29,72,0.2)] hover:-translate-y-2 hover:border-[#E11D48]/30 group cursor-pointer animate-on-scroll fade-in-up" 
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-[#E11D48]/10 group-hover:scale-110">
                     <svg className="w-8 h-8 text-[#E11D48] transition-colors duration-500 group-hover:text-[#E11D48]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={link.icon}></path></svg>
                  </div>
                  <h4 className="text-sm font-semibold text-center text-[#0E2A47] group-hover:text-[#E11D48] transition-colors duration-300">{link.title}</h4>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Halal Services Certificate */}
      <section className="py-16 pt-0 relative z-10 flex justify-center">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
           <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white flex flex-col items-center text-center animate-on-scroll fade-in-up relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E11D48]/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#0E2A47]/5 to-transparent rounded-tr-full pointer-events-none" />
              
              <p className="text-lg font-medium text-[#0E2A47] mb-6 relative z-10">
                SilverLine hospital has satisfied the requirement of Halal friendly services and Halal food supply in accordance with Shariah(Islamic) Board guidelines.
              </p>
              
              <button className="bg-[#E11D48] text-white font-bold py-2.5 px-8 rounded-md mb-8 shadow-lg shadow-[#E11D48]/30 transition-all hover:bg-[#be123c] hover:shadow-xl hover:shadow-[#E11D48]/40 hover:-translate-y-0.5 relative z-10">
                Certificate
              </button>
              
              <p className="text-[#0E2A47] mb-4 relative z-10">To know more about our service call now or register online</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                <div className="bg-[#E11D48] text-white font-bold py-3 px-8 rounded-md shadow-md">
                  at 044 40006000
                </div>
                <button 
                  onClick={() => onBookAppointmentClick('Foregin PT')}
                  className="bg-[#0E2A47] text-white font-bold py-3 px-8 rounded-md shadow-md hover:bg-[#00B5A5] transition-colors"
                >
                  Online Registration
                </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default InternationalPatientPage;
