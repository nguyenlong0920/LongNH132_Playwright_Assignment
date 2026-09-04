import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.ENV_FILE || '.env.dev',
});

export default defineConfig({
    testDir: './tests',

    fullyParallel: true,

    retries: 1,

    workers: process.env.CI ? 2 : 4,

    timeout: 120_000,

    expect: {
        timeout: 20_000,
    },

    reporter: [['html', {
        outputFolder: 'playwright-report',
        open: 'never',
    }]],

    use: {
        baseURL: process.env.BASE_URL,

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