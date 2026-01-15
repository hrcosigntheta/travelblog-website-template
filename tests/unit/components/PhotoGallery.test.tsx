// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { PhotoGallery } from '../../../src/components/PhotoGallery';

// Mock ImageWithFallback since it's tested separately and we want to focus on Gallery logic
vi.mock('../../../src/components/ImageWithFallback', () => ({
  ImageWithFallback: ({
    src,
    alt,
    className,
    placeholderSrc,
    ...props
  }: React.ComponentProps<'img'> & { placeholderSrc?: string }) => {
    // Prevent unused var error and prop leakage
    void placeholderSrc;
    return <img src={src} alt={alt} className={className} data-testid="mock-image" {...props} />;
  },
}));

const mockImages = [
  { src: '/img1.jpg', alt: 'Image 1', caption: 'Caption 1' },
  { src: '/img2.jpg', alt: 'Image 2', caption: 'Caption 2' },
  { src: '/img3.jpg', alt: 'Image 3' },
];

describe('PhotoGallery Component', () => {
  it('renders all images in the grid', () => {
    render(<PhotoGallery images={mockImages} />);
    const images = screen.getAllByTestId('mock-image');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', '/img1.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Image 2');
  });

  it('renders captions when provided', () => {
    render(<PhotoGallery images={mockImages} />);
    expect(screen.getByText('Caption 1')).toBeInTheDocument();
    expect(screen.getByText('Caption 2')).toBeInTheDocument();
  });

  it('opens lightbox when an image is clicked', () => {
    render(<PhotoGallery images={mockImages} />);

    // Lightbox should not be visible initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click first image
    const imageCards = screen.getAllByRole('button');
    fireEvent.click(imageCards[0]);

    // Lightbox should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();

    // Should show the caption in lightbox
    const lightboxDialog = screen.getByRole('dialog');
    expect(lightboxDialog).toHaveTextContent('Caption 1');
  });

  it('navigates between images in lightbox', () => {
    render(<PhotoGallery images={mockImages} />);

    // Open lightbox
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Next button
    const nextBtn = screen.getByLabelText('Next image');
    fireEvent.click(nextBtn);

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('Caption 2');

    // Prev button (back to 1)
    const prevBtn = screen.getByLabelText('Previous image');
    fireEvent.click(prevBtn);

    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('closes lightbox when close button is clicked', () => {
    render(<PhotoGallery images={mockImages} />);

    // Open
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close
    const closeBtn = screen.getByLabelText('Close lightbox');
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation in lightbox', () => {
    render(<PhotoGallery images={mockImages} />);

    // Open
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Arrow Right
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('2 / 3')).toBeInTheDocument();

    // Arrow Left
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('1 / 3')).toBeInTheDocument();

    // Escape
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('sets priority loading for the first few images', () => {
    render(<PhotoGallery images={Array(10).fill({ src: '/img.jpg', alt: 'Test' })} />);
    const images = screen.getAllByTestId('mock-image');

    // First image: eager loading + high fetch priority
    expect(images[0]).toHaveAttribute('loading', 'eager');
    expect(images[0]).toHaveAttribute('fetchpriority', 'high');

    // 6th image (index 5): eager loading
    expect(images[5]).toHaveAttribute('loading', 'eager');

    // 7th image (index 6): lazy loading
    expect(images[6]).toHaveAttribute('loading', 'lazy');
  });
});
