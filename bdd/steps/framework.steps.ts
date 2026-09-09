import { Then, When } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

When('the admin submits invalid product details', async function (this: BddWorld) {
    await this.createProductPage.inputAndSaveProductDetails({name: '', sku: '', price: '-1'});
});