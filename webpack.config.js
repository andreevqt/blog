'use strict';

require('dotenv').config();

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: path.resolve(__dirname, './src/frontend/index.js'),
    devtool: argv.mode !== 'production' && 'source-map',
    optimization: {
      runtimeChunk: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [
            /node_modules/,
            /server/
          ],
          use: ['babel-loader']
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader'
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        'styled-components': path.resolve(__dirname, './node_modules/styled-components')
      }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
    },
    watchOptions: {
      poll: 1000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'The Blog App',
        template: './src/frontend/index.pug'
      }),
      new webpack.DefinePlugin({
        'process.env.REACT_API_URL': JSON.stringify(process.env.REACT_API_URL),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    ],
  };
};
