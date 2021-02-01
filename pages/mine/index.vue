<template>
	<view class="">
		我的token：{{user}}
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

<style>
	page {
		color: #007AFF;
	}
</style>
