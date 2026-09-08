import { test } from '../fixtures/pageFixtures';

test('TC-08 - Navigate to Products module from left menu @regression', async ({
    dashboardPage,
    productPage,
    leftMenu,
}) => {
    await dashboardPage.open();
    await dashboardPage.expectLoaded();

    await leftMenu.selectMenuItem('Ecommerce', 'Products');

    await productPage.expectLoaded();
});