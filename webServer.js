var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

var compiler = Webpack(webpackConfig);

var bundler = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  contentBase: __dirname + "/public",
  publicPath: webpackConfig.output.publicPath,
  proxy: {
    "/graphql": "http://localhost:4444"
  }
});

bundler.listen(3333);

console.log('WDS is running at http://localhost:3333');
