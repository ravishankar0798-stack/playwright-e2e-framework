import { test, expect } from '@playwright/test';

test('@Web Calendar validation', async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("[class*='calendar-button react-date-picker__button']").click();
    await page.locator("button[class*='react-calendar__navigation__label']").click();
    await page.locator("button[class*='react-calendar__navigation__label']").click();
    await page.getByText(year).click();
    await page.locator("[class*='react-calendar__year-view__months__month']").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();
    const inputs = page.locator(".react-date-picker__inputGroup__input");
    // for (let i = 0; i < expectedList.length; i++) {
    //     const value = await inputs.nth(i).inputValue();
    //     expect(value).toEqual(expectedList[i]);
    // }
    const actualList = await Promise.all([
        inputs.nth(0).inputValue(),
        inputs.nth(1).inputValue(),
        inputs.nth(2).inputValue()
    ]);
    expect(actualList).toEqual(expectedList);
    await page.close();
});