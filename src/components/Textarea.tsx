import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-normal text-textColor-secondary mb-2">
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-primary-400/20 focus:border-primary-500 transition-all font-light text-sm placeholder:text-textColor-light/60 ${
          error ? 'border-danger focus:ring-danger/20 focus:border-danger' : 'border-gray-200 hover:border-gray-300'
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-danger font-light">{error}</p>}
    </div>
  );
};
