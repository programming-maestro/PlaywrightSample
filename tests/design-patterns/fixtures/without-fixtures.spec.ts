import {expect, test, chromium} from '@playwright/test'

test('Sign in button is visible', async()=>{
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto ('https://binaryville.com/account');
    const singInButton = page.getByRole('button', {name: 'Sign in'});
    await expect (singInButton).toBeVisible();

    await browser.close();
})