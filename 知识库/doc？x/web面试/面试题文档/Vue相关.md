# Vue 相关

## 说一下 vue 最大特点是什么或者说 vue 核心是什么

vue最大特点我感觉就是“组件化“和”数据驱动“

  **组件化：**就是可以将页面中可复用的元素都看做成组件，写页面的过程，就是写组件，然后页面是由这些组件“拼接“起来的组件树

  **数据驱动：**就是让我们只关注数据层，只要数据变化，页面（即视图层）会自动更新，至于如何操作dom，完全交由vue去完成，咱们只关注数据，数据变了，页面自动同步变化了，很方便。





## 说一下 vue 常用基本指令有哪些

- v-if：根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。

- v-show：根据表达式之真假值，切换元素的 display CSS 属性。
- v-for：循环指令，基于一个数组或者对象渲染一个列表，vue 2.0以上必须需配合 key值 使用。
- v-bind：动态地绑定一个或多个特性，或一个组件 prop 到表达式。
- v-on：用于监听指定元素的DOM事件，比如点击事件。绑定事件监听器。
- v-model：实现表单输入和应用状态之间的双向绑定
- v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- v-once：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。



## vue 常用的修饰符

1. v-on 常用修饰符：

  - .stop - 调用 event.stopPropagation()，禁止事件冒泡。
  - .prevent - 调用 event.preventDefault()，阻止事件默认行为。
  - .capture - 添加事件侦听器时使用 capture 模式。
  - .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  - .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
  - .native - 监听组件根元素的原生事件。
  - .once - 只触发一次回调。
  - .left - (2.2.0) 只当点击鼠标左键时触发。
  - .right - (2.2.0) 只当点击鼠标右键时触发。
  - .middle - (2.2.0) 只当点击鼠标中键时触发。
  - .passive - (2.3.0) 以 { passive: true } 模式添加侦听器

  ```vue
// 如果是在自己封装的组件或者是使用一些第三方的UI库时，会发现并不起效果，这时就需要用 .native修饰符了
<el-input
  v-model="inputName"
  placeholder="搜索你的文件"
  @keyup.enter.native="searchFile(params)"
  >
<el-input> 
  ```

2. v-bind 常用修饰符：

  - .prop - 被用于绑定 DOM 属性 (property)。

  - .camel - (2.1.0+) 将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)

  - .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

3. v-model 常用修饰符：

	- .lazy - 取代 input 监听 change 事件，只有在每次触发 change 事件之后才会更新，而不会立即更新
	- .number - 输入字符串转为数字
	- .trim - 输入首尾空格过滤






## vue 组件中 data 为什么必须是函数

因为一个组件是可以共享的，但他们**的data是私有的，所以每个组件都要return一个新的data对象，返回一个唯一的对象，不要和其他组件共用一个对象**





## 说一下 v-if 和 v-show 的区别

v-if和v-show都可以显示和隐藏一个元素，但有本质区别

- v-if：是惰性的，只是值为 false 就不会加载对应元素，为 true 才动态加载对应元素
- v-show：是无论为 true 和为 false 都会加载对应 html  代码，但为 false 时用display:none 隐藏不在页面显示，但为 true 时页面上用 display:block 显示其效果
- v-if 有更大的切换开销，而 v-show 有更大加载开销（初始渲染开销）

适用场景：切换频繁的场合用v-show,切换不频繁的场合用v-if。





## 说一下 vue 自定义指令如何实现和适用场景

vue虽然有了v-for,v-if等自带vue指令，但不能满足所有的开发需求，有时需要自定义指令，自定义指令创建有全局自定义指令和局部自定义指令

```vue
/* 全局指令 */
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
	/* ... */
})

/* 局部指令 */
// 在 setup 语法糖中
<script setup>
// 在模板中启用 v-focus
const vFocus = {
	mounted: (el) => el.focus()
}
<template>
	<input v-focus />
</template>
</script>

// 在 vue2 版本中和基础 script 标签中
export default {
	setup() {
		/*...*/
	},
	directives: {
		// 在模板中启用 v-focus
		focus: {
			/* ... */
		}
	}
}
```





