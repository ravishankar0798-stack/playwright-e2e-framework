import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getExcelData } from '../../utils_ts/excelReader';

Given('user is on the Ecommerce login page', async function () {
    await this.poManager.loginPage.goToLoginPage();
});
