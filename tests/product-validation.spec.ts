import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-14 - Validate required fields on create product form @negative', async ({
    loginPage,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    // Leave mandatory fields blank
    await createProductPage.saveAndExit();
    await createProductPage.verifyInvalidProductName();
});

test('TC-15 - Validate invalid price input @negative', async ({
    loginPage,
    dashboardPage,
    productPage,
    createProductPage,
    leftMenu,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    const product = ProductFactory.create();
    // Invalid price
    product.price = '-1';

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    await createProductPage.createAndVerifyProduct(product);
    await createProductPage.verifyInvalidProductPrice();
});