import {test, expect} from '@playwright/test';

test('@Web Browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("[id='password']");
    const signIn = page.locator("[id='signInBtn']");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await page.title();
    console.log(title);
    //css
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    //webdriverwait
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    //clearing the entered text and entering modified data
    await userName.fill("");
    await userName.fill("rahulshettyacademy")
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);
    await page.close();
});

test("handling Basic UI controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("[id='password']");
    const signIn = page.locator("[id='signInBtn']");
    /*------------handling dropdown-----------------*/
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption({ value: "consult" });
    await dropdown.selectOption({ label: "Teacher" });
    await dropdown.selectOption({ index: 0 });
    /*------------handling radio button-----------------*/
    const radioButton = page.locator("span.checkmark");
    //await radioButton.last().click();
    await radioButton.nth(1).check();
    await page.waitForTimeout(2000);
    await page.locator("#okayBtn").click();
    console.log(await radioButton.nth(1).isChecked());
    await expect(radioButton.nth(1)).toBeChecked();
    /*------------handling checkbox-----------------*/
    const checkbox = page.locator("[type='checkbox']");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    expect(await checkbox.isChecked()).toBeTruthy();
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy();
    /*------------handling blinking text in web page-----------------*/
    const documentLink = page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    await page.close();
});

test("handling child window", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [childTab] = await Promise.all([
        page.waitForEvent('popup'), // listen for new tab
        documentLink.click(), // action that opens tab
    ]);
    await childTab.waitForLoadState();
    console.log(await childTab.title());
    const text = await childTab.locator("[class='im-para red']").textContent();
    text.trim();
    console.log(text);
    const email = text.split(" ").find(word => word.includes("@"));
    console.log(email);
    const domain = email.split("@")[1];
    console.log(domain);
    expect(domain).toBe("rahulshettyacademy.com");
});
