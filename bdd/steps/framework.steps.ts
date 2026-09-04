import { Given, Then, When } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

Given('the Cucumber World provides the page objects', function (this: BddWorld) {
    if (!this.loginPage || !this.dashboardPage || !this.productPage || !this.createProductPage || !this.notification) {
        throw new Error('Expected the Cucumber World to provide all page objects.');
    }
});

When('the admin submits invalid mandatory product details', async function (this: BddWorld) {
    await this.createProductPage.inputAndSaveProductDetails({
        name: '',
        sku: '',
        price: '-1',
    });
});

Then('product validation messages are displayed', async function (this: BddWorld) {
    await this.createProductPage.verifyInvalidProductName();
    await this.createProductPage.verifyInvalidProductPrice();
});
