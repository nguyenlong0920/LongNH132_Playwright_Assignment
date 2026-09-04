import { Given, Then, When } from '@cucumber/cucumber';
import { users } from '../../data/static/users';
import { bddEnv } from '../support/env';
import { BddWorld } from '../support/world';

Given('the admin login page is open', async function (this: BddWorld) {
    await this.loginPage.open();
    await this.loginPage.expectLoaded();
});

Given('the admin is logged in', async function (this: BddWorld) {
    await this.loginPage.open();
    await this.loginPage.expectLoaded();
    await this.loginPage.login(bddEnv.adminUsername, bddEnv.adminPassword);
    await this.dashboardPage.expectLoaded();
});

When('the admin signs in with valid credentials', async function (this: BddWorld) {
    await this.loginPage.login(bddEnv.adminUsername, bddEnv.adminPassword);
});

When('the admin signs in with an invalid password', async function (this: BddWorld) {
    await this.loginPage.login(bddEnv.adminUsername, users.invalidPassword.password);
});

When('the admin submits the login form without credentials', async function (this: BddWorld) {
    await this.loginPage.login('', '');
});

When('the admin logs out', async function (this: BddWorld) {
    await this.header.logout();
});

Then('the admin login page is displayed', async function (this: BddWorld) {
    await this.loginPage.expectLoaded();
});

Then('an invalid credentials notification is displayed', async function (this: BddWorld) {
    await this.notification.expectLoginMessage('Fail');
});

Then('a logout notification is displayed', async function (this: BddWorld) {
    await this.notification.expectLoginMessage('Success');
});

Then('login required field messages are displayed', async function (this: BddWorld) {
    await this.loginPage.expectRequiredFieldValidation();
});
