import dotenv from 'dotenv';

dotenv.config({
    path: process.env.ENV_FILE || '.env.dev',
});

export const env = {
    baseUrl: process.env.BASE_URL || 'https://shofy.botble.com',
    adminUsername: process.env.ADMIN_USERNAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || '12345678',
};