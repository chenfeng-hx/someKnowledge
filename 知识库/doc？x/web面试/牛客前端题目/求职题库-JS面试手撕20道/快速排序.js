/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-07 09:57:00 编写而成！
 *    祝你食用愉快！！！
 */

const _quickSort = array => {
	let left = 1;
	let right = array.length - 1;
	let key = array[0];
	// 补全代码
	while (left !== right) {
		while (left !== right) {
			if (array[right] <= key) {
				// left 的左边永远是空的
				array[left - 1] = array[right];
				break;
			} else {
				// array[right] > key
				right--;
			}
		}
		while (left !== right) {
			if (array[left] > key) {
				array[right] = array[left];
				right--;
				break;
			} else {
				left++;
			}
		}
	}
	array[left] = key;
	console.log(array);

}
_quickSort([3, 2, 3, 5, 1, -1, 7])