import React from 'react';
import type { TagBadgeProps, TagBadgeVariant } from '../types/destination';

export const TagBadge: React.FC<TagBadgeProps> = ({
  label,
  variant = 'default',
  icon,
  onClick,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200';

  // Variant styles mapping to theme tokens
  const variantStyles: Record<TagBadgeVariant, string> = {
    default: 'bg-background-surface border border-border-default text-text-secondary',
    category: 'bg-badge-primary-bg text-badge-primary-text border border-badge-primary-border',
    activity:
      'bg-badge-secondary-bg text-badge-secondary-text border border-badge-secondary-border',
    difficulty: 'bg-background-raised text-text-primary border border-border-default',
    budget: 'bg-badge-jungle-bg text-badge-jungle-text border border-badge-jungle-border',
  };

  const clickableStyles = onClick
    ? 'cursor-pointer hover:opacity-80 hover:shadow-sm active:scale-95'
    : 'cursor-default';

  // Note: Using inline conditional class concatenation since clsx/cn is not available
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        className={combinedClassName}
        onClick={onClick}
        aria-label={`Filter by ${label}`}
      >
        {icon && (
          <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">{icon}</span>
        )}
        {label}
      </button>
    );
  }

  return (
    <span className={combinedClassName}>
      {icon && (
        <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">{icon}</span>
      )}
      {label}
    </span>
  );
};
