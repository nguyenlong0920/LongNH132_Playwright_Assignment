import { Locator, Page } from '@playwright/test';
import { WaitHelper } from '../utils/waitHelper';
import { expect } from '../utils/config';
import { logger } from '../utils/logger';

export class DashboardPage {
    readonly page: Page;
    readonly waitHelper: WaitHelper;

    readonly dashboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.waitHelper = new WaitHelper(page);
        
        this.dashboardHeading = page.locator('#sidebar-menu-main + div h1');
    }

    async open() {
        logger.info('Opening dashboard page');
        await this.page.goto('/admin');
    }

    async expectLoaded() {
        await this.waitHelper.waitForReady();
        await expect(this.dashboardHeading).toBeVisible();
    }
}