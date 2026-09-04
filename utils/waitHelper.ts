import { Locator, Page, expect } from '@playwright/test';

export class WaitHelper {
    readonly page: Page;

    readonly spinner: Locator;
    readonly tableSpinner: Locator;

    constructor(page: Page) {
        this.page = page;

        this.spinner = page.locator('.loading-spinner');
        this.tableSpinner = page.locator('#botble-ecommerce-tables-product-table_processing');
    }

    async waitForReady () {
        try {
            await expect(this.spinner).toBeVisible();
        } catch {
            return;
        }
        await expect(this.spinner).toHaveCount(0);
    }

    async waitForTableReady () {
        try {
            await expect(this.tableSpinner).toBeVisible();
        } catch {
            return;
        }
        await expect(this.tableSpinner).toBeHidden();
    }
}