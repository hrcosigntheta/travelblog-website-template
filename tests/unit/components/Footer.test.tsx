import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../../src/components/Footer';

describe('Footer', () => {
  it('renders all main sections', () => {
    render(<Footer />);
    // Check headings
    expect(screen.getByText('TravelBlog')).toBeDefined();
    expect(screen.getByText('Explore')).toBeDefined();
    expect(screen.getByText('Company')).toBeDefined();
    expect(screen.getByText('Newsletter')).toBeDefined();
  });

  it('renders links correctly', () => {
    render(<Footer />);
    expect(screen.getByText('Destinations')).toBeDefined();
    expect(screen.getByText('Gallery')).toBeDefined();
    expect(screen.getByText('Itineraries')).toBeDefined();
    expect(screen.getByText('Privacy Policy')).toBeDefined();
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    const copyright = screen.getByText((content) => content.includes(`© ${year}`));
    expect(copyright).toBeDefined();
  });

  it('renders newsletter form', () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeDefined();
    expect(screen.getByText('Subscribe')).toBeDefined();
  });

  it('displays creator attribution', () => {
    render(<Footer />);
    expect(screen.getByText(/Template by/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /MasuRii/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/MasuRii');
  });
});
