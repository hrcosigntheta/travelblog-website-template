import React from 'react';

export interface SkeletonBaseProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'rounded';
  'aria-label'?: string;
}

export const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  className = '',
  width,
  height,
  variant = 'rectangular',
  'aria-label': ariaLabel = 'Loading...',
}) => {
  // Base styles: Pulse animation, background colors for light/dark modes
  // Using neutral-200 (light) and neutral-700 (dark) as per standard patterns
  // which align with the theme system's neutral palette
  const baseStyles = 'animate-pulse bg-neutral-200 dark:bg-neutral-700';

  const variantStyles = {
    rectangular: 'rounded-none',
    circular: 'rounded-full',
    rounded: 'rounded-md',
  };

  const style: React.CSSProperties = {};
  if (width !== undefined) style.width = width;
  if (height !== undefined) style.height = height;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
      role="status"
      aria-label={ariaLabel}
    />
  );
};
