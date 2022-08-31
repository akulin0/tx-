<template>
	<view class="converter">
		<u-navbar :is-back="true" :is-fixed="true" title="汇率换算"></u-navbar>
		<view class="box">
		  <view class="item">
		    <view class="title">
		      <image class="icon t" src="/static/appCenter/t.png"></image>
		      <text>USDT</text>
		    </view>
		    <view class="value font-color">{{ usdtVal }}</view>
			</view>
		  </view>
		<view class="version">USDT余额：2345</view>
		<view class="box">
			  <view class="item">
				<view class="title">
				  <image class="icon" src="/static/appCenter/ic-wallet.png"></image>
				  <text>TXD</text>
				</view>
				<view class="value">{{ val }}</view>
			  </view>
		</view>
		<view class="text">汇率数据由TelegramX提供，更新于2022年8月24日</view>
	</view>
</template>

<script>
	export default {
	  data() {
	    return {
		
	      usdtVal: 1,
	      val: 65,
	    };
	  }
	};
</script>

<style scoped lang="scss">
	.converter {
	  width: 100vw;
	  height: 100vh;
	  display: flex;
	  flex-direction: column;
	
	  .box {
	    margin: 49rpx auto;
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
			
	      // &.t:before {
	      //   position: absolute;
	      //   bottom: 0;
	      //   left: 0;
	      //   width: 100%;
	      //   padding: 2rpx 0;
	      //   font-size: 24rpx;
	      //   color: #FFFFFF;
	      //   content: 'TX4D';
	      //   display: block;
	      //   background: rgba(0, 0, 0, 0.6);
	      //   text-align: center;
	      // }
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
	  .font-color {
		  color: #E86B32;
	  }
	  .text {
		  font-size: 24rpx;
		  color: #999999;
		  display: flex;
		  justify-content: center;
		  margin-top: 216rpx;
	  }
	  .version {
		  display: flex;
		  justify-content: flex-start;
		  margin-left: 50rpx;
	  }
	}
</style>
