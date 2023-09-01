# CSS 相关

## css3 新增特性有哪些

css3比css2多了好多针对移动端的特性，比如：

- 圆角：border-radius
- 边框图片：border-image、border-width
- 盒阴影：box-shadow、文字阴影：text-shadow
- 动画：transition(过渡),transform（实现位移，倾斜，旋转，绽放）,animation（关键帧动画）
- linear-gradient：线性渐变，radial-gradient：径向渐变，如用在background
- 2D/3D转换 transform：rotate(旋转) scale(缩放) translate(位移)
- @media媒体查询，根据屏幕宽度，设置，用来解决移动端适配,根据屏幕大小使相应的css生效
- flex布局(弹性盒子)
- 



## CSS3新增伪类举例

http://t.csdn.cn/3hObO

-  p:first-of-type 
-  p:last-of-type 
-  p:only-of-type 
-  p:only-child 
-  p:nth-child(2) 
-  :enabled :disabled 控制表单控件的禁用状态。
-  :checked 单选框或复选框被选中。





## 如何实现一个 div 水平垂直居中

1. 定位：通过给div设置绝对定位，并且left,right,top,bottom设置为0,margin:auto即可以水平垂直居中

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
		<head>
			<meta charset="UTF-8">
			<title>div居中.html</title>
			<style>
				div {
					width: 200px;
					height: 200px;
					background-color: pink;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
			</style>
		</head>
		<body>
		<!-- 注释 -->
		<div></div>
		</body>
	</html>
	```

2. 定位：通过给div设置绝对定位，left为50%,top为50%,再给div设置距左是自身的一半即：margin-left:自身宽度/2,margin-top:自身高度/2。

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<title>div居中.html</title>
		<style>
			div {
				width: 200px;
				height: 200px;
				background-color: pink;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -100px;
				margin-left: -100px;
			}
		</style>
	</head>
	<body>
	<!-- 注释 -->
	<div></div>
	</body>
	</html>
	```

3. 通过给div设置绝对定位，left为50%,top为50%，再通过平移进行操作

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<title>div居中.html</title>
		<style>
			div {
				width: 200px;
				height: 200px;
				background-color: pink;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-100px, -100px);
			}
		</style>
	</head>
	<body>
	<!-- 注释 -->
	<div></div>
	</body>
	</html>
	```

4. flex布局：有两个div，父级div和子级div，给父级div设置display:flex,并且设置父级div的水平居中justify-content:center，并且给父级div设置垂直居中align-items:center

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<title>div居中.html</title>
		<style>
			.outer {
				width: 200px;
				height: 200px;
				background-color: pink;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-100px, -100px);
			}
			.inner {
				width: 50px;
				height: 50px;
				background-color: orange;
			}
		</style>
	</head>
	<body>
	<!-- 注释 -->
	<div class="outer">
		<div class="inner"></div>
	</div>
	</body>
	</html>
	```

5. 对于上面的方法，可以对子元素设置 margin 替换

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<title>div居中.html</title>
		<style>
			.outer {
				width: 200px;
				height: 200px;
				background-color: pink;
				display: flex;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-100px, -100px);
			}
			.inner {
				width: 50px;
				height: 50px;
				background-color: orange;
				margin: auto;
			}
		</style>
	</head>
	<body>
	<!-- 注释 -->
	<div class="outer">
		<div class="inner"></div>
	</div>
	</body>
	</html>
	```

6. 





## clearfix 是解决什么问题的（div 塌陷问题如何解决）

浮动元素可能会导致包含它们的父元素高度塌陷，这是因为父元素无法自动计算浮动元素的高度（浮动元素父元素高度自适应：父元素不写高度时，子元素写了浮动父元素才发生高度塌陷）

解决的方法有很多，主要目的是让父级元素有高度

1. 给父级元素设置绝对定位

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  	<head>
  		<meta charset="UTF-8">
  		<title>高度塌陷问题.html</title>
  		<style>
  			ul {
  				position: absolute;
  			}
  			ul li {
  				float: left;
  			}
  		</style>
  	</head>
  	<body>
  		<!-- 注释 -->
  		<ul>
  			<li>1</li>
  			<li>2</li>
  			<li>3</li>
  		</ul>
  	</body>
  </html>
  ```

