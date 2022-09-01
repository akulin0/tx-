<template>
	<base-layout>
		<u-navbar :is-back="true" :title-width="500" :is-fixed="true" :title="title" title-color="#333333" :title-bold="true"></u-navbar>
		<view class="main">
			<view class="textarea-view">
				<textarea value="" :placeholder="placeholder" v-model="private" />
			</view>
			<view class="flex-r box">
				<view >{{$t('ibinz.msg39',["设置新密码"])}}</view>
				<input type="password" value="" :placeholder="placeholderA" v-model="pass" />
			</view>
			<view class="flex-r box">
				<view>{{$t('ibinz.msg40',["重复密码"])}}</view>
				<input type="password" value="" :placeholder="placeholderA" v-model="rePasss" />
			</view>
			<view class="flex-center" style="margin-top: 150rpx;" v-if="!private || !pass || !rePasss">
				<view class="btn">{{$t('ibinz.msg41',["重置"])}}</view>
			</view>
			<view class="flex-center" style="margin-top: 150rpx;" v-else>
				<view class="btn" style="opacity: 1;" @click="reSet">{{$t('ibinz.msg41',["重置"])}}</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Md5 from "@/components/md5.js"
	export default {
		data() {
			return {
				placeholder: "",
				private: "", //助记词 私钥
				pass: "",
				rePasss: "",
				placeholderA: this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']),
				title: this.$t('ibinz.msg38', ["重置密码"]),
				walletInfo: {}, //当前钱包详情
			}
		},
		onLoad() {
			// 钱包种类-category:1、比特币；2、以太坊；3、波场；4、Telegram X
			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
			if (this.walletInfo.category == 1) {

				this.placeholder = this.$t('ibinz.msg42', ["请输入助记词，用空格分隔"])
			} else {
				this.placeholder = this.$t('ibinz.msg43', ["请输入明文私钥"])
			}
		},
		methods: {
			// 重置
			async reSet() {
				if (!this.pass || !this.rePasss || !this.private) {
					return
				}
				if (this.pass != this.rePasss) {
					uni.showToast({
						title: this.$t('ibinz.msg35', ["两次密码输入不一致"]),
						icon: 'none',
					})
					return
				}
				if(this.pass.length < 8 || this.rePasss.length < 8){
					uni.showToast({
						title: this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']),
						icon: 'none'
					})
					return
				}
				
				var type = ''
				if (this.walletInfo.category == 1) {
					type = "BTC"
				}
			
				// console.log("参数", this.private);
				const {
					data
				} = await request({
					url: '/wallet-reset-password',
					method: 'post',
					data: {
						"id": this.walletInfo.id,
						"password": this.pass,
						"rpassword": this.rePasss,
						"private_key": this.private,
						"type": type
					}
				})
				uni.showToast({
					title: this.$t('ibinz.msg36', ["请输入明文私钥"]),
					duration: 1000
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		color: #333333;
		font-size: 28rpx;
		padding: 40rpx 30rpx 30rpx 30rpx;

		.textarea-view {
			background: #F5F5F5;
			border-radius: 10rpx;
			height: 210rpx;
			padding: 30rpx 20rpx;
			margin-bottom: 30rpx;
		}

		.box {
			height: 100rpx;
			border-bottom: 1rpx solid #e6e6e6;

			view {
				width: 250rpx;
			}

			input {
				flex: 1;
			}
		}

		.btn {
			width: 650rpx;
			text-align: center;
			height: 88rpx;
			line-height: 88rpx;
			
			background: #2DA5E1;
			box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
			border-radius: 44rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			opacity: 0.23;
		}
	}
</style>
