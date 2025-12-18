import React, { useState, useEffect, useRef } from 'react';
import * as credentialsService from '../../lib/credentialsService';
import { addLog } from '../../lib/auditLogService';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const username = 'master';
    const result = await credentialsService.verifyAsync(username, password);

    if (result.success) {
      await addLog(username, 'login');
      onLoginSuccess();
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="master-login-heading"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm m-4 p-8 transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
            <h2 id="master-login-heading" className="text-2xl font-bold text-[#0E2A47]">Master Login</h2>
            <p className="mt-2 text-sm text-gray-600">Enter password for live editing mode.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="master-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Master Password
            </label>
            <input
              ref={passwordInputRef}
              id="master-password"
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

          <div className="flex items-center justify-between gap-4">
            <button
                type="button"
                onClick={onClose}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
            >
                Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E2A47] hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
