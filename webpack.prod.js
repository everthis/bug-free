const path = require('path')
const zlib = require('zlib')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const moduleConfig = require('./webpack.loaders')

module.exports = {
  mode: 'production',
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
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/*.png', to: '', flatten: true },
        { from: 'src/*.webmanifest', to: '', flatten: true },
        { from: 'src/*.svg', to: '', flatten: true },
        { from: 'src/*.xml', to: '', flatten: true },
        { from: 'src/*.ico', to: '', flatten: true },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
}
