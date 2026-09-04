import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-16 - Create multiple products using data factory @data @regression', async ({
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

    const products = ProductFactory.createMany(3);

    for (const product of products) {
        await productPage.createProductWithType('physical');

        await createProductPage.inputAndSaveProductDetails(product);

        await notification.expectProductActionMessage('Created');

        await productPage.expectProductInList(product);
    }

    for (const product of products) {
        await productPage.cleanupProduct(product);

        await notification.expectProductActionMessage('Deleted');
    }
});