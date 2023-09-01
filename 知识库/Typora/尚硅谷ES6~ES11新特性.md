# 网站地址

【尚硅谷Web前端ES6教程，涵盖ES6-ES11】 https://www.bilibili.com/video/BV1uK411H7on/?share_source=copy_web&vd_source=534cd597c2fb4b381da3354013fd5304



# ES6 新特性




## 内容基本介绍

1. **ES介绍**

	ES 全称是 RCMAscript，是脚本语言的规范，而平时经常编写的 JavaScript，是 ECMAscript的一种实现，所以ES新特性其实是指JavaScript的新特性。

2. **为什么要学习ES新特性**

	1. 语法简洁
	2. 框架开发应用（vue，react、regular）
	3. 前端开发职位要求

3. **前置知识**

	1. JavaScript基础语法
	2. nodejs和 ajax

4. **课程特点**

	~~

	

##  基础名词和兼容性

1. 一些基本名词，如：ECMA、ECMA标准……

2. 为什么要把 ES6 单独拿出来讲？

	​         因为  ES6 的改动最大，增加了很多的语法新特性，具有里程碑的意义。



##  声明变量及声明特性

1. **使用 let 声明变量**
	- 可以同时声明单给变量或多个变量
	- 不能重复声明（防止变量污染）
	- 块级作用域（函数作用域、全局作用域、eval作用域（ES5严格模式下））、变量只在 { } 内部生效，出去则为 undefined
	- 不存在变量提升 报错
	- 不影响作用域链的效果

2. **使用 const 声明变量**
	- 定义常量
	- 一定要赋初始值
	- 一般常量使用大写（潜规则）
	- 常量的值不能修改
	- 块级作用域
	- 对于数组和对象的元素修改，不算做对常量的修改，不会报错：因为常量保存的是地址，地址不会变化，所以定义数组或者对象使用 const 较为稳妥，因为可以避免误操作



##  变量的解构赋值

1. ES6 允许按照一定模式从数组和对象中提取值，对变量进行赋值，这被称为**解构赋值。**
2. 数组和对象的解构赋值（代码：02）
3. 对应的解构变量名应该和获取的方法和属性名称（对象）相对应。



## 模板字符串

1. ES6 引入新的声明字符串的方式 `` (反引号)
1. 反引号的内容可以直接换行，但是单双引号的内容只能包含 “\n”等转义字符，直接换行会报错
1. 变量拼接 ，使用 ${ } 的固定方式



## 对象的简写形式

1. ES6 允许在大括号里面直接写入变量和函数，作为对象的属性和方法。写起来更加简洁。
2. 省略值，只放属性名（必须同名情况下）
3. 内部方法可以省略（：function）



## 箭头函数

1. ES6 允许使用 “箭头” 【=>】定义函数
2. **箭头函数中：this 是静态的，this 始终指向函数声明时所在作用域下的 this 的值，而普通的函数的 this 值是动态发生改变的**（**往上找最开始 this 的值，父级**）
3. 函数名.call()  方法可以改变 this 的指向（*调用函数并改变this的指向*）
4. 箭头函数不能作为构造实例化对象
5. 箭头函数不能使用 arguments 变量（*arguments保存实参*）
6. 箭头函数的简写
	- 省略小括号，当形参有且只有一个的时候
	- 省略花括号，当代码只有一条语句的时候，需要同时省略 return， 且语句执行结果就为函数的返回值
7. 箭头函数适合与 this 无关的回调函数，定时器， 数组的方法回调
8. 箭头函数不适合与 this 有关的回调函数， DOM事件回调， 对象的方法



##  函数参数的默认值设置

1. ES6 允许给函数参数（形参）赋初始值（就默认值）
2. 具有形参初始值的参数一般位置要靠后（潜规则）
3. 形参默认值可以和解构赋值相结合（此时因为参数名称相对应可以不用在意形参位置



##  rest参数

1. ES6 引入了 rest 参数， 用于获取函数的实参，用来代替 arguments
2. ES5 获取实参的方式（以对象的方式输出）：arguments
3. ES6 新增的 rest 参数（以数组的方式输出）：
	- 形式：…args
	- rest 参数必须要放在形参列表的最后（此时args输出的 是除了前面参数接收过后的剩余的实参列表）



##  扩展运算符

[ … ] 扩展运算符能够将 数组 转换为逗号分隔的 参数序列

