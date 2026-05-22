import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private cart = "[routerlink*='cart']";
    private allProductCards = ".card-body";
    private allProductCardsText = ".card-body b";
    private ordersButton = "button[routerlink*='myorders']";

    async clickOnAddToCartFromDashboard(productName: string) {
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

    async clickOnCart() {
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

    async clickOnViewFromDashboard(productName: string) {
        logger.info("Waiting for dashboard to load...");
        await this.waitForFirst(this.allProductCards);
        const allProductTitles = await this.page.locator(this.allProductCardsText).allTextContents();
        logger.info(`Available products: ${allProductTitles.join(", ")}`);
        // Find the product card with the matching product name
        const productLocator = this.page.locator(this.allProductCards, { hasText: productName })
            .locator('button:has-text("View")');

        logger.info(`Clicking on view button for the product "${productName}"`);
        await productLocator.click();
    }

    async clickOnSignOut() {
        logger.info("Signing out...");
        await this.clickByText("Sign Out");
        await this.waitForURL("/login");
    }

    async clickOnHome() {
        logger.info("Navigating to Home page...");
        await this.clickByText("Home");
        await this.waitForURL("/dashboard");
    }

}