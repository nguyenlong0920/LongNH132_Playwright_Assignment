import { Locator, Page, expect } from '@playwright/test';
import { ProductData } from '../data/factories/ProductFactory';

export class CreateProductPage {
    readonly page: Page;

    readonly productNameInput: Locator;
    readonly productLinkInput: Locator;
    readonly productSkuInput: Locator;
    readonly productPriceInput: Locator;
    readonly saveExitButton: Locator;

    readonly productNameError: Locator;
    readonly productPriceError: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productNameInput = page.locator('#name');
        this.productLinkInput = page.locator('#slug');
        this.productSkuInput = page.locator('#sku');
        this.productPriceInput = page.locator('#price');
        this.saveExitButton = page.getByRole('button', { name: 'Save & Exit', exact: true });

        this.productNameError = page.locator('#name-error');
        this.productPriceError = page.locator('#price-error');
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/admin\/ecommerce\/products\/create$/);
    }

    async inputProductDetails(product: ProductData) {
        await this.productNameInput.fill(product.name);
        await this.productLinkInput.fill(product.name);
        await this.productSkuInput.fill(product.sku);
        await this.productPriceInput.fill(product.price);
    }

    async saveAndExit() {
        await this.saveExitButton.click();
    }

    async createAndVerifyProduct(product: ProductData) {
        await this.expectLoaded();
        await this.inputProductDetails(product);
        await this.saveAndExit();
    }

    async changeProductPrice(product: ProductData) {
        await this.productPriceInput.fill('');
        await this.productPriceInput.fill(product.price);
        await this.saveAndExit();
    }

    async verifyInvalidProductName() {
        await expect(this.productNameError).toBeVisible();
    }

    async verifyInvalidProductPrice() {
        await expect(this.productPriceError).toBeVisible();
    }
}