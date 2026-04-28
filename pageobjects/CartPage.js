const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async verifyProduct(productName) {
        await expect(this.page.locator('.cartSection').filter({ hasText: productName })).toBeVisible();
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
    }
}
module.exports = { CartPage };