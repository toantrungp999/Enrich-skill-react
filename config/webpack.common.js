const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.jsx', '.json'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      settings: path.resolve(process.cwd(), 'src/settings'),
      assets: path.resolve(process.cwd(), 'src/assets'),
      services: path.resolve(process.cwd(), 'src/services'),
      hooks: path.resolve(process.cwd(), 'src/hooks'),
      pages: path.resolve(process.cwd(), 'src/pages'),
      components: path.resolve(process.cwd(), 'src/components'),
    },
  },
  plugins: [],
};
