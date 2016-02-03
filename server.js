/* eslint-disable no-var, strict */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
});

function callback(err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:5000');
}

server.listen(5000, 'localhost', callback);
