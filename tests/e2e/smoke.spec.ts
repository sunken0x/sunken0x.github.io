import { test, expect } from '@playwright/test';

test('home surface renders the wordmark + hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('sunken').first()).toBeVisible();
  await expect(page.getByText(/to what sunk/i)).toBeVisible();
});

test('DoG page renders at least one specimen tile', async ({ page }) => {
  await page.goto('/depths-of-glitch');
  await expect(page.locator('.dog-tile').first()).toBeVisible();
});

test('works page renders filter controls', async ({ page }) => {
  await page.goto('/works');
  await expect(page.locator('select').first()).toBeVisible();
});

test('hidden echoes route is direct-accessible', async ({ page }) => {
  await page.goto('/_hidden/echoes');
  await expect(page.getByText(/ECHOES IN THE FOG/i)).toBeVisible();
});

test('no magic eden link anywhere on home', async ({ page }) => {
  await page.goto('/');
  const html = await page.content();
  expect(html.toLowerCase()).not.toContain('magiceden');
});
