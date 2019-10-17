import {
	USER_NAME,
	USER_AGE
} from '../common/const.js'

export default {
	state: {
		userAge: 18,
		userName: '渣渣辉'
	},
	getters: {
		userAge: state => state.userAge + '岁！',
		userName: state => state.userName + '贪玩蓝月！',
	},
	mutations: {
		[USER_NAME](state, name) {
			state.userName = name
		},
		[USER_AGE](state, age) {
			state.userAge = age
		}
	},
	actions: {

	}
}
