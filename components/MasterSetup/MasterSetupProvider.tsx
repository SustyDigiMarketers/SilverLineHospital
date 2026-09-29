
import React, { createContext, ReactNode } from 'react';
import { defaultContent } from '../../lib/defaultContent';

export interface MasterSetupContextType {
  isMasterMode: boolean;
  config: any;
  updateConfig: (key: string, value: any, type: string) => void;
}

export const MasterSetupContext = createContext<MasterSetupContextType>({
  isMasterMode: false,
  config: defaultContent,
  updateConfig: () => {},
});

interface MasterSetupProviderProps {
  children: ReactNode;
}

export const MasterSetupProvider: React.FC<MasterSetupProviderProps> = ({ children }) => {
  return (
    <MasterSetupContext.Provider value={{ isMasterMode: false, config: defaultContent, updateConfig: () => {} }}>
      {children}
    </MasterSetupContext.Provider>
  );
};

