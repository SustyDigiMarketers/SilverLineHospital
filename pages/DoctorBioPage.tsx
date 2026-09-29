import React, { useContext } from 'react';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import type { Doctor } from '../data/doctors';
import { doctorsList, getDoctorById } from '../data/doctors';
import EditableImage from '../components/MasterSetup/EditableImage';
import SEO from '../components/SEO';
import { generatePhysicianSchema, generateBreadcrumbSchema } from '../lib/seoConfig';

interface DoctorBioPageProps {
  doctorId?: string;
  onBookAppointmentClick?: () => void;
}

const DoctorBioPage: React.FC<DoctorBioPageProps> = ({ doctorId, onBookAppointmentClick }) => {
  const { config } = useContext(MasterSetupContext);
  const doctors: Doctor[] = config.doctors?.list?.length ? config.doctors.list : doctorsList;
  
  const doctor = doctors.find(d => d.id === doctorId) || (doctorId ? getDoctorById(doctorId) : undefined) || doctors[0];

  if (!doctor) {
    return (
      <div className="container mx-auto py-32 px-4 text-center">
        <h1 className="text-3xl font-bold text-[#0E2A47]">Doctor Profile Not Found</h1>
        <p className="mt-4 text-gray-600">The doctor profile you requested could not be located.</p>
        <a href="/doctors" className="mt-6 inline-block px-6 py-3 bg-[#00B5A5] text-white rounded-full font-medium">
          View All Doctors
        </a>
      </div>
    );
  }

  const physicianSchema = generatePhysicianSchema(doctor);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Doctors', url: '/doctor' },
    { name: doctor.name, url: `/doctor-bio/${doctor.id}` }
  ]);

  return (
    <>
      <SEO
        title={`${doctor.name} - ${doctor.specialty} in Trichy`}
        description={`${doctor.name} is a leading ${doctor.specialty} specialist at SilverLine Multispeciality Hospital Trichy. ${doctor.shortBio}`}
        keywords={`${doctor.name}, ${doctor.specialty} in trichy, doctor in trichy, silverline hospital doctor`}
        canonical={`/doctor-bio/${doctor.id}`}
        schema={[physicianSchema, breadcrumbSchema]}
      />

      <div className="bg-slate-50 min-h-screen py-28 md:py-36">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li>
                <a href="#home" className="hover:text-[#00B5A5]">Home</a>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <a href="#doctor" className="hover:text-[#00B5A5]">Doctors</a>
              </li>
              <li>
                <span>/</span>
              </li>
              <li className="text-[#0E2A47] font-semibold">{doctor.name}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              
              {/* Left Column: Doctor Photo & Quick Info */}
              <div className="md:col-span-5 bg-gradient-to-b from-[#0E2A47] to-[#163860] p-8 text-white flex flex-col items-center text-center justify-between">
                <div className="w-full flex flex-col items-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl mb-6 bg-white/10">
                    <EditableImage
                      configKey={doctor.image}
                      alt={`Dr. ${doctor.name.replace(/^Dr\.\s*/i, '')} - ${doctor.department || doctor.specialty}, SilverLine Hospital`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">{doctor.name}</h1>
                  <p className="text-[#00B5A5] font-semibold mt-1 text-base">{doctor.designation || doctor.specialty}</p>
                  
                  {doctor.rawQualifications && (
                    <p className="text-xs text-white/85 mt-2 font-medium bg-white/10 px-3 py-1 rounded-lg max-w-xs">
                      {doctor.rawQualifications}
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center gap-2 mt-3 text-xs">
                    {doctor.experience && (
                      <span className="px-2.5 py-1 bg-[#00B5A5]/20 text-teal-200 border border-[#00B5A5]/30 rounded-full font-semibold">
                        {doctor.experience}
                      </span>
                    )}
                    {doctor.regNo && (
                      <span className="px-2.5 py-1 bg-white/10 text-white/80 rounded-full">
                        Reg. No: {doctor.regNo}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={onBookAppointmentClick}
                    className="w-full py-3.5 px-6 bg-[#00B5A5] text-white font-bold rounded-full shadow-lg hover:bg-teal-400 transition-all transform hover:scale-[1.02]"
                  >
                    Book Consultation
                  </button>
                  <a
                    href="tel:04312906470"
                    className="mt-3 block w-full py-3 px-6 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors text-sm"
                  >
                    Call: 0431-2906470
                  </a>
                </div>
              </div>

              {/* Right Column: Bio, Philosophy & Expertise */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#0E2A47] mb-3 flex items-center">
                    <span className="w-2.5 h-2.5 bg-[#00B5A5] rounded-full mr-2.5"></span>
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {doctor.fullBio || doctor.shortBio}
                  </p>
                </div>

                {doctor.expertise && doctor.expertise.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-[#0E2A47] mb-3 flex items-center">
                      <span className="w-2.5 h-2.5 bg-[#00B5A5] rounded-full mr-2.5"></span>
                      Areas of Clinical Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-teal-50 text-[#0E2A47] border border-teal-200 rounded-full text-xs font-semibold"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {((doctor.proceduralPrivileges && doctor.proceduralPrivileges.length > 0) || (doctor.specialPrivileges && doctor.specialPrivileges.length > 0)) && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h2 className="text-lg font-bold text-[#0E2A47] mb-3 flex items-center">
                      <span className="w-2 h-2 bg-[#00B5A5] rounded-full mr-2"></span>
                      Credentialed Clinical & Surgical Privileges
                    </h2>
                    
                    {doctor.specialPrivileges && doctor.specialPrivileges.length > 0 && (
                      <div className="mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded">
                          Special & Fellowship Privileges
                        </span>
                        <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                          {doctor.specialPrivileges.map((sp, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#00B5A5] font-bold mr-2">&#10003;</span>
                              <span>{sp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {doctor.proceduralPrivileges && doctor.proceduralPrivileges.length > 0 && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-600 bg-gray-200/60 px-2 py-0.5 rounded">
                          Procedural & Operative Scope
                        </span>
                        <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                          {doctor.proceduralPrivileges.slice(0, 6).map((proc, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#0E2A47] font-bold mr-2">&#8226;</span>
                              <span>{proc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {doctor.philosophy && (
                  <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-[#00B5A5]">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">
                      Patient Care Philosophy
                    </h3>
                    <p className="text-gray-800 italic text-sm leading-relaxed">
                      "{doctor.philosophy}"
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href="/doctor"
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', '/doctor');
                      window.dispatchEvent(new Event('popstate'));
                    }}
                    className="text-sm font-semibold text-[#00B5A5] hover:underline flex items-center"
                  >
                    &larr; Back to all doctors
                  </a>
                  <span className="text-xs text-gray-400">
                    SilverLine Hospital Trichy
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DoctorBioPage;
