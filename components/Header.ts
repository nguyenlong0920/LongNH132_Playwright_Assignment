import { Locator, Page, expect } from '@playwright/test';

export class HeaderPage {
    readonly page: Page;

    readonly header: Locator;

    readonly userMenu: Locator;
    readonly profileLink: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.header = page.locator('header.navbar');

        this.userMenu = this.header.getByRole('link', {name: 'Open user menu', exact: true});
        this.profileLink = this.header.getByRole('link', {name: 'Profile', exact: true});
        this.logoutLink = this.header.getByRole('link', {name: 'Logout', exact: true});
    }

    async expectLoaded() {
        await expect(this.header).toBeVisible();
    }

    async expectUserMenuVisible() {
        await expect(this.userMenu).toBeVisible();
    }

    async openUserMenu() {
        await this.userMenu.click();
    }

    async expectProfileMenuVisible() {
        await expect(this.profileLink).toBeVisible();
        await expect(this.logoutLink).toBeVisible();
    }

    async logout() {
        await this.openUserMenu();
        await this.expectProfileMenuVisible();
        await this.logoutLink.click();
    }
}