const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const HWP = require('html-webpack-plugin');


module.exports = {
	entry: {

		'bundle.js': [
			path.resolve(__dirname, 'src/components/pages/index.js')
		]
	},

	output: {
		filename: 'build.js',
		path: path.join(__dirname, '/dist')
	},
	module: {
		rules: [{
				test: /\.(js|jsx?)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/preset-react']
					}
				}],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.png$/i,
				use: 'file-loader',
			},
			{
				test: /\.jpg$/i,
				use: 'file-loader',
			},
		]
	},
	devServer: {
		historyApiFallback: true
	},


	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},

	plugins: [
		new HWP({
			template: path.join(__dirname, '/src/components/index.html')
		}),
		new MiniCssExtractPlugin({
			filename: 'variable.css',
		})
	]
}
