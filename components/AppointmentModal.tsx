import React, { useEffect, useRef, useState, useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import type { Doctor } from '../lib/doctorsData';

interface AppointmentModalProps {
  onClose: () => void;
}

const countryCodes = [
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
];

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
];

const AppointmentModal: React.FC<AppointmentModalProps> = ({ onClose }) => {
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
  }, [onClose, isSuccess]); // Re-bind focus trap when state changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
    }, 1500);
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
          <h2 id="appointment-heading" className="text-2xl font-bold text-[#0E2A47]">
            {isSuccess ? 'Request Submitted' : 'Book an Appointment'}
          </h2>
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
                    Your appointment request for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been received. Our team will contact you shortly to confirm.
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
                        <input type="radio" id="new-patient" name="patient-type" value="new" className="peer sr-only" required aria-required="true" />
                        <label htmlFor="new-patient" className="flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 peer-checked:border-[#00B5A5] peer-checked:bg-teal-50 peer-checked:scale-105 hover:border-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <svg className="w-8 h-8 mb-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                            <span className="font-semibold text-gray-800">New Patient</span>
                        </label>
                        </div>
                        <div>
                        <input type="radio" id="old-patient" name="patient-type" value="old" className="peer sr-only" />
                        <label htmlFor="old-patient" className="flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 peer-checked:border-[#00B5A5] peer-checked:bg-teal-50 peer-checked:scale-105 hover:border-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <svg className="w-8 h-8 mb-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-semibold text-gray-800">Returning Patient</span>
                        </label>
                        </div>
                    </div>
                </fieldset>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input type="date" id="date" name="date" required aria-required="true" className={inputStyles} min={new Date().toISOString().split('T')[0]} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} disabled={isSubmitting} />
                    </div>
                    <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <select id="time" name="time" required aria-required="true" className={inputStyles} value={selectedTime} onChange={e => setSelectedTime(e.target.value)} disabled={isSubmitting}>
                        <option value="">Select a time</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">Preferred Doctor <span className="text-gray-400">(Optional)</span></label>
                    <select
                        id="doctor"
                        name="doctor"
                        className={`${inputStyles} disabled:bg-gray-200 disabled:cursor-not-allowed`}
                        disabled={!selectedDate || !selectedTime || isSubmitting}
                    >
                        <option value="">Any available doctor</option>
                        {availableDoctors.length > 0 ? (
                            availableDoctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>)
                        ) : (
                            <option value="" disabled>
                                {selectedDate && selectedTime ? 'No doctors available at this time' : 'Please select date and time first'}
                            </option>
                        )}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <div className="flex">
                    <select name="country-code" aria-label="Country code" className={`${inputStyles} rounded-r-none border-r-0 max-w-[80px]`} disabled={isSubmitting}>
                        {countryCodes.map(c => <option key={c.country} value={c.code}>{c.code}</option>)}
                    </select>
                    <input type="tel" id="phone" name="phone" placeholder="555-123-4567" required aria-required="true" className={`${inputStyles} rounded-l-none`} disabled={isSubmitting} />
                    </div>
                </div>

                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit <span className="text-gray-400">(Optional)</span></label>
                    <textarea id="reason" name="reason" rows={2} placeholder="e.g. Annual checkup, consultation..." className={inputStyles} disabled={isSubmitting}></textarea>
                </div>
                </form>

                <div className="p-6 bg-gray-50 border-t border-gray-200 mt-auto">
                <button 
                    type="submit" 
                    onClick={() => formRef.current?.requestSubmit()} 
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl hover:shadow-teal-400/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#00B5A5] ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Request...
                        </span>
                    ) : 'Submit Request'}
                </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;