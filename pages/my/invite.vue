<template>
	<view class="invite page">
		<view class="picture">
      <u-navbar v-if="!isTx()" :is-back="true" :is-fixed="true" title="邀请好友" :title-bold="true"
                style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
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
