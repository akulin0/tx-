<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content" v-if="next == 1">
			<view class="down">
				<image  src="../../../static/down.png"></image>
			</view>
			<view class="input-box font-s color-s flex-j-a">
				{{ $t('google.txt2') }}
			</view>
			<view class="input-box border-bottom font-body flex-j-a">
				<input class="uni-input" disabled="disabled" v-model="auth" />
				<view>
					
					<view class="font-body" @click="copy(auth)" style="color: #2DA5E1;">{{tips}}</view>
				</view>
			</view>
		
			<view class="btn flex-center"  @click="next=2">
				{{ btnTitle }}</view>
		</view>
		<view class="content" v-if="next == 2">
			<view class="title">{{ $t('google.txt5') }}</view>
			<view class="input-box font-body font-s flex-j-a">
				{{ $t('google.txt9') }}
			</view>
			<view class="input-box border-bottom font-body flex-j-a">
				<input class="uni-input" maxlength="6" :placeholder="placeholder2" v-model="code" />
				<!-- <view>
					<view class="font-body" @click="getPaste" style="color: #2DA5E1;">{{paste}}</view>
				</view> -->
			</view>
			<base-button :title="btnTitle2" ref="button" v-if="code" :disable="false" @submit="save()"
				class="btn"></base-button>
			<view class="btn btn1 flex-center" v-else>
				{{ btnTitle2 }}</view>
				
		<!-- 	<view class="btn flex-center" @click="save()">
				{{ btnTitle2 }}</view> -->
		
	</view>
	</base-layout>
</template>

<script>
	import clipboard from "@/js_sdk/dc-clipboard/clipboard.js";
	import {
		request, md5
	} from "@/m-subpack/base";
	import Helper from "@/function.js"
	export default {
		data() {
			return {
				navTitle:this.$t('google.txt1',["备份密钥"]),
				placeholder2: this.$t('login.msg5', ['请输入验证码']),
				btnTitle: this.$t('home.txt64',  ['下一步']),
				btnTitle2: this.$t('hisbag.txt64', ['确定']),
				tips: this.$t('ibinz.msg1', ['复制']),
				paste: this.$t('google.txt3', ['粘贴']),
				seconds: 60,
				code: '',
				next: 1,
				auth: '',
				isCopy: false,
			}
		},
		onLoad(opt) {
			this.auth = opt.auth;
		},
		methods: {
			copy(id) {
				var _this = this
				if(_this.isCopy == true){
					uni.showToast({
						title: _this.$t('ibinz.msg26', ["已复制"]),
						icon:'none'
					})
					return;
				}
				
				uni.setClipboardData({
					data: id,
					success: function() {
						_this.isCopy = true;
						uni.showToast({
							title: _this.$t('ibinz.msg26', ["已复制"]),
							duration: 1000
						})
					}
				});
			},
			codeChange(text) {
				this.tips = text;
			},
			getPaste(){
				clipboard.getText();
			},
			async save(){
				var re = /^[0-9]{6}$/;
				if(!re.test(this.code)){
					uni.showToast({
						title: this.$t('google.txt10'),
						icon: 'none'
					})
					this.$refs.button.hideLoading()
					return;
				}
				try{
					let res = await request({
					url: '/bindGoogleAuth2',
					method: 'post',
					header: {
						"googleCode": this.code,
					},
				})
				uni.reLaunch({
					url:"/pages/my/my"
				})
				} catch (e) {
					this.$refs.button.hideLoading()
					this.$u.toast(e.errorMessage);
					return;
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
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
	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: 40rpx auto;
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
	.btn1 {
		opacity: 0.5;
	}
}
</style>
