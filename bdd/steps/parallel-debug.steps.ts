import { When } from '@cucumber/cucumber';

When('a controlled debugging failure is enabled', function () {
    if (process.env.DEBUG_FAILURE === 'true') {
        throw new Error('Controlled BDD failure for debugging artifacts.');
    }
});