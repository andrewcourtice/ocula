import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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

export default [
    {
        test: /\.vue$/,
        use: 'vue-loader'
    },
    {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: file => /node_modules\/(?!@ocula)/.test(file) && !/\.vue\.(ts|js)x?/.test(file)
    },
    {
        test: /\.css$/,
        use: CSS_LOADERS
    },
    {
        test: /\.scss$/,
        use: [].concat(CSS_LOADERS, 'sass-loader'),
        exclude: /node_modules\/(?!@ocula)/
    },
    {
        test: /\.sass$/,
        use: [].concat(CSS_LOADERS, 'sass-loader?indentedSyntax'),
        exclude: /node_modules\/(?!@ocula)/
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
];