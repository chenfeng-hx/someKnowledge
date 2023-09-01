/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “web面试” 中
 *    于 2023-05-07 09:39:37 编写而成！
 *    祝你食用愉快！！！
 */

/**
 * 要求以Boolean的形式返回字符串参数是否为合法的URL格式
 * 协议仅为 HTTP(s)
 *
 * 题解：
 * URL结构一般包括协议、主机名、主机端口、路径、请求信息、哈希
 * 1. 首先必须是以http(s)开头并且可以不包含协议头部信息
 * 2. 主机名可以使用"-"符号，所以两种情况都要判断，包含"-"或不包含"-"
 * 3. 顶级域名很多，直接判断"."之后是否为字母即可
 * 4. 最后判断端口、路径和哈希，这些参数可有可无
 */

/**
 * 	补全代码
 * 	开始符 ^
 * 	协议部分http(s)://        表示为((https|http|ftp|rtsp|mms)?:\/\/)
 * 	域名部分                  表示为(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+
 * 	顶级域名com cn等为2-6位   表示为([a-zA-Z]{2,6})
 * 	端口部分                  表示为(:\d+)?, ?表示0次或1次
 * 	请求路径如/login          表示为 (\/.*)?
 * 	问号传参及哈希值如?age=1   表示为 (\?.*)?和(#.*)?
 * 	结束符 $
 * @param url
 * @return {boolean}
 * @private
 */
const _isUrl = url => {
		// 补全代码
		let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]{2,6})(:\d+)?(\/.*)?(\?.*)?(#.*)?$/
		return reg.test(url)
}
console.log(_isUrl('https://xiaohai-hx.cn:8080?id=12&user=chenfeng/123456789'));