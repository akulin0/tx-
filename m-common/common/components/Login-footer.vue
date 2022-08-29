<template>
  <view class="footer">
	  <view class="ThirdAppLogin" v-if="show">
	    <view class="title">
	      <view class="line"></view>
	      <view class="name">其他登录方式</view>
	    </view>
	    <view class="lists">
			<image v-if="type=='telLogn'" src="/static/phonecode.png" @click="telLogn" style="width: 80rpx;height: 84rpx;" mode=""></image>
	      <view class="iconfont" v-else  style="color: #18b566" @click="wxLogn"
	        >&#xe61b;</view
	      >
	    </view>
	  </view>
    <!-- <view class="agreement link">

      <view>登录即同意</view>
      <view class="main" @click="goTo('/m-subpack/base/pages/agreement?type=1')"
        >《用户服务协议》</view
      >
      <view>和</view>
      <view class="main" @click="goTo('/m-subpack/base/pages/agreement?type=2')">《隐私政策》</view>
    </view> -->

  </view>
</template>

<script>
import { showfooter } from "@/config";
export default {
	
  data(){
    return {
      isAgreement:true,
	  show:showfooter
    }
  },
	props:['type'],
  methods: {
	telLogn() {
		 uni.$emit("__login", "code");
	},
     wxLogn() {
		 uni.$emit("__login", "weixinapp");
      // const code = await FL.sendWeChatAuth();
      // const [error,  data ] = await uni.request({
      //   url:
      //     "https://api.weixin.qq.com/sns/oauth2/access_token?" +
      //     jsonToParams({
      //       appid:wxappid,
      //       secret:wxsecret,
      //       code:code,
      //       grant_type:"authorization_code"
      //     }),
      // });

      // console.log(data);
    },
    goTo(url) {
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/m-subpack/base/scss/iconfont.css";
.footer {
  display: flex;
  flex-direction: column;
}

.link-form {
  flex: 1;
  margin-top: 32rpx;
  display: flex;
  justify-content: space-between;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  font-weight: 500;
  margin-top: 60rpx;
  color: #808080;
  .iconfont{
	  margin-right: 10rpx;
  }
}

.sub {
  color: #333;
  font-size: 26rpx;
  font-weight: 500;
}

.main {
  color: $main-color;
}

.ThirdAppLogin {
  .title {
    position: relative;
    height: 72rpx;

    .line {
      height: 1px;
      position: absolute;
      top: 50%;
      transform: translateX(50%);
      width: 50%;
      background-color: #999999;
    }
    .name {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 22rpx;
      font-weight: 500;
      color: #999999;
      background-color: #fff;
      padding: 0 18rpx;
    }
  }
  .lists {
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 76rpx;
    }
  }
}
</style>
