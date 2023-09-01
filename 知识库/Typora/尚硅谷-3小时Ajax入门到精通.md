# 网址

【【尚硅谷】3小时Ajax入门到精通】 https://www.bilibili.com/video/BV1WC4y1b78y/?p=2&share_source=copy_web&vd_source=534cd597c2fb4b381da3354013fd5304



# Ajax 介绍与网页应用

## ajax

1. 可以在页面不刷新的情况下向服务端申请数据，如：

	- 百度搜索到的内容

	- 京东左侧导航栏，如果鼠标不放上去，就不会进行 ajax 请求，也就不会显示详细页面（实现懒加载：用则加载，不用就不加载）

	- processon 网页做图画，每移动一次图形也都会发送一次 ajax 请求，可以在网络模块看到请求的信息，是 http 请求

		![image-20230119115824103](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7-3%E5%B0%8F%E6%97%B6Ajax%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301191158202.png)



# 原生 ajax



## ajax 介绍

1. AJAX 全称为 Asynchronous JavaScript And XML，就是异步的 JS 和 XML。
2. 通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**。
3. AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。



## XML简介

1. XML ：eXtensible Markup Language 的缩写， 可扩展标记语言。

2. XML 被设计用来传输和存储数据。

3. XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签，全都是自定义标签，用来表示一些数据，现在已经被 JSON 取代了。

4. 最开始是服务器传输数据，以 XML 的格式，JavaScript 进行数据解析和提取并处理

	```xml
	<!-- 比如说我有一个学生数据：name = "孙悟空" ; age = 18 ; gender = "男" ;
	用 XML 表示： -->
	
	<student>
	    <name>孙悟空</name>
	    <age>18</age>
	    <gender>男</gender>
	</student>
	
	<!-- 用 JSON 表示： -->
	<!-- {"name":"孙悟空","age":18,"gender":"男"} -->{"name":"孙悟空","age":18,"gender":"男"}
	```



## ajax的特点

1. 优点：
	- 可以无需刷新页面而与服务器端进行通信。
	- 允许你根据用户事件来更新部分页面内容（鼠标事件、键盘事件、表单事件 …… ）

2. 缺点：
	- 没有浏览历史，不能回退
	- 存在跨域问题(同源)（从 a.com 向 b.com 发送 ajax 请求）
	- SEO 不友好：通过 ajax 获取到的数据，即源代码（通过 js 获取并渲染到页面上的部分），http 响应体，**爬虫等无法爬取到**，通过源代码（在浏览器右键打开）也搜索不到（通过关键字），**不便于查询**



## HTTP协议

1. HTTP（hypertext transport protocol）协议『超文本传输协议』，协议详细规定了浏览器和万维网服务器之间互相通信的规则。

2. 分为发送和接收，即：请求报文和响应报文

3. 请求报文

	- 包含四部分，请求行，请求头，空行，和请求体（包含的内容）

	- 请求体：如果是 post 请求，可能会有内容，如果是 get 请求，则内容为空

		```html
		行      POST （请求方式） /s?ie=utf-8  HTTP/1.1 
		头      Host: atguigu.com
		        Cookie: name=guigu
		        Content-type: application/x-www-form-urlencoded
		        User-Agent: chrome 83
		空行
		体      username=admin&password=admin
		```

4. 响应报文

	- 同样包含四部分

	- 常见的响应状态码有：404、403、401、500、200

		```html
		行      HTTP/1.1 （协议版本） 200 （状态码）  OK （状态）
		头      Content-Type: text/html;charset=utf-8   （头部做一些对响应体的描述）
		        Content-length: 2048
		        Content-encoding: gzip
		空行         （空行必须有）
		体      <html>
		            <head>
		            </head>
		            <body>
		                <h1>尚硅谷</h1>
		            </body>
		        </html>
		```

5. 如何在浏览器中查看 http 请求

	- 以百度搜索“尚硅谷”为例，点击<kbd>F12</kbd>，点击 network，刷新网页，可以看到会出现许多的请求报文，network 会列出当前网页在加载过程中的所有请求。

		<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7-3%E5%B0%8F%E6%97%B6Ajax%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301191558740.png" alt="image-20230119155816482" style="zoom: 50%;" />



## ajax 请求的基本操作

