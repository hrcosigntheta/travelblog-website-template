import React from 'react';
import { SkeletonBase, type SkeletonBaseProps } from './SkeletonBase';

export interface ImageSkeletonProps extends SkeletonBaseProps {
  /** Tailwind aspect ratio class, e.g., 'aspect-video', 'aspect-[4/3]' */
  aspectRatio?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  aspectRatio,
  className = '',
  width = '100%',
  height,
  ...props
}) => {
  return (
    <SkeletonBase
      variant="rectangular"
      className={`${aspectRatio || ''} ${className}`}
      width={width}
      height={height || (aspectRatio ? undefined : '100%')}
      {...props}
    />
  );
};
