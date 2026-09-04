import { Locator, Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class Notification {
    readonly page: Page;

    readonly toastMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.toastMessage = page.locator('.toastify').last();
    }

    async expectLoginMessage(message: 'Fail' | 'Success') {
        logger.debug('Verifying login notification', { message });
        await expect(this.toastMessage).toBeVisible();
        
        if (message === 'Fail') {
            await expect(this.toastMessage).toContainText('These credentials do not match our records.');
        } else {
            await expect(this.toastMessage).toContainText('Logout successfully!');
        }
        logger.info('Login notification verified', { message });
    }

    async expectProductActionMessage(action: 'Created' | 'Updated' | 'Deleted') {
        try {
            await expect(this.toastMessage).toBeVisible();
        } catch {
            logger.error(`Expected toast message for action '${action}' not found.`);
            return;
        }
        await expect(this.toastMessage).toHaveText(`${action} successfully`);
        logger.info('Product action notification verified', { action });
    }
}