// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TravelPhilosophy } from '../../../src/components/TravelPhilosophy';
import React from 'react';

describe('TravelPhilosophy', () => {
  const defaultProps = {
    quote: 'We believe in slow travel.',
    content: 'Travel is about immersion.',
    missionStatement: 'My mission is to showcase the Philippines.',
  };

  it('renders the heading correctly', () => {
    render(<TravelPhilosophy {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Travel Philosophy');
  });

  it('renders custom heading if provided', () => {
    render(<TravelPhilosophy {...defaultProps} heading="My Vision" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My Vision');
  });

  it('renders the quote', () => {
    render(<TravelPhilosophy {...defaultProps} />);
    expect(screen.getByText(/We believe in slow travel/)).toBeInTheDocument();
  });

  it('renders the content and mission statement', () => {
    render(<TravelPhilosophy {...defaultProps} />);
    expect(screen.getByText(/Travel is about immersion/)).toBeInTheDocument();
    expect(screen.getByText(/My mission is to showcase the Philippines/)).toBeInTheDocument();
  });

  it('renders the compass icon', () => {
    const { container } = render(<TravelPhilosophy {...defaultProps} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('text-[var(--color-primary)]');
  });
});