## 说一下 vue 过滤器是做什么的

vue过滤器主要用于对渲染出来的数据进行格式化处理。例如：后台返回的数据性别用0和1表示，但渲染到页面上不能是0和1我得转换为“男“和”女”，这时就会用到过滤器，还有商品价格读取出来的是普通数值，例如：230035,但我要在前面加个货币符号和千分分隔等，例如变成：￥230,035，都得需要vue过滤器

```js
// 局部过滤器
Vue.filter('过滤器名', function() {
	...
	return 要返回的数据格式
})

	filters: {
		capitalize: function (value) {
			if (!value) return '';
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	}

// 全局过滤器
Vue.filter('capitalize', function (value) {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});
```

```vue
{{ message | filterA | filterB }}
在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。
```





## 说一下 vue 生命周期钩子函数有哪些，分别什么时候触发

vue生命周期即为一个组件从出生到死亡的一个完整周期，主要包括以下**4个阶段：创建，挂载，更新，销毁**

我平时用的比较多的钩子是 created 和 mounted ，created 用于获取后台数据，mounted 用于 dom 挂载完后做一些 dom 操作,以及初始化插件等. beforeDestroy 用户清除定时器以及解绑事件等,

另外还新增了使用内置组件 keep-alive 来缓存实例，而不是频繁创建和销毁(开销大)
 actived 实例激活
 deactived 实例失效



在 vue3 中 新增了 setup 钩子，在最早开始执行，取代了 beforeCreate 和 Created 钩子，销毁钩子改名为 beforeUnmount， unmounted。并且在使用时需要在前面加上 on



- beforeCreate Function  在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
- created Function  在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)， 属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
- beforeMount Function  在挂载开始之前被调用：相关的 render 函数首次被调用。
- mounted Function  el 被新创建的 vm.\$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
- beforeUpdate Function  数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
- updated Function  由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
- activated Function  keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。
- deactivated Function  keep-alive 组件停用时调用。该钩子在服务器端渲染期间不被调用。
- beforeDestroy Function  实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。
- destroyed Function  Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。
- errorCaptured（2.5.0+ 新增） (err: Error, vm: Component, info: string) => ?boolean 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。





## vue 生命周期钩子都做了什么

1. beforeCreate
	- 创建空白的 vue 实例
	- data、methods 尚未被初始化，不可使用
2. created
	- Vue 实例初始化完成，完成响应式绑定
	- data、methods 都已经初始化完成，可调用
	- 尚未开始渲染模板
3. beforeMount
	- 编译模板，调用 render 生成 vdom
	- 还没有开始渲染 DOM
4. mounted
	- 完成 DOM 渲染
	- 组件创建完成
	- 开始由“创建阶段”进入“运行阶段”
5. beforeUpdate
	- data 发生了变化之后
	- 准备更新 DOM （尚未更新 DOM）
6. updated
	- data 发生变化，且 DOM 更新完成
	- 不要在updated 中修改 data，可能会导致死循环
7. beforeUnmount（beforeDestroy）
	- 组件进入销毁阶段（尚未销毁，可正常使用）
	- 可移除、解绑一些全局事件、自定义事件
8. unmounted（destoryed）
	- 组件被销毁了
	- 所有的子组件也都被销毁了





## 说一下 vue 组件通信有哪几种形式，分别是如何实现的

vue组件通讯大致有三种：父传子，子传父，还有兄弟之间通讯

  **第一种：父传子：主要通过props来实现的**

​     具体实现：父组件通过import引入子组件，并注册，在子组件标签上添加要传递的属性，子组件通过props接收，接收有两种形式一是通过数组形式[‘要接收的属性’ ]，二是通过对象形式{ }来接收，对象形式可以设置要传递的数据类型和默认值，而数组只是简单的接收

