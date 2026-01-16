import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      containerClassName = '',
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const baseInputStyles =
      'w-full px-4 py-3 rounded-lg bg-[var(--bg-surface-raised)] border outline-none transition-all duration-200 text-[var(--text-primary)] placeholder-[var(--text-muted)]';

    const stateStyles = error
      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
      : 'border-[var(--border-default)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20';

    return (
      <div className={`relative group ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium mb-2 transition-all duration-200 origin-left ${
              error
                ? 'text-red-500'
                : isFocused
                  ? 'text-[var(--color-primary)] scale-105 -translate-y-0.5'
                  : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
            }`}
          >
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${baseInputStyles} ${stateStyles} ${className}`}
            aria-invalid={!!error}
            {...props}
          />
        </div>

        {/* Error or Helper Text with animation */}
        <div className="min-h-[20px] mt-1 overflow-hidden">
          <div
            className={`text-sm transition-all duration-300 transform ${
              error
                ? 'translate-y-0 opacity-100 text-red-500'
                : helperText
                  ? 'translate-y-0 opacity-100 text-[var(--text-secondary)]'
                  : '-translate-y-2 opacity-0'
            }`}
          >
            {error || helperText}
          </div>
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
