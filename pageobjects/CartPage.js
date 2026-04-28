const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async verifyProduct(productName) {
        await this.page.waitForLoadState('networkidle'); // Wait for page to fully load
        await expect(this.page.locator('.cartSection').filter({ hasText: productName })).toBeVisible({ timeout: 10000 });
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
    }
}
module.exports = { CartPage };