import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeToggle from '../../../src/components/ThemeToggle';
import { themeStore } from '../../../src/store/theme';

describe('ThemeToggle', () => {
  beforeEach(() => {
    themeStore.set('light');
  });

  it('renders correctly', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
  });

  it('toggles theme on click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Initial: light
    expect(themeStore.get()).toBe('light');

    // Click to toggle
    fireEvent.click(button);
    expect(themeStore.get()).toBe('dark');

    // Click again
    fireEvent.click(button);
    expect(themeStore.get()).toBe('light');
  });
});
