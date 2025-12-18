import React, { useState, useContext, useRef } from 'react';
import { MasterSetupContext } from '../MasterSetupProvider';
import GalleryManager from './GalleryManager';
import { compressAndConvertToBase64 } from '../../../lib/imageService';

// --- HELPER FUNCTIONS & CONFIG ---

const getNestedObjectValue = (obj: any, path: string): any => {
    if (!path || typeof path !== 'string' || !obj) return undefined;
    const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let result = obj;
    for (const key of keys) {
        if (result === null || result === undefined) return undefined;
        result = result[key];
    }
    return result;
};

const pageIcons: Record<string, React.ReactNode> = {
    Home: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    'About Us': <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Specialties: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>,
    Contact: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Career: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
    'Emergency Care': <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    Global: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.757 15.757a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-2.829 2.828a2 2 0 01-2.828 0l-2.828-2.828a2 2 0 010-2.828l2.828-2.829z M14.243 1.243a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-2.829 2.828a2 2 0 01-2.828 0l-2.828-2.828a2 2 0 010-2.828l2.828-2.829z" /></svg>,
    Gallery: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
};

const pageToConfigMap: Record<string, string[]> = {
    'Home': ['hero', 'whyChooseUs', 'specialties', 'statsBar', 'internationalPatients'],
    'About Us': ['about', 'testimonials'],
    'Specialties': ['specialtiesPage'],
    'Contact': ['contact'],
    'Career': ['career'],
    'Emergency Care': ['emergency'],
    'Global': ['footer', 'socialMedia', 'brandAssets'],
};

const isObject = (item: any): item is Record<string, any> => {
    return (item && typeof item === 'object' && !Array.isArray(item));
};

const formatLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/\[(\d+)\]/g, ' $1').replace(/^./, str => str.toUpperCase());

// --- EDITOR COMPONENTS ---

const FieldEditor: React.FC<{ configKey: string; value: any; label: string }> = ({ configKey, value, label }) => {
    const { updateConfig } = useContext(MasterSetupContext);
    const isTextarea = typeof value === 'string' && value.length > 80;
    const isColor = typeof value === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(value);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateConfig(configKey, e.target.value, 'Text Update');
    };
    
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateConfig(configKey, e.target.value, 'Color Update');
    };

    if (isColor) {
        return (
            <div>
                <label htmlFor={configKey} className="block text-sm font-medium text-gray-600">{label}</label>
                <div className="mt-1 flex items-center gap-2">
                    <input
                        type="color"
                        defaultValue={value}
                        onChange={handleColorChange}
                        className="p-0 h-10 w-10 border border-gray-300 rounded-md cursor-pointer"
                    />
                    <input
                        type="text"
                        defaultValue={value}
                        onBlur={handleBlur}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00B5A5] focus:border-[#00B5A5] sm:text-sm font-mono"
                    />
                </div>
            </div>
        )
    }

    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
        <div>
            <label htmlFor={configKey} className="block text-sm font-medium text-gray-600">{label}</label>
            <InputComponent
                id={configKey}
                name={configKey}
                defaultValue={value}
                onBlur={handleBlur}
                rows={isTextarea ? 4 : undefined}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00B5A5] focus:border-[#00B5A5] sm:text-sm"
            />
        </div>
    );
};

