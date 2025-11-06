import {test, expect} from "@playwright/test"

test.describe("Home page with no auth", () => {
    
    test.beforeEach(async ({page}) => {
        // Page completely load method 1
        await page.goto('https://practicesoftwaretesting.com', {
            waitUntil: 'networkidle', // waits until no network requests for 500ms
        });
    });
    
    test("Check Sign In", async ({page})=>{
        await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });

    test("visual test", async ({page})=>{
        await expect(page).toHaveScreenshot("home-page-no-auth.png", {
            mask: [page.getByTitle("Practice Software Testing - Toolshop")]
        });
        /* As the screenshot isn't present for first execution, it fails the test, but it saves the current screenshot. 
        so that, it pass for consecutive executions. */
    });

    test("validate page title", async ({page}) =>{
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    });

    test("grid load with 9 items", async ({page}) =>{
        const productGrid = page.locator(".col-md-9"); //Locator Assertion
        
        // expect (await productGrid.getByRole("link").count()).toBe(9); // when this is executed it fails.
        await expect(productGrid.getByRole("link")).toHaveCount(9); 
        expect (await productGrid.getByRole("link").count()).toBe(9); 
    });

    test("search for Thor Hammer", async ({page}) =>{
        const productGrid = page.locator(".col-md-9");
        await page.getByTestId("search-query").fill("Thor Hammer");
        await page.getByTestId("search-submit").click();
        await expect(productGrid.getByRole("link")).toHaveCount(1);
        await expect(page.getByAltText("Thor Hammer")).toBeVisible()
    });
    
});

test.describe("Home page customer 01 auth", () => {
    test.use({storageState: ".auth/customer01.json"});

    test.beforeEach(async ({page}) => {
                await page.goto('https://practicesoftwaretesting.com');
    });

    test("visual test authorized", async ({page})=>{
        // Page completely load method 2
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot("home-page-customer01.png", {
            mask: [page.getByTitle("Practice Software Testing - Toolshop")]
    });
        /* npx playwright test tests/home.spec.ts --update-snapshots*/
        /* this allows our toHaveScreenshot command to not fail the test if it doesn't find the screenshot */
    });

    test("Check cusotmer 01 is singed in ", async ({page})=>{
       // await expect(page.getByTestId("nav-sign-in")).not.toHaveText("Sign in"); 
        await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    });
});