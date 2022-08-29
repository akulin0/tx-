<!-- 账号密码登录 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" title="" :title-bold="true" :border-bottom="true">
		<!-- 	<view slot="right" class="font-body slot-right" @click="check()">
				<view v-if="type==0">{{$t('login.msg1',['验证码登录'])}}</view>
				<view v-else>{{$t('login.msg2',['邮箱登录'])}}</view>
			</view> -->
		</u-navbar>
		<view class="content">
			<view class="title">{{$t('login.msg2',['邮箱登录'])}}</view>
			<!-- <view class="title" v-else>{{$t('login.msg1',['验证码登录'])}}</view> -->
			<view class="account font">{{'邮箱账号'}}</view>
			<view class="input-box font-body">
				<input class="uni-input" :placeholder="placeholder" v-model="phone" />
			</view>
			<!-- 邮箱后缀 -->
			<div class="hintBox">
				<div @click="setInput(mail)" class="hintItem" v-for="mail in emails" :key="mail">{{mail}}</div>
			</div>
			<!-- <view class="identifying font">{{'验证码'}}</view> -->
			<view 
			<view class="input-box font-body" v-if="type==0">
				<input class="uni-input" :placeholder="placeholder1" v-model="pass" password />
			</view>
			<view class="input-box font-body flex-j-a input-code" v-else>
				<input class="uni-input" type="number" :placeholder="placeholder2" v-model="code" />
				<view>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
					<view class="font-body" @tap="getCode" style="color: #2DA5E1;">{{tips}}</view>
				</view>
			</view>

			<base-button :title="btnTitle" ref="button" v-if="phone && (pass || code)" :disable="false" @submit="save()"
				class="btn"></base-button>
			<view class="btn flex-center color-r font-l btn1" v-else>{{$t('login.msg6',['登录'])}}</view>
			
			<!-- <view class="foot" @click="check()" v-if="type==0">
				{{$t('login.msg15',['还没有账号'])}}，<span>{{$t('login.msg16',['去注册'])}}</span>
				<image src="/static/login/right.png" mode=""></image>
			</view> -->
			
			<view class="flex-j-a" :class="[$i18n.locale == 'en-US'?'font-m':'font-body']">
				<!-- <view @click="toPage('/pages/login/wordLogin')">{{$t('login.msg7',['助记词登录'])}}</view> -->
				<!-- <view @click="toPage('/pages/my/setting/codeFind?type=1')">{{$t('login.msg8',['忘记密码？'])}}
				</view> -->
			</view>
			<view class="flex-align title-box" :style="{marginLeft:$i18n.locale == 'en-US'?'0rpx':'50rpx'}">
				<image src="/static/biticon/select.png" mode="" class="imgs" v-if="isCheck" @click="isCheck=false">
				</image>
				<image src="/static/biticon/noselect.png" mode="" class="imgs" v-else @click="isCheck=true"></image>
				<view class="font-s">{{$t('login.msg9',['我已经阅读并同意'])}} <span
						@click="toPage('/pages/agreement?type=1')">《{{$t('login.msg10',['用户服务协议'])}}》</span>{{$t('login.msg28',['和'])}}<span
						@click="toPage('/pages/agreement?type=2')">《{{$t('login.msg11',['隐私政策'])}}》</span>
				</view>
			</view>
		</view>

	</base-layout>
</template>

<script>
	import {
		request, md5
	} from "@/m-subpack/base";
	import Helper from "@/function.js"
	export default {
		data() {
			return {
				phone: '',
				pass: '',
				isCheck: false,
				type: 1,
				tips: '',
				// refCode: null,
				seconds: 60,
				code: '',
				isSuc: false,
				index: 0,
				placeholder: this.$t('login.msg3', ['请输入邮箱']),
				placeholder1: this.$t('login.msg4', ['请输入密码']),
				placeholder2: this.$t('login.msg5', ['请输入验证码']),
				btnTitle: this.$t('login.msg6', ['登录']),
				uuid: '',
			}
		},
		components: {

		},
		onShow() {
		
		},
		onLoad() {
		},
		computed: {
			emails() {
				// 如果phone中没有任何东西，则不处理
				if (!this.phone) return []
				// 考虑到用户自己要输@符号，如果@符号首次出现的位置大于等于第零个位置时，则不处理
				if (this.phone.indexOf('@') > -1) return []
				return [
					this.phone + '@gmail.com',
					this.phone + '@qq.com',
					this.phone + '@163.com',
					this.phone + '@126.com',
					this.phone + '@0355.net',
					this.phone + '@263.net',
					this.phone + '@3721.net',
					this.phone + '@yahoo.com',
					this.phone + '@msn.com',
					this.phone + '@hotmail.com',
					this.phone + '@aol.com',
					this.phone + '@ask.com',
					this.phone + '@live.com',
					this.phone + '@yeah.net'
				]
			}
		},
		onPullDownRefresh() {

		},
		methods: {
			// 选择邮箱后缀
			setInput(mail) {
				this.phone = mail
			},
			// 验证码 密码登录切换
			check() {
				this.type = !this.type
			},
			codeChange(text) {
				if(text == '重新获取'){
					this.index = 0;
				}
				this.tips = text == '获取验证码' ? this.$t('google.txt8',["获取验证码"]):  this.isSuc ?  text:  this.$t('google.txt8',["获取验证码"]);
			},
			async sendCode(){
				try {
				const {
					data
				} = await request({
					url: '/send-sms-code',
					method: 'post',
					data: {
						"account": this.phone,
					}
				})
				this.isSuc = true;
				// 通知验证码组件内部开始倒计时
				this.$u.toast(this.$t('login.msg30', ['验证码已发送']));
				this.$refs.uCode.start();
				} catch (e) {
					this.index = 0;
					uni.showToast({
						title: e.errorMessage,
						icon: 'none'
					})
				}
			},
		async getCode() {
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
								
								this.index++;
								if(this.index ==  1){
									this.sendCode();
								}else{
									return;
								}
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
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			UUID () {
				function S4() {
				    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
				}
				let uuid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
				return uuid;
			},
			async save() {
				let d = new Date();
				let second= d.getSeconds();
				console.log("秒数", d)
				//清空原密码
				uni.removeStorageSync("password");
				//清楚谷歌
				uni.removeStorageSync("googleCode");
				if (!this.phone || (!this.pass && !this.code)) {
					this.$refs.button.hideLoading()
					return
				} else if (this.isCheck == false) {
					uni.showToast({
						title: this.$t('login.msg35', ['请先阅读并同意《用户服务协议》和《隐私政策》']),
						icon: 'none'
					})
					this.$refs.button.hideLoading()
				} else {
					if (this.type == 0) {
						try {
							const {
								data
							} = await request({
								url: '/uuid/' + this.UUID (),
								method: 'post',
								data: {
									"account": this.UUID (),
									"password": this.UUID (),
									
								}
							})
							uni.setStorageSync("token", data.token)
							uni.setStorageSync("uuid", data.uuid)
							uni.setStorageSync("password", data.password);
							
							uni.switchTab({
								url: '/pages/index/index'
							})
						} catch (e) {
							
							//TODO handle the exception
							this.$refs.button.hideLoading()
						}
					} else {
						try {
							const {
								data
							} = await request({
								url:  '/uuid/' + this.UUID (),
								method: 'post',
								data: {
									"account": this.UUID (),
									"sms_code": this.UUID (),
									// "device_id": plus.device.uuid
								}
							})
							uni.setStorageSync("token", data.token)
							uni.setStorageSync("uuid", data.uuid);
							uni.setStorageSync("password", data.password);
							uni.switchTab({
								url: '/pages/index/index',
								
							})
							android.loginSucceeded()
						} catch (e) {
							
							//TODO handle the exception
							this.$refs.button.hideLoading()
							
						}

					}

				}

			}
		}

	}
</script>

<style lang="scss" scoped>
	.slot-right {
		margin-right: 30rpx;
	}

	.content {
		padding: 0 45rpx;
		box-sizing: border-box;

		.title {
			margin: 99rpx 0 58rpx;
			font-size: 48rpx;
			top: -70rpx;
			position: relative;
			font-family: PingFangSC-Regular;
		}

		.input-box {
			padding: 42rpx 0;
			border-bottom: 1px solid #DCDCDC;
		}

		 .btn {
			width: 599.1rpx;
			height: 110rpx;
			margin: 80rpx auto 50rpx;
			box-sizing: border-box;
			border-radius: 30rpx;
			position: relative;
			top: 140rpx;
			background: #3A83F7;
			// box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
		}

		// .btn1 {
		// 	opacity: 0.5;
		// }

		.title-box {
			// margin-left: 50rpx;
			position: fixed;
			bottom: 66rpx;

			.imgs {
				width: 29rpx;
				min-width: 24rpx;
				height: 29rpx;
				margin-right: 11rpx;
				position: relative;
				// transform: translate(-44rpx, 40rpx);
				// box-shadow: 0 0 0 #999999
			}
		}

		span {
			color: #2DA5E1;
		}
	}

	.hintBox {
		width: 100%;
		max-height: 300rpx;
		overflow-y: scroll;
		overflow-x: auto;
		position: absolute;
		z-index: 999;
		background-color: #fff;
	}

	.hintItem {
		margin-top: 2px;
		cursor: pointer;
		margin-left: 20rpx;
		font-size: 13px;
		color: #898989;
	}
	
	.foot {
		position: relative;
		top: 10px;
	}
	
	.font {
		width: 124rpx;
		height: 29rpx;
		font-size: 30rpx;
		font-weight: 400;
	}
	.account {
		position: relative;
		top: -20rpx;
	}
	
	.identifying {
		position: relative;
		top: 40rpx;
	}
	
	.input-code {
		position: relative;
		top: 40rpx;
	}
	
	
</style>
