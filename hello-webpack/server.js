const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')

const app = express();
const compiler = webpack(config);
const publicPath = config.output.publicPath;

app.use(webpackDevMiddleware(compiler, { publicPath }));

app.listen(3000, () => {
  console.log('Example app listening on port 3000.\n');
})
