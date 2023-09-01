/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-02 13:03:29 编写而成！
 *    祝你食用愉快！！！
 */
class A {
	constructor(name) {
		this.name = name;
	}

	say() {
		console.log(this.name);
	}
}

class B extends A {
	constructor(name, age) {
		super(name);
		this.age = age;
	}
}

const B1 = new B("mark", 12);
B1.say();
console.log(B1);

