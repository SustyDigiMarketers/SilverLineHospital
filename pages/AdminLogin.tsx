import React, { useState } from 'react';
import { addLog } from '../lib/auditLogService';
import * as credentialsService from '../lib/credentialsService';
import type { UserRole } from '../lib/credentialsService';
import EditableImage from '../components/MasterSetup/EditableImage';

const AdminLogin: React.FC = () => {
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Store user data between steps
  const [verifiedUser, setVerifiedUser] = useState<{ username: string; role: UserRole } | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Verify against Supabase table
    const verificationResult = await credentialsService.verifyAsync(username, password);

    if (verificationResult.success && verificationResult.role) {
      // Success, move to OTP step
      setVerifiedUser({ username, role: verificationResult.role });
      setStep('otp');
    } else {
      setError(verificationResult.message);
    }
    setIsLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (otp === '123456') {
      if (verifiedUser) {
        sessionStorage.setItem('userRole', verifiedUser.role);
        sessionStorage.setItem('username', verifiedUser.username);

        if (verifiedUser.role === 'master') {
          sessionStorage.setItem('masterAuth', 'true');
        }

        // Log login event to Supabase
        await addLog(verifiedUser.username, 'login');
        window.location.hash = '#master-dashboard';
      } else {
         setError('An unexpected error occurred. Please start over.');
         setStep('credentials');
      }
    } else {
      setError('Invalid OTP. Please try again.');
    }
    setIsLoading(false);
  };
  
  const renderCredentialsStep = () => (
    <form className="mt-8 space-y-6" onSubmit={handleCredentialsSubmit} noValidate>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#00B5A5] focus:border-[#00B5A5]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#00B5A5] focus:border-[#00B5A5]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E2A47] hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
    </form>
  );

  const renderOtpStep = () => (
    <>
      <div className="mt-4 text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
        <p>This is a simulated 2FA flow.</p>
        <p>Enter the code <strong className="text-gray-800">123456</strong> to proceed.</p>
      </div>
      <form className="mt-6 space-y-6" onSubmit={handleOtpSubmit} noValidate>
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              One-Time Password (OTP)
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#00B5A5] focus:border-[#00B5A5]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E2A47] hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>
      </form>
    </>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        <div className="text-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = '#home'; }} className="inline-block mb-6">
                <EditableImage configKey="imagePaths.logos.main" alt="Logo" className="h-10 w-15" />
            </a>
            <h2 className="text-2xl font-bold text-[#0E2A47]">
                {step === 'credentials' ? 'Panel Access' : 'Two-Step Verification'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                {step === 'credentials' 
                    ? 'Please sign in to your account' 
                    : 'A verification code is required to continue.'}
            </p>
        </div>

        {step === 'credentials' ? renderCredentialsStep() : renderOtpStep()}
        
         <div className="text-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = '#home'; }} className="text-sm font-medium text-[#00B5A5] hover:text-[#0E2A47]">
                &larr; Back to website
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
