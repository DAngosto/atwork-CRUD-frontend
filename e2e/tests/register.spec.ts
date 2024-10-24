import { test, expect } from '@playwright/test';

test.describe('Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/register');
    await page.waitForLoadState('load');
  });

  test('Should be on the /register route', async ({ page }) => {
    expect(page.url()).toContain('/register');
  });

  test('Should navigate to the dashboard when clicking the login button with valid user and password', async ({
    page,
  }) => {
    await page.fill('input#email', 'test@test.com');
    await page.fill('input#password', 'test');
    await page.fill('input#company', 'test');
    await page.fill('input#phone', '712 744 240');

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await page.waitForURL('/dashboard', { timeout: 30000 });
    expect(page.url()).toContain('/dashboard');
  });
});
