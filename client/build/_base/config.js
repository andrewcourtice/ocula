import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import {
    CleanWebpackPlugin
} from 'clean-webpack-plugin';

import { 
    VueLoaderPlugin 
} from 'vue-loader';


import webpack from 'webpack';

export default {

    stats: 'minimal',

    entry: {
        app: './src/index.ts'
    },

    output: {
        path: path.resolve(__dirname, '../../../public'),
        publicPath: '/',
    },

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],

        alias: {           
            'components': path.resolve(__dirname, '../src/components'),
            'constants': path.resolve(__dirname, '../src/constants'),
            'controllers': path.resolve(__dirname, '../src/controllers'),
            'store': path.resolve(__dirname, '../src/store'),
        },

        symlinks: false
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                exclude: {
                    test: /node_modules/,
                    not: [
                        /@ocula/,
                        /.*\.vue\.(js|ts)$/
                    ]
                }
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            'MAPBOX_API_KEY': '',
            'OWM_API_KEY': '',
            'GA_TRACKING_ID': '',
            'SENTRY_DSN': '',
            '__VUE_OPTIONS_API__': false, 
            '__VUE_PROD_DEVTOOLS__': false 
        }),
        
        new CleanWebpackPlugin(),
    
        new VueLoaderPlugin(),
    
        new HtmlWebpackPlugin({
            title: 'Ocula',
            template: './src/index.ejs'
        }),
    
        new FaviconsWebpackPlugin({
            logo: './src/assets/images/logo/logo-512.svg',
            favicons: {
                appName: 'Ocula',
                appShortName: 'Ocula',
                appDescription: 'The open-source, progressive weather app',
                developerName: 'Andrew Courtice',
                display: 'standalone',
                background: '#FFFFFF',
                theme_color: '#FFFFFF',
                appleStatusBarStyle: 'default',
                start_url: '/?source=pwa',
                scope: '/',
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    favicons: true,
                    firefox: true,
                    windows: true
                }
            }
        }),

        new CopyWebpackPlugin([
            './src/static'
        ])

    ]
};
