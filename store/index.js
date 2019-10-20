import Vue from 'vue'
import Vuex from 'vuex'
import home from'./home.js'
import user from'./user.js'
Vue.use(Vuex)

// home使用了命名空间
const store = new Vuex.Store({
    modules:{
        home,
		user 
    }
})
export default store
