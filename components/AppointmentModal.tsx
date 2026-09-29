import React, { useEffect, useRef, useState, useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import type { Doctor } from '../lib/doctorsData';
import { submitToGoogleSheets, SubmissionResult, FormSheetType } from '../lib/formSubmission';
import ReceiptModal from './ReceiptModal';
import { AlertCircle } from 'lucide-react';

interface AppointmentModalProps {
  onClose: () => void;
  type?: 'Appointment' | 'Package' | 'Foregin PT' | 'Contact';
  packageName?: string;
  initialDoctor?: string;
  initialSpecialty?: string;
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

const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
  onClose, 
  type = 'Appointment', 
  packageName,
  initialDoctor,
  initialSpecialty
}) => {
  const { config } = useContext(MasterSetupContext);
  const doctors: Doctor[] = config.doctors?.list || [];
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // URL query parameter support (?specialty= and ?doctor=)
  const defaultDoctor = initialDoctor || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('doctor') || '' : '');
  const defaultSpecialty = initialSpecialty || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('specialty') || '' : '');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<SubmissionResult | null>(null);

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
      if (event.key === 'Escape' && !receiptData) {
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
  }, [onClose, receiptData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const sheetName: FormSheetType = (type as FormSheetType) || 'Appointment';
    const fullName = (formData.get('name') as string) || '';
    const patientId = (formData.get('patient-id') as string) || 'N/A';
    const patientType = formData.get('patient_type') === 'new' ? 'New Patient' : 'Returning Patient';
    const dateVal = (formData.get('date') as string) || '';
    const timeVal = (formData.get('time') as string) || (type === 'Package' ? 'Flexible' : 'Flexible');
    const doctorVal = (formData.get('doctor_choice') as string) || 
      (formData.get('specialty_choice') ? `Specialty: ${formData.get('specialty_choice')}` : 
      (type === 'Package' ? packageName || 'Health Package' : 'General Consultation'));
    const contactVal = `${formData.get('country-code') || '+91'} ${formData.get('phone') || ''}`;
    const reasonVal = (formData.get('company') as string) || (type === 'Package' ? `Booking: ${packageName}` : 'Medical Consultation');

    try {
      const result = await submitToGoogleSheets({
        sheet: sheetName,
        FullName: fullName,
        PatientID: patientId,
        PatientType: patientType,
        Date: dateVal,
        Time: timeVal,
        Doctor: doctorVal,
        Contact: contactVal,
        Reason: reasonVal,
        type: type === 'Contact' ? 'Contact Inquiry' : undefined
      });

      if (result.success) {
        setReceiptData(result);
      } else {
        setErrorMessage(result.error || 'Submission Failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      setErrorMessage('Submission Failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputStyles = "block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#00B5A5] focus:border-[#00B5A5] transition duration-200 ease-in-out disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in p-3 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-heading"
      >
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform animate-scale-up border border-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 border-b border-gray-200 bg-slate-50/50">
            <div className="flex flex-col">
              <h2 id="appointment-heading" className="text-2xl font-bold text-[#0E2A47]">
                {type === 'Package' ? 'Book Health Package' : 
                 type === 'Foregin PT' ? 'Foreign Patient Registration' : 
                 type === 'Contact' ? 'Contact Us' :
                 'Book an Appointment'}
              </h2>
              {packageName && <p className="text-teal-600 font-bold text-sm mt-1">{packageName}</p>}
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

          {/* Form Content */}
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-8 overflow-y-auto space-y-6">
            {/* Failure Alert Box */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                  <p className="text-xs text-red-600 mt-0.5">Please check your details and try submitting again.</p>
                </div>
              </div>
            )}

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
                    defaultValue={defaultDoctor || "Any available doctor"}
                    disabled={isSubmitting}
                  >
                    <option value="Any available doctor">Any available doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={`${doctor.name} (${doctor.specialty})`}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {type === 'Foregin PT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="foreign-specialty" className="block text-sm font-medium text-gray-700 mb-2">Specialty / Department <span className="text-gray-400">(Optional)</span></label>
                  <input
                    type="text"
                    id="foreign-specialty"
                    name="specialty_choice"
                    defaultValue={defaultSpecialty}
                    placeholder="e.g., Cardiology, Oncology"
                    className={inputStyles}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="foreign-doctor" className="block text-sm font-medium text-gray-700 mb-2">Preferred Consultant <span className="text-gray-400">(Optional)</span></label>
                  <input
                    type="text"
                    id="foreign-doctor"
                    name="doctor_choice"
                    defaultValue={defaultDoctor}
                    placeholder="e.g., Dr. Senthil Kumar"
                    className={inputStyles}
                    disabled={isSubmitting}
                  />
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

          {/* Modal Footer Submit Button */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 mt-auto">
            <button 
              type="button" 
              onClick={() => formRef.current?.requestSubmit()} 
              disabled={isSubmitting}
              className={`w-full px-6 py-4 font-bold text-white bg-[#0E2A47] rounded-xl transition-all duration-300 ease-in-out hover:bg-[#00B5A5] shadow-lg hover:shadow-teal-500/20 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] active:translate-y-0 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Submitting Request...
                </span>
              ) : `Confirm ${type} Booking`}
            </button>
          </div>
        </div>
      </div>

      {/* Printing Receipt Success Animation Modal */}
      {receiptData && (
        <ReceiptModal
          receipt={receiptData}
          onClose={() => {
            setReceiptData(null);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default AppointmentModal;
