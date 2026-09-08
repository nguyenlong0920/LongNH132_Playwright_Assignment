import {
    APIRequestContext,
    expect,
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

    logger.info(`Login API completed for ${browserName}`);

    // Inspect cookies without exposing cookie values.
    const state = await request.storageState();

    console.log(`\n========== AUTH DEBUG: ${browserName} ==========`);

    console.log('Cookies:');

    for (const cookie of state.cookies) {
        console.log({
            name: cookie.name,
            domain: cookie.domain,
            path: cookie.path,
            expires: cookie.expires,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
        });
    }

    console.log(`Total cookies: ${state.cookies.length}`);

    // Do not follow redirects.
    // This tells us whether the API session can actually access /admin.
    const dashboardResponse = await request.get('/admin', {
        maxRedirects: 0,
    });

    const location = dashboardResponse.headers()['location'];

    console.log('Dashboard auth check:', {
        status: dashboardResponse.status(),
        statusText: dashboardResponse.statusText(),
        url: dashboardResponse.url(),
        location,
    });

    const responseBody = await dashboardResponse.text();

    console.log('Dashboard response preview:');
    console.log(responseBody.slice(0, 300));

    console.log('===============================================\n');

    expect(
        dashboardResponse.status(),
        `${browserName}: /admin should return 200 after API login`,
    ).toBe(200);

    expect(
        location,
        `${browserName}: /admin should not redirect to /admin/login`,
    ).not.toContain('/admin/login');

    await request.storageState({
        path: authFile,
    });

    logger.info(`Authentication state saved for ${browserName}`, {
        authFile,
        cookieCount: state.cookies.length,
    });
}

setup('authenticate chromium', async ({ request }) => {
    await authenticate(
        request,
        authFiles.chromium,
        'chromium',
    );
});

setup('authenticate firefox', async ({ request }) => {
    await authenticate(
        request,
        authFiles.firefox,
        'firefox',
    );
});

setup('authenticate webkit', async ({ request }) => {
    await authenticate(
        request,
        authFiles.webkit,
        'webkit',
    );
});