import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';

import { 
    chromium, firefox, webkit, 
    type APIRequestContext, type Browser, 
    type BrowserContext, type Page 
} from '@playwright/test';

import { CreateProductPage } from '../../pages/CreateProductPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

import { Header } from '../../components/Header';
import { LeftMenu } from '../../components/LeftMenu';
import { Notification } from '../../components/Notification';

import { ProductApi } from '../../api/ProductApi';

import { type ProductData } from '../../data/factories/ProductFactory';
import { env } from '../../utils/env';

const authFiles = {
    chromium: 'playwright/.auth/chromium.json',
    firefox: 'playwright/.auth/firefox.json',
    webkit: 'playwright/.auth/webkit.json',
} as const;

type BrowserName = keyof typeof authFiles;

export class BddWorld extends World {
    browser?: Browser;
    context?: BrowserContext;
    page!: Page;

    loginPage!: LoginPage;
    dashboardPage!: DashboardPage;
    productPage!: ProductPage;
    createProductPage!: CreateProductPage;

    header!: Header;
    leftMenu!: LeftMenu;
    notification!: Notification;

    productApi!: ProductApi;

    product?: ProductData;
    products: ProductData[] = [];

    constructor(options: IWorldOptions) {
        super(options);
    }

    async startBrowser(tags: string[] = []): Promise<void> {
        const browserType = (process.env.BDD_BROWSER ?? 'chromium') as BrowserName;

        const browserTypes = { chromium, firefox, webkit } as const;

        const selectedBrowser = browserTypes[browserType];

        if (!selectedBrowser) {
            throw new Error(
                `Unsupported BDD_BROWSER: ${browserType}. ` +
                `Expected chromium, firefox, or webkit.`,
            );
        }

        const useAuth = !tags.includes('@unauthenticated');

        this.browser = await selectedBrowser.launch({
            headless: process.env.HEADED !== 'true',
        });

        this.context = await this.browser.newContext({
            baseURL: env.baseUrl,
            ...(useAuth
                ? { storageState: authFiles[browserType] }
                : {}),
        });

        this.page = await this.context.newPage();

        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.header = new Header(this.page);
        this.leftMenu = new LeftMenu(this.page);
        this.productPage = new ProductPage(this.page);
        this.createProductPage = new CreateProductPage(this.page);
        this.notification = new Notification(this.page);

        this.productApi = new ProductApi(this.context.request);
    }

    trackProduct(product: ProductData): void {
        this.product = product;
        this.products.push(product);
    }

    forgetProduct(product: ProductData): void {
        this.products = this.products.filter(
            (trackedProduct) => trackedProduct.sku !== product.sku,
        );

        if (this.product?.sku === product.sku) {
            this.product = undefined;
        }
    }

    async cleanupCreatedProducts(): Promise<void> {
        if (!this.page || this.products.length === 0) {
            return;
        }

        await this.page.goto('/admin/ecommerce/products');
        await this.productPage.expectLoaded();

        for (const product of [...this.products].reverse()) {
            await this.productApi.delete(product);
        }

        this.products = [];
        this.product = undefined;
    }

    async closeBrowser(): Promise<void> {
        await this.context?.close();
        await this.browser?.close();

        this.context = undefined;
        this.browser = undefined;
    }
}

setWorldConstructor(BddWorld);