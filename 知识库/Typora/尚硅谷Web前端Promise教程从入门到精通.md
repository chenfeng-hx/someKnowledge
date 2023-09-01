# 课程简介：

【尚硅谷Web前端Promise教程从入门到精通】 https://www.bilibili.com/video/BV1GA411x7z1/?share_source=copy_web&vd_source=534cd597c2fb4b381da3354013fd5304

【尚硅谷Promise教程(promise前端进阶)】 https://www.bilibili.com/video/BV1MJ41197Eu/?share_source=copy_web&vd_source=534cd597c2fb4b381da3354013fd5304



# Promise 介绍与基本使用

1. 提出的原因：解决回调地狱的问题，同时在错误处理方面更加灵活

	## Promise 是什么？

- 理解：
	- 抽象表达：
		1. Promise 是一门新的技术 （ES6 规范）
		2. Promise 是 JS 中进行异步编程的新解决方案，而旧方案则只是单纯的使用回调函数
	- 具体表达：
		1. 从语法上来说： Promise 是一个构造函数
		2. 从功能上来说： Promise 对象用来封装一个异步操作并可以获取其成功 / 失败的结果值 



## 为什么要使用 Promise ？

1. 指定回调函数的方式更加灵活

	- 旧的方案：必须在启动异步任务前指定
	- Promise： 启动异步任务  => 返回 promise 对象 =>  给 Promise 对象绑定回调函数（甚至可以在异步任务而结束后指定/ 多个）

2. 支持链式调用，可以解决回调地狱问题

	1. 什么是回调地狱？

		​		回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调函数执行的条件

		​		<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301291631753.png" alt="image-20230129163122625" style="zoom:50%;" />

	2. 回调地狱的缺点？

		​		不便于阅读，不便于异常处理

	3. 解决方案?

		​       promise 链式调用

	4. 终极解决方案?

​					 async/await



## promise 初体验

​      promise 的 then 方法接收两个函数参数，第一个函数为成功状态的回调，第二个函数为失败状态的回调。Promise 对象的 resolve 和 reject 方法可以返回成功或失败的数据供 then 方法进行调用。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button>点我抽奖</button>

    <script>
        /*
            点击按钮，1s 后显示是否中将（30%的中奖概率）
            中将和不中奖都弹出相应的提示信息
        */
        const btn = document.querySelector('button');
        function rand(m, n) {
            return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
        };
        btn.addEventListener('click', function () {
            // 定时器
            // setTimeout(() => {
            //     let n = rand(1, 100);
            //     if (n <= 30) {
            //         alert('恭喜你，抽中了!');
            //     } else {
            //         alert('再接再厉!');
            //     }
            // }, 1000);

            const p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    // 抽奖，获取到从 1 到 100 的一个随机数
                    let n = rand(1, 100);
                    console.log(n);
                    //判断
                    if (n <= 30) {
                        resolve(n);    //将promise对象的状态设置为成功
                    } else {
                        reject(n);    //将promise对象的状态设置为失败
                    };
                }, 1000);
            });
            // 调用 then 方法
            p.then(value => {
                console.log('恭喜你，抽中了！中奖号为:' + value); 
            }, reason => {
                console.log('再接再厉! 您的数字为:' + reason);
            });
        })
    </script>
</body>
</html>
```



## Promise练习——fs文件读取

```js
// const fs = require('fs');
import * as fs from 'fs';

// 回调函数的 形式
// fs.readFile('./content/茅屋为秋风所破歌.txt', (err, data) => {
//     if (err) console.error('出错啦!' + err.stack);
//     console.log(data.toString());
// });


