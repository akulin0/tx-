<!-- 公告 -->
<template>
	<base-layout>

			<u-navbar :is-back="true" :is-fixed="true" :title="title" :title-bold="true"></u-navbar>
			<view class="content">
				<!-- <base-Item :init="true" :size="10" @getData="getList" class="goodslists"> -->
				<!-- <view slot="content" slot-scope="{ data }"> -->
				<!-- <view class="goods-box"> -->
				<view class="goods flex-j-a" v-for="(item, index) in list">
					<image :src="item.img" mode="" style="width: 84rpx;height: 84rpx;border-radius: 50%;" class="icon-imag"
						v-if="item.img"></image>
					<image src="/static/my/xiaoxi.png" mode=""
						style="width: 84rpx;height: 84rpx;min-width: 84rpx;min-height: 84rpx;" v-else></image>
					<view class="goods-box">
						<view class="flex-j-a">
							<view class="font-t font-w font-title">{{item.title}}</view>
							<view class="font-s time">{{item.update_date}}</view>
						</view>
						<view class="line"></view>
						<view class="line-Detail" @click="toDetail(item.id)">
							查看详情
							<image src="../../static/my/right.png" class="site"></image>
						</view>
						
						<rich-text :nodes="item.content" class="font-m color-main content1"></rich-text>
						<!-- <view class="font-m color-main content1">{{item.content}}</view> -->
							<!-- <view class="dian"></view> -->
						
					</view>

				</view>
				
				<!-- </view> -->
				<!-- </view>
				</base-Item> -->
			</view>
			<base-noData v-if="list.length == 0"/>

	</base-layout>
</template>

<script>
	import {
		infoRequest
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				title: this.$t('ibinz.msg89', ["公告"]),
				list: [],
				pageIndex: 1,
				size: 15,

			}
		},
		components: {

		},
		onLoad() {
			//去掉加载动画
			// this.$refs.button.hideLoading()
		},
		onShow: function() {
			this.getList()
		},
		onPullDownRefresh() {

		},
		methods: {
			async getList() {
				uni.showLoading({
					title: this.$t('ibinz.msg48', ["加载中"])
				})
				const {
					data
				} = await infoRequest({
					url: '/notice-page',
					method: 'get',
					params: {
						limit: this.size,
						page: this.pageIndex
					}
				})
				console.log("data: ", data);
				this.list = data
				uni.hideLoading()
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/my/messageDetails?id=' + id
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 50rpx 30rpx;
	}

	.goods {
		box-shadow: 0px 1rpx 16rpx 0px rgba(36, 56, 211, 0.12);
		border-radius: 20rpx;
		padding: 38rpx;
		margin-bottom: 30rpx;
		width: 625rpx;
		height: 180rpx;
		background-color: #FFFFFF;
		
		.goods-box {
			flex: 1;
			margin-left: 23rpx;
			position: relative;
			transform: translate(-60rpx, -50rpx);
			width: 250.2rpx;
			.time {
				color: #b3b3b3;
			}

			.dian {
				width: 14rpx;
				height: 14rpx;
				background: #FE510F;
				border-radius: 50%;
				margin-left: 48rpx;
			}

			.content1 {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //设置显示几行
				-webkit-box-orient: vertical;
				flex: 1;
				position: absolute;
				transform: translate(60rpx, -40rpx);
				width: 315rpx;
			}
		}
	}

	.font-title {
		position: relative;
		transform: translate(60rpx, -20rpx);
	}
	
	.icon-imag {
		position: relative;
		transform: translate(-4rpx, -60rpx);
	}
	
	.line {
		width: 660rpx;
		height: 2rpx;
		border-top: 1rpx solid #F1F1F1;
		position: relative;
		transform: translate(-60rpx, 100rpx);
	}
	
	.line-Detail {
		font-size: 24rpx;
		color: #999999;
		position: relative;
		transform: translate(-40rpx, 120rpx);
		height: 23rpx;
	}
	
	.site {
		position: relative;
		transform: translate(10px, 10px);
		width: 12rpx;
		height: 23rpx;
		transform: translateX(515rpx);
	}
</style>
