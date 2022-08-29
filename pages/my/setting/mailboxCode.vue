<!-- 邮箱验证码 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true" style="border-bottom: 1px solid #E6E6E6;" title-width="500"></u-navbar>
		<view class="font-body content">
			<view class="font-w">{{$t('ibinz.msg106',['邮箱验证码'])}}</view>
			<view class="color-a title">{{$t('ibinz.msg109',['若未收到邮件，请检查邮箱垃圾箱'])}}</view>
			<u-message-input style="margin-left: -100rpx;" :maxlength="6" @finish="finish"></u-message-input>
			<u-toast ref="uToast"></u-toast>
			<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
			<view class="color-a title1" @tap="getCode">{{tips}}</view>
			<base-button ref="button" class="base-button" @submit="submit" :disable="false" :title="btnText" v-if="num"
			 style="margin-top: 77rpx;width: 650rpx;" />
			<view class="btn flex-center color-r font-l" v-else>{{$t('home.txt56',['确认'])}}</view>
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
				tips: '',
				// refCode: null,
				seconds: 60,
				address: '',
				num:'',
				navTitle:this.$t('ibinz.msg106',['邮箱验证码']),
				btnText:this.$t('home.txt56',['确认'])
			}
		},
		components: {

		},
		onLoad(option) {
			this.address = option.address

		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
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
					}, 2000);
				} else {
					this.$u.toast(this.$t('login.msg31', ['倒计时结束后再发送']));
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			},
			finish(e) {
				this.num = e
				console.log('输入结束，当前值为：' + e);
			},
			async submit(){
				try{
					let res = request({
						url: '/bind-phone-email',
						method: 'post',
						data: {
							"account": this.address,
							"sms_code": this.num
						}
					})
					console.log(res)
					this.$refs.button.hideLoading()
					uni.showToast({
						title:this.$t('ibinz.msg135',['邮箱绑定成功']),
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/my/setting/setting'
						})
					},1000)
				}catch(e){
					this.$refs.button.hideLoading()
					//TODO handle the exception
				}
				
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 48rpx 30rpx 0;
	}

	.title {
		margin: 36rpx 0 44rpx;
	}

	.title1 {
		margin-top: 40rpx;
		color: #FE510F;
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
