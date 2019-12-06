import path from 'path';

import rules from './rules';
import plugins from './plugins';

export default {
    entry: {
        app: './src/index.ts'
    },

    output: {
        path: path.resolve(__dirname, '../../public'),
        publicPath: '/',
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js'
    },

    mode: 'production',

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendor: {
                    test: (module) => module.context && module.context.includes('node_modules') && !module.context.includes('@ocula'),
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],

        alias: {
            'components': path.resolve(__dirname, '../src/components'),
            'constants': path.resolve(__dirname, '../src/constants'),
            'controllers': path.resolve(__dirname, '../src/controllers'),
            'state': path.resolve(__dirname, '../src/state'),
        },

        symlinks: false
    },

    module: {
        rules
    },

    performance: {
        hints: false
    },

    devtool: 'source-map',
    stats: 'minimal',

    plugins
};