import { APIRequestContext } from '@playwright/test';
import { users } from '../data/static/users';
import { expect } from '../utils/config';
import { logger } from '../utils/logger';

export class LoginApi {
    constructor(private readonly request: APIRequestContext) {}

    async login() {
        logger.info('Logging in via API');

        const response = await this.request.post('/admin/login', {
            form: {
                username: users.admin.username,
                password: users.admin.password,
                remember: '1',
            },
        });

        await expect(response).toBeOK();

        logger.info('API login successful');
    }
}