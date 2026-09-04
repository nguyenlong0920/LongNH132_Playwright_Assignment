import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { CreateProductPage } from '../../pages/CreateProductPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { Header } from '../../components/Header';
import { LeftMenu } from '../../components/LeftMenu';
import { Notification } from '../../components/Notification';
import { type ProductData } from '../../data/factories/ProductFactory';
import { bddEnv } from './env';

export class BddWorld extends World {
    browser?: Browser;
    context?: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    dashboardPage!: DashboardPage;
    header!: Header;
    leftMenu!: LeftMenu;
    productPage!: ProductPage;
    createProductPage!: CreateProductPage;
    notification!: Notification;
    product?: ProductData;
    products: ProductData[] = [];

    constructor(options: IWorldOptions) {
        super(options);
    }

    async startBrowser() {
        this.browser = await chromium.launch({
            headless: process.env.HEADED !== 'true',
        });
        this.context = await this.browser.newContext({
            baseURL: bddEnv.baseUrl,
        });
        this.page = await this.context.newPage();

        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.header = new Header(this.page);
        this.leftMenu = new LeftMenu(this.page);
        this.productPage = new ProductPage(this.page);
        this.createProductPage = new CreateProductPage(this.page);
        this.notification = new Notification(this.page);
    }

    trackProduct(product: ProductData) {
        this.product = product;
        this.products.push(product);
    }

    forgetProduct(product: ProductData) {
        this.products = this.products.filter((trackedProduct) => trackedProduct.sku !== product.sku);
        if (this.product?.sku === product.sku) {
            this.product = undefined;
        }
    }

    async cleanupCreatedProducts() {
        if (this.products.length === 0) {
            return;
        }

        await this.page.goto('/admin/ecommerce/products');
        await this.productPage.expectLoaded();
        for (const product of [...this.products].reverse()) {
            await this.productPage.cleanupProduct(product);
        }
        this.products = [];
        this.product = undefined;
    }

    async closeBrowser() {
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(BddWorld);
