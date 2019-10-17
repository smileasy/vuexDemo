<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{userName}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{userAge}}</text>
		</view>

		<view class="text-area">
			<text class="title">{{userName1}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{userAge1}}</text>
		</view>
		<view class="text-content">
			<view>
				<button type="warn" @click="gotoBack">返回上一页</button>
				<button type="warn" @click="changeUserName">改变名字</button>
				<button type="warn" @click="changeUserAge">改变年龄</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
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
			return {}
		},
		computed: {
			...mapState({
				userAge1: state => state.user.userAge + '哈哈哈哈',
				userName1: state => state.user.userName + '真可爱啊啊啊'
			}),
			...mapGetters([
				 // 把 `this.userAge` 映射为 `this.$store.getters.userAge`
				"userAge",
				"userName"
			])
		},
		onLoad() {
			// 想要获取getters的内容，但是home是使用命名空间来获取的，所以暂时不知道怎么获取
			// console.log(this.$store.getters)
			console.log(this.$store.state.user.userAge)
			console.log(this.$store.state.user.userName)
		},
		methods: {
			...mapMutations(
				[
					USER_NAME, USER_AGE
				]),
				changeUserName() {
					this.USER_NAME('zhangjiahui')
				},
				changeUserAge() {
					this.USER_AGE(77)
				},
				gotoBack() {
					uni.navigateBack({
						delta: 1
					});
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
