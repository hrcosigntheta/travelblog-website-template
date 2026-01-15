import React from 'react';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results found',
  message = 'Try adjusting your filters or search terms to find what you looking for.',
  actionLabel = 'Clear all filters',
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-background-surface rounded-lg border border-border-subtle animate-in fade-in duration-300">
      {icon ? (
        <div className="mb-4 text-text-muted">{icon}</div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4 text-text-muted opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}

      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary max-w-md mb-6">{message}</p>

      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-primary text-white rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
