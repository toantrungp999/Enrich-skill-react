const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');

const devConfig = env => ({
  mode: 'development',
  target: 'web',
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',
  output: {
    publicPath: 'http://localhost:5000/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 5000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify(env.mode),
    }),
    new HtmlWebpackPlugin({
      title: 'My Structure React App',
      template: 'public/index.html',
      favicon: 'src/assets/images/favicon.ico',
      inject: true,
    }),
    new MiniCssExtractPlugin({ ignoreOrder: true }),
  ],
});

module.exports = env => {
  return merge(commonConfig, devConfig(env));
};
