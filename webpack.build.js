const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require("clean-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var assetsPath = 'assets/';

const extractSass = new ExtractTextPlugin({
    filename: assetsPath + "style.[hash].css"
});

module.exports = {
  entry: [
    './src/index.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: assetsPath + "bundle.[hash].js",
    chunkFilename: assetsPath + '[name]-[id].[chunkhash:8].bundle.js',
    publicPath: '/'
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
        //   exclude: /node_modules/, 
          use: extractSass.extract({
            use: [{
                loader: "css-loader",
                options:{
                    minimize: true //css压缩
                }
            }]
        })
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  	new CleanPlugin(['build']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
          filename: './index.html',
          template: './public/index.html',
          hash: false,
      }),
    new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify('production')
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            warnings: false, // Suppress uglification warnings
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
        },
        output: {
            comments: false,
        }
    }),
    extractSass    
  ]
}