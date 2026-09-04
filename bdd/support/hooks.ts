import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { BddWorld } from './world';

setDefaultTimeout(120_000);

Before(async function (this: BddWorld) {
    await this.startBrowser();
});

After(async function (this: BddWorld, { result }) {
    try {
        if (result?.status === Status.FAILED && this.page) {
            this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
        }
    } finally {
        try {
            await this.cleanupCreatedProducts();
        } finally {
            await this.closeBrowser();
        }
    }
});
