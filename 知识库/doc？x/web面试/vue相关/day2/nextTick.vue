/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “web面试” 中
*    于 2023-05-03 17:27:18 编写而成！
*    祝你食用愉快！！！
*/
<div id="app">
	<div id="div" v-if="showDiv">这是一段文本</div>
	<button @click="getText">获取div内容</button>
</div>
<script>
	var app = new Vue({
		el : "#app",
		data:{
			showDiv : false
		},
		methods:{
			getText:function(){
				this.$nextTick(function () {
					this.showDiv = true;
					var text = document.getElementById('div').innnerHTML;
					console.log(text);
				})
			}
		}
	})
</script>
