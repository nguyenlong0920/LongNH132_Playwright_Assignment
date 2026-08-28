import { Locator, Page, expect } from '@playwright/test';

export class HeaderPage {
    readonly page: Page;

    readonly userMenu: Locator;
    readonly profileLink: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.userMenu = page.getByRole('link', { name: 'Open user menu' });
        this.profileLink = page.getByRole('link', { name: 'Profile' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }

    async openUserMenu() {
        await this.userMenu.click();
    }

    async expectUserMenuVisible() {
        await expect(this.profileLink).toBeVisible();
        await expect(this.logoutLink).toBeVisible();
    }

    async logout() {
        await this.openUserMenu();
        await this.expectUserMenuVisible();
        await this.logoutLink.click();
    }
}