import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../../../src/components/SearchInput';

describe('SearchInput Component', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly with placeholder', () => {
    render(<SearchInput value="" onChange={mockOnChange} placeholder="Find destinations..." />);

    const input = screen.getByRole('searchbox', { name: /find destinations/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Find destinations...');
  });

  it('renders initial value correctly', () => {
    render(<SearchInput value="Cebu" onChange={mockOnChange} />);

    const input = screen.getByDisplayValue('Cebu');
    expect(input).toBeInTheDocument();
  });

  it('debounces input changes', async () => {
    render(<SearchInput value="" onChange={mockOnChange} debounceTime={300} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Bohol' } });

    // Value updates immediately in UI
    expect(input).toHaveValue('Bohol');

    // onChange should not be called yet
    expect(mockOnChange).not.toHaveBeenCalled();

    // Fast forward time
    vi.advanceTimersByTime(300);

    expect(mockOnChange).toHaveBeenCalledWith('Bohol');
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchInput value="Siargao" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('');
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('does not show clear button when empty', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const clearButton = screen.queryByLabelText('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('syncs with external value changes', () => {
    const { rerender } = render(<SearchInput value="Initial" onChange={mockOnChange} />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('Initial');

    rerender(<SearchInput value="Updated" onChange={mockOnChange} />);
    expect(input).toHaveValue('Updated');
  });
});
