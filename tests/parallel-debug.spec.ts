import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test.describe('TC-19 - Run independent product tests in parallel @parallel', () => {

    test('TC-19.1 - Create independent product A', async ({
        loginPage,
        dashboardPage,
        leftMenu,
        productPage,
        createProductPage,
    }) => {
        const product = ProductFactory.create();

        await loginPage.loginFullFlow();
        await dashboardPage.expectLoaded();

        await leftMenu.selectMenuItem('Ecommerce', 'Products');
        await productPage.expectLoaded();

        await productPage.createProductWithType('physical');
        await createProductPage.inputAndSaveProductDetails(product);

        await productPage.expectProductInList(product);

        await productPage.clickDeleteProductButton(product);
        await productPage.confirmDeleteProduct();
    });

    test('TC-19.2 - Create independent product B', async ({
        loginPage,
        dashboardPage,
        leftMenu,
        productPage,
        createProductPage,
    }) => {
        const product = ProductFactory.create();

        await loginPage.loginFullFlow();
        await dashboardPage.expectLoaded();

        await leftMenu.selectMenuItem('Ecommerce', 'Products');
        await productPage.expectLoaded();

        await productPage.createProductWithType('physical');
        await createProductPage.inputAndSaveProductDetails(product);

        await productPage.expectProductInList(product);

        await productPage.clickDeleteProductButton(product);
        await productPage.confirmDeleteProduct();
    });
});

test('TC-20 - Capture trace, screenshot, and video on failure @debugging', async ({
    loginPage,
    dashboardPage,
}) => {
    await loginPage.loginFullFlow();
    await dashboardPage.expectLoaded();

    if (process.env.DEBUG_FAILURE === 'true') {
        throw new Error('TC-20 controlled failure for debugging');
    }
});