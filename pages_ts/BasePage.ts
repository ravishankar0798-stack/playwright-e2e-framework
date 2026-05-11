// BasePage.ts
import { Page, expect } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // -------------------
    // CLICK / FILL ACTIONS
    // -------------------

    async click(locator: string, timeout: number = 5000): Promise<void> {
        console.log(`Clicking on ${locator}`);
        await this.page.locator(locator).click({ timeout });
    }

    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text).click();
    }

    async clickByRole(role: any, name: string): Promise<void> {
        await this.page.getByRole(role, { name }).click();
    }

    async fill(locator: string, value: string, options?: { waitFor?: boolean }): Promise<void> {
        console.log(`Filling ${locator} with value: ${value}`);
        await this.page.locator(locator).fill(value);
        if (options?.waitFor) await this.page.locator(locator).waitFor();
    }

    async fillByLabel(label: string, value: string): Promise<void> {
        await this.page.getByLabel(label).fill(value);
    }

    async fillByPlaceholder(placeholder: string, value: string): Promise<void> {
        await this.page.getByPlaceholder(placeholder).fill(value);
    }

    async doubleClick(locator: string): Promise<void> {
        await this.page.locator(locator).dblclick();
    }

    async rightClick(locator: string): Promise<void> {
        await this.page.locator(locator).click({ button: 'right' });
    }

    async hover(locator: string): Promise<void> {
        await this.page.locator(locator).hover();
    }

    async clear(locator: string): Promise<void> {
        await this.page.locator(locator).fill('');
    }

    async check(locator: string): Promise<void> {
        await this.page.locator(locator).check();
    }

    async uncheck(locator: string): Promise<void> {
        await this.page.locator(locator).uncheck();
    }

    // -------------------
    // WAIT HELPERS
    // -------------------

    async waitFor(locator: string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout: number = 5000): Promise<void> {
        await this.page.locator(locator).waitFor({ state, timeout });
    }

    async waitForText(locator: string, text: string, timeout: number = 5000): Promise<void> {
        await this.page.locator(locator).waitFor({ state: 'visible', timeout });
        await expect(this.page.locator(locator)).toHaveText(text, { timeout });
    }

    async waitForURL(urlPart: string, timeout: number = 5000): Promise<void> {
        await this.page.waitForURL(`**${urlPart}**`, { timeout });
    }

    async waitForNavigation(): Promise<void> {
        await this.page.waitForNavigation();
    }

    async waitForFirst(locator: string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout: number = 5000): Promise<void> {
        await this.page.locator(locator).first().waitFor({ state, timeout });
    }

    async waitForLast(locator: string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout: number = 5000): Promise<void> {
        await this.page.locator(locator).last().waitFor({ state, timeout });
    }

    async clickByIndex(locator: string, index: number = 0, timeout: number = 5000): Promise<void> {
        const element = this.page.locator(locator).nth(index);
        await element.waitFor({ state: 'visible', timeout });
        await element.click();
    }

    // -------------------
    // ASSERTIONS
    // -------------------

    async expectVisible(locator: string): Promise<void> {
        await expect(this.page.locator(locator)).toBeVisible();
    }

    async expectText(locator: string, expected: string): Promise<void> {
        const actual = (await this.page.locator(locator).textContent())?.trim() || '';
        if (actual !== expected) throw new Error(`Text mismatch: expected "${expected}", got "${actual}"`);
    }

    async expectContains(locator: string, text: string): Promise<void> {
        await expect(this.page.locator(locator)).toContainText(text);
    }

    async expectEnabled(locator: string): Promise<void> {
        await expect(this.page.locator(locator)).toBeEnabled();
    }

    async expectChecked(locator: string): Promise<void> {
        await expect(this.page.locator(locator)).toBeChecked();
    }

    async expectURLContains(partialUrl: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(partialUrl));
    }

    async expectTextInElementVisible(locator: string, text: string, timeout: number = 10000): Promise<void> {
        const element = this.page.locator(locator).filter({ hasText: text });
        await element.waitFor({ state: 'visible', timeout });
    }

    // -------------------
    // KEYBOARD & MOUSE
    // -------------------

    async pressKey(locator: string, key: string): Promise<void> {
        await this.page.locator(locator).press(key);
    }

    async typeText(locator: string, text: string, delay?: number): Promise<void> {
        await this.page.locator(locator).type(text, { delay });
    }

    async scrollIntoView(locator: string): Promise<void> {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
    }

    async typeSlowly(locator: string, text: string, delay: number = 100, clearFirst: boolean = true): Promise<void> {
        const element = this.page.locator(locator);
        console.log(`Typing slowly into ${locator}: ${text}`);
        if (clearFirst) {
            await element.fill("");
        }
        await element.pressSequentially(text, { delay });
    }

    // -------------------
    // UTILITIES
    // -------------------

    async getText(locator: string): Promise<string> {
        const text = await this.page.locator(locator).textContent();
        console.log(`Text from ${locator}: ${text}`);
        return text || '';
    }

    async getAttribute(locator: string, attribute: string): Promise<string | null> {
        return await this.page.locator(locator).getAttribute(attribute);
    }

    async getFirstText(locator: string): Promise<string> {
        const text = await this.page.locator(locator).first().textContent();
        return text?.trim() || "";
    }

    async isVisible(locator: string): Promise<boolean> {
        return await this.page.locator(locator).isVisible();
    }

    async isEnabled(locator: string): Promise<boolean> {
        return await this.page.locator(locator).isEnabled();
    }

    async isChecked(locator: string): Promise<boolean> {
        return await this.page.locator(locator).isChecked();
    }

    async countElements(locator: string): Promise<number> {
        return await this.page.locator(locator).count();
    }

    async screenshot(name?: string): Promise<void> {
        await this.page.screenshot({ path: name || 'screenshot.png' });
    }
}