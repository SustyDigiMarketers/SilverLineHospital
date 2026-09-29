import React from 'react';
import PageHero from '../components/PageHero';
import FacilitiesHighlights from '../components/FacilitiesHighlights';
import SEO from '../components/SEO';
import { generateBreadcrumbSchema, HOSPITAL_NAP } from '../lib/seoConfig';
import { hero } from '../data/images';

interface InternationalPatientPageProps {
  onBookAppointmentClick: (type: 'Foregin PT') => void;
}

// --- Medical Line-Art & Vector SVG Assets ---
const GlobeMedicalIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const DocumentReviewIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const SpecialistOpinionIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 11l2 2 4-4" />
  </svg>
);

const TravelVisaIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 4H9l3-4z" />
  </svg>
);

const HospitalAdmissionIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const TeleconsultationIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const HalalCertificateIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const patientJourneySteps = [
  {
    step: "Step 1",
    title: "Initial Query & Medical Records Review",
    desc: "Submit your existing medical history, imaging studies, and clinical diagnosis for initial assessment by our international coordination desk.",
    icon: DocumentReviewIcon
  },
  {
    step: "Step 2",
    title: "Specialist Opinion & Treatment Estimate",
    desc: "Our senior consultant specialists review your reports to outline proposed treatment protocols and formal medical cost estimations.",
    icon: SpecialistOpinionIcon
  },
  {
    step: "Step 3",
    title: "Visa Assistance & Travel Planning",
    desc: "We provide official hospital invitation letters and medical visa facilitation assistance to guide your international travel arrangements.",
    icon: TravelVisaIcon
  },
  {
    step: "Step 4",
    title: "Arrival & Hospital Admission",
    desc: "Coordination upon reaching Trichy with dedicated international patient staff guiding priority admission and multidisciplinary clinical care.",
    icon: HospitalAdmissionIcon
  },
  {
    step: "Step 5",
    title: "Post-Treatment Follow-up & Teleconsultation",
    desc: "Continued care via scheduled virtual consultations, tele-health review sessions, and direct communication with your treating physician back home.",
    icon: TeleconsultationIcon
  }
];

const comprehensiveServices = [
  {
    title: "Expert Medical Consultation & Multi-Specialty Care",
    desc: "Direct access to 29+ specialized consultants spanning surgical oncology, gastrointestinal surgery, cardiology, urology, nephrology, orthopaedics, and critical care."
  },
  {
    title: "Travel Coordination & Medical Visa Facilitation",
    desc: "Support with required documentation, medical visa invitation letters, and orientation for arrival in Tiruchirappalli."
  },
  {
    title: "Dedicated International Patient Coordinators",
    desc: "Assigned personal patient navigators assisting you and your family throughout consultation, admission, treatment, and discharge."
  },
  {
    title: "Multi-Lingual & Culturally Sensitive Patient Support",
    desc: "Specialized assistance ensuring clear medical communication and dietary accommodations aligned with patient cultural needs."
  }
];

const centersInfo = [
  {
    title: "Regional Outreach & Advisory Information",
    desc: "Information desks equipped to guide patients and families from international regions seeking advanced medical interventions."
  },
  {
    title: "Transparent Pre-Travel Treatment Guidance",
    desc: "Comprehensive coordination facilitating second opinions, preliminary doctor consultations, and detailed treatment timelines prior to travel."
  },
  {
    title: "Continuity of Care Across Borders",
    desc: "Secure transfer of medical records, discharge summaries, and prescription guidelines to local physicians in your home country."
  }
];

