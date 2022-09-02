<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="title">{{ $t('google.txt7') }}</view>
			<view class="input-box border-bottom font-body flex-j-a">
				<input class="uni-input" type="password" :placeholder="placeholder" v-model="password" />
			</view>
		<!-- 	<view class="input-box border-bottom font-body flex-j-a">
				<input class="uni-input" :placeholder="placeholder3" v-model="email" />
			</view> -->
			<view class="input-box font-body font-s flex-j-a">
				{{ $t('google.txt6') }}{{ userInfo.account | setAccount }}
			</view>
			<view class="input-box border-bottom font-body flex-j-a">
				<input class="uni-input" type="number" :placeholder="placeholder2" v-model="code" />
				<view>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
					<view class="font-body" @tap="getCode" style="color: #2DA5E1;">{{tips}}</view>
				</view>
			</view>
			<view class="hint-box"></view>
			<view class="btn flex-center" @click="toPage()">
				{{ btnTitle }}</view>
			
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
				navTitle:this.$t('ibinz.msg167',["谷歌换绑"]),
				placeholder2: this.$t('login.msg5', ['请输入验证码']),
				placeholder3: this.$t('login.msg36', ['请输入新邮箱']),
				placeholder: this.$t('home.txt141', ['请输入安全密码']),
				btnTitle: this.$t('home.txt64',  ['下一步']),
				tips: this.$t('google.txt8',["获取验证码"]),
				seconds: 60,
				code: '',
				type: 0,
				email: "",
				password: "",
				isSuc: false,
				index: 0,
				userInfo: uni.getStorageSync("loginInfo") || {}
			}
		},
		filters: {
			setAccount(data) {
				return data.substr(0, 3) + "****" + data.substr(7)
			}
		},
		methods: {
			
			codeChange(text) {
				if(text == '重新获取'){
					this.index = 0;
				}
				this.tips = text == '获取验证码' ? this.$t('google.txt8',["获取验证码"]):  this.isSuc ?  text:  this.$t('google.txt8',["获取验证码"]);
			},

			async toPage() {
				if(!this.code && this.userInfo.account){
					uni.showToast({
						title: this.$t('login.msg5', ['请输入验证码']),
						icon: 'none'
					})
					return;
				}
				
				let { data } =await request({
					url: '/updateGoogleAuth',
					method: 'post',
					data: {
						sms_code: this.code,
						password: this.password
					}
				})
				uni.navigateTo({
					url: `/pages/my/setting/backupConfirm?auth=${data.secret}`
				})
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
			
		}
	}
</script>

<style scoped lang="scss">
	
	.content {
		padding: 0 45rpx;
		box-sizing: border-box;
		.down{
			margin: 150rpx auto 50rpx 0;
			text-align: center;
			image{
				width: 110rpx;
				height: 132rpx;
			}
		}
		.title {
			margin: 99rpx 0 58rpx;
			font-size: 48rpx;
		}
		.input-box {
			padding: 42rpx 0;
			&.border-bottom{
				
				border-bottom: 1px solid #DCDCDC;
			}
		}
	.hint-box{
		padding: 40rpx 0;
		color: red;
		font-size: 26rpx;
	}
	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		border-radius: 44rpx;
		color: #fff;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}
	
	.del-btn {
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 30rpx;
		border-radius: 44rpx;
		border: 1px solid #2DA5E1;
		color: #129FF4;
	}
}
</style>
