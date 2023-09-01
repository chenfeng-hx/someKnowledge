/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-02 15:50:01 编写而成！
 *    祝你食用愉快！！！
 */

/*let ul = document.querySelector("ul");
ul.onclick = function (e) {     //e指event,事件对象
	let target = e.target || e.srcElement;        //target获取触发事件的目标(li)
	if (target.nodeName.toLowerCase() === 'li') {       //目标(li)节点名转小写字母，不转的话是大写字母
		alert(target.innerHTML)
	}
}*/

/*
typeof 123;//语法一
const FG = 123;
typeof FG;//语法二
typeof(null) //返回 object;
null == undefined //返回true，因为undefined派生自null;
null === undefined //返回false。*/

let constantize = (obj) => {
	Object.freeze(obj);
	Object.keys(obj).forEach( (key) => {
		if ( typeof obj[key] === 'object' ) {
			constantize( obj[key] );
		}
	});
};
var a = 1;
(function fn() {
	console.log(this);
	console.log(this.a);
})();
// console.log(global);

// 声明函数
function hello() {
	return "HELLO"
}
// 表达式函数
var h1 = function hello() {
	return "HELLO"
}