const InternationalPatientPage: React.FC<InternationalPatientPageProps> = ({ onBookAppointmentClick }) => {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'International Patients', url: '/internationalpatients' }
  ]);

  const intlSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "International Patient Services at SilverLine Hospital Trichy",
    "description": "Comprehensive healthcare for international patients in Trichy, Tamil Nadu. Medical visa facilitation, second opinions, and dedicated coordination.",
    "url": `${HOSPITAL_NAP.url}/internationalpatients`
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="International Patient Care & Medical Services | SilverLine Hospital Trichy"
        description="Comprehensive healthcare for international patients in Trichy, Tamil Nadu. Medical visa facilitation, clinical second opinions, and dedicated international coordination."
        keywords="international patient hospital trichy, medical tourism tamil nadu, medical visa india, global healthcare trichy"
        canonical="/internationalpatients"
        schema={[intlSchema, breadcrumbs]}
      />

      <PageHero 
        title="International Patients" 
        subtitle="World-class healthcare services and personalized coordination for patients traveling to Trichy from abroad."
        backgroundImage={hero.international}
      />

      {/* 1. Introduction & Overview */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10 text-slate-700 leading-relaxed">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00B5A5] text-xs font-bold uppercase tracking-wider mb-3">
              <GlobeMedicalIcon className="w-4 h-4 text-[#00B5A5]" />
              Global Healthcare Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0E2A47] mb-4">
              World-Class Care Tailored for Global Patients
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              At SilverLine Hospital, our International Patient Services team is committed to providing seamless medical support. From preliminary clinical evaluations to complete hospital admission and post-treatment follow-up, we are here to support every step of your healthcare journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comprehensiveServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-[#00B5A5]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00B5A5] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <h3 className="text-base font-bold text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 5-STEP INTERNATIONAL PATIENT JOURNEY */}
      <section className="py-16 md:py-24 bg-slate-100/70 relative overflow-hidden border-y border-slate-200/80">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#0E2A47] text-xs font-bold uppercase tracking-wider mb-3">
              Step-by-Step Pathway
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0E2A47]">
              The International Patient Journey
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              A structured, transparent pathway designed to ensure seamless care before, during, and after your visit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {patientJourneySteps.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:border-[#00B5A5]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-[#00B5A5] uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-full">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#0E2A47] group-hover:bg-[#00B5A5] group-hover:text-white transition-all duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#0E2A47] text-base mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Button within Journey */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onBookAppointmentClick('Foregin PT')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#00B5A5] hover:bg-[#009489] text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 text-sm"
            >
              <DocumentReviewIcon className="w-4 h-4" />
              Submit Medical Query (Foreign Patient Desk)
            </button>
          </div>
        </div>
      </section>

      {/* 3. Global Outreach & Information Centres */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10 text-slate-700 leading-relaxed">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A47] mb-3">
              Global Coordination & Regional Outreach
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              SilverLine Hospital works with regional information centres to facilitate preliminary inquiries and provide immediate guidance for patients seeking specialized interventions in Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {centersInfo.map((info, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-[#00B5A5]/30 hover:bg-white hover:shadow-md transition-all group"
              >
                <h3 className="text-base font-bold text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors mb-2">
                  {info.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Facilities Highlights */}
      <FacilitiesHighlights />

      {/* 5. Halal-Friendly Services Notice & Registration Gateway */}
      <section className="py-16 bg-slate-50 relative z-10">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200/80 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#00B5A5] flex items-center justify-center mb-5">
              <HalalCertificateIcon className="w-7 h-7" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0E2A47] mb-3">
              Halal Friendly Patient Services
            </h3>

            <p className="text-sm text-slate-600 max-w-xl mb-6 leading-relaxed">
              SilverLine Hospital has satisfied the requirements of Halal friendly services and Halal food supply in accordance with Islamic dietary standards, ensuring comfort and dietary respect for our global patients.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <a
                href="tel:04440006000"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-[#0E2A47] font-bold rounded-xl text-sm transition-all text-center"
              >
                International Desk: 044 4000 6000
              </a>
              <button
                onClick={() => onBookAppointmentClick('Foregin PT')}
                className="px-8 py-3 bg-[#0E2A47] hover:bg-[#00B5A5] text-white font-bold rounded-xl text-sm shadow-md transition-all text-center"
              >
                Online Registration (Foregin PT)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternationalPatientPage;
