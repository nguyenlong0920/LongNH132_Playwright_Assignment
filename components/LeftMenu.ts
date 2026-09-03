import { Locator, Page, expect } from '@playwright/test';
import { leftMenu } from '../data/static/sideMenu';

export class LeftMenu {
    readonly page: Page;

    readonly sidebarMenu: Locator;
    readonly sideMenuItems: Locator;
    readonly sideSubMenuItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.sidebarMenu = page.locator('#sidebar-menu');
        this.sideMenuItems = this.sidebarMenu.getByRole('listitem');
        this.sideSubMenuItems = this.sideMenuItems.getByRole('link');
    }

    private getMenuItem(menuName: string, subMenuName?: string): Locator {
        if (subMenuName) {
            return this.sideSubMenuItems.filter({
                has: this.page.getByTitle(subMenuName, { exact: true }),
            });
        }

        return this.sideMenuItems.filter({
            has: this.page.getByTitle(menuName, { exact: true }),
        });
    }

    async expectLoaded() {
        await expect(this.sidebarMenu).toBeVisible();
    }

    async expectMenuVisible() {
        for (const menu of leftMenu) {
            await expect(this.getMenuItem(menu.name)).toBeVisible();
        }
    }

    async selectMenuItem(menuName: string, subMenuName?: string) {
        await this.expectLoaded();
        await this.expectMenuVisible();
        await this.getMenuItem(menuName).click();

        if (subMenuName) {
            await this.getMenuItem(menuName, subMenuName).click();
        }
    }
}