```js
const props = defineProps(['foo'])
props: ['foo']

// 使用 <script setup>
defineProps({
  title: String,
  likes: Number
})

// 非 <script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

**第二种：子传父：主要通过$emit来实现**

​     具体实现：子组件通过通过绑定事件触发函数，在其中设置this.\$emit(‘要派发的自定义事件’，要传递的值)，$emit中有两个参数一是要派发的自定义事件，第二个参数是要传递的值

然后父组件中,在这个子组件身上@派发的自定义事件,绑定事件触发的methods中的方法接受的默认值,就是传递过来的参数

```html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>

<MyComponent @some-event="callback" />
```

**第三种：兄弟之间传值有两种方法：**

​      方法一：通过event bus实现

   具体实现:创建一个空的vue并暴露出去，这个作为公共的bus,即当作两个组件的桥梁，在两个兄弟组件中分别引入刚才创建的bus，在组件A中通过bus.\$emit（’自定义事件名’，要发送的值）发送数据，在组件B中通过bus.$on（‘自定义事件名‘,function(v) { //v即为要接收的值 }）接收数据

```js
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
    ......
}) 

mounted() {
  this.$bus.$on('xxxx',this.demo)
}

this.$bus.$emit('事件名', 数据);
```

​     方法二：通过vuex实现

   具体实现：vuex是一个状态管理工具，主要解决大中型复杂项目的数据共享问题，主要包括state,actions,mutations,getters和modules 5个要素，主要流程：组件通过dispatch到 actions，actions是异步操作，再actions中通过commit到mutations，mutations再通过逻辑操作改变state，从而同步到组件，更新其数据状态



​	  方法三：通过消息订阅与发布实现





## 说一下 vue 封装组件中的 slot 作用

vue封装组件涉及三个东西:

1. 是事件(v-on,$emit)，
2. 是传参通过props
3. 是slot：slot作用主要是可以实现内容分发，组件标签内嵌套内容，可通过\<slot>\</slot>来定义占位的内容

分为具名的slot和匿名的slot，可以向插槽内部传参，作用于插槽，可以访问到父级的变量

在编写可复用组件的时候，时刻考虑组件是否可复用是有好处的。一次性组件跟其他组件紧密耦合没关系，但是可复用组件一定要定义一个清晰的公开接口。





## 说一下 vue 转场动画如何实现的

vue 转场动画主要由 vue 官方提供的内置组件\<Transition>实现，并在 vue3 中新增加了 \<TransitionGroup> 组件为一组节点同时增加动画效果

```vue
<transition name=”名称”>
        <router-view></router-view>
