class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator('tbody');
        this.rows = page.locator('tbody tr');
    }

    async searchOrder(orderId) {
        const cleanOrderId = orderId.replace(/\|/g, '').trim();
        // Wait until the table has at least one row
        const rows = this.page.locator('tbody tr');
        await rows.first().waitFor({ state: 'visible', timeout: 30000 });
        const rowCount = await rows.count();
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const cellText = (await row.locator('th').first().textContent()).trim();
            if (cellText.includes(cleanOrderId)) {
                await row.locator('button', { hasText: 'View' }).click();
                return cellText;
            }
        }
        throw new Error(`Order | ${orderId} | not found in Order History`);
    }
}

module.exports = { OrderHistoryPage };