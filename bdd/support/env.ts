import dotenv from 'dotenv';

dotenv.config({
    path: process.env.ENV_FILE || '.env.dev',
});

export const bddEnv = {
    baseUrl: process.env.BASE_URL || 'http://shofy.botble.com',
    adminUsername: process.env.ADMIN_USERNAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || '12345678',
};
