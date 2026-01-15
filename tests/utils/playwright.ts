import type { Page } from '@playwright/test';

export const VIEWPORTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  tablet: { width: 768, height: 1024 }, // iPad Mini
  desktop: { width: 1440, height: 900 }, // Desktop
  large: { width: 1920, height: 1080 }, // Large Desktop
};

/**
 * Sets the viewport to a predefined size.
 */
export async function setViewport(page: Page, size: keyof typeof VIEWPORTS) {
  await page.setViewportSize(VIEWPORTS[size]);
}

/**
 * Toggles the theme using the expected UI button.
 * Assumes a button with aria-label="Toggle theme" or similar.
 */
export async function toggleTheme(page: Page) {
  // This selector might need updating once the component is built
  await page.click('button[aria-label*="theme"], button[aria-label*="mode"]');
}

/**
 * Checks if the dark mode is active (html class="dark").
 */
export async function isDarkMode(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    return document.documentElement.classList.contains('dark');
  });
}
