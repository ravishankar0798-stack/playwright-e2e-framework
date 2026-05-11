import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
const testData = require('../test-data/placeorderTestData.json');

test.describe("Data-driven tests for checkout", () => {

    for (const data of testData) {

        test(`Place order for ${data.productName}`, async ({ page }) => {

            const poManager = new POManager(page);

            await poManager.loginPage.goToLoginPage();
            await poManager.loginPage.validLogin(data.username, data.password);

            await poManager.dashboardPage.searchProductAddCart(data.productName);
            await poManager.dashboardPage.navigateToCart();

            await poManager.cartPage.verifyProduct(data.productName);
            await poManager.cartPage.goToCheckout();

            await poManager.checkoutPage.selectCountry("ind");
            await poManager.checkoutPage.submitOrder();

            const orderId = await poManager.checkoutPage.getOrderId();

            await poManager.dashboardPage.navigateToOrders();

            await poManager.orderHistoryPage.searchOrder(orderId);
            expect(orderId.includes(await poManager.orderHistoryPage.getOrderIdDetailsPage())).toBeTruthy();
        });
    }
});