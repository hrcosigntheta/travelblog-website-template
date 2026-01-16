import { test, expect } from '@playwright/test';

test.describe('Destination Practical Info', () => {
  test('should display practical info correctly on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Navigate to a destination page (El Nido)
    await page.goto('./destinations/el-nido-palawan/');

    // Check for the Practical Info Section Heading
    const sectionHeading = page.getByRole('heading', { name: /Practical Information/i });
    await expect(sectionHeading).toBeVisible();
    await sectionHeading.scrollIntoViewIfNeeded();

    // Verify sections are visible on desktop
    const desktopContainer = page.getByTestId('practical-info-desktop');
    await expect(desktopContainer).toBeVisible();

    // Getting There
    await expect(desktopContainer.getByRole('heading', { name: /Getting There/i })).toBeVisible();
    await expect(desktopContainer.getByText('Fly directly to El Nido (Lio Airport)')).toBeVisible();

    // Where to Stay
    await expect(desktopContainer.getByRole('heading', { name: /Where to Stay/i })).toBeVisible();
    await expect(desktopContainer.getByText('El Nido offers a range of options')).toBeVisible();

    // Travel Tips
    await expect(desktopContainer.getByRole('heading', { name: /Travel Tips/i })).toBeVisible();
    await expect(desktopContainer.getByText('Bring cash as ATMs can be unreliable')).toBeVisible();
  });

  test('should work as accordion on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('./destinations/el-nido-palawan/');

    const sectionHeading = page.getByRole('heading', { name: /Practical Information/i });
    await sectionHeading.scrollIntoViewIfNeeded();

    const mobileContainer = page.getByTestId('practical-info-mobile');
    await expect(mobileContainer).toBeVisible();

    // On mobile, the content is hidden by default (max-h-0 opacity-0)
    // We click the button to expand

    // Check Getting There button
    const gettingThereButton = mobileContainer.getByRole('button', { name: /Getting There/i });
    await expect(gettingThereButton).toBeVisible();

    // Content should be hidden initially (or effectively hidden)
    // We can check if it's visible after click
    await gettingThereButton.click();

    // Now content should be visible within mobile container
    await expect(mobileContainer.getByText('Fly directly to El Nido (Lio Airport)')).toBeVisible();

    // Click again to close (optional, but good to test toggle)
    await gettingThereButton.click();

    const tipsButton = mobileContainer.getByRole('button', { name: /Travel Tips/i });
    await tipsButton.click();
    await expect(mobileContainer.getByText('Bring cash as ATMs can be unreliable')).toBeVisible();
  });
});
