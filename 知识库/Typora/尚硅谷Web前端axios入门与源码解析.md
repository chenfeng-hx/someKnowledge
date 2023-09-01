# 课程简介

【尚硅谷Web前端axios入门与源码解析】 https://www.bilibili.com/video/BV1wr4y1K7tq/?share_source=copy_web&vd_source=534cd597c2fb4b381da3354013fd5304



# 文档

中文文档：https://javasoho.com/axios/index.html



# 前置准备

## json-server 服务的搭建

github 地址：https://github.com/typicode/json-server

可以帮我们快速搭建 http 服务

第一步：下载配置包

```js
npm install -g json-server
// 有用的
npx json-server --watch db.json
```

第二步：创建一个名为 db.json 的文件并写入一些数据

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

第三步：启动服务

```
json-server --watch db.json


```

报错修改：无法将“json-server”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次

CSDN：http://t.csdn.cn/TPXpI

![image-20230131174305985](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202301311743069.png)

好吧！这样改了没有用！听评论区的可以，前面加上 npx

成功结果：

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202301311747585.png" alt="image-20230131174730522" style="zoom: 67%;" />

第四步：访问地址： http://localhost:3000/posts/1,会得到数据

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202301311748772.png" alt="image-20230131174808736" style="zoom:67%;" />

在有访问请求的时候会有提示

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202301311748612.png" alt="image-20230131174856582" style="zoom:67%;" />

给了三个地址，每个 URL 地址中的内容都不相同，其中 / ports 是获取所有文章，而 /porsts/1，是获取 id 为 1 的文章。以此类推。 





# 第一部分 axios 的理解和使用

## axios 是什么?

1. 前端最流行的 ajax 请求库

2. react/vue 官方都推荐使用 axios 发 ajax 请求

3. 文档: https://github.com/axios/axios

4. 基于 promise 的可以在浏览器中发送 ajax 请求，且在 nodejs 环境下向远端发送 http 请求



##  axios 特点

1. 基于 xhr + promise 的异步 ajax 请求库

2.  浏览器端/node 端都可以使用

3. 支持请求／响应拦截器

4. 支持请求取消

5. 请求/响应数据转换

6. 批量发送多个请求



## axios 安装

项目中多使用 npm 或 yarn 进行安装

```
npm install axios
yarn install axios
```

而在学习中多使用标签的方式去引入

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
<script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>axios配置</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
</head>
<body>
    <script>
        console.log(axios);
    </script>
</body>
</html>
```



## axios 基本使用

HTTP 请求方法： https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>axios基本使用</title>
    <link crossorigin="anonymous" href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
</head>
<body>
    <div class="container">
        <h2 class="page-header">基本使用</h2>
        <button class="btn btn-primary"> 发送GET请求 </button>
        <button class="btn btn-warning" > 发送POST请求 </button>
        <button class="btn btn-success"> 发送 PUT 请求 </button>
        <button class="btn btn-danger"> 发送 DELETE 请求 </button>
    </div>
    <script>

    </script>
</body>

</html>
```

基本方法演示（将 js 代码放到 script 标签中即可）

```js
 //获取按钮
 const btns = document.querySelectorAll('button');
 //第一个
 btns[0].onclick = function(){
     //发送 AJAX 请求
     axios({
         //请求类型
         method: 'GET',
         //URL
         url: 'http://localhost:3000/posts/2',
     }).then(response => {
         console.log(response);
     });
 }
 //添加一篇新的文章
 btns[1].onclick = function(){
     //发送 AJAX 请求
     axios({
         //请求类型
         method: 'POST',
         //URL
         url: 'http://localhost:3000/posts/',
         //设置请求体
         data: {
             title: "今天天气不错, 还挺风和日丽的",
             author: "张三"
         }
     }).then(response => {
         console.log(response);
     });
 }
 //更新数据
 btns[2].onclick = function(){
     //发送 AJAX 请求
     axios({
         //请求类型
         method: 'PUT',
         //URL
         url: 'http://localhost:3000/posts/3',
         //设置请求体
         data: {
             title: "今天天气不错, 还挺风和日丽的",
             author: "李四"
         }
     }).then(response => {
         console.log(response);
     });
  }
  //删除数据
  btns[3].onclick = function(){
      //发送 AJAX 请求
      axios({
          //请求类型
          method: 'delete',
          //URL
          url: 'http://localhost:3000/posts/3',
      }).then(response => {
          console.log(response);
      });
  }
```

