class DashboardPage {
    constructor(page) {
        this.page = page;
        this.allProductCards = page.locator(".card-body");
        this.allProductCardsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.ordersButton = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName) {
        await this.allProductCardsText.first().waitFor();
        const allProductCardTitles = await this.allProductCardsText.allTextContents();
        console.log(allProductCardTitles);
        /*-----------------selecting the product and adding to the cart-------------------------------*/
        await this.page.locator('.card-body', { hasText: productName }).locator('button:has-text("Add To Cart")').click();
    }

    async navigateToCart() {
        await this.page.locator("[routerlink*='cart']").click();
        await this.page.waitForLoadState('networkidle'); // ✅ important
    }

    async navigateToOrders() {
        await this.ordersButton.click();
    }

}
module.exports = { DashboardPage };