<template>
	<view class="nightMode page">
<!--    <u-navbar  v-if="!isTx()"  :is-back="true" title="" :title-width="227" class="zhiti":title-bold="true">-->
<!--    </u-navbar>-->
    <view class="icon-left" @click="dark()"></view>
		<view class="night-text">
      <img class="night-logo" src="/static/my/dark.png" alt="moon">
			<view class="text-top">
        暗夜模式
        <view style=" color: #0e8bfb; font-size: 16px;">(限免)</view>
			</view>
			<view class="text-bottom">
        文字柔和，色彩更适应夜晚，避免刺眼
			</view>
      <button class="night-btn" type="default" @click="nightOpen()">{{ btn === false ? '开启' : '关闭' }}</button>
		</view>

	</view>
</template>

<script>
export default{
  data(){
    return {
      btn: false,
    }
  },
  onLoad() {
  	// this.btn = localStorage.getItem("btn") === "false"? false : true;
	// console.log('kaishi',this.btn)
  },
  mounted() {
    // this.btn = uni.getStorageSync("btn") === "true";
  },

  methods: {
    dark() {
      history.back()
    },
    nightOpen(){
      this.btn = !this.btn;
      // console.log("nightopen", this.btn)
      uni.setStorageSync("btn", this.btn);
      window.location.reload();

    },

  }
}
</script>

<style lang="scss" scoped>
	.nightMode{
		height: 100vh;
		// background-color: $night-background;
		display: flex;
		flex-direction: column;
    align-items: center;
    background-image: url("/static/my/bj.png");
    background-size: 100% 100%;
    & .night-text{
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 80%;
      justify-content: center;
      & .night-logo{
        width: 126rpx;
        height: 126rpx;
      }
      & .text-top{
        font-size: 46rpx;
        font-weight: bold;
        letter-spacing: 4rpx;
        color: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-top: 60rpx;
      }
      & .text-bottom{
        font-size:28rpx;
        color: #FFFFFF;
        letter-spacing: 4rpx;
        margin-top: 20rpx;
      }
      & .night-btn{
        width: 383rpx;
        height: 101rpx;
        background: #FFFFFF;
        border-radius: 30rpx;
        line-height: 101rpx;
        margin-top: 60%;
      }
    }
    .icon-left {
      content:url("/static/my/left.png");
      width: 21rpx;
      height: 39rpx;
      position: absolute;
      transform: translate(-340rpx, 40rpx);
    }
	}
</style>
