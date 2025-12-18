import React, { useContext } from 'react';
import { MasterSetupContext } from './MasterSetupProvider';

// Utility to safely get a nested property from an object
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

interface EditableTextProps {
  // FIX: Use `keyof HTMLElementTagNameMap` to restrict the 'as' prop to HTML elements. This resolves type errors with props like `contentEditable` and `onBlur` that are not compatible with SVG elements.
  as: keyof HTMLElementTagNameMap;
  configKey: string;
  defaultValue: string;
  [x: string]: any; // for other props like className, style, etc.
}

const EditableText: React.FC<EditableTextProps> = ({
  as: Component,
  configKey,
  defaultValue,
  ...props
}) => {
  const { isMasterMode, config, updateConfig } = useContext(MasterSetupContext);

  const content = getNestedObjectValue(config, configKey) ?? defaultValue;

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    updateConfig(configKey, e.currentTarget.innerHTML, 'Text Update');
  };

  const masterModeProps = isMasterMode
    ? {
        contentEditable: true,
        suppressContentEditableWarning: true,
        onBlur: handleBlur,
        style: {
          ...props.style,
          outline: '2px dashed #00B5A5',
          outlineOffset: '4px',
          cursor: 'text',
        },
      }
    : {};

  return (
    <Component
      {...props}
      {...masterModeProps}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default EditableText;