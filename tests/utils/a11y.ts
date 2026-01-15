import type { Page, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Runs accessibility checks on the current page.
 * @param page Playwright Page object
 * @param testInfo Optional TestInfo to attach violations to the report
 * @returns The accessibility scan results
 */
export async function checkA11y(page: Page, testInfo?: TestInfo) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  if (testInfo && accessibilityScanResults.violations.length > 0) {
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults.violations, null, 2),
      contentType: 'application/json',
    });
  }

  return accessibilityScanResults;
}
