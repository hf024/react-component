var config = require("./webpack.config.js");
var webpack = require("webpack");
var WebpackDevServer = require("Webpack-dev-server");
config.entry.unshift("webpack-dev-server/client?http://localhost:8090/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {});
server.listen(8090);