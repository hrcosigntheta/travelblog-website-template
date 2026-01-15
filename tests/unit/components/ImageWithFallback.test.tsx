import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { ImageWithFallback } from '../../../src/components/ImageWithFallback';

// Mock getAssetPath to return the path as is or modified
vi.mock('../../../src/utils/paths', () => ({
  getAssetPath: (path: string) => `/mocked-base${path}`,
}));

describe('ImageWithFallback', () => {
  const defaultProps = {
    src: '/images/test.jpg',
    alt: 'Test image',
  };

  it('renders with loading state initially', () => {
    render(<ImageWithFallback {...defaultProps} />);
    // Check for placeholder
    const placeholder = screen.getByTestId('loading-placeholder');
    expect(placeholder).toBeInTheDocument();

    // Image should be in document but hidden (opacity-0)
    const img = screen.getByAltText('Test image');
    expect(img).toHaveClass('opacity-0');
  });

  it('removes loading state and shows image on load', () => {
    render(<ImageWithFallback {...defaultProps} />);
    const img = screen.getByAltText('Test image');

    fireEvent.load(img);

    expect(screen.queryByTestId('loading-placeholder')).not.toBeInTheDocument();
    expect(img).toHaveClass('opacity-100');
  });

  it('shows fallback image on error', () => {
    render(<ImageWithFallback {...defaultProps} fallbackSrc="/images/custom-fallback.jpg" />);
    const img = screen.getByAltText('Test image');

    fireEvent.error(img);

    expect(img).toHaveAttribute('src', '/images/custom-fallback.jpg');
    // Should also remove loading state
    expect(screen.queryByTestId('loading-placeholder')).not.toBeInTheDocument();
  });

  it('uses default fallback if none provided', () => {
    render(<ImageWithFallback {...defaultProps} />);
    const img = screen.getByAltText('Test image');

    fireEvent.error(img);

    // Check if it uses the mocked path from utils
    expect(img).toHaveAttribute('src', '/mocked-base/images/placeholders/default-fallback.jpg');
  });

  it('applies custom className to wrapper', () => {
    render(<ImageWithFallback {...defaultProps} className="custom-class" />);
    const container = screen.getByTestId('image-container');
    expect(container).toHaveClass('custom-class');
  });

  it('renders placeholder image if provided', () => {
    render(<ImageWithFallback {...defaultProps} placeholderSrc="/images/blur.jpg" />);
    // We expect the placeholder div to contain an img with this src
    const placeholderDiv = screen.getByTestId('loading-placeholder');
    const placeholderImg = placeholderDiv.querySelector('img');
    expect(placeholderImg).toHaveAttribute('src', '/images/blur.jpg');
  });
});
