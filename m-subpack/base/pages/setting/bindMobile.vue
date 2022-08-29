<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="绑定手机" />
		<view class="warp">
			<image src="../../image/image.png" />
			<view class="base">当前绑定手机：{{mobile}}</view>
			<base-button @submit="goTo('mobile')" class="base-button" title="更换手机号" />
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				mobile:"",
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			async getData() {
				const {
					userPhone
				} = await getUserInfo();
				this.mobile = userPhone;
			},
			goTo(url) {
				uni.redirectTo({
					url
				})
			},
		},
		
	
	}
</script>

<style lang="scss" scoped>
	@import "@/m-subpack/base/scss/main.scss";

	.warp {
		text-align: center;
		padding-top: 95rpx;

		image {
			width: 108rpx;
			height: 160rpx;
		}

		.base {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			padding-top: 50rpx;
			padding-bottom: 170rpx;
		}

		.base-button {
			height: 88rpx;
			margin: 0 30rpx;
		}

	}
</style>
