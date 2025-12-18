import React, { useContext } from 'react';
import { MasterSetupContext } from './MasterSetupProvider';

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

interface EditableImageProps {
  configKey: string;
  className?: string;
  alt: string;
  style?: React.CSSProperties;
}

const EditableImage: React.FC<EditableImageProps> = ({
  configKey,
  className,
  alt,
  style,
}) => {
  const { isMasterMode, config, updateConfig } = useContext(MasterSetupContext);

  const pathOrUrl = getNestedObjectValue(config, configKey) ?? '';
  
  const isReference = typeof pathOrUrl === 'string' && pathOrUrl.startsWith('imagePaths.');

  const src = isReference ? getNestedObjectValue(config, pathOrUrl) : pathOrUrl;

  const handleEdit = () => {
    if (!isMasterMode) return;
    
    const normalizePath = (path: string): string => {
        try {
            if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
                return path;
            }
            const url = new URL(path, window.location.origin);
            return url.pathname;
        } catch (e) {
            console.error("Could not normalize path:", path, e);
            return path;
        }
    };

    const keyToUpdate = isReference ? pathOrUrl : configKey;
    if (!keyToUpdate) {
        console.error("EditableImage: Cannot determine key to update for configKey:", configKey);
        return;
    }
    
    const newSrc = prompt('Enter new image URL:', src);
    if (newSrc && newSrc.trim() !== '') {
      const normalizedSrc = normalizePath(newSrc.trim());
      updateConfig(keyToUpdate, normalizedSrc, 'Image Update');
    }
  };

  if (!isMasterMode) {
    return <img src={src} alt={alt} className={className} style={style} loading="lazy" />;
  }

  return (
    <div
      className={`relative group ${className || ''}`}
      style={style}
      title={`Click to edit: ${isReference ? pathOrUrl : configKey}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover" // Ensure image fills container
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={handleEdit}
        style={{
          outline: '3px dashed #00B5A5',
          outlineOffset: '-3px',
        }}
      >
        <div className="bg-white/90 text-[#0E2A47] p-4 rounded-full shadow-lg transform group-hover:scale-100 scale-90 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EditableImage;