- 核心对象：XMLHttpRequest，AJAX 的所有操作都是通过该对象进行的。

- ajax 请求的基本操作分为四个步骤：

	1. 创建 XMLHttpRequest 对象

		```javascript
		var xhr = new XMLHttpRequest();
		```

	2. 设置请求信息

		```javascript
		xhr.open(method, url);
		//可以设置请求头，一般不设置
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		```

	3. 发送请求

		```javascript
		xhr.send(body) //get 请求不传 body 参数，只有 post 请求使用
		```

	4. 接收响应

		```javascript
		//xhr.responseXML 接收 xml 格式的响应数据
		//xhr.responseText 接收文本格式的响应数据
		xhr.onreadystatechange = function (){
			if(xhr.readyState == 4 && xhr.status == 200){
				var text = xhr.responseText;
				console.log(text);
			}
		}
		```

		#### [XMLHttpRequest.readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)

- 一个基本的案例：通过 ajax 请求从服务端拿到数据并渲染到文本框中

	- 前端页面（使用 get 请求数据）

		```html
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <title>AJAX GET 请求</title>
		    <style>
		        #result{
		            width:200px;
		            height:100px;
		            border:solid 1px #90b;
		        }
		    </style>
		</head>
		<body>
		    <button>点击发送请求</button>
		    <div id="result"></div>
		
		    <script>
		        //获取button元素
		        const btn = document.getElementsByTagName('button')[0];
		        const result = document.getElementById("result");
		        //绑定事件
		        btn.onclick = function(){
		            //1. 创建对象
		            const xhr = new XMLHttpRequest();
		            //2. 初始化 设置请求方法和 url
		            xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
		            //3. 发送
		            xhr.send();
		            //4. 事件绑定 处理服务端返回的结果
		            // on  when 当....时候
		            // readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
		            // change  改变的时候触发  改变四次
		            xhr.onreadystatechange = function(){
		                //判断 (服务端返回了所有的结果)
		                if(xhr.readyState === 4){
		                    //判断响应状态码 200  404  403 401 500
		                    // 2xx 成功
		                    if(xhr.status >= 200 && xhr.status < 300){
		                        //处理结果  行 头 空行 体
		                        //响应 
		                        // console.log(xhr.status);// 响应行里的状态码
		                        // console.log(xhr.statusText);//响应行里的状态字符串
		                        // console.log(xhr.getAllResponseHeaders());//所有响应头
		                        // console.log(xhr.response);//响应体
		                        //设置 result 的文本
		                        result.innerHTML = xhr.response;
		                    }else{
		
		                    }
		                }
		            }
		        }
		    </script>
		</body>
		</html>
		```

		- readyState 的值：可以用来查看请求当前的状态

			|  值  |       状态       |                        描述                         |
			| :--: | :--------------: | :-------------------------------------------------: |
			|  0   |      UNSENT      |        代理被创建，但尚未调用 open() 方法。         |
			|  1   |      OPENED      |              `open()` 方法已经被调用。              |
			|  2   | HEADERS_RECEIVED | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
			|  3   |     LOADING      |    下载中；`responseText` 属性已经包含部分数据。    |
			|  4   |       DONE       |                  下载操作已完成。                   |

		- 对于状态字符串，以 2 开头的都是有效成功的状态

		- 对于得到的响应，可以使用：

			- xhr.status：打印响应体里的状态码
			- xhr.statusText： 打印响应行里的状态字符串
			- xhr.response： 打印响应体
			- 通过 xhr.getAllResponseHeaders() 方法：打印所有的响应头

	- server 页面

		```javascript
		//1. 引入express
		const express = require('express');
		
		//2. 创建应用对象
		const app = express();
		
		//3. 创建路由规则
		// request 是对请求报文的封装
		// response 是对响应报文的封装
		app.get('/server', (request, response) => {
		    //设置响应头  设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*');
		    //设置响应体
		    response.send('HELLO AJAX - 2');
		});
		
		//4. 监听端口启动服务
		app.listen(8000, () => {
		    console.log("服务已经启动, 8000 端口监听中....");
		});
		```

		- 通过 node 环境下安装 express 路由，监听端口并创建响应体

