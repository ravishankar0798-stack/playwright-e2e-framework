class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder='Select Country']");
        this.results = page.locator(".ta-results button");
        this.submit = page.locator(".btnn");
    }

    async selectCountry(country) {
        await this.countryInput.pressSequentially(country);
        await this.results.first().waitFor();
        const count = await this.results.count();
        for (let i = 0; i < count; i++) {
            const text = await this.results.nth(i).textContent();
            if (text.trim() === "India") {
                await this.results.nth(i).click();
                break;
            }
        }
    }

    async submitOrder() {
        await this.submit.click();
    }

    async getOrderId() {
        const orderId = await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent();
        return orderId.replace(/\s|\|/g, '').trim();
    }
}
module.exports = { CheckoutPage };