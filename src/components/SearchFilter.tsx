import type { FilterConfig } from '../types/components';
import FilterGroup from './FilterGroup';
import SearchInput from './SearchInput';
import { useState } from 'react';

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

/**
 * Composite component combining a search input and collapsible filter groups.
 * Handles responsive layout (sidebar on desktop, bottom sheet/modal on mobile).
 */
export default function SearchFilter({
  searchValue,
  onSearchChange,
  availableFilters,
  activeFilters,
  onFilterChange,
  onClearAll,
  className = '',
}: SearchFilterProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const activeFilterCount = Object.values(activeFilters).reduce(
    (acc, curr) => acc + curr.length,
    0
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Input */}
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search destinations..."
        className="w-full"
      />

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex justify-between items-center">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center gap-2 text-[var(--text-primary)] font-medium border border-[var(--border-default)] px-4 py-2 rounded-[var(--radius-md)] bg-[var(--bg-card)]"
          aria-expanded={isMobileFiltersOpen}
          aria-controls="filter-panel"
        >
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
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-[var(--color-primary)] text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-[length:var(--text-sm)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel (Desktop: Always visible / Mobile: Collapsible) */}
      <div
        id="filter-panel"
        className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block space-y-1`}
      >
        <div className="hidden lg:flex justify-between items-center mb-4">
          <h2 className="text-[length:var(--text-lg)] font-bold text-[var(--text-primary)]">
            Filters
          </h2>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-[length:var(--text-sm)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {availableFilters.map((filter) => (
          <FilterGroup
            key={filter.id}
            label={filter.label}
            options={filter.options}
            selectedValues={activeFilters[filter.id] || []}
            onChange={(newValues) => onFilterChange(filter.id, newValues)}
            type={filter.type}
            defaultOpen={filter.defaultOpen}
          />
        ))}
      </div>
    </div>
  );
}
