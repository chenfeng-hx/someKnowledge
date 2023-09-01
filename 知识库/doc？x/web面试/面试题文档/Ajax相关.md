# Ajax 相关

## 说一下你是如何与后端进行数据交互的

答：我和后端通过 ajax 来进行数据交互的，通过统一制定的接口文档，来实现前后端高效开发，如果接口文档不能详细说明，或者接口文档上的参数请求不出数据，我会主动和后端工程师沟通，直到完成跟接口相关的业务开发。当然这其中为了验证一些接口问题，会用到一些辅助工具，比方说，runapi 这种在线测试工具。



## 如果后端数据接口没有准备好，你是如何工作的

答：如果后端接口还没有准备好，我会和后端工程师沟通，通过制定接口返回数据的格式，然后前端通过一些mock数据的工具（上家公司使用的是easymock,贼简单）来批量生成假数据，可以让前端和后端同时开发，而无需等待后端数据接口写好再开发，这样提升项目整体的开发效率。



## 说一下你对ajax的同源策略的理解

答：ajax同源策略是因为安全的考虑，ajax不允许访问不同域名下的资源即所谓同源策略的意思。同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互、这是一个用于隔离潜在恶意文件的重要安全机制。

如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。

1. 防御 XSS 攻击：XSS，即 Cross Site Script，中译是跨站脚本攻击。防御方法有：
	- HttpOnly 防止劫取 Cookie
	- 用户的输入检查
	- 服务端的输出检查
2. 防御 CSRF 攻击：CSRF，即 Cross Site Request Forgery，中译是跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式：
	- 验证码
	- Referer Check
	- Token验证





## 说一下什么情况下会产生跨域及产生跨域的解决方案和实现原理

https://segmentfault.com/a/1190000011145364

答：产生跨域的情况有：不同协议，不同域名，不同端口以及域名和ip地址的访问都会产生跨域。跨域是浏览器做出的限制,和后端没关系。

目前三种主流的跨域的解决方案有：

1. jsonp

  jsonp实现原理：主要是利用动态创建 script 标签请求后端接口地址，然后传递callback参数，后端接收callback，后端经过数据处理，返回callback函数调用的形式，callback中的参数就是json；实现简单且兼容性不错，但是只限于 get 请求。

  ```html
  <!--普通HTML页面实现-->
  <script>
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
  	// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
  	script.src = 'http://www.domain2.com:8080/login?
  	user=admin&callback=handleCallback';
  	document.head.appendChild(script);
  	// 回调执行函数
  	function handleCallback(value) {
  		console.log(value)
  	}
  </script>
  ```

  ```vue
  // vue 中实现
  <script setup>
  this.$http.jsonp('http://www.domain2.com:8080/login', {
  	params: {},
  	jsonp: 'handleCallback'
  }).then((res) => {
  	console.log(res);
  })
  </script>
  ```

  ```js
  // nodejs 实现
  let querystring = require('querystring');
  let http = require('http');
  let server = http.createServer();
  server.on('request', function(req, res) {
  	let params = qs.parse(req.url.split('?')[1]);
  	let fn = params.callback;
  	// jsonp返回设置
  	res.writeHead(200, { 'Content-Type': 'text/javascript' });
  	res.write(fn + '(' + JSON.stringify(params) + ')');
  	res.end();
  });
  server.listen('8080');
  console.log('Server is running at port 8080...');
  ```

2. 代理（前端代理和后端代理）

  前端代理我在vue中主要是通过vue脚手架中的config中的index文件来配置的，其中有个proxyTable来配置跨域的

3. CORS

  CORS全称叫跨域资源共享，主要是后台工程师设置后端代码（添加允许跨域响应头）来达到前端跨域请求的

4. document.domain + iframe 跨域

5. location.hash + iframe

6. window.name + iframe 跨域

7. postMessage 跨域

  这是由H5提出来的的API，IE8以上支持这个功能。

  window.postMessage() 方法可以安全地实现跨源通信。

  window.postMessage() 方法被调用时，会在所有页面脚本执行完毕之后,向目标窗口派发一个 MessageEvent 消息。

  用法：postMessage(data,origin)方法接受两个参数

  data： html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。

  origin： 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

