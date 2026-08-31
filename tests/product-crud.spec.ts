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

    const product = ProductFactory.create();

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    await createProductPage.expectCreateProductPageLoaded();
    await createProductPage.inputProductDetails(product);
    await createProductPage.saveAndExit();

    await notification.expectCreateProductMessage('Created successfully');

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

    const products = ProductFactory.createMany(2);

    await productPage.expectLoaded();

    // Create product 1
    await productPage.createProductWithType('physical');

    await createProductPage.createAndVerifyProduct(products[0]);

    await notification.expectCreateProductMessage('Created successfully');

    await productPage.expectProductInList(products[0]);

    // Create product 2
    await productPage.createProductWithType('physical');

    await createProductPage.createAndVerifyProduct(products[1]);

    await notification.expectCreateProductMessage('Created successfully');

    await productPage.expectProductInList(products[1]);

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

    const product = ProductFactory.create();

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    await createProductPage.createAndVerifyProduct(product);

    await notification.expectCreateProductMessage('Created successfully');

    await productPage.expectProductInList(product);
    await productPage.searchProductByName(product.name);
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

    const product = ProductFactory.create();

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    await createProductPage.createAndVerifyProduct(product);

    await notification.expectCreateProductMessage('Created successfully');

    await productPage.expectProductInList(product);
    await productPage.clickEditProductButton(product);

    await createProductPage.changeProductPrice('200');

    await productPage.verifyProductPrice('200');
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

    const product = ProductFactory.create();

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    await createProductPage.createAndVerifyProduct(product);

    await notification.expectCreateProductMessage('Created successfully');

    await productPage.expectProductInList(product);
    await productPage.clickDeleteProductButton(product);
    await productPage.confirmDeleteProduct();
});