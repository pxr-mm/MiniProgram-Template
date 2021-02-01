 import Vue from 'vue';
 import Vuex from 'vuex';
 Vue.use(Vuex)
 
 import {getRecommendList} from "../http/api.js"
 
 export default new Vuex.Store({
	 state:{
		 token:11111,
		 count:0
	 },
	 // 同步
	 mutations:{
		 setToken(state,val){
			 state.token = val
		 },
		 setCount(state,val){
		 	state.count = val
		 },
	 },
	 // 异步方法(可做数据请求)
	 actions:{
		 // commit解构赋值，可直接调用mutations中的方法
		 async getRecommendList({commit}){
			 let res = await getRecommendList({
				 cur_offset: 0
			 })
			 commit('setToken',123456789)
			 return res
		 },
	 },
 })