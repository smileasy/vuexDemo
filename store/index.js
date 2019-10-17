import Vue from 'vue'
import Vuex from 'vuex'
import home from'./home.js'
import user from'./user.js'
Vue.use(Vuex)

// home使用了命名空间
const store = new Vuex.Store({
    modules:{
		//home使用命名空间
        home: {
			...home,
			namespaced: true 
		},
		//user不使用命名空间
		user 
    }
})
export default store