其他方法演示（前端页面同上）

```js
//获取按钮
const btns = document.querySelectorAll('button');

//发送 GET 请求
btns[0].onclick = function(){
    // axios()
    axios.request({
        method:'GET',
        url: 'http://localhost:3000/comments'
    }).then(response => {
        console.log(response);
    })
}

//发送 POST 请求
btns[1].onclick = function(){
    // axios()
    axios.post(
        'http://localhost:3000/comments', 
        {
            "body": "喜大普奔",
            "postId": 2
        }).then(response => {
            console.log(response);
        })
}
```



## axios 常用语法

1. axios(config): 通用/最本质的发任意类型请求的方式

2. axios(url[, config]): 可以只指定 url 发 get 请求

3. axios.request(config): 等同于 axios(config)

4. axios.get(url[, config]): 发 get 请求

5. axios.delete(url[, config]): 发 delete 请求

6. axios.post(url[, data, config]): 发 post 请求

7. axios.put(url[, data, config]): 发 put 请求

8. axios.defaults.xxx: 请求的默认全局配置

9. axios.interceptors.request.use(): 添加请求拦截器

10. axios.interceptors.response.use(): 添加响应拦截器

11. axios.create([config]): 创建一个新的 axios(它没有下面的功能)

12. axios.Cancel(): 用于创建取消请求的错误对象

13. axios.CancelToken(): 用于创建取消请求的 token 对象

14. axios.isCancel(): 是否是一个取消请求的错误

15. axios.all(promises): 用于批量执行多个异步请求

16. axios.spread(): 用来指定接收所有成功数据的回调函数的方法

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202301312156205.png" alt="image-20230131215654111" style="zoom:50%;" />



## 难点语法的理解和使用

### axios.create(config)

1. 根据指定配置创建一个新的 axios, 也就就每个新 axios 都有自己的配置

2. 新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的

3. 为什么要设计这个语法?

