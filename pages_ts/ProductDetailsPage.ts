import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils_ts/logger";

export class ProductDetailsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private addToCartButton = "button:has-text('Add To Cart')";

    async addProductToCartFromProductDetails() {
        logger.info("Adding product to cart from details page...");
        await this.click(this.addToCartButton);
    }
}
