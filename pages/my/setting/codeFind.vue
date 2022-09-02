<!-- 验证码找回 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="title" :title-bold="true" title-width="500" style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="title1 " :class="[$i18n.locale == 'en-US'?'font-m':'font-body']">{{$t('ibinz.msg100',['账户'])}}</view>
					<input  class="uni-input" :placeholder="placeholder1" v-model="phone" />
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(0)" v-if="phone"></image>
			</view>
			<view class="flex-j-a input-box">
				<view class="flex-j-a" style="flex: 1;">
					<view class="flex-align">
						<view  style="width: 52%;" :class="[$i18n.locale == 'en-US'?'font-m':'font-body']">{{$t('ibinz.msg101',['验证码'])}}</view>
						<input class="uni-input" :placeholder="placeholder2" v-model="code" />
					</view>
					<image src="/static/my/del.png" mode="" class="img" style="margin-right: 20rpx;" @click="clear(1)" v-if="code"></image>
				</view>
				<view>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
					<view class="color-a  font-s" :class="[type==0?'code-sty':'code-sty1']" @tap="getCode">{{tips}}</view>
				</view>

			</view>
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="title1 " :class="[$i18n.locale == 'en-US'?'font-m':'font-body']">{{$t('ibinz.msg31',['新密码'])}}</view>
					<input class="uni-input" :placeholder="placeholder" v-model="newPass" password maxlength="12"/>
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(2)" v-if="newPass"></image>
			</view>
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view :class="[$i18n.locale == 'en-US'?'font-m':'font-body',$i18n.locale == 'en-US'?'titles1':'title1']">{{$t('ibinz.msg33',['确认新密码'])}}</view>
					<input class="uni-input" :placeholder="placeholder3" v-model="agenPass" password maxlength="12"/>
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(3)" v-if="agenPass"></image>
			</view>
			<view class="btn flex-center color-r font-l" :class="[ !phone || !newPass || !agenPass?'btn1':'']" @click="save">{{$t('home.txt56',['确认'])}}</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Md5 from "@/components/md5.js"
	import Helper from "@/function.js"
	export default {
		data() {
			return {
				phone: '',
				newPass: '',
				agenPass: '',
				code: '',
				tips: '',
				// refCode: null,
				seconds: 60,
				type: '',
				title: '',
				placeholder: '',
				placeholder1: this.$t('login.msg3', ['请输入邮箱']),
				placeholder2: this.$t('login.msg5', ['请输入验证码']),
				placeholder3: this.$t('ibinz.msg34', ['请确认新密码'])
			}
		},
		components: {

		},
		onLoad(option) {
			this.type = option.type
			// this.type=0
			console.log(this.type);
			if (this.type == 0) {
				this.title = this.$t('ibinz.msg97', ['验证码找回'])
				this.placeholder = this.$t('ibinz.msg32', ['请输入新密码'])
			} else if (this.type == 1) {
				this.title = this.$t('ibinz.msg98', ['找回密码'])
				this.placeholder = this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']);
			}
		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		methods: {
			async save() {
				if (!this.agenPass || !this.newPass) {
					return
				} else if(! Helper.regemail(this.phone)){
					uni.showToast({
						title: this.$t('login.msg32', ['请输入正确邮箱号']),
						icon: 'none'
					})
				}else if (this.agenPass != this.newPass) {
					uni.showToast({
						title: this.$t('ibinz.msg35', ['两次密码输入不一致']),
						icon: 'none'
					})
				} else if(this.agenPass.length<8 || this.newPass.length<8){
					uni.showToast({
						title: this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']),
						icon: 'none'
					})
				}else{
					if (this.type == 0) {
						uni.reLaunch({
							url: '/pages/my/setting/setting'
						})
					} else if (this.type == 1) {
						const {
							data
						} = await request({
							url: '/find-by-code',
							method: 'post',
							data: {
								account: this.phone,
								code: this.code,
								password: this.newPass,
								rpassword: this.agenPass
							}
						})
						uni.showToast({
							title: this.$t('ibinz.msg134', ['密码设置成功'])
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/accountLogin'
							})
						}, 1500)

					}

				}
			},
			clear(type) {
				switch (type) {
					case 0:
						this.phone = ''
						break;
					case 1:
						this.code = ''
						break;
					case 2:
						this.newPass = ''
						break;
					case 3:
						this.agenPass = ''
						break;
					default:
						break;
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.phone) {
					if (Helper.regemail(this.phone)) {
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
						title: this.$t('login.msg33', ['请先输入邮箱']),
						icon: 'none'
					})
				}

			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			},
			toPage() {
				uni.navigateTo({
					url: '/pages/my/setting/forgetPass'
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 11rpx 30rpx 0;
	}

	.slot-right {
		margin-right: 32rpx;
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
			width: 43%;
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