8. Nginx 代理跨域

9. nodejs中间代理跨域

10. WebSocket协议跨域

现在的主流框架都是用代理和 CORS 跨域实现的



## 说一下原生ajax的交互过程（即流程）

答：交互流程：

1. 先创建XHR对象即XMLHttpRequest()
2. 然后 open 准备发送，open中有三个参数一是提交方式 get 和 post ,二是接口地址，三是同步和异步
3. 用send发送
4. 在发送的过程中通过 onreadystatechange 来监听接收的回调函数，可以通过判断readyState \=\=\= 4和status === 200来判断是否成功返回，然后通过 responseText 接收成功返回的数据

```js
// 创建请求对象
let xhr = new XMLHttpRequest();
// 设置请求信息，利用 open 方法打开与服务器的连接
xhr.open(method, url);
// 可以设置请求头，一般不设置
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 发送请求(get 请求不传 body 参数，传 params，只有 post 请求使用)
// 利用 send 方法发送请求('post'请求时需要额外设置请求头)
xhr.send(body);
// 接收响应 responseXML 接收 xml 格式的响应数据  responseText 接收文本格式的响应数据
xhr.onreadystatechange = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {
		let text = xhr.responseText;
		console.log(text);
	}
}
```



## ajax 缓存如何解决

通过在文件名后面添加随机数（也称为文件指纹）来实现，主要原理是浏览器对访问过的文件，首先会检测第二次请求的文件 url 在浏览器是否缓存过，如果缓存过就使用，否则如果是一个新的文件url，则从服务器重新请求



## 说一下javaScript原生，jQuery，vue，react，小程序与后台交互主要用的什么技术

- javaScript原生Ajax：用的是XMLHttpRequest对象

- jQuery中的Ajax： \$.ajax()，\$.getJSON()，\$.get()，\$.post()等

- vue中的Ajax：vue-resource（vue1.x中用）,axios(主流)

- 微信小程序Ajax：用的是小程序内置的 wx.request() 写法和 jquery 的 $.ajax() 类似，参数url, success，data，method，fail等



## 数据接口：postman可以收到数据但是axios收不到

与传参格式有关系

postman：

```http
header: content-type : application/form-data
```

axios：默认 json 提交，不是表单数据

```
header: content-type: application/x-www-from-urlencode
axios.default.header.post["content-type"] = "content-type: application/x-www-from-urlencode"
axios.create({
	baseUrl: _,
	timeoutL _,
	header: {
		"content-type": "content-type: application/x-www-from-urlencode"
	}
}) 
```

如果设置成功，但还是接受不到就是后端的问题



## Ajax 应该放在 vue 的哪个生命周期

两个选择：

- 推荐 mounted
	- created 周期中 dom 还未渲染出来，并没有真实 DOM 可供操作，而 mounted 周期中真实 dom 已经被渲染出来
	- 生命周期钩子都是同步执行的，ajax 是异步执行的，放在 mounted 中保持逻辑的统一性
- 推荐 created
	- 第一点：能更快获取到服务端数据，减少页面 loading 时间；
	- 第二点：放在 created 中有助于一致性，因为ssr 不支持 beforeMount 、mounted 钩子函数



什么是 Ajax，如何实现





1.什么是ajax？ajax作用是什么？

2.为什么要用ajax：

3.AJAX最大的特点是什么。

4.请介绍一下XMLHttprequest对象。

5.AJAX技术体系的组成部分有哪些。

6.工作当中会和后台交互吗？ 那你能说说封装好的 ajax里的几个参数吗 ？

7.Ajax的实现流程是怎样的？

8.AJAX请求总共有多少种CALLBACK

9.AJAX有哪些有点和缺点？

10.Ajax 解决浏览器缓存问题？

参考链接

https://blog.csdn.net/qq_42367749/article/details/105001503

https://www.jianshu.com/p/a318480c2b5f