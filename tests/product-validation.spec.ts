import { test } from '../fixtures/pageFixtures';
import { ProductFactory } from '../data/factories/ProductFactory';

test('TC-14 - Validate required fields on create product form @negative', async ({
    createProductPage,
}) => {
    const product = ProductFactory.create();

    // Leave mandatory fields blank
    product.name = '';

    await createProductPage.open();
    await createProductPage.expectLoaded();
    
    await createProductPage.inputAndSaveProductDetails(product);
    await createProductPage.verifyInvalidProductName();
});

test('TC-15 - Validate invalid price input @negative', async ({
    createProductPage,
}) => {
    const product = ProductFactory.create();
    
    // Invalid price
    product.price = '-1';

    await createProductPage.open();
    await createProductPage.expectLoaded();

    await createProductPage.inputAndSaveProductDetails(product);
    await createProductPage.verifyInvalidProductPrice();
});