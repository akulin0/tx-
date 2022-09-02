<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"
			style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
			
			<view class="content-box">
				<view class="plr30">
					<view class="icon">
						<image src="/static/index/icon-success.png"></image>
						<view>{{$t('google.txt14',['转账成功'])}}</view>
						<view class="number">+{{ walletInfo.amount }} {{ walletInfo.coin_symbol }}</view>
					</view>
					<view class="item-box">
						<view class="title">{{$t('home.txt150',['发款方'])}}</view>
						<view class="value">{{ walletInfo.address | setAddress }}
						<image class="copy" src="/static/index/icon-copy.png" @click="copy(walletInfo.address)"></image>
						</view>
					</view>
					<view class="item-box">
						<view class="title">{{$t('home.txt151',['收款方'])}}</view>
						<view class="value">{{ walletInfo.target_address | setAddress }}
							<image class="copy" src="/static/index/icon-copy.png" @click="copy(walletInfo.target_address)"></image>
						</view>
					</view>
					<view class="item-box">
						<view class="title">{{$t('home.txt112',['备注'])}}</view>
						<view class="value">{{ walletInfo.remark }}</view>
					</view>
					<view class="bottom-box flex-center">
						<view class="flex-1">
							<view class="item-box">
								<view class="title">{{$t('home.txt152',['区块号'])}}</view>
								<view class="value">{{ walletInfo.txid | setAddress }}
								<image class="copy" src="/static/index/icon-copy.png" @click="copy(walletInfo.txid)"></image>
								</view>
							</view>
							<view class="item-box">
								<view class="title">{{$t('home.txt153',['交易时间'])}}</view>
								<view class="value">{{ walletInfo.create_date }}</view>
							</view>
							
						</view>
						<view class="right-box">
							<view class="code">
								<tki-qrcode ref="qrcode" loadMake :val="code" :size=110 :lv="3" />
							</view>
						<view class="select-h" @click="clickOpen()">查询链接<image class="copy" src="/static/index/icon-copy.png" @click="copy('txid')"></image></view>
						</view>
					</view>
				</view>
			</view>
	</base-layout>
</template>
<!-- 我的页面 -->
<script>
	import {
		request
	} from "@/m-subpack/base";
	import uQRCode from "@/m-subpack/base/libs/uqrcode.js";
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode"
	import openPage from '@/js/flutter/openPage.js';

	export default {
		data() {
			return {
				navTitle: this.$t('home.txt114',['交易详情']),
				walletInfo: {},
				cache: {},
				code: "",
				code1: "",
			}
		},
	
		onLoad(opt) {
			this.walletInfo = JSON.parse(opt.Info);
		},
		components: {
			tkiQrcode,
		},
		onShow() {
			this.code =`https://scan.dolaimi.org/page/txDetails.html?search=${this.walletInfo.txid}`;
			this.make()
		},
		created() {
			
		},
		filters: {
			setAddress(val) {
				if (val == null) {
					return ''
				} else {
					return val.slice(0, 9) + '...' + val.slice(-9)
				}
			},
		},
		methods: {
			clickOpen(){
				openPage({ url: `https://scan.dolaimi.org/page/txDetails.html?search=${this.walletInfo.txid}` });
			},
			copy(v) {
				uni.setClipboardData({
					data: v == 'txid' ? `https://scan.dolaimi.org/page/txDetails.html?search=${this.walletInfo.txid}` : v,
					success: function() {
					}
				});
			},
	async make() {
		const size = 110;
		//二维码距离底部和右侧距离 还有内部间距
		const margin = 0;
		uQRCode.make({
			canvasId: 'qrcode',
			componentInstance: this,
			text: this.code,
			size: uni.upx2px(size - margin),
			margin: margin,
			backgroundColor: 'rgba(255,255,255,0)',
			foregroundColor: '#000000',
			fileType: 'png',
			// errorCorrectLevel: uQRCode.errorCorrectLevel.H,
			success: res => {
				console.log(res)
			}
		})
			uni.hideLoading();
	},
		}
	}
</script>


<style lang="scss" scoped>
	
	.content-box{
		position: relative;
		margin: 62rpx auto;
		width: 690rpx;
		height: 1048rpx;
		background: #FFFEFF;
		box-shadow: 0px 1rpx 16rpx 0px rgba(36, 56, 211, 0.12);
		border-radius: 20rpx;
		
		.icon{
			margin: 0 auto;
			text-align: center;
			color: #28DB54;
			font-size: 28rpx;
			image{
				margin: -40rpx 0 20rpx 0;
				width: 86rpx;
				height: 86rpx;
			}
			.number{
				margin: 50rpx 0 88rpx 0;
				font-size: 38rpx;
				color: #333;
			}
			
		} 
		.item-box{
				font-size: 28rpx;
			.title{
				color: #808080;
				padding-bottom: 19rpx;
			}
			.value{
				color: #333;
				padding-bottom: 46rpx;
				.copy{
					margin-left: 10rpx;
					width: 21rpx;
					height: 20rpx;
				}
			}
			
		}
		.bottom-box{
			border-top: 1rpx solid #E6E6E6;
			padding-top: 50rpx;
			.right-box{
				width: 200rpx;
				.code {
					width: 168rpx;
					height: 168rpx;
					background-image: url(../../static/index/saoma.png);
					background-size: cover;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.select-h{
					margin-top: 20rpx;
					font-size: 26rpx;
					text-align: center;
					color: #808080;
					image{
						margin-left: 10rpx;
						width: 21rpx;
						height: 20rpx;
					}
				}
			}
		}
	}
</style>
