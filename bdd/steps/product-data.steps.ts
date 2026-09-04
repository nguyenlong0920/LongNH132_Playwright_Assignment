import { Then, When } from '@cucumber/cucumber';
import { ProductFactory } from '../../data/factories/ProductFactory';
import { BddWorld } from '../support/world';

When('the admin creates {int} products using the data factory', async function (this: BddWorld, productCount: number) {
    const products = ProductFactory.createMany(productCount);

    for (const product of products) {
        await this.productPage.createProductWithType('physical');
        this.trackProduct(product);
        await this.createProductPage.inputAndSaveProductDetails(product);
        await this.notification.expectProductActionMessage('Created');
        await this.productPage.expectProductInList(product);
    }
});

When('the admin cleans up all generated products', async function (this: BddWorld) {
    for (const product of [...this.products].reverse()) {
        await this.productPage.cleanupProduct(product);
        this.forgetProduct(product);
    }
});

Then('all generated products are removed', async function (this: BddWorld) {
    if (this.products.length !== 0) {
        throw new Error('Expected all generated products to be removed.');
    }
});
