import { Before, After } from "@cucumber/cucumber";
import { POManager } from '../../pages_ts/POManager';
import { chromium } from '@playwright/test';

Before(async function () {
    const browser = await chromium.launch({
        headless: true,
        slowMo: 200,
        args: ['--start-maximized']
    });

    this.browser = browser;

    const context = await browser.newContext({ viewport: null });
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
});

After(async function ({ result }) {
    if (result?.status === 'FAILED') {
        await this.page.screenshot({
            path: `reports/failure-${Date.now()}.png`
        });
    }

    await this.browser.close();
});