​			(1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理

​			(2) 解决: 创建 2 个新 axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中



#### 拦截器函数/ajax 请求/请求的回调函数的调用顺序

1. 说明: 调用 axios()并不是立即发送 ajax 请求, 而是需要经历一个较长的流程

2. 流程: 请求拦截器2 => 请求拦截器1 => 发ajax请求 => 响应拦截器1 => 响应拦截器 2 => 请求的回调

3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是 config, 响应拦截器传递的是 response



### 取消请求

1. 基本流程

	- 配置 cancelToken 对象

	-  缓存用于取消请求的 cancel 函数

	-  在后面特定时机调用 cancel 函数取消请求

	-  在错误回调中判断如果 error 是 cancel, 做相应处理

2. 实现功能

	-  点击按钮, 取消某个正在请求中的请求

	- 在请求一个接口前, 取消前面一个未完成的请求



## axios 请求响应结果的结构

![image-20230131204232020](https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202301312042078.png)

1. config：包括请求的配置，如请求的类型，请求的 URL等

2. data： 响应体的结果，是一个对象，原因是：服务端返回的数据浏览器会做一个 JSON 解析，把它转换为一个对象方便操作

3. headers：响应头信息

4. request：保存的是 axios 发送 ajax 请求所创建的 请求对象，即 XMLHttpRequest 实例对象

5. status：响应状态码

6. statusText：响应字符串



## axios配置对象详细说明

以下内容均可以在官方 github 上找到！！！

- url：表明向哪个地址发送请求

- method：设置请求的类型

- baseURL：基地址，会和 URL 进行自行结合为路径，所以设置后更加方便，URL 只需要写相对路径即可

- transformRequest：对请求的数据进行处理，处理结束后将数据发送到服务端，对请求的数据做一个预处理。

- transformResponse：对响应的结果进行处理，处理完后再通过我们自定义的函数进行处理。对响应的结果做一个预处理。

- headers：对请求头信息做预处理

- params：用来设定请求的 URL 的参数

- paramsSerializer：对请求的参数做一个序列化，==转换为规定好的格式的字符串==

	```js
	// 比如将：
	   params: {
	       a:100,
	       b:200
	   }
	// 通过转化为以下格式：
	   url: '/post',
	   //  /post?a=100&b=200
	   //  /post/a/100/b/200
	   //  /post/a.100/b.200
	```

- data：请求体设置，有两种形式可以设置，如果是对象形式，axios 会将其转化为 JSON 格式的字符串形式，如果是字符串形式，axios 则会直接进行传递

- timeout：超时时间，单位为 ms， 如果请求的事件超过 timeout，则会取消本次请求

-  withCredentials：在跨域请求时对 cookie 的携带做一个设置，如果是 false 则不携带，如果是 true 则可以在跨域请求的时候携带 cookie

- adapter：对请求的识别器做设置，有两种：一种是发送 ajax请求，一种是在 nodejs 环境下发送 http 请求

- auth：对请求基础设置，设置用户名和密码

- responseType：对响应体的结果做格式设置，默认是‘json’

- responseEncoding：对响应体的编码方式做设置，默认是 ‘utf-8’

- ==xsrfCookieName==：跨域请求标识，对 cookie 的名字做设置，有默认值“XSRF-TOKEN”

- ==xsrfHeaderName==：跨域请求标识，对 头信息 的名字做设置，有默认值“X-XSRF-TOKEN”，==这两个都是一种安全设置，唯一的标识符，保证能够响应的请求都是从受信任的（我们自己的）客户端发送过来的，而不是一些莫名的连接发送过来的请求==

- onUploadProgress：上传时执行的回调函数

- onDownloadProgress：下载时执行的回调函数

- maxContentLength：设置 http 响应体的最大尺寸，单位为 字节

- maxBodyLength：设置请求体的最大内容

- validateStatus：对响应结果的成功做设置，即设置响应成功需要的条件

- maxRedirects：设置最大得跳转次数，向一个服务发送请求后发送跳转，设置跳转的最大次数，一般会用在 nodejs 中， ajax 用不到

- beforeRedirect：` beforeeredirect `定义了一个将在重定向之前被调用的函数，在重定向时使用它来调整请求选项，要检查最新的响应头，或者通过抛出错误来取消请求，如果maxRedirects设置为0，则不使用` beforeeredirect `。

- socketPath：socket 文件的位置，向 docker 守护进程发送请求

- httpAgent：对客户端的信息做设置

- httpsAgent：对客户端的信息做设置

- proxy：设置代理，一般用在服务端 nodejs 中，比如做爬虫的时候用到的代理

- cancelToken：对取消 ajax 请求做一个设置

- signal：使用AbortController取消Axios请求的另一种方法

- decompress：设置对响应结果是否做解压，默认是解压，用在 nodejs 中，ajax 无法使用



## axios 的默认配置

全局默认配置（前端页面同上）

```js
//获取按钮
const btns = document.querySelectorAll('button');
//默认配置
axios.defaults.method = 'GET';//设置默认的请求类型为 GET
axios.defaults.baseURL = 'http://localhost:3000';//设置基础 URL
axios.defaults.params = {id:100};
axios.defaults.timeout = 3000;//

btns[0].onclick = function(){
    axios({
        url: '/posts'
    }).then(response => {
        console.log(response);
    })
}
```



## axios 创建实例对象发送请求

使用 axios.create() 方法创建实例对象

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>axios实例对象对象</title>
    <link crossorigin="anonymous" href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
</head>
<body>
    <div class="container">
        <h2 class="page-header">基本使用</h2>
        <button class="btn btn-primary"> 发送GET请求 </button>
        <button class="btn btn-warning" > 发送POST请求 </button>
        <br>
    </div>
    <script>
        //获取按钮
        const btns = document.querySelectorAll('button');
        
        //创建实例对象  /getJoke
        const duanzi = axios.create({
            baseURL: 'https://api.apiopen.top',
            timeout: 2000
        });

        // 当有多个服务器时，可以创建多个实例对象，一一区分对应
        const another = axios.create({
            baseURL: 'https://b.com',
            timeout: 2000
        });
        //这里  duanzi 与 axios 对象的功能几近是一样的
        // duanzi({
        //     url: '/getJoke',
        // }).then(response => {
        //     console.log(response);
        // });

        duanzi.get('/getJoke').then(response => {
            console.log(response.data)
        })
    </script>
</body>

</html>
```



## axios 拦截器（重点）

请求拦截器：可以对请求的参数进行处理

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>拦截器</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
</head>
<body>
    <script>
        // Promise
        // 设置请求拦截器  config 配置对象
        axios.interceptors.request.use(function (config) {
            console.log('请求拦截器 成功 - 1号');
            //修改 config 中的参数
            config.params = {a:100};

            return config;
        }, function (error) {
            console.log('请求拦截器 失败 - 1号');
            return Promise.reject(error);
        });

        axios.interceptors.request.use(function (config) {
            console.log('请求拦截器 成功 - 2号');
            //修改 config 中的参数
            config.timeout = 2000;
            return config;
        }, function (error) {
            console.log('请求拦截器 失败 - 2号');
            return Promise.reject(error);
        });

        // 设置响应拦截器
        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 1号');
            return response.data;
            // return response;
        }, function (error) {
            console.log('响应拦截器 失败 1号')
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 2号')
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 2号')
            return Promise.reject(error);
        });

        //发送请求
        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts'
        }).then(response => {
            console.log('自定义回调处理成功的结果');
            console.log(response);
        });
    </script>   
</body>
</html>
```



## axios取消请求

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>取消请求</title>
    <link crossorigin='anonymous' href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
</head>
<body>
    <div class="container">
        <h2 class="page-header">axios取消请求</h2>
        <button class="btn btn-primary"> 发送请求 </button>
        <button class="btn btn-warning" > 取消请求 </button>
    </div>
    <script>
        //获取按钮
        const btns = document.querySelectorAll('button');
        //2.声明全局变量
        let cancel = null;
        //发送请求
        btns[0].onclick = function(){
            //检测上一次的请求是否已经完成
            if(cancel !== null){
                //取消上一次的请求
                cancel();
            }
            axios({
                method: 'GET',
                url: 'http://localhost:3000/posts',
                //1. 添加配置对象的属性
                cancelToken: new axios.CancelToken(function(c){
                    //3. 将 c 的值赋值给 cancel
                    cancel = c;
                })
            }).then(response => {
                console.log(response);
                //将 cancel 的值初始化
                cancel = null;
            })
        }

        //绑定第二个事件取消请求
        btns[1].onclick = function(){
            cancel();
        }
    </script>   
</body>
</html>
```





# 第二部分 axios 源码分析

## 源码目录结构

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202302010918513.png" alt="image-20230201091745166" style="zoom: 50%;" />

- dist：打包后的文件，输出的文件
	- axios.js：未压缩的文件，执行起来更好
	- axios.min.js：压缩后的文件，更加轻量
- lib：核心目录，所有的源代码都放在这里
	- adapters：适配器目录
		- http.js：在 nodejs 环境中向远端发送 http 服务，在服务端做接口，或者使用爬虫都用这个
		- xhr.js：在浏览器端向服务器发送 ajax 请求
	- cancel：与取消功能相关的 内容
		- Cancel.js：创建取消请求的实例对象
		- CancelToken.js：创建取消请求的构造函数
		- ~~isCancel.js：对取消值的判断，判断是否是一个取消请求对象（感觉觉不太对劲）~~
	- core：一个核心功能的文件
		- Axios.js：存放 axios 的构造函数
		- createError.js：创建error对象的函数，创建指定信息的 Error 对象
		- dispatchRequest.js：用来调用 http 请求适配器方法发送请求的函数
		- enhanceError.js：更新错误对象的函数文件
		- InterceptorManger.js：拦截器的管理器
		- mergeConfig.js：合并配置的文件
		- setttle.js：根据 http 响应状态，改变 promise 的状态
		- transformData.js
		- buildFullPath.js：构建完整 URL 的函数文件
	- helpers：存放一些功能函数
		- bind.js：返回一个新的函数，并将新函数 this 绑定到一个对象身上
		- buildURL.js：创建一个 URL 将参数缀到 URL 后，并返回格式化后的内容
		- combineURLs.js：合并 URL 函数，将 baseURL 和 relativeURL 合并在一起
		- cookies.js：对 cookie 做一些处理
		- deprecatedMethod.js：基本很少使用，控制台提示不赞成使用的方法，会在控制台提示哪些方法不赞成使用
		- isAbsoluteURL.js：判断是否为绝对路径 URL
		- isURLSameOrigin.js：检测是否为同源的 URL
		- normalizeHeaderName.js：统一化头信息，统一为大写
		- parseHeaders.js：解析头信息
		- ~~spread.js：对 ajax 请求做批量的处理？？？  对 批量的的 ajax请求做处理？？？~~
	- axios.js：axios 的入口文件（真正的入口文件）
	- default.js：axios 的默认配置文件
	- utils.js：工具函数文件，包含很多的工具函数
- CHANGELOG.md：升级说明
- index.d.ts：TS版本文件
- index.js：整个包的入口文件
- LINCENSE：许可证
- package.json：npm 包的配置文件
- README.md：文档说明
- UPGRADE_GUIDE.md：升级指引



## 源码分析

###  axios 与 Axios 的关系？

1. 从语法上来说: axios 不是 Axios 的实例

2. 从功能上来说: axios 是 Axios 的实例

3. axios 是 Axios.prototype.request 函数 bind()返回的函数

4. axios 作为对象有 Axios 原型对象上的所有方法, 有 Axios 对象上所有属性



**`bind()`** 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。



 

### instance 与 axios 的区别?

1. 相同: 

​			(1) 都是一个能发任意请求的函数: request(config)

​			(2) 都有发特定请求的各种方法: get()/post()/put()/delete()

​			(3) 都有默认配置和拦截器的属性: defaults/interceptors

2. 不同:

​			(1) 默认配置很可能不一样

​			(2) instance 没有 axios 后面添加的一些方法: create()/CancelToken()/all()



### axios 对象创建过程模拟实现

```js
//构造函数
function Axios(config) {
    //初始化
    this.defaults = config;//为了创建 default 默认属性
    this.intercepters = {
        request: {},
        response: {}
    }
}
//原型添加相关的方法
Axios.prototype.request = function (config) {
    console.log('发送 AJAX 请求 请求的类型为 ' + config.method);
}
Axios.prototype.get = function (config) {
    return this.request({ method: 'GET' });
}
Axios.prototype.post = function (config) {
    return this.request({ method: 'POST' });
}

//声明函数
function createInstance(config) {
    //实例化一个对象
    let context = new Axios(config);// context.get()  context.post()  但是不能当做函数使用 context() X
    //创建请求函数
    let instance = Axios.prototype.request.bind(context);// instance 是一个函数 并且可以 instance({})  此时 instance 不能 instance.get X
    //将 Axios.prototype 对象中的方法添加到instance函数对象中
    Object.keys(Axios.prototype).forEach(key => {
        // 使用 bind 方法绑定，此时 this 的执行始终是指向 content 实例对象的，不加也是指向的，但是更加严谨一些
        instance[key] = Axios.prototype[key].bind(context);// this.default  this.interceptors
    });
    //为 instance 函数对象添加属性 default 与 interceptors
    Object.keys(context).forEach(key => {
        instance[key] = context[key];
    });
    return instance;
}

let axios = createInstance();
//发送请求
// axios({method:'POST'});
axios.get({});
axios.post({});

```





### axios 运行的整体流程（模拟 axios 发送请求的整体流程）

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202302011142099.png" alt="image-20230201114216979" style="zoom: 67%;" />

1. 整体流程: 

​		==request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)==（上图）

2. request(config): 

​		将请求拦截器 / dispatchRequest() / 响应拦截器 通过 promise 链串连起来, 返回 promise

3. dispatchRequest(config): 

​		转换请求数据 ===> 调用 xhrAdapter()发请求 ===> 请求返回后转换响应数据. 返回 promise

4. xhrAdapter(config): 

​		创建 XHR 对象, 根据 config 进行相应设置, 发送特定请求, 并接收响应数据, 返回 promise 



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>请求发送过程</title>
    <!-- <script src="./node_modules/axios/dist/mine-axios.js"></script> -->
</head>
<body>
    <script>
        // axios 发送请求   axios  Axios.prototype.request  bind
        //1. 声明构造函数
        function Axios(config){
            this.config = config;
        }
        Axios.prototype.request = function(config){
            //发送请求
            //创建一个 promise 对象
            let promise = Promise.resolve(config);
            //声明一个数组
            let chains = [dispatchRequest, undefined];// undefined 占位
            //调用 then 方法指定回调
            let result = promise.then(chains[0], chains[1]);
            //返回 promise 的结果
            return result;
        }

        //2. dispatchRequest 函数
        function dispatchRequest(config){
            //调用适配器发送请求
            return xhrAdapter(config).then(response => {
                //响应的结果进行转换处理
                //....
                return response;
            }, error => {
                throw error;
            });
        }

        //3. adapter 适配器
        function xhrAdapter(config){
            console.log('xhrAdapter 函数执行');
            return new Promise((resolve, reject) => {
                //发送 AJAX 请求
                let xhr = new XMLHttpRequest();
                //初始化
                xhr.open(config.method, config.url);
                //发送
                xhr.send();
                //绑定事件
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        //判断成功的条件
                        if(xhr.status >= 200 && xhr.status < 300){
                            //成功的状态
                            resolve({
                                //配置对象
                                config: config,
                                //响应体
                                data: xhr.response,
                                //响应头 getAllResponseHeaders() 返回所有的响应头
                                headers: xhr.getAllResponseHeaders(), //字符串  parseHeaders
                                // xhr 请求对象
                                request: xhr,
                                //响应状态码
                                status: xhr.status,
                                //响应状态字符串
                                statusText: xhr.statusText
                            });
                        }else{
                            //失败的状态
                            reject(new Error('请求失败 失败的状态码为' + xhr.status));
                        }
                    }
                }
            });
        }


        //4. 创建 axios 函数
        let axios = Axios.prototype.request.bind(null);
        axios({
            method:'GET',
            url:'http://localhost:3000/posts'
        }).then(response => {
            console.log(response);
        });
    </script>
</body>
</html>
```





### axios 的请求/ 相应拦截器是什么？

<img src="https://gitee.com/chenfenghx/typora-images/raw/master/%E5%B0%9A%E7%A1%85%E8%B0%B7Web%E5%89%8D%E7%AB%AFaxios%E5%85%A5%E9%97%A8%E4%B8%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/202302011144327.png" alt="image-20230201114415234" style="zoom:80%;" />

1. 请求拦截器: 

​		在真正发送请求前执行的回调函数

​		可以对请求进行检查或配置进行特定处理

​		成功的回调函数, 传递的默认是 config(也必须是)

​		失败的回调函数, 传递的默认是 error

2. 响应拦截器

​		在请求得到响应后执行的回调函数

​		可以对响应数据进行特定处理

​		成功的回调函数, 传递的默认是 response

​		失败的回调函数, 传递的默认是 error

拦截器的执行原理：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>拦截器</title>
    <script src="./node_modules/axios/dist/mine-axios.js"></script>
</head>
<body>
    <script>
        console.dir(axios);
        // 设置请求拦截器  config 配置对象
        // use 的使用其实只是将这两个回调保存在了 request 的 handlers 属性上
        axios.interceptors.request.use(function one(config) {
            console.log('请求拦截器 成功 - 1号');
            return config;
        }, function one(error) {
            console.log('请求拦截器 失败 - 1号');
            return Promise.reject(error);
        });

        axios.interceptors.request.use(function two(config) {
            console.log('请求拦截器 成功 - 2号');
            return config;
        }, function two(error) {
            console.log('请求拦截器 失败 - 2号');
            return Promise.reject(error);
        });

        // 设置响应拦截器
        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 1号');
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 1号')
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 2号')
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 2号')
            return Promise.reject(error);
        });

        //发送请求
        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts'
        }).then(response => {
            console.log(response);
        });
    </script>
