<!-- 我的页面 -->
<template>
	<base-layout>
		<view class="get">
			<u-navbar :is-back="true" :title="title" title-color="#ffffff" back-icon-color="#ffffff" :background="{background:'#67a3f8'}"></u-navbar>
			<view class="getbox " style="margin-top: 20rpx;">
				<view class="getheader">
					<!-- <view class="title">{{$t('home.txt93',['扫一扫，向我支付'])}}</view> -->
					<view class="code">
						<tki-qrcode ref="qrcode" loadMake :val="code" :size=320 :lv="3" />
						<!-- <canvas canvas-id="qrcode" style="width: 320rpx;height: 320rpx;" /> -->
					</view>

				</view>
				<view class="title" style="padding: 0 ;margin-top: 20rpx;">{{$t('home.txt94',['收款地址'])}}</view>
				<view class="codetext">{{walletInfo.address}}</view>
				<view class="flex-j" style="margin: 0 30rpx;">
					<!-- <view class="save btn" @click="save">{{$t('home.txt95',['保存到本地'])}}</view> -->
					<view class="copy btn" @click="copy(walletInfo.address)">{{$t('ibinz.msg1',['复制'])}}</view>
				</view>
			</view>
			<!-- <view class="tip">telegram pocket</view> -->
			<!-- <view  style="position: absolute;z-index: -1;top: 0;"> -->
				<!-- <tki-qrcode ref="qrcode2" loadMake :val="code1" :size=500 :lv="3" /> -->
				<!-- <canvas canvas-id="qrcode2" style="width: 500rpx;height: 800rpx;"  /> -->
			<!-- </view> -->
		</view>
	</base-layout>
</template>

<script>
	import uQRCode from "@/m-subpack/base/libs/uqrcode.js";
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode"
	export default {
		data() {
			return {
				cache: {},
				url: "/static/index/codebg.jpg",
				walletInfo:{},
				code: "",
				code1: "",
				title:this.$t('home.txt92',['收款']),
			}
		},
		created() {
			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
			this.make()
			this.drawPage()
			console.log("walletInfo: ",this.walletInfo);
			this.code = `dlm://address/${this.walletInfo.address}`
			console.log("this.code: ",this.code);
		},
		components: {
			tkiQrcode,
		},
		onLoad() {
			
			
		},
		methods: {
			copy(v) {
				uni.setClipboardData({
					data: v,
					success: function() {
						// this.$refs.uToast.show({
						// 	title: '复制成功',
						// 	type: 'success'
						// })
					}
				});
			},
			async make() {
				
				const size = 320;
				//二维码距离底部和右侧距离 还有内部间距
				const margin = 0;
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: `${this.walletInfo.address}`,
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
			},
			drawPage() {
				console.log(111)
				
				var _this = this
				let texts =  _this.walletInfo.address.substring(0,24)
				let textsub =  _this.walletInfo.address.substring(24)
				//海报宽度
				const width = 500;
				//海报高度
				const height = 800;
				//海报二维码大小
				const size = 250;
				//二维码距离底部和右侧距离 还有内部间距
				const margin = 20;
				// console.log("11111",_this.data.userName);
				uQRCode.make({
					canvasId: `qrcode2`,
					componentInstance: _this,
					text: `${this.walletInfo.address}`,
					size: uni.upx2px(size - margin),
					margin: uni.upx2px(0),
					backgroundColor: "#ffffff",
					foregroundColor: "#000000",
					fileType: "jpg",
					x: uni.upx2px(135),
					y: uni.upx2px(195),
					drawImage: {
						url: _this.url,
						x: 0,
						y: 0,
						width: uni.upx2px(width),
						height: uni.upx2px(height),
					},
					// drawHead: {
					//   url: "/static/logo.png",
					//   x: uni.upx2px(margin + 10),
					//   y: uni.upx2px(height - 100),
					//   width: uni.upx2px(90),
					//   height: uni.upx2px(90),
					// },
					drawUserText: {
						text: texts,
						x: uni.upx2px(margin + 60),
						y: uni.upx2px(height - 170),
					},
					drawUsersText: {
						text: textsub,
						x: uni.upx2px(margin + 60),
						y: uni.upx2px(height - 130),
					},
					fail(e) {
						console.error(e);
					},
					success(res) {
						// console.log(res);
						// _this.cache[url] = res.TE;
						// #ifdef APP-PLUS || MP
						uni.saveFile({
							tempFilePath: res,
							success: function(res) {
								_this.cache = res.savedFilePath;
								console.log("---------", _this.cache);
							},
						});
						// #endif

						// #ifdef H5
						// console.log('axaxax',res);
						_this.cache = res;
						// uni.setStorageSync("shareImage", _this.cache);
						//#endif
					},
				});
			},
			// 保存图片
			async save() {
				var _this = this
				let url = this.cache;
				console.log("url",url)
				try {
					url = canvas.toDataURL("image/jpg");
				} catch (error) {
					console.error(error);
				}
				// var url = canvas.toDataURL('image/jpg');

				// const url = this.cache[this.shareImageList[this.current]];
				// console.log(url);
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success(res) {
						uni.showToast({
							title: _this.$t('home.txt129',['保存成功']),
						});
						_this.qrShow = false;
					},
				});
				// #endif
				// // #ifdef H5
				// // const data = url.split(",");
				// await FL.imageSave({
				// 	data: url,
				// });
				// uni.showToast({
				// 	title: "保存成功",
				// });
				// // #endif
				console.log(url);
			},
			//页面跳转
			topage(url) {
        this.toPage(url)``
			}
		}
	}
