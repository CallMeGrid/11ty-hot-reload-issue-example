const path = require('path');
const PostCSSPresetEnv = require('postcss-preset-env');
const globImporter = require('node-sass-glob-importer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  stats: {
    colors: true
  },
  entry: [
    path.resolve(__dirname, 'src/_assets/js/index.js'),
    path.resolve(__dirname, 'src/_assets/css/main.scss')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/assets/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // Will create a `css.liquid` with the CSS files
    // that then gets picked up by eleventy
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/_includes/css.template'),
      filename: path.resolve(__dirname, 'src/_includes/partials/css.liquid'),
      hash: true,
      inject: false
    }),
    // Will create a `js.liquid` with the JS files
    // that then gets picked up by eleventy
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/_includes/js.template'),
      filename: path.resolve(__dirname, 'src/_includes/partials/js.liquid'),
      hash: true,
      inject: false
    }),
    new CopyPlugin({
      patterns: [{
        context: 'src/_assets/svg',
        from: '**/*.svg',
        to: 'svg',
        flatten: true
      }],
    }),
    new CopyPlugin({
      patterns: [{
        context: 'src/_assets/img',
        from: '**/*.(jpg|png|gif)',
        to: 'img',
        flatten: true
      }],
    }),
  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // Does not respect devtools option
            // https://github.com/webpack-contrib/css-loader/issues/622
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [PostCSSPresetEnv],
              // Does not respect devtools option
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          }
        ]
      }
    ]
  }
};
