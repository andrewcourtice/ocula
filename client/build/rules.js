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
        exclude: {
            test: /node_modules/,
            not: [
                /@ocula/,
                /.*\.vue\.(js|ts)$/
            ]
        }
    },
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