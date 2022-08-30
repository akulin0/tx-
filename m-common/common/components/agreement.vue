<template>
	<u-popup v-model="show" mode="center" border-radius="16">
		<view class="agreement">
			<view class="agr-title">服务协议和隐私政策</view>
			<view class="agr-content">
				请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供即时通讯、内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在“设置”中查看、变更、删除个人信息并管理你的授权。

			</view>
			<view class="agr-content">你可阅读<span style='color: #3DB9ED;'
					@click="goagr('/m-subpack/base/pages/agreement?type=1')">《服务协议》</span>和<span style='color: #3DB9ED;'
					@click="goagr('/m-subpack/base/pages/agreement?type=2')">《隐私政策》</span> 了解详细信息。如你同意，请点击“同意”开始接受我们的服务。
			</view>
			<view class="agr-btn">
				<view @click="next(false)">暂不使用</view>
				<view class="agr-line"></view>
				<view style='color: #3DB9ED;' @click="next(true)">同意</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		Login
	} from "@/m-common/common";
	export default {
		
		data() {
			return {
				show: true
			}
		},
		methods: {
			next(type) {
				uni.$emit("__agreement", false,type);
			},
			goagr(url) {
        this.toPage(url)
			}
		}

	}
</script>

<style scoped lang="scss">
	.agreement {
		width: 612rpx;
		height: 596rpx;
		background: #FFFFFF;

		.agr-title {
			margin-top: 40rpx;
			font-size: 34rpx;
			font-weight: bold;
			color: #333333;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			margin-bottom: 36rpx;
		}

		.agr-content {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			margin: 0 50rpx;
		}

		.agr-btn {
			position: absolute;
			bottom: 0;
			border-top: 1px solid #F2F2F2;
			height: 98rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 46rpx;

			view {
				text-align: center;
				width: 305rpx;
				line-height: 98rpx;
			}

			.agr-line {
				height: 98rpx;
				width: 1px;
				background-color: #F2F2F2;
			}
		}
	}
</style>
