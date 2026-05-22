import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({

  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000
  },

  retries: process.env.CI ? 2 : 0,  

  workers: process.env.CI ? 2 : undefined,

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL
  },

  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright']
  ]

});