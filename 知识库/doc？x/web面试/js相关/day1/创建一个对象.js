/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-02 14:34:27 编写而成！
 *    祝你食用愉快！！！
 */

/* 用 object 创建对象 */
// let box = new Object();   // 可以替换
let box = {};
box.name = 'Lee';
box.age = 100;
box.run = function () {
	return this.name + this.age;
}

/* 工厂模式创建对象 */
function createObject(name, age) {
	// 集中实例化的函数
	let obj = {};
	obj.name = name;
	obj.age = age;
	obj.run = function () {
		return this.name + this.age;
	}
	return obj;
}

let box1 = createObject('Lee', 100);
let box2 = createObject('Jack', 200);
console.log(box1.run());
console.log(box2.run());

/* 构造函数创建对象 */
function CreateBoxObj(name, age) {
	this.name = name;
	this.age = age;
	this.run = function () {
		return this.name + this.age;
	}
}

let box3 =new CreateBoxObj('Lee', 100);
let box4 =new CreateBoxObj('Jack', 200);
console.log(box3.run());
console.log(box4.run());