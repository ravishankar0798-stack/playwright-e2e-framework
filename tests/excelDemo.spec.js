import { test, expect } from '@playwright/test';
import ExcelJS from 'exceljs';
import fs from 'fs';

test('read Excel file', async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('test-data/exceldownloadTest.xlsx');
    const sheet = workbook.getWorksheet('Sheet1');
    sheet.eachRow(row => console.log(row.values.slice(1)));
    sheet.eachRow((row, rowNumber) => {
        if (row.getCell(2).value === 'Papaya') {
            console.log('Papaya found at row:', rowNumber);
        }
    });
});


test('write Excel file', async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('test-data/exceldownloadTest.xlsx');
    const sheet = workbook.getWorksheet('Sheet1');
    const newValue = 'Sapota ' + Date.now().toString(36).slice(-3) + Math.random().toString(36).substring(2, 5);
    sheet.getRow(3).getCell(2).value = newValue;
    await workbook.xlsx.writeFile('test-data/exceldownloadTest.xlsx');
    console.log('Excel updated:', newValue);
});


test('excel upload/download validation', async ({ page }) => {
    const filePath = 'test-data/downloaded.xlsx';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    // download
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await (await downloadPromise).saveAs(filePath);
    // update excel
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(filePath);
    const newValue = 'Sapota ' + Date.now().toString(36).slice(-3) + Math.random().toString(36).substring(2, 5);
    wb.getWorksheet('Sheet1').getRow(3).getCell(2).value = newValue;
    console.log(newValue);
    await wb.xlsx.writeFile(filePath);
    // upload + validate
    await page.locator('#fileinput').setInputFiles(filePath);
    await expect(page.locator('#row-1 [data-column-id="2"]')).toHaveText(newValue);
});