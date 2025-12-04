import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-normal rounded-sm transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-soft-md';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-400/30 active:bg-primary-800',
    secondary: 'bg-card text-text-primary border border-border-card hover:bg-primary-50 focus:ring-2 focus:ring-border-card/50 active:bg-primary-100',
    danger: 'bg-danger text-white hover:bg-danger-dark focus:ring-2 focus:ring-danger/30 active:bg-danger-dark',
    success: 'bg-success text-white hover:bg-success-dark focus:ring-2 focus:ring-success/30 active:bg-success-dark',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};
