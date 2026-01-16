import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCount,
      maxLength,
      className = '',
      containerClassName = '',
      onFocus,
      onBlur,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [charCount, setCharCount] = React.useState(
      value ? String(value).length : defaultValue ? String(defaultValue).length : 0
    );

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    // Update char count if value prop changes externally
    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    const baseInputStyles =
      'w-full px-4 py-3 rounded-lg bg-[var(--bg-surface-raised)] border outline-none transition-all duration-200 text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-y min-h-[120px]';

    const stateStyles = error
      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
      : 'border-[var(--border-default)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20';

    return (
      <div className={`relative group ${containerClassName}`}>
        <div className="flex justify-between items-end mb-2">
          {label && (
            <label
              htmlFor={props.id}
              className={`block text-sm font-medium transition-colors duration-200 ${
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

          {showCount && maxLength && (
            <span
              className={`text-xs transition-colors duration-200 ${
                charCount > maxLength * 0.9
                  ? 'text-orange-500 font-medium'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              {charCount} / {maxLength}
            </span>
          )}

          {showCount && !maxLength && (
            <span className="text-xs text-[var(--text-muted)]">{charCount} chars</span>
          )}
        </div>

        <div className="relative">
          <textarea
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            className={`${baseInputStyles} ${stateStyles} ${className}`}
            aria-invalid={!!error}
            {...props}
          />
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

Textarea.displayName = 'Textarea';
