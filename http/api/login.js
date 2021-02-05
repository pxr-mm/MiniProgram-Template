import {request} from "../http.js"
export function Login(data){
	return request(
			'/weixin/mini_login',
			'POST',
			data,
			{
				'Content-Type':"application/json"
			}
		)
}