// Promise 形式
let p = new Promise((resolve, reject) => {
    fs.readFile('./content/茅屋为秋风所破歌.txt', (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
});
p.then(data => {
    console.log(data.toString());
}, err => {
    console.error(err);
});
```



## Promise练习——Ajax请求

前端页面：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>promise 封装 ajax</title>
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap-grid.css" rel="stylesheet">
    <title>Promise 封装 ajax</title>
</head>

<body>
    <div class="container">
        <h2 class="page-header">Promise 封装 AJAX 请求操作</h2>
        <button class="btn btn-primary" id="btn">点击发送 AJAX</button>
    </div>
    <script>
        const btn = document.querySelector('#btn');
        // 通用方法
        // btn.addEventListener('click', function(){
        //     // 1.创建对象
        //     const xhr = new  XMLHttpRequest();
        //     xhr.responseType = 'json';
        //     // 2.初始化
        //     xhr.open('GET', 'http://127.0.0.1:3000/promise-ajax');
        //     // 3.发送
        //     xhr.send();
        //     // 4.处理相应结果
        //     xhr.onreadystatechange = function() {
        //         if (xhr.readyState === 4){
        //             if (xhr.status >= 200 && xhr.status < 300){
        //                 // 输出响应体
        //                 console.log(xhr.response.msg);
        //             } else {
        //                 // 输出响应状态码
        //                 console.log(xhr.status);
        //             }
        //         }
        //     }
        // });
        // promise 方法
        btn.addEventListener('click', function () {
            // 创建 promise 对象
            let p = new Promise((resolve, reject) => {
                // 1.创建对象
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                // 2.初始化
                xhr.open('GET', 'http://127.0.0.1:3000/promise-ajax');
                // 3.发送
                xhr.send();
                // 4.处理相应结果
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            // 输出响应体
                            resolve(xhr.response.msg);
                        } else {
                            // 输出响应状态码
                            reject(xhr.status);
                        }
                    }
                }
            });
            p.then(data => {
                console.log(data);
            }, err => {
                console.error(err);
            });
        });
    </script>
</body>

</html>
```

服务端页面：

```js
import express from "express";
const app = express();

app.all('/promise-ajax', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let data = {
        msg: 'hello world'
    }
    res.send(JSON.stringify(data));
});

app.listen(3000, function(){
    console.log('服务已启动！')
})
```



## Promise封装fs读取文件操作

```js
import fs from 'fs';

function myreadfile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

myreadfile('./content/茅屋为秋风所破歌.txt').then(data => {
    console.log(data.toString());
}, err => {
    console.log(err);
});
```



## util.promisify 方法进行 promise 风格转化

util.promisify：http://nodejs.cn/api-v16/util/util_promisify_original.html

可以将普通形式的方法转换为 promise 风格的方法

```js
// 引入 util、fs模块
import fs from 'fs';
import util from 'util';

// 返回一个 新的函数
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./content/茅屋为秋风所破歌.txt').then(data => {
    console.log(data.toString());
});
```



## Promise封装 AJAX 请求

```js
function sendAjax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(response);
                } else {
                    reject(response.status);
                }
            }
        };
    });
};

sendAjax('http://127.0.0.1:3000/user').then(data => {
    console.log(data);
}, reason => {
    console.warn(reason);
});
```



## Promise 的状态

是每一个 promise 实例对象中的一个属性 ： PromiseStatue，其总共有三个状态：

- pending：未决定的
- resloved / fullfilled：成功地状态
- rejected：失败

状态的改变：

1. pending 变为 resolved

2. pending 变为 rejected

说明: 只有这 2 种, 且一个 promise 对象只能改变一次

​        无论变为成功还是失败, 都会有一个结果数据

​        成功的结果数据一般称为 vlaue, 失败的结果数据一般称为 reason

​		该属性为内置属性，不能直接进行修改，且只有两种改变方法，不能由成功转为失败或是由失败转为成功



## Promise 对象结果值属性

实例对象中的另一个属性，PromiseResult，保存着异步任务 {成功 / 失败} 的结果

该值可以通过两个方法去修改，{resolve / reject}



## Promise 的基本流程

![image-20230130103113289](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301031357.png)





# Promise API



## Promise 构造函数

Promise 构造函数: Promise (excutor) {}

1. excutor 函数: 执行器 (resolve, reject) => {}
2. resolve 函数: 内部定义成功时我们调用的函数 value => {}
3. reject 函数: 内部定义失败时我们调用的函数 reason => {}

说明: excutor 会在 Promise 内部立即==同步回调==,异步操作在执行器中执行

```js
let p = new Promise((resolve, reject) => {
    // content
    console.log(111);
});
console.log(222);
// 其中，执行器函数为以下内容：
(resolve, reject) => {
    // content
}
// 同步执行，即在执行第一行代码的同时会执行构造函数，会发现先输出 111， 在输出 222
```



## then 方法

Promise.prototype.then 方法: (onResolved, onRejected) => {}

​		(1) onResolved 函数: 成功的回调函数 (value) => {}

​		(2) onRejected 函数: 失败的回调函数 (reason) => {}

说明: 指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调

返回一个新的 promise 对象

```js
p.then(value => {}, reason => {});
```



## catch 方法

Promise.prototype.catch 方法: (onRejected) => {}

​		(1) onRejected 函数: 失败的回调函数 (reason) => {}

说明: then()的语法糖, 相当于: then(undefined, onRejected)

其实内部也是用 then 方法进行封装的

==即只能指定失败的回调==

> <a href="https://baike.baidu.com/item/%E8%AF%AD%E6%B3%95%E7%B3%96/5247005?fr=aladdin">语法糖</a>（Syntactic sugar），也译为糖衣语法，是由英国[计算机](https://baike.baidu.com/item/计算机/140338?fromModule=lemma_inlink)科学家彼得·约翰·兰达（Peter J. Landin）发明的一个术语，指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便[程序员](https://baike.baidu.com/item/程序员/62748?fromModule=lemma_inlink)使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。

```js
p.catch(reason => {});
```



## resolve 方法

Promise.resolve 方法: (value) => {}

​		(1) value: 成功的数据或 promise 对象

说明: 返回一个成功/失败的 promise 对象

==该方法是属于 Promise 对象的，不属于实例对象。接受一个参数，将其快速的转化为 promise 对象==

- 如果传入的 参数为 非Promise 类型的对象，则返回的结果为成功 Promise 对象
- 如果传入的参数为 Promise 对象，则参数的状态决定返回的 resolve 的结果，即：内部成功，外部也成功；内部失败，外部也失败！

```js
let p1 = Promise.resolve(512);
let p2 = Promise.resolve(new Promise((resolve, reject) => {
    reject();
}));
```



## reject 方法

Promise.reject 方法: (reason) => {}

​		(1) reason: 失败的原因

说明: 返回一个失败的 promise 对象

==也是 Promise 对象的一个方法，快速的返回一个失败的 Promise 对象，无论传入什么数值，就算是传入一个成功的 Promise 对象，也会得到一个失败的 Promise 对象==

```js
let p3 = Promise.reject(521);
let p4 = Promise.reject(new Promise((resolve, reject) => {
    resolve();
}));
```



## all 方法

Promise.all 方法: (promises) => {}

​		(1) promises: 包含 n 个 promise 的数组

说明: 返回一个新的 promise, 只有所有的 promise 都成功才成功, 只要有一个失败了就直接失败

​		成功时：返回的 Promise 的值为所有 Promise 对象的值的合集

```js
let p1 = Promise.resolve(512);
let p2 = Promise.resolve(new Promise((resolve, reject) => {
    resolve("http");
}));
let results = Promise.all([p1, p2]);
console.log(results);
```

​		<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301152641.png" alt="image-20230130115219583" style="zoom: 67%;" />

​		失败时：返回的  Promise 的值为失败的那个 Promise 对象的值，多个失败结果只会返回第一个查找到的失败结果值，因为遇到失败的 Promise 就会直接 return

```js
let p3 = Promise.reject(521);
let p4 = Promise.reject(new Promise((resolve, reject) => {
    resolve();
}));
let results = Promise.all([p3, p4]);
console.log(results);
```

​		<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301202976.png" alt="image-20230130120227925" style="zoom:67%;" />



## race 方法

Promise.race 方法: (promises) => {}

​		(1) promises: 包含 n 个 promise 的数组

说明: 返回一个新的 promise, 第一个完成的 promise 的结果状态就是最终的结果状态，最先做完任务返回状态的 promise 的状态和值就是总的结果 promise 的状态和值

```js
let p1 = Promise.resolve(512);
let p2 = Promise.resolve(new Promise((resolve, reject) => {
    // reject();
    resolve("http");
}));
let p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('data');
    }, 1000);
});
let res = Promise.race([p1, p2]);
let res1 = Promise.race([p5, p2]);
console.log(res)
console.log(res1)
```

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301541811.png" alt="image-20230130154132737" style="zoom:80%;" />





# Promise 关键问题



## 如何改变 promise 的状态?

​	(1) resolve(value): 如果当前是 pendding 就会变为 resolved

​	(2) reject(reason): 如果当前是 pendding 就会变为 rejected

​	(3) 抛出异常: 如果当前是 pendding 就会变为 rejected

```js
let p = new Promise((resolve, reject) => {
    resolve();
    reject();
    throw '出错了';
});
```



## 一个 promise 指定多个成功/失败回调函数（then方法）, 都会调用吗?

​	当 promise 改变为对应状态时都会调用

​	当 promise 中没有对应的方法去改变状态时，promise 的状态一直为 pendding，则不会执行 then 方法

​	而如果状态满足所有的 then 方法中的回调函数，则会全部执行

```js
let p = new Promise((resolve, reject) => {
    resolve();
});

p.then(value => {
    console.log('yes');
});

p.then(value => {
    console.log('me too');
});
```

​	<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301612063.png" alt="image-20230130161212950" style="zoom: 67%;" />





## 改变 promise 状态（问题一）和指定回调函数（执行顺序）谁先谁后?

​	1. 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调

2. 如何先改状态再指定回调?

  1. 在执行器中直接调用 resolve()/reject()

    - 当执行器函数中的任务为同步任务时，直接调用 resolve() 或方法
    
    	```js
    	let p = new Promise((resolve, reject) => {
    	    resolve();
    	});
    	
    	p.then(value => {
    	    console.log('yes');
    	});
    	```

  2. 延迟更长时间才调用 then()

  	- 在 then 方法中添加定时器，使其比构造器改变状态的时间更长

3. 如何先指定回调再该状态？

	1. 当执行器中的任务为异步任务时（定时器等），由于改变状态需要等待时间，所以会先指定回调，后改变状态

4. 什么时候才能得到数据（回调函数什么时候执行）?

	1. 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据

	2. 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据
	
	3. ==总的来说，就是只有在状态改变之后才会执行 then 方法获取数据，注意指定和执行的区别==



## promise.then()返回的新 promise 的结果状态由什么决定?

1. 简单表达: 由 then()指定的回调函数执行的结果决定

	```js
	let p = new Promise((resolve, reject) => {
	    resolve();
	});
	
	let result = p.then(value => {
	    // console.log('yes');
	    // 1. 抛出异常
	    // throw '出了个大error';
	    // 2.返回的结果是 非 Promise 对象
	    // return "i love you";
	    // 3.返回的结果是 promise 对象
	    return new Promise((resolve, reject) => {
	        // resolve('yes');
	        reject('no');
	    });
	
	}, reason => {
	
	});
	console.log(result);
	```

	

2.  详细表达：
	1. 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常

		![image-20230130165601376](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301656441.png)

		

	2. 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值

		![image-20230130165723584](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301657651.png)

		

	3. 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

		![image-20230130165851219](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301658279.png)

		

		![image-20230130165919261](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301659317.png)

​			

## promise 如何串连多个操作任务?

​	(1) promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用

​	(2) 通过 then 的链式调用串连多个同步/异步任务

```js
let file1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});
file1.then(value => {
    return new Promise((resolve, reject) => {
        resolve('success');
    });
}).then(value => {
    console.log(value);   // success
}).then(value => {
    console.log(value);   // undefined
});
```



##  promise 异常传透?

​	(1) 当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调, 

​	(2) 前面任何操作出了异常, 都会传到最后失败的回调中处理

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
        // reject('not ok');
    }, 1000);
});
p1.then(value => {
    console.log(111);
    throw '出了个大error';
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => {
    console.warn(reason);
});
```

![image-20230130172916436](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301729499.png)

![image-20230130173102090](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301731151.png)

![image-20230130173809394](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301738452.png)



## 中断 promise 链?

​	(1) 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数

​	(2) 办法: 在回调函数中返回一个 pendding 状态的 promise 对象

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
        // reject('not ok');
    }, 1000);
});
p1.then(value => {
    console.log(111);
    return new Promise(() => {});
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => {
    console.warn(reason);
});
```

![image-20230130175045047](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFPromise%E6%95%99%E7%A8%8B%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301301750107.png)







# Promise 自定义封装（手写Promise）

- **`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

手写 promise 实现：

```js
function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 保存实例对象的 this 的值
    const _this = this;
    // resolve 函数
    function resolve(data) {
        // 判断状态
        if (_this.PromiseState !== 'Pending') return;  // 保证每个 promise 对象的状态只能够改变一次
        // 修改对象的状态
        _this.PromiseState = 'fulfilled';
        // 修改对象的值
        _this.PromiseResult = data;
        // 异步任务下执行回调函数，应该是在状态改变后执行回调函数
        // if (_this.callback.onResolved) {
        //     _this.callback.onResolved(data);
        // }
        // 修改：因为是异步执行，所以不能在状态改变后直接执行回调函数
        setTimeout(() => {
            _this.callbacks.forEach(item => {
                item.onResolved(data);
            });
        });
    };
    // reject 函数
    function reject(data) {
        if (_this.PromiseState !== 'Pending') return;  // 保证每个 promise 对象的状态只能够改变一次
        // 修改对象的状态
        _this.PromiseState = 'fulfilled';
        // 修改对象的值
        _this.PromiseResult = data;
        // 异步任务下执行回调函数，应该是在状态改变后执行回调函数
        // if (_this.callback.onRejected) {
        //     _this.callback.onRejected(data);
        // }
        setTimeout(() => {
            _this.callbacks.forEach(item => {
                item.onRejected(data);
            });
        });
    };
};

