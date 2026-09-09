import { Then } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

Then('the admin search and verify all generated product', async function(this: BddWorld) {
    for (const product of [...this.products]) {
        await this.productPage.searchProductByName(product);
        await this.productPage.verifySearchProduct(product);
    }
});