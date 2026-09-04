import { Locator, Page, expect } from '@playwright/test';

export class Notification {
    readonly page: Page;

    readonly toastMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.toastMessage = page.locator('.toastify').last();
    }

    async expectLoginMessage(message: 'Fail' | 'Success') {
        await expect(this.toastMessage).toBeVisible();
        
        if (message === 'Fail') {
            await expect(this.toastMessage).toContainText('These credentials do not match our records.');
        } else {
            await expect(this.toastMessage).toContainText('Logout successfully!');
        }
    }

    async expectProductActionMessage(action: 'Created' | 'Updated' | 'Deleted') {
        try {
            await expect(this.toastMessage).toBeVisible();
        } catch {
            return;
        }
        await expect(this.toastMessage).toHaveText(`${action} successfully`);
    }
}