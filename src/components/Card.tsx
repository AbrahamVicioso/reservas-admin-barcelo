import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, action }) => {
  return (
    <div className={`bg-white rounded-lg shadow-soft border border-gray-100 ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between px-7 py-6 border-b border-gray-50">
          <div>
            {title && <h3 className="text-lg font-normal text-textColor-primary tracking-tight">{title}</h3>}
            {subtitle && <p className="text-sm text-textColor-light font-light mt-1.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="px-7 py-6">{children}</div>
    </div>
  );
};
