/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-06 16:39:03 编写而成！
 *    祝你食用愉快！！！
 */

(async function hello() {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, 5000);
	})
	setTimeout(() => {
		console.log('hello');
	}, 100)
})();

