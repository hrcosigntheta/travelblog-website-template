// @vitest-environment jsdom
import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { TravelTips } from '../../../src/components/TravelTips';
import type { TravelTip } from '../../../src/components/TravelTips';

const mockTips: TravelTip[] = [
  {
    id: '1',
    category: 'packing',
    title: 'Pack light',
    content: 'Bring only essentials.',
  },
  {
    id: '2',
    category: 'safety',
    title: 'Watch out',
    content: 'Be careful crossing streets.',
  },
  {
    id: '3',
    category: 'budget',
    title: 'Save money',
    content: 'Eat street food.',
  },
];

describe('TravelTips Component', () => {
  afterEach(cleanup);

  test('renders section heading', () => {
    render(<TravelTips tips={mockTips} />);
    expect(screen.getByText('Travel Tips')).toBeTruthy();
  });

  test('renders all tips in desktop grid', () => {
    render(<TravelTips tips={mockTips} />);
    mockTips.forEach((tip) => {
      expect(screen.getAllByText(tip.title).length).toBeGreaterThan(0);
      expect(screen.getAllByText(tip.content).length).toBeGreaterThan(0);
    });
  });

  test('renders correct category labels', () => {
    render(<TravelTips tips={mockTips} />);
    expect(screen.getAllByText('packing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('safety').length).toBeGreaterThan(0);
    expect(screen.getAllByText('budget').length).toBeGreaterThan(0);
  });

  test('mobile carousel buttons exist', () => {
    render(<TravelTips tips={mockTips} />);
    // Check for aria-labels
    expect(screen.getByLabelText('Previous tip')).toBeTruthy();
    expect(screen.getByLabelText('Next tip')).toBeTruthy();
  });

  test('does not render if tips array is empty', () => {
    const { container } = render(<TravelTips tips={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('expandable content functionality', () => {
    const longTip: TravelTip[] = [
      {
        id: 'long-1',
        category: 'general',
        title: 'Long Tip',
        content: 'A'.repeat(150), // Long content
      },
    ];

    render(<TravelTips tips={longTip} />);
    const readMoreBtn = screen.getByText('Read more');
    expect(readMoreBtn).toBeTruthy();

    fireEvent.click(readMoreBtn);
    expect(screen.getByText('Show less')).toBeTruthy();
  });
});
