import Vue from 'vue'
import App from './App'
// 1.导入
import store from './store'
Vue.config.productionTip = false

App.mpType = 'app'
//2.注入原型对象
Vue.prototype.$store = store
const app = new Vue({
    ...App,
	store
})
app.$mount()
