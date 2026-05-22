import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class OrderHistoryPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private rows = "tbody tr";
    private orderIdColumn = "th";
    private viewButton = "button:has-text('View')";
    private detailsOrderId = "[class*='-col-text']";

    /**
     * Search for an order by ID, safely removing any pipes
     */
    async searchOrder(orderId: string): Promise<string> {
        const rowLocator = this.page.locator(this.rows);
        const count = await rowLocator.count();

        for (let i = 0; i < count; i++) {
            const row = rowLocator.nth(i);
            const rowText = await row.locator(this.orderIdColumn).textContent();
            const cleanText = rowText?.replace(/\|/g, "").trim();

            if (cleanText === orderId.replace(/\|/g, "").trim()) {
                logger.info(`Order found. Clicking 'View' button.`);
                await row.locator(this.viewButton).click();
                // Return the normalized order ID
                return cleanText;
            }
        }
        throw new Error(`Order ID ${orderId} not found in Order History`);
    }

    /**
     * Get the order ID from the details page
     */
    async getOrderIdDetailsPage(): Promise<string> {
        logger.info("Fetching Order ID from details page...");

        await this.page.waitForLoadState('load');
        await this.waitForFirst(this.detailsOrderId, 'visible', 60000);

        const orderId = await this.getFirstText(this.detailsOrderId);
        logger.info(`Order ID found: ${orderId}`);
        return orderId;
    }
}