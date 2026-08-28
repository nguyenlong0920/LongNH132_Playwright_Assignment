import { test } from '../fixtures/pageFixtures';
import { users } from '../data/static/users';

test('TC-08 - Navigate to Products module from left menu @regression', async ({
    loginPage,
    dashboardPage,
    productPage,
}) => {
    await loginPage.open();
    
    await loginPage.expectLoaded();

    await loginPage.login(
        users.admin.username,
        users.admin.password
    );

    await dashboardPage.expectLoaded();

    await productPage.openProductList();

    await productPage.expectLoaded();
});