import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;

    readonly dashboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.dashboardHeading = page.getByRole('heading', {name: 'Dashboard', level: 1});
    }

    async expectLoaded() {
        await expect(this.dashboardHeading).toBeVisible();
    }
}