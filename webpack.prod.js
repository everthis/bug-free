const path = require('path')
const zlib = require('zlib')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const moduleConfig = require('./webpack.loaders')
const distPath = path.resolve(__dirname, './dist/')

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
      threshold: 10240 / 2,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240 / 2,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        'src/*.png',
        'src/*.webmanifest',
        'src/*.svg',
        'src/*.xml',
        'src/*.ico',
      ].map((e) => ({
        from: e,
        to: distPath,
        flatten: true,
      })),
      options: {
        concurrency: 100,
      },
    }),
  ],
}
