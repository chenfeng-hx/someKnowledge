/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-11 16:42:04 编写而成！
 *    祝你食用愉快！！！
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	module: {
		rules: [
			{
				// 增加对 CSS 文件的支持
				test: /\.css/,
				// 提取出 Chunk 中的 CSS 代码到单独的文件中
				use: ExtractTextPlugin.extract({
					use: ['css-loader']
				}),
			},
		]
	},
	plugins: [
		new ExtractTextPlugin({
			// 输出的 CSS 文件名称
			filename: 'index.css',
		}),
	],
};