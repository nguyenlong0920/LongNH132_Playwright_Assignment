import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env';

export default defineConfig({
    testDir: './tests',

    fullyParallel: true,

    retries: 1,

    workers: process.env.CI ? 2 : 4,

    timeout: 120_000,

    reporter: [['html', {
        outputFolder: 'playwright-report',
        open: 'never',
    }]],

    use: {
        baseURL: env.baseUrl,

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});