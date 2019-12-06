module.exports = {
    presets: [
        ['@babel/env', {
            useBuiltIns: 'entry',
            corejs: 3
        }],
        '@babel/typescript'
    ],
    plugins: [
        '@babel/transform-typescript'
    ]
};