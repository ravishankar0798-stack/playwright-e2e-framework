import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async verifyProduct(productName:string) {
        await expect(this.page.locator('.cartSection h3')).toContainText(productName);
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
    }
}