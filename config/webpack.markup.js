const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { MARKUP_PATHS, PATHS } = require('./constants');

const plugins = [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    template: MARKUP_PATHS.inputPath + '/index.pug',
    filename: './index.html',
  }),
  new HtmlWebpackPlugin({
    template: MARKUP_PATHS.inputPath + '/login.pug',
    filename: './login.html',
  }),
  new HtmlWebpackPlugin({
    template: MARKUP_PATHS.inputPath + '/wrap-inventory-main.pug',
    filename: './wrap-inventory-main.html',
  }),
  new HtmlWebpackPlugin({
    template: MARKUP_PATHS.inputPath + '/structure.pug',
    filename: './structure.html',
  }),
  new HtmlWebpackPlugin({
    template: MARKUP_PATHS.inputPath + '/modal.pug',
    filename: './modal.html',
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    Popper: ['popper.js', 'default'],
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
];

module.exports = {
  entry: MARKUP_PATHS.inputPath,
  output: {
    filename: 'bundle.js',
    path: MARKUP_PATHS.outputPath,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['link:href', 'img:src', 'use:xlink:href'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff2|woff|ttf|eot)(\?[a-z0-9=&.]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: PATHS.devPublic + './fonts/',
          },
        },
      },
      {
        test: /.*favicon[^.]*\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=&.])*$/,
        exclude: /favicon/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
            query: {
              attrs: ['img:src', 'video:src', 'source:src', 'use:xlink:href'],
            },
          },
          {
            loader: 'pug-html-loader',
            query: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.js', 'scss'],
  },
  devServer: {
    contentBase: PATHS.devPublic,
    hot: true,
    historyApiFallback: true,
    inline: true,
    stats: { colors: true },
    port: 9000,
    host: '0.0.0.0'
  },
};
