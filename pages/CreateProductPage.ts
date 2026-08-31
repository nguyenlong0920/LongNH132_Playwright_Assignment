import { Locator, Page, expect } from '@playwright/test';
import { ProductData } from '../data/factories/ProductFactory';

export class CreateProductPage {
    readonly page: Page;

    readonly productNameInput: Locator;
    readonly productSkuInput: Locator;
    readonly productPriceInput: Locator;
    readonly saveExitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productNameInput = page.locator('#name');
        this.productSkuInput = page.locator('#sku');
        this.productPriceInput = page.locator('#price');
        this.saveExitButton = page.getByRole('button', { name: 'Save & Exit', exact: true });
    }

    async expectCreateProductPageLoaded() {
        await expect(this.page).toHaveURL(/\/admin\/ecommerce\/products\/create$/);
    }

    async inputProductDetails(product: ProductData) {
        await this.productNameInput.fill(product.name);
        await this.productSkuInput.fill(product.sku);
        await this.productPriceInput.fill(product.price);
    }

    async saveAndExit() {
        await this.saveExitButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async createAndVerifyProduct(product: ProductData) {
        await this.expectCreateProductPageLoaded();
        await this.inputProductDetails(product);
        await this.saveAndExit();
    }

    async changeProductPrice(newPrice: string) {
        await this.productPriceInput.fill('');
        await this.productPriceInput.fill(newPrice);
        await this.saveAndExit();
    }
}