const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		index: './src/index.js',
		printer: './src/print.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin({ title: 'Development' }),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8084,
	},
};
