<template>
	<base-layout>
		<view class="box" v-for="(item,index) in dateList" :key="index">
			<view class="title font-m color-s">{{item}}</view>
			<view class="content">
				<u-time-line v-for="(i,index) in newsList[item]" :key="index">
					<u-time-line-item nodeTop="10">
						<template v-slot:content>
							<view>
								<view class="flex-r font-min" style="margin-bottom: 30rpx;color: #999999;">
									<view class="color-main">{{i.time}}</view>
									<view class="tag" :style="'background-color:#'+i.bgColor+';color:#'+i.textColor">
										{{i.tag_title}}
									</view>
								</view>
								<view class="subBox">
									<view class="subTitle">
										{{i.title}}
									</view>
									<!-- <view class="sitting">占位</view> -->
									<view class="msg" ref="textContainer" id="textContainer"
										style="margin-bottom: 20rpx;" :class="{text:!isOpen}">{{i.content}}</view>
									<view class="color-0 font-m" style="margin-bottom: 30rpx;" v-if="!isOpen"
										@click="showInfo(1)">点击查看全文</view>
									<view class="color-0 font-m" style="margin-bottom: 30rpx;" v-if="isOpen==true"
										@click="showInfo(2)">收起</view>
									<view class="flex-row font-min">
										<view class="color-main">{{i.source}}</view>
										<!-- <view class="flex-r share" @click="go(i)">
										<image src="/static/find/share.png" mode=""></image>
										<view>分享</view>
									</view> -->
									</view>
								</view>

							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				isOpen: "none",

			}
		},
		onLoad() {

		},
		mounted() {
			// DOM 加载完执行
			this.$nextTick(() => {
				// this.getHeight()
			})

		},
		props: ["dateList", "newsList"],
		methods: {
			getHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#textContainer').boundingClientRect(data => {
					let height = data.height
					console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
					console.log("节点占据得高度为" + height);

				}).exec();
			},
			go(id) {
				this.$emit('share', id);
			},
			showInfo(type) {
				// // 1 展开 2收起
				// if (type == 1) {
				// 	this.isOpen = true
				// } else {
				// 	this.isOpen = false
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		.title {
			padding: 22rpx 30rpx;
			background-color: #FFFFFF;
			font-size: 30rpx;
			font-weight: 600;
			color: #333333;
		}

		.content {
			margin: 0 40rpx;

			& /deep/ .u-time-axis {
				padding-left: 18rpx;

				&:before {
					border-color: #98C3FF;
				}


				.u-time-axis-node {
					left: -18rpx;

					.u-dot {
						background-color: #3678F5;
						width: 18rpx;
						height: 18rpx;
					}
				}

			}
		}

		.tag {
			width: 50rpx;
			text-align: center;
			height: 36rpx;
			line-height: 36rpx;
			border-radius: 4rpx;
			margin-left: 10rpx;
		}

		.sitting {
			font-size: 26rpx;
			line-height: 42rpx;
			color: #666666;
			visibility: hidden;
		}

		.msg {
			font-size: 26rpx;
			line-height: 42rpx;
			color: #999999;
		}

		.text {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 5;
			word-wrap: break-word;
			word-break: break-all;
		}

		.share {
			border: 1rpx solid #2DA5E1;
			color: #2DA5E1;
			width: 120rpx;
			height: 48rpx;
			border-radius: 42rpx;
			justify-content: center;

			image {
				width: 23rpx;
				height: 23rpx;
				margin-right: 10rpx;
			}
		}
	}

	.subBox {
		background: #F1EDF1;
		border-radius: 30rpx;
		padding: 42rpx 36rpx;

		.subTitle {
			font-size: 30rpx;
			font-weight: 600;
			color: #333333;
			margin-bottom: 32rpx;
		}
	}
</style>
