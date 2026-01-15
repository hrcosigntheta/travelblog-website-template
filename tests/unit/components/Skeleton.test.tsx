import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import {
  SkeletonBase,
  TextSkeleton,
  ImageSkeleton,
  DestinationCardSkeleton,
} from '../../../src/components/Skeleton';

describe('Skeleton Components', () => {
  describe('SkeletonBase', () => {
    it('renders with correct base classes', () => {
      render(<SkeletonBase />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('animate-pulse');
      expect(skeleton).toHaveClass('bg-neutral-200');
      expect(skeleton).toHaveClass('dark:bg-neutral-700');
    });

    it('applies custom dimensions', () => {
      render(<SkeletonBase width="100px" height="50px" />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle({ width: '100px', height: '50px' });
    });

    it('applies variant classes', () => {
      render(<SkeletonBase variant="circular" />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('rounded-full');
    });
  });

  describe('TextSkeleton', () => {
    it('renders single line by default', () => {
      render(<TextSkeleton />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toBeInTheDocument();
    });

    it('renders multiple lines', () => {
      render(<TextSkeleton lines={3} />);
      const skeletons = screen.getAllByRole('status');
      expect(skeletons).toHaveLength(3);
    });
  });

  describe('ImageSkeleton', () => {
    it('applies aspect ratio class', () => {
      render(<ImageSkeleton aspectRatio="aspect-video" />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('aspect-video');
    });
  });

  describe('DestinationCardSkeleton', () => {
    it('renders with correct structure', () => {
      render(<DestinationCardSkeleton />);
      const container = screen.getByLabelText('Loading destination...');
      expect(container).toBeInTheDocument();
      // Should contain multiple skeletons (image, title, location, desc lines, footer badges)
      const skeletons = screen.getAllByRole('status');
      expect(skeletons.length).toBeGreaterThan(5);
    });
  });
});
