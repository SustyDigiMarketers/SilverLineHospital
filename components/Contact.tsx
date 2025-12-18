import React, { useContext, useState, useEffect } from 'react';
import EditableText from './MasterSetup/EditableText';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import PageHero from './PageHero';

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

const Contact: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ item is open by default

  useEffect(() => {
    // When the component mounts, check if the URL hash is for the FAQ section
    if (window.location.hash === '#faq') {
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        // A small delay ensures the page layout is stable before scrolling
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

  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="We're here to help. Reach out to us for appointments, inquiries, or feedback."
        backgroundImage={heroImageKey}
      />
      <section id="contactus" className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll fade-in-up">
            <EditableText
              as="h2"
              configKey="contact.title"
              defaultValue="Contact Us"
              className="text-4xl font-bold text-[#0E2A47]"
            />
            <EditableText
              as="p"
              configKey="contact.subtitle"
              defaultValue="We would love to hear from you. Get in touch with us for any inquiries."
              className="mt-4 text-lg text-gray-600"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Info */}
            <div className="md:w-1/2 animate-on-scroll fade-in-left">
              <EditableText
                as="h3"
                configKey="contact.info.title"
                defaultValue="Get in Touch"
                className="text-2xl font-bold text-[#0E2A47] mb-6"
              />
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <svg className="w-6 h-6 mr-4 mt-1 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <EditableText as="span" configKey="contact.info.address" defaultValue="No: 3/332, Chennai National Highways, Palur, Trichy." />
                </p>
                <p className="flex items-center">
                  <svg className="w-6 h-6 mr-4 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <EditableText as="span" configKey="contact.info.phone" defaultValue="(123) 456-7890" />
                </p>
                <p className="flex items-center">
                  <svg className="w-6 h-6 mr-4 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <EditableText as="span" configKey="contact.info.email" defaultValue="contact@silverlinehospital.com" />
                </p>
                 <p className="flex items-start">
                  <svg className="w-6 h-6 mr-4 mt-1 text-[#00B5A5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>
                      <EditableText as="span" configKey="contact.info.hoursTitle" defaultValue="Opening Hours:" className="font-semibold" />
                      <br />
                      <EditableText as="span" configKey="contact.info.hoursWeekdays" defaultValue="Mon - Fri: 9:00 AM - 6:00 PM" />
                      <br />
                      <EditableText as="span" configKey="contact.info.hoursWeekend" defaultValue="Sat: 10:00 AM - 4:00 PM" />
                  </span>
                </p>
              </div>
               <div className="mt-8 pt-6 border-t border-gray-200">
                  <EditableText
                    as="h4"
                    configKey="contact.info.followTitle"
                    defaultValue="Follow Us"
                    className="text-lg font-bold text-[#0E2A47] mb-4"
                  />
                  <div className="flex space-x-4">
                      <a href={config.socialMedia?.facebook || '#'} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 group transition-all duration-300 ease-in-out hover:bg-[#0E2A47] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#0E2A47]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                      <a href={config.socialMedia?.twitter || '#'} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 group transition-all duration-300 ease-in-out hover:bg-[#0E2A47] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#0E2A47]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                      <a href={config.socialMedia?.instagram || '#'} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 group transition-all duration-300 ease-in-out hover:bg-[#0E2A47] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#0E2A47]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.797 2.013 10.15 2 12.315 2zm-1.163 1.943h.001c-1.01.049-1.625.21-2.126.415a3.003 3.003 0 00-1.08 1.08c-.205.501-.366 1.116-.415 2.126-.049 1.01-.06 1.326-.06 3.435s.011 2.426.06 3.435c.049 1.01.21 1.625.415 2.126a3.003 3.003 0 001.08 1.08c.501.205 1.116.366 2.126.415 1.01.049 1.326.06 3.435.06s2.426-.011 3.435-.06c1.01-.049 1.625-.21 2.126-.415a3.003 3.003 0 00-1.08-1.08c-.501-.205-1.116-.366-2.126-.415-1.01-.049-1.326-.06-3.435-.06s-2.426.011-3.435.06zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.943a3.192 3.192 0 110 6.384 3.192 3.192 0 010-6.384z" clipRule="evenodd" /></svg></a>
                  </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="md:w-1/2 bg-gray-50 p-8 rounded-lg shadow-lg animate-on-scroll fade-in-right">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5A5]" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" id="email" name="email" placeholder="john.doe@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5A5]" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Appointment Inquiry" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5A5]" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} placeholder="Your message here..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5A5]" required></textarea>
                </div>
                <button type="submit" className="w-full px-6 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl hover:shadow-teal-400/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#00B5A5]">
                  <EditableText as="span" configKey="contact.form.button" defaultValue="Send Message" />
                </button>
              </form>
            </div>
          </div>

          {/* Google Map Section - ONLY VISIBLE ON MOBILE */}
          <div className="mt-16 animate-on-scroll fade-in-up md:hidden">
            <h3 className="text-2xl font-bold text-[#0E2A47] mb-6 text-center">Our Location</h3>
            <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-xl border-2 border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1053.446801752651!2d78.72183526958743!3d10.894911999328844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDUzJzQxLjciTiA3OMKwNDMnMjAuOSJF!5e1!3m2!1sen!2sin!4v1761913263294!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Hospital Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* New FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll fade-in-up">
            <EditableText
              as="h2"
              configKey="contact.faq.title"
              defaultValue="Frequently Asked Questions"
              className="text-4xl font-bold text-[#0E2A47]"
            />
            <EditableText
              as="p"
              configKey="contact.faq.subtitle"
              defaultValue="Find answers to common questions about our services, appointments, and policies."
              className="mt-4 text-lg text-gray-600"
            />
          </div>
          <div className="space-y-4 animate-on-scroll fade-in-up" style={{ '--stagger-delay': '150ms' } as React.CSSProperties}>
            {(config.contact?.faq?.questions || []).map((item: any, index: number) => (
              <div key={index} className="border border-gray-200 bg-white rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left font-semibold text-lg py-5 px-6 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00B5A5]"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <EditableText
                    as="span"
                    configKey={`contact.faq.questions[${index}].question`}
                    defaultValue={item.question}
                    className={openIndex === index ? 'text-[#00B5A5]' : 'text-gray-800'}
                  />
                  <svg className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: openIndex === index ? '500px' : '0px' }}
                >
                  <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                    <EditableText
                      as="div"
                      configKey={`contact.faq.questions[${index}].answer`}
                      defaultValue={item.answer}
                      className="text-gray-600 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;