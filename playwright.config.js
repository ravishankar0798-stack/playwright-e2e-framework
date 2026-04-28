import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  use:
  {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    viewport: null,
    launchOptions:
    {
      args: ['--start-maximized']
    }
  },
});
