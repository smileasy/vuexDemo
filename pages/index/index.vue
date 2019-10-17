<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{count}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{name}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{count1}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{name1}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{homeCount}}</text>
		</view>
		<!-- ***************************************** -->
		<view class="text-area-user" >
			<text class="title">{{userName}}</text>
		</view>
		<view class="text-area-user">
			<text class="title">{{userAge}}</text>
		</view>
		<view class="text-area-user" >
			<text class="title">{{userName1}}</text>
		</view>
		<view class="text-area-user">
			<text class="title">{{userAge1}}</text>
		</view>
		<view class="text-content">
			<view>
				<button type="primary" @click="add(1000)">增加</button>
				<button type="primary" @click="min(2000)">减小</button>
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
				//带有命名空间的获取
				return this.$store.state.home.homeCount + 'KG'
			},
			...mapState(
				'home', {
					// 映射 this.count 为 this.$store.state.home.homeCount
					count: state => state.homeCount,
					name: state => state.homeName + '真帅啊！'
				}),
			...mapGetters(
				'home', {
					count1: 'homeCount',
					name1: 'homeName'
				}
			),
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
			// 想要获取getters的内容，但是home是使用命名空间来获取的，所以暂时不知道怎么获取
			// console.log(this.$store.getters)
			console.log(this.$store.state.home.homeCount)
			console.log(this.$store.state.home.homeName)
			console.log(this.$store.state.user.userAge)
			console.log(this.$store.getters.userName)
			console.log(this.$store.getters.userAge)
		},
		methods: {
			//将this.addAmount(data) 映射为 this.$store.commit(ADD, data)
			//将this.minAmount(data) 映射为 this.$store.commit(MIN, data)
			//同理，mapActions也可以如此使用
			//注： 如果调用名一致，则可以直接使用数组，而不是对象：
			
			//方式1：直接使用
			...mapMutations('home',
				[ADD, MIN],
			),
			//方式2： 重新命名
			...mapMutations('home', {
				addAmount: ADD,
				minAmount: MIN
			}),


			add(data) {
				
				//方式1：
				this.ADD(data)
				//方式2：
				// this.addAmount(data)
				//方式2：
				// this.$store.commit(ADD, data)
			},
			min(data) {
				// this.$store.commit(MIN, data)
				this.MIN(data)
				// this.minAmount(data)
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
