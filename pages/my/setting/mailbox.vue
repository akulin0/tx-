<!-- 设置邮箱 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" title-width="600" :title="navText" :title-bold="true" style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="title1 font-body" :style="{width:$i18n.locale == 'en-US'?'33%':''}">{{$t('ibinz.msg107',['邮箱地址'])}}</view>
					<input class="uni-input" :placeholder="placeholder" v-model="address" />
				</view>
			</view>
			<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode"></u-verification-code>
			<view class="btn flex-center color-r font-l" :class="[!address?'btn1':'']" @tap="getCode">{{$t('home.txt64',['下一步'])}}</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Helper from "@/function.js"
	export default {
		data() {
			return {
				address: '',
				// refCode: null,
				seconds: 60,
				navText: this.$t('ibinz.msg106', ['邮箱验证码']),
				placeholder: this.$t('ibinz.msg108', ['请输入邮箱地址'])
			}
		},
		components: {

		},
		onLoad() {


		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		methods: {
			getCode() {
				if (this.address) {
					if (Helper.regemail(this.address)) {
						if (this.$refs.uCode.canGetCode) {
							// 模拟向后端请求验证码
							uni.showLoading({
								title: this.$t('login.msg29', ['正在获取验证码'])
							})
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast(this.$t('login.msg30', ['验证码已发送']));
								let res = request({
									url: '/send-sms-code',
									method: 'post',
									data: {
										"account": this.address,
									}
								})
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/my/setting/mailboxCode?address=' + this.address
									})
								}, 1500)

							}, 2000);
						} else {
							this.$u.toast(this.$t('login.msg31', ['倒计时结束后再发送']));
						}
					} else {
						uni.showToast({
							title: this.$t('login.msg32', ['请输入正确邮箱号']),
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: this.$t('login.msg33', ['请先输入邮箱']),
						icon: 'none'
					})
				}
			},
			start() {
				// this.$u.toast('倒计时开始');
			},
			end() {
				// this.$u.toast('倒计时结束');
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 11rpx 30rpx 0;
	}

	.input-box {
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;

		.title1 {
			width: 30%;
		}

		input,
		textarea {
			font-size: 28rpx;
			flex: 1;
		}

		textarea {
			height: 100rpx;
		}
	}

	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 87rpx;
		border-radius: 44rpx;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}

	.btn1 {
		opacity: 0.5;
	}
</style>