</body>
</html>
```



模拟 axios 拦截器

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>拦截器</title>
    <!-- <script src="./node_modules/axios/dist/mine-axios.js"></script> -->
</head>
<body>
    <script>
        //构造函数
        function Axios(config){
            this.config = config;
            this.interceptors = {
                request: new InterceptorManager(),
                response: new InterceptorManager(),
            }
        }
        //发送请求  难点与重点
        Axios.prototype.request = function(config){
            //创建一个 promise 对象
            let promise = Promise.resolve(config);
            //创建一个数组
            const chains = [dispatchRequest, undefined];
            //处理拦截器
            //请求拦截器 将请求拦截器的回调 压入到 chains 的前面  request.handles = []
            this.interceptors.request.handlers.forEach(item => {
                chains.unshift(item.fulfilled, item.rejected);
            });
            //响应拦截器
            this.interceptors.response.handlers.forEach(item => {
                chains.push(item.fulfilled, item.rejected);
            });

            // console.log(chains);
            //遍历
            while(chains.length > 0){
                promise = promise.then(chains.shift(), chains.shift());
            }

            return promise;
        }

        //发送请求
        function dispatchRequest(config){
            //返回一个promise 队形
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    statusText: 'OK'
                });
            });
        }
       
        //创建实例
        let context = new Axios({});
        //创建axios函数
        let axios = Axios.prototype.request.bind(context);
        //将 context 属性 config interceptors 添加至 axios 函数对象身上
        Object.keys(context).forEach(key => {
            axios[key] = context[key];
        });

        //拦截器管理器构造函数
        function InterceptorManager(){
            this.handlers = [];
        }
        InterceptorManager.prototype.use = function(fulfilled, rejected){
            this.handlers.push({
                fulfilled,
                rejected
            })
        }


        //以下为功能测试代码
        // 设置请求拦截器  config 配置对象
        axios.interceptors.request.use(function one(config) {
            console.log('请求拦截器 成功 - 1号');
            return config;
        }, function one(error) {
            console.log('请求拦截器 失败 - 1号');
            return Promise.reject(error);
        });

        axios.interceptors.request.use(function two(config) {
            console.log('请求拦截器 成功 - 2号');
            return config;
        }, function two(error) {
            console.log('请求拦截器 失败 - 2号');
            return Promise.reject(error);
        });

        // 设置响应拦截器
        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 1号');
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 1号')
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 2号')
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 2号')
            return Promise.reject(error);
        });


        //发送请求
        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts'
        }).then(response => {
            console.log(response);
        });
    </script>
</body>
</html>
```



