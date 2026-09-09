import { When } from '@cucumber/cucumber';
import { BddWorld } from '../support/world';

When('the admin opens {string} from the {string} menu', 
    async function (this: BddWorld, item: string, menu: string) {
        await this.leftMenu.selectMenuItem(menu, item);
    }
);