/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-04 15:46:48 编写而成！
 *    祝你食用愉快！！！
 */

let obj = {name: 'make'};
let obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj === obj2);    // false

let China = {
	nation: '中国',
	birthPlaces: ['北京', '上海', '广州'],
	skinColor: 'yellow',
	friends: ['sk', 'ls']
}

// deepCopy:想要达到深复制就要用递归
function deepCopy(o, c) {
	c = c || {};
	for (let i in o) {
		if (typeof o[i] === 'object') {
			// 考虑深复制问题
			if (o[i].constructor === Array) {
				// 这是数组
				c[i] = [];
			} else {
				// 这是对象
				c[i] = {};
			}
			deepCopy(o[i], c[i]);
		} else {
			c[i] = o[i];
		}
	}
	return c;
}

let result = { name: 'result' };
result = deepCopy(China, result);
console.log(result);

// 浅拷贝
const source = {a: 1, b: 2};
const target = {...source};
console.log(target)
