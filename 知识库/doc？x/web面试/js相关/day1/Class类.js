/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-02 14:55:47 编写而成！
 *    祝你食用愉快！！！
 */

/* 匿名类 */
let Example1 = class  {
	constructor(a) {
		this.a = a;
		console.log(a);
	}
}
let ex1 = new Example1(1);

/* 命名类 */
let Example2 = class Example3 {
	constructor(b) {
		this.b = b;
		console.log(b);
	}
}
let ex2 = new Example2(2);
let ex3 = new Example3(3);   // error: Example3 is undefined