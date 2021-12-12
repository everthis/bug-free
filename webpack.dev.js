const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const moduleConfig = require('./webpack.loaders')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: '[id].[hash].bundle.js',
    chunkFilename: '[id].[chunkhash].js',
  },
  module: moduleConfig,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, 'dist/'),
    compress: false,
    host: '0.0.0.0',
    hot: true,
    port: 9000,
    historyApiFallback: true,
  },
}
