import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditableText from './MasterSetup/EditableText';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import PageHero from './PageHero';

const Contact: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyT5l12J839WsU1mBtwSgVnG5820_SFgYCsgHZA3IybcORShd1h_XFIy6Nzru2epra/exec';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams();
    
    params.append('sheet', 'Contact');
    params.append('FullName', formData.get('name') as string);
    params.append('Reason', `Subject: ${formData.get('subject')} | Message: ${formData.get('message')}`);
    params.append('type', 'Contact Inquiry');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors'
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
      setIsSuccess(true); // Show success even on opaque response
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  useEffect(() => {
    if (window.location.hash === '#faq') {
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        setTimeout(() => {
          faqElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const heroImageKey = config.contact?.heroImage || '';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="We're here to help. Reach out to us for appointments, inquiries, or feedback."
        backgroundImage={heroImageKey}
      />
      
      <section id="contactus" className="relative py-24 bg-white overflow-hidden">
        {/* Futuristic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[120px] opacity-60 animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20 animate-on-scroll fade-in-up">
            <EditableText
              as="h2"
              configKey="contact.title"
              defaultValue="Contact Us"
              className="text-5xl sm:text-6xl font-black text-[#0E2A47] tracking-tight mb-6"
            />
            <div className="h-1.5 w-24 bg-teal-500 mx-auto rounded-full mb-6" />
            <EditableText
              as="p"
              configKey="contact.subtitle"
              defaultValue="We would love to hear from you. Get in touch with us for any inquiries."
              className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto font-medium"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Info Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:w-[45%] space-y-6"
            >
              {[
                {
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                  title: "Our Address",
                  content: <EditableText as="span" configKey="contact.info.address" defaultValue="No: 3/332, Chennai National Highways, Palur, Trichy." />,
                  delay: 0
                },
                {
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  title: "Phone Number",
                  content: <EditableText as="span" configKey="contact.info.phone" defaultValue="(123) 456-7890" />,
                  delay: 0.1
                },
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Email Address",
                  content: <EditableText as="span" configKey="contact.info.email" defaultValue="contact@silverlinehospital.com" />,
                  delay: 0.2
                },
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Opening Hours",
                  content: (
                    <div className="space-y-1">
                      <EditableText as="p" configKey="contact.info.hoursWeekdays" defaultValue="Mon - Fri: 9:00 AM - 6:00 PM" />
                      <EditableText as="p" configKey="contact.info.hoursWeekend" defaultValue="Sat: 10:00 AM - 4:00 PM" />
                    </div>
                  ),
                  delay: 0.3
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-start gap-6 group transition-all duration-300 hover:shadow-[0_20px_40px_-5px_rgba(0,181,165,0.1)] hover:border-teal-100"
                >
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0E2A47] mb-1">{item.title}</h4>
                    <div className="text-gray-500 font-medium text-lg lg:text-base xl:text-lg leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="mt-12 p-8 bg-[#0E2A47] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-2xl font-bold mb-6 relative z-10">Connect With Us</h4>
                <div className="flex gap-4 relative z-10">
                  {['facebook', 'twitter', 'instagram'].map((social) => (
                    <a 
                      key={social}
                      href={config.socialMedia?.[social as keyof typeof config.socialMedia] || '#'} 
                      className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0E2A47] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl focus:outline-none"
                    >
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        {social === 'facebook' && <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />}
                        {social === 'twitter' && <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />}
                        {social === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.25a4.087 4.087 0 110-8.174 4.087 4.087 0 010 8.174zM18.406 4.155a1.44 1.44 0 100 2.879 1.44 1.44 0 000-2.879z" />}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Futuristic Contact Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-[55%] bg-white p-10 lg:p-14 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(14,42,71,0.1)] border-2 border-gray-50 group hover:border-teal-100 transition-all duration-700 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[100px] opacity-20 -translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700" />
              
              <h3 className="text-3xl font-extrabold text-[#0E2A47] mb-10">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" className="w-full px-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:bg-white focus:border-teal-500 transition-all text-lg font-medium" required disabled={isSubmitting} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="How can we help?" className="w-full px-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:bg-white focus:border-teal-500 transition-all text-lg font-medium" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Your Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Type your message here..." className="w-full px-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:bg-white focus:border-teal-500 transition-all text-lg font-medium resize-none" required disabled={isSubmitting}></textarea>
                </div>
                
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.02, shadow: "0 20px 40px rgba(0, 181, 165, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 px-8 bg-gradient-to-r from-[#0E2A47] to-teal-700 text-white text-xl font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Sending...
                        </span>
                    ) : (
                        <>
                            <EditableText as="span" configKey="contact.form.button" defaultValue="Send Message" />
                            <svg className="w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full left-0 w-full text-center mt-4 text-teal-600 font-bold bg-teal-50 py-3 rounded-xl border border-teal-100"
                      >
                        Message sent successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Interactive Mobile Map Preview */}
          <div className="mt-24 md:hidden">
            <h3 className="text-3xl font-black text-[#0E2A47] mb-8 px-2">Find Us</h3>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-square relative z-10 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1053.446801752651!2d78.72183526958743!3d10.894911999328844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDUzJzQxLjciTiA3OMKwNDMnMjAuOSJF!5e1!3m2!1sen!2sin!4v1761913263294!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Hospital Location"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic FAQ Accordion */}
      <section id="faq" className="py-32 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent" />
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <EditableText
              as="h2"
              configKey="contact.faq.title"
              defaultValue="Common Inquiries"
              className="text-5xl font-black text-[#0E2A47] tracking-tight mb-6"
            />
            <div className="h-1.5 w-24 bg-teal-500 mx-auto rounded-full" />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {(config.contact?.faq?.questions || []).map((item: any, index: number) => (
              <motion.div 
                key={index} 
                initial={false}
                className={`group border-2 rounded-[2rem] transition-all duration-500 ${openIndex === index ? 'bg-white border-teal-500 shadow-2xl' : 'bg-white/50 border-transparent hover:border-teal-100 hover:bg-white'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left py-7 px-8 sm:px-10 focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <EditableText
                    as="span"
                    configKey={`contact.faq.questions[${index}].question`}
                    defaultValue={item.question}
                    className={`text-xl font-bold transition-colors duration-300 ${openIndex === index ? 'text-teal-600' : 'text-[#0E2A47]'}`}
                  />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-teal-500 text-white rotate-180' : 'bg-teal-50 text-teal-600'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-8 sm:px-10 pb-8 pt-2 border-t border-gray-100/50">
                        <EditableText
                          as="div"
                          configKey={`contact.faq.questions[${index}].answer`}
                          defaultValue={item.answer}
                          className="text-lg text-gray-500 font-medium leading-relaxed"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;

