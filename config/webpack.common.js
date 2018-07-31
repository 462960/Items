const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const { PATHS } = require('./constants');

module.exports = {
  resolve: {
    modules: [PATHS.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  entry: [
    './src/index.tsx',
  ],
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: './js/[name]__[hash:5].js',
    chunkFilename: '[name]__[hash:5].js',
  },
  module: {
    rules: [
      /**
       * disabled rule for jsx
       * {
       *   test: /\.(js|jsx)$/,
       *   exclude: /node_modules/,
       *   use: ['babel-loader'],
       * }
       */
      /**
       * disabled alternative way to load typescript (but hot reload didn't work)
       * {
       *   test: /\.tsx?$/,
       *   loader: 'ts-loader',
       *   exclude: /node_modules/,
       *  },
       */
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(jpg|png|svg|eot|ttf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      filename: './index.html',
    }),
  ],
};