- ajax 中的 URL 设置请求参数

	- 通过在 URL 中添加参数，在 ? 后面，以 & 分隔开

		```javascript
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://127.0.0.1:8080/server?a=100&b=200&c=300')
		```

		

- 解决 IE 缓存问题（针对 IE 浏览器）

	- 问题：在一些浏览器中(IE)，由于缓存机制的存在，ajax 只会发送的第一次请求，剩余多次请求不会在发送给浏览器而是直接加载缓存中的数据。
	
	- 问题详细解释：浏览器会将第一次请求的数据缓存到本地，第二次发送 AJAX 请求的话请求的是本地的数据，而不会请求网络中的最新数据
	
	- 解决方式：IE 浏览器的缓存是根据 url 地址来记录的，所以我们只需要修改 url 地址即可避免缓存问题
	
	- <code>xhr.open("get","/testAJAX?t="+Date.now());</code>
	
	- 在URL 的后缀中加入时间戳，每次请求都使用不同的 URL，这样就可以避免缓存问题
	
		```html
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <title>IE缓存问题</title>
		    <style>
		        #result{
		            width:200px;
		            height:100px;
		            border:solid 1px #258;
		        }
		    </style>
		</head>
		<body>
		    <button>点击发送请求</button>
		    <div id="result"></div>
		    <script>
		        const btn = document.getElementsByTagName('button')[0];
		        const result = document.querySelector('#result');
		
		        btn.addEventListener('click', function(){
		            const xhr = new XMLHttpRequest();
		            xhr.open("GET",'http://127.0.0.1:8000/ie?t='+Date.now());
		            xhr.send();
		            xhr.onreadystatechange = function(){
		                if(xhr.readyState === 4){
		                    if(xhr.status >= 200 && xhr.status< 300){
		                        result.innerHTML = xhr.response;
		                    }
		                }
		            }
		        })
		    </script>
		</body>
		</html>
		```
	
		



- ​	基本案例扩展：使用 post 请求数据

	- 前端页面：post 方式

		```html
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <title>AJAX POST 请求</title>
		    <style>
		        #result{
		            width:200px;
		            height:100px;
		            border:solid 1px #903;
		        }
		    </style>
		</head>
		<body>
		    <div id="result"></div>
		    <script>
		        //获取元素对象
		        const result = document.getElementById("result");
		        //绑定事件
		        result.addEventListener("mouseover", function(){
		            //1. 创建对象
		            const xhr = new XMLHttpRequest();
		            //2. 初始化 设置请求类型与 URL
		            xhr.open('POST', 'http://127.0.0.1:8000/server');
		            //设置请求头
		            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		            xhr.setRequestHeader('name','atguigu');
		            //3. 发送
		            xhr.send('a=100&b=200&c=300');
		            // xhr.send('a:100&b:200&c:300');
		            // xhr.send('1233211234567');
		            
		            //4. 事件绑定
		            xhr.onreadystatechange = function(){
		                //判断
		                if(xhr.readyState === 4){
		                    if(xhr.status >= 200 && xhr.status < 300){
		                        //处理服务端返回的结果
		                        result.innerHTML = xhr.response;
		                    }
		                }
		            }
		        });
		    </script>
		</body>
		</html>
		```

	- 服务器端代码如下，需要添加 post 路由规则

		```js
		//1. 引入express
		const express = require('express');
		
		//2. 创建应用对象
		const app = express();
		
		//3. 创建路由规则
		// request 是对请求报文的封装
		// response 是对响应报文的封装
		app.post('/server', (request, response) => {
		    //设置响应头  设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*');
		    //设置响应体
		    response.send('HELLO AJAX - POST Req');
		});
		
		//4. 监听端口启动服务
		app.listen(8000, () => {
		    console.log("服务已经启动, 8000 端口监听中....");
		});
		```

	- post 请求体设置在 send() 方法中，请求体的格式可以随便写，但是服务端一定要设置相应格式的处理方法

		```js
		xhr.send('a=100&b=200&c=300');
		xhr.send('a:100&b:200&c:300');
		xhr.send('1233211234567');
		```

		可以在 ==Pequest  Payload== 中看到请求体的内容

		<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7-3%E5%B0%8F%E6%97%B6Ajax%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301281649875.png" alt="image-20230128164953802" style="zoom: 50%;" />

	- ajax 设置请求头信息，在 open() 方法后面使用方法 setRequestHeader()  设置请求头信息，==一般把用户需要校验的地方放在请求头中，发送给服务端，进行提取，并进行身份校验==

		```javascript
		xhr.setRequestHeader('请求头的名称','请求头的值')    // 接收两个参数
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		
		// 可以使用自定义的请求头名称，而不是预定义的请求头名称，这样会报错，因为服务端没有做相应的处理，当然还有浏览器安全机制的原因
		xhr.setRequestHeader('name','atguigu');  
		```

		![image-20230128170142125](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7-3%E5%B0%8F%E6%97%B6Ajax%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301281701205.png)

		因为自定义头名称的原因，需要在后端服务器设置相应的处理方式

		```js
		//上面是报错的实例，但是如果仅仅是在如 post 或 get 请求的处理内部下面的语句依旧是不行的，因为使用自定义头的情况下会同时发送一个 OPTIONS 请求（做校验），但是服务器并没有做相应的处理
		respose.setRequestHeader('Access-Control-Allow-Headers','*')   // 代表所有类型的头信息都可以接受
		
		// 最终的 解决方案是设置所有类型都可以使用的处理
		app.all('/server', (request, response) => {
		    //设置响应头  设置允许跨域
		    respose.setHeader('Access-Control-Allow-Origin', '*');
		    // 设置响应头，允许自定义请求头
		    respose.setHeader('Access-Control-Allow-Headers','*');
		    //设置响应体
		    response.send('HELLO AJAX - POST Req');
		});
		```



