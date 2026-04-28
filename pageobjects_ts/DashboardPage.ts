import { Page, Locator, expect } from '@playwright/test';
export class DashboardPage {
    readonly page: Page;
    readonly allProductCards: Locator;
    readonly allProductCardsText: Locator;
    readonly cart: Locator;
    readonly ordersButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allProductCards = page.locator(".card-body");
        this.allProductCardsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.ordersButton = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName: string) {
        await this.allProductCardsText.first().waitFor();
        const allProductCardTitles = await this.allProductCardsText.allTextContents();
        console.log(allProductCardTitles);
        /*-----------------selecting the product and adding to the cart-------------------------------*/
        await this.page.locator('.card-body', { hasText: productName }).locator('button:has-text("Add To Cart")').click();
    }

    async navigateToCart() {
        /*------------------clicking on the cart--------------------------*/
        await this.cart.click();
    }

    async navigateToOrders(): Promise<void> {
        await this.ordersButton.click();
    }

}