<template>
  <view class="login page">
    <u-navbar is-fixed backgroundColor="#fff" title="找回密码" />
    <!-- 表单提交 -->
    <view class="content">
      <view class="input-box">
        <input
          placeholder="请输入手机号"
          id="userName"
          maxlength="11"
          @input="onInput"
          @blur="onInput"
          v-model="formData.userName"
          type="number"
        />
      </view>
      <view class="input-error">{{ errors.userName }} </view>
      <view class="input-box">
        <input
          placeholder="验证码"
          id="code"
          maxlength="6"
          @input="onInput"
          @blur="onInput"
          v-model="formData.code"
          type="number"
        />
        <view class="send" @click="sends">{{ send }}</view>
      </view>
      <view class="input-error">{{ errors.code }} </view>
      <view class="input-box">
        <!-- #ifndef H5 -->
        <input
          placeholder="请确认登录密码"
          id="password"
          @input="onInput"
          @blur="onInput"
          v-model="formData.password"
          password
        />
        <!-- #endif-->
        <!-- #ifdef H5 -->
        <view
          @click="showinput('password')"
          style="font-size: 16px; width: 100%"
        >
          <view v-if="!passwordd" style="color: grey">请确认登录密码</view>
          <view v-if="passwordd">{{ passwordd }}</view>
        </view>
        <!-- #endif-->
      </view>
      <view class="input-error">{{ errors.password }} </view>
      <view class="input-box">
        <!-- #ifndef H5 -->
        <input
          placeholder="请确认登录密码"
          id="aginPassword"
          @input="onInput"
          @blur="onInput"
          v-model="formData.aginPassword"
          password
        />
        <!-- #endif-->
        <!-- #ifdef H5 -->
        <view
          @click="showinput('aginPassword')"
          style="font-size: 16px; width: 100%"
        >
          <view v-if="!aginPasswordd" style="color: grey">请确认登录密码</view>
          <view v-if="aginPasswordd">{{ aginPasswordd }}</view>
        </view>
        <!-- #endif-->
      </view>
      <view class="input-error">{{ errors.aginPassword }} </view>

      <base-button
        ref="button"
        class="base-button"
        @submit="submit"
        :disable="disable"
        title="提交"
      />
    </view>
  </view>
</template>

<script>
import {
  mobileVar,
  sleep,
  request,
  md5,
  Login,
  LoginOut,
} from "@/m-subpack/base";

export default {
  data() {
    return {
      time: 0,
      btnOK: 0,
      timer: 60,
      send: "发送验证码",
      timer1: null,
      //按钮是否可以点击
      disable: true,
      aginPasswordd: "",
      passwordd: "",
      //提交formData
      formData: {
        userName: "",
        password: "",
        code: "",
        aginPassword: "",
      },
      //错误信息
      errors: {
        userName: "",
        password: "",
        code: "",
        aginPassword: "",
      },
    };
  },
  methods: {
    showinput(type) {
      const _this = this;
      FL.showinput(_this.formData[type], type, (data) => {
        console.log(data.type);
        _this[`${data.type}d`] = data.d;
        _this.formData[`${data.type}`] = data.value;
        _this.verification(data.type, data.value);
      });
    },
    goTo(url) {
      // debugger
      this.toPage(url)
    },
    async sends() {
      this.verification("userName", this.formData.userName);
      if (this.errors.userName) return;

      if (this.btnOK == 0) {
        //改版变量
        this.btnOK = 1;
        this.sendCodes();
        //此处写你要做的事情，操作DOM，发送ajax请求等等。

        //3秒过后可以再次点击
        setTimeout(() => {
          this.btnOK = 0;
        }, 1000);
      } else {
        uni.showToast({
          title: "请勿频繁点击！",
          icon: "none",
        });
      }
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
            userPhone: this.formData.userName,
          },
        });
        uni.showToast({
          title: "验证码已发送",
          icon: "none",
        });
        // debugger
        this.timer1 = setInterval(() => {
          this.timer--;
          this.send = +this.timer + "s后重新获取";

          if (this.timer == 0) {
            this.send = "发送验证码";
            clearInterval(this.timer1);
            this.timer = 60;
            _this.btnOK = 0;
          }
        }, 1000);
        return;
      }
      return;
    },
    async downLoad() {
      await sleep(1000);
      if (this.time > 0) this.time--;
      this.downLoad();
    },
    async submit() {
      try {
        let { errorCode } = await request({
          url: "/base/User/FindTransferPass",
          method: "POST",
          data: {
            phone: this.formData.userName,
            checkCode: this.formData.code,
            password: md5(this.formData.password),
          },
        });
        if (errorCode == 0) {
          uni.showToast({
            title: "修改成功！",
            duration: 1000,
            icon: "none",
            async success() {
              await sleep(1000);
              uni.navigateBack();
            },
          });
        }
      } catch (error) {
        console.error(error);
      }

      this.$refs.button.hideLoading();
    },
    onInput(e) {
      this.verification(e.currentTarget.id, e.detail.value);
    },
    verification(name, value) {
      switch (name) {
        case "userName":
          this.errors.userName = "";
          if (!value) {
            this.errors.userName = "请输入手机号";
          } else if (!mobileVar(value)) {
            this.errors.userName = "请输入正确的手机号";
          }
          break;
        case "password":
          this.errors.password = "";
          if (!value) {
            this.errors.password = "请输入密码";
          }
          break;
        case "aginPassword":
          this.errors.aginPassword = "";
          if (!value) {
            this.errors.aginPassword = "请输入密码";
          } else if (value != this.formData.password) {
            this.errors.aginPassword = "两次输入密码不一致";
          }
          break;
        case "code":
          this.errors.code = "";
          if (!value) {
            this.errors.code = "请输入验证码";
          }
          break;
      }
      this.disableChange();
    },
    disableChange() {
      const formData = { ...this.formData };
      for (let o in formData) {
        this.disable = !!this.errors[o] || !formData[o];
        if (this.disable) break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/m-subpack/base/scss/main.scss";

.tab {
  display: flex;
  height: 50rpx;
  margin-bottom: 50rpx;
  padding: 0 42rpx;
  font-size: 36rpx;
  font-weight: 500;
  color: #b3b3b3;
  .item {
    flex: 1;
  }

  .item.active {
    color: #333333;
    position: relative;
    .line {
      position: absolute;
      bottom: -10rpx;
      width: 20%;
      height: 5rpx;
      background: #1b1b1b;
      border-radius: 3px;
    }
  }
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  // padding:28rpx 45rpx 50rpx;

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
}

.button {
  margin-top: 80rpx;
}

.content {
  margin-top: 28rpx;
  flex: 1;
}

.send {
  font-size: 28rpx;
  font-weight: 500;
  color: #333333;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50rpx;
  font-size: 24rpx;
  font-weight: 500;
  color: #808080;

  span {
    padding: 20rpx;
  }
}

.main {
  color: $main-color;
}
</style>