## 服务端响应 json 的操作

- 在服务端可以通过 接收请求来发送一个 JSON 格式的对象数据

	```javascript
	app.all('/server', (request, response) => {
	    //设置响应头  设置允许跨域
	    respose.setHeader('Access-Control-Allow-Origin', '*');
	    // 设置响应头，允许自定义请求头
	    respose.setHeader('Access-Control-Allow-Headers','*');
	    // 响应一个数据 JSON
	    const data = {
	        name: 'xiaohua'
	    };    
	    // 对响应体设置字符串转换
	    let str = data.stringify(data);
	    //设置响应体
	    response.send(str);
	});
	```

	- 因为 send()  方法中只接收 ==字符串== 形式的参数，所以需要对 JSON 格式进行转换

- 在前端页面中，对于发送过来的  JSON  字符串形式进行转换，并提取出信息进行处理

	- 有两种处理 JSON 字符串数据的方法：
		1. 手动进行转换，使用 JSON.parse() 方法将字符串还原为 JSON 格式
		2. 设置属性，XMLHttpRequest 有一个 responseType 属性用来控制响应体数据的类型，设置为 json 后会将字符串默认转换为 JSON 格式，不需要再手动设置

	```javascript
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>JSON响应</title>
	    <style>
	        #result{
	            width:200px;
	            height:100px;
	            border:solid 1px #89b;
	        }
	    </style>
	</head>
	<body>
	    <div id="result"></div>
	    <script>
	        const result = document.getElementById('result');
	        //绑定键盘按下事件
	        window.onkeydown = function(){
	            //发送请求
	            const xhr = new XMLHttpRequest();
	            //设置响应体数据的类型
	            xhr.responseType = 'json';
	            //初始化
	            xhr.open('GET','http://127.0.0.1:8000/json-server');
	            //发送
	            xhr.send();
	            //事件绑定
	            xhr.onreadystatechange = function(){
	                if(xhr.readyState === 4){
	                    if(xhr.status >= 200 && xhr.status < 300){
	                        // console.log(xhr.response);
	                        // result.innerHTML = xhr.response;
	                        // 1. 手动对数据转化
	                        // let data = JSON.parse(xhr.response);
	                        // console.log(data);
	                        // result.innerHTML = data.name;
	                        // 2. 自动转换
	                        console.log(xhr.response);
	                        result.innerHTML = xhr.response.name;
	                    }
	                }
	            }
	        }
	    </script>
	</body>
	</html>
	```



## ajax请求超时与网络异常处理

