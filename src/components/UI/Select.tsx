import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[] | string[];
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      className = '',
      containerClassName = '',
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const baseInputStyles =
      'w-full px-4 py-3 rounded-lg bg-[var(--bg-surface-raised)] border outline-none transition-all duration-200 text-[var(--text-primary)] appearance-none cursor-pointer';

    const stateStyles = error
      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
      : 'border-[var(--border-default)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20';

    return (
      <div className={`relative group ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
              error
                ? 'text-red-500'
                : isFocused
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
            }`}
          >
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${baseInputStyles} ${stateStyles} ${className}`}
            aria-invalid={!!error}
            {...props}
          >
            {options.map((option) => {
              const value = typeof option === 'string' ? option : option.value;
              const label = typeof option === 'string' ? option : option.label;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[var(--text-secondary)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Error or Helper Text */}
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

Select.displayName = 'Select';
