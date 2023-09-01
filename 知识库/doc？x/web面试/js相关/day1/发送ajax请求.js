/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-02 16:35:19 编写而成！
 *    祝你食用愉快！！！
 */

// 创建请求对象
let xhr = new XMLHttpRequest();
// 设置请求信息
xhr.open(method, url);
// 可以设置请求头，一般不设置
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 发送请求(get 请求不传 body 参数，传 params，只有 post 请求使用)
xhr.send(body);
// 接收响应 responseXML 接收 xml 格式的响应数据  responseText 接收文本格式的响应数据
xhr.onreadystatechange = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {
		let text = xhr.responseText;
		console.log(text);
	}
}
