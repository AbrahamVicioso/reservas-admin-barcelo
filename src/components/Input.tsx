import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-normal text-textColor-secondary mb-2">
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-primary-400/20 focus:border-primary-500 transition-all font-light text-sm placeholder:text-textColor-light/60 ${
          error ? 'border-danger focus:ring-danger/20 focus:border-danger' : 'border-gray-200 hover:border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-danger font-light">{error}</p>}
    </div>
  );
};
