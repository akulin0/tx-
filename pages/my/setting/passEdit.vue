<!-- 修改登录密码 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="title" :title-bold="true"
			style="border-bottom: 1px solid #E6E6E6;" title-width="500">
			<!-- <view slot="right" class="slot-right font-body" v-if="type==1" @click="toPage()">
				忘记交易密码
			</view> -->
		</u-navbar>
		<view class="content">
			<view class="flex-j-a input-box" v-if="(password || type == 1) && type != 3">
				<view class="flex-align" style="flex: 1;">
					<view class="title1 font-body" :style="{width:$i18n.locale == 'en-US'?'35%':'',fontSize:$i18n.locale == 'en-US'?'26rpx':''}">{{$t('ibinz.msg29',["原密码"])}}</view>
					<input class="uni-input" :placeholder="placeholder" v-model="oldPass" password />
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(1)" v-if="oldPass"></image>
			</view>
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="title1 font-body" :style="{fontSize:$i18n.locale == 'en-US'?'26rpx':''}">{{$t('ibinz.msg31',["新密码"])}}</view>
					<input class="uni-input" @input="hintClear()" :placeholder="placeholdera" v-model="newPass" password />
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(2)" v-if="newPass"></image>
			</view>
			<view class="hint-box" v-if="hint">{{ hint }}</view>
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="title1 font-body" :style="{width:$i18n.locale == 'en-US'?'43%':'',fontSize:$i18n.locale == 'en-US'?'26rpx':''}">{{$t('ibinz.msg33',["确认新密码"])}}</view>
					<input class="uni-input" :placeholder="placeholderb" v-model="agenPass" password />
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(3)" v-if="agenPass"></image>
			</view>
			<view class="input-box border-bottom font-body flex-j-a">
				<view class="title1 font-body" :style="{width:$i18n.locale == 'en-US'?'43%':'',fontSize:$i18n.locale == 'en-US'?'26rpx':''}">{{$t('ibinz.msg106',["邮箱验证码"])}}</view>
				<input class="uni-input" type="number" :placeholder="placeholder2" v-model="code" />
				<view>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
					<view class="font-body" @tap="getCode" style="color: #2DA5E1;">{{tips}}</view>
				</view>
			</view>
			<view class="hint-box" v-if="hintCode">{{ hintCode }}</view>
			<view v-if="(password || type == 1) && type != 3" class="btn flex-center color-r font-l" :class="[!oldPass || !newPass || !agenPass?'btn1':'']"
				@click="save">{{$t('ibinz.msg37',["确认"])}}</view>
			<view v-if="!password && type == 0 && type != 3" class="btn flex-center color-r font-l" :class="[!newPass || !agenPass?'btn1':'']"
				@click="save">{{$t('ibinz.msg37',["确认"])}}</view>
			<view v-if="type == 3" class="btn flex-center color-r font-l" :class="[!newPass || !agenPass || !code ?'btn1':'']"
				@click="save">{{$t('ibinz.msg37',["确认"])}}</view>
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
				oldPass: '',
				newPass: '',
				agenPass: '',
				title: '',
				type: '',
				passType:0,
				password: uni.getStorageSync('password'), //获取是否有原密码
				placeholder: this.$t('ibinz.msg30', ["请输入原密码"]),
				placeholdera:this.$t('ibinz.msg32'),
				placeholderb:this.$t('ibinz.msg34', ["请确认确认新密码"]),
				placeholder2: this.$t('login.msg5', ['请输入验证码']),
				tips: this.$t('google.txt8',["获取验证码"]),
				walletInfo: {}, // 当前钱包详情
				seconds: 60,
				userInfo: uni.getStorageSync("loginInfo") || {},
				code: '',
				hint: "",
				isSuc: false,
				index: 0,
				hintCode: "",
			}
		},
		components: {

		},
		onLoad(option) {
			this.type = option.type
			if (option.type == 0) {
				// this.title = this.$t('ibinz.msg27',["修改登录密码"]),
				this.title = this.$t('ibinz.msg27', ["修改登录安全密码"])
				this.passType = 0
			} else if (option.type == 1) {
				this.title = this.$t('ibinz.msg28', ["修改交易密码"])
				this.passType = 1
			}else{
				this.title = this.$t('ibinz.msg164',["重置安全密码"])
			}
			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))

		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		methods: {
			hintClear(){
				this.hint = '';
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
					url: '/sendBindSmsCode',
					method: 'post',
					data: {
						"account": this.userInfo.account,
					}
				})
				this.isSuc = true;
				// 通知验证码组件内部开始倒计时
				this.$u.toast(this.$t('login.msg30', ['验证码已发送']));
				this.$refs.uCode.start();
				uni.hideLoading();
				} catch (e) {
					this.index = 0;
					uni.showToast({
						title: e.errorMessage,
						icon: 'none'
					})
					console.log(e, 'bug');
					
				}
			},
			getCode() {
				if (this.userInfo.account) {
					if (Helper.regemail(this.userInfo.account)) {
						if (this.$refs.uCode.canGetCode) {
							// 模拟向后端请求验证码
							uni.showLoading({
								title: this.$t('login.msg29', ['正在获取验证码'])
							})
							
							setTimeout(() => {
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
			async save() {
				
				if (!this.agenPass || (!this.oldPass && this.password && this.type != 3) || !this.newPass) {
					return
				} else if (this.agenPass != this.newPass) {
					uni.showToast({
						title: this.$t('ibinz.msg35',["两次密码输入不一致"]),
						icon: 'none'
					})
					return
				// } else if(this.passType==0 && (this.agenPass.length<8 ||  this.newPass.length<8)) {
						
				// 		uni.showToast({
				// 			title: this.$t('ibinz.msg160',["密码最小长度为8位"]),
				// 			icon: 'none'
				// 		})
				// 		return
						
				// }
				// else if(this.passType==1 && (this.agenPass.length<8 || this.newPass.length<8)){
				// 		uni.showToast({
				// 			title: this.$t('home.txt34',["请输入密码，至少8位"]),
				// 			icon: 'none'
				// 		})
				// 		return
				}else{
					if (this.type == 0) {
						try {
							
						const {
							data
						} = await request({
							url: '/set-password',
							method: 'post',
							data: {
								"newPassword": this.newPass,
								"password": this.oldPass,
								"rnewPassword": this.agenPass
							}
						})
						uni.setStorageSync("password", data.password);
						} catch (e) {
							this.hint = e.errorMessage;
							
							//TODO handle the exception
							return;
							
						}
					} else if(this.type == 3){
							try {
								
							const {
								data
							} = await request({
								url: '/resetPassword',
								method: 'post',
								data: {
									"newPassword": this.newPass,
									"repeatNewPassword": this.agenPass,
									"sms_code": this.code,
								}
							})
							uni.setStorageSync("password", this.newPass);
							} catch (e) {
								if(e.errorMessage == '邮箱验证码输入错误'){
									this.hintCode = '邮箱验证码输入错误';
									this.hint = '';
								}else{
									this.hintCode = '';
									this.hint = e.errorMessage;
								}
							
								return;
								
							}
					
					} else {
						try{
							const {
								data
							} = await request({
								url: '/wallet-update-password',
								method: 'post',
								data: {
									"id": this.walletInfo.id,
									"opassword":this.oldPass,
									"password": this.newPass,
									"rpassword": this.agenPass
								}
							})
						} catch (e) {
							this.hint = e.errorMessage;
							return;
							//TODO handle the exception
							
							
						}
					}
				
					uni.showToast({
						title: this.$t('ibinz.msg36',["操作成功"]),
						duration: 1000
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)

				}
			},
			clear(type) {
				switch (type) {
					case 1:
						this.oldPass = ''
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

		.img {
			width: 30rpx;
			height: 30rpx;
		}

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
	.hint-box{
		padding: 20rpx;
		font-size: 28rpx;
		color: red;
	}
	.btn1 {
		opacity: 0.5;
	}
</style>
