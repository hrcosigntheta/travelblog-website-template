// @vitest-environment jsdom
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ReadingProgress from '../../../src/components/ReadingProgress';

describe('ReadingProgress', () => {
  beforeEach(() => {
    // Reset window scroll
    window.scrollY = 0;

    // Mock window dimensions
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });

    // Setup a dummy main element in the document
    document.body.innerHTML = `
      <main id="main-content" style="height: 2000px; margin-top: 0px;">
        <div style="height: 2000px">Content</div>
      </main>
    `;

    // Mock offsetHeight and offsetTop for the main element
    // JSDOM doesn't calculate layout, so we force it
    const main = document.getElementById('main-content');
    if (main) {
      Object.defineProperty(main, 'offsetHeight', { value: 2000, writable: true });
      Object.defineProperty(main, 'offsetTop', { value: 0, writable: true });
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('renders with initial 0% progress', () => {
    render(<ReadingProgress targetSelector="#main-content" />);
    const progressBar = screen.getByTestId('reading-progress-bar');
    // The scaleX should be 0 initially
    expect(progressBar).toHaveStyle({ transform: 'scaleX(0)' });
  });

  it('updates progress on scroll', () => {
    render(<ReadingProgress targetSelector="#main-content" />);

    const progressBar = screen.getByTestId('reading-progress-bar');

    // Simulate scroll to 50%
    // Total scrollable = 2000 (height) - 800 (window) = 1200
    // To get 50%, we need to scroll 600px

    act(() => {
      window.scrollY = 600;
      fireEvent.scroll(window);
    });

    // 600 / 1200 = 0.5
    expect(progressBar).toHaveStyle({ transform: 'scaleX(0.5)' });
  });

  it('updates progress to 100% when scrolled to end', () => {
    render(<ReadingProgress targetSelector="#main-content" />);

    const progressBar = screen.getByTestId('reading-progress-bar');

    // Scroll to end (1200px)
    act(() => {
      window.scrollY = 1200;
      fireEvent.scroll(window);
    });

    expect(progressBar).toHaveStyle({ transform: 'scaleX(1)' });
  });

  it('clamps progress between 0 and 1', () => {
    render(<ReadingProgress targetSelector="#main-content" />);

    const progressBar = screen.getByTestId('reading-progress-bar');

    // Scroll past end
    act(() => {
      window.scrollY = 1500;
      fireEvent.scroll(window);
    });
    expect(progressBar).toHaveStyle({ transform: 'scaleX(1)' });

    // Scroll before start (negative scroll? unlikely but possible with bounce)
    act(() => {
      window.scrollY = -100;
      fireEvent.scroll(window);
    });
    expect(progressBar).toHaveStyle({ transform: 'scaleX(0)' });
  });

  it('does nothing if target element is not found', () => {
    render(<ReadingProgress targetSelector="#non-existent" />);
    // Just ensure it doesn't crash
    const progressBar = screen.getByTestId('reading-progress-bar');
    expect(progressBar).toBeInTheDocument();
  });
});
