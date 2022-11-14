const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'

const devMode = mode === 'development'

const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		open: true,
		hot: true,
	},
	context:
		path.resolve(__dirname, 'src'),
	entry: {
		index: ['@babel/polyfill', './html_css/index.ts']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		assetModuleFilename: 'assets/[name][ext]',
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './html_css/index.html'
		}),
		new MiniCssExtractPlugin(
			{
				filename: 'bundle.css',
			}

		)
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', {
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env'],
							}
						}
					}
				],
			},
			{
				test: /\.m?js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
				type: 'asset/resource',
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: devMode ? undefined : [new CssMinimizerPlugin(), new TerserPlugin()],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},

}
