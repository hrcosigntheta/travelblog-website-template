import React, { useState, useMemo } from 'react';
import SearchFilter from './SearchFilter';
import { DestinationCard } from './DestinationCard';
import { EmptyState } from './EmptyState';
import { DestinationCardSkeleton } from './Skeleton/DestinationCardSkeleton';
import { ShareButtons } from './ShareButtons';
import { destinations } from '../data/destinations';
import { createSearchIndex, searchDestinations } from '../utils/search';
import type { FilterConfig } from '../types/components';

const FILTERS: FilterConfig[] = [
  {
    id: 'region',
    label: 'Region',
    options: [
      { value: 'Palawan', label: 'Palawan' },
      { value: 'Bohol', label: 'Bohol' },
      { value: 'Cebu', label: 'Cebu' },
      { value: 'Siargao', label: 'Siargao' },
      { value: 'Visayas', label: 'Visayas' },
      { value: 'Luzon', label: 'Luzon' },
      { value: 'Mindanao', label: 'Mindanao' },
    ],
    type: 'checkbox',
    defaultOpen: true,
  },
  {
    id: 'category',
    label: 'Category',
    options: [
      { value: 'Beach', label: 'Beach' },
      { value: 'Nature', label: 'Nature' },
      { value: 'Hiking', label: 'Hiking' },
      { value: 'Surfing', label: 'Surfing' },
      { value: 'Diving', label: 'Diving' },
      { value: 'City', label: 'City' },
      { value: 'Culture', label: 'Culture' },
    ],
    type: 'checkbox',
    defaultOpen: true,
  },
  {
    id: 'difficulty',
    label: 'Difficulty',
    options: [
      { value: 'Easy', label: 'Easy' },
      { value: 'Moderate', label: 'Moderate' },
      { value: 'Challenging', label: 'Challenging' },
    ],
    type: 'checkbox',
    defaultOpen: false,
  },
  {
    id: 'budget',
    label: 'Budget',
    options: [
      { value: '$', label: 'Budget ($)' },
      { value: '$$', label: 'Mid-range ($$)' },
      { value: '$$$', label: 'Luxury ($$$)' },
    ],
    type: 'checkbox',
    defaultOpen: false,
  },
];

const mapBudgetToLevel = (budgetStr: string): 'budget' | 'mid-range' | 'luxury' => {
  if (budgetStr.includes('$$$$') || budgetStr.includes('$$$')) return 'luxury';
  if (budgetStr.includes('$$')) return 'mid-range';
  return 'budget';
};

export default function DestinationsListing() {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper to parse URL params
  const parseUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    const newFilters: Record<string, string[]> = {};

    ['category', 'region', 'difficulty', 'budget'].forEach((key) => {
      const val = params.get(key);
      if (val) newFilters[key] = val.split(',');
    });

    return { query, newFilters };
  };

  // Initialize state and listeners
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const { query, newFilters } = parseUrlParams();
      setSearchValue(query);
      setActiveFilters(newFilters);
      setIsInitialized(true);

      const handlePopState = () => {
        const { query, newFilters } = parseUrlParams();
        setSearchValue(query);
        setActiveFilters(newFilters);
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  // Sync state to URL
  React.useEffect(() => {
    if (!isInitialized) return;

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (searchValue) params.set('q', searchValue);

      Object.entries(activeFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(','));
        }
      });

      const newQueryString = params.toString();
      const newUrl = `${window.location.pathname}${newQueryString ? '?' + newQueryString : ''}`;

      // Only push state if URL actually changed to avoid duplicate history entries
      if (newUrl !== window.location.pathname + window.location.search) {
        window.history.pushState({}, '', newUrl);
      }
    }
  }, [searchValue, activeFilters, isInitialized]);

  const handleFilterChange = (groupId: string, newValues: string[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [groupId]: newValues,
    }));
  };

  const handleClearAll = () => {
    setSearchValue('');
    setActiveFilters({});
  };

  const searchIndex = useMemo(() => createSearchIndex(destinations), []);

  const filteredDestinations = useMemo(() => {
    // Wait for initialization to avoid flash of wrong content
    if (!isInitialized) return destinations;

    let results = destinations;

    // 1. Search Filter (Fuzzy)
    if (searchValue) {
      results = searchDestinations(searchIndex, searchValue);
    }

    return results.filter((dest) => {
      // 2. Facet Filters
      for (const [groupId, selectedValues] of Object.entries(activeFilters)) {
        if (selectedValues.length === 0) continue;

        if (groupId === 'region') {
          // Region matching (exact or partial if needed, but usually exact for filters)
          // The data region might be "Surigao del Norte" vs filter "Siargao" or "Mindanao".
          // For simplicity, we check if destination region *contains* the filter value or equals it.
          // Or we update data to match. Let's assume partial match for flexibility.
          const matchesRegion = selectedValues.some(
            (val) => dest.region.includes(val) || val.includes(dest.region)
          );
          if (!matchesRegion) return false;
        }

        if (groupId === 'category') {
          // Check if ANY selected category is present in dest.tags
          const hasCategory = selectedValues.some((cat) => dest.tags.includes(cat));
          if (!hasCategory) return false;
        }

        if (groupId === 'difficulty') {
          // dest.stats.difficulty: 'Easy', 'Moderate'
          const matchesDiff = selectedValues.includes(dest.stats.difficulty);
          if (!matchesDiff) return false;
        }

        if (groupId === 'budget') {
          // dest.stats.budget: '$$ - $$$'
          // We check if the destination budget string contains the filter symbol
          const matchesBudget = selectedValues.some((b) => dest.stats.budget.includes(b));
          if (!matchesBudget) return false;
        }
      }

      return true;
    });
  }, [searchValue, activeFilters, searchIndex, isInitialized]);

  // Update counts in filters
  const filtersWithCounts = useMemo(() => {
    return FILTERS.map((filter) => ({
      ...filter,
      options: filter.options.map((opt) => {
        // Calculate count for this option being applied alone (or within current context?)
        // Standard UX is usually "global count" or "count within current other filters".
        // Let's do simple global count for now to avoid perf issues, or filtered count.
        // Let's just pass options as is for now, Component doesn't seemingly use counts in UI yet (SearchFilter.tsx doesn't show them explicitly in options render, only total badge).
        return opt;
      }),
    }));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24">
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            availableFilters={filtersWithCounts}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-3">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-text-secondary">
            {isInitialized ? (
              <>
                Showing{' '}
                <span className="font-bold text-text-primary">{filteredDestinations.length}</span>{' '}
                destinations
              </>
            ) : (
              <span className="animate-pulse bg-surface-neutral-subtle h-5 w-48 rounded inline-block" />
            )}
          </p>

          {isInitialized && filteredDestinations.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-muted">Share results:</span>
              <ShareButtons
                showLabel={false}
                title="Explore these amazing destinations in the Philippines!"
              />
            </div>
          )}
        </div>

        {!isInitialized ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <DestinationCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                id={dest.id}
                slug={dest.slug}
                title={dest.title}
                location={dest.region}
                image={dest.image}
                category={dest.tags[0] || 'Travel'}
                description={dest.description}
                priceLevel={mapBudgetToLevel(dest.stats.budget)}
                difficulty={
                  dest.stats.difficulty.toLowerCase() as 'easy' | 'moderate' | 'challenging'
                }
                bestSeason={dest.stats.bestTime}
                rating={dest.rating}
              />
            ))}
          </div>
        ) : (
          <EmptyState onAction={handleClearAll} />
        )}
      </main>
    </div>
  );
}
