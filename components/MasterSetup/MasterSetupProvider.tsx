
import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { defaultContent } from '../../lib/defaultContent';
import * as contentHistoryService from '../../lib/contentHistoryService';
import LoginModal from './LoginModal';
import { supabase } from '../../lib/supabaseClient';

// Utility to check if a variable is a non-null object
const isObject = (item: any): item is Record<string, any> => {
    return (item && typeof item === 'object' && !Array.isArray(item));
};

/**
 * Deeply and non-destructively merges properties from a source object into a target object.
 */
const deepMerge = <T extends Record<string, any>>(target: T, source: Record<string, any>): T => {
    const output: Record<string, any> = { ...target };

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const sourceValue = source[key];
                const targetValue = output[key];

                if (isObject(sourceValue) && isObject(targetValue)) {
                    output[key] = deepMerge(targetValue, sourceValue);
                } else {
                    output[key] = sourceValue;
                }
            }
        }
    }

    return output as T;
};

// Utility to safely set or delete a nested property in an object
const setNestedObjectValue = (obj: any, path: string, value: any): any => {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  const newObj = JSON.parse(JSON.stringify(obj)); // Deep copy
  let current = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== 'object' || current[key] === null) {
      const nextKey = keys[i + 1];
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  
  if (value === undefined) {
    if (Array.isArray(current) && /^\d+$/.test(lastKey)) {
      current.splice(parseInt(lastKey, 10), 1);
    } else {
      delete current[lastKey];
    }
  } else {
    current[lastKey] = value;
  }
  
  return newObj;
};

const keyToPageMap: Record<string, string> = {
    hero: 'Home',
    whyChooseUs: 'Home',
    specialties: 'Home',
    statsBar: 'Home',
    internationalPatients: 'Home',
    about: 'About Us',
    testimonials: 'About Us',
    doctors: 'Doctors',
    packages: 'Health Packages',
    contact: 'Contact',
    emergency: 'Emergency Care',
    portal: 'Patient Portal',
    career: 'Career',
    footer: 'Global',
    socialMedia: 'Global',
    timedPopups: 'Global',
};

const getPageFromKey = (key: string): string => {
    const topLevelKey = key.split('.')[0];
    return keyToPageMap[topLevelKey] || 'Unknown';
};

export interface MasterSetupContextType {
  isMasterMode: boolean;
  config: any;
  updateConfig: (key: string, value: any, type: string) => void;
}

export const MasterSetupContext = createContext<MasterSetupContextType>({
  isMasterMode: false,
  config: {},
  updateConfig: () => {},
});

interface MasterSetupProviderProps {
  children: ReactNode;
}

export const MasterSetupProvider: React.FC<MasterSetupProviderProps> = ({ children }) => {
  const [isMasterMode, setIsMasterMode] = useState(false);
  const [config, setConfig] = useState<any>(defaultContent);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [configId, setConfigId] = useState<number | null>(null);
  const initialized = useRef(false);

  // 1. Load Config from LocalStorage on Mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const fetchConfig = async () => {
        try {
            const storedConfig = localStorage.getItem('silverline_site_config');
            if (storedConfig) {
                const parsedConfig = JSON.parse(storedConfig);
                setConfig((prevConfig: any) => deepMerge(prevConfig, parsedConfig));
            }
        } catch (err: any) {
            console.error('Unexpected error loading config:', err.message || err);
        }
    };

    fetchConfig();

    // Check auth state
    const isAuthenticated = sessionStorage.getItem('masterAuth') === 'true';
    setIsMasterMode(isAuthenticated);
    
    const params = new URLSearchParams(window.location.search);
    if (params.get('master') === 'true' && !isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  }, []);

  // 2. Update Config in State and LocalStorage
  const updateConfig = (key: string, value: any, type: string) => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'master' && userRole !== 'superadmin' && userRole !== 'hr' && userRole !== 'admin') {
        return;
    }

    const scrollContainer = document.getElementById('master-dashboard-content');
    const scrollPosition = scrollContainer ? scrollContainer.scrollTop : null;

    setConfig((prevConfig: any) => {
      const newFullConfig = setNestedObjectValue(prevConfig, key, value);

      // Save to LocalStorage
      localStorage.setItem('silverline_site_config', JSON.stringify(newFullConfig));
      
      // Log history
      contentHistoryService.addHistory({
          page: getPageFromKey(key),
          section: key,
          type: type,
      });

      return newFullConfig;
    });
    
    if (scrollPosition !== null) {
        requestAnimationFrame(() => {
            const containerAfterUpdate = document.getElementById('master-dashboard-content');
            if (containerAfterUpdate) {
                containerAfterUpdate.scrollTop = scrollPosition;
            }
        });
    }
  };
  
  const handleLoginSuccess = () => {
    sessionStorage.setItem('masterAuth', 'true');
    setIsMasterMode(true);
    setIsLoginModalOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set('master', 'true');
    window.location.href = url.toString();
  };

  return (
    <MasterSetupContext.Provider value={{ isMasterMode, config, updateConfig }}>
      {children}
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
    </MasterSetupContext.Provider>
  );
};
