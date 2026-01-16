import { describe, it, expect } from 'vitest';
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { DestinationCard } from '../../../src/components/DestinationCard';
import '@testing-library/jest-dom/vitest';

describe('DestinationCard', () => {
  const defaultProps = {
    id: '1',
    slug: 'el-nido',
    title: 'El Nido',
    location: 'Palawan',
    image: '/images/el-nido.jpg',
    category: 'Beaches',
    description: 'A beautiful paradise with limestone cliffs.',
    priceLevel: 'mid-range' as const,
    difficulty: 'moderate' as const,
    bestSeason: 'Dry Season',
  };

  it('renders title, location, and description', () => {
    render(<DestinationCard {...defaultProps} />);

    expect(screen.getByText('El Nido')).toBeInTheDocument();
    expect(screen.getByText('Palawan')).toBeInTheDocument();
    expect(screen.getByText('A beautiful paradise with limestone cliffs.')).toBeInTheDocument();
  });

  it('renders correct badges', () => {
    render(<DestinationCard {...defaultProps} />);

    expect(screen.getByText('Beaches')).toBeInTheDocument(); // Category
    expect(screen.getByText('Dry Season')).toBeInTheDocument(); // Season
    expect(screen.getByText('$$')).toBeInTheDocument(); // Price
    expect(screen.getByText('moderate')).toBeInTheDocument(); // Difficulty
  });

  it('generates correct link URL', () => {
    render(<DestinationCard {...defaultProps} />);

    const links = screen.getAllByRole('link');
    // We expect 2 links: one for image, one for title
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/destinations/el-nido/');
    expect(links[1]).toHaveAttribute('href', '/destinations/el-nido/');
  });

  it('renders image with correct alt text', () => {
    render(<DestinationCard {...defaultProps} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Travel to El Nido in Palawan');
    expect(img).toHaveAttribute('src', '/images/el-nido.jpg');
  });

  it('applies budget variant styling', () => {
    render(<DestinationCard {...defaultProps} priceLevel="budget" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('applies luxury variant styling', () => {
    render(<DestinationCard {...defaultProps} priceLevel="luxury" />);
    expect(screen.getByText('$$$')).toBeInTheDocument();
  });
});
