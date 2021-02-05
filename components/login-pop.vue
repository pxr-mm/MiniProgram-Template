<template>
	<view class="login-pop" v-if="showAuth">
		<!-- <u-popup v-model="showAuth" mode="center" border-radius="14" closeable='true' width="400" height="400" @close="closeLoginPop">
			<view style="height: 400rpx; display: flex;flex-direction: column;justify-content: center;align-items: center;">
				<u-button open-type="getUserInfo" @getuserinfo="authUserInfo">用户授权</u-button>
				<u-button open-type="getPhoneNumber" @getphonenumber="authPhoneNumber">手机授权</u-button>
			</view>
		</u-popup> -->


		<u-popup v-model="showAuth" mode="bottom" border-radius="36" :mask-close-able='false' closeable='true' @close="closeLoginPop">
			<view style="padding: 48rpx;  color: #000000;display: flex;flex-direction: column;align-items: center;">
				<view class="" style="display: flex;flex-direction: column;align-items: center;">
					<u-image src="@/static/avatar.png" width="88rpx" height="88rpx" border-radius="50%"></u-image>
					<view class="" style="font-weight: 800;font-size: 48rpx;margin-top: 16rpx;">侠客实验室</view>
					<view class="" style="margin-top: 12rpx;color: #969799;">孵化基地</view>
				</view>
				<view class="" style="margin-top: 48rpx;width: 100%;">
					<view class="" style="display: flex;flex-direction: row;justify-content: space-around;width: 100%;">
						<view class="" style="display: flex;flex-direction: column;align-items: center;">
							<u-image src="@/static/avatar.png" width="48rpx" height="48rpx"></u-image>
							<view class="" style="font-weight: 800;margin-top: 12rpx;">孵化室</view>
							<view class="" style="font-size: 22rpx;text-align: center;margin-top: 12rpx;color: #969799;width: 150rpx;">发起项目，参与项目讨论</view>
						</view>
						<view class="" style="display: flex;flex-direction: column;align-items: center;">
							<u-image src="@/static/avatar.png" width="48rpx" height="48rpx"></u-image>
							<view class="" style="font-weight: 800;margin-top: 12rpx;">精选</view>
							<view class="" style="font-size: 22rpx;text-align: center;margin-top: 12rpx;color: #969799;width: 150rpx;">精选文章等你来看</view>
						</view>
						<view class="" style="display: flex;flex-direction: column;align-items: center;">
							<u-image src="@/static/avatar.png" width="48rpx" height="48rpx"></u-image>
							<view class="" style="font-weight: 800;margin-top: 12rpx;">关注实验室</view>
							<view class="" style="font-size: 22rpx;text-align: center;margin-top: 12rpx;color: #969799;width: 150rpx;">更多精彩内容</view>
						</view>
					</view>
				</view>

				<view class="" style="width: 100%;margin-top: 100rpx;">
					<view class="" style="display: flex;flex-direction: row;justify-content: space-around">
						<view style="
						border-radius: 48rpx;width: 300rpx; font-size: 32rpx;
						color: #999999;border-radius: 48rpx;text-align: center;line-height: 92rpx; border: 1px solid #999999;box-sizing: border-box;"
						 @click="cancelLogin">暂不登录</view>
						<button style="
						border-radius: 48rpx;
						color: #ffffff;width: 300rpx;background-color: #2EA5FF;"
						 open-type="getUserInfo" @getuserinfo="authUserInfo">立即登录</button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// 微信登录校验code
	import {
		GetCodeStatus
	} from '@/common/wx.js'
	// vuex的mapMutations 
	import {
		mapMutations,
		mapActions
	} from 'vuex'

	// import {
	// 	getUserInfo,
	// 	getStatisticsInfo
	// } from '../../api/mine.js'

	import {
		Login
	} from "@/http/api/login.js"
	export default {
		props: {
			isShowLogin: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				showAuth: false
			}
		},
		onLoad() {

		},
		onShow() {
			this.showAuth = this.isShowLogin
		},
		methods: {
			// 调用vuex中的setToken，setUserInfo方法，相当于调用vuex的commit方法
			...mapMutations(['setToken', 'setUserInfo']),
			// ...mapActions(['_getUserInfo', 'getStatisticsInfoFn']),
			// 微信授权登录
			authUserInfo(e) {
				wx.clearStorageSync({
					key:'code'
				})
				let that = this
				if (!e.detail.rawData) {
					console.log("未授权用户信息")
					return
				}
				let result = e.detail
				let encryptedData = result.encryptedData
				let iv = result.iv

				// 存到vuex中(this.$store.commit)
				let userInfo = {
					user_headimgurl: result.userInfo.avatarUrl,
					user_nickname: result.userInfo.nickName
				}
				this.setUserInfo(userInfo)
				//本地存用户头像等信息
				uni.setStorageSync("userInfo", userInfo)
				
				GetCodeStatus()
					.then((code) => {
						console.log('code', code)
						let params = {
							iv: iv,
							encryptedData: encryptedData,
							code: code,
						}
						uni.setStorageSync("login_params", {
							encryptedData,
							iv
						})
						uni.setStorageSync("code", code)
						this.loginFn(params)
					})
			},



			closeLoginPop() {
				// uni.clearStorageSync()
				this.$emit("closeLogin", this.isShowLogin)

			},
			// 暂不登录
			cancelLogin() {
				this.showAuth = false
				// uni.clearStorageSync()
				this.$emit("closeLogin", this.isShowLogin)
			},
			async loginFn(params) {
				let res = await Login(params)
				console.log(res, "登录res")
				if (res.code == 1) {
					this.setToken(res.token)
					uni.setStorageSync("token", res.token)
					uni.setStorageSync()
					this.$emit("loginMsg", res.token)
					this.showAuth = false
					uni.showToast({
						title: "登录成功",
						icon: "none"
					})
				} else {
					uni.showToast({
						title: "登录失败，请稍后再试",
						icon: "none"
					})
				}

			},
		},
		watch: {
			isShowLogin: function(value, old) {
				// console.log(value,old,"弹框")
				this.showAuth = value
			},
			// '$store.state.relogin':function(value,old){
			// 	// this.showAuth = value
			// }
		}
	}
</script>

<style>
</style>
