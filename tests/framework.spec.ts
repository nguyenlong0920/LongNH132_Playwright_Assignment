import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-17 - Use shared Notification component to verify messages @framework', async ({
    productPage,
    createProductPage,
    notification,
}) => {
    const product = ProductFactory.create();

    const invalidProduct = {
        name: '', // Leave mandatory fields blank
        sku: '',
        price: '-1', // Invalid price
    };
    
    await createProductPage.open();
    await createProductPage.expectLoaded();

    await createProductPage.inputAndSaveProductDetails(invalidProduct);
    await createProductPage.verifyInvalidProductName();
    await createProductPage.verifyInvalidProductPrice();

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
    dashboardPage,
    productPage,
    createProductPage,
    header,
    leftMenu,
    notification,
}) => {
    const product = ProductFactory.create();

    await dashboardPage.open();
    await dashboardPage.expectLoaded();

    await header.expectLoaded();

    await leftMenu.expectLoaded();
    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
    await productPage.createProductWithType('physical');

    await createProductPage.inputAndSaveProductDetails(product);

    await notification.expectProductActionMessage('Created');

    await productPage.expectProductInList(product);
    await productPage.cleanupProduct(product);
    
    await notification.expectProductActionMessage('Deleted');
}); 