</script>

<style lang="scss" scoped>
	.get {
		background: linear-gradient(37deg, #67a3f8FF 0%, #4D7EF7 0%, #67A3F8 100%);
		min-height: 100vh;
		width: 750rpx;
		height: 1642rpx;
		.tip {
			color: #FFF;
			text-align: center;
			position: absolute;
			bottom: 30rpx;
			left: 0;
			right: 0;
		}

		.getbox {
			.btn {
				width: 300rpx;
				height: 88rpx;
				border-radius: 20rpx;
				font-size: 32rpx;
				line-height: 88rpx;
				text-align: center;
			}

			.save {
				background: #d4e4f7;
				color: #0e8bfb;
			}

			.copy {
				color: #fff;
				width: 130rpx;
				height: 47rpx;
				border-radius: 10rpx;
				background: #4eadf7FF;
				display: flex;
				justify-content: center;
				// box-shadow: 0px 2px 10px 0px rgba(23, 119, 226, 0.4);
				align-items: center;
			}

			margin-top: 20rpx;
			width: 660rpx;
			height: 1040rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 0 auto;

			.codetext {
				width: 544rpx;
				text-align: center;
				font-size: 32rpx;
				margin: 30rpx auto 50rpx;
				font-weight: 500;
				color: #333333;
				overflow: hidden;
				word-break: break-all;
				/* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2;
			}

			.code {
				width: 466rpx;
				height: 470rpx;
				background-image: url(../../static/index/saoma.png);
				background-size: cover;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				transform: translate(4rpx, 70rpx);
				border-radius: 20rpx
			}

			.title {
				color: #999999;
				font-size: 32rpx;
				padding: 80rpx 0 80rpx 0;
				text-align: center;
			}

			.getheader {
				width: 660rpx;
				height: 600rpx;
				background: linear-gradient(180deg, #FFFFFF, #F5F5F5);
				border-radius: 20rpx 20rpx 0px 0px;


			}

			.codek {
				width: 422rpx;
				height: 422rpx;
			}
		}
	}
	
		/deep/ .u-navbar.u-navbar-fixed.u-border-bottom {
			background-color:transparent !important;
		}
	</style>
</style>
