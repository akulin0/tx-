<template>
	<view class="nightMode page">
		<view class="night-text">
      <img class="night-logo" src="/static/my/dark.png" alt="moon">
			<view class="text-top">
				深色模式
			</view>
			<view class="text-bottom">
        文字柔和，色彩更适应夜晚，避免刺眼
			</view>
		</view>
		<button class="night-btn" type="default" @click="nightOpen()">{{ btn === false ? '开启' : '关闭' }}</button>
	</view>
</template>

<script>
export default{
  data(){
    return {
      btn: false,
    }
  },
  // onLoad() {
  // 	this.btn = localStorage.getItem("btn") === "false"? false : true;
	// console.log('kaishi',this.btn)
  // },
  mounted() {
    this.btn = localStorage.getItem("btn") !== "false";
  },
  methods: {
    nightOpen(){
      this.btn = !this.btn;
      localStorage.setItem("btn", this.btn);
      window.location.reload();
    }
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
      height: 30%;
      justify-content: space-evenly;
      margin-top: 40%;
      & .night-logo{
        width: 126rpx;
        height: 126rpx;
      }
      & .text-top{
        font-size: 46rpx;
        font-weight: bold;
        letter-spacing: 4rpx;
        color: #FFFFFF;
      }
      & .text-bottom{
        font-size:28rpx;
        color: #FFFFFF;
        letter-spacing: 4rpx;
      }
    }
    & .night-btn{
      width: 383rpx;
      height: 101rpx;
      background: #FFFFFF;
      border-radius: 30rpx;
      line-height: 101rpx;
      margin-top: 70%;
    }

	}
</style>
