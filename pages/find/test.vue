<template>
	<base-layout>
		<u-navbar :is-back="false" :is-fixed="true" :border-bottom="true" title="测试"></u-navbar>
		<view class="box" v-for="(item,index) in time">
			<view class="title font-m color-s list-title" :class="{'daytofixed':num==index}">{{item.date}}</view>
			<view class="content">
				<u-time-line v-for="item in news[item.date]">
					<u-time-line-item nodeTop="10">
						<template v-slot:content>
							<view>
								<view class="flex-r font-min" style="margin-bottom: 30rpx;">
									<view class="color-main">{{item.time}}</view>
									<view class="tag">{{item.tag}}</view>
								</view>
								<view class="color-body font-t font-w" style="margin-bottom: 30rpx;">
									{{item.title}}
								</view>
								<view class="msg color-s font-m" ref="text" id="text" style="margin-bottom: 20rpx;" :class="{text:!isOpen}">{{item.content}}</view>
								<view class="color-0 font-m" style="margin-bottom: 30rpx;" v-if="!isOpen" @click="showInfo(1)">点击查看全文</view>
								<view class="color-0 font-m" style="margin-bottom: 30rpx;" v-if="isOpen==true" @click="showInfo(2)">收起</view>
								<view class="flex-row font-min">
									<view class="color-main">{{item.source}}</view>
									<view class="flex-r share" @click="go(item.id)">
										<image src="/static/find/share.png" mode=""></image>
										<view>分享</view>
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
		infoRequest
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				isOpen: "none", //false展开-true收起
				//快讯-内容列表
				time: [], //日期
				news: [], //资讯
				num: -1
			}
		},
		onLoad() {

		},
		mounted() {
			window.addEventListener('scroll', this.onPageScroll);
		},

		onShow() {
			this.getData()
		},
		methods: {
			onPageScroll() {
				var i = 0;
				var alltitle = document.querySelectorAll('.list-title');
				// if (contop > 88 && contop < 148) {
					
				// }
				for (i = 0; i < alltitle.length; i++) {
					var contop = alltitle[i].getBoundingClientRect().top;
					if (contop > 0 && contop < 88) {
						console.log('第' + i + '个' + '距离顶部' + contop)
						this.num = i;
					}
					
				}
			},

			getData() {
				// 测试数据
				let data = [{
					date: "2021-03-24",
					record: [{
						time: "12:53",
						tag: "快讯",
						title: "2月4日消息，区块链概念股上涨，美图涨近18%，火币科技涨超16%，雄安开机涨超14%，裕兴科技涨超6%欧科云链涨超5%。",
						content: "行深入布局在物v法人股举报v覅",
						source: "QKL123"
					}, {
						time: "11:00",
						tag: "快讯",
						title: "2月4日消息，区块链概念股上涨，美图涨近18%，概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%概念股上涨，美图涨近18%火币科技涨超16%，雄安开机涨超14%，裕兴科技涨超6%欧科云链涨超5%。",
						content: "行深入布局在物v法人股举报v覅",
						source: "QKL123"
					}]
				}, {
					date: "2021-03-23",
					record: [{
						time: "12:00",
						tag: "快讯",
						title: "2月4日消息，区块链概念股上涨，美图涨近18%，火币科技涨超16%，雄安开机涨超14%，裕兴科技涨超6%欧科云链涨超5%。",
						content: "行深入布局在物v法人股举报v覅",
						source: "QKL123"
					}, {
						time: "10:00",
						tag: "快讯",
						title: "2月4日消息，区块链概念股上涨，美图涨近18%，火币科技涨超16%，雄安开机涨超14%，裕兴科技涨超6%欧科云链涨超5%。",
						content: "行深入布局在物v法人股举报v覅",
						source: "QKL123"
					}, {
						time: "09:00",
						tag: "快讯",
						title: "2月4日消息，区块链概念股上涨，美图涨近18%，火币科技涨超16%，雄安开机涨超14%，裕兴科技涨超6%欧科云链涨超5%。",
						content: "行深入布局在物v法人股举报v覅",
						source: "QKL123"
					}, {
						time: "08:00",
						tag: "快讯",
						title: "2月4日消息，区块链概念股上涨，美图涨近18%，火币科技涨超16%，雄安开机涨超14%，裕兴科技涨超6%欧科云链涨超5%。",
						content: "行深入布局在物v法人股举报v覅",
						source: "QKL123"
					}]
				}]
				let time = [...this.time]
				let news = [...this.news]
				data.map(item => {
					const list = this.news[item.date] || []
					if (list.length == 0) {
						time.push({
							date: item.date
						})
					}
					news[item.date] = list.concat(item.record)
				})
				this.time = time
				this.news = news
				console.log("时间", this.time);
				console.log("资讯", this.news);
			},
			getHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#text').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.height);
					if (data.height > 85) {
						this.isOpen = false
					}
				}).exec();
			},
			showInfo(type) {
				// 1 展开 2收起
				if (type == 1) {
					this.isOpen = true
				} else {
					this.isOpen = false
				}
			},
		},
		destroyed() {
			window.removeEventListener('scroll', this.onPageScroll);
		},

	}
</script>

<style lang="scss" scoped>
	.box {
		.title {
			height: 60rpx;
			line-height: 60rpx;
			background-color: #f5f5f5;
			width: 100%;
			padding: 0 30rpx;
		}

		.content {
			padding: 20rpx 30rpx 0rpx 30rpx;
		}

		.tag {
			width: 75rpx;
			text-align: center;
			height: 36rpx;
			line-height: 36rpx;
			background: #2DA5E1;
			border-radius: 4rpx;
			color: #FFFFFF;
			margin-left: 20rpx;
		}

		.text {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 5;
			overflow: hidden;
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

	.daytofixed {
		position: fixed;
		top: 88rpx;
		z-index: 999;
	}
</style>
