const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager');
const { chromium } = require('@playwright/test');


Before(async function () {
    const browser = await chromium.launch({ headless: false, slowMo: 200, args: ['--start-maximized'] });
    this.browser = browser; // store it

    const context = await browser.newContext({viewport: null});
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
});

BeforeStep(async function () {

});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});

After(async function () {
    await this.browser.close();
});