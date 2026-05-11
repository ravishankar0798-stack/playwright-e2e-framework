import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils_ts/logger";

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private cart = "[routerlink*='cart']";
    private allProductCards = ".card-body";
    private allProductCardsText = ".card-body b";
    private ordersButton = "button[routerlink*='myorders']";

    async searchProductAddCart(productName: string) {
        logger.info(`Waiting for product cards to load...`);
        await this.waitForFirst(this.allProductCards);
        const allProductTitles = await this.page.locator(this.allProductCardsText).allTextContents();
        logger.info(`Available products: ${allProductTitles.join(", ")}`);
        // Find the product card with the matching product name
        const productLocator = this.page.locator(this.allProductCards, { hasText: productName })
            .locator('button:has-text("Add To Cart")');

        logger.info(`Adding product "${productName}" to cart...`);
        await productLocator.click();
    }

    async navigateToCart() {
        /*------------------clicking on the cart--------------------------*/
        logger.info("Navigating to Cart page...");
        await this.click(this.cart);
        await this.waitForURL("/cart");
    }

    async navigateToOrders() {
        logger.info("Navigating to Orders page...");
        await this.click(this.ordersButton);
        await this.waitForURL("/myorders");
    }

}