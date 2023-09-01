/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-06 18:52:16 编写而成！
 *    祝你食用愉快！！！
 */

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

// 双重指针