- 可以通过  XMLHttpRequest   内置的属性和事件设置相应的处理。

	- 前端页面：设置 timeout 的时间，单位为 ms， 在超过该时间后取消请求，并绑定 ontimeout  和  onerror   事件进行相应的处理。

		```html
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <title>请求超时与网络异常</title>
		    <style>
		        #result{
		            width:200px;
		            height:100px;
		            border:solid 1px #90b;
		        }
		    </style>
		</head>
		<body>
		    <button>点击发送请求</button>
		    <div id="result"></div>
		    <script>
		        const btn = document.getElementsByTagName('button')[0];
		        const result = document.querySelector('#result');
		
		        btn.addEventListener('click', function(){
		            const xhr = new XMLHttpRequest();
		            //超时设置 2s 设置
		            xhr.timeout = 2000;
		            //超时回调
		            xhr.ontimeout = function(){
		                alert("网络异常, 请稍后重试!!");
		            }
		            //网络异常回调
		            xhr.onerror = function(){
		                alert("你的网络似乎出了一些问题!");
		            }
		
		            xhr.open("GET",'http://127.0.0.1:8000/delay');
		            xhr.send();
		            xhr.onreadystatechange = function(){
		                if(xhr.readyState === 4){
		                    if(xhr.status >= 200 && xhr.status< 300){
		                        result.innerHTML = xhr.response;
		                    }
		                }
		            }
		        })
		    </script>
		</body>
		</html>
		```

	- 服务端处理：通过设置定时器进行测试

		```js
		app.all('/delay', (request, response) => {
		    //设置响应头  设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*');
		    response.setHeader('Access-Control-Allow-Headers', '*');
		    setTimeout(() => {
		        //设置响应体
		        response.send('延时响应');
		    }, 3000)
		});
		```



## ajax 取消请求

- 前端页面：设置两个按钮，进行请求和 取消请求，取消请求使用到了 XMLHttpRequest  中的内置方法 abort()  

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>取消请求</title>
	</head>
	<body>
	    <button>点击发送</button>
	    <button>点击取消</button>
	    <script>
	        //获取元素对象
	        const btns = document.querySelectorAll('button');
	        let x = null;   // 避免 x 在函数内部为局部变量的情况
	
	        btns[0].onclick = function(){
	            x = new XMLHttpRequest();
	            x.open("GET",'http://127.0.0.1:8000/delay');
	            x.send();
	        }
	
	        // abort
	        btns[1].onclick = function(){
	            x.abort();
	        }
	    </script>
	</body>
	</html>
	```

- 实际操作的情况：

	![image-20230128211851566](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7-3%E5%B0%8F%E6%97%B6Ajax%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301282118730.png)





## ajax 请求重复发送的问题

前端页面：还是使用节流阀的思想，控制请求的发送，在请求的内容都相同的时候，始终保持只有一个请求发送，缓解服务器压力，提高性能。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>重复请求问题</title>
</head>
<body>
    <button>点击发送</button>
    <script>
        //获取元素对象
        const btns = document.querySelectorAll('button');
        let x = null;
        //标识变量
        let isSending = false; // 是否正在发送AJAX请求

        btns[0].onclick = function(){
            //判断标识变量
            // 将请求取消放在最上面，此时 x  代表的是上一个请求，而不是最新的请求
            if(isSending) x.abort();// 如果正在发送, 则取消该请求, 创建一个新的请求
            x = new XMLHttpRequest();
            //修改 标识变量的值
            isSending = true;
            x.open("GET",'http://127.0.0.1:8000/delay');
            x.send();
            x.onreadystatechange = function(){
                if(x.readyState === 4){
                    //修改标识变量
                    isSending = false;   // 只要请求成功发送即可修改，不然如果判断状态码是否为 2xx，则不一定会修改，因为 可能是一个失败的请求
                }
            }
        }

        // abort
        btns[1].onclick = function(){
            x.abort();
        }
    </script>
</body>
</html>
```





# jQuery 中的 ajax



## 请求发送方式

- post 请求

	```js
	$.post(url, [data], [callback], [type])
	url:请求的 URL 地址。
	data:请求携带的参数。  必须是一个对象
	callback:载入成功时回调函数。
	type:设置返回内容格式，xml, html, script, json, text, _default，即响应体的数据格式
	```

- get 请求

	```js
	$.get(url, [data], [callback], [type])
	url:请求的 URL 地址。
	data:请求携带的参数。
	callback:载入成功时回调函数。
	type:设置返回内容格式，xml, html, script, json, text, _default
	```

