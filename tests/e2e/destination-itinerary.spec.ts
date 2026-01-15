import { test, expect } from '@playwright/test';

test.describe('Destination Itinerary', () => {
  test('should display the itinerary correctly', async ({ page }) => {
    // Navigate to a destination page (El Nido)
    await page.goto('/destinations/el-nido-palawan');

    // Check for the Itinerary Section Heading
    const itineraryHeading = page.getByRole('heading', { name: /Suggested Itinerary/i });
    await expect(itineraryHeading).toBeVisible();

    // Scroll to itinerary section
    await itineraryHeading.scrollIntoViewIfNeeded();

    // Verify Day 1 is visible
    const day1Button = page.getByRole('button', { name: /Day 1/i });
    await expect(day1Button).toBeVisible();
    await expect(day1Button).toContainText('Arrival & Town Exploration');

    // Verify Day 2 is visible
    const day2Button = page.getByRole('button', { name: /Day 2/i });
    await expect(day2Button).toBeVisible();
    await expect(day2Button).toContainText('Tour A: Lagoons & Beaches');

    // Verify default state (Day 1 open, Day 2 closed usually, but verify content visibility)
    // The component sets defaultOpen={index === 0} so Day 1 should be open
    await expect(page.getByText('Arrival at Lio Airport')).toBeVisible();

    // Day 2 content should be hidden (or collapsed)
    // The implementation uses max-h-0 and opacity-0 classes for closed state
    // Playwright's toBeVisible() checks for opacity > 0, display != none, visibility != hidden
    // opacity-0 might make it "hidden" to playwright
    // Let's check if we can expand Day 2

    await day2Button.click();

    // Now Day 2 content should be visible
    // "Big Lagoon" is an activity in Day 2
    // We scope to the itinerary section to avoid matching text in other sections (like Intro or Highlights)
    // and target the specific heading for the activity
    const itinerarySection = page.locator('section#itinerary');
    const bigLagoonActivity = itinerarySection.getByRole('heading', { name: 'Big Lagoon' });

    await expect(bigLagoonActivity).toBeVisible();

    // Verify activity details
    await expect(itinerarySection.getByText('Kayak through the emerald waters')).toBeVisible();
  });
});
