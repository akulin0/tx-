<template>
	<view class="invite page">
		<view class="picture">
			<image src="../../static/my/invite/pupian.png" class="tupian"></image>
			<image src="../../static/my/invite/二维码.png" class="erwei"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
			}
		},
		onLoad:function(option){
			
		},
	}
</script>

<style>
	.picture {
		width: 754rpx;
		height: 1380rpx;
	}
	.tupian {
		width: 754rpx;
		height: 1380rpx;
		position: relative;
	}
	.erwei {
		width: 205px;
		height: 205px;
		position: absolute;
		transform: translate(-565rpx, 475rpx);
		
	}
	.invite-title {
		font-family: PingFangSC-Regular;
		font-size: 36rpx;
		
	}
</style>
