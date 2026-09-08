import { test as setup } from '../fixtures/pageFixtures';
import { LoginApi } from '../api/LoginApi';

const authFile = 'playwright/.auth/admin.json';

setup('authenticate', async ({ page }) => {
    const loginApi = new LoginApi(page.context().request);

    await loginApi.login();

    await page.context().storageState({
        path: authFile,
    });
});