import { test, expect, Browser, Page, chromium } from '@playwright/test';

test('close browser', async () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  await page.goto('https://playwright.dev/');
  console.log(await page.title());
  await page.getByRole('link', { name: 'Community' }).click();
  console.log(await page.title());
  await page.getByLabel('Docs sidebar').getByRole('link', { name: 'Ambassadors' }).click();
  await expect(page.getByRole('img', { name: 'Andrew Knight\'s avatar' })).toBeVisible();
  console.log(await page.title());
  await browser.close();
});