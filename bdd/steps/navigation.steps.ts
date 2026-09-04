import { Then, When } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

When('the admin opens the Products module', async function (this: BddWorld) {
    await this.leftMenu.selectMenuItem('Ecommerce', 'Products');
});

Then('the Products list page is displayed', async function (this: BddWorld) {
    await this.productPage.expectLoaded();
});
