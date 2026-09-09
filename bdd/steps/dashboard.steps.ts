import { Then, When } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

Then('the dashboard page is displayed', async function (this: BddWorld) {
    await this.dashboardPage.expectLoaded();
});

Then('the admin go to dashboard page', async function (this: BddWorld) {
    await this.dashboardPage.open();
    await this.dashboardPage.expectLoaded();
});

Then('the left navigation menu is displayed', async function (this: BddWorld) {
    await this.leftMenu.expectLoaded();
    await this.leftMenu.expectMenuVisible();
});

Then('the dashboard header is displayed', async function (this: BddWorld) {
    await this.header.expectLoaded();
    await this.header.expectUserMenuVisible();
});

Then('the profile menu is displayed', async function (this: BddWorld) {
    await this.header.openUserMenu();
    await this.header.expectProfileMenuVisible();
});

When('the admin logout', async function (this: BddWorld) {
    await this.header.logout();
});