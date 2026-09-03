import { test } from '../fixtures/pageFixtures';
import { users } from '../data/static/users';

test('TC-01 - Valid admin login @smoke', async ({
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

test('TC-02 - Invalid password login @negative', async ({ 
    loginPage,
    notification, 
}) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(
        users.admin.username,
        users.invalidPassword.password
    );

    await notification.expectLoginMessage('Fail');
});

test('TC-03 - Required field validation @negative', async ({
    loginPage,
}) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login('', '');
    await loginPage.expectRequiredFieldValidation();
});

test('TC-04 - Logout successfully @smoke', async ({
    loginPage,
    dashboardPage,
    header,
    notification,
}) => {
    await loginPage.loginFullFlow();

    await dashboardPage.expectLoaded();

    await header.expectLoaded();
    await header.expectUserMenuVisible();
    await header.logout();

    await loginPage.expectLoaded();

    await notification.expectLoginMessage('Success');
});