<!-- 我的二维码 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navText" :title-bold="true" style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="box">
			<image :src="info.head_portrait" mode="" class="img" v-if="info.head_portrait"></image>
			<image src="/static/my/header.png" mode="" class="img" v-else></image>
			<view>{{info.nick_name}}</view>
			<view class="color-a font-body title">ID:{{info.id}}</view>
			<canvas canvas-id="qrcode" style="width: 320rpx;height: 320rpx;" />
			<!-- <image :src="QRCode"></image> -->
			<view class="color-a font-s" style="margin-top: 19rpx;">{{$t('ibinz.msg119',['使用Telegram XAPP扫描二维码，加我为好友'])}}</view>
			<view class="btn color-r flex-center" @click="addImg()">{{$t('ibinz.msg120',['保存'])}}</view>
		</view>
	</base-layout>
</template>

<script>
	import uQRCode from "@/m-subpack/base/libs/uqrcode.js";
	import {
		request
	} from "@/m-subpack/base";

	export default {
		data() {
			return {
				info: {},
				imgUrl: '',
				QRCode:"",
				navText:this.$t('ibinz.msg118',['我的二维码'])
			}
		},
		components: {

		},
		onLoad() {
			
		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		created() {
			
			this.getInfo()
		},
		methods: {
			async getInfo() {
				const {
					data
				} = await request({
					url: '/getUserInfo',
					method: 'post',
				})
				this.info = { ...data
				}
				this.make()
				console.log("data: ", this.info);
			},
			make(data) {
				console.log("this.info.id: ",this.info.id);
				const size = 320;
				//二维码距离底部和右侧距离 还有内部间距
				const margin = 0;
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: `${this.info.id}`,
					size: uni.upx2px(size - margin),
					margin: margin,
					backgroundColor: 'rgba(255,255,255,0)',
					foregroundColor: '#000000',
					fileType: 'png',
					// errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						// console.log(res)
						this.imgUrl = res
					}
				})
			},
			addImg() {
				var _this=this
				// console.log("imgUrl: ", this.$t);
				uni.saveImageToPhotosAlbum({
					filePath: this.imgUrl,
					success: function() {
						console.log('save success');
						uni.showToast({
							title: `${_this.$t('home.txt129',['保存成功'])}`
						})
					}
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		flex-direction: column;
		align-items: center;

		.img {
			width: 108rpx;
			height: 108rpx;
			margin: 92rpx 0 33rpx;
			border-radius: 20rpx;
		}

		.title {
			margin: 15rpx 0 40rpx;
		}

		.btn {
			width: 418rpx;
			height: 96rpx;
			
			background: #2DA5E1;

			border-radius: 24rpx;
			margin-top: 80rpx;
		}
	}
</style>
