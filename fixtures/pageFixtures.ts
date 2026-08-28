import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { HeaderPage } from '../components/Header';

type PageFixtures = {
  	loginPage: LoginPage;
  	dashboardPage: DashboardPage;
    headerPage: HeaderPage;
};

export const test = base.extend<PageFixtures>({
  	loginPage: async ({ page }, use) => {
    	await use(new LoginPage(page));
  	},

  	dashboardPage: async ({ page }, use) => {
    	await use(new DashboardPage(page));
  	},

    headerPage: async ({ page }, use) => {
        await use(new HeaderPage(page));
    },
});

export { expect } from '@playwright/test';