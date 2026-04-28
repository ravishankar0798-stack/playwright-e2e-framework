import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async verifyProduct(productName: string) {
        await this.page.waitForLoadState('networkidle'); // Wait for page to fully load
        await expect(this.page.locator('.cartSection').filter({ hasText: productName })).toBeVisible({ timeout: 10000 });
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
    }
}