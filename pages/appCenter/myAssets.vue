<template>
  <view class="myAssets">
	<u-navbar :is-back="true" :is-fixed="true" title="我的资产"></u-navbar>
    <view class="box">
      <view class="item">
        <view class="title">
          <image class="icon t" src="/static/appCenter/t.png"></image>
          <text>USDT</text>
        </view>
        <view class="value">{{ usdtVal }}</view>
		</view>
	  </view>
	<view class="box">
		  <view class="item">
			<view class="title">
			  <image class="icon" src="/static/appCenter/ic-wallet.png"></image>
			  <text>TXD</text>
			</view>
			<view class="value">{{ val }}</view>
		  </view>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
	
      usdtVal: 2999,
      val: 353,
    };
  }
};
</script>

<style scoped lang="scss">
.myAssets {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #FFFFFF;
  overflow: scroll;

  .box {
    margin: 30rpx 212rpx 30rpx 32rpx;
    background-color: #ffffff;
    box-shadow: 0 4rpx 16rpx 2rpx rgba(0, 0, 0, 0.03);
    border-radius: 20rpx;
    border: solid 1rpx #e8e8e8;
	height: 138.2rpx;
	width: 690rpx;

    .item {
      // padding: 48rpx 12rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
	  width: 100%;
	  height: 138.2rpx;
      &:last-child {
        border-bottom: 0;
      }
    }

    .icon {
      width: 84rpx;
      height: 85rpx;
      margin-right: 31rpx;
      position: relative;
      overflow: hidden;
		
      &.t:before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 2rpx 0;
        font-size: 24rpx;
        color: #FFFFFF;
        content: 'TX4D';
        display: block;
        background: rgba(0, 0, 0, 0.6);
        text-align: center;
      }
    }

    .title {
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
	  margin: auto 43rpx;
    }

    .value {
      font-size: 48rpx;
      letter-spacing: 2rpx;
	  margin: auto 56rpx;
    }
  }
}

</style>