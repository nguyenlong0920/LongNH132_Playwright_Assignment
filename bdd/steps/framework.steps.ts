import { Then, When } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

When('the admin verifies the header is loaded', async function (this: BddWorld) {
    await this.header.expectLoaded();
});

When('the admin verifies the left navigation menu is loaded',
    async function (this: BddWorld) {
        await this.leftMenu.expectLoaded();
    },
);

When('the admin submits invalid mandatory product details',
    async function (this: BddWorld) {
        await this.createProductPage.inputAndSaveProductDetails({
            name: '',
            sku: '',
            price: '-1',
        });
    },
);

Then('product validation messages are displayed',
    async function (this: BddWorld) {
        await this.createProductPage.verifyInvalidProductName();
        await this.createProductPage.verifyInvalidProductPrice();
    },
);