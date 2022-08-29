<template>
  <view>
    <u-popup
      v-model="showPhone"
      mode="center"
      :z-index="99"
      :height="640"
      width="580"
      duration="0"
      :closeable="false"
      :border-radius="20"
      :mask-close-able="false"
    >
      <view class="pop-m-style">
        <image
          src="/static/shouquan.png"
          style="width: 316rpx; height: 280rpx; margin: 36rpx 0"
          mode=""
        ></image>
        <view>申请获得您的公开信息 </view>
        <view>（包含手机号等） </view>
        <view class="pop-m-btn">
          <button
            class="subbtn"
            open-type="getPhoneNumber"
            @getphonenumber="onGetPhoneNumber"
          >
            确认授权
          </button>
          <view
            style="width: 1px; height: 48rpx; background-color: #e6e6e6"
          ></view>
          <view
            @click="close"
            style="
              color: #cccccc;
              font-size: 30rpx;
              width: 288rpx;
              text-align: center;
            "
            >取消</view
          >
        </view>
      </view>
    </u-popup>

    <u-popup
      v-model="show"
      mode="center"
      :z-index="99"
      :height="640"
      width="580"
      :closeable="false"
      :border-radius="20"
      :mask-close-able="false"
    >
      <view class="pop-m-style">
        <image
          src="/static/shouquan.png"
          style="width: 316rpx; height: 280rpx; margin: 36rpx 0"
          mode=""
        ></image>
        <view>申请获得您的公开信息 </view>
        <view>（包含头像、昵称等） </view>
        <view class="pop-m-btn">
          <button
            class="subbtn"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
          >
            确认授权
          </button>
          <view
            style="width: 1px; height: 48rpx; background-color: #e6e6e6"
          ></view>
          <view
            @click="close"
            style="
              color: #cccccc;
              font-size: 30rpx;
              width: 288rpx;
              text-align: center;
            "
            >取消</view
          >
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { Logo } from "@/config";
import { md5, request, sleep } from "@/m-subpack/base";
import { Login } from "@/m-common/common";
export default {
  data() {
    return {
      Logo,
      show: false,
      showPhone: true,
      formData: {},
      sharecode: "",
    };
  },
  created() {
    this.sharecode = uni.getStorageSync("sharecode") || ""; //邀请码
    var _this = this;
    uni.login({
      provider: "weixin",
      success({ code }) {
        _this.formData.code = code;
      },
    });
  },
  methods: {
    close() {
      uni.$emit("__login", "");
      this.show = false;
      this.showPhone = true;
	  console.log('-colse-----------')
    },
    onGetPhoneNumber(e) {
      console.log(e);
      this.showPhone = false;
      // if(isLogin()) return;
      // debugger
      if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
      this.show = true;

      this.formData = {
        ...this.formData,
        encryptedDataByPhone: e.detail.encryptedData,
        ivByPhone: e.detail.iv,
      };
    },

    async getUserInfo(e) {
      //获取微信手机号

      this.show = false;
      try {
        const { data } = await request({
          url: "/base/Login/WeixinReg",
          method: "POST",
          data: {
            ...this.formData,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            shareCode: this.sharecode,
          },
        });
        Login(data);
      } catch (e) {}
      this.close();
    },
    
  },
};
</script>
<style scoped lang="scss">
.pop-m-style {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40rpx;
  color: #333333;

  .pop-m-btn {
    margin-top: 80rpx;
    display: flex;
    flex-direction: row;
    height: 100rpx;
    align-items: center;
    justify-content: space-around;
    .subbtn {
      color: #fa7528;
      font-size: 30rpx;
      width: 288rpx;
      text-align: center;
      border: none;
      background-color: #fff;
    }
    .subbtn::after {
      border: none;
    }
  }
}
</style>
