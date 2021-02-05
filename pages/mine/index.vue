<template>
	<view class="main">
		<view class="">
			我的信息：{{user}}
		</view>
		<view class="login">
			<view class="">
				登录封装：
			</view>
			<view class="">
				<u-avatar :src="userAvatar" @click="toLogin"></u-avatar>
			</view>
			<login-pop :isShowLogin="IsLoginShow" @closeLogin="closeLogin" @loginMsg="getToken"></login-pop>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: "",
				userAvatar:'',
				IsLoginShow:false,
				
			}
		},
		onShow() {
			this.user = getApp().globalData.user
			this.userAvatar = uni.getStorageSync('userInfo').user_headimgurl
		},
		
		methods:{
			toLogin(){
				if(!uni.getStorageSync('code')){
					this.IsLoginShow = true
				} else {
					this.IsLoginShow = false
				}
				
			},
			closeLogin(){
				this.IsLoginShow = false
			},
			getToken(token){
				this.IsLoginShow = false
				this.userAvatar = uni.getStorageSync('userInfo').user_headimgurl
			},
			
			
		},
		watch:{
			
		},
	}
</script>

<style scoped>
	.main {
		color: #007AFF;
	}
</style>
