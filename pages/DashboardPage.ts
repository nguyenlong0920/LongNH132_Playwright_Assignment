import { Locator, Page, expect } from '@playwright/test';
import { WaitHelper } from '../utils/waitHelper';

export class DashboardPage {
    readonly page: Page;
    readonly waitHelper: WaitHelper;

    readonly dashboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.waitHelper = new WaitHelper(page);
        
        this.dashboardHeading = page.locator('#sidebar-menu-main + div h1');
    }

    async expectLoaded() {
        await this.waitHelper.waitForReady();
        await expect(this.dashboardHeading).toBeVisible();
    }
}