// 添加 then 方法
// 修改：then 方法应该是异步执行的，在所有的同步任务执行结束后才执行异步任务
// 修改：在外部使用一个定时器包裹即可
Promise.prototype.then = function (onResolved, onRejected) {
    // 判断回调函数参数，当第二个（失败的回调）不写时默认为 undefined，这样在上面进行失败回调遍历时会报错
    // 为其设置一个默认值，这样可以在 “异常处理”最后处理错误时保证不报错并且有失败的回调可用
    if (typeof onRejected !== 'function') {
        throw reason;
    }
    //在第一个参数也不传递的时候可以保持值传递
    if (typeof onResolved !== 'function') {
        onResolved = value => value;
        // 等价于  value => { return value };
    }

    // 设置 then 方法的返回值
    return new Promise((resolve, reject) => {
        // 使用 try-catch 处理抛出错误的情况
        try {
            // 调用回调函数  PromiseState
            if (this.PromiseState === 'fulfilled') {   // 此时 this 的值指向实例对象
                setTimeout(() => {
                    let result = onResolved(this.PromiseResult);  // 将 promise 的值返回给回调函数，
                    // 判断
                    if (result instanceof Promise) {
                        // 如果 result 是原型链上的一部分，即：result（返回的结果是一个 Promise 对象）,调用 then 方法返回的
                        // 是 Promise 对象，就可以调用 then 方法
                        result.then(value => {
                            resolve(value);
                        }, reason => {
                            reject(reason);
                        });
                    } else {
                        // 返回的结果不是一个 Promise 对象，结果的对象状态为 成功
                        resolve(result);
                    }
                });
            };
        } catch (error) {
            reject(error);
        };
        try {
            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    let result = onRejected(this.PromiseResult);  // 将 promise 的值返回给回调函数，
                    // 判断
                    if (result instanceof Promise) {
                        // 如果 result 是原型链上的一部分，即：result（返回的结果是一个 Promise 对象）,调用 then 方法返回的
                        // 是 Promise 对象，就可以调用 then 方法
                        result.then(value => {
                            resolve(value);
                        }, reason => {
                            reject(reason);
                        });
                    } else {
                        // 返回的结果不是一个 Promise 对象，结果的对象状态为 成功
                        resolve(result);
                    }
                });
            };
        } catch (error) {
            reject(error);
        }
        // 异步任务下，此时 promise 实例对象的状态位 pending，所以应该先将回调函数保存下来，等到状态改变后再执行
        // 但是在多个 then 方法的情况下，容易出现覆盖问题,所以使用数组将所有的 回调都保存下来，然后进行遍历
        if (this.PromiseState === 'pending') {
            const _this = this;
            // this.prototype.callbacks = {
            //     onResolved,
            //     onRejected
            // }
            this.callbacks.push({
                // onResolved,
                // onRejected
                // 在此处应该对回调函数修改，使其调用 resolve 或 reject 进行改变状态
                onResolved: function () {
                    try {
                        // 执行成功回调函数，并获得执行结果并进行状态改变
                        let result = onResolved(_this.PromiseResult);
                        // 判断
                        if (result instanceof Promise) {
                            result.then(value => {
                                resolve(value);
                            }, reason => { reason });
                        } else {
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error);
                    }
                },
                onRejected: function () {
                    try {
                        let result = onRejected(_this.PromiseResult);
                        // 判断
                        if (result instanceof Promise) {
                            result.then(value => {
                                resolve(value);
                            }, reason => { reason });
                        } else {
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        };
    });
};

// 添加 catch 方法
Promise.prototype.catch = function (onRejected) {
    return Promise.then(undefined, onRejected);
};

// 封装 resolve 方法，该方法是 Promise 对象的方法，不是实例对象的方法
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(value => {
                resolve(value);
            }, reason => {
                reject(value);
            });
        } else {
            resolve(value);
        }
    });
};

