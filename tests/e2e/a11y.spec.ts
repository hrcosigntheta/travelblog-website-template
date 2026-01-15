import { test, expect } from '@playwright/test';
import { checkA11y } from '../utils/a11y';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }, testInfo) => {
    await page.goto('/');
    // Wait for the page to be ready
    await page.waitForLoadState('networkidle');

    const results = await checkA11y(page, testInfo);

    // Check if there are any violations
    expect(results.violations).toEqual([]);
  });
});
