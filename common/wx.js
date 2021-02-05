// 检查登录code
export const GetCodeStatus = () => {
	return new Promise((resolve, reject) => {
		let code = wx.getStorageSync('code')
		console.log(code,"缓存的code")
		//判断code是否存在
		if (code) {
			// console.log("存在code:", code)
			_checkWXSession()
				.then((res) => {
					//判断code是否过期
					console.log("code 校验已通过",code)
					resolve(code)
				})
				.catch((res) => {
					console.log("code 校验失效,err:", res)
					_wxLogin()
						.then((res) => {
							wx.setStorageSync("code", res.code)
							resolve(res.code)
							console.log("登录成功:", res)
						})
						.catch((res) => {
							console.log("重新登录失败:", res)
							reject(res)
						})
				})

		} else {
			//本地未存储key
			console.log("重新请求微信登录")
			_wxLogin()
				.then((res) => {
					wx.setStorageSync("code", res.code)
					console.log("初始化登录成功:", wx.getStorageSync('code'))
					resolve(res.code)
				})
				.catch((res) => {
					console.log("首次登录失败:", res)
					reject(res)
				})

		}
	})

}



const _checkWXSession = () => {
	// 判断code是否过期
	return new Promise((resolve, reject) => {
		wx.checkSession({
			success: () => {
				console.log("code有效")
				resolve(true)
			},
			fail: () => {
				console.log("code过期")
				reject(false)
			}
		})
	})
}

const _wxLogin = () => {
	// 获取新的code
	return new Promise((resolve, reject) => {
		wx.login({
			success: (res) => {
				if (res.code) {
					resolve(res);
				} else {
					reject(res);
				}
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}