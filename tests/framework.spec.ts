import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-17 - Use shared Notification component to verify messages @framework', async ({
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

    let product = {
        name: '', // Leave mandatory fields blank
        sku: '',
        price: '-1', // Invalid price
    };

    await createProductPage.inputAndSaveProductDetails(product);
    await createProductPage.verifyInvalidProductName();
    await createProductPage.verifyInvalidProductPrice();

    product = ProductFactory.create();

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Created');

    await productPage.expectProductInList(product);
    await productPage.clickEditProductButton(product);

    // Update price
    product.price = '200.00';

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Updated');

    await productPage.verifySearchProduct(product);

    await productPage.cleanupProduct(product);

    await notification.expectProductActionMessage('Deleted');
});

test('TC-18 - Use fixture-injected page objects in tests @framework', async ({
    loginPage,
    dashboardPage,
    header,
    productPage,
    createProductPage,
    leftMenu,
    notification,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await header.expectLoaded();

    await leftMenu.expectLoaded();
    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    const product = ProductFactory.create();

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Created');

    await productPage.expectProductInList(product);
    await productPage.cleanupProduct(product);
    
    await notification.expectProductActionMessage('Deleted');
}); 