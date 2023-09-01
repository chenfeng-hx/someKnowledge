1. vite 如何将 @ 转换为 src？

	```js
	// vite.config.js
	const path = require('path');
	export default defineConfig({
		...
		resolve: {
			// 配置路径别名
	        alias: {
	        	'@': path.resolve(__dirname, './src'),
	        },
		},
		...
	})
	```

2. vite 项目中只能使用 import 不能使用 require 如何配置？

	