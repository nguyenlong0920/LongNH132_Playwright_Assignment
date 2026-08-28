import { Locator, Page, expect } from '@playwright/test';
import { leftMenu } from '../data/static/sideMenu';

export class LeftMenu {
    readonly page: Page;
    readonly sidebarMenu: Locator;
    readonly sideMenuItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.sidebarMenu = page.locator('#sidebar-menu');
        this.sideMenuItems = this.sidebarMenu.locator(':scope > ul.navbar-nav > li.nav-item');
    }

    private getMenuItem(menuName: string): Locator {
        return this.sideMenuItems.filter({
            has: this.page.getByTitle(menuName, { exact: true }),
        });
    }

    private getSubMenuItem(menuName: string, subMenuName: string): Locator {
        return this.getMenuItem(menuName)
            .locator(':scope > div.dropdown-menu > a.dropdown-item')
            .filter({has: this.page.getByTitle(subMenuName, { exact: true })});
    }

    async expectLoaded() {
        await expect(this.sidebarMenu).toBeVisible();
    }

    async expectMenuVisible() {
        for (const menu of leftMenu) {
            await expect(this.getMenuItem(menu.name)).toBeVisible();
        }
    }

    async selectMenuItem(menuName: string) {
        await this.getMenuItem(menuName)
            .locator(':scope > a, :scope > button')
            .click();
    }

    async selectSubMenuItem(menuName: string, subMenuName: string) {
        await this.selectMenuItem(menuName);
        await this.getSubMenuItem(menuName, subMenuName).click();
    }
}