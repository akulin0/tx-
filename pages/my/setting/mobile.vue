<template>
	<view class="login page">
		<u-navbar v-if="!isTx()"  is-fixed backgroundColor="#fff" :title="navText" title-width="500"/>

		<!-- 表单提交 -->
		<view class="content">
			<!-- <view class="bind">当前绑定手机：{{account | setAccount}}</view> -->
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="font-body" :class="[$i18n.locale == 'en-US'?'titles1':'title1']">{{$t('ibinz.msg111',['手机号'])}}</view>
					<input class="uni-input" :placeholder="placeholder" v-model="phone" :placeholder-class="$i18n.locale == 'en-US'?'pla-sty':''"/>
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(0)" v-if="phone"></image>
			</view>
			<view class="flex-j-a input-box">
				<view class="flex-j-a" style="flex: 1;">
					<view class="flex-align">
						<view :class="[$i18n.locale == 'en-US'?'font-s':'font-body']"  style="width: 52%;">{{$t('ibinz.msg101',['验证码'])}}</view>
						<input class="uni-input" :placeholder="placeholder1" v-model="code" :placeholder-class="$i18n.locale == 'en-US'?'pla-sty':''"/>
					</view>
					<image src="/static/my/del.png" mode="" class="img" style="margin-right: 20rpx;" @click="clear(1)" v-if="code"></image>
				</view>
				<view>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
					<view class="color-a  font-s code-sty" @tap="getCode">{{tips}}</view>
				</view>

			</view>
			<!-- button -->

			<base-button ref="button" class="base-button" @submit="submit" :disable="false" :title="btnText" v-if="phone && code"
			 style="margin-top: 80rpx;width: 650rpx;" />
			<view class="btn flex-center color-r font-l" v-else>{{$t('home.txt56',['确认'])}}</view>
			<!-- button-end -->

		</view>

	</view>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Helper from "@/function.js"
	export default {
		data() {
			return {
				account: '',
				disable: true,
				phone: '',
				code: '',
				tips: '',
				// refCode: null,
				seconds: 60,
				navText: this.$t('ibinz.msg110', ['绑定手机号']),
				placeholder: this.$t('ibinz.msg112', ['请输入手机号']),
				placeholder1: this.$t('login.msg5', ['请输入验证码']),
				btnText: this.$t('home.txt56', ['确认'])
			}
		},
		onLoad(opt) {
			this.account = opt.account
		},
		filters: {
			// setAccount(data) {
			// 	return data.substr(0, 3) + "****" + data.substr(7)
			// }
		},
		methods: {
			clear(type) {
				switch (type) {
					case 0:
						this.phone = ''
						break;
					case 1:
						this.code = ''
						break;
					default:
						break;
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.phone) {
					if (Helper.phonenum(this.phone)) {
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
										"account": this.phone,
									}
								})
								console.log("data: ", res);
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
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
						title: this.$t('ibinz.msg136', ['请先输入手机号']),
						icon: 'none'
					})
				}

			},
			async submit() {
				try {
					let res = request({
						url: '/bind-phone-email',
						method: 'post',
						data: {
							"account": this.phone,
							"sms_code": this.code
						}
					})
					this.$refs.button.hideLoading()
					uni.showToast({
						title: this.$t('ibinz.msg137', ['手机号绑定成功']),
						icon: 'none'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/my/setting/setting'
						})
					}, 1000)
				} catch (e) {
					this.$refs.button.hideLoading()
					//TODO handle the exception
				}

			}
		}

	}
</script>

<style lang="scss" scoped>
	.title {
		width: 120rpx;
		font-size: 28rpx;
		color: #000000;
	}

	.button {
		margin-top: 80rpx;
	}

	.login {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		// padding:28rpx 45rpx 50rpx;

		.logo {
			display: flex;
			justify-content: center;
			margin: 28rpx 0 59rpx;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
			}
		}
	}

	.content {
		margin-top: 28rpx;
		flex: 1;
		padding: 0 30rpx;
	}

	.send {
		font-size: 28rpx;
		color: #333333;
	}

	.link {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 50rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #808080;

		span {
			padding: 20rpx;
		}
	}

	.main {
		color: $main-color;
	}

	.bind {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 30rpx;
	}

	.input-box {
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;

		.code-sty {
			color: #FE510F;
			border-left: 1px solid #E6E6E6;
			padding-left: 30rpx;
			margin-left: 30rpx;
		}

		.code-sty1 {
			color: #2DA5E1;
		}

		.img {
			width: 30rpx;
			height: 30rpx;
		}

		.title1 {
			width: 30%;
		}
		
		.titles1{
			width: 39%;
			font-size: 24rpx;
		}
		.pla-sty{
			font-size: 24rpx;
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
		height: 96rpx;
		margin: 80rpx auto 50rpx;
		box-sizing: border-box;
		border-radius: 48rpx;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
		opacity: 0.5;
	}
</style>
