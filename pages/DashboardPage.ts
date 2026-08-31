import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;

    readonly dashboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.dashboardHeading = page.locator('#sidebar-menu-main + div h1');
    }

    async expectLoaded() {
        await expect(this.dashboardHeading).toBeVisible();
        await this.page.waitForLoadState('networkidle');
    }
}