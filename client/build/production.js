import TerserPlugin from 'terser-webpack-plugin';
import OptimiseCSSPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

import merge from 'webpack-merge';
import base from './_base/config';

import workboxConfig from './_base/workbox';

const CSS_LOADERS = [
    MiniCssExtractPlugin.loader, 
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: 'client/'
            }
        }
    }
];

export default merge(base, {
    mode: 'production',

    output: {
        filename: '[name]-[contenthash].js',
        chunkFilename: '[name]-[contenthash].js'
    },

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

    module: {
        rules: [
            {
                test: /\.css$/,
                use: CSS_LOADERS
            },
            {
                test: /\.scss$/,
                use: [].concat(CSS_LOADERS, 'sass-loader'),
                exclude: {
                    test: /node_modules/,
                    not: [
                        /@ocula/
                    ]
                }
            },
            {
                test: /\.sass$/,
                use: [].concat(CSS_LOADERS, 'sass-loader?indentedSyntax'),
                exclude: {
                    test: /node_modules/,
                    not: [
                        /@ocula/
                    ]
                }
            }
        ]
    },

    plugins: [
    
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
            chunkFilename: '[name]-[contenthash].css'
        }),

        new WorkboxPlugin.GenerateSW(workboxConfig)

    ]
});