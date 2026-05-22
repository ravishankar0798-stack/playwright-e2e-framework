import { test, expect } from '@playwright/test';
import { POManager } from '../pages/POManager';

test.describe('@regression', () => {
    test('Complete Ecommerce Flow', async ({ page }) => {

        const poManager = new POManager(page);

        const productName = 'ZARA COAT 3';

        // Go to login page
        await poManager.loginPage.goToLoginPage();

        // Login
        await poManager.loginPage.validLogin();

        // Add product
        await poManager.dashboardPage.clickOnAddToCartFromDashboard(productName);

        // Open cart
        await poManager.dashboardPage.clickOnCart();

        // Verify cart
        await poManager.cartPage.verifyProductFromCart(productName);

        await poManager.cartPage.goToCheckoutFromCart();

        // Checkout
        await poManager.checkoutPage.selectCountryFromCheckout('ind');

        await poManager.checkoutPage.submitOrderFromCheckout();

        // Get order id
        const orderId = await poManager.checkoutPage.getOrderId();

        console.log(orderId);

        // Orders page
        await poManager.dashboardPage.navigateToOrders();

        // Verify order
        const actualOrderId = await poManager.orderHistoryPage.searchOrder(orderId);

        expect(actualOrderId).toBe(orderId);

        await poManager.dashboardPage.clickOnAddToCartFromDashboard(productName);

        await poManager.dashboardPage.clickOnSignOut();

        await poManager.dashboardPage.clickOnHome();

    });
});