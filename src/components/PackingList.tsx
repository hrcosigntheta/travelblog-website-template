import React, { useState, useEffect } from 'react';
import type { PackingListCategory } from '../data/packingLists';

interface PackingListProps {
  categories: PackingListCategory[];
  storageKey?: string;
}

export const PackingList: React.FC<PackingListProps> = ({
  categories,
  storageKey = 'travel-packing-list',
}) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        // eslint-disable-next-line
        setCheckedItems(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      console.error('Failed to load packing list:', e);
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(checkedItems)));
    } catch (e) {
      console.error('Failed to save packing list:', e);
    }
  }, [checkedItems, isLoaded, storageKey]);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const clearList = () => {
    if (confirm('Are you sure you want to clear your packing list?')) {
      setCheckedItems(new Set());
    }
  };

  // Calculate progress
  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = checkedItems.size;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-6 bg-[var(--bg-card)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Packing List</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            {checkedCount} of {totalItems} items packed
          </p>
        </div>
        <button
          onClick={clearList}
          className="text-sm text-[var(--text-muted)] hover:text-red-500 transition-colors px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
          aria-label="Clear packing list"
        >
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-[var(--bg-surface)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-primary)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.id} className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
              {category.title}
              <span className="text-xs font-normal text-[var(--text-muted)] bg-[var(--bg-surface-raised)] px-2 py-0.5 rounded-full">
                {category.items.filter((i) => checkedItems.has(i.id)).length}/
                {category.items.length}
              </span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.items.map((item) => (
                <li key={item.id}>
                  <label
                    className={`
                      flex items-center p-3 rounded-lg border transition-all cursor-pointer select-none group
                      ${
                        checkedItems.has(item.id)
                          ? 'bg-[var(--bg-surface-raised)] border-[var(--color-primary)]'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--color-primary)]'
                      }
                    `}
                  >
                    <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item.id)}
                        onChange={() => toggleItem(item.id)}
                        className="peer appearance-none w-5 h-5 border-2 border-[var(--text-muted)] rounded checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] transition-colors focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-card)]"
                      />
                      <svg
                        className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span
                      className={`
                        text-sm transition-colors
                        ${
                          checkedItems.has(item.id)
                            ? 'text-[var(--text-muted)] line-through'
                            : 'text-[var(--text-primary)]'
                        }
                      `}
                    >
                      {item.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