- [“xxx”, “xxx”, “xxx”] 数组转化为   =>    “xxx”, “xxx”, “xxx”
- 在传递参数时使用    
- 可使用的地方：
	- 数组的合并
	- 数组的克隆（引用数据类型，浅拷贝）
	- 将伪数组转换为真正的数组



##  symbol

1. ES6 引入了一种新的原始数据类型 Symbol， **表示独一无二的值**。它是 JavaScript 语言的第七种数据类型， 是一种类似于字符串的数据类型。

2. 特点：

	- Symbol 的 值是唯一的，用来解决命名冲突的问题
	- Symbol 值不能与其他数据进行运算（加减乘除、字符串拼接、比较）
	- Symbol 定义的对象属性不能使用 for … in 循环遍历，但是可以使用 Reflect.ownKeys 来获取对象的所有键名

3. 其他变量类型：undefined、string、object、null number（NaN）、boolean

4. 通过 Symbol() 为对象添加独一无二的方法和属性

5. 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，专项语言内部使用的方法。

	

|          内置值           |                             说明                             |
| :-----------------------: | :----------------------------------------------------------: |
|    Symbol.hasInstance     | 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法 |
| Symbol.isConcatSpreadable | 对象的 Symbol.isConcatSpreadable 属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat() 时，是否可以展开 |
|    Symbol.unscopables     |  该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除  |
|       Symbol.match        | 当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值 |
|      Symbol.replace       |  当该对象被 str. replace(myObject) 时，会返回该方法的返回值  |
|       Symbol.search       | 当该对象被 str.search(myObject) 方法调用时，会返回该方法的返回值 |
|       Symbol.split        | 当该对象被 str.split(myObject) 方法调用时，会返回该方法的返回值 |
|      Symbol.iterator      | 对象进行 for… of 循环时，会调用 Symbol.iterator() 方法，返回该对象的默认遍历器 |
|    Symbol.toPrimitive     | 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的 原始类型值 |
|    Symbol.toStringTag     |     在该对象上面调用 toString 方法时，返回该方法的返回值     |
|      Symbol.species       |                 创建衍生对象时，会使用该属性                 |

6. 可以通过第一个内置值，自定义类型检测的返回值是true 还是 false



## 迭代器

1. 迭代器（iterator) 是一种接口，为各种不同的 数据结构提供统一的访问机制，任何数据结构只要部署 IT二胺投入 接口，就可以完成遍历操作。

2. ES6 创造了一种新的遍历命令 for…of  循环，iterator 接口主要提供 for … of 消费

3. 原生 JS 具有 iterator 接口的数据（可用 for of 遍历）（**对象中有 Symbol.iterator 这个属性 就可以进行 遍历 for of**）

	- array
	- Arguments
	- Set
	- Map
	- String
	- TypedArray
	- NodeList

4. **工作原理**（看代码10）

	​	a.  创建一个指针对象，指向当前数据结构的起始位置

	​	b.  第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员

	​	c.  接下来不断调用 next 方法，指针一直向后移动，直到指向最后一个成员

	​	d.  每调用 next 方法返回一个包含 value 和 done 属性的对象

	（注意：需要自定义遍历数据时要想到迭代器）



## 生成器

1. 生成器函数是 ES6 提供的一种**异步编程解决方案**， 语法行为与传统函数完全不同
2. 纯回调函数（不会直接输出，而是返回的对象，调用里面的 next() 方法才能输出
3. yield ：分隔符，代码块的分隔符，每一个 yield 上面为一段代码块
4. 生成器函数参数的传递：
	1. 每调用一次 next() 方法返回的就是 当前这一段代码的 yield 返回的结果
	2. next() 也可以传参，第二次调用 next(“xxx”) 传入的参数作为第一次 yield 代码整体的执行结果



## promise

promise 是 ES6 引入的异步编程的新解决方案，语法上 promise 是一个构造函数， 用来封装异步操作并作为获取其成功或失败的结果。

1. Promise 构造函数：Promise （excutor）{}
2. Promise. prototype. then 方法
	- 调用 promise 对象的 then 方法: 处理成功或失败的结果。如果p的状态为 true，调用第一个函数，false调用第二个函数
	- 调用then 方法， then方法的返回结果是 Promise对象， 对象状态由回调函数的执行结果决定
	- 如果回调函数中返回的结果是 非Promise 类型的属性， 状态为成功， 返回值为对象的成功地值（没有显式return 默认返回 undefined）
	- 抛出错误异常  状态值为 rejeced，错误值为抛出的异常
	- then 方法可以链式调用（**解决“回调地狱”的问题：函数一层层回调**）
	- 可以只写成功时的处理，不写失败的处理
