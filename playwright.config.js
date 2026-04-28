import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  retries: 2,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  use:
  {
    browserName: 'chromium',
    headless: true,
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
