import { randomUUID } from 'node:crypto';

export interface ProductData {
    name: string;
    sku: string;
    price: string;
}

export class ProductFactory {
    static create(): ProductData {
        const id = randomUUID().replace(/-/g, '').slice(0, 8);

        return {
            name: `Test Product ${id}`,
            sku: `TEST-SKU-${id}`,
            price: `100.00`,
        };
    }

    static createMany(count: number): ProductData[] {
        return Array.from({ length: count }, () => this.create());
    }
}