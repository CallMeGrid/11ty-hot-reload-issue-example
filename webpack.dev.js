const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  watchOptions: {
    poll: true
  },
  // Can't use faster eval due to a bug with MiniCssExtractPlugin
  // see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/29
  devtool: 'cheap-module-source-map',
  plugins: [
    new ESLintPlugin()
  ]
});
