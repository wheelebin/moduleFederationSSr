const path = require('path');
const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'server',
  target: 'async-node',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/server/index')],
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: '[name].[contenthash].js',
    libraryTarget: 'commonjs-module',
    publicPath: 'http://localhost:3001/server/',
  },
  mode: 'development',
  plugins: [...moduleFederationPlugin.server],
  // devtool: false,
  optimization: {
    minimize: false,
  },
  stats: {
    colors: true,
  },
};

module.exports = merge(shared, webpackConfig);
