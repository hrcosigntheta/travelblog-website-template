import { vi } from 'vitest';

/**
 * Mocks window.matchMedia for JSDOM environments.
 * Usage: Import and call in setup.ts or specific tests.
 */
export function mockMatchMedia() {
  if (typeof window === 'undefined') return;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
