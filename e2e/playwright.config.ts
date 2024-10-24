import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    baseURL: 'http://localhost:4200',
    ignoreHTTPSErrors: true,
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    [
      'html',
      { outputFolder: './test-results-report/html-report', open: 'never' },
    ],
  ],
  webServer: {
    command: 'npm run start',
    port: 4200,
    timeout: 120 * 1000,
  },
});
