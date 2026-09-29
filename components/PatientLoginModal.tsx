import React, { useState, useEffect, useRef } from 'react';
import { mockPatients } from '../lib/patientData';

interface PatientLoginModalProps {
  onClose: () => void;
  onLogin: (patientId: string) => void;
}

const PatientLoginModal: React.FC<PatientLoginModalProps> = ({ onClose, onLogin }) => {
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [patientId, setPatientId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'credentials') {
      idInputRef.current?.focus();
    } else {
      otpInputRef.current?.focus();
    }
  }, [step]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const patient = mockPatients[patientId.trim().toUpperCase()];

    if (!patient) {
        setError('Invalid Patient ID. Please check and try again.');
        return;
    }

    if (patient.mobile !== mobileNumber.trim()) {
        setError('The mobile number does not match the registered number for this Patient ID.');
        return;
    }
    
    // All good, proceed to OTP step
    setIsLoading(true);
    setTimeout(() => { // Simulate API call
        setStep('otp');
        setIsLoading(false);
    }, 1000);
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (otp !== '123456') {
      setError('Invalid OTP. Please try again.');
      return;
    }
    
    onLogin(patientId.trim().toUpperCase());
  };
  
  const renderCredentialsStep = () => (
    <form onSubmit={handleCredentialsSubmit} className="space-y-4">
        <div>
            <label htmlFor="patient-id" className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
            <input
              ref={idInputRef}
              id="patient-id"
              name="patient-id"
              type="text"
              autoComplete="off"
              required
              placeholder="e.g., P12345"
              className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-[#00B5A5] transition-colors"
              value={patientId}
              onChange={(e) => { setPatientId(e.target.value); setError(''); }}
            />
            <p className="mt-2 text-xs text-gray-500">
                Hint: Try <code className="bg-gray-200 px-1 rounded">P12345</code> or <code className="bg-gray-200 px-1 rounded">P67890</code>
            </p>
        </div>
        <div>
            <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-2">Registered Mobile Number</label>
            <input
              id="mobile-number"
              name="mobile-number"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              placeholder="e.g., 9876543210"
              className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-[#00B5A5] transition-colors"
              value={mobileNumber}
              onChange={(e) => { setMobileNumber(e.target.value); setError(''); }}
            />
            <p className="mt-2 text-xs text-gray-500">
                Hint: Try <code className="bg-gray-200 px-1 rounded">9876543210</code> or <code className="bg-gray-200 px-1 rounded">8765432109</code>
            </p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" disabled={isLoading} className="w-full mt-4 px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0E2A47] hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] transition-colors disabled:bg-gray-400">
            {isLoading ? 'Verifying...' : 'Send OTP'}
        </button>
    </form>
  );

  const renderOtpStep = () => (
    <form onSubmit={handleOtpSubmit} className="space-y-4">
        <div className="text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
            <p>An OTP has been sent to your registered mobile number <strong className="text-gray-800">{mobileNumber}</strong>.</p>
        </div>
        <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
            <input
              ref={otpInputRef}
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              placeholder="6-digit code"
              className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-[#00B5A5] transition-colors"
              value={otp}
              onChange={(e) => { setOtp(e.target.value); setError(''); }}
            />
             <p className="mt-2 text-xs text-gray-500">
                This is a demo. Please use the code <code className="bg-gray-200 px-1 rounded">123456</code>.
            </p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full mt-4 px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0E2A47] hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] transition-colors">
            Verify & Login
        </button>
    </form>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="patient-login-heading"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4 transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-6 border-b">
          <h2 id="patient-login-heading" className="text-2xl font-bold text-[#0E2A47]">
            {step === 'credentials' ? 'Patient Portal Login' : 'Verify Your Identity'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
            {step === 'credentials' ? renderCredentialsStep() : renderOtpStep()}
        </div>
      </div>
    </div>
  );
};

export default PatientLoginModal;
