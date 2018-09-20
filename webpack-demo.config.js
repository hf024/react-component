const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 2 })

let manifest = {
	devtool: 'source-map',
	entry: {
		qtrade: path.join(__dirname, '/app/qtrade.js'),
		agency: path.join(__dirname, '/app/agency.js'),
		other: path.join(__dirname, '/app/other.js'),
		qframe: path.join(__dirname, '/app/qframe.js')
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'js-react/bundle-[name]-[hash].js',
		publicPath: '/',
		chunkFilename: 'js-react/[name]-[hash].js'
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'jquery': 'jQuery',
		'lodash': '_',
		'moment': 'moment'
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: ['happypack/loader?id=happy-babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: ['file-loader?name=image/generated/[hash].[ext]', 'image-webpack-loader']
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
			}
		]
	},
	plugins: [
		new HappyPack({
			id: 'happy-babel-loader',
			loaders: ['babel-loader?cacheDirectory=true'],
			threadPool: happyThreadPool
		}),
		new HappyPack({
			id: 'happy-style-loader',
			loaders: ['css-loader', 'less-loader'],
			threadPool: happyThreadPool
		}),
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			chunks: ['qtrade'],
			filename: 'qtrade.html',
			template: path.join(__dirname, '/app/index.template.dev.qa.production.html'),
			favicon: path.join(__dirname, '/app/favicon.ico'),
			title: 'QTrade'
		}),
		new HtmlWebpackPlugin({
			chunks: ['agency'],
			filename: 'agency.html',
			template: path.join(__dirname, '/app/index.template.dev.qa.production.html'),
			favicon: path.join(__dirname, '/app/favicon.ico'),
			title: 'QTrade'
		}),
		new HtmlWebpackPlugin({
			chunks: ['other'],
			filename: 'other.html',
			template: path.join(__dirname, '/app/index.template.dev.qa.production.html'),
			favicon: path.join(__dirname, '/app/favicon.ico'),
			title: 'QTrade'
		}),
		new HtmlWebpackPlugin({
			chunks: ['qframe'],
			filename: 'qframe.html',
			template: path.join(__dirname, '/app/index.template.dev.qa.production.html'),
			favicon: path.join(__dirname, '/app/favicon.ico'),
			title: 'QTrade'
		}),
		new HtmlWebpackExcludeAssetsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('dev-qa-production')
			}
		}),
		new CopyWebpackPlugin([{from: 'app/identity-failed.html', to: 'identity-failed.html'}]),
		new CopyWebpackPlugin([{from: 'app/identity-successful.html', to: 'identity-successful.html'}]),
		new CopyWebpackPlugin([{from: 'app/index.html', to: 'index.html'}]),
		new CopyWebpackPlugin([{from: 'app/agreement.html', to: 'agreement.html'}]),
		new CopyWebpackPlugin([{from: 'app/agency-login.html', to: 'agency-login.html'}]),
		new CopyWebpackPlugin([{from: 'app/download-installation-package.html', to: 'download-installation-package.html'}]),
		new CopyWebpackPlugin([{from: 'app/about-us.html', to: 'about-us.html'}]),
		new CopyWebpackPlugin([{from: 'app/about-zhn.html', to: 'about-zhn.html'}]),
		new CopyWebpackPlugin([{from: 'app/index.html', to: 'index.html'}]),
		new CopyWebpackPlugin([{from: 'app/about-us.html', to: 'about-us.html'}]),
		new CopyWebpackPlugin([{from: 'app/agency-login.html', to: 'agency-login.html'}]),
		new CopyWebpackPlugin([{from: 'app/download-installation-package.html', to: 'download-installation-package.html'}]),
		new CopyWebpackPlugin([{from: 'app/build-in-01.html', to: 'build-in-01.html'}]),
		new CopyWebpackPlugin([{from: 'app/asset/image/qqgif', to: 'image/qqgif'}]),
		// TODO: this folder should not include image files that is used in the way of require()
		new CopyWebpackPlugin([{from: 'app/asset/image/login', to: 'image'}]),
		// TODO: This folder is used by backend service for invitation feature.
		// We should copy app/asset/image/tencent to folder image/tencent instead of folder image.
		// Backend code should also be changed because of it.
		new CopyWebpackPlugin([{from: 'app/asset/image/tencent', to: 'image'}]),
		new CopyWebpackPlugin([{from: 'app/asset/document', to: 'document'}]),
		new CopyWebpackPlugin([{from: 'app/css-static', to: 'css-static'}]),
		new CopyWebpackPlugin([{from: 'app/html-static', to: 'html-static'}]),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ParallelUglifyPlugin({
			cacheDir: '.cache/',
			uglifyJS: {
				output: {
					comments: false
				},
				compress: {
					warnings: false
				}
			}
		}),
		new ExtractTextPlugin({filename: '[name]-[hash].css'}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessorOptions: {discardComments: {removeAll: true}}
		}),
		new FileManagerPlugin({
			onEnd: {
				mkdir: ['./public-package'],
				archive: [
					{
						source: './public', destination: './public-package/public.zip'
					}
				]
			}
		})
	]
}

module.exports = (env) => {
	if (env === 'production') {
		manifest.plugins.push(new CopyWebpackPlugin([{from: 'app/login-error-production.html', to: 'login-error.html'}]))
		manifest.plugins.push(new CopyWebpackPlugin([{from: 'app/qtrade-clean-login-production.html', to: 'qtrade-clean-login.html'}]))
		manifest.plugins.push(new CopyWebpackPlugin([{from: 'app/login-production.html', to: 'login.html'}]))
	} else {
		manifest.plugins.push(new CopyWebpackPlugin([{from: 'app/login-error-dev-qa.html', to: 'login-error.html'}]))
		manifest.plugins.push(new CopyWebpackPlugin([{from: 'app/qtrade-clean-login-dev-qa.html', to: 'qtrade-clean-login.html'}]))
		manifest.plugins.push(new CopyWebpackPlugin([{from: 'app/login-dev-qa.html', to: 'login.html'}]))
		manifest.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}))
	}

	manifest.plugins.push(new CopyWebpackPlugin([{from: 'app/js-static', to: 'js-static'}]))
	return manifest
}
