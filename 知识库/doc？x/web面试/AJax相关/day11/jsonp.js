/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-14 18:29:18 编写而成！
 *    祝你食用愉快！！！
 */

let querystring = require('querystring');
let http = require('http');
let server = http.createServer();
server.on('request', function(req, res) {
	let params = qs.parse(req.url.split('?')[1]);
	let fn = params.callback;
	// jsonp返回设置
	res.writeHead(200, { 'Content-Type': 'text/javascript' });
	res.write(fn + '(' + JSON.stringify(params) + ')');
	res.end();
});
server.listen('8080');
console.log('Server is running at port 8080...');