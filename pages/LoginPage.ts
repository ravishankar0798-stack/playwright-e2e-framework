import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from "../utils/config";
import { logger } from "../utils/logger";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private emailInput = "#userEmail";
  private passwordInput = "#userPassword";
  private loginBtn = "#login";

  async goToLoginPage() {
    logger.info("Navigating to login page...");
    await this.page.goto(config.baseURL);
    await this.waitForURL(config.baseURL);
  }

  async validLogin() {
    logger.info("Filling username...");
    await this.fill(this.emailInput, config.username, { waitFor: true });

    logger.info("Filling password...");
    await this.fill(this.passwordInput, config.password, { waitFor: true });

    logger.info("Clicking login button...");
    await this.click(this.loginBtn);
    await this.page.waitForLoadState('networkidle');
  }
}