3. Promise. prototype. catch 方法
	- 只用来捕捉 rejected 状态下的信号而编写处理函数



## Set

ES6 提供了新的数据结构 Set（集合）。它类似于数组，但**成员的值都是唯一的（去重）**，集合实现了 iterator 接口，所以可以使用扩展运算符[ … ] 和 [ for … of … ] 进行遍历，集合的属性和方法：

| 属性和方法 |                    说明                     |
| :--------: | :-----------------------------------------: |
|    size    |             返回集合的元素个数              |
|    add     |        增加一个新元素，返回当前集合         |
|   delete   |          删除元素，返回 boolean 值          |
|    has     | 检测集合中是否包含某个元素，返回 Boolean 值 |

- 数组去重
- 交集
- 并集
- 差集



## Map 的介绍与 API

ES6 提供了 Map 数据结构。他类似于对象，也是键值对的集合。但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当做键。Map也实现了 iterator 接口，所以可以使用扩展运算符 [ … ] 和 **[  for … of … ]** 进行遍历，Map 的属性和方法：

| 属性和方法 |                           说明                           |
| :--------: | :------------------------------------------------------: |
|    size    |                   返回 Map 的元素个数                    |
|    set     | 增加一个新元素，返回当前 Map（解手两个参数，键名，键值） |
|    get     |                    返回键名对象的键值                    |
|    has     |       检测 Map 中是否包含某个元素，返回 Boolean 值       |
|   clear    |                 清空集合，返回 undefined                 |
|   delete   |                       删除某个元素                       |



## class类

ES6 提供了更接近传统语言的写法，引入了 Class（类）的概念，作为对象的模板。通过 Class 关键字，可以定义类。基本上，ES6 的 class 可以看做只是一个语法糖，他的绝大部分功能，ES5 都可以做到，新的 Class 写法知识让对象原型的写法更加清晰、更像面向对象编程的语法而已。

知识点：

1. class 声明类
2. constructor 定义构造函数初始化
3. extends 继承父类
4. super 调用父级构造方法
5. static 定义静态方法和属性
6. 父类方法可以重写（在子类中可以写父类中的同名函数进行重写方法，会调用子类的方法，但是不能在子类函数中写 super() 去调用父类的同名方法，会报错）

- ES5 使用构造函数的方法，ES6新增 class 方法

- class 中的静态成员：（属性或方法）是属于类的，但是不属于实例对象：**声明方式：static 关键字声明**

- ES5使用构造函数实现继承

7. get  和 set 使用
	- get 用来获取，set 用来修改设置
	- 使用场景：
		- get 通常用来在内部封装函数来动态获取某些会经常变化的值
		- set 可以用来在某些需要修改属性的时候封装函数来判断新的值是否满足要求，如需要字符串却得到整型，就不予赋值，否则可以赋值（修改值）



##  数值扩展

1. Number. EPSILON 是 JavaScript 表示的最小精度，值接近于 2.220446049250313e-16 ，**适用于在浮点数比较中，当差值小于该最小精度时可以认为这两个值是相等的**
2. 二进制数值（0b）开头、八进制数值（0o）开头、十六进制（0x）开头
3. Number.isFinite ：检测一个数值是否为有限数
4. Number.isNaN ：检测一个数值是否为  NaN
5. Number. parseInt：将字符串转化为整数，只转化数值部分、且只转化从开头的一段连续的数值，否则报错
6. Number. parseFloat：将字符串转化为浮点数，只转化数值部分、且只转化从开头的一段连续的数值，否则报错
7. Number.isInteger：判断一个数是否为整数
8. Math.trunc ：将数字的小数部分抹掉
9. Math.sign ：判断一个数到底为正数 负数 还是零（返回1：整数； 返回0：零；返回-1：负数）



## 对象方法扩展

1. object.is：判断两个值是否完全相等
	- 功能和 === 相同，但是也有不同，如 对于两个 NaN 的比较，会表现为 true， 但是 \=\== 却表现为 false
2. Object. assign：对象的合并
	- 会用第二个参数中的值覆盖第一个参数中的值（同名的变量或只在第二个参数中有的变量覆盖第一个参数）
	- 只在第一个参数中出现的变量不变
3. Object.setPrototypeOf：设置原型对象
	- 为第一个参数设置原型：Object.setPrototypeOf（参数1， 参数2）
	- 不推荐使用，在创建对象的时候就设置原型较好