### axios 的请求/ 响应数据转换器是什么？

1. 请求转换器: 对请求头和请求体数据进行特定处理的函数

```js
if (utils.isObject(data)) {

 	setContentTypeIfUnset(headers, 'application/json;charset=utf-8');

 	return JSON.stringify(data);

}
```

2. 响应转换器: 将响应体 json 字符串解析为 js 对象或数组的函数

```js
response.data = JSON.parse(response.data)
```



### response 的整体结构

```json
{
 	data,
 	status,
 	statusText,
 	headers,
 	config,
 	request
 }
```



### error 的整体结构

```json
{
    message，
    response，
    request
}
```



### 如何取消未完成的请求？

1. 当配置了 cancelToken 对象时, 保存 cancel 函数

​			(1) 创建一个用于将来中断请求的 cancelPromise

​			(2) 并定义了一个用于取消请求的 cancel 函数

​			(3) 将 cancel 函数传递出来

2. 调用 cancel()取消请求

​			(1) 执行 cacel 函数, 传入错误信息 message

​			(2) 内部会让 cancelPromise 变为成功, 且成功的值为一个 Cancel 对象

​			(3) 在 cancelPromise 的成功回调中中断请求, 并让发请求的 proimse 失败, 失败的 reason 为 Cancel 对象



