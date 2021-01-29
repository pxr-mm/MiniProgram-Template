import {request} from './http.js'
//首页滚动图 - 滚动图列表
export function getRecommendList(data){
	return request(
		'/banner/recommend_list',
		'POST',
		data
	)
}
export function getDiscussList(data){
	return request(
		'/discuss/recommend_list',
		'POST',
		data,
		{
			headers:"application/json"
		}
	)
}
