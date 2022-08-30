<template>
  <view class="box">
    <view class="p-title">注册账号</view>
    <!-- 表单 -->
    <base-form class="form" ref="form">
      <base-input
        ref="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :maxlength="11"
        v-model="formData.name"
        :rules="rules.name"
      />
      <base-input
        label="验证码"
        placeholder="请输入验证码"
        v-model="formData.code"
        :maxlength="4"
        :rules="rules.code"
      >
        <u-button
          :ripple="true"
          :hair-line="false"
          size="medium"
          class="sendButton"
          @click="sends"
          >{{ send }}</u-button
        >
      </base-input>
      <base-input
        label="新密码"
        placeholder="请输入新密码"
        v-model="formData.password"
        :rules="rules.password"
        password
      />
      <base-input
        label="确认新密码"
        placeholder="请输入确认新密码"
        v-model="formData.aginPassword"
        :rules="rules.aginPassword"
        password
      />
      <base-input
        label="邀请码"
        placeholder="请输入邀请码"
        v-model="formData.inviteCode"
      />

      <base-button class="button" ref="button" title="注册" @submit="submit" />
    </base-form>
    <base-Login-footer ref="footer" />
  </view>
</template>

<script>
import { Logo } from "@/config";
import { md5, request, sleep } from "@/m-subpack/base";
import { Login } from "@/m-common/common";
export default {
  data() {
    const _this = this;
    return {
      Logo,
      show: true,
      setHeight: 0,
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
        password: {
          require: "请输入密码",
        },
        aginPassword: {
          require: "请输入确认新密码",
          custom(value) {
            console.log(value);
            console.log(_this.formData.password);
            if (_this.formData.password != value) {
              return "两次密码输入不一致";
            }
          },
        },
      },
      formData: {
        name: "",
        code: "",
        password: "",
        aginPassword: "",
      },
    };
  },
  created() {
    var _this = this;
    uni.getSystemInfo({
      success: function (res) {
        _this.setHeight = `${(res.screenHeight - 80) * 2}`;
      },
    });
    uni.$on("__registered", (type) => {
      this.show = type;
      type ? uni.hideTabBar() : uni.showTabBar();
    });
  },
  methods: {
    close() {
      uni.$emit("__registered", false);
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
      this.toPage(url)
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
        const { data } = await request({
          url: "/base/Login/AppReg",
          method: "POST",
          data: {
            userPhone: this.formData.name,
            checkCode: this.formData.code,
            shareCode: this.formData.inviteCode,
            password: md5(this.formData.password),
          },
        });
        Login(data);
        uni.showToast({
          title: "注册成功！",
          duration: 1000,
          icon: "none",
        });
        uni.$emit("__login", "");
        uni.switchTab({
          url: "/pages/index/index",
        });
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
  font-size: 42rpx;
}
.box {
  padding: 56rpx 70rpx;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
  flex: 1;
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

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50rpx;
  margin-top: 32rpx;
  font-size: 24rpx;
  font-weight: 500;
  color: #808080;
}

.main {
  color: $main-color;
}
</style>
