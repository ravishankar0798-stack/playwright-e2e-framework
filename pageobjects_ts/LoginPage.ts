import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly userName: Locator;
    readonly password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goToLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();

        // Basic stability check after login
        await this.page.waitForLoadState('networkidle');
    }
}