<template>
	<view class="list-view">
		<view class="list-item flex-r" v-for="item in list" @click="go(item.url)">
			<view class="left">
				<view class="title">{{item.title}}
				</view>
				<view class="desc">
					<view>{{item.author}}</view>
					<view>{{item.create_time}}</view>
				</view>
			</view>
			<image :src="item.img_url" mode="scaleToFill"></image>
		</view>
	</view>

</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		props: ["list"],
		methods: {
			go(url) {
				this.$emit('toDetail', url);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list-view {
		padding: 0 30rpx;
		margin-bottom: 98rpx;

		.list-item {
			// height: 136rpx;
			border-bottom: 1rpx solid #EFEFEF;
			// padding: 30rpx 0;
			padding: 42rpx 0 32rpx;

			image {
				width: 267rpx;
				height: 160rpx;
				border-radius: 20rpx;
				margin-left: 35rpx;
				overflow: hidden;
				border: 1rpx solid rgba(0,0,0,0.1);
			}

			.text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}

		// .list-item:nth-last-of-type(1) {
		// 	border-bottom: none;
		// }

		.left {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.title{
				font-size: 26rpx;
				font-weight: bolder;
				color: #000000;
				padding-bottom: 30rpx;
			}
			
			.desc{
				font-size: 22rpx;
				font-weight: 400;
				color: #999999;
			}
		}
	}
</style>
