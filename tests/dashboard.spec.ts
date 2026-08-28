import { test } from '../fixtures/pageFixtures';
import { users } from '../data/static/users';

test('TC-05 - Dashboard page loaded after login @smoke', async ({
    loginPage,
    dashboardPage,
}) => {
    await loginPage.open();

    await loginPage.expectLoaded();

    await loginPage.login(
        users.admin.username,
        users.admin.password
    );

    await dashboardPage.expectLoaded();
});

test('TC-06 - Left menu is displayed @smoke', async ({
    loginPage,
    dashboardPage,
    leftMenu,
}) => {
    await loginPage.open();

    await loginPage.expectLoaded();

    await loginPage.login(
        users.admin.username,
        users.admin.password
    );

    await dashboardPage.expectLoaded();

    await leftMenu.expectLoaded();

    await leftMenu.expectMenuVisible();
});

test('TC-07 - Header/profile area visibility @regression', async ({
    loginPage,
    headerPage,
}) => {
    await loginPage.open();
    
    await loginPage.expectLoaded();

    await loginPage.login(
        users.admin.username,
        users.admin.password
    );

    await headerPage.expectLoaded();

    await headerPage.expectUserMenuVisible();

    await headerPage.openUserMenu();
    
    await headerPage.expectProfileMenuVisible();
});