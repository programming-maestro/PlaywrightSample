import {test as base, expect, type Page} from '@playwright/test'

type TestFixtures = {
  testData: { email: string; password: string };
  authenticatedUser: Page;
};

const test = base.extend<TestFixtures>({
    testData: async ({}, use) => {
        const data = { email: 'test@example.com', password: 'pass123' };
        await use(data);
    },
    authenticatedUser: [async ({page, testData}, use)=>{
        await page.goto('https://binaryville.com/account');

        await page.getByRole('textbox', { name: "Email" }).fill(testData.email);
        await page.getByRole('textbox', { name: "Password" }).fill(testData.password);
        await page.getByRole('button', { name: "Sign in" }).click();

        await use(page);
    }, {auto: true}]
});

test('uses custom testData with UI', async ({ page, testData }) => {
  const url =  page.url();
  expect(url).toContain(testData.password);
});


export { test, expect };