const ImageField: React.FC<{ configKey: string, value: string, label: string }> = ({ configKey, value, label }) => {
    const { updateConfig } = useContext(MasterSetupContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleUploadClick = () => fileInputRef.current?.click();

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
            console.error("Upload failed:", error);
            alert("Failed to process image. Try a smaller file.");
        } finally {
            setUploading(false);
            event.target.value = ''; 
        }
    };

    const handleRemove = () => {
        if (window.confirm('Are you sure you want to remove this image?')) {
            updateConfig(configKey, '', 'Image Deletion');
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        updateConfig(configKey, e.target.value, 'Image Path Update');
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-600">{label}</label>
            <div className="mt-2 flex items-center gap-4">
                {value ? (
                    <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-md bg-gray-100 border" />
                ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <button 
                        type="button" 
                        onClick={handleUploadClick} 
                        disabled={uploading}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                        {uploading ? 'Processing...' : 'Change Image'}
                    </button>
                    {value && (
                        <button type="button" onClick={handleRemove} className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md shadow-sm hover:bg-red-100 focus:outline-none">
                            Remove
                        </button>
                    )}
                </div>
            </div>
            <input
                type="text"
                defaultValue={value}
                onBlur={handleBlur}
                className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="Image path or URL..."
            />
        </div>
    );
};


const ArrayEditor: React.FC<{ configKey: string; items: any[]; label: string }> = ({ configKey, items, label }) => {
    const { updateConfig } = useContext(MasterSetupContext);
    const [isOpen, setIsOpen] = useState(true);

    const handleDelete = (index: number) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        const newItems = items.filter((_, i) => i !== index);
        updateConfig(configKey, newItems, 'Item Deleted');
    };
    
    const handleAdd = () => {
        const newItem = items.length > 0 ? JSON.parse(JSON.stringify(items[0])) : {};
        // Clear values of the new item
        Object.keys(newItem).forEach(key => newItem[key] = '');
        const newItems = [...items, newItem];
        updateConfig(configKey, newItems, 'Item Added');
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg border">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left font-semibold text-gray-700 flex justify-between items-center">
                {label} ({items.length} items)
                <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="mt-4 space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded border relative">
                            <h4 className="font-medium text-gray-500 mb-2">Item {index + 1}</h4>
                            <div className="space-y-3">
                                <ContentNode path={`${configKey}[${index}]`} data={item} />
                            </div>
                            <button onClick={() => handleDelete(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    ))}
                    <button onClick={handleAdd} className="mt-4 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Add New Item</button>
                </div>
            )}
        </div>
    );
};

const ContentNode: React.FC<{ path: string; data: any }> = ({ path, data }) => {
    const key = path.split('.').pop() || '';
    const label = formatLabel(key);
    
    const isImageField = typeof data === 'string' && (
        key.toLowerCase().includes('image') ||
        key.toLowerCase().includes('logo') ||
        key.toLowerCase().includes('icon') ||
        key.toLowerCase().includes('favicon') ||
        key.toLowerCase().includes('bg') ||
        data.startsWith('http') || 
        data.startsWith('data:image') ||
        /\.(jpg|jpeg|png|svg|gif|webp)$/i.test(data)
    );

    if (isImageField) {
        return <ImageField configKey={path} value={data} label={label} />;
    }
    if (typeof data === 'string' || typeof data === 'number') {
        return <FieldEditor configKey={path} value={data} label={label} />;
    }
    if (Array.isArray(data)) {
        return <ArrayEditor configKey={path} items={data} label={label} />;
    }
    if (isObject(data)) {
        return (
            <div className="space-y-4">
                {Object.entries(data).map(([key, value]) => (
                    <ContentNode key={key} path={`${path}.${key}`} data={value} />
                ))}
            </div>
        );
    }
    return null;
};

// --- MAIN COMPONENT ---

const ContentEditor: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const [activeTab, setActiveTab] = useState<string>('Home');
    
    const orderedTabs = [
        'Home',
        'About Us',
        'Specialties',
        'Contact',
        'Career',
        'Emergency Care',
        'Global',
        'Gallery'
    ];
    
    const configKeysForPage = pageToConfigMap[activeTab] || [];
    
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="flex border-b border-gray-200 overflow-x-auto">
                {orderedTabs.map(pageName => (
                    <button
                        key={pageName}
                        onClick={() => setActiveTab(pageName)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00B5A5] ${activeTab === pageName ? 'border-[#00B5A5] text-[#00B5A5]' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                    >
                        {pageIcons[pageName]} <span>{pageName}</span>
                    </button>
                ))}
            </div>
            
            <div className="p-6">
                 {activeTab === 'Gallery' ? (
                    <GalleryManager />
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                         <h3 className="text-xl font-semibold text-gray-800">Editing: <span className="text-[#00B5A5]">{activeTab}</span></h3>
                         <div className="space-y-6">
                            {configKeysForPage.map(key => (
                                <div key={key} className="p-4 border rounded-lg bg-gray-50/50">
                                    <h4 className="text-lg font-bold text-gray-700 mb-4 capitalize">{formatLabel(key)}</h4>
                                    <ContentNode path={key} data={getNestedObjectValue(config, key)} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentEditor;
