import React from 'react';
import { defaultContent } from '../../lib/defaultContent';

// Utility to safely get a nested property from canonical default content
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

interface EditableTextProps {
  as?: keyof HTMLElementTagNameMap;
  configKey?: string;
  defaultValue?: string;
  children?: React.ReactNode;
  [x: string]: any;
}

const EditableText: React.FC<EditableTextProps> = ({
  as: Component = 'span',
  configKey,
  defaultValue,
  children,
  ...props
}) => {
  const content = (configKey ? getNestedObjectValue(defaultContent, configKey) : undefined) ?? defaultValue ?? children;

  // Safe rendering: if string contains simple line breaks like <br/>, render with dangerouslySetInnerHTML using verified static content
  if (typeof content === 'string' && (content.includes('<br') || content.includes('<span'))) {
    return (
      <Component
        {...props}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <Component {...props}>
      {content}
    </Component>
  );
};

export default EditableText;
