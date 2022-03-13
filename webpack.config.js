const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: path.resolve(__dirname, './src/frontend/index.js'),
    devtool: argv.mode !== 'production' && 'source-map',
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
        { test: /\.pug$/, loader: 'pug-loader' }
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'app.js',
    },
    watchOptions: {
      poll: 5000,
    },
    plugins: [new HtmlWebpackPlugin({
      title: 'The Blog App',
      template: './src/frontend/index.pug'
    })],
  };
};
