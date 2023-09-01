/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-05 09:13:04 编写而成！
 *    祝你食用愉快！！！
 */

var a = 1;
{
	function a() {}
	a = 2;
	function a() {}
	a = 3;
	function a() {}
	a = 4;
	console.log('内部a: ', a);
}
console.log('外部a: ', a);