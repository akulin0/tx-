<template>
  <view class="box">
    <u-navbar :is-back="true" :custom-back="close">
     
    </u-navbar>
    <view >
      <view class="p-title">绑定手机号</view>
      <view class="p-titles">{{ appName }}</view>
      <image class="bgimg" src="/static/loginbg.png" mode=""></image>
      <!-- 表单 -->
      <base-form class="form" ref="form">
        <base-input
          ref="mobile"
          placeholder="请输入账号"
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
      <!-- <base-Login-footer ref="footer" /> -->
    </view>
  </view>
</template>

<script>
import { Logo, appName } from "@/config";
import { md5, request, sleep } from "@/m-subpack/base";
import { Login } from "@/m-common/common";
export default {
  data() {
    return {
      Logo,
      appName,
      timer: 60,
      send: "发送验证码",
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
  methods: {
    close() {
      uni.$emit("__login", "");
    },
    // 发送验证码
    async sendCodes() {
      var _this = this;
      //debugger
      if (_this.timer == 60) {
        //调用接口
        await request({
          url: "/base/Login/SendCode",
          method: "POST",
          params: {
            userPhone: this.formData.name,
          },
        });
        this.timer1 = setInterval(() => {
          this.timer--;
          this.send = +this.timer + "s后重新获取";

          if (this.timer == 0) {
            this.send = "发送验证码";
            clearInterval(this.timer1);
            this.timer = 60;
          }
        }, 1000);
        return;
      }
      return;
    },
    async sends() {
      const isError = this.$refs.mobile.isError();
      if (!isError && this.timer == 60) {
        this.sendCodes();
      }
    },
    goTo(url) {
      uni.navigateTo({
        url,
      });
    },
    async submit() {
      if (!this.$refs.footer.isAgreement) {
        uni.showToast({
          title: "请先同意《用户服务协议》和《隐私政策》",
          icon: "none",
        });
        this.$refs.button.hideLoading();
        return;
      }
      try {
        let _data = {
          userPhone: this.formData.name,
          checkCode: this.formData.code,
        };

        const { data } = await request({
          url: "/base/Login/UserLogin",
          method: "POST",
          data: _data,
        });
        uni.$emit("__login", "");
        Login(data);
      } catch (error) {
        console.error(error);
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