4. Object.getPrototypeOf：获取原型对象
	- Object.getPrototypeOf（参数1）



## 模块化介绍、优势及产品

1. 模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小文件组合起来

2. 模块化的优势：

	1. 防止命名冲突
	2. 代码复用
	3. 高维护性

3. ES6 之前的模块化规范产品（主要由社区提供）：

	1. CommonJS =>  NodeJS 、 Browserify
	2. AMD  =>  requireJS
	3. CMD  => seaJS

4. ES6 模块化语法

	1. 模块功能主要由两个命令构成： export 和 import
	2. export 命令用于规定模块的对外接口
	3. import 命令用于输入其他模块提供的功能

5. 使用 ES6 模块化 引入模块

	1. 在变量前使用 export 暴露数据（分别暴露）

	2. 在接收的 HTML 页面 ，\<script>标签的type属性设置为 module，使用 import 语句

	3. 统一暴露，在最后使用一个 export 暴露所有的变量

	4. 默认暴露：export default

	5. 引入模块数据的语法方式

		- 通用的导入方式
		- 解构赋值的形式（注意起别名的问题，因为所有的数值都在 default 中存储，所以只能导入 default 并起别名）
		- 简便形式（只针对默认暴露）
		- **app.js :入口文件，可以将引入模块语句写在 js文件中，在 \<script>标签中同时写入 src 和 type 即可。** （在项目中一般不这样引入，会使用工具将js代码转化为 ES5 兼容的形式再引入）==（***看 下文 babel***）==

	6. ES6 模块化规范引入NPM包

		```javascript
		npm i jquery   // 安装 jQuery 模块
		import $ from 'jquery'   // ES6语法，相当于 const $ = inquire('jquery')
		$('body').css('bgcolor', 'pink');   // 修改背景颜色
		```



## babel

- babel 是一个小工具，可以将最新的 JavaScript 语法转换为 ES5兼容的可识别的语法，可以更方便的导入模块（打包后引入在html文件中）

- 步骤：

1. 安装工具：babel-cli、babel-preset-env、browerify
	- babel-cli：babel 的一个命令行工具
	- babel-preset-env：预售包，将最新的 ECMAscript 语法转换为 ES5 的一个语法
	- browerify：打包工具（项目中一般使用 webpack，但是需要进行配置）
2. 安装（都在终端进行）：
	1. npm init --yes：初始化nodeJS环境
	2. 使用 npm 安装这些包
	3. 局部安装使用npx babel、全局安装使用 直接babel
	4. 命令<code>npx babel xxx(js文件的文件夹) -d xxx(转化后文件保存到的文件夹) --presets=babel-preset-env</code>, 结束后会发现新的文件夹，但是还是不能直接引入，因为引入后会报错“<code>require is not defined</code>”
	5. 打包： <code>npx browserify xxx(转化后文件保存到的文件夹)/app.js(模块入口文件) -o xxx(打包后的新文件路径及名称)</code>



# ES7新特性



## 数组新方法:Array.prototype.includes

includes ：方法用来检测数组中是否包含某个元素，返回布尔类型值



## 指数操作符

在ES7 中引入指数运算符 **， 用来实现幂运算，功能与 Math.pow 结果相同





# ES8新特性



## async 和 await

async 和 await 两种语法结合可以让异步代码像同步代码一样

1. async 函数
	- 声明，在 function（）{}，前面加 async，就变成了一个 async 函数
	- async 函数的返回值为 promise 对象
		- 如果返回值不是一个 promise 对象，那么 async 函数就会成功返回一个 promise 对象
			- 比如：抛出一个错误，就会返回错误的 promise 对象， 状态为：rejected，值：抛出的错误
			- 比如：返回一个字符串，就会返回一个成功地 promise对象，状态为：resolved，值：返回的字符串
		- 如果返回值是一个 promise 对象，那么 async 函数返回的 promise 对象（自身的值）由返回值决定 
		  - 比如：return 一个成功地 promise 对象，那么 async 函数的值就是一个：状态为：resloved，值：return 返回的 promise 对象的 reslove 返回的值
		  - 比如：return 一个失败地 promise 对象，那么 async 函数的值就是一个：状态为：rejected，值：return 返回的 promise 对象的 reject 返回的值
	- promise 对象的结果由 async 函数执行的返回值决定
2. await 表达式
	- await 必须写在 async 函数中
	- await 右侧的表达式一般为 promise 对象
	- **await 返回的是 promise 成功的值**（**值：数据**；状态：resloved 和 rejected）
	- await 的 promise 失败了，就会抛出异常，需要通过 try … with  捕获处理



