import React, { useContext } from 'react';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import EditableImage from '../components/MasterSetup/EditableImage';

interface DoctorBioPageProps {
  doctorId: string;
  onBookAppointmentClick: () => void;
}

const SocialIcon: React.FC<{ type: 'linkedin' | 'twitter', href: string, label: string }> = ({ type, href, label }) => {
    const iconPath = type === 'linkedin' ? "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" : "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z";
    return (
        <a 
            href={href} 
            aria-label={label}
            className="text-gray-500 hover:text-[#0E2A47] transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {type === 'linkedin' && <circle cx="4" cy="4" r="2" />}
                <path d={iconPath} />
            </svg>
        </a>
    )
}

const DoctorBioPage: React.FC<DoctorBioPageProps> = ({ doctorId, onBookAppointmentClick }) => {
  const { config } = useContext(MasterSetupContext);
  const doctors = config.doctors?.list || [];
  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return (
      <section className="py-20 pt-40 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-[#0E2A47]">Doctor Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">The profile you are looking for does not exist.</p>
          <a href="#doctor" className="mt-8 inline-block px-6 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-colors hover:bg-[#00B5A5]">
            View All Doctors
          </a>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          
          {/* Left Sidebar (Sticky) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center animate-on-scroll fade-in-left">
              <EditableImage
                configKey={doctor.image}
                alt={`Profile of ${doctor.name}`}
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
              />
              <h1 className="text-2xl font-bold text-[#0E2A47]">{doctor.name}</h1>
              <p className="text-md font-medium text-[#00B5A5] mt-1">{doctor.specialty}</p>
              
              <div className="flex justify-center space-x-4 my-6">
                  <SocialIcon type="linkedin" href={doctor.social.linkedin} label={`View ${doctor.name}'s LinkedIn profile`} />
                  <SocialIcon type="twitter" href={doctor.social.twitter} label={`View ${doctor.name}'s Twitter profile`} />
              </div>

              <button
                onClick={onBookAppointmentClick}
                className="w-full px-6 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
              >
                Book Appointment
              </button>
            </div>
          </aside>

          {/* Right Content */}
          <main className="lg:col-span-8 mt-12 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg p-8 animate-on-scroll fade-in-right">
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <div>
                  <h2 className="text-2xl font-bold text-[#0E2A47] mb-3 border-b-2 border-gray-100 pb-3">Full Biography</h2>
                  <p className="whitespace-pre-line">{doctor.fullBio}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0E2A47] mb-3 border-b-2 border-gray-100 pb-3">Professional Philosophy</h2>
                  <blockquote className="border-l-4 border-[#00B5A5] pl-4 italic text-gray-600">
                    "{doctor.philosophy}"
                  </blockquote>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0E2A47] mb-4 border-b-2 border-gray-100 pb-3">Areas of Expertise</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {doctor.expertise.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorBioPage;