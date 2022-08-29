<template>
  <view>
    <u-navbar is-fixed title="选择地区" backgroundColor="#fff" />
    <view class="box" style="margin-top: 20rpx; padding-bottom: 10rpx">
      <view class="history">
        历史
        <view class="lists">
          <view class="item" v-for="item in history">
            <view @click="change(item)">
              {{ item }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-for="item in citys">
      <view class="city-sticky title">{{ item.name }}</view>
      <view
        class="city box"
        v-for="data in item.children"
        @click="change(data)"
      >
        {{ data }}
        <view class="line"></view>
      </view>
    </view>
  </view>
</template>

<script>
import { navigateBack } from "@/m-subpack/base";
export default {
  data() {
    return {
      history: ["成都"],
      citys: [
        {
          name: "A",
          children: ["安徽", "安徽", "安徽", "安徽", "安徽"],
        },
        {
          name: "B",
          children: ["安徽", "安徽", "安徽", "安徽", "安徽"],
        },
        {
          name: "C",
          children: ["安徽", "安徽", "安徽", "安徽", "安徽"],
        },
        {
          name: "D",
          children: ["安徽", "安徽", "安徽", "安徽", "安徽"],
        },
      ],
    };
  },
  methods: {
    change(item) {
      navigateBack(item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/m-subpack/base/scss/main.scss";

.city-sticky {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  position: -webkit-sticky;
  /* #endif */

  position: sticky;
  top: calc(44px + var(--status-bar-height));
  z-index: 99;
}

.box {
  padding: 20rpx 30rpx;
  background-color: #fff;
}

.history {
  font-size: 26rpx;
  font-weight: 500;
  color: #969696;
  padding-bottom: 20rpx;
}

.title {
  background-color: #f5f5f5;
  padding: 5rpx 30rpx;

  font-size: 28rpx;
  font-weight: 500;
  color: #969696;
}

.lists {
  display: flex;
  margin: -16rpx;
  margin-top: 4rpx;

  .item {
    padding: 16rpx;
    view {
      border: 1px solid #049eff;
      border-radius: 4px;
      font-size: 26rpx;
      font-weight: 500;
      color: #1a1a1a;
      padding: 10rpx 32rpx;
    }
  }
}

.city {
  position: relative;
  font-size: 28rpx;
  font-weight: 500;
  color: #1a1a1a;
  .line {
    position: absolute;
    left: 32rpx;
    right: 32rpx;
    top: -1px;
    height: 1px;
    background-color: #f5f5f5;
  }
}
</style>
