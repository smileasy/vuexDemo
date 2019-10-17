import {
	ADD,
	MIN
} from '../common/const.js'

export default {
	state: {
		homeCount: 1230,
		homeName: '刘德华'
	},
	getters: {
		homeCount: state => state.homeCount + '斤',
		homeName: state => state.homeName + '66666',
	},
	mutations: {
		[ADD](state, num) {
			state.homeCount += num
		},
		[MIN](state, num) {
			state.homeCount -= num
		}

	},
	actions: {

	}
}
