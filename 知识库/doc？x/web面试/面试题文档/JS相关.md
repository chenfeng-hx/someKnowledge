# JS 相关

## 说一下对闭包的理解

闭包说的通俗一点就是打通了一条在函数外部访问函数内部作用域的通道。正常情况下函数外部是访问不到函数内部作用域变量的。

闭包用途是：

1. 读取函数内部的变量
2. 让这些变量的值始终保持在内存中。不会再f1调用后被自动清除。
3. 方便调用上下文的局部变量。利于代码封装。

表象判断是不是闭包:函数嵌套函数，内部函数被return， 内部函数调用外层函数的局部变量

原因：f1是f2的父函数，f2被赋给了一个全局变量，f2始终存在内存中，f2的存在依赖f1，因此f1也始终存在内存中，不会在调用结束后，被垃圾回收机制回收。

- 优点：可以隔离作用域，不造成全局污染

- 缺点：
	- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
	- 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

  如何解决内存泄露：将暴露全外部的闭包变量置为null

  适用场景：封装组件，for循环和定时器结合使用，for循环和dom事件结合，可以在性能优化的过程中，节流防抖函数的使用，导航栏获取下标的使用

https://juejin.cn/post/6844903619595075592



## 说一下 JS 中的原型链的理解

### 什么是原型，原型链

原型：js 中，万物皆对象，每一个对象都拥有自己的属性，js 原型的出现是为了解决让多个对象共享一个或多个方法（因为如果在每个对象实例上都挂上相同的方法的话性能很差），在 js 中每个对象都有一个与他关联的对象，叫做原型对象，每次获取对象属性都是一次查询过程，在对象的自由属性中找不到就会去查找它的原型对象，**对象中都包含了一个 [proto] 内部属性，这个属性所对应的就是自身的原型**。

原型链：原型连成一条链，js 在查找属性过程中，如果在自有属性中找不到就会去原型对象中查找，如果原型对象中还查不到，就会去原型对象的原型中查找，也就是按照原型链查找，直到查找到原型链的顶端 object， （**当一个对象调用自身不存在的属性/方法时，就会去自己 [proto] 关联的前辈 prototype 对象上去找，如果没找到，就会去该 prototype 原型 [proto] 关联的前辈 prototype 去找。依次类推，直到找到属性/方法或 undefined 为止。从而形成了所谓的“原型链”**）。



### 有什么用，怎么用的

1. object 中的 prototype 中的 constructor 指向 object 本身
2. 父对象中的 prototype 中的 \_\_proto\_\_ 指向 object 的 prototype
3. 父对象中的 prototype 中的 constructor 指向父对象本身
4. 子对象中的 prototype 中的 \_\_proto\_\_ 指向父对象的 prototype 
5. 



### 原型链继承的优缺点

优点：

- 只继承了父类构造函数的属性，没有继承父类原型的属性
- 可以继承多个构造函数属性（call 方法）
- 在子实例中可向父实例传参

缺点：

- 只能继承父类构造函数的属性
- 无法实现构造函数的复用（每次用每次都要重新调用）
- 每个新实例都有父类构造函数的副本，臃肿



## 说一下 JS 继承：有两个类，AB，B怎样继承 A

### 什么是继承

继承是通过某种方式让一个对象可以访问到另一个对象的属性和方法



### 继承有什么用



### 如何实现继承

#### 原型继承

让新实例的原型等于父类的实例

```js
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
exPer.prototype = new Person();  // 子实例的原型等于父类的实例
let p1 = new exPer();
console.log(new Person().age);
console.log(p1.age);

// instanceof 判断元素是否在另一个元素的原型来链上
console.log(p1 instanceof Person);
```

优点：实例可继承的属性有：

- 实例的构造函数的属性
- 父类构造函数的属性
- 父类原型的属性
- 新实例不会继承父类实例的属性

缺点：

- 新实例无法向父类构造函数传参
- 继承单一
- 所有新实例都会共享父类实例的属性（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改）



#### 原型链继承（构造函数继承）

用 call() 和 apply() 将父类构造函数引入子类函数

```js
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
```

优点：

1. 只继承了父类构造函数的属性，没有继承父类原型的属性
2. 可以继承多个构造函数属性（call 多个）
3. 在子实例中可向父实例传参

缺点：

1. 只能继承父类构造函数的属性
2. 无法实现构造函数的复用（每次用每次都要重新调用）
3. 每个新实例都有父类构造函数的副本，臃肿



#### 构造函数继承



#### 混合继承



#### ES6 继承

ES6继承是目前比较新，并且主流的继承方式，用class定义类，用extends继承类，用super()表示父类

```js
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

const B1 = new B("mark"， 12);
B1.say();   // mark
console.log(B1);   //B { name: 'mark'， age: 12 }
```





## 说一下 JS 原生事件如何绑定

JS 原生绑定事件主要分为三种：

1. html 事件处理程序
2. DOM 0 级事件处理程序
3. DOM 1 级事件处理程序

其中：html事件现在早已不用了，就是在html各种标签上直接添加事件，类似于css的行内样式，缺点是不好维护，因为散落在标签中，也就是耦合度太高

例如：<button onclick="事件处理函数">点我</button> `<button onclick="事件处理函数">点我</button>`

第二类是DOM0级事件，目前在PC端用的还是比较多的绑定事件方式，兼容性也好，主要是先获取dom元素，然后直接给dom元素添加事件，例如：

```js
// 添加事件
let btn = document.getElementById('id');
vtn.onclick = function() {}
// 移除事件
btn.onclick = null;   
```

优点：兼容性好

缺点：只支持冒泡，不支持捕获



第三类是DOM2级事件，移动端用的比较多，也有很多优点，提供了专门的绑定和移除方法例如：

```js
let btn = document.getElementById('id');
// 绑定事件
btn.addEventListener('click'， 绑定的事件处理函数名， false);
// 移除事件
btn.removeEventListener('click'， 要移除的的事件处理函数名， false);
```

优点：支持给多个元素绑定相同的事件，支持冒泡和捕获事件机制



## 说一下 JS 原生常用的 dom 操作方法

- 查找：getElementById， getElementByTagName， getElementByClassName，getElementByName，getElementByTagNameNS，querySelector， querySelectorAll
- 插入：appendChild，insertBefore
- 删除：removeChild
- 克隆：cloneNode
- 设置和获取属性：setAttribute(“属性名”， “值”)，getAttribute(“属性名”)



## 说一下 ES6 新增特性

ES 6 新增的特性主要有：

- 新增了 let 和 const，使得 JS 有了块级作用域
- 箭头函数
- 模板字符串
- 解构赋值
- 模块的导入 import 和 导出 export / default export 
- Promise等
- 提出了 Class 的类构造方法，使语法更像面向对象语言的语法
- 还有一些数组字符串的新方法，我平时常用的就这些



## 了解的 JS 设计模式有哪些

JS设计模式有很多，但我知道的有单例模式，观察者模式：

- 单例模式：就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。
- 观察者模式: 观察者的使用场合就是：当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。

总的来说，观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。





## 说一下你对 JS 面向对象的理解

### 什么是面向对象

就是将所需要做的功能抽象成一个“对象”，然后反复调用这个对象来完成想要完成的功能。



### 如何创建一个对象

#### object 创建

```js
let box = new Object();   
box.name = 'Lee';
box.age = 100;
box.run = function () {
	return this.name + this.age;
}
```

缺点：想创建多个类似的对象，就会产生大量的代码



#### 工厂模式创建对象

```js
function createObject(name, age) {
	// 集中实例化的函数
	let obj = new Object();
	obj.name = name;
	obj.age = age;
	obj.run = function () {
		return this.name + this.age;
	}
	return obj;
}

let box1 = createObject('Lee'， 100);
let box2 = createObject('Jack'， 200);
console.log(box1.run());
console.log(box2.run());
```

优点：解决了重复实例化的问题

缺点：创建不同对象其中属性和方法都会重复建立，消耗内存，还有函数识别问题等等



#### 字面量创建对象

`let obj = {}`



#### 构造函数的方法创建对象

```js
function CreateBoxObj(name, age) {
	this.name = name;
	this.age = age;
	this.run = function () {
		return this.name + this.age;
	}
}

let box3 =new CreateBoxObj('Lee'， 100);
let box4 =new CreateBoxObj('Jack'， 200);
console.log(box3.run());
console.log(box4.run());
```

1. 当使用了构造函数，并且 new 构造函数() ，那么后台就会执行 new Object()
2. 将构造函数的作用域赋给新对象（new Object() 出来的对象），而函数体内的 this 就代表 new Object() 出来的对象
3. 执行构造函数内的代码
4. 返回新对象（后台直接返回）



### 说一下 es6 的面向对象

ES6 有个关键字 Class 来定义类，Class 中有个专门的构造器 constructor 使得构造器和类分开了，定义方法不需要用原型来定义了，直接在类中定义方法。

ES6 的继承：extends 继承，super 指向父类

1. constructor 里的 this 指向创建的实例对象
2. 方法里的 this ：谁调用方法就指向谁

```js
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
```





## 说一下 JS 数组常用方法（至少 6个）