</transition>
```





## 说一下你对单向数据流的理解

**单向数据流**主要是vue 组件间传递数据是单向的，即数据总是由父组件传递给子组件，子组件在其内部维护自己的数据，但它无权修改父组件传递给它的数据，当开发者尝试这样做的时候，vue 将会报错。这样做是为了组件间更好的维护。

在开发中可能有多个子组件依赖于父组件的某个数据，假如子组件可以修改父组件数据的话，一个子组件变化会引发所有依赖这个数据的子组件发生变化，所以 vue 不推荐子组件修改父组件的数据





## 说一下 vue 双向数据绑定的原理

核心主要利用 ES5 中的 bject.defineProperty 实现的，然后利用里面的 getter 和 setter 来实现双向数据绑定的，

```js
// vue2
let number = 18;
const person = {
	name: 'make',
	sex: 'male',
}
Object.defineProperty(person, 'age', {
	get: function () {
		return number;
	},
	set: function (value) {
		number = value;
	}
})
console.log(person.age);
```



## 说一下 vue 路由或前端路由实现原理

前端路由实现原理主要通过以下两种技术实现的

  **第一种：利用H5的history API实现**

主要通过history.pushState 和 history.replaceState来实现，不同之处在于，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录[发布项目时,需要配置下apache]

 

  **第二种：利用url的hash实现**

我们经常在 url 中看到 #，这个 # 有两种情况，一个是我们所谓的锚点，路由里的 # 不叫锚点，我们称之为 hash，我们说的就是hash,主要利用监听哈希值的变化来触发事件 —— hashchange 事件来做页面局部更新

 

​    总结：hash 方案兼容性好，而H5的history主要针对高级浏览器。

以下为具体的API的区别:

```js
this.$router.push(location, onComplete?, onAbort?)	// 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。并且点击 <router-link :to="...">等同于调用 router.push(...)。
this.$router.replace(location, onComplete?, onAbort?)	// 这个方法不会向 history 添加新记录，而是跟它的方法名一样 --- 替换掉当前的 history 记录，所以，当用户点击浏览器后退按钮时，并不会回到之前的 URL。
this.$router.go(n)	// 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似  window.history.go(n)。
```

新的面试题：replace 和 hash 的区别：**以前在一个项目里面配置了一个二级路由,里面有tab切换部分(详情,评价,说明),因为返回上一页的时候,不能在这几个选项卡之间来回切换.所以我使用了this.$router.replace方法,不计入history记录中,所以不会出现,反复切换的bug**

 



## 说一下 vue 路由钩子（vue 路由守卫）的理解

**什么场景用得到**

vue路由钩子是在路由跳转过程中拦截当前路由和要跳转的路由的信息

有三种路由钩子：

  第一种：全局路由钩子： `beforeEach(to,from,next) {  }`

  第二种：路由独享的钩子： `beforeEnter(to, from, next) {}`

  第三种：组件内的钩子：`beforeRouteEnter(to, from, next) {}`，								   `beforeRouteUpdate(to, from, next) {}`，								   `beforeRouteLeave(to, from, next) {}`，

适用场景：动态设置页面标题，判断用户登录权限等

```js
//全局路由导航守卫
vueRouter.beforeEach(function (to, from, next) {
	const nextRoute = ['detail'];
	const auth = sessionStorage.getItem("username");
	let FROMPATH = from.path;
	// 跳转至上述3个页面
	if (nextRoute.indexOf(to.name) >= 0) {
		// 上述数组中的路径，是相当于有权限的页面，访问数组列表中的页面就应该是在登陆状态下
		if (!auth) {
			let params = Object.assign({frompath:FROMPATH},from.query);
			next({path: '/newlogin',query:params});
		}
	}
	//已登录的情况再去登录页，跳转至首页
	if (to.name === 'newlogin') {
		if (auth) {
			// vueRouter.push({name: 'index'});
			next({path: '/'});
		}
	}
	next();
});
```



## 说一下 vue 路由懒加载解决什么问题的

vue路由懒加载主要解决打包后文件过大的问题，事件触发才加载对应组件中的js





## 说一下如何解决 vue 首屏加载慢或白屏

1. 路由懒加载：`const Hello = () => import('@/components/Hello.vue')`
2. 开启 Gzip 压缩：`productionGzip: true`
3. 适用 webpack 的 externals 属性把不需要打包的库文件分离出去，减少打包后文件的大小： `module exports = { externals: { jquery: 'jQuery' } }`
4. 适用 vue 的服务端渲染（SSR）





## 说一下 vue 开发环境和线上环境如何切换

主要通过检测 `process.env.NODE_ENV === 'production'` 和 `process.env.NODE_ENV === 'development'` 环境，来设置线上和线下环境地址，从而实现线上线下环境的切换。



## 说一下 vue 中 methods，computed，watch 的区别

- methods：内部都是封装好的函数，无论是否有变化只要触发就会执行

- computed：是vue独有的特性计算属性，可以对data中的依赖项再重新计算，得到一个新值，应用到视图中，和methods本质区别是computed是可缓存的，也就是说computed中的依赖项没有变化，则computed中的值就不会重新计算，而methods中的函数是没有缓存的。
- Watch是监听data和计算属性中的新旧变化。并且可以在 watch 中写一些请求数据之类的异步操作逻辑，但是在 computed 中是不能写异步逻辑的



## vue 用什么绑定事件，用什么绑定属性

用 v-on 绑定事件，简称@，用 v-bind 绑定属性，简称 ：



## vue 如何动态添加属性，实现数据响应

vue 中主要通过 `this.$set(对象, 属性, 值)` 实现动态添加属性



## vue 中的 http 请求是如何管理的

vue 中的 http 请求如果散落在vue各种组件中，不便于后期维护与管理，所以项目中通常将业务需求统一存放在一个目录下管理，例如src下的API文件夹，这里面放入组件中用到的所有封装好的http请求并导出，在其他用到的组件中导入调用。如下面封装的HTTP请求

```js
import request from '@/utils/request';