// 封装 reject 方法，该方法和 resolve 不同的是 返回的结果状态永远是 失败的
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
};

// 封装 all 方法
Promise.all = function (promises) {
    // 返回结果是一个 Promise 对象
    return new Promise((resolve, reject) => {
        // 声明变量
        let count = 0;
        let arr = [];
        // 遍历
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(value => {
                // 得知该 Promise 对象的状态为成功地
                // 每个 Promise 对象 都成功
                count++;
                // arr.push(value);    //可以使用，但是因为all中数组可能存在 异步任务，所以数值放入的顺序可能会不同
                arr[i] = value;
                // 判断
                if (count === promises.length) {
                    // 修改状态
                    resolve(arr);
                }
            }, reason => {
                reject(reason);
            });
        }
    });
};

// 添加 race 方法 
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(value => {
                // 谁先结束谁调用
                resolve(value);
            }, reason => {
                reject(reason);
            });
        }
    });
};
```



将上述代码封装成类：

```js
class Promise {
    // 构造函数
    constructor(executor) {
        // 添加属性
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        // 保存实例对象的 this 的值
        const _this = this;
        // resolve 函数
        function resolve(data) {
            // 判断状态
            if (_this.PromiseState !== 'Pending') return;  // 保证每个 promise 对象的状态只能够改变一次
            // 修改对象的状态
            _this.PromiseState = 'fulfilled';
            // 修改对象的值
            _this.PromiseResult = data;
            // 异步任务下执行回调函数，应该是在状态改变后执行回调函数
            // if (_this.callback.onResolved) {
            //     _this.callback.onResolved(data);
            // }
            // 修改：因为是异步执行，所以不能在状态改变后直接执行回调函数
            setTimeout(() => {
                _this.callbacks.forEach(item => {
                    item.onResolved(data);
                });
            });
        };
        // reject 函数
        function reject(data) {
            if (_this.PromiseState !== 'Pending') return;  // 保证每个 promise 对象的状态只能够改变一次
            // 修改对象的状态
            _this.PromiseState = 'fulfilled';
            // 修改对象的值
            _this.PromiseResult = data;
            // 异步任务下执行回调函数，应该是在状态改变后执行回调函数
            // if (_this.callback.onRejected) {
            //     _this.callback.onRejected(data);
            // }
            setTimeout(() => {
                _this.callbacks.forEach(item => {
                    item.onRejected(data);
                });
            });
        };
    }

