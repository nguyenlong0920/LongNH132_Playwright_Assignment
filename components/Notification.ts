import { Locator, Page, expect } from '@playwright/test';

export class Notification {
    readonly page: Page;

    readonly toastMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.toastMessage = page.locator('.toastify');
    }

    async expectLoginMessage(message: 'fail' | 'success') {
        const failMessage = 'These credentials do not match our records.';
        const successMessage = 'Logout successfully!';

        await expect(this.toastMessage).toBeVisible();
        if (message === 'fail') {
            await expect(this.toastMessage).toContainText(failMessage);
        } else {
            await expect(this.toastMessage).toContainText(successMessage);
        }
    }

    async expectCreateProductMessage(message: string) {
        const expectedMessage = 'Created successfully';

        await expect(this.toastMessage).toContainText(expectedMessage);
    }
}