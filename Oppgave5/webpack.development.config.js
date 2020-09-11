/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
const {merge} = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
});
