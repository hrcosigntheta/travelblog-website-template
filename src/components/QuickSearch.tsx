import { useState } from 'react';
import SearchInput from './SearchInput';

export interface QuickSearchProps {
  popularTags?: string[];
  className?: string;
}

export default function QuickSearch({
  popularTags = ['Beach', 'Mountains', 'Culture', 'Food'],
  className = '',
}: QuickSearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      window.location.assign(`/destinations?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleTagClick = (tag: string) => {
    window.location.assign(`/destinations?category=${encodeURIComponent(tag.toLowerCase())}`);
  };

  return (
    <div
      className={`bg-[var(--bg-surface)] p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--border-subtle)] ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Where do you want to go?"
            className="w-full"
            id="quick-search-input"
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-[48px] px-8 bg-[var(--color-primary)] text-[var(--color-btn-primary-text)] font-semibold rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
        >
          Search
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[length:var(--text-sm)] text-[var(--text-secondary)] font-medium">
          Popular:
        </span>
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-3 py-1 text-[length:var(--text-xs)] font-medium bg-[var(--bg-default)] border border-[var(--border-default)] rounded-full text-[var(--text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-4 text-center md:text-right">
        <a
          href="/destinations"
          className="text-[length:var(--text-sm)] font-medium text-[var(--color-primary)] hover:underline"
        >
          Advanced Search →
        </a>
      </div>
    </div>
  );
}
