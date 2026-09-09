import { Then, When } from '@cucumber/cucumber';
import { ProductFactory } from '../../data/factories/ProductFactory';
import { BddWorld } from '../support/world';

When('the admin submits a product with {string}', async function(this: BddWorld, input:string) {
    const invalidInput = input as 'empty name' | 'invalid price';
    const product = ProductFactory.create();

    (invalidInput === 'empty name' ? product.name = '' : product.price = '-1');

    await this.createProductPage.inputAndSaveProductDetails(product);
});

Then('the product {string} validation message is displayed', async function(this: BddWorld, input: string) {
    const validation = input as 'name' | 'price';

    await (validation === 'name'
        ? this.createProductPage.verifyInvalidProductName()
        : this.createProductPage.verifyInvalidProductPrice()
    );
});