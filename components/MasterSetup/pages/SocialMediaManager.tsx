import React, { useContext } from 'react';
import { MasterSetupContext } from '../MasterSetupProvider';

const getNestedObjectValue = (obj: any, path: string): any => {
  if (!path || typeof path !== 'string') return undefined;
  // REGEX to handle array accessors like 'slides[0]'
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) {
      return undefined;
    }
    result = result[key];
  }
  return result;
};

const formatKeyToLabel = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
};

const MarketingManager: React.FC = () => {
    const { config, updateConfig } = useContext(MasterSetupContext);
    const userRole = sessionStorage.getItem('userRole');
    const readOnly = userRole !== 'master' && userRole !== 'superadmin';

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!readOnly) {
            // FIX: The `updateConfig` function requires a `type` argument. Added 'Text Update' to resolve the error.
            updateConfig(e.target.name, e.target.value, 'Text Update');
        }
    };
    
    const socialMediaKeys = Object.keys(config.socialMedia || {});

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing</h3>
             {readOnly && (
                 <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
                    <p className="font-bold">Read-Only Mode</p>
                    <p>You do not have permission to edit these settings.</p>
                </div>
            )}
            <div className="space-y-4">
                {socialMediaKeys.map(key => (
                    <div key={key}>
                        <label htmlFor={`social_${key}`} className="block text-sm font-medium text-gray-700 capitalize">{formatKeyToLabel(key)} URL</label>
                        <input
                            type="url"
                            id={`social_${key}`}
                            name={`socialMedia.${key}`}
                            defaultValue={getNestedObjectValue(config, `socialMedia.${key}`)}
                            onBlur={handleBlur}
                            readOnly={readOnly}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5] disabled:bg-gray-100"
                            disabled={readOnly}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketingManager;