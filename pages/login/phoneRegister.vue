<!-- 手机邮箱注册 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" title="" :title-bold="true" :border-bottom="true">
		<!-- 	<view slot="right" class="font-body slot-right" @click="check()">
				<view @click="toPage('/pages/login/creatWallet')">{{$t('login.msg13',['助记词注册'])}}</view>
			</view> -->
		</u-navbar>
		<view class="content">
			<!-- <view class="title">{{$t('login.msg14',['邮箱注册'])}}</view> -->
			<view class="input-box font-body">
				<input class="uni-input" :placeholder="placeholder" v-model="phone" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'"/>
			</view>
			<!-- 邮箱后缀 -->
			<div class="hintBox">
				<div @click="setInput(mail)" class="hintItem" v-for="mail in emails" :key="mail">{{mail}}</div>
			</div>
			<!-- <view class="input-box font-body flex-j-a">
				<input class="uni-input" type="number" :placeholder="placeholder1" v-model="code" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'"/>
				<view>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
					<view class="font-body" @tap="getCode" style="color: #2DA5E1;">{{tips}}</view>
				</view>
			</view> -->
			<view class="input-box font-body">
				<input class="uni-input" :placeholder="placeholder2" v-model="pass" password maxlength="12" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'"/>
			</view>
			<view class="input-box font-body">
				<input class="uni-input" :placeholder="placeholder3" v-model="aginPass" password maxlength="12" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'"/>
			</view>
			<base-button :title="btnTitle" ref="button" v-if="phone && pass&& aginPass" :disable="false" @submit="save()"
			 class="btn"></base-button>
			<view class="btn flex-center color-r font-l btn1" v-else>{{$t('login.msg23',['注册'])}}</view>
			<view class="font-body foot" @click="toPage('/pages/login/accountLogin')">{{$t('login.msg17',['已有账号'])}}，<span>{{$t('login.msg18',['去登录'])}}</span>
				<image src="/static/login/right.png" mode=""></image>
			</view>
			<view class="flex-align title-box" :style="{marginLeft:$i18n.locale == 'en-US'?'0rpx':'50rpx'}">
				<image src="/static/biticon/select.png" mode="" class="imgs" v-if="isCheck" @click="isCheck=false"></image>
				<image src="/static/biticon/noselect.png" mode="" class="imgs" v-else @click="isCheck=true"></image>
				<view class="font-s">{{$t('login.msg9',['我已经阅读并同意'])}} <span @click="toPage('/pages/agreement?type=1')">《{{$t('login.msg10',['用户服务协议'])}} 》</span>{{$t('login.msg28',['和'])}}<span @click="toPage('/pages/agreement?type=2')">《{{$t('login.msg11',['隐私政策'])}}》</span></view>
			</view>
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
				pass: '',
				isCheck: false,
				type: 0,
				tips: '',
				// refCode: null,
				seconds: 60,
				code: '',
				aginPass: '',
				placeholder:this.$t('login.msg3',['请输入邮箱']),
				placeholder1:this.$t('login.msg5',['请输入验证码']),
				placeholder2:this.$t('ibinz.msg32'),
				placeholder3:this.$t('login.msg22',['请确认安全密码']),
				btnTitle:this.$t('login.msg23',['注册']),
				uuid : '',
			}
		},
		components: {

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
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		
		
		methods: {
			
			check() {
				this.type = !this.type
			},
			// 选择邮箱后缀
			setInput(mail) {
				this.phone = mail
			},
			codeChange(text) {
				this.tips = text == '获取验证码' ? this.$t('find.msg25',['获取验证码']) : text.length == 7 ? `${text.substring(0, 2)}${this.$t('find.msg26',['秒重新获取'])}` : `${text.substring(0, 1)}${this.$t('find.msg26',['秒重新获取'])}`;
			},
			getCode() {
				if (this.phone) {
					if (Helper.regemail(this.phone)) {
						if (this.$refs.uCode.canGetCode) {
							// 模拟向后端请求验证码
							uni.showLoading({
								title: this.$t('login.msg29',['正在获取验证码'])
							})
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast(this.$t('login.msg30',['验证码已发送']));
								let {
									res
								} = request({
									url: '/send-sms-code',
									method: 'post',
									data: {
										"account": this.phone
									}
								})
								console.log("data: ", res);
								
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 2000);
						} else {
							this.$u.toast(this.$t('login.msg31',['倒计时结束后再发送']));
						}
					} else {
						uni.showToast({
							title: this.$t('login.msg32',['请输入正确邮箱号']),
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: this.$t('login.msg33',['请先输入邮箱']),
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
				
				// let aacon = JSON.stringify(this.$data.phone)
				// let pas = JSON.stringify(this.$data.pass)
				// localStorage.saved_aacont = aacon			
				// localStorage.saved_password = pas
				// this.s_accon.push(JSON.parse(aacon))
				
				if (!this.aginPass || !this.pass) {
					this.$refs.button.hideLoading()
					return
				} else if(this.aginPass.length<8 || this.pass.length<8){
					uni.showToast({
						title: this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']),
						icon: 'none'
					})
					this.$refs.button.hideLoading()
				}else if (this.pass != this.aginPass) {
					uni.showToast({
						title: this.$t('ibinz.msg35',['两次密码输入不一致']),
						icon: 'none'
					})
					this.$refs.button.hideLoading()
				} else if (this.isCheck == false) {
					uni.showToast({
						title: this.$t('login.msg35',['请先阅读并同意《用户服务协议》和《隐私政策》']),
						icon: 'none'
					})
					this.$refs.button.hideLoading()
				} else {
					
					try {
						
						const {
							data
						} = await request({
							url: '/reg-by-phone-or-email',
							method: 'post',
							data: {
								"account": this.phone,
								"password":this.pass,
								"rpassword":this.aginPass,
								"sms_code": this.code,
								
							}
						})
						
		
						uni.setStorageSync("token", data.token)
						uni.setStorageSync("auid", data.id)
						uni.setStorageSync("password", data.password);
								
						uni.switchTab({
							url: '/pages/index/index'
						})
						
						console.log("到这里了吗switchTab")
					} catch (e) {
						//TODO handle the exception
						console.log("到这里了吗catch")
						this.$refs.button.hideLoading()
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
		}

		.input-box {
			padding: 42rpx 0;
			border-bottom: 1px solid #DCDCDC;
			input{
				flex: 1;
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
		}

		.foot {
			margin-top: 41rpx;
			width: 100%;
			text-align: center;

			image {
				width: 13rpx;
				height: 22rpx;
				margin-left: 10rpx;
			}
		}

		.btn1 {
			opacity: 0.5;
		}

		.title-box {
			// margin-left: 50rpx;
			position: fixed;
			bottom: 66rpx;

			.imgs {
				width: 24rpx;
				min-width: 24rpx;
				height: 24rpx;
				margin-right: 11rpx;
			}
		}

		span {
			color: #2DA5E1;
		}
	}
	.hintBox {
		width: 100%;
		max-height: 100px;
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
</style>
