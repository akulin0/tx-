<!-- 我的页面 -->
<template>
	<base-layout>
		<view class="main">
			<u-navbar :is-back="true" :title="title" :title-width="500" :title-bold="true"></u-navbar>
			<view class="title">{{$t('home.txt59',['确认你的钱包私钥'])}}</view>
			<textarea class="box" maxlength="-1" v-model="privateKey" :placeholder="title1"></textarea>
			<base-button ref="button" :title="title2" style="width: 690rpx;margin-top: 500rpx;" @submit="ok()">
			</base-button>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
  import {toTabBar} from '../../libs/utils';
	export default {
		data() {
			return {
				privateKey: "", //私钥
				title:this.$t('home.txt58',['确认备份信息']),
				title1:this.$t('home.txt60',['请输入钱包私钥,验证备份的私钥是否正确']),
				title2:this.$t('home.txt61',['完成']),
			}
		},
		methods: {
			async ok() {
				try {
					// 私钥验证
					if (!this.privateKey) {
						uni.showToast({
							title: this.$t('home.txt127',['请输入钱包私钥']),
							icon: "none"
						})
						this.$refs.button.hideLoading()
						return
					}
					let {
						data,
						errorMessage
					} = await request({
						url: '/wallet-create-verificationword',
						method: 'post',
						data: {
							"private_key": this.privateKey
						}
					})
					this.$refs.button.hideLoading()
          toTabBar('/pages/index/index',0)

        } catch (e) {
					uni.showToast({
						title: e.errorMessage,
						icon: "none"
					})
					this.$refs.button.hideLoading()
					//TODO handle the exception
				}


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
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			color: #333333;
			// word-break: keep-all;
			// word-wrap: break-word;
			// white-space: pre-line;

		}
	}
</style>
