import { test, expect } from '@playwright/test';

test("Page playwright test", async ({ page }) => {

    const userName = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const login = page.getByRole("button", { name: "Login" });
    const cardTitles = page.locator(".card-body b");
    const email = "ravishankar0798@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    const title = await page.title();
    console.log(title);
    //css
    await userName.fill(email);
    await password.fill("Qwertyuiop@1");
    await login.click();
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    //await page.waitForLoadState("networkidle");
    await cardTitles.first().waitFor();
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);
    /*-----------------selecting the product and adding to the cart-------------------------------*/
    const productName = 'ZARA COAT 3';
    await page.locator('.card-body').filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" }).click();
    /*----------selecting cart from dashboard header and peforming few actions present in the cart page----------*/
    //await page.locator("[class='btn btn-custom']").nth(2).click();
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await expect(page.locator('.cart').getByText(productName)).toBeVisible();
    //await page.locator("[class='btn btn-primary']").last().click();
    await page.getByRole("button", { name: "Checkout" }).click();
    //await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    // wait and click India from dropdown
    await page.locator('.ta-results').waitFor();
    // const options = page.locator('.ta-results button');
    // const count = await options.count();

    // for (let i = 0; i < count; i++) {
    // const text = await options.nth(i).textContent();
    //    if (text?.trim() === 'India') {
    //         await options.nth(i).click();
    //         break;
    //     }
    // }
    await page.getByRole("button",{name:"India"}).nth(1).click();
    //expect(page.locator('label[type="text"]')).toHaveText(email);
    expect(page.getByLabel(email));
    //await page.locator("[class='btnn action__submit ng-star-inserted']").click();
    await page.getByText("PLACE ORDER").click();
    //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    /*---------selecting orders from dashboard header and peforming few actions present in the orders page-------*/
    //await page.locator("[class='btn btn-custom']").nth(1).click();
    await page.getByRole("listitem").getByRole("button", { name: "ORDERS" }).click();
    const cleanOrderId = orderID.replace(/\|/g, '').trim();
    const row = page.locator('tbody tr', {
        has: page.locator('th', { hasText: cleanOrderId })
    });
    await row.locator('button').first().click();
await page.close();
});