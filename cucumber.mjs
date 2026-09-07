export default {
    paths: ['bdd/features/**/*.feature'],
    import: ['bdd/support/*.ts', 'bdd/steps/*.ts'],
    format: ['progress', 'summary'],
    parallel: process.env.CI ? 2 : 4,
    retry: 1,
    timeout: 120_000,
    strict: true,
};