import React from 'react';
import { SkeletonBase } from './SkeletonBase';
import { TextSkeleton } from './TextSkeleton';
import { ImageSkeleton } from './ImageSkeleton';

export interface DestinationCardSkeletonProps {
  className?: string;
}

export const DestinationCardSkeleton: React.FC<DestinationCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col h-full overflow-hidden rounded-lg bg-background-surface border border-border-subtle ${className}`}
      aria-label="Loading destination..."
    >
      {/* Image Placeholder */}
      <ImageSkeleton aspectRatio="aspect-[4/3]" />

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        {/* Location */}
        <SkeletonBase height="0.875rem" width="40%" variant="rounded" />

        {/* Title */}
        <SkeletonBase height="1.5rem" width="80%" variant="rounded" />

        {/* Description */}
        <TextSkeleton lines={3} className="w-full" />

        {/* Footer */}
        <div className="pt-4 mt-auto border-t border-border-subtle flex items-center gap-3">
          <SkeletonBase height="1.5rem" width="3rem" variant="rounded" />
          <SkeletonBase height="1.5rem" width="5rem" variant="rounded" />
        </div>
      </div>
    </div>
  );
};
