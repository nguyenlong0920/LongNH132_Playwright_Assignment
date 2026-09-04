import { When } from '@cucumber/cucumber';
import { ProductFactory } from '../../data/factories/ProductFactory';
import { BddWorld } from '../support/world';

When('parallel worker {string} saves a generated product', async function (this: BddWorld, worker: string) {
    const product = ProductFactory.create();
    this.trackProduct(product);
    await this.productPage.createProductWithType('physical');
    await this.createProductPage.inputAndSaveProductDetails(product);
});

When('a controlled debugging failure is enabled', function () {
    if (process.env.DEBUG_FAILURE === 'true') {
        throw new Error('Controlled BDD failure for debugging artifacts.');
    }
});
