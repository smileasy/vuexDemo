import Vue from 'vue'
import App from './App'
// 1.导入
import store from './store'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