    // then 方法
    then(onResolved, onRejected) {
        // 判断回调函数参数，当第二个（失败的回调）不写时默认为 undefined，这样在上面进行失败回调遍历时会报错
        // 为其设置一个默认值，这样可以在 “异常处理”最后处理错误时保证不报错并且有失败的回调可用
        if (typeof onRejected !== 'function') {
            throw reason;
        }
        //在第一个参数也不传递的时候可以保持值传递
        if (typeof onResolved !== 'function') {
            onResolved = value => value;
            // 等价于  value => { return value };
        }

        // 设置 then 方法的返回值
        return new Promise((resolve, reject) => {
            // 使用 try-catch 处理抛出错误的情况
            try {
                // 调用回调函数  PromiseState
                if (this.PromiseState === 'fulfilled') {   // 此时 this 的值指向实例对象
                    setTimeout(() => {
                        let result = onResolved(this.PromiseResult);  // 将 promise 的值返回给回调函数，
                        // 判断
                        if (result instanceof Promise) {
                            // 如果 result 是原型链上的一部分，即：result（返回的结果是一个 Promise 对象）,调用 then 方法返回的
                            // 是 Promise 对象，就可以调用 then 方法
                            result.then(value => {
                                resolve(value);
                            }, reason => {
                                reject(reason);
                            });
                        } else {
                            // 返回的结果不是一个 Promise 对象，结果的对象状态为 成功
                            resolve(result);
                        }
                    });
                };
            } catch (error) {
                reject(error);
            };
            try {
                if (this.PromiseState === 'rejected') {
                    setTimeout(() => {
                        let result = onRejected(this.PromiseResult);  // 将 promise 的值返回给回调函数，
                        // 判断
                        if (result instanceof Promise) {
                            // 如果 result 是原型链上的一部分，即：result（返回的结果是一个 Promise 对象）,调用 then 方法返回的
                            // 是 Promise 对象，就可以调用 then 方法
                            result.then(value => {
                                resolve(value);
                            }, reason => {
                                reject(reason);
                            });
                        } else {
                            // 返回的结果不是一个 Promise 对象，结果的对象状态为 成功
                            resolve(result);
                        }
                    });
                };
            } catch (error) {
                reject(error);
            }
            // 异步任务下，此时 promise 实例对象的状态位 pending，所以应该先将回调函数保存下来，等到状态改变后再执行
            // 但是在多个 then 方法的情况下，容易出现覆盖问题,所以使用数组将所有的 回调都保存下来，然后进行遍历
            if (this.PromiseState === 'pending') {
                const _this = this;
                // this.prototype.callbacks = {
                //     onResolved,
                //     onRejected
                // }
                this.callbacks.push({
                    // onResolved,
                    // onRejected
                    // 在此处应该对回调函数修改，使其调用 resolve 或 reject 进行改变状态
                    onResolved: function () {
                        try {
                            // 执行成功回调函数，并获得执行结果并进行状态改变
                            let result = onResolved(_this.PromiseResult);
                            // 判断
                            if (result instanceof Promise) {
                                result.then(value => {
                                    resolve(value);
                                }, reason => { reason });
                            } else {
                                resolve(result);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    },
                    onRejected: function () {
                        try {
                            let result = onRejected(_this.PromiseResult);
                            // 判断
                            if (result instanceof Promise) {
                                result.then(value => {
                                    resolve(value);
                                }, reason => { reason });
                            } else {
                                resolve(result);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            };
        });
    }

    // 添加 catch 方法
    catch(onRejected) {
        return Promise.then(undefined, onRejected);
    };

    // 封装 resolve 方法，该方法是 Promise 对象的方法，不是实例对象的方法
    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(value => {
                    resolve(value);
                }, reason => {
                    reject(value);
                });
            } else {
                resolve(value);
            }
        });
    };

    // 封装 reject 方法，该方法和 resolve 不同的是 返回的结果状态永远是 失败的
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    };

    // 封装 all 方法
    static all(promises) {
        // 返回结果是一个 Promise 对象
        return new Promise((resolve, reject) => {
            // 声明变量
            let count = 0;
            let arr = [];
            // 遍历
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(value => {
                    // 得知该 Promise 对象的状态为成功地
                    // 每个 Promise 对象 都成功
                    count++;
                    // arr.push(value);    //可以使用，但是因为all中数组可能存在 异步任务，所以数值放入的顺序可能会不同
                    arr[i] = value;
                    // 判断
                    if (count === promises.length) {
                        // 修改状态
                        resolve(arr);
                    }
                }, reason => {
                    reject(reason);
                });
            }
        });
    };

    // 添加 race 方法 
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(value => {
                    // 谁先结束谁调用
                    resolve(value);
                }, reason => {
                    reject(reason);
                });
            }
        });
    };
}
```




# async 与 await

MDN地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

​				https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await



async函数

1. 函数的返回值为 promise 对象

2. promise 对象的结果由 async 函数执行的返回值决定
	- 如果传入的 参数为 非Promise 类型的对象，则返回的结果为成功 Promise 对象
	- 如果传入的参数为 Promise 对象，则参数的状态决定返回的 resolve 的结果，即：内部成功，外部也成功；内部失败，外部也失败！

```js
async function main () {
    return 521;
    return new  Promise((resolve, reject) => {
        resolve();
        reject();
    });
    throw error;
};

