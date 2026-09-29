import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { CareerFAQItem } from './CareerTypes';

interface CareerFAQProps {
  faqs?: CareerFAQItem[];
  hrContact?: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
}

const defaultFaqs: CareerFAQItem[] = [
  {
    question: 'What is the recruitment process at SilverLine Hospital?',
    answer:
      'Our recruitment process includes online application review, preliminary telephone screening by HR, clinical/technical evaluation with the respective department head, and an in-person panel discussion with credential verification.',
  },
  {
    question: 'Are there hostel or accommodation facilities for outstation nursing and allied staff?',
    answer:
      'Yes, SilverLine Hospital provides secure, comfortable, and hygienic accommodation with subsidized dining facilities for outstation female nurses and healthcare technicians.',
  },
  {
    question: 'What documents should I bring for the interview?',
    answer:
      'Please carry your updated CV, educational degree/diploma certificates, Tamil Nadu Medical/Nursing/Pharmacy Council Registration Certificate, previous employment experience letters, and government photo ID (Aadhaar or PAN).',
  },
  {
    question: 'How can I submit an open application if my specialized role is not currently listed?',
    answer:
      'You can email your updated CV directly to careers@silverlinehospitals.com with your preferred specialty in the subject line. Our talent acquisition team retains all qualified profiles in our active talent repository for forthcoming openings.',
  },
];

const defaultContact = {
  email: 'careers@silverlinehospitals.com',
  phone: '+91 431 290 6470',
  whatsapp: '+91 96773 36097',
  address: 'SilverLine Hospital, Chennai National Highway, Palur, Tiruchirappalli - 620010',
};

export const CareerFAQ: React.FC<CareerFAQProps> = ({
  faqs = defaultFaqs,
  hrContact = defaultContact,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: FAQs Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B5A5] uppercase tracking-wider mb-2">
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0E2A47]">
                Recruitment & Application FAQs
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Have questions about working at SilverLine? Here is what you need to know.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between p-4.5 text-left bg-white hover:bg-gray-50/70 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-bold text-[#0E2A47] pr-4">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#00B5A5] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4.5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50/40 border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: HR Recruitment Desk Banner */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0E2A47] to-[#143B63] text-white rounded-2xl p-7 sm:p-8 shadow-lg">
            <div className="space-y-5">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#00B5A5]/20 text-[#00E5D0] uppercase tracking-wider mb-2 border border-[#00B5A5]/30">
                  Talent Acquisition Desk
                </span>
                <h4 className="text-xl font-bold text-white">
                  Have Questions or Specific Requirements?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Our Human Resources department is available Monday through Saturday to answer questions about vacancies, credentialing, and interview scheduling.
                </p>
              </div>

              <div className="space-y-3.5 pt-2 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#00E5D0]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Direct Careers Email</div>
                    <a
                      href={`mailto:${hrContact.email}`}
                      className="text-white hover:text-[#00E5D0] font-medium transition-colors"
                    >
                      {hrContact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#00E5D0]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">HR Helpdesk Helpline</div>
                    <a
                      href={`tel:${hrContact.phone}`}
                      className="text-white hover:text-[#00E5D0] font-medium transition-colors"
                    >
                      {hrContact.phone} / {hrContact.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#00E5D0]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Hospital Address</div>
                    <p className="text-slate-300 leading-snug">
                      {hrContact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#00E5D0]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">HR Office Hours</div>
                    <p className="text-slate-300">
                      Monday to Saturday: 9:00 AM – 5:30 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${hrContact.email}?subject=Career%20Inquiry%20-%20SilverLine%20Hospital`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#00B5A5] hover:bg-[#009b8d] text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  Contact HR Department Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
