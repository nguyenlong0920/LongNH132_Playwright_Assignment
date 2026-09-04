import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { Header } from '../components/Header';
import { LeftMenu } from '../components/LeftMenu';
import { ProductPage } from '../pages/ProductPage';
import { CreateProductPage} from '../pages/CreateProductPage';
import { Notification } from '../components/Notification';
import { logger } from '../utils/logger';

type PageFixtures = {
  	loginPage: LoginPage;
  	dashboardPage: DashboardPage;
    header: Header;
    leftMenu: LeftMenu;
    productPage: ProductPage;
    createProductPage: CreateProductPage;
    notification: Notification;
};

export const test = base.extend<PageFixtures>({
  	loginPage: async ({ page }, use) => {
    	await use(new LoginPage(page));
  	},

  	dashboardPage: async ({ page }, use) => {
    	await use(new DashboardPage(page));
  	},

    header: async ({ page }, use) => {
        await use(new Header(page));
    },

    leftMenu: async ({ page }, use) => {
        await use(new LeftMenu(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    createProductPage: async ({ page }, use) => {
        await use(new CreateProductPage(page));
    },

    notification: async ({ page }, use) => {
        await use(new Notification(page));
    }
});

test.afterEach(async ({}, testInfo) => {
    const context = {
        title: testInfo.title,
        status: testInfo.status,
        expectedStatus: testInfo.expectedStatus,
        retry: testInfo.retry,
    };

    if (testInfo.status !== testInfo.expectedStatus) {
        logger.error('Test finished with an unexpected status', context);
        return;
    }

    logger.debug('Test finished successfully', context);
});

export { expect } from '@playwright/test';