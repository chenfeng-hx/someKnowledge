/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-03 16:15:50 编写而成！
 *    祝你食用愉快！！！
 */
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