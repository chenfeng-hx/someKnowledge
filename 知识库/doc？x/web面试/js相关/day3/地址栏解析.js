/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-04 15:30:11 编写而成！
 *    祝你食用愉快！！！
 */

function getUrlKey(url) {
	let params = {};
	let arr = url.split('?');
	if (arr.length <= 1) return;
	arr = arr[1].split('&');
	for (let i = 0; i < arr.length; i++) {
		const query = arr[i].split('=');
		params[query[0]] = query[1];
	}
	return params;
}
let url = "https://images.xiaohai-hx.cn?id=1&article=2";
console.log(getUrlKey(url));