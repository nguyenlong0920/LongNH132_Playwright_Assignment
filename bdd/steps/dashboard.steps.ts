import { Then, When } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

Then('the dashboard page is displayed', async function (this: BddWorld) {
    await this.dashboardPage.expectLoaded();
});

Then('the left navigation menu is displayed', async function (this: BddWorld) {
    await this.leftMenu.expectLoaded();
    await this.leftMenu.expectMenuVisible();
});

When('the admin opens the user menu', async function (this: BddWorld) {
    await this.header.expectLoaded();
    await this.header.openUserMenu();
});

Then('the profile menu is displayed', async function (this: BddWorld) {
    await this.header.expectProfileMenuVisible();
});
