import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';

import store from "@/store/index.js"
import LoginPop from "@/components/login-pop.vue"

Vue.use(uView);

Vue.component('login-pop',LoginPop)

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
