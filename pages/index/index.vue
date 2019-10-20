<template>
	<view class="content">
		<view class="text-area">
			<block v-for="item in homeGoodsList " :key='item.goodsId'>
				<view>
					<text class="title">{{item.goodsId}}</text>
					<text class="title">{{item.goodsName}}</text>
					<text class="title">{{item.goodsPrice}}</text>
				</view>
			</block>
		</view>
		<view class="text-area">
			<text class="title">{{myName}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{myCount}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{nameDesc}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{countPower}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{homeInfo}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{editHomeCount(1000)}}</text>
		</view>

		<!-- ***************************************** -->
		<view class="text-area-user">
			<text class="title">{{userName}}</text>
		</view>
		<view class="text-area-user">
			<text class="title">{{userAge}}</text>
		</view>
		<view class="text-area-user">
			<text class="title">{{userName1}}</text>
		</view>
		<view class="text-area-user">
			<text class="title">{{userAge1}}</text>
		</view>
		<view class="text-content">
			<view>
				<button type="primary" @click="add(1000)">增加</button>
				<button type="primary" @click="min(2000)">减小</button>
				<button type="primary" @click="addMoreGoods">增加一个商品</button>
				<button type="primary" @click="asyncAddMoreGoods">异步增加一个商品</button>
				<button type="primary" @click="asyncCallback">异步callback增加商品回调</button>
				<button type="primary" @click="asyncPromise">异步promise增加商品回调</button>
				<button type="warn" @click="gotoUser">跳转</button>
				<button type="warn" @click="changeName">改变名字</button>
				<button type="warn" @click="changeAge">改变年龄</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ADD,
		MIN,
		USER_NAME,
		USER_AGE
	} from '../../common/const.js';
	import {
		mapState,
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex';

	export default {
		data() {
			return {

			}
		},
		computed: {
			homeCount() {
				return this.$store.state.home.homeCount + 'KG'
			},
			...mapGetters({
				countPower: 'homeCountPower',
				nameDesc: 'homeNameDesc',
			}),
			//如果不更改getters中原有的名字，可以直接传一个数组
			...mapGetters(
				['homeInfo', 'editHomeCount']
			),
			...mapState({
				// 映射 this.count 为 this.$store.state.home.homeCount
				myCount: state => state.home.homeCount,
				myName: state => state.home.homeName,
				homeGoodsList: state => state.home.homeGoods
			}),

			//不使用命名空间的user
			userAge() {
				return this.$store.state.user.userAge
			},
			userName() {
				return this.$store.state.user.userName
			},
			userAge1() {
				return this.$store.getters.userAge
			},
			userName1() {
				return this.$store.getters.userName
			}
		},
		onLoad() {
			//普通方式获取模块home中的homeName的内容
			console.log(this.$store.state.home.homeName)
			// 获取getters的内容
			console.log(this.$store.getters.homeNameDesc)
			//error:注意此处不能通过.home.getters，而是直接.getters
			// console.log(this.$store.home.getters.homeNameDesc)
			


			// console.log(this.$store.state.user.userAge)
			// console.log(this.$store.getters.userName)
			// console.log(this.$store.getters.userAge)
		},
		methods: {
			//将this.addAmount(data) 映射为 this.$store.commit(ADD, data)
			//将this.minAmount(data) 映射为 this.$store.commit(MIN, data)
			//同理，mapActions也可以如此使用
			//注： 如果调用名一致，则可以直接使用数组，而不是对象：

			//方式1：直接使用
			...mapMutations(
				[ADD, MIN],
			),
			//方式2： 重新命名
			...mapMutations({
				addAmount: ADD,
				minAmount: MIN
			}),
			...mapMutations(
				['addGoods']
			),
			...mapActions({
				requestData: 'requestListData'
			}),
			asyncPromise() {
				//直接使用方式2进行测试：
				let goods = {
					goodsId: 911,
					goodsName: '酸奶',
					goodsPrice: 199
				}
				this.$store.
						dispatch('requestPromiseInfo', goods)
						.then(res => {
							console.log(res)
						}) 
			},
			asyncCallback() {
				//直接使用方式2进行测试：
				let goods = {
					goodsId: 199,
					goodsName: '圣女果',
					goodsPrice: 177
				}
				this.$store.dispatch('requestHomeInfo', {
					data: goods,
					callback: (res) => {
						console.log(res)
					}
				})
			},
			asyncAddMoreGoods() {
				//方式1：
				// this.requestData()
				// 方式2:
				this.$store.dispatch('requestListData')
			},
			addMoreGoods() {
				let goods = {
					goodsId: 100,
					goodsName: '榴莲',
					goodsPrice: 150
				}
				//方式1：
				// this.addGoods(goods)
				//方式2：
				// this.$store.commit('addGoods', goods)
				//方式3：（需要更改mutations中的取参数的方式）
				this.$store.commit({
					type: 'addGoods',
					data: goods
				})
				console.log(this.$store.state.home.homeGoods)
			},
			add(data) {
				//方式1：
				this.ADD(data)
				//方式2：
				// this.addAmount(data)
				//方式3：直接通过commit方式提交
				// this.$store.commit(ADD, data)
			},
			min(data) {
				this.MIN(data)
				// this.minAmount(data)
				// this.$store.commit(MIN, data)
			},
			gotoUser() {
				uni.navigateTo({
					url: '../user/user',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			...mapMutations({
				setUserAge: USER_AGE,
				setUserName: USER_NAME
			}),
			changeAge() {
				this.setUserAge(33)
			},
			changeName() {
				this.setUserName('张家辉')
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.text-area-user {
		display: flex;
		justify-content: center;
		background-color: #F0AD4E;
	}


	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.text-content {
		width: 100vw;
		background: #007AFF;
		height: 300upx;
	}
</style>
