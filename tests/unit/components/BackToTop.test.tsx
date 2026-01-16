// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BackToTop from '../../../src/components/BackToTop';

describe('BackToTop', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.scrollY = 0;
    // Mock window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    });
  });

  it('renders correctly but is invisible initially', () => {
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('opacity-0');
    expect(button).toHaveClass('pointer-events-none');
  });

  it('becomes visible when scrolled past 500px', () => {
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');

    // Simulate scroll
    window.scrollY = 501;
    fireEvent.scroll(window);

    expect(button).toHaveClass('opacity-100');
    expect(button).not.toHaveClass('opacity-0');
    expect(button).not.toHaveClass('pointer-events-none');
  });

  it('hides when scrolled back up', () => {
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');

    // Scroll down
    window.scrollY = 600;
    fireEvent.scroll(window);
    expect(button).toHaveClass('opacity-100');

    // Scroll up
    window.scrollY = 200;
    fireEvent.scroll(window);
    expect(button).toHaveClass('opacity-0');
  });

  it('scrolls to top when clicked', () => {
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');

    // Make visible
    window.scrollY = 600;
    fireEvent.scroll(window);

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
