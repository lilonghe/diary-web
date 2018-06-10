const webpack = require('webpack');
const path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');


const vendors = ['react','react-dom','mobx','mobx-react','isomorphic-fetch','react-router-dom', 'marked'];

module.exports = {
    output: {
        path: path.resolve('dist'),
        filename: '[name]_[hash].js',
        library: '[name]_[hash]',
    },
    entry: {
        vendor: vendors,
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.DllPlugin({
            path: path.resolve('build/manifest.json'),
            name: '[name]_[hash]',
            context: __dirname,
        }),
        new CleanWebpackPlugin(
            ['dist/vender_*.js'],
            {
                root: path.resolve('./')
            }
        )
    ],
};