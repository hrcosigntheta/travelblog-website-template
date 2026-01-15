import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import DestinationsListing from '../../../src/components/DestinationsListing';

describe('DestinationsListing Component', () => {
  const originalLocation = window.location;
  const originalHistory = window.history;

  beforeEach(() => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/destinations',
        search: '',
        assign: vi.fn(),
      },
      writable: true,
    });

    // Mock window.history
    Object.defineProperty(window, 'history', {
      value: {
        pushState: vi.fn(),
        replaceState: vi.fn(),
        state: {},
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
    Object.defineProperty(window, 'history', {
      writable: true,
      value: originalHistory,
    });
  });

  it('renders filters and content', () => {
    render(<DestinationsListing />);
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    // Use regex to match text content across elements
    expect(
      screen.getByText((content, node) => {
        const hasText = (node: Element | null) => node?.textContent === 'Showing 4 destinations'; // Mock data has 4 items
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child)
        );
        return !!(nodeHasText && childrenDontHaveText);
      })
    ).toBeInTheDocument();
  });

  it('initializes state from URL parameters', async () => {
    window.location.search = '?q=Palawan&category=Beach';
    render(<DestinationsListing />);

    // Check if search input has value - wait for useEffect
    const input = screen.getByPlaceholderText('Search destinations...') as HTMLInputElement;

    await waitFor(() => {
      expect(input.value).toBe('Palawan');
    });

    // Check if filtered results are correct
    expect(screen.getByText('El Nido, Palawan')).toBeInTheDocument();
    expect(screen.queryByText('Chocolate Hills, Bohol')).not.toBeInTheDocument();
  });

  it('updates URL when filter changes', async () => {
    render(<DestinationsListing />);

    // Wait for init
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Search destinations...')).toBeInTheDocument()
    );

    const regionGroup = screen.getByText('Region');
    fireEvent.click(regionGroup);

    const boholCheckbox = screen.getByLabelText('Bohol');
    fireEvent.click(boholCheckbox);

    // Expect pushState to be called
    await waitFor(() => {
      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/destinations?region=Bohol');
    });
  });

  it('updates URL when search changes', () => {
    vi.useFakeTimers();
    render(<DestinationsListing />);

    // Initial render state
    const input = screen.getByPlaceholderText('Search destinations...');

    // Change input
    fireEvent.change(input, { target: { value: 'Test' } });

    // Advance timers to trigger debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Check if pushState was called
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/destinations?q=Test');
    vi.useRealTimers();
  });

  it('handles browser back button (popstate)', async () => {
    render(<DestinationsListing />);

    // Wait for init
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Search destinations...')).toBeInTheDocument()
    );

    // Update mock location and dispatch event
    // We need to ensure window.location.search returns the new value
    // Since we mocked it as a value property on the object, we can just assign it
    // But we need to make sure the component reads from the SAME object

    // In beforeEach we did:
    // Object.defineProperty(window, 'location', { value: { ... } })
    // So window.location is that object.

    window.location.search = '?region=Bohol';

    act(() => {
      const popStateEvent = new PopStateEvent('popstate', {});
      window.dispatchEvent(popStateEvent);
    });

    // Check if filter updated
    await waitFor(() => {
      // El Nido (Palawan) should be gone
      expect(screen.queryByText('El Nido, Palawan')).not.toBeInTheDocument();
      // Chocolate Hills (Bohol) should be present
      expect(screen.getByText('Chocolate Hills, Bohol')).toBeInTheDocument();
    });
  });

  it('shows empty state when no results found', async () => {
    render(<DestinationsListing />);

    // Wait for init
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Search destinations...')).toBeInTheDocument()
    );

    // Search for something that doesn't exist
    const input = screen.getByPlaceholderText('Search destinations...');
    fireEvent.change(input, { target: { value: 'NonExistentPlaceXYZ' } });

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.getByText('Clear all filters')).toBeInTheDocument();
    });
  });

  it('clears filters from empty state', async () => {
    render(<DestinationsListing />);

    // Wait for init
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Search destinations...')).toBeInTheDocument()
    );

    // Search for something that doesn't exist
    const input = screen.getByPlaceholderText('Search destinations...');
    fireEvent.change(input, { target: { value: 'NonExistentPlaceXYZ' } });

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    // Click clear
    const clearButton = screen.getByText('Clear all filters');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText('No results found')).not.toBeInTheDocument();
      expect(screen.getByText('El Nido, Palawan')).toBeInTheDocument();
      expect((input as HTMLInputElement).value).toBe('');
    });
  });
});
