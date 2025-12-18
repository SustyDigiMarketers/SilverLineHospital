import React, { useContext, useState } from 'react';
import { MasterSetupContext } from './MasterSetupProvider';
import AuditLogModal from './AuditLogModal';

const MasterSetupPanel: React.FC = () => {
  const { isMasterMode } = useContext(MasterSetupContext);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  if (!isMasterMode) {
    return null;
  }

  const handleExit = () => {
    // Clear the session authentication
    sessionStorage.removeItem('masterAuth');
    
    // Redirect to the clean URL
    const url = new URL(window.location.href);
    url.searchParams.delete('master');
    window.location.href = url.toString();
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[9999] bg-[#0E2A47] text-white p-4 rounded-lg shadow-2xl flex items-center space-x-4 animate-fade-in">
        <div>
          <h3 className="font-bold">Master Setup Mode</h3>
          <p className="text-sm text-gray-300">Click on any outlined text to edit.</p>
        </div>
        <div className="flex items-center space-x-2">
            <button
                onClick={() => setIsLogModalOpen(true)}
                className="px-4 py-2 text-sm font-medium bg-sky-600 rounded-full transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0E2A47] focus:ring-sky-500"
            >
                Audit Log
            </button>
            <button
                onClick={handleExit}
                className="px-4 py-2 text-sm font-medium bg-red-600 rounded-full transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0E2A47] focus:ring-red-500"
            >
                Exit
            </button>
        </div>
      </div>
      {isLogModalOpen && <AuditLogModal onClose={() => setIsLogModalOpen(false)} />}
    </>
  );
};

export default MasterSetupPanel;