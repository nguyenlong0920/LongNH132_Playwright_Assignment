import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-09 - Create product with mandatory fields @crud @regression', async ({
    productApi,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
    notification,
}) => {
    const product = ProductFactory.create();

    await dashboardPage.open();
    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    await createProductPage.expectLoaded();
    await createProductPage.inputProductDetails(product);
    await createProductPage.saveAndExit();

    await notification.expectProductActionMessage('Created');

    await productApi.delete(product);
});

test('TC-10 - Create product with dynamic product name and SKU @crud @data', async ({
    productApi,
    productPage,
}) => {
    const products = ProductFactory.createMany(2);

    for (const product of products) {
        await productApi.create(product);
    }

    // Verify that the two products are unique
    await productPage.open();
    await productPage.expectLoaded();

    await productPage.expectProductsAreUnique(products[0], products[1]);

    for (const product of products) {
        await productApi.delete(product);
    }   
});

test('TC-11 - Search product by name @crud @regression', async ({
    productApi,
    productPage,
}) => {
    const product = ProductFactory.create();

    await productApi.create(product);

    await productPage.open();
    await productPage.expectLoaded();

    await productPage.searchProductByName(product);
    await productPage.verifySearchProduct(product);

    await productApi.delete(product);
});

test('TC-12 - Update product price @crud @regression', async ({
    productApi,
    productPage,
    createProductPage,
    notification,
}) => {
    const product = ProductFactory.create();

    await productApi.create(product);

    await productPage.open();
    await productPage.expectLoaded();

    // Update price
    product.price = '200.00';
    
    await productPage.clickEditProductButton(product);

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Updated');

    await productPage.verifySearchProduct(product);

    await productApi.delete(product);
});

test('TC-13 - Delete created product @crud @cleanup', async ({
    productApi,
    productPage,
    notification,
}) => {
    const product = ProductFactory.create();

    await productApi.create(product);

    await productPage.open();
    await productPage.expectLoaded();

    await productPage.clickDeleteProductButton(product);
    await productPage.confirmDeleteProduct();

    await notification.expectProductActionMessage('Deleted');
});