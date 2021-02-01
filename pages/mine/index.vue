<template>
	<view class="main">
		我的user：{{user}}
	</view>
</template>

<script>
	export default {
		data(){
			return{
				user:"",
			}
		},
		onShow() {
			this.user = getApp().globalData.user
		},
	}
</script>

<style scoped>
	.main {
		color: #007AFF;
	}
</style>
