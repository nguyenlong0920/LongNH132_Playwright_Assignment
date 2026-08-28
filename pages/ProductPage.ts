import { Page, expect } from '@playwright/test';
import { LeftMenu } from '../components/LeftMenu';

export class ProductPage {
    readonly page: Page;
    readonly leftMenu: LeftMenu;

    constructor(page: Page) {
        this.page = page;
        this.leftMenu = new LeftMenu(page);
    }

    async openProductList() {
        await this.leftMenu.expectLoaded();
        await this.leftMenu.selectSubMenuItem('Ecommerce', 'Products');
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/admin\/ecommerce\/products$/);
    }
}