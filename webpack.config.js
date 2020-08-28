const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const APP_DIR = path.resolve(__dirname, 'ClientApp');

const config = {
    entry: APP_DIR + '/Client.js',
    output: {
        filename: "bundle.js"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node-modules/,
                options:{
                    presets:[
                        'react',
                        'stage-2',
                        ['env',
                            {
                                targets: {
                                    browsers: ['last 2 versions']
                                }   
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
        title: 'My App',
        template: path.resolve(__dirname, 'index.html')
      }),
        new webpack.ProgressPlugin(),
        new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, 'CodeEffects/CodeEffectsEditor.js')}) ]
};

module.exports = config;