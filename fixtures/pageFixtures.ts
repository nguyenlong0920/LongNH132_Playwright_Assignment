import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { HeaderPage } from '../components/Header';
import { LeftMenu } from '../components/LeftMenu';

type PageFixtures = {
  	loginPage: LoginPage;
  	dashboardPage: DashboardPage;
    headerPage: HeaderPage;
    leftMenu: LeftMenu;
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

    leftMenu: async ({ page }, use) => {
        await use(new LeftMenu(page));
    },
});

export { expect } from '@playwright/test';