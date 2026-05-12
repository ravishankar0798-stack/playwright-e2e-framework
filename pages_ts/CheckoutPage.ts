import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils_ts/logger";

export class CheckoutPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private submit = ".btnn";
    private countryInput = "[placeholder='Select Country']";
    private results = ".ta-results button";
    private orderIdText = ".em-spacer-1 .ng-star-inserted";

    async selectCountryFromCheckout(country: string) {
        logger.info(`Selecting country: ${country}`);
        await this.typeSlowly(this.countryInput, country);
        await this.waitForFirst(this.results);
        const options = this.page.locator(this.results);
        const count = await options.count();
        for (let i = 0; i < count; i++) {
            const text = await options.nth(i).textContent();
            if (text?.trim() === "India") {
                await options.nth(i).click();
                break;
            }
        }
    }

    async submitOrderFromCheckout() {
        logger.info("Submitting order...");
        await this.click(this.submit);
    }

    async getOrderId(): Promise<string> {
        logger.info("Fetching order ID...");
        const orderId = await this.getText(this.orderIdText);
        return orderId.replace(/\|/g, "").trim();
    }
}