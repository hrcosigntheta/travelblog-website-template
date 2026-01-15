export interface FilterOption {
  /** The value of the option */
  value: string;
  /** The display label of the option */
  label: string;
  /** Optional count of items matching this option */
  count?: number;
}

export interface FilterConfig {
  /** Unique identifier for the filter group */
  id: string;
  /** Display label for the filter group */
  label: string;
  /** List of filter options */
  options: FilterOption[];
  /** Type of selection: 'checkbox' (multiple) or 'radio' (single) */
  type?: 'checkbox' | 'radio';
  /** Whether the group is expanded by default */
  defaultOpen?: boolean;
}
