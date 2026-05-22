import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderHistoryPage } from './OrderHistoryPage';
import { ProductDetailsPage } from './ProductDetailsPage';

export class POManager {
    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;
    readonly orderHistoryPage: OrderHistoryPage;
    readonly productDetailsPage: ProductDetailsPage;

    constructor(page: Page) {
        // Create all page object instances 
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.productDetailsPage = new ProductDetailsPage(page);
    }
}