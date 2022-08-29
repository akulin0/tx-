<template>
	<view class="item flex-r" @click="go(item)" v-if="item">
		<view class="font-m color-body flex-c width1" style="align-items: flex-start;">
			<view class="flex-r">
				<image :src="item.icon || defultIcon" class="icon" mode=""></image>
				<view>{{item.symbol}}</view>
			</view>
			<view class="color-s font-min " style="margin-top: 20rpx;">
				<text class="tag">Val</text>
				<text class="color-main font">TL:${{(item.volume/1000000).toFixed(2)}}M</text>
			</view>
		</view>
		<view class=" font-w color-body font-m flex-c align-end width2">
			<view class="price">{{item.price_usd.toFixed(2)}}</view>
			<view class="font-min color-main" style="margin-top: 20rpx;">≈${{item.price_usd.toFixed(2)}}</view>
		</view>
		<view class="width3 flex-end">
			<view class="part" :style="{background:item.chg > 0 ?'':item.chg == 0 ?'#A0A1A3':'#F1474F'}">
				{{item.chg > 0?'+':''}}{{(item.chg*100).toFixed(2)}}%
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defultIcon: "/static/market/defultIcon.png", //默认icon
			}
		},
		mounted() {

		},
		props: ["item"],
		filters: {
			ruleRate(v) {
				if (v.length > 12) {
					return v.substring(0, 12) + '...'
				} else {
					return v
				}

			}
		},
		methods: {
			go(item) {
				this.$emit('toDetail', item);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		// height: 130rpx;
		padding: 32rpx 3rpx 27rpx;
		border-bottom: 1px solid #E6E6E6;
		flex: 1;
	}

	.icon {
		width: 74rpx;
		height: 74rpx;
		margin-right: 22rpx;
	}

	.flex-end {
		display: flex;
		justify-content: flex-end;
	}

	.align-end {
		align-items: flex-end;
	}

	.part {
		box-sizing: border-box;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
		width: 114rpx;
		height: 48rpx;
		background-color: #50C191;
		border-radius: 24rpx;
		line-height: 48rpx;
	}

	.width1 {
		width: 45%;
	}

	.width2 {
		width: 35%;
	}

	.width3 {
		width: 20%;
	}

	.title {
		font-size: 30rpx;
		color: #000000;
	}

	.tag {
		font-size: 26rpx;
		color: #000000;
		padding-right: 24rpx;
	}

	.rate {
		font-size: 30rpx;
		color: #000000;
	}
	
	.font {
		font-weight: 400;
	}
	
	.price {
		text-align: right ;
	}
</style>
