import { Then, When } from '@cucumber/cucumber';
import { ProductFactory } from '../../data/factories/ProductFactory';
import { BddWorld } from '../support/world';

When('the admin submits a product without a name', async function (this: BddWorld) {
    const product = ProductFactory.create();
    product.name = '';
    await this.createProductPage.inputAndSaveProductDetails(product);
});

When('the admin submits a product with an invalid price of {string}', async function (this: BddWorld, price: string) {
    const product = ProductFactory.create();
    product.price = price;
    await this.createProductPage.inputAndSaveProductDetails(product);
});

Then('the product name validation message is displayed', async function (this: BddWorld) {
    await this.createProductPage.verifyInvalidProductName();
});

Then('the product price validation message is displayed', async function (this: BddWorld) {
    await this.createProductPage.verifyInvalidProductPrice();
});
