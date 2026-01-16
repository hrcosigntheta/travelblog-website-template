// @vitest-environment jsdom
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { PackingList } from '../../../src/components/PackingList';
import type { PackingListCategory } from '../../../src/data/packingLists';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockCategories: PackingListCategory[] = [
  {
    id: 'test-cat',
    title: 'Test Category',
    items: [
      { id: 'item-1', label: 'Item 1', category: 'test' },
      { id: 'item-2', label: 'Item 2', category: 'test' },
    ],
  },
];

describe('PackingList', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders categories and items', () => {
    render(<PackingList categories={mockCategories} />);
    expect(screen.getByText('Test Category')).toBeTruthy();
    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();
  });

  test('toggles item checked state', () => {
    render(<PackingList categories={mockCategories} />);
    const checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;

    // Initial state
    expect(checkbox.checked).toBe(false);

    // Check item
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Uncheck item
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  test('updates progress bar', () => {
    render(<PackingList categories={mockCategories} />);
    const progressBar = screen.getByRole('progressbar');
    const checkbox1 = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    const checkbox2 = screen.getAllByRole('checkbox')[1] as HTMLInputElement;

    // 0%
    expect(progressBar.getAttribute('aria-valuenow')).toBe('0');

    // 50%
    fireEvent.click(checkbox1);
    expect(progressBar.getAttribute('aria-valuenow')).toBe('50');

    // 100%
    fireEvent.click(checkbox2);
    expect(progressBar.getAttribute('aria-valuenow')).toBe('100');
  });

  test('persists to localStorage', () => {
    const { unmount } = render(<PackingList categories={mockCategories} storageKey="test-list" />);
    const checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;

    fireEvent.click(checkbox);

    // Check if saved
    const saved = JSON.parse(localStorage.getItem('test-list') || '[]');
    expect(saved).toContain('item-1');

    // Remount to check loading
    unmount();
    render(<PackingList categories={mockCategories} storageKey="test-list" />);
    const newCheckbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    expect(newCheckbox.checked).toBe(true);
  });
});
