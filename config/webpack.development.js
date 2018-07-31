const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { PATHS } = require('./constants');

module.exports = merge([
  commonConfig,
  {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
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
          test: /\.module\.scss$/,
          include: PATHS.src,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('http://192.168.88.181:1337'),
      }),
    ],
    devServer: {
      contentBase: PATHS.devPublic,
      hot: true,
      historyApiFallback: true,
      inline: true,
      stats: { colors: true },
      port: 3000,
      host: '0.0.0.0'
    },
  },
]);
