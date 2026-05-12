import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getExcelData } from '../../utils_ts/excelReader';

setDefaultTimeout(60 * 1000);

When('user logs in with valid credentials', async function () {
    await this.poManager.loginPage.validLogin();
});

When('Click on Cart button from dashboard page', async function () {
    await this.poManager.dashboardPage.clickOnCart();
});

Then('Verify {string} is displayed in the Cart page', async function (productName) {
    await this.poManager.cartPage.verifyProductFromCart(productName);
    await this.poManager.cartPage.goToCheckoutFromCart();
});

When('Enter valid details and Place the order', async function () {
    await this.poManager.checkoutPage.selectCountryFromCheckout("ind");
    await this.poManager.checkoutPage.submitOrderFromCheckout();

    this.orderId = await this.poManager.checkoutPage.getOrderId();
    console.log("Order ID:", this.orderId);
});

Then('Verify order is present in the Order History page', async function () {
    await this.poManager.dashboardPage.navigateToOrders();

    this.orderIdFromDetails = await this.poManager.orderHistoryPage.searchOrder(this.orderId);

    console.log("Expected:", this.orderId);
    console.log("Actual:", this.orderIdFromDetails);

    expect(this.orderIdFromDetails).toBe(this.orderId);
});

When('Add {string} to Cart by clicking on Add to Cart button from dashboard page', async function (productName) {
    await this.poManager.dashboardPage.clickOnAddToCartFromDashboard(productName);
});

Then('Click on Sign Out button from dashboard page', async function() {
    await this.poManager.dashboardPage.clickOnSignOut();    
});

Then('Click on Home button from dashboard page', async function() {
    await this.poManager.dashboardPage.clickOnHome();    
});