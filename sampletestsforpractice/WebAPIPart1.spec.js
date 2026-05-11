import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';

const loginPayLoad = { userEmail: "ravishankar0798@gmail.com", userPassword: "Qwertyuiop@1" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let token;
let apiContext;
let orderId;

test.beforeAll(async () => {
    apiContext = await request.newContext();
    //assign to global
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    //get token explicitly
    token = await apiUtils.getToken();
    console.log("Token in beforeAll:", token);
    //create order and store ID
    orderId = await apiUtils.createOrder(orderPayLoad);
    console.log("OrderId in beforeAll:", orderId);
});

test.beforeEach(async ({ page }) => {
    //Inject token properly
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    console.log("Page Title:", await page.title());
});

test("Verify order in Orders page", async ({ page }) => {
    await page.getByRole('button', { name: 'Orders' }).click();
    //LOG: All orders
    const orderIds = await page.locator('tbody tr th').allTextContents();
    console.log(orderIds);
    console.log("Searching for Order ID:", orderId);

    const row = page.locator('tbody tr', { has: page.locator('th', { hasText: orderId }) });
    const rowCount = await row.count();
    console.log("Matching Row Count:", rowCount);
    await expect(row).toBeVisible();
    await row.locator('button').first().click();
    console.log("Clicked on order details successfully");
});