import { vi } from 'vitest';

export function mockIntersectionObserver() {
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();

  global.IntersectionObserver = vi.fn(() => ({
    observe,
    unobserve,
    disconnect,
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: () => [],
  })) as unknown as typeof IntersectionObserver;
}
