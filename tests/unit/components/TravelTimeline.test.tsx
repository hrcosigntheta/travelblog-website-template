import React from 'react';
import { describe, test, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TravelTimeline } from '../../../src/components/TravelTimeline';

describe('TravelTimeline', () => {
  const mockMilestones = [
    {
      date: '2020',
      title: 'Milestone 1',
      description: 'Description 1',
    },
    {
      date: '2021',
      title: 'Milestone 2',
      description: 'Description 2',
      image: { src: 'test.jpg', alt: 'Test Alt' },
    },
  ];

  beforeEach(() => {
    // Mock IntersectionObserver globally for all tests
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
    }
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('renders section heading', () => {
    render(<TravelTimeline milestones={mockMilestones} />);
    expect(screen.getByText('My Travel Journey')).toBeDefined();
  });

  test('renders all milestones', () => {
    render(<TravelTimeline milestones={mockMilestones} />);
    expect(screen.getByText('Milestone 1')).toBeDefined();
    expect(screen.getByText('Description 1')).toBeDefined();
    expect(screen.getByText('2020')).toBeDefined();

    expect(screen.getByText('Milestone 2')).toBeDefined();
    expect(screen.getByText('Description 2')).toBeDefined();
    expect(screen.getByText('2021')).toBeDefined();
  });

  test('renders milestone images when present', () => {
    const { container } = render(<TravelTimeline milestones={mockMilestones} />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(1);
    expect(images[0].getAttribute('src')).toBe('test.jpg');
    expect(images[0].getAttribute('alt')).toBe('Test Alt');
  });
});
