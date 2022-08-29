<template>

    <view class="box">
      <!-- logo -->
      <view class="p-title">密码登录</view>
      <!-- 表单 -->
      <base-form class="form" ref="form">
        <base-input
          label="账号"
          placeholder="请输入账号"
          :maxlength="11"
          v-model="formData.name"
          :rules="rules.name"
        />
        <base-input
          label="密码"
          placeholder="请输入密码"
          v-model="formData.password"
          :rules="rules.password"
          password
        />
        <view class="sub text-right">
          <text @click="loginCode">手机快捷登录</text>
        </view>
        <base-button
          class="button"
          ref="button"
          title="立即登录"
          @submit="submit"
        />
        <base-Login-link />
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
    return {
      Logo,
      show: true,
      setHeight: 0,
      rules: {
        name: {
          require: "请输入账号",
          mobile: "账号格式不正确",
        },
        password: {
          require: "请输入密码",
        },
      },
      formData: {
        name: "",
        password: "",
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
  },
  methods: {
    goTo(url) {
      uni.navigateTo({
        url,
      });
    },
    async loginCode() {
      uni.$emit("__login", "code");
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
          password: md5(this.formData.password),
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
  font-size: 42rpx;
  padding-bottom: 32rpx;
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
</style>
