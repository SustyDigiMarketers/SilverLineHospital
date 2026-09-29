import React from 'react';
import { defaultContent } from '../../lib/defaultContent';

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

interface EditableImageProps {
  configKey?: string;
  className?: string;
  alt: string;
  style?: React.CSSProperties;
  defaultValue?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  src?: string;
  [x: string]: any;
}

const EditableImage: React.FC<EditableImageProps> = ({
  configKey,
  className,
  alt,
  style,
  defaultValue = '',
  priority = false,
  loading,
  src: directSrc,
  ...props
}) => {
  const rawVal = directSrc || (configKey ? getNestedObjectValue(defaultContent, configKey) : undefined);
  const pathOrUrl = (rawVal !== undefined && rawVal !== null && rawVal !== '') ? rawVal : defaultValue;
  const isReference = typeof pathOrUrl === 'string' && pathOrUrl.startsWith('imagePaths.');
  let resolvedSrc = isReference ? (getNestedObjectValue(defaultContent, pathOrUrl) || defaultValue) : (pathOrUrl || defaultValue);

  const isDoctor = 
    (typeof pathOrUrl === 'string' && pathOrUrl.includes('/Doctor/')) ||
    (configKey && configKey.toLowerCase().includes('doctor')) ||
    (alt && (alt.toLowerCase().includes('dr.') || alt.toLowerCase().includes('doctor')));

  if (isDoctor && (!resolvedSrc || resolvedSrc.trim() === '')) {
    resolvedSrc = '/Doctor/default-doctor.svg';
  }

  let finalClassName = className || '';
  if (isDoctor && finalClassName.includes('object-cover') && !finalClassName.includes('object-top') && !finalClassName.includes('object-bottom') && !finalClassName.includes('object-center')) {
    finalClassName = `${finalClassName} object-top`;
  }

  const DEFAULT_STANDBY_FALLBACK = '/Standby/DSC_9806.jpg';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (props.onError) {
      props.onError(e);
      return;
    }
    const target = e.currentTarget;
    if (isDoctor) {
      if (!target.src.endsWith('/Doctor/default-doctor.svg')) {
        console.warn(`[StandbyImage] Doctor image failed to load: "${target.src}". Falling back to safe doctor avatar: /Doctor/default-doctor.svg`);
        target.src = '/Doctor/default-doctor.svg';
      }
    } else {
      if (!target.src.endsWith(DEFAULT_STANDBY_FALLBACK)) {
        console.warn(`[StandbyImage] Image asset failed to load: "${target.src}". Falling back to safe standby asset: ${DEFAULT_STANDBY_FALLBACK}`);
        target.src = DEFAULT_STANDBY_FALLBACK;
      }
    }
  };

  return (
    <img 
      src={resolvedSrc} 
      alt={alt} 
      className={finalClassName} 
      style={style} 
      loading={priority ? "eager" : (loading || "lazy")} 
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchpriority: "high" } : {})}
      onError={handleImageError}
      {...props}
    />
  );
};

export default EditableImage;
