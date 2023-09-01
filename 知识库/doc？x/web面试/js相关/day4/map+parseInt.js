/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-05 08:48:55 编写而成！
 *    祝你食用愉快！！！
 */

console.log(['1', '2', '3'].map(parseInt));    // [ 1, NaN, NaN ]

['1', '2', '3'].map(function (item, index) {
	return parseInt(item, index);
	// parseInt('1', 0)    	// 这里按照 radix 参数不存在处理  // 1
	// parseInt('2', 1)    // NaN
	// parseInt('3', 2)    // NaN
});

console.log(parseInt('1', 2));    // 1
console.log(parseInt('3', 2));    // NaN
