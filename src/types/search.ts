import type { FilterConfig, FilterOption } from './components';

/**
 * Props for the SearchInput component
 */
export interface SearchInputProps {
  /** Current value of the input */
  value: string;
  /** Callback fired when value changes (after debounce) */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in milliseconds */
  debounceTime?: number;
  /** Additional CSS classes */
  className?: string;
  /** HTML ID for the input element */
  id?: string;
}

/**
 * Props for the FilterGroup component
 */
export interface FilterGroupProps {
  /** Label for the filter group section */
  label: string;
  /** Array of available filter options */
  options: FilterOption[];
  /** Array of currently selected values */
  selectedValues: string[];
  /** Callback fired when selection changes */
  onChange: (values: string[]) => void;
  /** Input type: 'checkbox' for multiple selection, 'radio' for single selection */
  type?: 'checkbox' | 'radio';
  /** Whether the group is expanded by default */
  defaultOpen?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the SearchFilter component
 */
export interface SearchFilterProps {
  /** Current value of the search input */
  searchValue: string;
  /** Callback fired when search input changes */
  onSearchChange: (value: string) => void;
  /** Configuration for available filter groups */
  availableFilters: FilterConfig[];
  /** State of active filters (map of groupId -> selected values) */
  activeFilters: Record<string, string[]>;
  /** Callback fired when any filter changes */
  onFilterChange: (groupId: string, newValues: string[]) => void;
  /** Callback fired when "Clear all" is clicked */
  onClearAll: () => void;
  /** Additional CSS classes */
  className?: string;
}
