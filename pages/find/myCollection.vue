<template>
	<base-layout class="main">
		<u-navbar  v-if="!isTx()" :is-back="true" :is-fixed="true" :title="navTitle" title-color="#333333" :title-bold="true"></u-navbar>
		<!-- 列表 -->
		<view class="bottom-content">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id" @click="click" @open="open"
			 :options="options" btn-width="120">
				<view class="item">
					<image mode="aspectFill" :src="item.images"  style="min-width: 100rpx;"/>
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap flex-j-a">
						<view>
							<view class="title">{{ item.title }}</view>
							<view class="text color-main font-m">{{ item.desc }}</view>
						</view>
						<view>
							<image src="/static/find/collection.png" mode="" style="width: 34rpx;height: 34rpx;"></image>
						</view>
					</view>
				</view>
			</u-swipe-action>
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
				navTitle:this.$t('find.msg13',['我的收藏']),
				list: [{
						id: 1,
						title: 'OK浏览器',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false,
						desc: "Heco收个无敌爆炸聚合协议，很厉反光板绑架发给班级佛"
					},
					{
						id: 2,
						title: 'OK浏览器',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false,
						desc: "Heco收个无敌爆炸聚合协议，很厉害..."
					},
					{
						id: 3,
						title: 'OK浏览器',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false,
						desc: "Heco收个无敌爆炸聚合协议，很厉害..."
					}
				],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: this.$t('find.msg18',['取消收藏']),
					style: {
						backgroundColor: '#CCCCCC'
					}
				}, ]
			}
		},
		onLoad(opt) {

		},
		methods: {
			// 取消收藏 index1是options索引
			click(index, index1) {
				// 点击之后关闭列表滑动
				this.list[index].show = false;
				this.$u.toast(this.$t('find.msg19',['收藏成功']));

			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		color: #333333;
		font-size: 28rpx;
		padding: 0 30rpx 50rpx 30rpx;
	}

	.bottom-content {
		padding-top: 10rpx;

		.item {
			display: flex;
			flex-direction: row;
			border-bottom: 1rpx solid #E6E6E6;
			padding: 20rpx 0;

			image {
				width: 100rpx;
				height: 100rpx;
				flex: 0 0 120rpx;
				margin-right: 20rpx;
				border-radius: 20rpx;
			}

			.title-wrap {
				flex: 1;
			}

			.title {
				text-align: left;
				font-size: 34rpx;
				color: #333333;
				font-weight: 800;

			}

			.text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}


		}

		// .item:nth-last-of-type(1) {
		// 	border-bottom: none;
		// }
	}
</style>
