import React, { useEffect, useRef, useState, useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import type { Doctor } from '../lib/doctorsData';

interface AppointmentModalProps {
  onClose: () => void;
  type?: 'Appointment' | 'Package' | 'Foregin PT' | 'Contact';
  packageName?: string;
}

const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
];

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
];

// Paste your Web App URL here after deploying the App Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyT5l12J839WsU1mBtwSgVnG5820_SFgYCsgHZA3IybcORShd1h_XFIy6Nzru2epra/exec';

const AppointmentModal: React.FC<AppointmentModalProps> = ({ onClose, type = 'Appointment', packageName }) => {
  const { config } = useContext(MasterSetupContext);
  const doctors: Doctor[] = config.doctors?.list || [];
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const schedules = config.doctorSchedules || {};
      const available = doctors.filter(doctor => {
        const doctorScheduleForDate = schedules[doctor.id]?.[selectedDate];
        return Array.isArray(doctorScheduleForDate) && doctorScheduleForDate.includes(selectedTime);
      });
      setAvailableDoctors(available);
    } else {
      setAvailableDoctors([]);
    }
  }, [selectedDate, selectedTime, config.doctorSchedules, doctors]);

  useEffect(() => {
    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const params = new URLSearchParams();
    
    // Parameters matching your specific request structure (Capitalized):
    params.append('sheet', type); 
    params.append('FullName', formData.get('name') as string);
    params.append('PatientID', (formData.get('patient-id') as string) || 'N/A');
    params.append('PatientType', formData.get('patient_type') === 'new' ? 'New Patient' : 'Returning Patient');
    params.append('Date', formData.get('date') as string);
    params.append('Time', (formData.get('time') as string) || (type === 'Package' ? 'Flexible' : 'N/A'));
    params.append('Doctor', (formData.get('doctor_choice') as string) || (type === 'Package' ? packageName || 'N/A' : 'N/A'));
    params.append('Contact', `${formData.get('country-code')} ${formData.get('phone')}`);
    params.append('Reason', (formData.get('company') as string) || 'N/A');
    
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors'
    }).then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
    }).catch(error => {
        console.error('Submission error:', error);
        setIsSubmitting(false);
        setIsSuccess(true);
    });
  };
  
  const inputStyles = "block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#00B5A5] focus:border-[#00B5A5] transition duration-200 ease-in-out disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-heading"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex flex-col">
            <h2 id="appointment-heading" className="text-2xl font-bold text-[#0E2A47]">
                {isSuccess ? 'Request Submitted' : 
                 type === 'Package' ? 'Book Health Package' : 
                 type === 'Foregin PT' ? 'Foreign Patient Registration' : 
                 type === 'Contact' ? 'Contact Us' :
                 'Book an Appointment'}
            </h2>
            {packageName && !isSuccess && <p className="text-teal-600 font-bold text-sm mt-1">{packageName}</p>}
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
            aria-label="Close form"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {isSuccess ? (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-[bounce_1s]">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0E2A47]">Thank You!</h3>
                <p className="text-gray-600 max-w-sm">
                    Your {type.toLowerCase()} request has been received. Our team will contact you shortly to confirm.
                </p>
                <button 
                    onClick={onClose}
                    className="mt-6 px-8 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                >
                    Close
                </button>
            </div>
        ) : (
            <>
                <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-8 overflow-y-auto space-y-6">
                {/* Hidden Fields for Sheet Routing */}
                <input type="hidden" name="sheet" value={type} />
                <input type="hidden" name="subject" value={type === 'Package' ? `Package: ${packageName}` : 'General Appointment'} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required aria-required="true" className={inputStyles} disabled={isSubmitting} />
                    </div>
                    <div>
                    <label htmlFor="patient-id" className="block text-sm font-medium text-gray-700 mb-2">Patient ID <span className="text-gray-400">(Optional)</span></label>
                    <input type="text" id="patient-id" name="patient-id" placeholder="e.g., P12345" className={inputStyles} disabled={isSubmitting} />
                    </div>
                </div>

                <fieldset disabled={isSubmitting}>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">Patient Type</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <input type="radio" id="new-patient" name="patient_type" value="new" className="peer sr-only" defaultChecked />
                        <label htmlFor="new-patient" className="flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 peer-checked:border-[#00B5A5] peer-checked:bg-teal-50 peer-checked:scale-105 hover:border-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <span className="font-semibold text-gray-800">New Patient</span>
                        </label>
                        </div>
                        <div>
                        <input type="radio" id="old-patient" name="patient_type" value="old" className="peer sr-only" />
                        <label htmlFor="old-patient" className="flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 peer-checked:border-[#00B5A5] peer-checked:bg-teal-50 peer-checked:scale-105 hover:border-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <span className="font-semibold text-gray-800">Returning Patient</span>
                        </label>
                        </div>
                    </div>
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <div className="flex">
                        <select name="country-code" aria-label="Country code" className={`${inputStyles} rounded-r-none border-r-0 max-w-[80px] px-2`} disabled={isSubmitting}>
                            {countryCodes.map(c => <option key={c.country} value={c.code}>{c.code}</option>)}
                        </select>
                        <input type="tel" id="placeholder-phone" name="phone" placeholder="98765 43210" required aria-required="true" className={`${inputStyles} rounded-l-none`} disabled={isSubmitting} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                        <input type="date" id="date" name="date" required aria-required="true" className={inputStyles} min={new Date().toISOString().split('T')[0]} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} disabled={isSubmitting} />
                    </div>
                </div>

                {type === 'Appointment' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                        <select id="time" name="time" required aria-required="true" className={inputStyles} value={selectedTime} onChange={e => setSelectedTime(e.target.value)} disabled={isSubmitting}>
                            <option value="">Select a time</option>
                            {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        </div>
                        <div>
                        <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">Preferred Doctor <span className="text-gray-400">(Optional)</span></label>
                        <select
                            id="doctor"
                            name="doctor_choice"
                            className={`${inputStyles} disabled:bg-gray-100`}
                            disabled={!selectedDate || !selectedTime || isSubmitting}
                        >
                            <option value="Any available doctor">Any available doctor</option>
                            {availableDoctors.map(doctor => <option key={doctor.id} value={`${doctor.name} (${doctor.specialty})`}>{doctor.name} - {doctor.specialty}</option>)}
                        </select>
                        </div>
                    </div>
                )}

                {type === 'Package' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Selected Package</label>
                        <input type="text" readOnly value={packageName} className={`${inputStyles} bg-teal-50 border-teal-200 font-bold text-[#0E2A47]`} />
                    </div>
                )}

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Additional Note <span className="text-gray-400">(Optional)</span></label>
                    <textarea id="company" name="company" rows={2} placeholder="Any specific requirements or medical history..." className={inputStyles} disabled={isSubmitting}></textarea>
                </div>
                </form>

                <div className="p-6 bg-gray-50 border-t border-gray-200 mt-auto">
                <button 
                    type="submit" 
                    onClick={() => formRef.current?.requestSubmit()} 
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 font-bold text-white bg-[#0E2A47] rounded-xl transition-all duration-300 ease-in-out hover:bg-[#00B5A5] shadow-lg hover:shadow-teal-500/20 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Sending Request...
                        </span>
                    ) : `Confirm ${type} Booking`}
                </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
