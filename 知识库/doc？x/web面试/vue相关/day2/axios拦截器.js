/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-03 16:20:28 编写而成！
 *    祝你食用愉快！！！
 */

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
