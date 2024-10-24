import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    await page.waitForLoadState('load');
  });

  test('Should be on the /login route', async ({ page }) => {
    expect(page.url()).toContain('/login');
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

  test('Should navigate to the register page when clicking on the register link', async ({
    page,
  }) => {
    const registerLink = page.locator('a:has-text("Create a new one!")');
    await expect(registerLink).toBeVisible();

    await registerLink.click();

    expect(page.url()).toContain('/register');
  });

  test('Should navigate to the dashboard when clicking the login button with valid user and password', async ({
    page,
  }) => {
    await page.fill('input#email', 'admin@admin.com');
    await page.fill('input#password', 'admin');

    const loginButton = page.locator('button:has-text("Sign In")');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await page.waitForURL('/dashboard', { timeout: 30000 });
    expect(page.url()).toContain('/dashboard');
  });
});
