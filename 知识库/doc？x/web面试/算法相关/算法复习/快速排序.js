/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-06-20 08:10:32 编写而成！
 *    祝你食用愉快！！！
 */

/* 快速排序 */
function quickSort(arr){

	sort(arr, 0, arr.length - 1);
	return arr;


	function sort(arr, low, high){
		if(low >= high){
			return;
		}

		let i = low;
		let j = high;
		const x = arr[i]; // 取出比较值x，当前位置i空出，等待填入
		while(i < j){
			// 从数组尾部，找出比x小的数字
			while(arr[j] >= x && i < j){
				j--;
			}
			// 将空出的位置，填入当前值， 下标j位置空出
			// ps：比较值已经缓存在变量x中
			if(i < j){
				arr[i] = arr[j]
				i++;
			}

			// 从数组头部，找出比x大的数字
			while(arr[i] <= x && i < j){
				i++;
			}
			// 将数字填入下标j中，下标i位置突出
			if(i < j){
				arr[j] = arr[i]
				j--;
			}
			// 一直循环到左右指针i、j相遇，
			// 相遇时，i==j, 所以下标i位置是空出的
		}

		arr[i] = x; // 将空出的位置，填入缓存的数字x，一轮排序完成

		// 分别对剩下的两个区间进行递归排序
		sort(arr, low, i - 1);
		sort(arr, i+1, high);
	}
}
