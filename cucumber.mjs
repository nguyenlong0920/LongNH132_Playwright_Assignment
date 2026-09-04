export default {
    paths: ['bdd/features'],
    import: ['bdd/support/*.ts', 'bdd/steps/*.ts'],
    format: ['progress', 'summary'],
    parallel: 0,
    retry: 0,
    strict: true,
};