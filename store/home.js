import {
	ADD,
	MIN
} from '../common/const.js'
	

export default {
	state: {
		homeCount: 123,
		homeName: '刘德华',
		homeGoods: [{
				goodsId: 100,
				goodsName: '番茄',
				goodsPrice: 22
			},
			{
				goodsId: 100,
				goodsName: '土豆',
				goodsPrice: 44
			}
		]
	},
	getters: { //（可以认为是 store 的计算属性）
		homeCountPower: state => state.homeCount * state.homeCount,
		homeNameDesc: state => state.homeName + '长得真帅啊',
		homeInfo: (state, getters) => {
			//假如这是复杂的处理逻辑，简单的处理可以用上面的简便写法
			return '明星' + getters.homeNameDesc + '!!!!!!!'
		},
		editHomeCount: (state) => {//动态更改homeCount
			return (data) => {
				return state.homeCount + data 
			}
		} 
	},
	mutations: {
		[ADD](state, num) {
			state.homeCount += num
		},
		[MIN](state, num) {
			state.homeCount -= num
		},
		addGoods(state, playload) {//增加一个商品
			//方式1和2的方式：
			// state.homeGoods.push(playload)
			//方式3：
			state.homeGoods.push(playload.data)
		},
		addOneGoods(state, playload) {//增加一个商品
			state.homeGoods.push(playload)
		},
	},
	actions: {
		requestListData(context) {
			let goods = {
				goodsId: 120,
				goodsName: '西瓜',
				goodsPrice: 66
			}
			// 模拟异步操作
			setTimeout(() => {
				context.commit({
					type: 'addGoods',
					data: goods 
				})
			},2000)
		},
		requestHomeInfo(context,playload) {
			// 模拟异步操作
			setTimeout(() => {
				context.commit('addOneGoods',playload.data)
				playload.callback('添加成功了。。')
			},2000)
		},
		requestPromiseInfo(context, playload) {
			return new Promise((resolve, reject) => {
				// 模拟异步操作
				setTimeout(() => {
					context.commit('addOneGoods',playload)
					resolve('Promise添加成功了...')
				},2000)
			})
		}
	}
}
