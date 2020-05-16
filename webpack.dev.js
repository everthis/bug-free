const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const moduleConfig = require('./webpack.loaders')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist/static/'),
    publicPath: '/static/',
    filename: '[id].[chunkhash].bundle.js',
    chunkFilename: '[id].[chunkhash].js',
  },
  module: moduleConfig,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(__dirname, './dist/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    host: '0.0.0.0',
    port: 9000,
  },
}