let result = main();
console.log(result)
```



await 表达式

1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值（其他类型的值：数字，字符串，布尔值等）

2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值

3. 如果表达式是其它值, 直接将此值作为 await 的返回值



注意：

1. await 必须写在 async 函数中, 但 async 函数中可以没有 await

2. 如果 await 右边的的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

```js
async function text() {
    let p1 = new Promise((resolve, reject) => {
        resolve('ok');
    });
    let p2 = new Promise((resolve, reject) => {
        reject('no');
    });
    let p3 = new Promise((resolve, reject) => {
        throw 'error';
    });
    let result1 = await p1;
    console.log(result1);
    let result2 = await p2;
    console.log(result2);
    try {
        let result3 = await p3;
    } catch (e) {
        console.log(e)
    }
};
```



async + await 结合案例：

1. 读取文件

	```js
	import fs from 'fs';
	import util from 'util';
	
	// 普通的回调函数读文件
	try {
	    fs.readFile('./content/1.txt', (err, data1) => {
	        if (err) throw err;
	        fs.readFile('./content/2.txt', (err, data2) => {
	            if (err) throw err;
	            fs.readFile('./content/3.txt', (err, data3) => {
	                if (err) throw err;
	                console.log(data1 + data2 +data3);
	            });
	        });
	    });
	} catch (error) {
	    console.log(error);
	}
	
	// async + await 解决回调地狱问题
	// 看不到回调函数，就像是同步任务一样，但是内部的执行是异步的
	let myReadFile = util.promisify(fs.readFile);  // 将普通函数转化为 Promise 函数
	async function readFiles() {
	    try {
	        let data1 = await myReadFile('./content/1.txt');
	        let data2 = await myReadFile('./content/2.txt');
	        let data3 = await myReadFile('./content/3.txt');
	        console.log(data1+ data2 + data3);
	    } catch (error) {
	        console.log(error);
	    }
	};
	readFiles();
	```

2. 发送 ajax 请求

	```js
	function sendAjax(url) {
	    return new Promise((resolve, reject) => {
	        const xhr = new XMLHttpRequest();
	        xhr.open('GET', url);
	        xhr.send();
	        xhr.onreadystatechange = function() {
	            if (xhr.readyState === 4) {
	                if (xhr.status >= 200 && xhr.status < 300) {
	                    resolve(response);
	                } else {
	                    reject(response.status);
	                }
	            }
	        };
	    });
	};
	let btn = document.querySelector('#btn');
	btn.addEventListener('click', async function(){
	    let content = await sendAjax('http://127.0.0.1:8000/user');
	    console.log(content);
	});
	```

	
