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

        trace: 'retain-on-failure',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.ts/,
        },

        {
            name: 'chromium',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/chromium.json',
            },
        },

        {
            name: 'firefox',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Firefox'],
                storageState: 'playwright/.auth/firefox.json',
            },
        },

        {
            name: 'webkit',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Safari'],
                storageState: 'playwright/.auth/webkit.json',
            },
        },
    ],
});