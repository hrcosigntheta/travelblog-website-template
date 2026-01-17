import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MapFilterPanel from '../../../src/components/Map/MapFilterPanel';

describe('MapFilterPanel', () => {
  const mockCategories = [
    { value: 'beach', label: 'Beach' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'culture', label: 'Culture' },
  ];
  const mockRegions = ['Palawan', 'Cebu', 'Bohol'];
  const mockHandlers = {
    onCategoryChange: vi.fn(),
    onRegionChange: vi.fn(),
    onClear: vi.fn(),
  };

  const defaultProps = {
    categories: mockCategories,
    regions: mockRegions,
    selectedCategories: [],
    selectedRegions: [],
    filteredCount: 10,
    totalCount: 10,
    ...mockHandlers,
  };

  it('renders all filter options', () => {
    render(<MapFilterPanel {...defaultProps} />);

    mockCategories.forEach((cat) => {
      expect(screen.getByText(cat.label)).toBeInTheDocument();
    });
    mockRegions.forEach((reg) => {
      expect(screen.getByText(reg)).toBeInTheDocument();
    });
  });

  it('handles category selection', () => {
    render(<MapFilterPanel {...defaultProps} />);

    const categoryCheckbox = screen.getByLabelText('Beach');
    fireEvent.click(categoryCheckbox);

    expect(mockHandlers.onCategoryChange).toHaveBeenCalledWith('beach');
  });

  it('handles region selection', () => {
    render(<MapFilterPanel {...defaultProps} />);

    const regionCheckbox = screen.getByLabelText('Palawan');
    fireEvent.click(regionCheckbox);

    expect(mockHandlers.onRegionChange).toHaveBeenCalledWith('Palawan');
  });

  it('shows clear button only when filters are active', () => {
    const { rerender } = render(<MapFilterPanel {...defaultProps} />);

    expect(screen.queryByText('Clear all')).not.toBeInTheDocument();

    rerender(<MapFilterPanel {...defaultProps} selectedCategories={['beach']} />);

    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    render(<MapFilterPanel {...defaultProps} selectedCategories={['beach']} />);

    fireEvent.click(screen.getByText('Clear all'));
    expect(mockHandlers.onClear).toHaveBeenCalled();
  });

  it('displays correct counts', () => {
    render(<MapFilterPanel {...defaultProps} filteredCount={5} totalCount={20} />);

    expect(screen.getByText('Showing 5 of 20')).toBeInTheDocument();
  });

  it('toggles visibility on mobile', () => {
    render(<MapFilterPanel {...defaultProps} />);

    // Default is open
    expect(screen.getByText('Filters')).toBeInTheDocument();

    // Close it
    const closeButton = screen.getByLabelText('Close filters');
    fireEvent.click(closeButton);

    expect(screen.queryByLabelText('Close filters')).not.toBeInTheDocument();

    // Open it (button should be visible when closed)
    const openButton = screen.getByLabelText('Open filters');
    fireEvent.click(openButton);

    expect(screen.getByLabelText('Close filters')).toBeInTheDocument();
  });
});
