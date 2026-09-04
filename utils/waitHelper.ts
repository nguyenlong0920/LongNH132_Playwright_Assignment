import { Locator, Page, expect } from '@playwright/test';
import { logger } from './logger';

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
        logger.debug('Waiting for page loading spinner to disappear');
        await expect(this.spinner).toHaveCount(0);
        logger.debug('Page loading spinner disappeared');
    }

    async waitForTableReady () {
        try {
            await expect(this.tableSpinner).toBeVisible();
        } catch {
            return;
        }
        logger.debug('Waiting for product table loading spinner to disappear');
        await expect(this.tableSpinner).toBeHidden();
        logger.debug('Product table loading spinner disappeared');
    }
}