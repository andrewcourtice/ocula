import path from 'path';

import rules from './rules';
import plugins from './plugins';

import TerserPlugin from 'terser-webpack-plugin';
import OptimiseCSSPlugin from 'optimize-css-assets-webpack-plugin';

import getFilenameTemplate from './helpers/get-filename-template';

const FILENAME_TEMPLATE = getFilenameTemplate();

export default {
    entry: {
        app: './src/index.ts'
    },

    output: {
        path: path.resolve(__dirname, '../../public'),
        publicPath: '/',
        filename: FILENAME_TEMPLATE,
        chunkFilename: FILENAME_TEMPLATE
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
        },
        minimizer: [
            new TerserPlugin(),
            new OptimiseCSSPlugin()
        ]
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

    devServer: {
        port: 7000,
        noInfo: true,
        historyApiFallback: true,
        clientLogLevel: 'warning'
    },

    stats: 'minimal',

    plugins
};