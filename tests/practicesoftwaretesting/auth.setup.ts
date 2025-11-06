import {test as setup, expect} from "@playwright/test"

setup("Create customer 01 auth", async ({page, context}) => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const cusotmer01AuthFile = ".auth/customer01.json";

    await page.goto("https://practicesoftwaretesting.com/auth/login");

    await page.getByTestId("email").fill(email);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-submit").click();
    
    // Wait for login to complete — e.g., user menu or dashboard visible
    
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

  // ✅ Save full authenticated storage state
    await context.storageState({path: cusotmer01AuthFile});
});