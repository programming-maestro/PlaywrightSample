import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';

test('login without page object', async ({ page }) => {
  await page.goto(process.env.URL+""); // in other to use env file. ensure the baseURL is not present in both .env file and playwright config file.

  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('elcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');

  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await expect(page.locator('[data-test="nav-messages"]')).toBeVisible();
});

test('login with page object', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto()

  await loginPage.login('customer@practicesoftwaretesting.com','welcome01')

  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await expect(page.locator('[data-test="nav-messages"]')).toBeVisible();
});


