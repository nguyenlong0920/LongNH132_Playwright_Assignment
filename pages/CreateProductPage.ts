import { Locator, Page } from '@playwright/test';
import { ProductData } from '../data/factories/ProductFactory';
import { logger } from '../utils/logger';
import { expect } from '../utils/config';

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
        this.saveExitButton = page.locator('.card-body button[value="save"]');

        this.productNameError = page.locator('#name-error');
        this.productPriceError = page.locator('#price-error');
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/admin\/ecommerce\/products\/create$/);
    }

    private async cleanInputField(input: Locator) {
        await input.click();
        await input.press('ControlOrMeta+A');
        await input.press('Backspace');
    }

    async inputProductDetails(product: ProductData) {
        logger.debug('Filling product form', {
            name: product.name,
            sku: product.sku,
            price: product.price,
        });

        await this.productNameInput.fill('test');
        await this.cleanInputField(this.productNameInput);
        await this.productNameInput.fill(product.name);

        await this.productLinkInput.fill(product.name);
        await this.productSkuInput.fill(product.sku);
        
        await this.cleanInputField(this.productPriceInput);
        await this.productPriceInput.fill(product.price);
    }

    async saveAndExit() {
        logger.info('Submitting product form');
        await this.saveExitButton.click();
    }

    async inputAndSaveProductDetails(product: ProductData) {
        await this.inputProductDetails(product);
        await this.saveAndExit();
    }

    async verifyInvalidProductName() {
        await expect(this.productNameError).toBeVisible();
        await expect(this.productNameError).toHaveText("Please enter product's name");
    }

    async verifyInvalidProductPrice() {
        await expect(this.productPriceError).toBeVisible();
        await expect(this.productPriceError).toHaveText("The price must be at least 0.");
    }
}