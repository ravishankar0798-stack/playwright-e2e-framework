import { Page, Locator } from '@playwright/test';

export class OrderHistoryPage {
    private page: Page;
    private rows: Locator;
    private ordersTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersTable = page.locator('tbody');
        this.rows = page.locator('tbody tr');
    }

    async searchOrder(orderId: string): Promise<void> {
        await this.ordersTable.waitFor();

        const count = await this.rows.count();

        for (let i = 0; i < count; i++) {
            const row = this.rows.nth(i);
            const rowOrderId = await row.locator('th').textContent();

            if (rowOrderId?.trim() === orderId) {
                await row.locator("button:has-text('View')").click();
                break;
            }
        }
    }

    async getOrderIdDetailsPage() {
        // Wait for the page to load fully
        await this.page.waitForLoadState('load');

        // Wait for the element to be available
        await this.page.waitForSelector("[class*='-col-text']", { timeout: 60000 });

        // Attempt to get the order ID
        const orderId = await this.page.locator("[class*='-col-text']").first().textContent();
        return orderId?.trim() || "";
    }
}