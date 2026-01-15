import type { FilterGroupProps } from '../types/search';

/**
 * A collapsible group of filter options (checkboxes or radios).
 * Supports counts, custom styling, and accessibility features.
 *
 * @example
 * <FilterGroup
 *   label="Category"
 *   options={[{ value: 'beach', label: 'Beach' }]}
 *   selectedValues={['beach']}
 *   onChange={(newValues) => console.log(newValues)}
 * />
 */
export default function FilterGroup({
  label,
  options,
  selectedValues,
  onChange,
  type = 'checkbox',
  defaultOpen = true,
  className = '',
}: FilterGroupProps) {
  // Using native details/summary for collapse, but we can control it if needed for animation.
  // For simple toggle, native details is fine.

  const handleChange = (optionValue: string) => {
    if (type === 'radio') {
      onChange([optionValue]);
    } else {
      // Checkbox logic
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    }
  };

  return (
    <div className={`border-b border-[var(--border-subtle)] py-4 ${className}`}>
      <details className="group" open={defaultOpen}>
        <summary className="flex items-center justify-between cursor-pointer list-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-sm)] hover:text-[var(--color-primary)] transition-colors p-1 -ml-1">
          <h3 className="text-[var(--text-primary)] font-semibold text-[length:var(--text-base)]">
            {label}
          </h3>
          <span className="text-[var(--text-secondary)] transition-transform duration-200 group-open:rotate-180">
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
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </summary>

        <div className="mt-4 space-y-2">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <label
                key={option.value}
                className="flex items-center group/option cursor-pointer py-1"
              >
                <div className="relative flex items-center">
                  <input
                    type={type}
                    name={label} // Group radios by label name
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleChange(option.value)}
                    className="peer appearance-none w-5 h-5 border border-[var(--border-default)] rounded-[var(--radius-sm)] bg-[var(--bg-default)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1 transition-all group-hover/option:border-[var(--color-primary)]"
                  />
                  {/* Checkmark for checkbox */}
                  {type === 'checkbox' && (
                    <svg
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-inverse)] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                  {/* Dot for radio */}
                  {type === 'radio' && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--text-inverse)] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                  )}
                </div>

                <div className="ml-3 flex-1 flex justify-between items-center text-[var(--text-secondary)] peer-checked:text-[var(--text-primary)] transition-colors">
                  <span className="text-[length:var(--text-sm)]">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-[length:var(--text-xs)] bg-[var(--bg-surface-raised)] px-2 py-0.5 rounded-full">
                      {option.count}
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </details>
    </div>
  );
}
