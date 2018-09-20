const webpack = require("webpack")
const path = require('path')
const HappyPack = require('happypack')
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: 'inline-source-map',

	entry: {
		main: path.join(__dirname, "/app/main.js")
	},

	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'js-react/bundle-[name]-[hash].js',
		chunkFilename: 'js-react/[name]-[hash].js'
	},

    module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'happypack/loader?id=happyBabel',
				exclude: /node_modules/
			},
			{
				test: /\.(eot|ttf|woff|woff2|otf)$/i,
				use: ['file-loader?name=font/[hash].[ext]']
			},
			{
				test: /\.(less|css)$/,
				use: ExtractTextPlugin.extract({
					use: ['happypack/loader?id=happy-style-loader']
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: ['file-loader?name=image/generated/[hash].[ext]', 'image-webpack-loader']
			}
		]
	},
	devServer: {
		contentBase: './dist',
        host:'localhost',
		compress:true,
		inline: true,//实时刷新
        port:8090
    },
	plugins: [
		new HappyPack({
			//用id来标识 happypack处理那里类文件
		  id: 'happyBabel',
		  //如何处理  用法和loader 的配置一样
		  loaders: [{
			loader: 'babel-loader?cacheDirectory=true',
		  }],
		  //共享进程池
		  threadPool: happyThreadPool,
		  //允许 HappyPack 输出日志
		  verbose: true,
		}),
		new HappyPack({
			id: 'happy-style-loader',
			loaders: ['css-loader', 'less-loader'],
			threadPool: happyThreadPool
		}),
		new HtmlWebpackPlugin({
			chunks: ['main'],
			filename: 'main.html',
			template: path.join(__dirname, './index.template.html'),
			favicon: path.join(__dirname, '/favicon.ico'),
			title: 'Main'
		}),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        // }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin({filename: '[name].css'}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.HotModuleReplacementPlugin()
    ]
};
