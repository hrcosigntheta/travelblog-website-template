import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navigation from '../../../src/components/Navigation';

describe('Navigation', () => {
  it('renders all desktop links', () => {
    render(<Navigation />);
    // Check for text content from translation keys
    // We assume default lang is 'en' which has these values
    expect(screen.getAllByText('Home')).toBeDefined();
    expect(screen.getAllByText('Destinations')).toBeDefined();
    expect(screen.getAllByText('Gallery')).toBeDefined();
    expect(screen.getAllByText('About')).toBeDefined();
    expect(screen.getAllByText('Contact')).toBeDefined();
  });

  it('opens mobile menu on click', () => {
    render(<Navigation />);
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);

    // Mobile menu should be visible (dialog role)
    expect(screen.getByRole('dialog')).toBeDefined();
    // Check for mobile-specific content
    expect(screen.getByText('Switch Theme')).toBeDefined();
  });
});
