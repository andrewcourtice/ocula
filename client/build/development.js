import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import merge from 'webpack-merge';
import base from './_base/config';

const CSS_LOADERS = [
    'vue-style-loader', 
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

    mode: 'development',

    devServer: {
        port: 3000,
        hot: true,
        noInfo: true,
        historyApiFallback: true,
        clientLogLevel: 'warning'
    },

    output: {
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[hash].js'
    },

    devtool: 'cheap-module-eval-source-map',

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
            filename: '[name]-[hash].css',
            chunkFilename: '[name]-[hash].css'
        })

    ]
});