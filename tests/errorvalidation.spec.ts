import { test, expect } from '@playwright/test';

test('Invalid Login Test', async ({ page }) => {

    // Navigate to login page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // Print title
    const title = await page.title();

    console.log(title);

    // Locators
    const userName = page.locator("#username");

    const passWord = page.locator("#password");

    const signIn = page.locator("#signInBtn");

    // Login
    await userName.fill("rahulshettyacademy");

    await passWord.fill("wrongpassword");

    await signIn.click();

    // Validation
    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

});