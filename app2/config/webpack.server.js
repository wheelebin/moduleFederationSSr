const path = require("path");
const { merge } = require("webpack-merge");
const shared = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: "server",
  target: "async-node",
  entry: [path.resolve(__dirname, "../src/server/index")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    chunkFilename: "[name].[contenthash].js",
    libraryTarget: "commonjs-module",
    publicPath: "auto",
  },
  mode: "development",
  plugins: [...moduleFederationPlugin.server],
  stats: {
    colors: true,
  },
};

module.exports = merge(shared, webpackConfig);
