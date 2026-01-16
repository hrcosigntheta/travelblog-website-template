import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  successText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-surface)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

  const variants = {
    primary:
      'bg-[var(--color-primary)] text-[var(--color-btn-primary-text)] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)] hover:shadow-lg hover:-translate-y-0.5',
    secondary:
      'bg-[var(--color-secondary)] text-[var(--color-btn-secondary-text)] hover:bg-opacity-90 focus:ring-[var(--color-secondary)] hover:shadow-lg hover:-translate-y-0.5',
    outline:
      'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-btn-primary-text)] focus:ring-[var(--color-primary)]',
    ghost:
      'text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] focus:ring-[var(--text-secondary)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  // Override for success state
  const successStyles = isSuccess
    ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 border-transparent hover:shadow-none hover:translate-y-0 cursor-default'
    : '';

  const classes = `
    ${baseStyles}
    ${isSuccess ? successStyles : variants[variant]}
    ${sizes[size]}
    ${widthStyles}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!isLoading && isSuccess && (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )}

      {!isLoading && !isSuccess && leftIcon && <span className="mr-2">{leftIcon}</span>}

      {isSuccess ? successText || 'Success' : children}

      {!isLoading && !isSuccess && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
