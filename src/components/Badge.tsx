import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100/80 text-gray-500 border border-gray-200',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-yellow-100/80 text-yellow-700 border border-yellow-200',
    danger: 'bg-danger/10 text-danger border border-danger/20',
    info: 'bg-primary-100/80 text-primary-700 border border-primary-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-normal ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
