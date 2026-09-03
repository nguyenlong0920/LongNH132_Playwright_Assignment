import { Locator, Page, expect } from '@playwright/test';

export class WaitHelper {
    readonly page: Page;

    readonly spinneer: Locator;
    readonly tableSpinnet: Locator;

    constructor(page: Page) {
        this.page = page;

        this.spinneer = page.locator('.loading-spinner');
        this.tableSpinnet = page.locator('#botble-ecommerce-tables-product-table_processing');
    }

    async waitForReady () {
        await expect(this.spinneer).toHaveCount(0, { timeout: 20000 });
    }

    async waitForTableReady () {
        await expect(this.tableSpinnet).toBeHidden({ timeout: 20000 });
    }
}