axios 请求取消：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>取消请求</title>
    <link crossorigin='anonymous' href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="./node_modules/axios/dist/mine-axios.js"></script>
</head>
<body>
    <div class="container">
        <h2 class="page-header">axios取消请求</h2>
        <button class="btn btn-primary"> 发送请求 </button>
        <button class="btn btn-warning"> 取消请求 </button>
    </div>
    <script>
        //获取按钮
        const btns = document.querySelectorAll('button');
        //2.声明全局变量
        let cancel = null;
        //发送请求
        btns[0].onclick = function(){
            //检测上一次的请求是否已经完成
            if(cancel !== null){
                //取消上一次的请求
                cancel();
            }

            //创建 cancelToken 的值
            let cancelToken = new axios.CancelToken(
                function(c){
                    //3. 将 c 的值赋值给 cancel
                    cancel = c;
                });

            axios({
                method: 'GET',
                url: 'http://localhost:3000/posts',
                //1. 添加配置对象的属性
                cancelToken: cancelToken
            }).then(response => {
                console.log(response);
                //将 cancel 的值初始化
                cancel = null;
            })
        }

        //绑定第二个事件取消请求
        btns[1].onclick = function(){
            cancel();
        }
    </script>   
</body>
</html>
```



axios 模拟请求取消：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>取消请求</title>
    <link crossorigin='anonymous' href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <!-- <script src="./node_modules/axios/dist/mine-axios.js"></script> -->
</head>
<body>
    <div class="container">
        <h2 class="page-header">axios取消请求</h2>
        <button class="btn btn-primary"> 发送请求 </button>
        <button class="btn btn-warning"> 取消请求 </button>
    </div>
    <script>
        //构造函数
        function Axios(config){
            this.config = config;
        }
        //原型 request 方法
        Axios.prototype.request = function(config){
            return dispatchRequest(config);
        }
        //dispatchRequest 函数
        function dispatchRequest(config){
            return xhrAdapter(config);
        }
        //xhrAdapter
        function xhrAdapter(config){
            //发送 AJAX 请求
            return new Promise((resolve, reject) => {
                //实例化对象
                const xhr = new XMLHttpRequest();
                //初始化
                xhr.open(config.method, config.url);
                //发送
                xhr.send();
                //处理结果
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        //判断结果
                        if(xhr.status >= 200 && xhr.status < 300){
                            //设置为成功的状态
                            resolve({
                                status: xhr.status,
                                statusText: xhr.statusText
                            });
                        }else{
                            reject(new Error('请求失败'));
                        }
                    }
                }
                //关于取消请求的处理
                if(config.cancelToken){
                    //对 cancelToken 对象身上的 promise 对象指定成功的回调
                    config.cancelToken.promise.then(value => {
                        xhr.abort();
                        //将整体结果设置为失败
                        reject(new Error('请求已经被取消'))
                    });
                }
            })
        }

        //创建 axios 函数
        const context = new Axios({});
        const axios = Axios.prototype.request.bind(context);

        //CancelToken 构造函数
        function CancelToken(executor){
            //声明一个变量
            var resolvePromise;
            //为实例对象添加属性
            this.promise = new Promise((resolve) => {
                //将 resolve 赋值给 resolvePromise
                resolvePromise = resolve
            });
            //调用 executor 函数
            executor(function(){
                //执行 resolvePromise 函数
                resolvePromise();
            });
        }

        //获取按钮 以上为模拟实现的代码
        const btns = document.querySelectorAll('button');
        //2.声明全局变量
        let cancel = null;
        //发送请求
        btns[0].onclick = function(){
            //检测上一次的请求是否已经完成
            if(cancel !== null){
                //取消上一次的请求
                cancel();
            }

            //创建 cancelToken 的值
            let cancelToken = new CancelToken(function(c){
                cancel = c;
            });

            axios({
                method: 'GET',
                url: 'http://localhost:3000/posts',
                //1. 添加配置对象的属性
                cancelToken: cancelToken
            }).then(response => {
                console.log(response);
                //将 cancel 的值初始化
                cancel = null;
            })
        }

        //绑定第二个事件取消请求
        btns[1].onclick = function(){
            cancel();
        }
    </script>   
</body>
</html>
```

