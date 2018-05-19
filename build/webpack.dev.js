const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');
const vender = require('./manifest.json');

module.exports = {
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8080,
        quiet: true
    },
    entry: config.entry,
    output: config.output,
    performance: {
        hints: false
    },
    module: {
        rules: config.rules
    },
    plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development1"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            vendorName: './dist/'+vender.name + '.js',
            hash: false
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
    ]
};
