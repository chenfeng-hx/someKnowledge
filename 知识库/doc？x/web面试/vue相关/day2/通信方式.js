/* 父传子 */
const props = defineProps(['foo'])
props: ['foo']

// 使用 <script setup>
defineProps({
	title: String,
	likes: Number
})

// 非 <script setup>
export default {
	props: {
		title: String,
		likes: Number
	}
}

/* 子传父 */
// <Son @custom="hello"></Son>
