// const BASE_URL = getApp().globalData.BASE_API
// const USER_API = getApp().globalData.USER_API
// const whiteList = ['/api/supervise/wechat/loginMp']

const BASE_URL = "https://api.xiakelab.com"
// const BASE_URL = "http://192.168.1.183"
export { BASE_URL}

/**
 * 统一请求入口
 * @param {Object} url 请求
 * 地址
 * @param {Object} method 请求方式
 * @param {Object} data	请求参数
 * @param {Object} header 请求头
 * @return {Promiss} Promise 对象
 */
export function request (url, method, data, header) {
	let _header = {}
	// const TOKEN = getApp().globalData.TOKEN
	uni.showLoading({
		title: '加载中',
		mask: true
	})		
	if (header) {
		_header = {
			// 'Authorization': TOKEN,
			// 'flag': 'wechat',
			...header
		}
		// console.log(_header,"请求头")
	} else {
		_header = {
			// 'Authorization': TOKEN,
			// 'flag': 'wechat',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
	let _tempUrl = ''
	if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1 ) {
		_tempUrl = url
	} else {
		_tempUrl = `${BASE_URL}${url}`
	}
	return uni.request({
		url: _tempUrl,
		method:method || 'GET',
		header: _header,
		data
	}).then(resp => {
		uni.hideLoading()
		let [err, res] = resp
		console.log(res,'拦截res')
		if (res.statusCode !== 200) {
			uni.showToast({
				title: '请求失败',
				icon: "none",
				duration: 2000
			})
			return err
		} else {
			// if (res.data.code !== 0 && res.data.code !== 200 && res.data.code !== 20000 && res.data.code !== 201001) {
			if (res.data.code !== 1 ) {
				// uni.showToast({
				// 	title: res.data.message || '服务异常',
				// 	icon: "none"
				// })
				return Promise.reject(res.data)
			} else {
				return res.data
			}
		}
		
		
		
	}).catch(error => {
		uni.showToast({
			title: error.message,
			icon: 'none',
			duration: 4000
		})
		return Promise.reject(error)
	})
}