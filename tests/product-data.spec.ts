import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-16 - Create multiple products using data factory @data @regression', async ({
    productApi,
    productPage,
}) => {
    const products = ProductFactory.createMany(3);

    for (const product of products) {
        await productApi.create(product);
    }

    await productPage.open();
    await productPage.expectLoaded();

    for (const product of products) {
        await productPage.searchProductByName(product);
        await productPage.verifySearchProduct(product);
    }

    for (const product of products) {
        await productApi.delete(product);
    }
});