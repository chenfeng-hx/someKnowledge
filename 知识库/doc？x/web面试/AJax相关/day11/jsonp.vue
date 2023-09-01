/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “web面试” 中
*    于 2023-05-14 18:27:38 编写而成！
*    祝你食用愉快！！！
*/
<script setup>

this.$http.jsonp('http://www.domain2.com:8080/login', {
	params: {},
	jsonp: 'handleCallback'
}).then((res) => {
	console.log(res);
})

</script>

<template>
	<!-- 注释 -->

</template>

<style scoped lang="">

</style>