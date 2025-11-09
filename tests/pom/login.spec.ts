import {test, expect} from '@playwright/test'
import { LoginPage } from './login-page.pom'


test ('login using POM', async ({page})=>{
    const loginPage = new LoginPage(page);
    await page.goto('https://binaryville.com/account');

    await loginPage.emailLocator.fill('test@example.com');
    await loginPage.passwordLocator.fill('Pass1234');
    await loginPage.singInButtonlLocator.click();

    expect(page.url()).toContain('Pass1234');
});