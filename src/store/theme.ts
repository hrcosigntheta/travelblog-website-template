import { atom } from 'nanostores';

export type Theme = 'light' | 'dark' | 'system';

export const THEME_KEY = 'theme-preference';

export const themeStore = atom<Theme>('system');

/**
 * Initialize theme from localStorage and setup listeners
 * This should be called once in the client-side application entry point
 * or implicitly when the module is loaded (if side effects are acceptable)
 */
export function initTheme() {
  if (typeof window === 'undefined') return;

  // 1. Load from storage
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    themeStore.set(saved);
  }

  // 2. Subscribe to store changes to update DOM and storage
  themeStore.subscribe((theme) => {
    localStorage.setItem(THEME_KEY, theme);
    applyThemeToDOM(theme);
  });

  // 3. Listen for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (themeStore.get() === 'system') {
      applyThemeToDOM('system');
    }
  });
}

/**
 * Applies the theme to the DOM (html class and data-attribute)
 */
export function applyThemeToDOM(theme: Theme) {
  if (typeof window === 'undefined') return;

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
}

export function setTheme(theme: Theme) {
  themeStore.set(theme);
}

export function toggleTheme() {
  // Simple toggle logic: If system/light -> dark, If dark -> light
  // Or we could cycle: system -> light -> dark -> system
  // For now, let's assume a simple 2-state toggle for the UI button often implies explicit mode
  // But if we want to support 'system' reset, we need a specific control for that.

  // Let's implement a simple Light/Dark toggle that overrides system
  const isDark = document.documentElement.classList.contains('dark');
  themeStore.set(isDark ? 'light' : 'dark');
}

// Auto-initialize if on client
if (typeof window !== 'undefined') {
  initTheme();
}
