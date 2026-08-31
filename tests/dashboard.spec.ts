import { test } from '../fixtures/pageFixtures';

test('TC-05 - Dashboard page loaded after login @smoke', async ({
    loginPage,
    dashboardPage,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();
});

test('TC-06 - Left menu is displayed @smoke', async ({
    loginPage,
    dashboardPage,
    leftMenu,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await leftMenu.expectLoaded();
    await leftMenu.expectMenuVisible();
});

test('TC-07 - Header/profile area visibility @regression', async ({
    loginPage,
    dashboardPage,
    header,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await header.expectLoaded();
    await header.expectUserMenuVisible();
    await header.openUserMenu();
    await header.expectProfileMenuVisible();
});