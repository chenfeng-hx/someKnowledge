// 父类
function Person(name) {
	this.name = name;
	this.sum = function() {
		alert(this.name);
	}
}
Person.prototype.age = 10;   // 给构造函数添加了原型属性

// 原型链继承
function exPer() {
    this.name = "mark";
}
exPer.prototype = new Person();
let p1 = new exPer();
console.log(new Person().age);
console.log(p1.age);

// instanceof 判断元素是否在另一个元素的原型来链上
console.log(p1 instanceof Person);