import {test, expect} from '@playwright/test';

test("Playwright special locators", async({page}) => {
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click(); //"getByLabel" locator used for selecting checkbox, radio button, dropdown
await page.getByLabel("Employed").check(); //"getByLabel" locator used for selecting checkbox, radio button, dropdown
await page.getByLabel("Gender").selectOption("Male"); //"getByLabel" locator used for selecting checkbox, radio button, dropdown
await page.getByPlaceholder("Password").fill("qweqewq"); //"getByPlaceholder" locator used only when there is a placeholder attribute for an element
await page.getByRole("button",{name:"submit"}).click(); //"getByRole" locator can be used for buttons, links
await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //"getByText" locator allows locating elements that contain given text
await page.getByRole("link",{name:"Shop"}).click();
await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button",{name:"Add "}).click(); //chaining locator
await page.close();
});