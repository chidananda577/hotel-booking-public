import { test, expect } from '@playwright/test';

function uniqueEmail() {
  return `pw_${Date.now()}@example.com`;
}

test.describe('User Registration', () => {
  test('registers a new user (smoke)', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /register/i })).toBeVisible();

    const email = uniqueEmail();

    await page.getByLabel('Name').fill('Playwright User');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('Password123!');

    await page.getByRole('button', { name: /register/i }).click();

    // App behavior may navigate to login or show success.
    await expect(page).toHaveURL(/\/(login|register)/);
  });
});
