import React, { useState } from 'react';

export type TipCategory =
  | 'packing'
  | 'safety'
  | 'budget'
  | 'cultural'
  | 'transport'
  | 'general'
  | 'nature';

export interface TravelTip {
  id: string;
  category: TipCategory;
  title: string;
  content: string;
}

interface TravelTipsProps {
  tips: TravelTip[];
  className?: string;
}

const CategoryIcon = ({ category }: { category: TipCategory }) => {
  switch (category) {
    case 'packing':
      return (
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
          <rect x="2" y="6" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'safety':
      return (
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'budget':
      return (
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
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'cultural':
      return (
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
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4 8 4v14" />
          <path d="M17 21v-8.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5V21" />
        </svg>
      );
    case 'transport':
      return (
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
          <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
          <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V10z" />
          <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
          <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5V14z" />
          <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5v-5z" />
          <path d="M10 9.5c0 .83-.67 1.5-1.5 1.5H3.5C2.67 11 2 10.33 2 9.5v-5C2 3.67 2.67 3 3.5 3h5C9.33 3 10 3.67 10 4.5v5z" />
        </svg>
      );
    default:
      return (
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

const getCategoryColor = (category: TipCategory) => {
  switch (category) {
    case 'packing':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    case 'safety':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    case 'budget':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'cultural':
      return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
    case 'transport':
      return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
    case 'nature':
      return 'text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-900/30';
    default:
      return 'text-[var(--text-secondary)] bg-[var(--bg-surface-raised)]';
  }
};

export const TravelTips: React.FC<TravelTipsProps> = ({ tips, className = '' }) => {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const toggleTip = (id: string) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === tips.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? tips.length - 1 : prev - 1));
  };

  if (tips.length === 0) return null;

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Travel Tips</h2>

        {/* Mobile controls */}
        <div className="flex md:hidden gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full hover:bg-[var(--bg-surface-raised)] transition-colors"
            aria-label="Previous tip"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full hover:bg-[var(--bg-surface-raised)] transition-colors"
            aria-label="Next tip"
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${getCategoryColor(tip.category)} transition-colors`}>
                <CategoryIcon category={tip.category} />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] block mb-1">
                  {tip.category}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                  {tip.title}
                </h3>
              </div>
            </div>

            <div className="relative">
              <p
                className={`text-[var(--text-secondary)] leading-relaxed text-sm ${expandedTip === tip.id ? '' : 'line-clamp-3'}`}
              >
                {tip.content}
              </p>

              {tip.content.length > 100 && (
                <button
                  onClick={() => toggleTip(tip.id)}
                  className="text-[var(--color-primary)] text-sm font-medium mt-2 flex items-center gap-1 hover:underline"
                >
                  {expandedTip === tip.id ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel/Swipeable */}
      <div className="md:hidden relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {tips.map((tip) => (
            <div key={tip.id} className="w-full flex-shrink-0 px-1">
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 shadow-sm h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${getCategoryColor(tip.category)}`}>
                    <CategoryIcon category={tip.category} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] block mb-1">
                      {tip.category}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{tip.title}</h3>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {tip.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeSlide ? 'bg-[var(--color-primary)]' : 'bg-[var(--border-subtle)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
