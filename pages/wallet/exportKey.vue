<template>
	<base-layout class="main">
		<u-navbar v-if="!isTx()" :is-back="true" :title-width="500" :is-fixed="true" :title="navTitle" title-color="#333333" :title-bold="true">
		</u-navbar>
		<u-tabs :list="tabList" :is-scroll="false" :current="tabCur" :font-size="32" @change="change"
			active-color="#2979ff" inactive-color="#333333"></u-tabs>
		<view v-if="tabCur==0">
			<view class="title font-t font-w">{{$t('wallet.msg1',['离线保存'])}}</view>
			<view>{{$t('wallet.msg2',['请复制粘贴Keystore文件到安全、离线到地方保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险'])}}</view>
			<view class="title font-t font-w">{{$t('wallet.msg3',['请勿使用网络传输'])}}</view>
			<view>{{$t('wallet.msg4',['请勿使用网络传输Keystore文件，一旦被黑客获取将造成不可挽回的资产损失，建议离线设备通过扫二维码方式传输'])}}</view>
			<view class="title font-t font-w">{{$t('wallet.msg5',['密码保险箱保存'])}}</view>
			<view>{{$t('wallet.msg6',['如需在线保存，则建议使用安全等级更高的Password等密码保管软件保存'])}}</view>
			<view class="box">
				{{keystore}}
			</view>
			<view class="flex-center">
				<view class="btn" @click="copy">{{$t('ibinz.msg1',['复制'])}}</view>
			</view>
		</view>
		<view v-if="tabCur==1">
			<view class="title font-t font-w">{{$t('wallet.msg7',['仅供直接扫描'])}}</view>
			<view>{{$t('wallet.msg8',['请二维码禁止保存，截图，以及拍照。仅供用户在安全环境下使用'])}}</view>
			<view class="title font-t font-w">{{$t('wallet.msg9',['在安全环境下使用'])}}</view>
			<view>{{$t('wallet.msg10',['Keystore文件，一旦被黑客获取将造成不可挽回的资产损失，建议离线设备通过扫二维码方式传输'])}}</view>
		</view>
		<view class="code" :class="tabCur==1?'show':''">
			<tki-qrcode ref="qrcode" loadMake :val="code" :size=500 :lv="3" />
		</view>

	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import uQRCode from "@/m-subpack/base/libs/uqrcode.js";
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode"
	export default {
		data() {
			return {
				code: "",
				tabCur: 0,
				tabList: [{
						name: this.$t('wallet.msg11',['Keystore文件'])
					},
					{
						name: this.$t('ibinz.msg16',['二维码'])
					}
				],
				navTitle:this.$t('ibinz.msg19',['导出Keystore'])
			}
		},
		components: {
			tkiQrcode,
		},
		onLoad() {
			this.keystore = uni.getStorageSync('keystore')
			this.code = `${JSON.stringify(this.keystore)}`
		},
		methods: {
			change(index) {
				this.tabCur = index;
				// if (this.tabCur == 1) {
				// 	this.make()
				// }
			},
			//复制
			copy() {
				var _this=this
				uni.setClipboardData({
					data: this.keystore,
					success: function() {
						_this.$refs.uToast.show({
							title: _this.$t('home.txt16',['复制成功']),
							type: 'success'
						})
					}
				});
			},
			// 生成二维码
			async make() {
				const size = 400;
				//二维码距离底部和右侧距离 还有内部间距
				console.log(uQRCode)
				const margin = 0;
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: `${JSON.stringify(this.keystore)}`,
					size: uni.upx2px(size - margin),
					margin: margin,
					backgroundColor: 'rgba(255,255,255,0)',
					foregroundColor: '#000000',
					fileType: 'png',
					errorCorrectLevel: uQRCode.errorCorrectLevel.M,
					success: res => {
						console.log(res)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		color: #333333;
		font-size: 26rpx;
		padding: 0 30rpx;

		.title {
			margin: 30rpx 0 16rpx 0;
		}

		.box {
			margin: 30rpx 0 80rpx 0;
			padding: 30rpx 20rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			word-break: break-all;
			word-wrap: break-word;
		}

		.btn {
			width: 650rpx;
			text-align: center;
			height: 88rpx;
			line-height: 88rpx;
			
background: #2DA5E1;
			box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
			border-radius: 44rpx;
			color: #FFFFFF;
			font-size: 32rpx;
		}

		.code {
			margin-top: 84rpx;
			visibility: hidden;
			flex: 1;
			display: flex;
			justify-content: center;
			position: absolute;
			top: 0;
			
		}

		.show {
			visibility: visible;
			position: static;
		}
	}
</style>
