import { Given, Then, When } from '@cucumber/cucumber';
import { ProductFactory } from '../../data/factories/ProductFactory';
import { bddEnv } from '../support/env';
import { BddWorld } from '../support/world';

const requireProduct = (world: BddWorld) => {
    if (!world.product) {
        throw new Error('No product was created for this scenario.');
    }

    return world.product;
};

Given('the admin is on the Products list page', async function (this: BddWorld) {
    await this.loginPage.open();
    await this.loginPage.expectLoaded();
    await this.loginPage.login(bddEnv.adminUsername, bddEnv.adminPassword);
    await this.dashboardPage.expectLoaded();
    await this.leftMenu.selectMenuItem('Ecommerce', 'Products');
    await this.productPage.expectLoaded();
});

Given('the admin opens the physical product creation form', async function (this: BddWorld) {
    await this.loginPage.open();
    await this.loginPage.expectLoaded();
    await this.loginPage.login(bddEnv.adminUsername, bddEnv.adminPassword);
    await this.dashboardPage.expectLoaded();
    await this.leftMenu.selectMenuItem('Ecommerce', 'Products');
    await this.productPage.expectLoaded();
    await this.productPage.createProductWithType('physical');
    await this.createProductPage.expectLoaded();
});

When('the admin saves a generated product', async function (this: BddWorld) {
    const product = ProductFactory.create();
    this.trackProduct(product);
    await this.createProductPage.inputAndSaveProductDetails(product);
});

When('the admin creates a valid physical product', async function (this: BddWorld) {
    const product = ProductFactory.create();
    this.trackProduct(product);
    await this.createProductPage.inputAndSaveProductDetails(product);
    await this.productPage.expectProductInList(product);
});

When('the admin creates {int} unique products', async function (this: BddWorld, productCount: number) {
    const products = ProductFactory.createMany(productCount);

    for (const product of products) {
        await this.productPage.createProductWithType('physical');
        this.trackProduct(product);
        await this.createProductPage.inputAndSaveProductDetails(product);
        await this.notification.expectProductActionMessage('Created');
        await this.productPage.expectProductInList(product);
    }
});

When('the admin searches for the generated product', async function (this: BddWorld) {
    await this.productPage.searchProductByName(requireProduct(this));
});

When('the admin updates the generated product price to {string}', async function (this: BddWorld, price: string) {
    const product = requireProduct(this);
    await this.productPage.clickEditProductButton(product);
    product.price = price;
    await this.createProductPage.inputAndSaveProductDetails(product);
});

When('the admin deletes the generated product', async function (this: BddWorld) {
    const product = requireProduct(this);
    await this.productPage.clickDeleteProductButton(product);
    await this.productPage.confirmDeleteProduct();
    this.forgetProduct(product);
});

When('the admin deletes the created product', async function (this: BddWorld) {
    const product = requireProduct(this);
    await this.productPage.cleanupProduct(product);
    this.forgetProduct(product);
});

When('the admin cleans up the generated product', async function (this: BddWorld) {
    const product = requireProduct(this);
    await this.productPage.cleanupProduct(product);
    this.forgetProduct(product);
});

Then('a product created notification is displayed', async function (this: BddWorld) {
    await this.notification.expectProductActionMessage('Created');
});

Then('a product updated notification is displayed', async function (this: BddWorld) {
    await this.notification.expectProductActionMessage('Updated');
});

Then('a product deleted notification is displayed', async function (this: BddWorld) {
    await this.notification.expectProductActionMessage('Deleted');
});

Then('the generated product is visible in the list', async function (this: BddWorld) {
    await this.productPage.expectProductInList(requireProduct(this));
});

Then('the search result displays the generated product', async function (this: BddWorld) {
    await this.productPage.verifySearchProduct(requireProduct(this));
});

Then('the product price is displayed as {string}', async function (this: BddWorld, price: string) {
    const product = requireProduct(this);
    product.price = price;
    await this.productPage.verifySearchProduct(product);
});

Then('all generated products are visible and unique', async function (this: BddWorld) {
    for (const product of this.products) {
        await this.productPage.expectProductInList(product);
    }

    const [firstProduct, secondProduct] = this.products;
    if (firstProduct && secondProduct) {
        await this.productPage.expectProductsAreUnique(firstProduct, secondProduct);
    }
});
