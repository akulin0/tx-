<template>
  <view class="box">
    <u-navbar :is-back="true" :custom-back="close"></u-navbar>
    <view class="p-title" v-if="!wechatLogin.code">欢迎登录</view>
    <view class="p-title" v-if="wechatLogin.code">绑定手机号</view>
    <view class="p-titles">{{ appName }}</view>
    <image class="bgimg" src="/static/loginbg.png" mode=""></image>
    <!-- 表单 -->
    <base-form class="form" ref="form">
      <base-input
        ref="mobile"
        placeholder="请输入手机号"
        :maxlength="11"
        v-model="formData.name"
        :rules="rules.name"
      />
      <base-input
        placeholder="请输入验证码"
        v-model="formData.code"
        :maxlength="4"
        :rules="rules.code"
      >
        <span class="loginline"></span>
        <span class="sendcode" @click="sends">{{ send }}</span>
      </base-input>
      <base-button
        class="button"
        ref="button"
        title="立即登录"
        @submit="submit"
      />
    </base-form>

    <base-Login-footer v-if="!wechatLogin.code" ref="footer" type="wxLogn" />
  </view>
</template>

<script>
//#ifndef H5
const getOpenInstall = () => {
  
  return new Promise((res, err) => {
    const code = uni.getStorageSync("shareCode") || uni.getStorageSync("sharecode");
    if (code) {
      res(code);
    } else {
      const openinstall = uni.requireNativePlugin("openinstall-plugin");
      openinstall.getInstall(10000000000000, function (result) {
        // console.log("result", result);
        // uni.showToast({
        //   title: result.bindData,
        // });
        const _data = JSON.parse(result.bindData || "{}");
        res(_data.code);
      });
    }
  });
};
//#endif
import { Logo, appName } from "@/config";
import { md5, request, sleep } from "@/m-subpack/base";
import { Login } from "@/m-common/common";
export default {
  props: ["option"],
  data() {
    return {
      Logo,
      appName,
      show: false,
      timer: 60,
      send: "发送验证码",
      token: "",
      wechatLogin: {},
      btnOK: 0,
      rules: {
        name: {
          require: "请输入账号",
          mobile: "账号格式不正确",
        },
        code: {
          require: "请输入验证码",
        },
      },
      formData: {
        name: "",
        code: "",
      },
    };
  },
  mounted() {
    this.wechatLogin = this.option || {};
  },
  methods: {
    close() {
      uni.$emit("__login", "");
    },
    // 发送验证码
    async sendCodes() {
      var _this = this;
      if (_this.timer == 60) {
        //调用接口
        uni.showToast({
          title: "发送短信中...",
          icon: "none",
          duration: 2000,
        });

        let res = await request({
          url: "/base/Login/SendCode",
          method: "POST",
          params: {
            userPhone: _this.formData.name,
          },
        });
        console.log(res);
        if (res.errorMessage == "ok") {
          uni.hideToast();
          this.btnOK = 3;
          this.timer1 = setInterval(() => {
            this.timer--;
            this.send = +this.timer + "s后重新获取";
            if (this.timer == 0) {
              this.send = "发送验证码";
              clearInterval(this.timer1);
              this.timer = 60;
              this.btnOK = 0;
            }
          }, 1000);
        }
        return;
      }
      return;
    },
    async sends() {
      const isError = this.$refs.mobile.isError();
      if (!isError && this.timer == 60) {
        if (this.btnOK == 0) {
          //改版变量
          this.btnOK = 1;
          this.sendCodes();
        } else if (this.btnOK == 3) {
          uni.showToast({
            title: "验证码已发送，注意接收！",
            icon: "none",
          });
        } else {
          uni.showToast({
            title: "请勿频繁点击！",
            icon: "none",
          });
        }
      }
    },
    goTo(url) {
      uni.navigateTo({
        url,
      });
    },
    async submit() {
      try {
        //#ifdef H5
        console.log("----------  uuid");
        try {
          const img = getCanvasFp();
          const ip = returnCitySN;
          this.uuid = md5(img + JSON.stringify(ip));
          console.log("uuid", this.uuid);
        } catch (e) {}
        console.log("----------  uuid-end");
        let openinstall = {};
        try {
          console.log("---------- 22222");
          openinstall = await FL.openinstall();
          console.log("---------- 1111111");
          openinstall = openinstall || {};
        } catch (e) {
          console.log("---------- 1111");
             const code = uni.getStorageSync("shareCode") || uni.getStorageSync("sharecode");
          openinstall = {
            code,
          };
        }
        console.log("---------- openinstall", openinstall);
        const wechatLogin = this.wechatLogin;
        console.log("---------- wechatLogin", wechatLogin);

        const _formData = {
          provider: "sms",
          code: wechatLogin.code,
          installCode: this.uuid,
          userPhone: this.formData.name,
          checkCode: this.formData.code,
          shareCode: openinstall.code || wechatLogin.shareCode,
        };
        console.log("----------", JSON.stringify(_formData));
        //#endif

        //#ifndef H5
        const shareCode = await getOpenInstall();
        console.log("shareCode", shareCode);
        const _formData = {
          provider: "sms",
          userPhone: this.formData.name,
          checkCode: this.formData.code,
          shareCode,
        };

        //#endif
        const { data } = await request({
          url: "/base/Login/LoginV2",
          method: "POST",
          data: _formData,
        });

        if (data.state == 0) {
          uni.$emit("__showIndexPop", true);
        }
        Login(data.token);
        uni.$emit("__login", "");
      } catch (e) {
        console.log("-------- error", e);
      }
      this.$refs.button.hideLoading();
    },
  },
};
</script>
<style scoped lang="scss">
.p-title {
  font-size: 60rpx;
  margin-top: 108rpx;
  font-weight: 600;
  color: #000000;
}

.bgimg {
  width: 92rpx;
  height: 204rpx;
  position: absolute;
  right: 0;
  top: 128rpx;
}

.p-titles {
  font-size: 40rpx;
  font-weight: 500;
  color: #000000;
  margin-top: 34rpx;
}

.loginline {
  display: inline-block;
  width: 2px;
  height: 40rpx;
  background: #fe204f;
}

.sendcode {
  color: #fe204f;
  font-size: 26rpx;
  margin-left: 32rpx;
  margin-right: 44rpx;
}

.box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 99;
  padding: 0 50rpx;
}

.logo {
  display: flex;
  justify-content: center;
  margin: 28rpx 0 59rpx;

  image {
    width: 150rpx;
    height: 150rpx;
    border-radius: 20rpx;
  }
}

.form {
  padding: 50rpx 0;
  margin-top: 102rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .link-form {
    margin-top: 32rpx;
    display: flex;
    justify-content: space-between;
  }
}

.sub {
  color: #333;
  font-size: 26rpx;
  font-weight: 500;
}

.text-right {
  text-align: right;
}

.button {
  margin-top: 52rpx;
  width: 100%;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50rpx;
  font-size: 24rpx;
  font-weight: 500;
  color: #808080;
}

.sendButton {
  background: #ff103f;
  border-radius: 50rpx;
  font-size: 26rpx;
  padding: 0 30rpx;
  font-weight: 500;
  color: #ffffff;
  border: none;

  &::after {
    border: none;
  }
}

.main {
  color: $main-color;
}
</style>
