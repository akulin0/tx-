<template>
	<view class="noData" >
			<image :src="noData.image" mode=""></image>
			<view>{{$i18n.locale == 'en-US' ? 'No data': noData.msg}}</view>
	</view>
</template>

<script>

	import { noData } from "@/config";
	export default {
		data() {
			return {
				noData
			};
		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	.noData {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		font-size: 28rpx;
		color: #ADADAD;
		min-height: 76vh;
		image {
			width: 420rpx;
			height: 320rpx;
		}

	}
</style>
