import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.waitForLoadState('load');
  });

  test('Should display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/atwork-crud-frontend/);
  });

  test('Should be on the /login route', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:4200/login');
  });

  test('Should display email, password, and log in buttons', async ({
    page,
  }) => {
    const emailButton = page.locator('input[type="email"]');
    await expect(emailButton).toBeVisible();

    const passwordButton = page.locator('input[type="password"]');
    await expect(passwordButton).toBeVisible();

    const loginButton = page.locator('button[label="Sign In"]');
    await expect(loginButton).toBeVisible();
  });
});
