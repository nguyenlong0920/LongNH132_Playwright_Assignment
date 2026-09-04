import { Locator, Page, expect } from '@playwright/test';
import { ProductData } from '../data/factories/ProductFactory';
import { logger } from '../utils/logger';
import { WaitHelper } from '../utils/waitHelper';

export class ProductPage {
    readonly page: Page;
    readonly waitHelper: WaitHelper;

    readonly createButton: Locator;
    readonly physicalProductOption: Locator;
    readonly digitalProductOption: Locator;

    readonly listProduct: Locator;
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
        this.waitHelper = new WaitHelper(page);

        this.createButton = page.getByRole('button', { name: 'Create', exact: true });
        this.physicalProductOption = page.getByRole('button', { name: 'Physical', exact: true });
        this.digitalProductOption = page.getByRole('button', { name: 'Digital', exact: true });

        this.listProduct = page.locator('tbody')
        this.listProductRow = this.listProduct.getByRole('row');
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

    async waitForTableData() {
        await expect(this.listProduct).toBeVisible();
    }

    async createProductWithType(productType: 'physical' | 'digital') {
        logger.info('Opening product creation form', { productType });
        await this.waitForTableData();
        await expect(this.createButton).toBeVisible();
        await this.createButton.click();
        await expect(this.physicalProductOption).toBeVisible();
        await expect(this.digitalProductOption).toBeVisible();

        productType === 'physical' 
        ? await this.physicalProductOption.click() 
        : await this.digitalProductOption.click();
    }

    async expectProductInList(product: ProductData) {
        logger.debug('Verifying product is visible in the list', {
            name: product.name,
            sku: product.sku,
            price: product.price,
        });
        await this.waitForTableData();

        const productRow = this.listProductRow
            .filter({hasText: product.name})
            .filter({hasText: product.sku})
            .filter({hasText: product.price});

        await expect(productRow).toHaveCount(1);
        await expect(productRow).toBeVisible();
        logger.debug('Product is visible in the list', { name: product.name, sku: product.sku });
    }

    async expectProductsAreUnique(firstProduct: ProductData, secondProduct: ProductData,) {
        await this.expectProductInList(firstProduct);
        await this.expectProductInList(secondProduct);

        expect(firstProduct.name).not.toBe(secondProduct.name);
        expect(firstProduct.sku).not.toBe(secondProduct.sku);
    }

    async searchProductByName(product: ProductData) {
        logger.debug('Searching for product', {
            name: product.name,
            sku: product.sku,
        });

        await this.searchProductInput.fill(product.name);
        await this.searchProductInput.press('Enter');
        await this.waitHelper.waitForTableReady();
        await this.waitForTableData();
        await expect(this.editProductButton).toHaveCount(1);
    }

    async verifyProductPrice(product: ProductData){
        const price = await this.listProductPrice.textContent();
        expect(price?.replace(/[^0-9.]/g, '').trim()).toBe(product.price);
    }

    async verifySearchProduct(product: ProductData) {
        logger.debug('Verifying product search result', { name: product.name, sku: product.sku });
        await expect(this.listProductName).toHaveText(product.name);
        await expect(this.listProductSKU).toHaveText(product.sku);
        await this.verifyProductPrice(product);
    }

    async clickEditProductButton(product: ProductData) {
        logger.info('Opening product for editing', {
            name: product.name,
            sku: product.sku,
        });

        await this.searchProductByName(product);
        await this.editProductButton.click()
    }

    async clickDeleteProductButton(product: ProductData) {
        logger.info('Deleting product', {
            name: product.name,
            sku: product.sku,
        });

        await this.searchProductByName(product);
        await this.deleteProductButton.click();
    }

    async confirmDeleteProduct() {
        await this.confirmDeleteButton.click();
        await expect(this.listProductRow).toHaveText('No record');
        logger.info('Product deletion confirmed');
    }

    async cleanupProduct(product: ProductData) {
        logger.info('Starting product cleanup', { name: product.name, sku: product.sku });
        await this.clickDeleteProductButton(product);
        await this.confirmDeleteProduct();
        logger.info('Product cleanup completed', { name: product.name, sku: product.sku });
    }
}