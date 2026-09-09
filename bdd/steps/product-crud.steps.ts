import { Then, When } from '@cucumber/cucumber';
import { ProductFactory } from '../../data/factories/ProductFactory';
import { BddWorld } from '../support/world';

const requireProduct = (world: BddWorld) => {
    if (!world.product) {
        throw new Error('No product was created for this scenario.');
    }

    return world.product;
};

Then('the product list page is displayed', async function (this: BddWorld) {
    await this.productPage.expectLoaded();
});

When('the admin go to product list page', async function (this: BddWorld) {
    await this.productPage.open();
    await this.productPage.expectLoaded();
});

When('the admin choose to create {string} product', 
    async function (this: BddWorld, productType: string) {
        await this.productPage.expectLoaded();
        await this.productPage.createProductWithType(productType as 'physical' | 'digital');
});

When('the admin go to create product page', async function (this: BddWorld) {
    await this.createProductPage.open();
    await this.createProductPage.expectLoaded();
});

When('the admin input and save the generated product', async function (this: BddWorld) {
    const product = ProductFactory.create();

    this.trackProduct(product);

    await this.createProductPage.expectLoaded();
    await this.createProductPage.inputAndSaveProductDetails(product);
});

When('the admin delete the generated product', async function (this: BddWorld) {
    const product = requireProduct(this);

    await this.productPage.clickDeleteProductButton(product);
    await this.productPage.confirmDeleteProduct();

    this.forgetProduct(product);
});

Then('all generated products are visible and unique', async function (this: BddWorld) {
    const [firstProduct, secondProduct] = this.products;

    await this.productPage.expectProductsAreUnique(firstProduct, secondProduct);
});

When('the admin search and verify generated product', async function (this: BddWorld) {
    const product = requireProduct(this);

    await this.productPage.searchProductByName(product);
    await this.productPage.verifySearchProduct(product);
});

When('the admin search for the generated product to edit', async function (this: BddWorld) {
    const product = requireProduct(this);

    await this.productPage.clickEditProductButton(product);
});

When('the admin update the price to {string}', async function (this: BddWorld, newPrice: string) {
    const product = requireProduct(this);

    product.price = newPrice;

    await this.createProductPage.inputAndSaveProductDetails(product);
});

When('the admin create product via api', async function (this: BddWorld) {
    const product = ProductFactory.create();

    await this.productApi.create(product);
    this.trackProduct(product);
});

When('the admin delete product via api', async function (this: BddWorld) {
    const product = requireProduct(this);

    await this.productApi.delete(product);
    this.forgetProduct(product);
});

When('the admin create {int} products via api', async function (this: BddWorld, number: number) {
    const products = ProductFactory.createMany(number);

    for (const product of products) {
        await this.productApi.create(product);
        this.trackProduct(product);
    }
});

When('the admin delete all products via api', async function (this: BddWorld) {
    for (const product of [...this.products]) {
        await this.productApi.delete(product);
        this.forgetProduct(product);
    }
});

Then('a product {string} notification is displayed', async function (this: BddWorld, notification: string) {
    await this.notification.expectProductActionMessage(notification as 'Created' | 'Updated' | 'Deleted');
});