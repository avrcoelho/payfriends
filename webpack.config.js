/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv['mode'] === 'production';
  return {
    entry: './src/main/index.tsx',
    output: {
      publicPath: 'auto',
      path: path.join(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.svg'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
      ],
    },
    plugins: [
      new NodePolyfillPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CleanWebpackPlugin(),
    ],

    devtool: isProduction ? false : 'eval-cheap-module-source-map',

    devServer: {
      open: true,
      overlay: true,
      contentBase: path.join(__dirname, 'public'),
      port: 3000,
    },
  };
};
