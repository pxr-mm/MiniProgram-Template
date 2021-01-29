<template>
	<view class="content">
		请求封装{{title}}
	</view>
</template>

<script>
	import {getRecommendList,getDiscussList} from "../../http/api.js"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		 onLoad() {
			 console.log("打印")
			this.initData()
		},
		
		methods: {
			async initData(){
				let res = await getRecommendList()
				console.log(res,"请求")
				let res2 = await getDiscussList({cur_offset:0})
				console.log(res2,22222)
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
