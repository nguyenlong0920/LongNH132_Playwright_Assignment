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

        console.log('\n========== LOGIN DEBUG ==========');

        console.log({
            status: response.status(),
            statusText: response.statusText(),
            url: response.url(),
            location: response.headers()['location'],
            hasSetCookie: Boolean(response.headers()['set-cookie']),
        });

        const body = await response.text();

        console.log('Response body preview:');
        console.log(body.slice(0, 500));

        console.log('=================================\n');

        await expect(response).toBeOK();

        logger.info('API login successful');
    }
}