export function fetchList(query) {
	return request({
		url: '/article/list',
		method: 'get',
		params: query
	})
}

export function fetchArticle() {
	return request({
		url: '/article/detail',
		method: 'get',
	})
}
```





## 说一下你对 axios 拦截器的理解

axios拦截器可以让我们在项目中对后端http请求和响应自动拦截处理，减少请求和响应的代码量，提升开发效率同时也方便项目后期维护。如下所示：

```js
// 创建 axios 实例
const service = axios.create({
	baseURL: process.env.BASE_API,     // api 的 base_url
	timeout: 6666    // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
	config => {
		// Do something before request is sent
		console.log('axios configjl', config);
		if (store.getters.token) {
			config.headers['X-Token'] = getToken()
		}
		return config
	},
	error => {
		// Do something with request error
		console.log(error);    // for debug
		Promise.reject(error);
	}
)

// response 拦截器
service.interceptors.response.use(
	response => {
		console.log('response axios', response);
		return response;
	},
	error => {
		console.log('err' + error);  // for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error);
	}
)

export default service;
```





## 说一下 vue 和 jQuery 的区别

jQuery 主要是用来操作 DOM 的，它提供了强大的选择器，封装了好多好用的 DOM 操作方法和如何获取 ajax 的方法

vue 这主要用于数据驱动和组件化，很少操作 DOM，当然 vue 也可以通过 ref 来选择一个 DOM 结点或者一个组件

相比较来说，vue 是通过操作数据的改变来驱动页面视图的变化，不用人为的去操作 DOM，使得可以更加专注于逻辑的操作，而 JQuery 虽然方便，但还是需要人为的操作 DOM，较为复杂。





## 说一下 vue 如何实现局部样式或者说如何实现组件之间样式不冲突的和实现原理是什么

css没有局部样式的概念，vue脚手架通过一些方式实现了，即在style标签上添加scoped 属性

scoped的实现原理：vue通过 postcss 给每个dom元素添加一个以data-开头的随机自定义属性实现的

 

## vue 工程目录结构

- build：项目构建目录
- config：项目配置，包括代理配置，线上和线下环境配置
- node_modules：node包目录，npm install安装的包都在这个目录
- src：平时开发时的目录
- static：存入一些静态资源资源目录，我们可以把一些图片，字体，json数据放在这里。
- .eslintrc.js：Eslint代码检查配置文件
- .babelrc：ES6配置
- .gitignore：忽略提交到远程仓库的配置



## 说一下你对 vuex 的理解

vuex是一个状态管理工具，主要解决大中型复杂项目的数据共享问题，主要包括state,actions,mutations,getters和modules 5个要素，主要流程：组件通过dispatch到 actions，actions是异步操作（可以进行异步操作，如计时器：等待一段时间后再相加（送给 mutations）），在 actions 中通过 commit 到 mutations ，mutations 再通过逻辑操作改变state，从而同步到组件，更新其数据状态,而getters相当于组件的计算属性对,组件中获取到的数据做提前处理的。





## vuex 如何实现数据持久化（即刷新后数据还保留）

因为vuex中的state是存储在内存中的，一刷新就没了，例如登录状态，解决方案有：

1. 利用 H5 的本地存储（localStorage， sessionStorage）
2. 利用第三方封装好的插件，如：vuex-persistedstate
3. 利用 vue-cookie 插件来做存储
4. 可以把数据传递到后台，存储到数据库中，但是比较耗费资源





## 说一下 nextTick 的作用和使用场景

作用：vue中的nextTick主要用于处理数据动态变化后，DOM还未及时更新的问题，用nextTick就**可以获取数据更新后最新DOM的变化**。因为 Vue 的异步更新队列，所以 $nextTick 可以用来直到什么时候 DOM 会更新完成

适用场景：

1. 有时需要根据数据动态的为页面某些dom元素添加事件，这就要求在dom元素渲染完毕时去设置，但是created与mounted函数执行时一般dom并没有渲染完毕，所以就会出现获取不到，添加不了事件的问题，这回就要用到nextTick处理
2. 在 mounted 和 updated 都不能保证子组件全部挂载完成
3. 在使用某个第三方插件时 ，希望在vue生成的某些dom动态发生变化时重新应用该插件，也会用到该方法，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法。
4. 数据改变后获取焦点

场景：有一个`div`，默认用 `v-if` 将它隐藏，点击一个按钮后，改变 `v-if` 的值，让它显示出来，同时拿到这个`div`的文本内容。如果`v-if`的值是 false，直接去获取`div`内容是获取不到的，因为此时`div`还没有被创建出来，那么应该在点击按钮后，改变`v-if`的值为 true，div才会被创建，此时再去获取

```vue
<div id="app">
	<div id="div" v-if="showDiv">这是一段文本</div>
	<button @click="getText">获取div内容</button>
</div>
<script>
	const app = new Vue({
		el : "#app",
		data:{
			showDiv : false
		},
		methods:{
			getText:function(){
				this.showDiv = true;
				var text = document.getElementById('div').innnerHTML;
				console.log(text);
			}
		}
	})
</script>
```

运行后在控制台会抛出一个错误：`Cannot read property 'innnerHTML of null`，意思就是获取不到`div`元素。这里就涉及`Vue`一个重要的概念：异步更新队列。

Vue 在观察到数据变化时并不是直接更新DOM，而是开启一个队列**，**并缓冲在同一个事件循环中发生的所以数据改变。在缓冲时会去除重复数据，从而避免不必要的计算和DOM操作。然后，在下一个事件循环`tick`中，Vue刷新队列并执行实际（已去重的）工作。所以如果你用一个for循环来动态改变数据100次，其实它只会应用最后一次改变，如果没有这种机制，DOM就要重绘100次，这固然是一个很大的开销。

Vue会根据当前浏览器环境优先使用原生的`Promise.then`和`MutationObserver`，如果都不支持，就会采用`setTimeout`代替。
 知道了Vue异步更新DOM的原理，上面示例的报错也就不难理解了。事实上，在执行`this.showDiv = true`时，div仍然还是没有被创建出来，直到下一个`vue`事件循环时，才开始创建。`$nextTick`就是用来知道什么时候DOM更新完成的，所以上面的示例代码需要修改为：

```vue
<div id="app">
	<div id="div" v-if="showDiv">这是一段文本</div>
	<button @click="getText">获取div内容</button>
</div>
<script>
	var app = new Vue({
		el : "#app",
		data:{
			showDiv : false
		},
		methods:{
			getText:function(){
				this.$nextTick(function () {
					this.showDiv = true;
					var text = document.getElementById('div').innnerHTML;
					console.log(text);
				})
			}
		}
	})
</script>
```

这时再点击事件，控制台就打印出div的内容“这是一段文本”了。
 理论上，我们应该不用去主动操作DOM，因为Vue的核心思想就是数据驱动DOM，但在很多业务里，我们避免不了会使用一些第三方库，比如 popper.js、swiper等，这些基于原生`javascript`的库都有创建和更新及销毁的完整生命周期，与Vue配合使用时，就要利用好$nextTick。



## v-for 和 v-if 的优先级

```vue
<li v-for="todo in todos" v-if="!todo.isComplete">
	{{todo}}
</li>
```

对于上面的代码：

在 vue2 中，v-for 的优先级高于 v-if，所以只会渲染出未完成 todos 的节点

在 vue3 中，v-if 的优先级是高于 v-for 的，所以不推荐将两个指令一起使用



## vue 中 keep-alive 组件的作用

keep-alive：主要用于保留组件状态或避免重新渲染。

比如： 有一个列表页面和一个 详情页面，那么用户就会经常执行打开详情=>返回列表=>打开详情这样的话 列表 和 详情 都是一个频率很高的页面，那么就可以对列表组件使用\<keep-alive>\</keep-alive>进行缓存，这样用户每次返回列表的时候，都能从缓存中快速渲染，而不是重新渲染。

属性：

- include:字符串或正则表达式。只有匹配的组件会被缓存。
- exclude：字符串或正则表达式。任何匹配的组件都不会被缓存。

用法：会缓存不活动的组件实例，而不是销毁它们，是一个抽象组件，自身不会渲染一个 DOM 元素，也不会出现在父组件链中

当组件在\<keep-alive> 内被切换，在 2.2.0 及其更高版本中，**activated 和 deactivated生命周期 将会在 树内的所有嵌套组件中触发**。

- onActivated（activated）缓存组件被激活
- onDeactivated（deactivated）缓存组件被隐藏



## 对虚拟 DOM 的理解

在传统的jq中,操作的都是真实的DOM,.而一个真实dom的渲染过程,要经过渲染引擎构建DOM树.构建样式表.组建成render(渲染)树,的过程,要经过不断的重绘回流才能够展示给用户.

那么在直接js操作dom的过程中,比方说一个循环10次插入dom元素,其实每一次都会经历上面的过程..经历大量的重绘回流.代价特别大.性能低下.所以出现了虚拟dom

虚拟dom其实就是提前使用js的方式表示出dom结构树来.存储在内存里面.同样的循环.只会最终合并执行一次,大大的提高了性能.(这个地方有点儿像js中的createElementFragment文档碎片)

而在对比的过程中.通过diff算法进行比较差异.这个比较在我理解而言就是**同层比较****.**降低了时间复杂度空间复杂度一些什么玩意儿.最终把差异同步到真实dom上去.这就是我理解的虚拟dom



## mounted 钩子函数中请求数据导致页面闪屏问题

就是加载时机的问题，放在 created 中会好一些，因为在页面挂载完成之前请求就已经完成。



## VUe3 Composition API 生命周期有何不同

- 用 setup 代替了 beforeCreate 和 created
- 使用 Hooks 函数的形式，如 mounted 改为 onMounted



1.vue 优点？

2.vue 父组件向子组件传递数据？

3.子组件像父组件传递事件？

4.v-show 和 v-if 指令的共同点和不同点？

5.如何让 CSS 只在当前组件中起作用？

6.keep-alive的作用是什么

7.如何获取 dom?

8.说出几种 vue 当中的指令和它的用法？

9.vue-loader 是什么？使用它的用途有哪些？

10.为什么使用 key?

11.axios 及安装?

12.v-modal 的使用。

13.请说出 vue.cli 项目中 src 目录每个文件夹和文件的用法？

\14. 分别简述 computed 和 watch 的使用场景

15.v-on 可以监听多个方法吗？

16.$nextTick 的使用

17.vue 组件中 data 为什么必须是一个函数？

\18. 渐进式框架的理解

19.Vue 中双向数据绑定是如何实现的？

\20. 单页面应用和多页面应用区别及优缺点

21.v-if 和 v-for 的优先级

22.assets 和 static 的区别

23.vue 常用的修饰符

24.vue 的两个核心点

25.vue 和 jQuery 的区别

\26. 引进组件的步骤

27.delete 和 Vue.delete 删除数组的区别

28.SPA 首屏加载慢如何解决

29.Vue-router 跳转和 location.href 有什么区别

\30. vue slot

\31. 你们 vue 项目是打包了一个 js 文件，一个 css 文件，还是有多个文件？

32.Vue 里面 router-link 在电脑上有用，在安卓上没反应怎么解决？

33.Vue2 中注册在 router-link 上事件无效解决方法

34.RouterLink 在 IE 和 Firefox 中不起作用（路由不跳转）的问题

35.axios 的特点有哪些

\36. 请说下封装 vue 组件的过程？

37.params 和 query 的区别

38.vue 初始化页面闪动问题

39.vue 更新数组时触发视图更新的方法

40.vue 常用的 UI 组件库

\41. Vue的生命周期？

42.虚拟DOM和DIFF算法？

43.vue2和vue3原理？

44.生命周期钩子的一些使用方法：

45.开发中常用的指令有哪些?

参考链接
