/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-03 15:24:43 编写而成！
 *    祝你食用愉快！！！
 */

// vue2

let number = 18;
const person = {
	name: 'make',
	sex: 'male',
}
Object.defineProperty(person, 'age', {
	get: function () {
		return number;
	},
	set: function (value) {
		number = value;
	}
})
console.log(person.age);