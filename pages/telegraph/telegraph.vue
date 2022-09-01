<template>
  <view class="box">
    <image src="/static/telegraph.png" class="imag"></image>
  </view>

</template>

<script>
	import Image from "../../m-common/common/components/image";
  export default {
    components: {Image},
    onShow() {
			// uni.showToast({
			// 	title: "敬请期待",
			// 	duration: 800,
			// })
		},

	}
</script>

<style>
    .box {
      background-color: #2a2a2a;
      width: 750rpx;
      height: 94vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .imag{
      width: 455rpx;
      height: 470rpx;
      bottom: 100rpx;
      left: -40rpx;
    }
</style>
