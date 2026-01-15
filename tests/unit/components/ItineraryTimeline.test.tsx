import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItineraryTimeline from '../../../src/components/ItineraryTimeline';

describe('ItineraryTimeline Component', () => {
  const mockDays = [
    {
      title: 'Arrival in Cebu',
      activities: [
        { title: 'Airport Transfer', time: '10:00 AM', description: 'Pick up from airport.' },
        { title: 'Hotel Check-in', time: '12:00 PM', duration: '1 hour' },
      ],
    },
    {
      title: 'Island Hopping',
      activities: [{ title: 'Boat Tour', time: '08:00 AM', tips: 'Bring sunscreen!' }],
    },
  ];

  it('renders all days with correct numbers', () => {
    render(<ItineraryTimeline days={mockDays} />);
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Arrival in Cebu')).toBeInTheDocument();
    expect(screen.getByText('Day 2')).toBeInTheDocument();
    expect(screen.getByText('Island Hopping')).toBeInTheDocument();
  });

  it('renders activities for the first day (default open)', () => {
    render(<ItineraryTimeline days={mockDays} />);
    expect(screen.getByText('Airport Transfer')).toBeInTheDocument();
    expect(screen.getByText('Hotel Check-in')).toBeInTheDocument();
  });

  it('expands/collapses day details', async () => {
    render(<ItineraryTimeline days={mockDays} />);

    // Day 2 should be closed by default
    const day2Header = screen.getByText('Island Hopping').closest('button');
    expect(day2Header).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(day2Header!);
    expect(day2Header).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Boat Tour')).toBeInTheDocument();

    // Click to close
    fireEvent.click(day2Header!);
    expect(day2Header).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders activity details correctly', () => {
    render(<ItineraryTimeline days={mockDays} />);
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Pick up from airport.')).toBeInTheDocument();
    expect(screen.getByText('1 hour')).toBeInTheDocument();
    expect(screen.getByText('💡 Insider Tip:')).toBeInTheDocument();
    expect(screen.getByText('Bring sunscreen!')).toBeInTheDocument();
  });

  it('applies print-friendly classes', () => {
    const { container } = render(<ItineraryTimeline days={mockDays} />);

    // Check for print:break-inside-avoid on Day component
    const dayElements = container.querySelectorAll('.print\\:break-inside-avoid');
    expect(dayElements.length).toBeGreaterThan(0);

    // Check for print:hidden on toggle chevron
    const hiddenElements = container.querySelectorAll('.print\\:hidden');
    expect(hiddenElements.length).toBeGreaterThan(0);

    // Check for print:max-h-none on content wrapper (force expansion)
    const expandedElements = container.querySelectorAll('.print\\:max-h-none');
    expect(expandedElements.length).toBeGreaterThan(0);
  });
});
