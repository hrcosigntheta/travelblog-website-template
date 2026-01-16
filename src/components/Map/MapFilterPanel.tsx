import { useState } from 'react';

interface MapFilterPanelProps {
  categories: string[];
  regions: string[];
  selectedCategories: string[];
  selectedRegions: string[];
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
  onClear: () => void;
  filteredCount: number;
  totalCount: number;
}

export default function MapFilterPanel({
  categories,
  regions,
  selectedCategories,
  selectedRegions,
  onCategoryChange,
  onRegionChange,
  onClear,
  filteredCount,
  totalCount,
}: MapFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`z-[2000] transition-all duration-300 ${
        isOpen
          ? 'fixed inset-0 md:absolute md:inset-auto md:top-20 md:left-4 md:w-full md:max-w-[280px] flex flex-col justify-end md:block pointer-events-none md:pointer-events-auto'
          : 'absolute top-20 left-4 w-fit'
      }`}
    >
      {/* Mobile Toggle Button (visible when collapsed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-3.5 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2.5 w-fit touch-manipulation"
          aria-label="Open filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="font-medium text-base">Filters</span>
        </button>
      )}

      {/* Main Panel */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[-1] md:hidden pointer-events-auto"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm p-5 md:p-4 shadow-xl border border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-bottom-full md:slide-in-from-top-2 duration-300 pointer-events-auto rounded-t-2xl md:rounded-xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="text-xl md:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
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
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors touch-manipulation"
                aria-label="Close filters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {/* Categories */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-white group py-1.5"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => onCategoryChange(category)}
                          className="peer appearance-none w-5 h-5 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 checked:bg-blue-600 dark:checked:bg-blue-500 checked:border-transparent transition-all"
                        />
                        <svg
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Regions
                </h3>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <label
                      key={region}
                      className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-white group py-1.5"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRegions.includes(region)}
                          onChange={() => onRegionChange(region)}
                          className="peer appearance-none w-5 h-5 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 checked:bg-blue-600 dark:checked:bg-blue-500 checked:border-transparent transition-all"
                        />
                        <svg
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                      <span>{region}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center flex-shrink-0">
              <span className="text-sm md:text-xs text-zinc-500 dark:text-zinc-400">
                Showing {filteredCount} of {totalCount}
              </span>
              {(selectedCategories.length > 0 || selectedRegions.length > 0) && (
                <button
                  onClick={onClear}
                  className="text-sm md:text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors py-2 md:py-0"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
