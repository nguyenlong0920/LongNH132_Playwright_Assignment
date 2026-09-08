import { APIRequestContext } from '@playwright/test';
import { ProductData } from '../data/factories/ProductFactory';
import { expect } from '../utils/config';
import { logger } from '../utils/logger';

export class ProductApi {
    constructor(private readonly request: APIRequestContext) {}

    async create(product: ProductData) {
        logger.info('Creating product via API', {
            name: product.name,
            sku: product.sku,
        });

        const response = await this.request.post(
            '/admin/ecommerce/products/create',
            {
                multipart: {
                    product_type: 'physical',
                    name: product.name,
                    sku: product.sku,
                    price: product.price,
                },
            },
        );

        await expect(response).toBeOK();

        logger.info('Product created via API', {
            name: product.name,
            sku: product.sku,
        });

        return response;
    }

    async delete(product: ProductData) {
        logger.info('Deleting product via API', {
            name: product.name,
            sku: product.sku,
        });

        logger.debug('Searching product by SKU before deletion', {
            sku: product.sku,
        });

        const searchResponse = await this.request.post(
            '/admin/ecommerce/products',
            {
                form: {
                    'search[value]': product.sku,
                },
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            },
        );

        await expect(searchResponse).toBeOK();

        const productId = (await searchResponse.json()).data[0].id;

        logger.debug('Product found for deletion', {
            sku: product.sku,
            productId,
        });

        const response = await this.request.post(
            `/admin/ecommerce/products/${productId}`,
            {
                data: {
                    _method: 'delete',
                },
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            },
        );

        await expect(response).toBeOK();

        logger.info('Product deleted via API', {
            name: product.name,
            sku: product.sku,
            productId,
        });
    }
}