<template>
	<view class="content">

		<view class="" style="margin-top: 30rpx;">
			<view class="contents">
				1.请求封装：{{title}}
			</view>
			<view class="contents">
				<text>2.引入uview UI框架:</text>
			</view>
			<view class="contents">
				<view class="">
					3.vuex使用：
					<view class="">
						count:{{count}} token:{{token}}
					</view>
				</view>
				<view class="" style="display: flex; justify-content: space-around;">
					<u-button type="primary" size="mini" @click="changCount">vuex更改count</u-button>
					<u-button type="primary" size="mini" @click="changToken">vuex更改token</u-button>
				</view>
			</view>
			
			<view class="contents">
				<view class="">
					4.getApp().globalData全局变量的使用:{{user}}
				</view>
				<u-button size="mini" @click="changUser"> globalData更改user</u-button>
				
			</view>
		</view>
	</view>
</template>

<script>
	// 导入api请求
	import {
		getRecommendList,
		getDiscussList
	} from "../../http/api.js"
	
	// 导入vuex的辅助方法
	import {mapState ,mapMutations, mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				title: 'Hello',
				IsShow:true,
				user:'',
			}
		},
		onLoad() {
			console.log("打印")
			this.initData()
			
		},
		onShow() {
			// 触发全局中的方法setUser（App.vue中globalData定义）
			getApp().globalData.setUser()
			this.user = getApp().globalData.user
		},
		// 使用计算属性读取vuex中的返回状态
		computed:{
			// // 方法1:获取单个状态
			// count(){
			// 	return this.$store.state.count
			// },
			
			// 方法2:当组件需要获取多个状态时，使用辅助函数
			...mapState(['token','count']),
			
		},
		methods: {
			// 同步方法
			...mapMutations(['setToken','setCount']),
			// 异步方法
			...mapActions(['getRecommendList']),
			changCount(){
				// 更改store中的值，方法一：利用辅助函数mapMutations映射
				// this.setCount(this.count+1)
				
				// 方法2：this.$store.commit("方法名",传参)
				this.$store.commit('setCount',this.count+2)
			},
			changToken(){
				// 触发store中的异步方法1:辅助函数映射
				// this.getRecommendList()
				
				// 方法2：this.$store.dispatch()
				this.$store.dispatch('getRecommendList').then((res)=>{
					console.log(res,"触发vuex中的异步方法")
				})
				
				
				
			},
			
			changUser(){
				// this.IsShow = !this.IsShow
				getApp().globalData.user =  getApp().globalData.user+1
				this.user = getApp().globalData.user
			},
			
			
			// 数据初始化
			async initData() {
				let res = await getRecommendList()
				// console.log(res, "请求")
				let res2 = await getDiscussList({
					cur_offset: 0
				})
				// console.log(res2, 22222)
			},
		}
	}
</script>

<style>
	.content {
		/* display: flex; */
		/* flex-direction: column; */
		/* align-items: center; */
		/* justify-content: center; */
	}
	.contents {
		padding: 20rpx;
	}
</style>
