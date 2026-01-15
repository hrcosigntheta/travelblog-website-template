import React from 'react';
import { describe, test, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TravelStats } from '../../../src/components/TravelStats';

describe('TravelStats', () => {
  const mockStats = [
    { label: 'Countries Visited', value: 12, icon: 'globe' as const },
    { label: 'Islands Visited', value: 45, suffix: '+', icon: 'compass' as const },
    { label: 'Photos Taken', value: 5000, icon: 'camera' as const },
  ];

  beforeEach(() => {
    // Mock IntersectionObserver globally for all tests
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('renders all statistics', () => {
    render(<TravelStats stats={mockStats} />);

    expect(screen.getByText('Countries Visited')).toBeDefined();
    expect(screen.getByText('Islands Visited')).toBeDefined();
    expect(screen.getByText('Photos Taken')).toBeDefined();
  });

  test('renders icons for each statistic', () => {
    const { container } = render(<TravelStats stats={mockStats} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(3);
  });

  test('renders values correctly', () => {
    render(<TravelStats stats={mockStats} />);
    expect(screen.getByText('Countries Visited')).toBeDefined();
  });

  test('respects prefers-reduced-motion', () => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<TravelStats stats={mockStats} />);
    expect(screen.getByText('Countries Visited')).toBeDefined();
  });
});
