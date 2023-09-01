/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-03 15:46:21 编写而成！
 *    祝你食用愉快！！！
 */
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
