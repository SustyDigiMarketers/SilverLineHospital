import React, { useContext, useRef, useState } from 'react';
import { MasterSetupContext } from '../MasterSetupProvider';
import { compressAndConvertToBase64 } from '../../../lib/imageService';

const getNestedObjectValue = (obj: any, path: string): any => {
  if (!path || typeof path !== 'string') return undefined;
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
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ImageEditor: React.FC<{ configKey: string; readOnly: boolean; }> = ({ configKey, readOnly }) => {
    const { config, updateConfig } = useContext(MasterSetupContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageUrl = getNestedObjectValue(config, configKey) || '';
    const [uploading, setUploading] = useState(false);

    const handleUploadClick = () => {
        if (!readOnly) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const base64Url = await compressAndConvertToBase64(file);
            if (base64Url) {
                updateConfig(configKey, base64Url, 'Image Upload');
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("There was an error processing the image. Please try another file.");
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        if (!readOnly && window.confirm('Are you sure you want to remove this image?')) {
            updateConfig(configKey, '', 'Image Deletion');
        }
    };
    
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!readOnly) {
            updateConfig(configKey, e.target.value, 'Image Path Update');
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="mt-1 flex items-center gap-4">
                {imageUrl ? (
                    <img src={imageUrl} alt="Popup preview" className="w-24 h-24 object-cover rounded-md bg-gray-100 border" />
                ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        disabled={readOnly}
                    />
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        disabled={readOnly || uploading}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Processing...' : 'Upload Image'}
                    </button>
                    {imageUrl && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            disabled={readOnly}
                            className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            Remove Image
                        </button>
                    )}
                </div>
            </div>
             <p className="mt-2 text-xs text-gray-500">
                The image path or Data URL is below. You can also paste a URL here directly.
            </p>
             <input
                type="text"
                name={configKey}
                value={imageUrl}
                onChange={handleTextChange}
                readOnly={readOnly}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5] disabled:bg-gray-100 sm:text-sm"
                disabled={readOnly}
                placeholder="e.g., /assets/popup-image.jpg or data:image/..."
            />
        </div>
    );
};


const EventHandler: React.FC = () => {
    const { config, updateConfig } = useContext(MasterSetupContext);
    const userRole = sessionStorage.getItem('userRole');
    const readOnly = userRole !== 'master' && userRole !== 'superadmin';
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!readOnly) {
            updateConfig(e.target.name, e.target.value, 'Text Update');
        }
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!readOnly) {
            updateConfig(e.target.name, e.target.checked, 'Boolean Update');
        }
    };

    const popupKeys = Object.keys(config.timedPopups || {});
    
    const renderField = (path: string) => {
        const label = formatKeyToLabel(path.split('.').pop() || '');
        const isTextarea = label === 'Description';
        
        return (
            <div key={path}>
                <label htmlFor={path} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {isTextarea ? (
                    <textarea
                        id={path}
                        name={path}
                        rows={3}
                        defaultValue={getNestedObjectValue(config, path)}
                        onBlur={handleBlur}
                        readOnly={readOnly}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5] disabled:bg-gray-100"
                        disabled={readOnly}
                    />
                ) : (
                    <input
                        type={'text'}
                        id={path}
                        name={path}
                        defaultValue={getNestedObjectValue(config, path)}
                        onBlur={handleBlur}
                        readOnly={readOnly}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5] disabled:bg-gray-100"
                        disabled={readOnly}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Timed Popup Content</h3>
            {readOnly && (
                 <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
                    <p className="font-bold">Read-Only Mode</p>
                    <p>You do not have permission to edit this content.</p>
                </div>
            )}
            {popupKeys.map(key => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h4 className="text-lg font-medium text-gray-900">{formatKeyToLabel(key)}</h4>
                         <label className="flex items-center space-x-2 cursor-pointer">
                            <span className="text-sm font-medium text-gray-700">Active</span>
                            <input
                                type="checkbox"
                                name={`timedPopups.${key}.isActive`}
                                checked={getNestedObjectValue(config, `timedPopups.${key}.isActive`) ?? true}
                                onChange={handleCheckboxChange}
                                disabled={readOnly}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                            />
                        </label>
                    </div>
                    <div className="space-y-4">
                        {renderField(`timedPopups.${key}.title`)}
                        {renderField(`timedPopups.${key}.description`)}
                        <ImageEditor 
                            configKey={`timedPopups.${key}.image`} 
                            readOnly={readOnly}
                        />
                        {renderField(`timedPopups.${key}.date`)}
                        {renderField(`timedPopups.${key}.time`)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventHandler;