- 使用通用请求，使用 $( xxx ).ajax()

- 发送前端页面：

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>jQuery 发送 AJAX 请求</title>
	    <link crossorigin="anonymous" href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
	    <script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>  // 跨域：对某文件进行强制性的跨域请求
	</head>
	<body>
	    <div class="container">
	        <h2 class="page-header">jQuery发送AJAX请求 </h2>
	        <button class="btn btn-primary">GET</button>
	        <button class="btn btn-danger">POST</button>
	        <button class="btn btn-info">通用型方法ajax</button>
	    </div>
	    <script>
	        $('button').eq(0).click(function(){
	            $.get('http://127.0.0.1:8000/jquery-server', {a:100, b:200}, function(data){
	                console.log(data);
	            },'json');
	        });
	        
	
	        $('button').eq(1).click(function(){
	            $.post('http://127.0.0.1:8000/jquery-server', {a:100, b:200}, function(data){
	                console.log(data);
	            });
	        });
	
	        $('button').eq(2).click(function(){
	            $.ajax({
	                //url
	                url: 'http://127.0.0.1:8000/jquery-server',
	                //参数
	                data: {a:100, b:200},
	                //请求类型
	                type: 'GET',
	                //响应体结果
	                dataType: 'json',
	                //成功的回调
	                success: function(data){
	                    console.log(data);
	                },
	                //超时时间
	                timeout: 2000,
	                //失败的回调
	                error: function(){
	                    console.log('出错啦!!');
	                },
	                //头信息
	                headers: {
	                    c:300,
	                    d:400
	                }
	            });
	        });
	    </script>
	</body>
	</html>
	```

- 服务端处理

	```js
	app.all('/jquery-server', (request, response) => {
	    //设置响应头  设置允许跨域
	    response.setHeader('Access-Control-Allow-Origin', '*');
	    response.setHeader('Access-Control-Allow-Headers', '*');
	    // response.send('Hello jQuery AJAX');
	    const data = {name:'尚硅谷'};
	    response.send(JSON.stringify(data));
	});
	```

	



# Axios 发送 ajax 请求

- 是 vue 和 其他的一些框架等推荐的 ajax 请求工具库。

- github 网址：https://github.com/axios/axios

- 可以直接发送 post 或 get 请求，也可以使用通用方式发送 ajax 请求

- 案例：

	- 前端页面：

		```html
		<!DOCTYPE html>
		<html lang="en">
		
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <title>axios 发送 AJAX请求</title>
		    <script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js"></script>
		</head>
		
		<body>
		    <button>GET</button>
		    <button>POST</button>
		    <button>AJAX</button>
		
		    <script>
		        // https://github.com/axios/axios
		        const btns = document.querySelectorAll('button');
		
		        //配置 baseURL
		        axios.defaults.baseURL = 'http://127.0.0.1:8000';
		
		        btns[0].onclick = function () {
		            //GET 请求  'http://127.0.0.1:8000/axios-server'
		            axios.get('/axios-server', {
		                //url 参数
		                params: {
		                    id: 100,
		                    vip: 7
		                },
		                //请求头信息
		                headers: {
		                    name: 'atguigu',
		                    age: 20
		                }
		            }).then(value => {
		                console.log(value);
		            });
		        }
		
		        btns[1].onclick = function () {
		            axios.post('/axios-server', {
		                username: 'admin',
		                password: 'admin'
		            }, {
		                //url 
		                params: {
		                    id: 200,
		                    vip: 9
		                },
		                //请求头参数
		                headers: {
		                    height: 180,
		                    weight: 180,
		                }
		            });
		        }
		    
		        btns[2].onclick = function(){
		            axios({
		                //请求方法
		                method : 'POST',
		                //url
		                url: '/axios-server',
		                //url参数
		                params: {
		                    vip:10,
		                    level:30
		                },
		                //头信息
		                headers: {
		                    a:100,
		                    b:200
		                },
		                //请求体参数
		                data: {
		                    username: 'admin',
		                    password: 'admin'
		                }
		            }).then(response=>{
		                //响应状态码
		                console.log(response.status);
		                //响应状态字符串
		                console.log(response.statusText);
		                //响应头信息
		                console.log(response.headers);
		                //响应体
		                console.log(response.data);
		            })
		        }
		    </script>
		</body>
		</html>
		```

	- 服务端：

		```js
		app.all('/axios-server', (request, response) => {
		    //设置响应头  设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*');
		    response.setHeader('Access-Control-Allow-Headers', '*');
		    // response.send('Hello jQuery AJAX');
		    const data = {name:'尚硅谷'};
		    response.send(JSON.stringify(data));
		});
		```





# 使用 fetch 函数发送 ajax 请求

- 全局的 **`fetch()`** 方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象。

	- [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 和 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope) 都实现了 WorkerOrGlobalScope。 ——这意味着基本在任何场景下只要你想获取资源，都可以使用 位于 WorkerOrGlobalScope 中的 `fetch()` 方法。
	- 当遇到网络错误时，[`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 返回的 promise 会被 reject，并传回 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)，虽然这也可能因为权限或其它问题导致。成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 [`Response.ok`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/ok) 属性为 true。HTTP 404 状态并不被认为是网络错误。
	- `fetch()` 方法由 [Content Security Policy (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) 的 `connect-src`指令控制，而不是它请求的资源。

- 案例

	页面：

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>fetch 发送 AJAX请求</title>
	</head>
	<body>
	    <button>AJAX请求</button>
	    <script>
	        //文档地址
	        //https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
	        
	        const btn = document.querySelector('button');
	
	        btn.onclick = function(){
	            fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
	                //请求方法
	                method: 'POST',
	                //请求头
	                headers: {
	                    name:'atguigu'
	                },
	                //请求体
	                body: 'username=admin&password=admin'
	            }).then(response => {
	                // return response.text();
	                return response.json();
	            }).then(response=>{
	                console.log(response);
	            });
	        }
	    </script>
	</body>
	</html>
	```

	



# 跨域



## 同源策略

- 同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略。

- 同源： 协议、域名、端口号 必须完全相同。ajax 默认是遵循同源策略的，不遵循不能直接发

- 违背同源策略就是跨域。下面这些情况都属于跨域：

	- a.com  向 b.com  发送请求
	- http 向 https 发送请求
	- 3000 端口向 80 端口发送请求

- 同源策略案例

	- 前端页面

		```html
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <title>首页</title>
		</head>
		<body>
		    <h1>尚硅谷</h1>
		    <button>点击获取用户数据</button>
		    <script>
		        const btn = document.querySelector('button');
		        btn.onclick = function(){
		            const x = new XMLHttpRequest();
		            //这里因为是满足同源策略的, 所以 url 可以简写
		            x.open("GET",'/data');
		            //发送
		            x.send();
		            x.onreadystatechange = function(){
		                if(x.readyState === 4){
		                    if(x.status >= 200 && x.status < 300){
		                        console.log(x.response);
		                    }
		                }
		            }
		        }
		    </script>
		</body>
		</html>
		```

	- 服务端

		```js
		const express = require('express');
		
		const app = express();
		
		app.get('/home', (request, response)=>{
		    //响应一个页面
		    response.sendFile(__dirname + '/index.html');
		});
		
		app.get('/data', (request, response)=>{
		    response.send('用户数据');
		});
		
		app.listen(9000, ()=>{
		    console.log("服务已经启动...");
		});
		```

		

## 如何解决跨域



### **JSONP**

1. JSONP 是什么？

	JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持 get 请求。



2. JSONP 怎么工作的？

	在网页有一些标签天生具有跨域能力，比如：img、 link、 iframe、 script。JSONP 就是利用 script 标签的跨域能力（一些内置的标签的跨域能力）来发送请求的。

	\<script> 标签跨域请求返回的内容应该是一个函数调用，标准的 JS 代码



3. 原生JS 中 JSONP 的使用

	1. 动态的创建一个 script 标签

	2. 设置 script 的 src，设置回调函数

	3. 将 script 添加到 body 中

	4. 服务器中路由的处理

		```html
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <title>案例</title>
		</head>
		<body>
		    用户名: <input type="text" id="username">
		    <p></p>
		    <script>
		        //获取 input 元素
		        const input = document.querySelector('input');
		        const p = document.querySelector('p');
		        
		        //声明 handle 函数
		        function handle(data){
		            input.style.border = "solid 1px #f00";
		            //修改 p 标签的提示文本
		            p.innerHTML = data.msg;
		        }
		
		        //绑定事件
		        input.onblur = function(){
		            //获取用户的输入值
		            let username = this.value;
		            //向服务器端发送请求 检测用户名是否存在
		            //1. 创建 script 标签
		            const script = document.createElement('script');
		            //2. 设置标签的 src 属性
		            script.src = 'http://127.0.0.1:8000/check-username';
		            //3. 将 script 插入到文档中
		            document.body.appendChild(script);
		        }
		    </script>
		</body>
		</html>
		```

		服务器处理：

		```js
		//用户名检测是否存在
		app.all('/check-username',(request, response) => {
		    // response.send('console.log("hello jsonp")');
		    const data = {
		        exist: 1,
		        msg: '用户名已经存在'
		    };
		    //将数据转化为字符串
		    let str = JSON.stringify(data);
		    //返回结果
		    response.end(`handle(${str})`);
		});
		```



4. JQuery 中的 JSONP 使用

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>jQuery-jsonp</title>
	    <style>
	        #result{
	            width:300px;
	            height:100px;
	            border:solid 1px #089;
	        }
	    </style>
	    <script crossorigin="anonymous" src='https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js'></script>
	</head>
	<body>
	    <button>点击发送 jsonp 请求</button>
	    <div id="result">
	
	    </div>
	    <script>
	        $('button').eq(0).click(function(){
	            $.getJSON('http://127.0.0.1:8000/jquery-jsonp-server?callback=?', function(data){
	                $('#result').html(`
	                    名称: ${data.name}<br>
	                    校区: ${data.city}
	                `)
	            });
	        });
	    </script>
	</body>
	</html>
	```

	- 其中的 URL 的参数中必须要跟一个 callback 参数并且值为 ？，“  callback=? ”，发送请求后这个问号实际是有值的，是 jQuery 申请的一个函数，服务端获取到这个函数才可以对数据进行操作

		![image-20230129140539098](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7-3%E5%B0%8F%E6%97%B6Ajax%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301291405234.png)

		服务器获取到该字段内容并进行字符串的拼接，但是返回结果中显示输出不包含这个 callback 中的内容

		```js
		app.all('/jquery-jsonp-server',(request, response) => {
		    // response.send('console.log("hello jsonp")');
		    const data = {
		        name:'尚硅谷',
		        city: ['北京','上海','深圳']
		    };
		    //将数据转化为字符串
		    let str = JSON.stringify(data);
		    //接收 callback 参数
		    let cb = request.query.callback;
		
		    //返回结果
		    response.end(`${cb}(${str})`);
		});
		```

		返回结果显示：

		![image-20230129154057517](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7-3%E5%B0%8F%E6%97%B6Ajax%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A/202301291540643.png)



