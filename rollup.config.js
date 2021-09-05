import pkg from './package.json';

export default {
    input: 'index.js',
    output: [
        { file: pkg.module, 'format': 'es' },
        { file: pkg.main, 'format': 'umd', name: 'rollup-plugin-prompt-replace' }
    ],
    external: Object.keys(pkg.dependencies)
};