import { test } from '../fixtures/pageFixtures';

test('TC-08 - Navigate to Products module from left menu @regression', async ({
    loginPage,
    dashboardPage,
    productPage,
    leftMenu,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
});