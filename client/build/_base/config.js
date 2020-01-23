import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

import {
    CleanWebpackPlugin
} from 'clean-webpack-plugin';

import { 
    VueLoaderPlugin 
} from 'vue-loader';

import workboxConfig from './workbox';
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
            'state': path.resolve(__dirname, '../src/state'),
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
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
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
        new webpack.EnvironmentPlugin('MAPBOX_API_KEY'),
        
        new CleanWebpackPlugin(),
    
        new VueLoaderPlugin(),
    
        new HtmlWebpackPlugin({
            title: 'Ocula',
            template: './src/index.html'
        }),
    
        new CopyWebpackPlugin([
            './src/static'
        ]),
    
        new WorkboxPlugin.GenerateSW(workboxConfig)
    
    /*     new FaviconsWebpackPlugin({
            logo: './src/assets/icons/favicon.png'
        }), */
    ]
};