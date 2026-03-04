import React, { useState, useEffect } from 'react';
import * as credentialsService from '../../../lib/credentialsService';

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
  </svg>
);

const CredentialsManager: React.FC = () => {
  const [credentials, setCredentials] = useState<credentialsService.Credentials>({});
  const [passwordInputs, setPasswordInputs] = useState<Record<string, string>>({});
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [newCredential, setNewCredential] = useState({ username: '', password: '' });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const userRole = sessionStorage.getItem('userRole');

  const loadCredentials = async () => {
    const creds = await credentialsService.getCredentialsAsync();
    setCredentials(creds);
    setPasswordInputs(creds); 
  };

  useEffect(() => {
    loadCredentials();
  }, []);

  const handleInputChange = (username: string, value: string) => {
    setPasswordInputs(prev => ({ ...prev, [username]: value }));
  };
  
  const handleUpdate = async (username: credentialsService.UserRole) => {
    const success = await credentialsService.updateCredentialAsync(username, passwordInputs[username]);
    if (success) {
      flashMessage(`Password for '${username}' updated successfully.`, 'success');
      loadCredentials();
    } else {
      flashMessage(`Failed to update password for '${username}'.`, 'error');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await credentialsService.addCredentialAsync(newCredential.username, newCredential.password);
    flashMessage(result.message, result.success ? 'success' : 'error');
    if (result.success) {
      loadCredentials();
      setNewCredential({ username: '', password: '' });
    }
  };

  const handleDelete = async (username: credentialsService.UserRole) => {
    if (window.confirm(`Are you sure you want to delete the user '${username}'? This cannot be undone.`)) {
      const result = await credentialsService.deleteCredentialAsync(username);
      flashMessage(result.message, result.success ? 'success' : 'error');
      if (result.success) {
        loadCredentials();
      }
    }
  };

  const togglePasswordVisibility = (username: string) => {
    setVisiblePasswords(prev => ({ ...prev, [username]: !prev[username] }));
  };

  const flashMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const isMaster = userRole === 'master';
  const credentialEntries = Object.entries(credentials);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Credentials</h3>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-800' : 'bg-red-100 border-l-4 border-red-500 text-red-800'}`} role="alert">
          <p>{message.text}</p>
        </div>
      )}
      
      {/* Existing Credentials */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Existing Users</h4>
        {credentialEntries.length === 0 && <p className="text-gray-500">Loading...</p>}
        {credentialEntries.map(([username, _]) => {
          const canEdit = isMaster || (userRole === 'superadmin' && username !== 'master');
          const isOwnAccount = username === userRole;

          return (
            <div key={username} className="flex flex-col sm:flex-row items-center sm:space-x-4">
              <label htmlFor={username} className="sm:w-1/4 font-medium text-gray-700 capitalize">
                {username}
              </label>
              <div className="relative flex-grow w-full mt-1 sm:mt-0">
                <input
                  id={username}
                  type={visiblePasswords[username] ? 'text' : 'password'}
                  value={passwordInputs[username] || ''}
                  onChange={(e) => handleInputChange(username, e.target.value)}
                  disabled={!canEdit && !isOwnAccount}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button type="button" onClick={() => togglePasswordVisibility(username)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                  {visiblePasswords[username] ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex w-full sm:w-auto mt-2 sm:mt-0 space-x-2">
                <button
                  onClick={() => handleUpdate(username)}
                  disabled={!canEdit && !isOwnAccount}
                  className="w-1/2 sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#0E2A47] rounded-md hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(username)}
                  disabled={!isMaster || username === 'master'}
                  className="w-1/2 sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Credential Form */}
      {isMaster && (
        <form onSubmit={handleAdd} className="mt-10 pt-6 border-t">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Add New User</h4>
          <p className="text-sm text-gray-500 mb-4">
            For a new user to have dashboard access, their username must match a predefined role with permissions (e.g., 'admin', 'hr', 'superadmin').
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
            <input
              type="text"
              placeholder="New username"
              value={newCredential.username}
              onChange={(e) => setNewCredential(prev => ({ ...prev, username: e.target.value }))}
              className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5]"
            />
            <input
              type="password"
              placeholder="New password"
              value={newCredential.password}
              onChange={(e) => setNewCredential(prev => ({ ...prev, password: e.target.value }))}
              className="w-full sm:w-1/3 mt-2 sm:mt-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add User
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CredentialsManager;
