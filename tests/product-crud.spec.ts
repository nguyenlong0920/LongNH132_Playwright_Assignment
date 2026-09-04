import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-09 - Create product with mandatory fields @crud @regression', async ({
    loginPage,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
    notification,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    const product = ProductFactory.create();

    await createProductPage.expectLoaded();
    await createProductPage.inputProductDetails(product);
    await createProductPage.saveAndExit();

    await notification.expectProductActionMessage('Created');

    await productPage.expectProductInList(product);
});

test('TC-10 - Create product with dynamic product name and SKU @crud @data', async ({
    loginPage,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
    notification,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();

    const products = ProductFactory.createMany(2);

    for (const product of products) {
        await productPage.createProductWithType('physical');

        await createProductPage.inputAndSaveProductDetails(product);

        await notification.expectProductActionMessage('Created');

        await productPage.expectProductInList(product);
    }

    // Verify that the two products are unique
    await productPage.expectProductsAreUnique(products[0], products[1]);
});

test('TC-11 - Search product by name @crud @regression', async ({
    loginPage,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
    notification,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    const product = ProductFactory.create();

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Created');

    await productPage.expectProductInList(product);
    await productPage.searchProductByName(product);
    await productPage.verifySearchProduct(product);
});

test('TC-12 - Update product price @crud @regression', async ({
    loginPage,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
    notification,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    const product = ProductFactory.create();

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Created');

    await productPage.expectProductInList(product);
    await productPage.clickEditProductButton(product);

    // Update price
    product.price = '200.00';

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Updated');

    await productPage.verifySearchProduct(product);
});

test('TC-13 - Delete created product @crud @cleanup', async ({
    loginPage,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
    notification,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    const product = ProductFactory.create();

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Created');

    await productPage.expectProductInList(product);
    await productPage.clickDeleteProductButton(product);
    await productPage.confirmDeleteProduct();

    await notification.expectProductActionMessage('Deleted');
});