在开发中，数组使用频率很频繁，JS数组常用方法有:push,pop,unshift,shift,splice,join,concat,forEach,filter,map,sort,some,every好多，不过都是平时开发中很常用的方法，大家可以补充一点儿es6的



## 说一下 JS 数组内置遍历方法有哪些区别

JS数组内置遍历（遍历就是循环的意思）方法主要有：

**forEach：**这个方法是为了取代for循环遍历数组的，返回值为undefined。例如：

```js
let arrInfo=[4,6,6,8,5,7,87]
arrInfo.forEach((item,index,arr)=>{})
```

其中： item代码遍历的每一项， index:代表遍历的每项的索引，arr代表数组本身

  

**filter：**是一个过滤遍历的方法，如果返回条件为true，则返回满足条件为true的新数组

```js
let arrInfo=[4,16,6,8,45,7,87]
let resultArr=arrInfo.filter((item,index,arr)=>{
  //例如返回数组每项值大于9的数组
  return item > 9
})
```

 

**map：**map方法主要对数组的复杂逻辑处理时用的多，特别是react中遍历数据，也经常用到。该方法返回一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

```js
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
```



**some：**这个some方法用于只要数组中至少存在一个满足条件的结果，返回值就为true,否则返回false，但如果用一个空数组进行测试，在任何情况下它返回的都是`false`。

```js
const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// Expected output: true
```



**every：**这个every方法用于数组中每一项都得满足条件时，才返回true，否则返回false

```js
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: true
```



**reduce：** 该方法提供一个 reducer 函数，对于数组中的每一个方法都进行一遍 reducer 方法处理。

```js
const array1 = [1, 2, 3, 4];

// 遍历 array1 数组
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => console.log(currentValue)，
  initialValue
);
```





## 说一下 JS 作用域和作用域链

JS作用域也就是JS识别变量的范围，作用域链也就是JS查找变量的顺序。可以理解为一个独立的地盘，可以理解为标识符所能生效的范围。作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。

先说作用域，JS作用域主要包括全局作用域、局部作用域和ES6的块级作用域：

- 全局作用域：也就是定义在window下的变量范围，在任何地方都可以访问
- 局部作用域：是只在函数内部定义的变量范围
- 块级作用域：简单来说用 let 和 const 在任意的代码块中定义的变量都认为是块级作用域中的变量，例如在 for 循环中用 let 定义的变量等等

注：尽量不要使用全局变量，因为容易导致全局的污染，命名冲突，对 bug 查找不利。

而所谓的作用域链就是由最内部的作用域往最外部，查找变量的过程，当一个变量在当前块级作用域中未被定义时，会向父级作用域(创建该函数的那个父级作用域)寻找。如果父级仍未找到，就会再一层一层向上寻找，直到找到全局作用域为止。这种一层一层的关系，就是作用域链 。



## 说一下 JS 事件代理（事件委托）是什么以及实现原理

JS事件代理：就是通过给父级元素（例如：ul）绑定事件，不给子级元素(例如：li)绑定事件，然后当点击子级元素时，通过事件冒泡机制在其绑定的父元素上触发事件处理函数，主要目的是为了提升性能，因为我不用给每个子级元素绑定事件，只给父级元素绑定一次就好了，：

```js
// 在原生js里面是通过event对象的target 属性实现
let ul = document.querySelector("ul");
ul.onclick = function (e) {     //e指event,事件对象
	let target = e.target || e.srcElement;        //target获取触发事件的目标(li)
	if (target.nodeName.toLowerCase() === 'li') {       //目标(li)节点名转小写字母，不转的话是大写字母
		alert(target.innerHTML)
	}
}

/* jquery：第二个参数指的是触发事件的具体目标，特别是给动态添加的元素绑定事件，这个特别起作用 */
$("ul").on("click"， "li"， function() { // 事件逻辑 })
```





## 说一下 JS 数据类型有哪些

根据 JavaScript 中的变量类型传递方式，分为基本数据类型和引用数据类型两大类七种。

