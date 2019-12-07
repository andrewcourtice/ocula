import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

import workboxConfig from './workbox';

import {
    CleanWebpackPlugin
} from 'clean-webpack-plugin';

import { 
    VueLoaderPlugin 
} from 'vue-loader';

import {
    BundleAnalyzerPlugin
} from 'webpack-bundle-analyzer';

let plugins = [
    new CleanWebpackPlugin(),

    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
        filename: '[name]-[chunkhash].css',
        chunkFilename: '[name]-[chunkhash].css'
    }),

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
];

if (process.env.INSIGHTS) {

    plugins = plugins.concat([

        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'ocula-bundle-report.html'
        })

    ]);

}

export default plugins;