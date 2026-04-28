import { Page, Locator, expect } from '@playwright/test'
export class CheckoutPage {
    readonly page: Page;
    readonly countryInput: Locator;
    readonly results: Locator;
    readonly submit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder='Select Country']");
        this.results = page.locator(".ta-results button");
        this.submit = page.locator(".btnn");
    }

    async selectCountry(country: string) {
        await this.countryInput.pressSequentially(country);
        await this.results.first().waitFor();
        const count = await this.results.count();
        for (let i = 0; i < count; i++) {
            const text = await this.results.nth(i).textContent();
            if (text?.trim() === "India") {
                await this.results.nth(i).click();
                break;
            }
        }
    }

    async submitOrder() {
        await this.submit.click();
    }

    async getOrderId(): Promise<string> {
        const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        return orderId?.trim() || "";
    }
}