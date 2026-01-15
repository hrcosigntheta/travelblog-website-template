import React from 'react';
import { SkeletonBase, type SkeletonBaseProps } from './SkeletonBase';

export interface TextSkeletonProps extends Omit<SkeletonBaseProps, 'variant'> {
  /** Number of lines to render */
  lines?: number;
  /** Width of the last line when lines > 1. Defaults to '70%' */
  lastLineWidth?: string | number;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines = 1,
  className = '',
  lastLineWidth = '70%',
  width,
  height = '1rem', // Default text height
  ...props
}) => {
  if (lines === 1) {
    return (
      <SkeletonBase
        variant="rounded"
        height={height}
        width={width || '100%'}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBase
          key={index}
          variant="rounded"
          height={height}
          width={index === lines - 1 ? lastLineWidth : width || '100%'}
          {...props}
        />
      ))}
    </div>
  );
};
