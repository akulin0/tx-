<template>
	<view style="padding: 0 30rpx">
		<view class="box-view">
			<view class="box  font-mins color-body" @click="goApp(item)" v-for="(item,index) in list" :key="index">
				<view class="flex-c">
					<view class="border">
						<image :src="item.icon_url" mode=""></image>
					</view>
					<view class="item-title">{{item.title}}</view>
				</view>
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

		props: {
			list: {
				type: Array
			}
		},
		// props: ["list", "title", 'hasMore'],
		methods: {
			goApp(item) {
				this.$emit("goApp", item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-view {
		display: flex;
		flex-wrap: wrap;

		.box {
			width: 25%;
			padding: 10rpx 10rpx 30rpx;
			box-sizing: border-box;

			.border {
				width: 106rpx;
				height: 106rpx;
				border-radius: 25rpx;
				// border: 1rpx solid #e6e6e6;

				image {
					min-width: 100rpx;
					width: 100%;
					height: 100%;
					border-radius: 25rpx;
				}
			}
		}

		.item-title {
			// border: 1rpx solid red;
			word-wrap: break-word;
			width: 100%;
			margin-top: 10rpx;
			text-align: center;
		}
	}
</style>
