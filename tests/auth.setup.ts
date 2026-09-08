import { test as setup } from '@playwright/test';
import { LoginApi } from '../api/LoginApi';

setup.describe.configure({ mode: 'serial' });

const authFiles = {
    chromium: 'playwright/.auth/chromium.json',
    firefox: 'playwright/.auth/firefox.json',
    webkit: 'playwright/.auth/webkit.json',
};

setup('authenticate chromium', async ({ request }) => {
    const loginApi = new LoginApi(request);

    await loginApi.login();

    await request.storageState({
        path: authFiles.chromium,
    });
});

setup('authenticate firefox', async ({ request }) => {
    const loginApi = new LoginApi(request);

    await loginApi.login();

    await request.storageState({
        path: authFiles.firefox,
    });
});

setup('authenticate webkit', async ({ request }) => {
    const loginApi = new LoginApi(request);

    await loginApi.login();

    await request.storageState({
        path: authFiles.webkit,
    });
});