2. 给父级元素设置 overflow：hidden 或 auto

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
  	<meta charset="UTF-8">
  	<title>高度塌陷问题.html</title>
  	<style>
  		ul {
  			overflow: hidden;
  		}
  		ul li {
  			float: left;
  		}
  	</style>
  </head>
  <body>
  <!-- 注释 -->
  <ul>
  	<li>1</li>
  	<li>2</li>
  	<li>3</li>
  </ul>
  </body>
  </html>
  ```

3. 通过伪对象来实现（clear清除浮动，添加空 div 法，在浮动元素下方添加空 div，但是弊端是增加了无意义的标签）

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
  	<meta charset="UTF-8">
  	<title>高度塌陷问题.html</title>
  	<style>
  		.clearfix:after {
  			content: " ";
  			display: block;
  			clear: both;
  			height: 0;
              /*
              overflow: hidden;
              visibility: hidden;
              */
  		}
  		ul li {
  			float: left;
  		}
  	</style>
  </head>
  <body>
  <!-- 注释 -->
  <ul>
  	<li>1</li>
  	<li>2</li>
  	<li>3</li>
  	<div class="clearfix"></div>
  </ul>
  </body>
  </html>
  
  ```

4. 给父元素设置高度

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<title>高度塌陷问题.html</title>
		<style>
			ul {
				height: 20px;
			}
			ul li {
				float: left;
			}
		</style>
	</head>
	<body>
	<!-- 注释 -->
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	</body>
	</html>
	```

5. 父级元素同时添加浮动（需要同时给同级元素浮动）

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<title>高度塌陷问题.html</title>
		<style>
			ul {
				float: left;
			}
			ul li {
				float: left;
			}
		</style>
	</head>
	<body>
	<!-- 注释 -->
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	</body>
	</html>
	```

6. 给父元素设置 display：inline-block，但是margin： 0 auto 居中方法会失效

	```html
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<title>高度塌陷问题.html</title>
		<style>
			ul {
				display: inline-block;
			}
			ul li {
				float: left;
			}
		</style>
	</head>
	<body>
	<!-- 注释 -->
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	</body>
	</html>
	```

7. 




## 说一下你对盒模型的理解（包括 IE 和 w3c 标准盒模型）

盒模型其实就是浏览器把一个个标签都看一个形象中的盒子，那每个盒子（即标签）都会有内容(width,height)，边框(border)，以及内容和边框中间的缝隙（即内间距padding），还有盒子与盒子之间的外间距（即margin）,用图表示为：

<img src="http://images.xiaohai-hx.cn/%E5%A4%8D%E4%B9%A0%E7%AC%94%E8%AE%B0/%E9%9D%A2%E8%AF%95%E9%A2%98/image-20230504145023446.png" alt="image-20230504145023446" style="zoom:50%;" />

盒模型包括两种：IE盒模型和w3c标准盒模型

- 标准盒模型(chrome、IE9+，添加doctype)：width = content + border + padding+ margin
- 低版本 IE 盒模型(TE678以下，不添加doctype)：width = content + border + padding
- inherit可以继承父盒子模型

盒模型之间的切换：

- box-sizing：border-box  //IE盒模型
- box-sizing：content-box  //w3c盒模型



## css3 动画

css3 动画大致包括两种：

1. 第一种：过渡动画：主要通过transition来实现，通过设置过渡属性，运动时间，延迟时间和运动速度实现。
2. 第二种：关键帧动画：主要通过animation配合@keyframes实现

transition动画和animation动画的主要区别有两点：

1. 第一点transition动画需要事件来触发，animation不需要
2. 第二点:transition只要开始结束两种状态，而animation可以实现多种状态，并且animation是可以做循环次数甚至是无限运动





## rem 和 em 的区别

rem和em都是相对单位，主要参考的标签不同：

1. rem是相对于根字号，即相对于\<html>标签的font-size实现的，浏览器默认字号是font-size:16px
2. em:是相对于父元素标签的字号，和百分比%类似，%也是相对于父级的，只不过是%相对于父级宽度的，而em相对于父级字号的





## 手机端如何做适配的

前端做适配没有最好的方法，只有适合的方法，目前前端主要做适配的方法有：百分比，em,rem,媒体查询(即media query),flex布局（即弹性盒），vw,vh等

目前我在项目中用的多的是rem，flex布局，有时会用到媒体查询，在做pc响应式布局时用

