<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="title">{{ $t('google.txt7') }}</view>
			<view class="input-box font-body font-s flex-j-a">
			</view>
			<view class="input-box border-bottom font-body flex-j-a" v-if="safetyList.length> 1">
				<input class="uni-input" :placeholder="placeholder2" maxlength="6" v-model="code" />
				<!-- <view>
					<view class="font-body" @tap="getPaste" style="color: #2DA5E1;">{{paste}}</view>
				</view> -->
			</view>
			<view class="input-box border-bottom font-body flex-j-a" v-if="safetyList.length">
				<input class="uni-input" password :placeholder="placehoder1" v-model="pass" />
			</view>
			
			<view v-if="safetyList.length > 1" class="text-right mt20" style="color: #666;font-size: 26rpx;" @click="topage('/pages/wallet/resetPass')">
				{{$t('home.txt57',['忘记密码?'])}}
			</view>
			<view class="hint-box"></view>
			
			<base-button :title="btnTitle" ref="button" v-if="(safetyList.length == 1 && pass)  || (safetyList.length == 2 && code && pass)" :disable="false" @submit="save()"
				class="btn"></base-button>
			<view class="btn btn1 flex-center" v-else>
				{{ btnTitle }}</view>
			
		</view>
	</base-layout>
</template>

<script>
	import {
		request, md5
	} from "@/m-subpack/base";
	import Helper from "@/function.js"
  import {toTabBar} from '../../../libs/utils';
	export default {
		data() {
			return {
				navTitle:this.$t('google.txt7'),
				placeholder2: this.$t('google.txt9', ['输入Google验证码']),
				placehoder1: this.$t('home.txt54',['验证密码']),
				btnTitle: this.$t('ibinz.msg68',  ['提交']),
				paste: this.$t('google.txt3', ['粘贴']),
				code: '',
				pass: '',
				safetyList: uni.getStorageSync("safetyList"),
				loginInfo: uni.getStorageSync("loginInfo"),
				option: uni.getStorageSync("option")
			}
		},
		onLoad() {
			
		},
		methods: {
			getPaste(){
				clipboard.getText();
			},

			async save() {
        // var re = /^[0-9]{6}$/;
				// if(!re.test(this.code)){
				// 	uni.showToast({
				// 		title: this.$t('google.txt10'),
				// 		icon: 'none'
				// 	})
				// 	this.$refs.button.hideLoading()
				// 	return;
				// }
				//判断存储接口存在情况
				if(this.option){
					if(this.option.data.hasOwnProperty("password")){
						this.option.data.password = this.pass;	
					}
					try {
						const {
							data
						} = await request({
							url: this.option.url,
							header: {
								googleCode: '123456'
							},
							method: this.option.method,
							data: this.option.data
						})
						if(data){
							this.$refs.button.hideLoading()
						}
						//导出功能
						if(this.option.data.hasOwnProperty("mode")){
								// 1、私钥
								if (this.option.data.mode == 1) {
									uni.navigateTo({
										url: `/pages/wallet/walletDetail?id=${this.option.data.id}&keyContent=${data}`
									})
								} else if (this.option.data.mode == 2) { // 助记词
									uni.setStorageSync('mnemonics', data)
									uni.setStorageSync('mnemonicsType', 2)
									uni.navigateTo({
										url: "/pages/index/copypass"
									})
								} else if (this.option.data.mode == 3) {
									uni.setStorageSync('keystore', data)
									uni.navigateTo({
										url: '/pages/wallet/exportKey'
									})
								}
								
							}else{
									//登录
									if(this.safetyList.length == 1){
										if(data){
											uni.setStorageSync("token", data.token)
											uni.setStorageSync("auid", data.id)
											uni.setStorageSync("password", data.password);
											uni.setStorageSync('timestamp',  new Date().getTime());
										}
										
										

                    toTabBar('/pages/index/index',0)
                  }else{
										uni.showToast({
											title: this.$t('google.txt18',["已提交确认"]),
											duration: 1000
										})
										setTimeout(() => {
											
											if(this.option.url == 'http://test-api-cdn.dolaimi.org/duolaimi/wallettransaction'){
												uni.navigateTo({
													url: '/pages/index/userMoney'
												})
											}else{
												uni.navigateBack({
													delta: 2
												})
											}
											
										}, 1000)
									}
							}
					
					} catch (e) {
						
						//TODO handle the exception
						this.$refs.button.hideLoading()
						
					}
					
				
				}	
			
				
		
			},
		
			
		}
	}
</script>

<style scoped lang="scss">
	
	.content {
		padding: 0 45rpx;
		box-sizing: border-box;
	
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
		font-size: 28rpx;
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
	.btn1 {
		opacity: 0.5;
	}
}
</style>
