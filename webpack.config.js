const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const APP_DIR = path.resolve(__dirname, 'ClientApp');
const PUBLIC_DIR = path.resolve(__dirname, 'Public');

const config = {
    entry: APP_DIR + '/Client.js',
    output: {
        filename: "bundle.js"
    },
    devtool: 'source-map',
    module: {
        rules: [
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
    devServer:{
        contentBase: PUBLIC_DIR,
        port: 9000,
        open: true,
        historyApiFallback: true // do not return 404 for bad route
    }
};

module.exports = config;