import {expect, test} from '@playwright/test'

/* Automatically manages browser launching and shutting down */
test('Sign in button is visible', async({page})=>{
    await page.goto ('https://binaryville.com/account');
    const singInButton = page.getByRole('button', {name: 'Sign in'});
    await expect (singInButton).toBeVisible();
})