// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarkerPopup from '@components/Map/MarkerPopup';
import type { Destination } from '../../../src/data/destinations';

const mockDestination: Destination = {
  id: 'test-dest',
  slug: 'test-dest',
  title: 'Test Destination',
  description: 'Test Description',
  region: 'Test Region',
  image: 'https://example.com/image.jpg',
  imageAlt: 'Test Alt',
  rating: 4.5,
  tags: ['Beach', 'Nature'],
  featured: false,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [],
  coordinates: { lat: 0, lng: 0 },
  stats: { bestTime: '', budget: '', difficulty: '' },
  highlights: [],
  content: '',
};

describe('MarkerPopup', () => {
  it('renders destination title and region', () => {
    render(<MarkerPopup destination={mockDestination} />);
    expect(screen.getByText('Test Destination')).toBeInTheDocument();
    expect(screen.getByText('Test Region')).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    render(<MarkerPopup destination={mockDestination} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Destination');
  });

  it('renders correct tags', () => {
    render(<MarkerPopup destination={mockDestination} />);
    expect(screen.getByText('Beach')).toBeInTheDocument();
    expect(screen.getByText('Nature')).toBeInTheDocument();
  });

  it('renders link to detail page', () => {
    render(<MarkerPopup destination={mockDestination} />);
    const link = screen.getByText('View Details').closest('a');
    expect(link).toHaveAttribute('href', '/destinations/test-dest/');
  });

  it('truncates tags if more than 3', () => {
    const manyTagsDest = { ...mockDestination, tags: ['1', '2', '3', '4', '5'] };
    render(<MarkerPopup destination={manyTagsDest} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).not.toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
