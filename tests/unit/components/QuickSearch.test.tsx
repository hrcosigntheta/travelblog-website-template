import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import QuickSearch from '../../../src/components/QuickSearch';

describe('QuickSearch Component', () => {
  // Mock window.location
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('renders search input and button', () => {
    render(<QuickSearch />);
    expect(screen.getByPlaceholderText('Where do you want to go?')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('renders popular tags', () => {
    render(<QuickSearch popularTags={['TestTag']} />);
    expect(screen.getByText('TestTag')).toBeInTheDocument();
  });

  it('navigates on search button click', async () => {
    vi.useFakeTimers();
    render(<QuickSearch />);
    const input = screen.getByPlaceholderText('Where do you want to go?');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Palawan' } });

    // Fast-forward debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.click(button);

    expect(window.location.href).toBe('/destinations?q=Palawan');
    vi.useRealTimers();
  });

  it('navigates on tag click', () => {
    render(<QuickSearch popularTags={['Beach']} />);
    const tag = screen.getByText('Beach');

    fireEvent.click(tag);

    expect(window.location.href).toBe('/destinations?category=beach');
  });

  it('renders advanced search link', () => {
    render(<QuickSearch />);
    const link = screen.getByText('Advanced Search →');
    expect(link).toHaveAttribute('href', '/destinations');
  });
});
