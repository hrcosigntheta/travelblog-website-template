import { render, screen, act } from '@testing-library/react';
import { ParallaxBackground } from '../../../src/components/ParallaxBackground';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

describe('ParallaxBackground', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      bottom: 500,
      left: 0,
      right: 500,
      height: 400,
      width: 500,
      x: 0,
      y: 100,
      toJSON: () => {},
    }));

    // Mock window dimensions
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders image correctly', () => {
    render(<ParallaxBackground image="/test.jpg" alt="Test Image" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('alt', 'Test Image');
  });

  it('updates transform on scroll', () => {
    render(<ParallaxBackground image="/test.jpg" alt="background" />);
    const img = screen.getByRole('img');

    // Trigger scroll
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      vi.runAllTimers();
    });

    expect(img.style.transform).toContain('translateY');
  });

  it('does not animate if prefers-reduced-motion matches', () => {
    // Mock matchMedia to return true
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ParallaxBackground image="/test.jpg" alt="background" />);
    const img = screen.getByRole('img');

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      vi.runAllTimers();
    });

    expect(img.style.transform).toBe('');
  });
});
