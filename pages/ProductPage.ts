import { Locator, Page, expect } from '@playwright/test';
import { ProductData } from '../data/factories/ProductFactory';

export class ProductPage {
    readonly page: Page;

    readonly createButton: Locator;
    readonly physicalProductOption: Locator;
    readonly digitalProductOption: Locator;

    readonly listProductRow: Locator;
    readonly listProductName: Locator;
    readonly listProductPrice: Locator;
    readonly listProductSKU: Locator;

    readonly searchProductInput: Locator;
    readonly editProductButton: Locator;
    readonly deleteProductButton: Locator;

    readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.createButton = page.getByRole('button', { name: 'Create', exact: true });
        this.physicalProductOption = page.getByRole('button', { name: 'Physical', exact: true });
        this.digitalProductOption = page.getByRole('button', { name: 'Digital', exact: true });

        this.listProductRow = page.locator('tbody').getByRole('row');
        this.listProductName = this.listProductRow.locator('.column-key-2 a');
        this.listProductPrice = this.listProductRow.locator('.column-key-3');
        this.listProductSKU = this.listProductRow.locator('.column-key-6');

        this.searchProductInput = page.locator('.input-sm');
        this.editProductButton = page.locator('.table-actions .btn-primary');
        this.deleteProductButton = page.locator('.table-actions .btn-danger');

        this.confirmDeleteButton = page.locator('button.confirm-trigger-single-action-button');
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/admin\/ecommerce\/products$/);
    }

    async createProductWithType(productType: 'physical' | 'digital') {
        await expect(this.createButton).toBeVisible();
        await this.createButton.click();
        await expect(this.physicalProductOption).toBeVisible();
        await expect(this.digitalProductOption).toBeVisible();

        productType === 'physical' 
        ? await this.physicalProductOption.click() 
        : await this.digitalProductOption.click();

        await this.page.waitForLoadState('networkidle');
    }

    async expectProductInList(product: ProductData) {
        const productRow = this.listProductRow
            .filter({hasText: product.name})
            .filter({hasText: product.sku})
            .filter({hasText: product.price});

        await expect(productRow).toHaveCount(1);
        await expect(productRow).toBeVisible();
    }

    async expectProductsAreUnique(firstProduct: ProductData, secondProduct: ProductData,) {
        await this.expectProductInList(firstProduct);
        await this.expectProductInList(secondProduct);

        expect(firstProduct.name).not.toBe(secondProduct.name);
        expect(firstProduct.sku).not.toBe(secondProduct.sku);
    }

    async searchProductByName(productName: string) {
        await this.searchProductInput.fill(productName);
        await this.searchProductInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
        await expect(this.editProductButton).toHaveCount(1);
    }

    async verifyProductPrice(productPrice: string){
        const price = await this.listProductPrice.textContent();
        expect(price?.replace(/^Rs/, '').trim()).toBe(productPrice);
    }

    async verifySearchProduct(product: ProductData) {
        await expect(this.listProductName).toHaveText(product.name);
        await expect(this.listProductSKU).toHaveText(product.sku);
        await this.verifyProductPrice(product.price);
    }

    async clickEditProductButton(product: ProductData) {
        await this.searchProductByName(product.name);
        await this.editProductButton.click()
        await this.page.waitForLoadState('networkidle');
    }

    async clickDeleteProductButton(product: ProductData) {
        await this.searchProductByName(product.name);
        await this.deleteProductButton.click();
    }

    async confirmDeleteProduct() {
        await this.confirmDeleteButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.listProductRow).toHaveText('No record');
    }
}