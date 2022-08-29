<template>
	<view>
		<view class="box flex-r" v-for="item in list" @click="event(item)">
			<image :src="item.icon_url" style="width: 82rpx;height: 82rpx;border-radius: 50%;"></image>
			<view class="box-right" :class="{'noBorder':hideBorder}">
				<view class="title">{{item.title}}</view>
				<view class="desc text">{{item.desc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		props: ["list", 'hideBorder'],
		methods: {
			event(item) {
				this.$emit('go', item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		// height: 150rpx;
		margin-bottom: 32rpx;


		.box-right {
			// height: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			padding: 0 30rpx;
			border-bottom: 1rpx solid #E6E6E6;

			&.noBorder {
				border-bottom: 0 !important;
			}

			.title {
				font-size: 30rpx;
				font-weight: 400;
				color: #333333;
				padding-bottom: 10rpx;
			}

			.desc {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}
		}

		.text {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}

	.box:nth-last-of-type(1)>.box-right {
		border-bottom: none;
	}
</style>
