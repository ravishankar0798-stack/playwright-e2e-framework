const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager'); 
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // 60 seconds

Given('user is on the Ecommerce login page for placing the order', async function () {
    console.log("Navigating to login page...");
    await this.poManager.loginPage.goToLoginPage();
});

When('the user logs in with {string} and {string} credentials', async function (username,password) {
    await this.poManager.loginPage.validLogin(username,password);
});

When('Add {string} to Cart', async function (productName) {

    await this.poManager.dashboardPage.searchProductAddCart(productName);
    await this.poManager.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart page', async function (productName) {

    await this.poManager.cartPage.verifyProduct(productName);
    await this.poManager.cartPage.goToCheckout();
});

When('Enter valid details and Place the order', async function () {

    await this.poManager.checkoutPage.selectCountry("ind");
    await this.poManager.checkoutPage.submitOrder();

    this.orderId = await this.poManager.checkoutPage.getOrderId();
    console.log("Order ID:", this.orderId);
});

Then('Verify order is present in the Order History page', async function () {
    await this.poManager.dashboardPage.navigateToOrders();
    this.orderIdFromDetails = await this.poManager.orderHistoryPage.searchOrder(this.orderId);

    console.log("Expected:", this.orderId);
    console.log("Actual:", this.orderIdFromDetails);

    expect(this.orderIdFromDetails.trim()).toBe(this.orderId.trim());
});