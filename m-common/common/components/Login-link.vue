<template>
  <view class="link-form">
    <view class="sub" @click="forgotPassword">忘记密码</view>
    <view class="sub" @click="registered">注册账号</view>
  </view>
</template>

<script>
import { sleep } from "@/m-subpack/base";
export default {
  methods: {
    async forgotPassword() {
      uni.$emit("__login", "forgotPassword");
    },
    async registered() {
       uni.$emit("__login", "registered");
    },
  },
};
</script>
<style scoped lang="scss">
.link-form {
  margin-top: 32rpx;
  display: flex;
  justify-content: space-between;
}

.sub {
  color: #333;
  font-size: 26rpx;
  font-weight: 500;
}
</style>
