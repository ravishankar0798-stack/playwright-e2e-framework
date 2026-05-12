import { Before, After } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { POManager } from "../../pages_ts/POManager";

let browser: Browser;

Before(async function () {

    // Create browser only once per worker (safe in parallel)
    if (!browser) {
        browser = await chromium.launch({
            headless: true,
            slowMo: 200,
            args: ['--start-maximized']
        });
    }

    const context: BrowserContext = await browser.newContext({
        viewport: null
    });

    const page: Page = await context.newPage();

    this.context = context;
    this.page = page;

    this.poManager = new POManager(page);
});

After(async function ({ result }) {

    if (result?.status === "FAILED") {
        await this.page.screenshot({
            path: `reports/failure-${Date.now()}.png`
        });
    }

    await this.page.close();
    await this.context.close();
});
