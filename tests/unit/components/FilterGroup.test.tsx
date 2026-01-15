import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import FilterGroup from '../../../src/components/FilterGroup';

describe('FilterGroup', () => {
  const mockOnChange = vi.fn();
  const defaultOptions = [
    { value: 'option1', label: 'Option 1', count: 10 },
    { value: 'option2', label: 'Option 2', count: 5 },
    { value: 'option3', label: 'Option 3' },
  ];

  afterEach(() => {
    cleanup();
    mockOnChange.mockClear();
  });

  it('renders correctly with title and options', () => {
    render(
      <FilterGroup
        label="Test Category"
        options={defaultOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Category')).toBeTruthy();
    expect(screen.getByText('Option 1')).toBeTruthy();
    expect(screen.getByText('Option 2')).toBeTruthy();
    expect(screen.getByText('Option 3')).toBeTruthy();
    // Check counts
    expect(screen.getByText('10')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('toggles collapse state', () => {
    render(
      <FilterGroup
        label="Test Category"
        options={defaultOptions}
        selectedValues={[]}
        onChange={mockOnChange}
        defaultOpen={false}
      />
    );

    // Initial state (details should not have open attribute)
    const details = screen.getByText('Test Category').closest('details');
    expect(details?.hasAttribute('open')).toBe(false);

    // Click summary
    fireEvent.click(screen.getByText('Test Category'));
    expect(details?.hasAttribute('open')).toBe(true);
  });

  it('handles checkbox selection (add)', () => {
    render(
      <FilterGroup
        label="Test Category"
        options={defaultOptions}
        selectedValues={[]}
        onChange={mockOnChange}
        type="checkbox"
      />
    );

    const checkbox = screen.getAllByRole('checkbox')[0]; // Option 1
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
  });

  it('handles checkbox selection (remove)', () => {
    render(
      <FilterGroup
        label="Test Category"
        options={defaultOptions}
        selectedValues={['option1']}
        onChange={mockOnChange}
        type="checkbox"
      />
    );

    const checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement; // Option 1 (checked)
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('handles radio selection', () => {
    render(
      <FilterGroup
        label="Test Category"
        options={defaultOptions}
        selectedValues={['option2']}
        onChange={mockOnChange}
        type="radio"
      />
    );

    const radio1 = screen.getAllByRole('radio')[0]; // Option 1
    fireEvent.click(radio1);

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
  });

  it('renders correct checked state', () => {
    render(
      <FilterGroup
        label="Test Category"
        options={defaultOptions}
        selectedValues={['option1', 'option3']}
        onChange={mockOnChange}
        type="checkbox"
      />
    );

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);
    expect(checkboxes[2].checked).toBe(true);
  });
});
