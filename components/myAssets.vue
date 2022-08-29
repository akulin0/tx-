<template>
  <view class="myAssets">
    <view class="box">
      <view class="item">
        <view class="title">
          <image class="icon t" src="/static/appCenter/t.png"></image>


          <text>USDT</text>
        </view>
        <view class="value">{{ usdtVal }}</view>
      </view>
      <view class="item">
        <view class="title">
          <image class="icon" src="/static/appCenter/ic-wallet.png"></image>
          <text>T</text>
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
      val: 353
    };
  }
};
</script>

<style scoped lang="scss">
.myAssets {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f7f7f7;
  overflow: scroll;

  .box {
    margin: 48rpx 30rpx;
    padding: 12rpx 40rpx;
    background-color: #ffffff;
    box-shadow: 0 4rpx 16rpx 2rpx rgba(0, 0, 0, 0.03);
    border-radius: 20rpx;
    border: solid 1rpx #e8e8e8;


    .item {
      padding: 48rpx 12rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      &:last-child {
        border-bottom: 0;
      }
    }

    .icon {
      width: 110rpx;
      height: 110rpx;
      margin-right: 48rpx;
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
      font-size: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .value {
      font-size: 48rpx;
      letter-spacing: 2rpx;
    }
  }
}

</style>