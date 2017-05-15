const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://127.0.0.1:8089/',
    'webpack/hot/dev-server'
  ],
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "assets/[name].bundle.js",
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback:{
        index:'./build/index.html'
    },
  },
  module: {
    rules: [
      { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          use: "babel-loader" 
      },
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
                loader: "css-loader"
            }]
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
          filename: './index.html',
          template: './public/index.html',
          hash: false,
      })
  ]
}
