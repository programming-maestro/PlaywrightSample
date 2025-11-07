import {test, expect} from "@playwright/test"

test.describe("end to end tests", () => {
    test.use({storageState: ".auth/customer01.json"});


    test.beforeEach(async ({page}) => {
        // Page completely load method 1
        await page.goto('https://practicesoftwaretesting.com', {
            waitUntil: 'networkidle', // waits until no network requests for 500ms
        });
    });

    test("buy now pay later", async({page, headless}) => {
        await page.getByText("Claw Hammer with Shock Reduction Grip").click();
        await page.getByTestId("add-to-cart").click();
        await expect(page.getByTestId("cart-quantity")).toHaveText("1");
        await page.getByTestId("nav-cart").click();
        await page.getByTestId("proceed-1").click();
        await page.getByTestId("proceed-2").click();
        
        // await expect (
        //     page.locator(".step-indicator").filter({hasText: "2"})
        // ).toHaveCSS("background-color","rgb(51,153,51)");


        // await expect (
        //     page.locator(".step-indicator")).toHaveText("2");

        await page.getByTestId("street").fill("Test Address");
        await page.getByTestId("city").fill("Test City");
        await page.getByTestId("state").fill("Test State");
        await page.getByTestId("country").fill("Test Country");
        await page.getByTestId("postal_code").fill("123456");
        await page.getByTestId("proceed-3").click();

        await expect(page.getByTestId("finish")).toBeDisabled();
        await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
        await page.getByTestId("monthly_installments").selectOption("12 Monthly Installments");
        
        await expect(page.getByTestId("finish")).toBeEnabled();
        await page.getByTestId("finish").click();

        await expect(page.locator(".help-block")).toHaveText("Payment was successful");

        /* If running in headless mode, screenshot is taken, else not. Note: Test will fail first time as screenshot will not be present.*/
        headless
        ? await test.step("visual test", async () => {
            await expect(page).toHaveScreenshot("checkout.png", {
                mask: [page.getByTitle("Practice Software Testing - Toolshop")],
            });
            })
        : console.log("Running in Headed mode, no screenshot comparison");
    });// Test
}); //Test Description