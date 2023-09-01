/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-06-20 08:06:10 编写而成！
 *    祝你食用愉快！！！
 */

/* 冒泡排序 */
function bubbleSort(arr){
	const len = arr.length;
	for(let i = 0; i < len - 1; i++){
		for(let j = 0; j < len - i - 1; j++){
			if(arr[j] > arr[j+1]){
				const tmp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = tmp;
			}
		}
	}

	return arr;
}
