<!-- 个人资料 -->
<template>
	<base-layout>
		<u-navbar  v-if="!isTx()" :is-back="true" :is-fixed="true" :title="navText" :title-bold="true" style="border-bottom: 1px solid #E6E6E6;" title-width="380"></u-navbar>
		<view class="font-body content">
			<view class="flex-j-a head-box" @click="headCut()">
				<view>{{$t('ibinz.msg124',['头像'])}}</view>
				<view class="flex-align">
					<image :src="info.head_portrait" mode="" class="head-img" v-if="info.head_portrait"></image>
					<image src="/static/my/header.png" mode="" class="head-img" v-else></image>
					<image src="/static/my/more.png" mode="" class="img"></image>
				</view>
			</view>
			<view v-for="(item,index) in list" class="list-box flex-j-a" @click="toPage(index,item.url)">
				<view>{{item.title}}</view>
				<view class="flex-align">
					<view class="color-a">{{info[item.key]}}</view>
					<image src="/static/my/erweima.png" mode="" v-if="index==2" style="width: 28rpx;height: 28rpx;"></image>
					<image src="/static/my/more.png" mode="" class="img" v-if="index!=1"></image>
				</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import {
		apiHost
	} from "@/config";
	export default {
		data() {
			return {
				navText:this.$t('ibinz.msg121',['个人资料']),
				list: [{
						title: this.$t('ibinz.msg122',['昵称']),
						key: 'nick_name',
						url: '/pages/my/nickname'
					},
					// {
					// 	title: this.$t('ibinz.msg123',['我的ID']),
					// 	url: '',
					// 	key: 'id'
					// },
					// {
					// 	title: this.$t('ibinz.msg118',['我的二维码']),
					// 	url: '/pages/my/myCode',
					// 	key: ''
					// }
				],
				info: {
					userName: '',
					userId: '',
					avatar: ''
				},
			}
		},
		components: {

		},
		onLoad() {


		},
		onShow() {
			this.getInfo()
		},
		onPullDownRefresh() {

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
				console.log("data: ", this.info);
			},
			headCut() {
				var _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						let _size = res.tempFiles[0].size;
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								_this.upload(image.path);
							}
						});
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			upload(imgurl) {
				uni.showLoading({
					title: this.$t('ibinz.msg138',['正在上传请稍候...'])
				});
				var _this = this;
				uni.uploadFile({
					url: `${apiHost}/uploadFile`, //仅为示例，非真实的接口地址
					filePath: imgurl, //上传图片的路径
					name: 'file', //对应的key
					success: function(res) {
						res = res.data;
						var _res = JSON.parse(res);
						if (_res.errorCode == 0) {
							var imgUrl = _res.data;
							console.log("imgUrl: ", imgUrl);
							_this.setImg(imgUrl)
							uni.showToast({
								icon: 'success',
								title: _this.$t('ibinz.msg139',['图片上传成功!'])
							});
							setTimeout(()=>{
								_this.getInfo()
							},2000)
						}
					},
					complete() {
						uni.hideLoading();
						// _this.upload_field = '';
					}
				});
				
			},
			async setImg(img){
				const {
					data
				} = await request({
					url: '/update-headportrait',
					method: 'post',
					data:{
						"imgUrl":img
					}
				})
			},
			toPage(index, url) {
				if (index != 1) {
          this.toPage(url)
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 30rpx;
	}

	.head-box {
		padding: 11rpx 0;
		border-bottom: 1px solid #E6E6E6;

		.head-img {
			width: 108rpx;
			height: 108rpx;
			border-radius: 20rpx;
		}


	}

	.list-box {
		padding: 36rpx 0;
		border-bottom: 1px solid #E6E6E6;
	}

	.img {
		width: 14rpx;
		height: 24rpx;
		margin-left: 20rpx;
	}
</style>
