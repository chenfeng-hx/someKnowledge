// 父类
function Person(name) {
    this.name = name;
    this.sum = function() {
        alert(this.name);
    }
}
Person.prototype.age = 10;   // 给构造函数添加了原型属性

// 借用构造函数继承
function Con() {
    Person.call(this, "jer");  // 重点
    this.age = 12;
}
let con1 = new Con();
console.log(con1.name);    // jar
console.log(con1.age);     // 12
console.log(con1 instanceof Person);   // false