## 对象方法扩展

1. Object.values() ：方法返回一个给定对象的所有可枚举属性值的数组（返回对象的键值）
2. Object.key() ：方法返回一个给定对象的所有可枚举属性的数组（返回对象的键名）
3. **Object.entries() ：方法返回一个给定对象自身可遍历属性 [ key, value ] 的数组**（ES10 里面的 fromEntries）
4. Object.getOwnPropertyDescriptor() ：方法返回指定对象所有自身属性的描述对象



# ES9新特性



## 扩展运算符和 rest参数

Rest 参数与 spread 扩展运算符在 ES6 中已经引入，不过 ES6 中只针对数组，在ES9 中为对象提供了向数组一样的 rest 参数 和扩展运算符

1. 可以通过扩展运算符将函数接收的多个参数放在一个形参中
2. 可以通过扩展运算符将多个对象的属性合并到一起



## 正则扩展

1. 命名捕获分组
	- 在不能对捕获到的分组进行命名的时候通过下标得到匹配到的内容
	- 通过 “ ?<命名>  ” 的方式进行捕获分组命名，会将命名后的内容存入 groups 中，而上面不命名的 情况下 groups 为 undefined
2. 反向断言
	- 断言：判断这次的结果是否正确
		- 正向断言：通过判断需要匹配部分后面的内容是否满足条件来匹配
		- 反向断言：通过判断需要匹配部分前面的内容是否满足条件来匹配
3. dotAll 模式
	- dot ，有 ‘ . ’ 的意思：在正则中表示除换行符以外的任意单个字符
	- /s ：模式修正符，加上之后  ‘ . ’ 将匹配任意字符
	- /g： 全局匹配



#  es10新特性



## 对象扩展方法

1. Object.fromEntries：创建一个对象，接受一个二维数组或者 一个 Map（相当于 ES8 里面的 entries 的 逆运算）



## 字符串扩展方法

1. trimStart：去除字符串左端的空白字符
2. trimEnd：去除字符串右端的空白字符
3. 原来就有的 trim 方法 ：去除字符串两端的空白字符



## 数组方法扩展

1. flat（参数）：将一个多维数组转化为低维数组，参数为一个数字 = 数组现在的维度 - 想要转化的维度（比如：2 = 3 - 1）
2. flatMap：**`flatMap()`** 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 连着深度值为 1 的 [flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。



##  Symbol 的扩展

1. Symbol.prototype.description：用来获取 Symbol 的描述字符串





# ES11新特性



## 私有属性

类的私有属性无法直接访问到，需要通过类内部定义的方法得到



## Promise. allSettled

1. 接收一个数组，返回一个 Promise 对象，状态永远为成功。里面的值是每一个 Promise 的状态和结果。

2. 状态：fulfilled 也代表成功

	![image-20230118104647168](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Vue2.0+Vue3.0%E5%85%A8%E5%A5%97%E6%95%99%E7%A8%8B%E4%B8%A8vuejs%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202302022240938.png)

3. 类似方法 all（），用法相同，但是返回的大的 Promise 对象的状态要根据内部所有的 Promise 的状态决定



## 字符串扩展方法

1. String.prototype.matchAll ：用来得到正则批量匹配的结果
2. 可以通过扩展运算符将其转化为一个数组，或者通过 for … of 进行迭代



## 可选链操作符

1. 形式： ?.
2. 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 运算符的功能类似于 `.` 链式运算符，不同之处在于，在引用为空 ([nullish](https://developer.mozilla.org/zh-CN/docs/Glossary/Nullish) ) ([`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。
3. 当较深层时不用层层判断



## 动态 import

1. 静态 import ：ES6 中为静态模块导入，在文件入口处写大量的 import 语句，降低性能，不能懒加载
2. 动态 import： 引入后会返回一个 Promise 对象



## BigInt

1. 大整型
2. 在普通整型后面加一个 ‘ n ’ 就可以转化为 BigInt 型，也可以使用 BigInt() 函数进行转化为 BigInt型
3. 可以进行大数值的计算，但是 BigInt 型的数不能和  Int型的数相加，都得转化为 BigInt 型之后才能相加
4. 浮点数不能转化为 BigInt 型



## 绝对全局变量 globalThis

1. 当我们想操作全局变量的时候可以使用
2. 浏览器打开指向 window， node 环境下指向 global