基本数据类型包括Undefined、Null、Boolean、Number、String、Symbol (ES6新增)六种。（但是传言谷歌67版本中还出现了一种 bigInt。是指安全存储、操作[大整数](https://so.csdn.net/so/search?q=大整数&spm=1001.2101.3001.7020)）所以为七种

引用数据类型只有Object一种，主要包括对象、数组和函数。



### 判断数据类型

1. 判断数据类型采用 typeof 操作符，有两种语法：

```js
typeof 123;//语法一
const FG = 123;
typeof FG;//语法二
typeof(null) //返回 object;
null == undefined //返回true，因为undefined派生自null;
null === undefined //返回false。
```

2. A instanceof B可以用来判断A是否为B的实例，但它不能检测 null 和 undefined；
3. B.constructor == A可以判断A是否为B的原型，但constructor检测 Object与 instanceof不一样，还可以处理基本数据类型的检测。
	- 不过函数的 constructor 是不稳定的，这个主要体现在把类的原型进行重写，在重写的过程中很有可能出现把之前的constructor给覆盖了，这样检测出来的结果就是不准确的。
4. Object.prototype.toString.call()，最准确最常用的方法





### 基本数据类型和引用数据类型有什么区别：

1. 两者作为函数的参数进行传递时：

	- 基本数据类型传入的是数据的副本，原数据的更改不会影响传入后的数据。

	- 引用数据类型传入的是数据的引用地址，原数据的更改会影响传入后的数据。

2. 两者在内存中的存储位置：

	- 基本数据类型存储在栈中。

	- 引用数据类型在栈中存储了指针，该指针指向的数据实体存储在堆中。





## 说一下你对同步和异步的理解，以及 JS 是如何实现异步的

同步：即sync，形象的说就是代码一行行执行，前面代码和请求没有执行完，后面的代码和请求就不会被执行，

- 缺点：容易导致代码阻塞

- 优点：程序员容易理解（因为代码从上往下一行行执行，强调顺序）




异步：即async，形象的说就是代码可以在当前程序没有执行完，也可以执行后面的代码

- 缺点：程序员不易理解（因为不是按顺序执行的）

- 优点：可以解决代码阻塞问题，提升代码执行效率和性能


 JS之所以需要异步的原因在于JS是单线程运行的。常用的异步场景有：定时器、ajax请求、事件绑定。

异步解决方案（实现异步的方式）主要有三个：

1. 回调函数：将需要异步执行的函数作为回调函数执行，其缺点在于处理复杂逻辑异步逻辑时，会造成回调地狱(回调嵌套层数太多，代码结构混乱)；
2. promise：promise 对象的三种状态 pending(初始化状态), fulfilled(成功状态), rejected(失败状态)
3. generator(了解)
4. async和await（重点掌握）：基于 Promise 实现的异步函数
5. 事件监听模式：采用事件驱动的思想，当某一事件发生时触发执行异步函数，其缺点在于整个代码全部得变为事件驱动模式，难以分辨主流程
6. 发布订阅模式：当异步任务执行完成时发布消息给信号中心，其他任务通过在信号中心中订阅消息来确定自己是否开始执行；

 

### 如何实现异步的

<img src="http://images.xiaohai-hx.cn/%E5%A4%8D%E4%B9%A0%E7%AC%94%E8%AE%B0/%E9%9D%A2%E8%AF%95%E9%A2%98/image-20230507175018470.png" alt="image-20230507175018470" style="zoom:67%;" />





## 数组去重

1. 第一种：利用 ES6 的 set 实现：`[...new Set(arr)]`
2. 第二种：



## 深拷贝，浅拷贝

对象浅拷贝可以理解为改变一个对象属性值，另一个对象属性也会发生改变，即互相影响

对象深拷贝即就是说改变一个对象属性，另一个对象属性值不会发生改变

深拷贝：

- 通过 JSON.stringify 和 JSON.parse 实现

	```js
	let obj = {name: 'make'};
	let obj2 = JSON.parse(JSON.stringify(obj));
	console.log(obj === obj2);    // false
	```

- 通过递归实现

	```js
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
	
	/* {                                         
	  name: 'result',                         
	  nation: '中国',                         
	  birthPlaces: [ '北京', '上海', '广州' ],
	  skinColor: 'yellow',                    
	  friends: [ 'sk', 'ls' ]                 
	}  */
	```

浅拷贝：

- Object.assign()：需要注意在目标对象只有一层的时候是深拷贝

	```js
	const target = { a: 1, b: 2 };
	const source = { b: 4, c: 5 };
	
	const returnedTarget = Object.assign(target, source);
	
	console.log(target);
	// Expected output: Object { a: 1, b: 4, c: 5 }
	
	console.log(returnedTarget === target);
	// Expected output: true
	```

- 扩展运算符

	```js
	// 浅拷贝
	const source = {a: 1, b: 2};
	const target = {...source};
	console.log(target)
	```

	



## 地址栏解析

```js
function getUrlKey(url) {
	let params = {};
	let arr = url.split('?');
	if (arr.length <= 1) return;
	arr = arr[1].split('&');
	for (let i = 0; i < arr.length; i++) {
		const query = arr[i].split('=');
		params[query[0]] = query[1];
	}
	return params;
}
let url = "https://images.xiaohai-hx.cn?id=1&article=2";
console.log(getUrlKey(url));
```



## 如何排错



## 兼容性处理

```js
let EventUtil={

	addHandler:function(element,type,handler){ //添加事件
		if(element.addEventListener){
			element.addEventListener(type,handler,false);  //使用DOM2级方法添加事件
		}else if(element.attachEvent){                    //使用IE方法添加事件
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;          //使用DOM0级方法添加事件
		}
	},

	removeHandler:function(element,type,handler){  //取消事件
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},

	getEvent:function(event){  //使用这个方法跨浏览器取得event对象
		return event?event:window.event;
	},

	getTarget:function(event){  //返回事件的实际目标
		return event.target||event.srcElement;
	},

	preventDefault:function(event){   //阻止事件的默认行为
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},

	stopPropagation:function(event){  //立即停止事件在DOM中的传播
		//避免触发注册在document.body上面的事件处理程序
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
}
```



## 用 forEach 遍历 NodeList，但是ie报错“NodeList是对象不支持 forEach 属性”





## ['1', '2', '3'].map(parseInt) 输出什么

parseInt（str,radix）：解析一个字符串，并返回十进制整数，第一个参数 str，即要解析的字符串，第二个参数 radix，基数（进制），范围2-36

未传递的 radix 参数：当 str 以 ‘0x’开头，则按照 16进制处理，当 str 以 “0” 开头，则按照 8 进制处理（但 es5 取消了），其他情况按照十进制处理

```js
console.log(['1', '2', '3'].map(parseInt));    // [ 1, NaN, NaN ]

['1', '2', '3'].map(function (item, index) {
   return parseInt(item, index);
   // parseInt('1', 0)        // 这里按照 radix 参数不存在处理  // 1
   // parseInt('2', 1)    // NaN
   // parseInt('3', 2)    // NaN
});

console.log(parseInt('1', 2));    // 1
console.log(parseInt('3', 2));    // NaN
```





## 说出下面代码的执行结果

```js
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

// var 定义：4 3
// let 定义：4 1
```

这个问题可以转化为：书写在块语句中的代码是如何解析的

我们都知道 JS 中，在 ES6 之前作⽤域分为全局作⽤域 和函数作⽤域 ，函数作⽤域也是块作⽤域 的⼀种：这⾥所讲的**块作⽤域**的情况是指 { } 单独应⽤的时候

1. 当在块语句内引用的时候
	- 将函数写在块语句中，命名函数只会预解析，不会预赋值，只有在执行块语句的时候，赋值函数
	- 如果块语句中出现变量和函数名相同的情况时，执行块语句，最后打印的是正常顺序赋值的结果。
	- 使用 ES6 语法 let 和 const 的时候遵从 ES6 对应规则的变量访问机制，定义机制，赋值机制
2. 当在块语句外引用的时候
	- 得到的变量是**最后一个重名函数上面的赋值变量的结果**，如果上面没有重名的赋值变量，那么得到的是就是这个函数
	- 在块语句中，不管有几个同名函数，都会被最后一个覆盖掉。
3. 总结一句话，**变量名与函数同名时，块作用域中最后一个同名函数上面的变量赋值将会被挤出块外**。



## setTimeout(fn,100);100毫秒是如何权衡的

100ms指的是将回调函数加入到任务队列所花的时间。至于具体什么时候执行，需要看主线程的执行栈中是否还有任务在执行。

```js
(async function hello() {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, 5000);
	})
	setTimeout(() => {
		console.log('hello');
	}, 100)
})();
// 等待了“很长时间”才返回结果
```



## 定时器实现动画的最佳时间：16.6ms

大多数电脑显示器的刷新频率是60HZ，大概相当于每秒钟重绘60次。因此，最平滑的动画效的最佳循环间隔是1000ms/60，约等于16.6ms



## setInterval存在的问题

定时器的代码执行部分不断的被调入任务队列中，**如果定时器的执行时间比间隔时间长，最终可能导致定时器堆叠在一起执行。**

js引擎为了解决这个问题，采用的方式是若**任务队列中存在这个定期器，则不会将新的定时器放入任务队列**，这样做的**弊端是可能导致某些间隔被跳过**。

解决方法：

循环调用setTimeout来实现setInterval:（即用setTimeout来实现setInterval）

```js
setTimeout(function fn(){
    ...
	setTimeout(fn,delay)
},delay)
```



## requestAnimationFrame

**js动画的要求：**一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化。

**用定时器实现js动画存在的问题：** 定时器回调函数执行的时机不精确。定时器中的延时指的是将回调函数加入到任务队列所需花的时间，如果主线程中还有任务在执行，就不能确保回调函数在放入队列后马上执行，这就造成了执行时机的不精确。

requestAnimationFrame:

- 特点：requestAnimationFrame采用系统时间间隔，保证了最佳的绘制效率。

- 使用方法：requestAnimationFrame接收一个回调函数，这个回调函数会在下一次浏览器重绘之前调用。



## 分别setInterval,setTimeout,requestAnimationFrame制作有个简单的进度条

1. setInterval：

```html
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	<div style="width: 0; height: 20px; background-color: orangered;"></div>
	<script>
		let process = document.getElementsByTagName('div')[0];
		let timer = setInterval(() => {
			if (parseInt(process.style.width) >= 100) return clearInterval(timer);
			console.log(process.style.width);
			process.style.width = parseInt(process.style.width) +1 + 'px';
			process.innerText = parseInt(process.style.width) + '%';
		}, 10);
	</script>
</body>
</html>
```

2. setTimeout：

```html
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
<div style="width: 0; height: 20px; background-color: orangered;"></div>
<script>
	let process = document.getElementsByTagName('div')[0];
	let timer = setTimeout(function fn() {
		if (parseInt(process.style.width) < 100) {
			console.log(process.style.width);
			process.style.width = parseInt(process.style.width) +1 + 'px';
			process.innerText = parseInt(process.style.width) + '%';
			timer = setTimeout(fn, 10);
		} else {
			return clearTimeout(timer);
		}
	}, 10);
</script>
</body>
</html>
```

3. requestAnimationFrame:类似于setTimeout,需要一次次的调用：

```html
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
<div style="width: 0; height: 20px; background-color: orangered;"></div>
<script>
	let process = document.getElementsByTagName('div')[0];
	let timer = requestAnimationFrame(function fn() {
		if (parseInt(process.style.width) < 100) {
			console.log(process.style.width);
			process.style.width = parseInt(process.style.width) +1 + 'px';
			process.innerText = parseInt(process.style.width) + '%';
			requestAnimationFrame(fn);
		} else {
			cancelAnimationFrame(timer);
		}
	});
</script>
</body>
</html>
```



## js中的轮播实现原理？假如一个页面上有两个轮播，你会怎么实现？

1. 让图片存在一个数组中，然后将最后一张图片重复添加在数组的头部，将第一张图片重复添加在数组的最后。
2. 然后准备一个只能显示一张图片的盒子，对盒子做溢出隐藏处理。

3. 通过定时器增减索引，显示对应的图片，实现轮播功能。

4. 如果有两个轮播，可封装一个轮播组件，将需要轮播的图片作为参数传递



## 数组去重

https://segmentfault.com/a/1190000016418021

```js
// Set方法：将数组先转化为Set再转化为数组
function arrayToSet(array) {
	// 通过 for-of
/*	let middle = new Set(array);
	let newArray = [];
	for (let item of middle) {
		newArray.push(item);
	}*/

	// 通过扩展运算符
	// let newArray = [...new Set(array)];

	// 通过 Array.from 浅拷贝一个可迭代对象
	let newArray = Array.from(new Set(array));

	return newArray;
}

// 不断去寻找一个元素，如果没有则加入新数组，否则就丢弃
function remove(array) {
	let newArray = [];
	// 通过 includes:includes底层使用 sameValueZero() 比较
/*	array.forEach(item => {
		if (!newArray.includes(item)) {
			newArray.push(item);
		}
	})*/

	// 通过map 的 has和set 方法（属性名不可重复）
/*	const map = new Map();
	array.forEach(item => {
		if (!map.has(item)) {
			map.set(item, true);
			newArray.push(item);
		}
	})*/

	// 利用对象属性名不可重复
/*	const obj = {};
	array.forEach(item => {
		if (!obj[item]) {
			obj[item] = true;
			newArray.push(item);
		}
	})*/

	// reduce + includes
	/*newArray = array.reduce((pre, cur) => {
		if (pre.includes(cur) === false) {
			pre.push(cur);
		}
		return pre;
	}, []);*/

	// hasOwnProperty方法可以判断类型两个{},{}
	//  typeof {}+{}为object[object Object]，判断有没有空对象，已经有的话return false，没有就作为对象的属性加进去，值为true
/*	const obj = {};
	newArray = array.filter(item => {
		        return obj.hasOwnProperty(typeof item + item) ? false : obj[typeof item +item] = true
		    })*/

	// 下列方法无法判断NaN和NaN重复的情况

	// 过滤器 filter方法+indexOf()方法，indexOf会返回第一个找到的索引，如果当前数值之前出现过，
	//    则indexOf返回的索引恒为之前的那个数与当前数值的索引不一致，故可以去重
/*	    newArray = array.filter((item, index) => {
	        return array.indexOf(item) === index;
	    })*/

	// indexof
/*	    array.forEach(item => {
	        if(newArray.indexOf(item) === -1){
	            newArray.push(item);
	        }
	    })*/


	// 双循环+splice,比较相邻两个数如果重复用splice删除
/*	    let len = array.length;
	    for(let i = 0; i < len - 1; i++){
	        for(let j = i + 1; j < len; j++){
	            if(array[i] === array[j]){
	                array.splice(j,1);
	                len--;
	                j--;
	            }
	        }
	    }
	    return array;*/


	// 单循环+sort+splice
/*	let len = array.length;
	array = array.sort();
	for(let i=0;i<len-1;i++){
			if(array[i]===array[i+1]){
				array.splice(i+1,1);
				len--;
			}
	}
	return array;*/

	return newArray;
}

console.log(remove([1, 2, 2, 3, -1, 1]));

```



## let、const 的区别是什么

共同点：都是只在声明所在的块级作用域内有效。

不同点：

- let 声明的变量可以改变，值和类型都可以改变，没有限制

- const 声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。对于复合类型的变量，如数组和对象，变量名不指向数据，而是指向数据所在的地址。const 命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，如果想让定义的对象或数组的内部数据也不能够修改和改变，可以使用object.freeze(names)进行冻结，这样为对象添加新属性就不起作用。除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数：

	```js
	let constantize = (obj) => {
		Object.freeze(obj);
		Object.keys(obj).forEach( (key) => {
			if ( typeof obj[key] === 'object' ) {
				constantize( obj[key] );
			}
		});
	};
	```

	

## 什么是执行上下文和执行栈，作用域和执行上下文的区别是什么

- 变量或函数的执行上下文，决定了它们的行为以及可以访问哪些数据。每个上下文都有一个关联的变量对象，而这个上下文中定义的所有变量和函数都存在于这个对象上(如DOM中全局上下文关联的便是window对象)。
- 每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个执行栈中。在函数执行完之后，执行栈会弹出该函数上下文，在其上的所有变量和函数都会被销毁，并将控制权返还给之前的执行上下文。 JS的执行流就是通过这个执行栈进行控制的。

区别：

1. 函数的执行上下文只在函数被调用时生成，而其作用域在创建时已经生成；
2. 函数的作用域会包含若干个执行上下文(有可能是零个，当函数未被调用时)。



## this 指向的各种情况都有什么，如何改变 this 指针的指向

this的指向只有在调用时才能被确定，因为this是执行上下文的一部分。

1. 全局作用域中的函数，其内部 this 指向 window：

	```js
	// 以下代码需要放在HTML中，这样才会指向 window，否则 js 中指向的是 global，出来的是 undefined，并且如果在HTML中改为let，也出现的是undefined
	var a = 1;
	(function fn() {
		console.log(this.a);
	})();
	```

2. 对象内部的函数：其内部 this 指向对象本身：

	```js
	var a = 1;
	var obj = {
		a:2,
		fn:function(){
			console.log(this.a)
		}
	}
	```

3. 构造函数：其内部 this 指向生成的实例：

	```js
	function createP(name,age){
		this.name = name //this.name指向P
		this.age = age //this.age指向P
	}
	let p = new createP("老李",46)
	```

4. 由 apply，bind，call 改造的函数，其 this 指向第一个参数：

	```js
	function add(c,d){
		return this.a + this.b + c + d
	}
	var o = {a:1, b:2};
	console.log(add.call(o, 5, 7)); //输出15
	```

5. 箭头函数：箭头函数没有自己的this，看其外层的是否有函数，如果有，外层函数的 this就是内部箭头函数的this，如果没有，则this是window



**改变this 指向：**使用apply、call、bind方法改变this指向(并不会改变函数的作用域)，区别如下：

- 三者第一个参数都是this要指向的对象，也就是想指定的上下文，上下文就是指调用函数的那个对象(没有就指向全局window)
- apply 的第二个参数都是数组，call和 bind 接收多个参数并用逗号隔开
- apply和call只对原函数做改动，bind会返回新的函数(要生效还得再调用一次)，即后面还要再跟一个()
- 根据上面所说，就是 apply 和 call 会立即生效，而 bind 不会立即生效，还要等待调用才行



## 怎么理解 Promise 对象

特点：

1. 对象的状态不受外界影响。Promise对象共有三种状态pending、fulfilled、rejected。状态值只会被异步结果决定，其他任何操作无法改变。
2. 状态一旦成型，就不会再变，且任何时候都可得到这个结果。状态值会由 pending 变为 ulfilled 或 rejected，这时即为resolved。

缺点：

1. Promise一旦执行便无法被取消
2. 不可设置回调函数，其内部发生的错误无法捕获
3. 当处于pending状态时，无法得知其具体发展到了哪个阶段





## 怎么理解宏任务和微任务

- 宏任务有：script(整体代码)、setTimeout、setInterval、I/O、页面渲染（DOM）、Ajax；
- 微任务有：Promise.then、Object.observe、MutationObserver、async/await。

执行顺序大致如下（不一定）：

第一种说法：主线程任务——>宏任务——>微任务——>微任务里的宏任务——>.......——>直到任务全部完成（因为整个JS代码包括变量声明、方法的实现都是包括在宏任务中的）

第二种说法：微任务比宏任务的执行时间要早（在事件循环当中会有事件队列，是一个栈，在栈中会将当前的现有的宏任务都执行完，然后再执行宏任务下的微任务，再执行之后的宏任务，所以会有先微后宏的概念）

JS是单线程的， 所以为了避免在时间循环中的一些高耗时操作带来的进程阻塞，推出了两种任务模式：同步模式和异步模式

在异步模式下，创建异步任务主要分为宏任务和微任务两种，ES6 规范中，宏任务称为 Task，微任务称为 Jobs



## require / import 之间的区别

1. require是CommonJS语法，import是ES6语法；
2. require只在后端服务器支持，import在高版本浏览器及Node中都可以支持；
3. require引入的是原始导出值的复制，import则是导出值的引用；
4. require时运行时动态加载，import是静态编译；
5. require调用时默认不是严格模式，import则默认调用严格模式.



## 解释一下变量的提升

变量的提升是JavaScript的默认行为，这意味着将所有变量声明移动到当前作用域的顶部，并且可以在声明之前使用变量。初始化不会被提升，提升仅作用于变量的声明。



## 如何理解高阶函数

JavaScript中的一切都是对象，包括函数。我们可以将变量作为参数传递给函数，函数也是如此。我们调用接收和或返回另一个函数称为高阶函数的函数。



## 如何区分声明函数和表达式函数

```js
// 声明函数
function hello() {
	return "HELLO"
}
// 表达式函数 
var h1 = function hello() {
	return "HELLO"
}
```

两个函数将在不同的时期定义。在解析期间定义声明，在运行时定义表达式;因此，如果我们控制台打印 h1，它将显示`f hello() ...`。





1.es5和es6的区别，说一下你所知道的es6

2.var、let、const之间的区别

3.使用箭头函数应注意什么？

4.ES6的模板字符串有哪些新特性？并实现一个类模板字符串的功能

5.介绍下 Set、Map的区别？

6.ECMAScript 6 怎么写 class ，为何会出现 class？

7.Promise构造函数是同步执行还是异步执行，那么 then 方法呢？

8.setTimeout、Promise、Async/Await 的区别

9.promise有几种状态，什么时候会进入catch？

10.使用结构赋值，实现两个变量的值的交换

11.Promise 中reject 和 catch 处理上有什么区别

12.理解 async/await以及对Generator的优势

参考资料



## JS 拖动及拖拽功能的实现

### 拖动功能的实现

**前置条件：**

1. 拖动事件的三个过程：鼠标按下mousedown,鼠标移动mousemove,鼠标松开mouseup，鼠标按下后执行mousemove事件。

2. 盒子采用绝对定位，通过left和top属性来修改位置。



**方法一：（直接根据鼠标移动的距离确定元素移动的距离）**

1. 鼠标的坐标通过clientX,clientY获取：
2. 盒子的定位信息：鼠标移动时候的坐标-鼠标按下去时候的坐标+元素初始情况下的offetLeft.

**方法二：**

1. 鼠标的坐标通过pageX,pageY获取：
2. 先计算鼠标在盒子中的坐标，这是不变的。然后在mousemove的时候通过pageX和pageY减去在盒子中的坐标计算出盒子边缘应该修改为的偏移量。



### 拖拽功能的实现

使用html5提供的拖拽API（Drag 和 drop）

拖拽功能涉及的基本事件：

dragstart:在开始拖放元素时触发。（事件源：被拖拽的元素）

这一步需要做的是获取被拖拽元素的id。拖拽事件对象中的dataTransfer属性是专门用来存储拖动过程中的数据的。ev.dataTransfer.setData("key",value)
dragover：在被拖放在某元素内移动时触发。（事件源：目标元素）

阻止dragover的默认事件（不允许被拖拽）
drop：目标元素完全接受被拖放元素时触发。（事件源：目标元素）

阻止drop的默认事件（以链接的形式打开），然后获取之前保存的元素的id ev.dataTransfer.getData("key")，然后将该元素添加到目标元素中。