### CORS

官方文档： https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

1) CORS 是什么？

CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 请求。跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

2) CORS 怎么工作的？

CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

3) CORS 的使用

 主要是服务器端的设置：

```js
router.get("/testAJAX" , function (req , res) {

//通过 res 来设置响应头，来允许跨域请求

//res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");

res.set("Access-Control-Allow-Origin","*");

res.send("testAJAX 返回的响应");

});
```

前端页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CORS</title>
    <style>
        #result{
            width:200px;
            height:100px;
            border:solid 1px #90b;
        }
    </style>
</head>
<body>
    <button>发送请求</button>
    <div id="result"></div>
    <script>
        const btn = document.querySelector('button');

        btn.onclick = function(){
            //1. 创建对象
            const x = new XMLHttpRequest();
            //2. 初始化设置
            x.open("GET", "http://127.0.0.1:8000/cors-server");
            //3. 发送
            x.send();
            //4. 绑定事件
            x.onreadystatechange = function(){
                if(x.readyState === 4){
                    if(x.status >= 200 && x.status < 300){
                        //输出响应体
                        console.log(x.response);
                    }
                }
            }
        }
    </script>
</body>
</html>
```

服务端处理设置

```js
app.all('/cors-server', (request, response)=>{
    //设置响应头
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", '*');
    response.setHeader("Access-Control-Allow-Method", '*');
    // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    response.send('hello CORS');
});
```





























