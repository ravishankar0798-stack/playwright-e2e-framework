import { test, expect } from '@playwright/test'

test.describe.configure({mode:"parallel"});
test('@Web Popup validations with playwright', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    //await page.goForward();
    await page.locator(".radioButton").nth(0).click();
    await page.locator("#checkBoxOption1").click();
    await page.locator("#dropdown-class-example").selectOption("Option1");
    await page.locator("input[class*='inputs ui-autocomplete-input']").pressSequentially("Ind");
    const indiaOption = page.getByText('India', { exact: true });
    await expect(indiaOption).toBeVisible();
    await indiaOption.click();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    // Register dialog handler BEFORE click
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept(); // or dismiss()
    });
    //page.locator("#confirmbtn").click(),
    page.getByRole("button", { name: "Confirm" }).click(),
        //await page.locator("#mousehover").hover();
        await page.getByRole("button", { name: "Mouse Hover" }).hover();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.getByRole("link", { name: "All Access Plan" }).click();
    const actualTextCheck = await framePage.locator(".text h2").textContent();
    console.log(actualTextCheck);
    expect(actualTextCheck).toContain('Join 13,522 Happy Subscibers!');
    await page.close();
});

test('Taking screenshot for complete page & particular web element with playwright', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialscreenshot.png' }); //particular web element screenshot
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' }); //complete page screenshot
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('visual comparison for a page with playwright', async ({ page }) => {
    await page.goto("https://flightware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});