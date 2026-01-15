import { useState, useEffect, useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
  className?: string;
  id?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  debounceTime = 300,
  className = '',
  id = 'search-input',
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (debouncedTimeout.current) {
      clearTimeout(debouncedTimeout.current);
    }

    debouncedTimeout.current = setTimeout(() => {
      onChange(newValue);
    }, debounceTime);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
    if (debouncedTimeout.current) {
      clearTimeout(debouncedTimeout.current);
    }
    // Focus input after clear
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) input.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* Input */}
      <input
        type="search"
        id={id}
        className="block w-full h-[48px] pl-10 pr-10 rounded-[var(--radius-md)] bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent outline-none transition-all"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        aria-label={placeholder}
      />

      {/* Clear Button */}
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}
