import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TagBadge } from '../../../src/components/TagBadge';
import React from 'react';

describe('TagBadge Component', () => {
  it('renders label correctly', () => {
    render(<TagBadge label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with icon when provided', () => {
    const TestIcon = <span data-testid="test-icon">icon</span>;
    render(<TagBadge label="With Icon" icon={TestIcon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders as a button when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<TagBadge label="Click Me" onClick={handleClick} />);

    const badge = screen.getByRole('button', { name: /filter by click me/i });
    expect(badge).toBeInTheDocument();

    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a span when onClick is not provided', () => {
    render(<TagBadge label="Static Badge" />);
    // Should not have button role
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies default styles when no variant provided', () => {
    const { container } = render(<TagBadge label="Default" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-background-surface');
  });

  it('applies variant styles correctly', () => {
    const { container } = render(<TagBadge label="Category" variant="category" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('text-primary');
  });

  it('passes through additional className', () => {
    const { container } = render(<TagBadge label="Custom Class" className="custom-test-class" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('custom-test-class');
  });
});
