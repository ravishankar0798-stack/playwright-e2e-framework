import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private checkoutBtn = "text=Checkout";
    private cartSection = ".cartSection";


    async verifyProductFromCart(productName: string) {
        logger.info(`Verifying product in cart: ${productName}`);
        await this.page.waitForLoadState('networkidle');
        await this.expectTextInElementVisible(this.cartSection, productName, 10000);
    }

    async goToCheckoutFromCart() {
        logger.info("Navigating to Checkout page...");
        await this.click(this.checkoutBtn);
    }
}