<!-- 我的页面 -->
<template>
	<base-layout>
		<view class="main">
			<u-navbar :is-back="true" :title="title" :title-bold="true"></u-navbar>
			<view class="title">{{$t('home.txt63',['立即备份你的私钥'])}}</view>
			<view class="box">{{privateKey}}</view>
			<base-button ref="button" :title="title1" style="width: 690rpx;margin-top: 500rpx;" @submit="next()">
			</base-button>
			<view style="color: #2DA5E1; font-size: 28rpx;text-align: center;margin-top: 20rpx;" @click="copy()">{{$t('home.txt133',['复制私钥'])}}
			</view>
		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				title: this.$t('home.txt62', ['备份钱包']),
				title1: this.$t('home.txt64', ['下一步']),
				privateKey: "", //私钥
			}
		},
		onLoad() {

		},
		onShow() {
			this.privateKey = uni.getStorageSync("privateKey")
		},
		// onHide() {
		// 	uni.removeStorageSync("privateKey")
		// },
		methods: {
			async next() {
				this.$refs.button.hideLoading()
				uni.navigateTo({
					url: '/pages/index/confirmKey'
				})
			},
			// 复制
			copy() {
				var _this=this
				uni.setClipboardData({
					data: uni.getStorageSync('privateKey'),
					success: function() {
						_this.$refs.uToast.show({
							title: _this.$t('home.txt16', ['复制成功']),
							type: 'success'
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		padding: 80rpx 30rpx;

		.title {
			flex: 1;
			text-align: center;
			margin-bottom: 50rpx;
			font-size: 32rpx;
		}

		.box {
			background-color: #f5f5f5;
			height: 200rpx;
			box-sizing: border-box;
			padding: 20rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			color: #333333;
			word-break: keep-all;
			word-wrap: break-word;
			white-space: pre-line;

		}
	}
</style>
