import {
    APIRequestContext,
    test as setup,
} from '@playwright/test';
import { LoginApi } from '../api/LoginApi';
import { logger } from '../utils/logger';

setup.describe.configure({ mode: 'serial' });

const authFiles = {
    chromium: 'playwright/.auth/chromium.json',
    firefox: 'playwright/.auth/firefox.json',
    webkit: 'playwright/.auth/webkit.json',
};

async function authenticate(
    request: APIRequestContext,
    authFile: string,
    browserName: string,
) {
    logger.info(`Starting authentication for ${browserName}`);

    const loginApi = new LoginApi(request);

    await loginApi.login();

    await request.storageState({
        path: authFile,
    });

    logger.info(`Authentication state saved for ${browserName}`, {
        authFile,
    });
}

setup('authenticate chromium', async ({ request }) => {
    await authenticate(request, authFiles.chromium, 'chromium');
});

setup('authenticate firefox', async ({ request }) => {
    await authenticate(request, authFiles.firefox, 'firefox');
});

setup('authenticate webkit', async ({ request }) => {
    await authenticate(request, authFiles.webkit, 'webkit');
});