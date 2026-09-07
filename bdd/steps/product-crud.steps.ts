import { Given, Then, When } from '@cucumber/cucumber';
import { ProductFactory } from '../../data/factories/ProductFactory';
import { BddWorld } from '../support/world';

const requireProduct = (world: BddWorld) => {
    if (!world.product) {
        throw new Error('No product was created for this scenario.');
    }

    return world.product;
};

Given('the admin is on the Products list page', async function (this: BddWorld) {
    await this.loginPage.loginFullFlow();
    await this.dashboardPage.expectLoaded();

    await this.leftMenu.selectMenuItem('Ecommerce', 'Products');

    await this.productPage.expectLoaded();
});

When('the admin opens the physical product creation form',
    async function (this: BddWorld) {
        await this.productPage.createProductWithType('physical');
        await this.createProductPage.expectLoaded();
    },
);

When('the admin saves the generated product',
    async function (this: BddWorld) {
        const product = ProductFactory.create();

        this.trackProduct(product);

        await this.createProductPage.inputAndSaveProductDetails(product);
    },
);

When('the admin saves the generated product and exits',
    async function (this: BddWorld) {
        const product = ProductFactory.create();

        this.trackProduct(product);

        await this.createProductPage.expectLoaded();
        await this.createProductPage.inputProductDetails(product);
        await this.createProductPage.saveAndExit();
    },
);

When('the admin creates {int} products with generated data',
    async function (this: BddWorld, productCount: number) {
        const products = ProductFactory.createMany(productCount);

        for (const product of products) {
            await this.productPage.createProductWithType('physical');

            await this.createProductPage.inputAndSaveProductDetails(product);

            this.trackProduct(product);

            await this.notification.expectProductActionMessage('Created');
            await this.productPage.expectProductInList(product);
        }
    },
);

When('the admin searches for the generated product by name',
    async function (this: BddWorld) {
        const product = requireProduct(this);

        await this.productPage.searchProductByName(product);
    },
);

When('the admin opens the generated product for editing',
    async function (this: BddWorld) {
        const product = requireProduct(this);

        await this.productPage.clickEditProductButton(product);
    },
);

When('the admin updates the generated product price to {string}',
    async function (this: BddWorld, price: string) {
        const product = requireProduct(this);

        product.price = price;

        await this.createProductPage.inputAndSaveProductDetails(product);
    },
);

When('the admin deletes the generated product',
    async function (this: BddWorld) {
        const product = requireProduct(this);

        await this.productPage.clickDeleteProductButton(product);
        await this.productPage.confirmDeleteProduct();

        this.forgetProduct(product);
    },
);

When('the admin cleans up the generated product',
    async function (this: BddWorld) {
        const product = requireProduct(this);

        await this.productPage.cleanupProduct(product);
        await this.notification.expectProductActionMessage('Deleted');

        this.forgetProduct(product);
    },
);

Then('a product created notification is displayed',
    async function (this: BddWorld) {
        await this.notification.expectProductActionMessage('Created');
    },
);

Then('a product updated notification is displayed',
    async function (this: BddWorld) {
        await this.notification.expectProductActionMessage('Updated');
    },
);

Then('a product deleted notification is displayed',
    async function (this: BddWorld) {
        await this.notification.expectProductActionMessage('Deleted');
    },
);

Then('the generated product is visible in the list',
    async function (this: BddWorld) {
        const product = requireProduct(this);

        await this.productPage.expectProductInList(product);
    },
);

Then('the search result displays the generated product',
    async function (this: BddWorld) {
        const product = requireProduct(this);

        await this.productPage.verifySearchProduct(product);
    },
);

Then('the generated product with price {string} is displayed',
    async function (this: BddWorld, price: string) {
        const product = requireProduct(this);

        const expectedProduct = {
            ...product,
            price,
        };

        await this.productPage.verifySearchProduct(expectedProduct);
    },
);

Then('all generated products are visible and unique',
    async function (this: BddWorld) {
        for (const product of this.products) {
            await this.productPage.expectProductInList(product);
        }

        const [firstProduct, secondProduct] = this.products;

        if (!firstProduct || !secondProduct) {
            throw new Error(
                'Expected two products for uniqueness validation.',
            );
        }

        await this.productPage.expectProductsAreUnique(
            firstProduct,
            secondProduct,
        );
    },
);