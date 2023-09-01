/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-06 20:33:54 编写而成！
 *    祝你食用愉快！！！
 */

const arr = [];
function chain(num) {
	if (num === 2) return  arr.push(2);
	for (let i = 2; i < num / 2; i++) {
		if (num % i === 0) {
			arr.push(i);
			return chain(num / i);
		}
	}
	return arr.join('*');
}

console.log(chain(100));