import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-normal text-gray-500 mb-2">
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-primary-400/20 focus:border-primary-500 transition-all font-light text-sm ${
          error ? 'border-danger focus:ring-danger/20 focus:border-danger' : 'border-gray-200 hover:border-gray-300'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-danger font-light">{error}</p>}
    </div>
  );
};
