import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

setDefaultTimeout(60 * 1000);

Given('user is on the Ecommerce2 login page', async function () {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await this.page.title();
    console.log(title);
});

When('user logs in with {string} and {string} credentials', async function (username, password) {
    const userName = this.page.locator("#username");
    const passWord = this.page.locator("[id='password']");
    const signIn = this.page.locator("[id='signInBtn']");
    await userName.fill(username);
    await passWord.fill(password);
    await signIn.click();
});

Then('an error message should be displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
}); 