主要是用了一个手淘的js库[flexible.js](http://caibaojian.com/t/flexible-js),在页面变化时,检测页面宽度,除以10份,动态的赋值给font-size.属性.;而页面的布局我是通过rem来进行布局的,所以就可以适配所有的移动端设备了





## vw 和 vh 了解吗

vw和vh是最近2年才慢慢火起来的css布局单位，现在已经被一些公司在使用，

vw和vh分别相对于屏幕宽度和屏幕高度的，1vw相当于屏幕宽度的1%,100vw相当于满屏宽度100%,

vh和vh类似，只不过是相对于屏幕高度的，1vh相当于屏幕高度的1%,100vh相当于满屏高度的100%





## 谷歌浏览器如何显示 12px 以下的字号

中文版的chrome有个12px字体限制的问题，就是当字体小于12px时候都以12px来显示，这个问题在中文网站中并不突出，因为中文字体为了显示清晰一般都定义为大于或等于12px，但如果是一些英文网站那就不好说了，这时12px的限制就会破坏页面的美感，甚至因为文字变大而导致页面变形。

以前有个属性#chrome10px{ -webkit-text-size-adjust:none; font-size:10px; },但是新版谷歌已经不起作用了.我们可以通过css3的缩放来实现这个问题,比方说我要展示10px的文字,我可以通过设置字体20px,然后scale(0.5)。





## css 的兼容性



## UI 库样式穿透问题

\>\>\> ， /deep/ ， ::v-deep 都是深度选择器，可以实现样式穿透

如果使用 css 写的样式表，可以使用 \>\>\> 

如果使用预处理器 less 或 sass 写的样式表，使用  /deep/ 或 ::v-deep

vue2 版本使用优先级 /deep/ > \>>> 

vue3 版本使用 ::v-deep， /deep/ 在 vue3 版本中会报错，在 sass 文件中也会报错，使用 ::v-deep 替代



## BFC

BFC（Block Formatting Context）格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

形成 BFC 的条件：

-  浮动元素，float 除 none 以外的值
-  定位元素，position（absolute，fixed）
-  display 为以下其中之一的值 inline-block，table-cell，table-caption
-  overflow 除了 visible 以外的值（hidden，auto，scroll）

BFC 的特性：

-  内部的 Box 会在垂直方向上一个接一个的放置。
-  垂直方向上的距离由 margin 决定
-  bfc 的区域不会与 float 的元素区域重叠。
-  计算 bfc 的高度时，浮动元素也参与计算
-  bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。



## 实现元素隐藏

- display：none，不占位，源码可见
- opacity：0，占位，源码可见，透明度0
- visibility: hidden 占位，源码可见
- position: top:-9999px,left:-9999px 利用定位将元素移出视窗



## 如何实现元素水平居中或者垂直居中

水平居中：

- 行内元素：text-align：center
- 块元素: 
	- margin: 0 auto 
	-  position: left: 50%; transform: translate(-50%)

垂直居中：

- height = line-height
- verticle-align: middle
- position: top: 50%; transform: translate(0,-50%)



## Position 的区别

- relative 相对定位，不脱标，相对于自身位置进行偏离，不影响元素本身特性，z-index提升层级
- absolute 绝对定位，脱标，相对于已有定位的父元素进行偏离，都没有就相对于body进行偏离
- fixed 固定定位，脱标，相对于视窗进行偏离



## CSS 选择器有哪些，选择器的优先级

- id选择器
- 类选择器
- 属性选择器
- 伪类选择器
- 标签选择器
- 伪元素选择器
- 通配符选择器

优先级：内联样式 > ID选择器(100)> 类选择器(10) = 属性选择器 = 伪类选择器 > 元素选择器(1) = 关系选择器 = 伪元素选择器 > 通配符选择器(0)



## 各种布局优缺点

1. float 布局
	- 优点： 比较简单，兼容性也比较好。只要清除浮动做的好，是没有什么问题的
	- 缺点：浮动元素是脱离文档流，要做清除浮动，这个处理不好的话，会带来很多问题，比如高度塌陷等。

2. 绝对布局

	- 优点：很快捷，设置很方便，而且也不容易出问题

	- 缺点：绝对定位是脱离文档流的，意味着下面的所有子元素也会脱离文档流，这就导致了这种方法的有效性和可使用性是比较差的。

3. flex 布局（grid布局）

	- 优点：简单快捷

	- 缺点：不支持 IE8 及以下

4. table布局

	- 优点：实现简单，代码少

	- 缺点：当其中一个单元格高度超出的时候，两侧的单元格也是会跟着一起变高的，而有时候这种效果不是我们想要的。



CSS 3 新增伪类举例

解释盒模型宽高值的计算方式，边界塌陷，负值作用、box-sizing 概念

解时限浮动和它的工作原理，清除浮动的方法



## 三栏布局

### 圣杯布局



### 双飞翼布局
