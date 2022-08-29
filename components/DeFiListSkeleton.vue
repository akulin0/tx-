<template>
	<view style='padding: 0 30rpx 30rpx 30rpx;width: 690rpx;'>
		<view class="u-skeleton ">
			<view v-for="(item,index) in 10" class="item ">
				<view  style="align-items: flex-start;">
					<view class="u-skeleton-rect  " style="width: 200rpx;height: 40rpx;">
					</view>
					<view class="u-skeleton-rect " style="margin-top: 20rpx;width: 200rpx;height: 40rpx;">
					</view>
				</view>
				<view >
					<view class="u-skeleton-rect " style="width: 200rpx;height: 40rpx;"></view>
					<view class="u-skeleton-rect" style="margin-top: 20rpx;width: 200rpx;height: 40rpx;"></view>
				</view>
				<view class="u-skeleton-fillet" style="height: 60rpx;width: 136rpx;margin-left: 20rpx;">

				</view>
			</view>
		</view>
		<u-skeleton :loading="true" :animation="true" el-color="#ddd" bgColor="#FFF"></u-skeleton>

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
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.item {
		height: 130rpx;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.icon {
		width: 34rpx;
		height: 34rpx;
		margin-right: 10rpx;
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
		width: 136rpx;
		height: 62rpx;
		text-align: center;
		line-height: 62rpx;
		font-size: 24rpx;
		border-radius: 31rpx;
		color: #FFFFFF;
		background-color: #30B481;
	}

	.width1 {
		width: 45%;
	}

	.width2 {
		width: 30%;
	}

	.width3 {
		width: 25%;
	}
</style>
