<template>
	<view class="item" @click="go(item)" v-if="item && item.symbol">
		<view class="font-m color-body flex-r">
			<image class="icon" :src="item.token.icon_url || defultIcon" mode=""></image>
			<view class="title">{{item.symbol}}</view>
		</view>
		<view class="color-body font-m flex-c width2">
			<view class="font-w">{{item.price1}}</view>
			<view class="font-min color-main money" style="margin-top: 2rpx;">≈${{item.price2}}</view>
		</view>
		<view>
			<view class="part" :style="{background:item.type==2?'':(item.type==1?'#D9D9D9':'#F77A6A')}">
				{{item.type==2?'+':''}}{{parseInt(item.percent_change_24h)}}%
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
			// console.log(this.item)
		},
		props: ["item"],
		methods: {
			go(item) {
				this.$emit('toDetail',item );
			}

		}
	}
</script>

<style lang="scss" scoped>
	.item {
		// height: 130rpx;
		padding: 38rpx 4rpx 33rpx;
		border-bottom: 1px solid #E6E6E6;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	// .item:nth-last-of-type(1) {
	// 	border-bottom: none;
	// }

	.icon {
		width: 72rpx;
		height: 72rpx;
		margin-right: 23rpx;
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
		width: 20%;
	}

	.width2 {
		width: 45%;
	}

	.width3 {
		width: 35%;
	}
	
	.title{
		font-size: 30rpx;
		font-weight: bold;
		color: #000000;
	}
	
	.money {
		text-align: left !important;
	}

</style>
