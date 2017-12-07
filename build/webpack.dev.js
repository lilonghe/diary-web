const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');
const vender = require('./manifest.json');

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: '80',
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
      'process.env.NODE_ENV': '"development"'
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
}
