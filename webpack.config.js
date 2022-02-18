const webpack = require('webpack');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ["style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.svg/,
                use: {
                    loader: "svg-url-loader",
                    options: {
                        // make all svg images to work in IE
                        iesafe: true,
                    },
                },
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, "build"),
                    from: "./src/*.html",
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlMinimizerPlugin(),
        ],
    },
    devServer: {
        // static: path.resolve(__dirname, './build'),
        static: {
            directory: path.join(__dirname, './build'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
};
