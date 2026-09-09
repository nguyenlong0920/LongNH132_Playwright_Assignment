import { Given, Then, When } from '@cucumber/cucumber';

import { users } from '../../data/static/users';
import { BddWorld } from '../support/world';

Given('the admin open login page', async function (this: BddWorld) {
    await this.loginPage.open();
    await this.loginPage.expectLoaded();
});

When('the admin login with {string}', async function (this: BddWorld, loginType: string) {
    const credentials = {
        'valid credentials': [users.admin.username, users.admin.password],
        'invalid password': [users.admin.username, users.invalidPassword.password],
        'no credentials': ['', ''],
    } as const;

    const [username, password] =
        credentials[loginType as keyof typeof credentials];

    await this.loginPage.login(username, password);
});

Then('the login page displays {string} message', async function (this: BddWorld, toast: string) {
    await this.notification.expectLoginMessage(toast as 'Fail' | 'Success');
});

Then('login required field messages are displayed', async function (this: BddWorld) {
    await this.loginPage.expectRequiredFieldValidation();
});

Then('the login page is displayed', async function (this: BddWorld) {
    await this.loginPage.expectLoaded();
});