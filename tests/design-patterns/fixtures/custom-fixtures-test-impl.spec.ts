import { test, expect } from './custom-fixtures'; 

test('uses custom testData with UI', async ({ page, testData }) => {
  await page.goto('https://binaryville.com/account');

  await page.getByRole('textbox', { name: "Email" }).fill(testData.email);
  await page.getByRole('textbox', { name: "Password" }).fill(testData.password);
  await page.getByRole('button', { name: "Sign in" }).click();

  const url =  page.url();
  expect(url).toContain(testData.password);
});