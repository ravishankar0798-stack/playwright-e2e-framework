import {test, expect} from '@playwright/test';

test("Page playwright test", async ({ page }) => {
    const userName = page.locator("#userEmail");
    const password = page.locator("[id='userPassword']");
    const login = page.locator("[id='login']");
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
    await page.locator('.card-body', { hasText: productName }).locator('button:has-text("Add To Cart")').click();
    /*----------selecting cart from dashboard header and peforming few actions present in the cart page----------*/
    await page.locator("[class='btn btn-custom']").nth(2).click();
    await expect(page.locator('.cart', { hasText: productName })).toBeVisible();
    await page.locator("[class='btn btn-primary']").last().click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    // wait and click India from dropdown
    await page.locator('.ta-results').waitFor();
    const options = page.locator('.ta-results button');
    const count = await options.count();

    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        if (text?.trim() === 'India') {
            await options.nth(i).click();
            break;
        }
    }
    expect(page.locator('label[type="text"]')).toHaveText(email);
    await page.locator("[class='btnn action__submit ng-star-inserted']").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    /*---------selecting orders from dashboard header and peforming few actions present in the orders page-------*/
    await page.locator("[class='btn btn-custom']").nth(1).click();
    const cleanOrderId = orderID.replace(/\|/g, '').trim();
    const row = page.locator('tbody tr', {
        has: page.locator('th', { hasText: cleanOrderId })
    });
    await row.locator('button').first().click();

});
