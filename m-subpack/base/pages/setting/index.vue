<template>
  <view class="page">
    <u-navbar is-fixed backgroundColor="#fff" title="设置" />
    <view class="warp">
      <view class="item" @click="chooseAvatar" v-if="config.indexOf('tx') >= 0">
        <view class="title">头像</view>
        <!-- {{userInfo.avatar}} -->
        <image
          class="userHead"
          :src="userInfo.avatar || userHead"
          @error="userInfo.avatar = userHead"
        ></image>
        <u-icon class="sub" size="26" name="arrow-right" />
      </view>
      <view
        class="item"
        @click="goTo('nickname')"
        v-if="config.indexOf('nc') >= 0"
      >
        <view class="title">昵称</view>
        <view class="sub">{{ userInfo.userName }}</view>
        <u-icon class="sub" size="26" name="arrow-right" />
      </view>
      <view
        class="item"
        @click="goTo('../agreement?type=4')"
        v-if="config.indexOf('dqdj') >= 0"
      >
        <view class="title">当前等级</view>
        <view class="sub">{{ userInfo.level | level }}</view>
        <u-icon class="sub" size="26" name="arrow-right" />
      </view>
      <view
        class="item"
        @click="goTo('bindMobile')"
        v-if="config.indexOf('sjh') >= 0"
      >
        <view class="title">手机号</view>
        <view class="sub">{{ userInfo.userPhone }}</view>
        <u-icon class="sub" size="26" name="arrow-right" />
      </view>
      <view
        class="item"
        @click="!userInfo.idCard ? goTo('realAuth') : null"
        v-if="config.indexOf('smrz') >= 0"
      >
        <view class="title">实名认证</view>
        <view class="noBind" v-if="!userInfo.idCard">未实名</view>
        <view class="sub" v-if="userInfo.idCard">已实名</view>
        <u-icon
          class="sub"
          v-if="!userInfo.idCard"
          size="26"
          name="arrow-right"
        />
      </view>
      <!-- #ifdef APP-PLUS || H5-->
      <view
        class="item"
        @click="userInfo.alipayUserId ? null : goTo('Alipay')"
        v-if="config.indexOf('bdzfb') >= 0"
      >
        <view class="title">绑定支付宝</view>
        <view class="sub">{{
          userInfo.alipayUserId ? "已绑定" : "未绑定"
        }}</view>
        <u-icon
          class="sub"
          v-if="!userInfo.alipayUserId"
          size="26"
          name="arrow-right"
        />
      </view>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS || H5-->
      <!-- <view class="item" @click="bindWx" v-if="config.indexOf('bdwx') >= 0">
        <view class="title">绑定微信</view>
        <view class="noBind" v-if="!userInfo.openId">未绑定</view>
        <view class="sub" v-if="userInfo.openId">已绑定</view>
        <u-icon
          class="sub"
          v-if="!userInfo.openId"
          size="26"
          name="arrow-right"
        />
      </view> -->
      <!-- #endif -->

      <view
        class="item"
        @click="goTo('recommended')"
        v-if="
          config.indexOf('wdtjr') >= 0 &&
          (userInfo.parentId == null || userInfo.parentId == '')
        "
      >
        <view class="title">我的推荐人</view>
        <view class="sub">添加推荐人</view>
        <u-icon
          v-if="!userInfo.parentId"
          class="sub"
          size="26"
          name="arrow-right"
        />
      </view>
      <view class="item" v-else>
        <view class="title">我的推荐人</view>
        <view class="sub">{{ userInfo.parentId }}</view>
        <!-- <u-icon class="sub" size="26" name="arrow-right" /> -->
      </view>
      <view class="item" v-if="config.indexOf('zcsj') >= 0">
        <view class="title">注册时间</view>
        <view class="sub">{{ userInfo.createTime }}</view>
        <!-- <u-icon class="sub" size="26" name="arrow-right" /> -->
      </view>
      <!-- #ifdef APP-PLUS || H5-->
      <base-button
        ref="button"
        class="base-button"
        @submit="qiut()"
        title="退出登录"
      />
      <!-- #endif -->
      <u-modal
        v-model="showModal"
        :content="content"
        :show-cancel-button="true"
        @confirm="quits()"
      ></u-modal>
    </view>
  </view>
</template>

<script>
import {
  setting,
  userHead,
  level,
  upLoadHost,
  apiHost,
  upLoadPath,
} from "@/config";
import { CaseStore } from "@/store/index.js";
import { getUserInfo, request, sleep, alipayAuth } from "@/m-subpack/base";
import { LoginOut } from "@/m-common/common";

export default {
  data() {
    return {
      config: setting,
      userHead,
      showModal: false,
      userInfo: {
        avatar: "",
      },
      content: "是否确定退出！",
    };
  },
  onLoad(option) {
    this.query = option || {};
  },
  created() {
    uni.$off("uAvatarCropper").$on("uAvatarCropper", async (path) => {
      this.userInfo.avatar = path;
      uni.uploadFile({
        url: `${apiHost}${upLoadHost}?path=${upLoadPath}`,
        filePath: path,
        name: "file",
        complete: (res) => {
          const { data } = JSON.parse(res.data);
          console.log(res);
          this.userInfo.avatar = data;
          this.BaseUpdateUser(this.userInfo.avatar);
          // console.log(res);
        },
      });
      //图片上传
      // console.log(this.userInfo.avatar);
    });
  },
  onShow() {
    this.getData();
  },
  filters: {
    level(value) {
      return level[value];
    },
  },
  methods: {
    async BaseUpdateUser(avatar) {
      await request({
        url: "/base/User/BaseUpdateUser",
        method: "POST",
        data: {
          avatar: avatar,
        },
      });
      this.getData(true);
    },
    async getData(type) {
      const data = await getUserInfo(type);
      this.userInfo = data;
      if (data.accountName) {
        this.userInfo.zhifubaoAccount =
          data.payAccount.substr(0, 4) + "****" + data.payAccount.substr(8, 11);
      } else {
        this.userInfo.zhifubaoAccount = "暂未绑定";
      }
      console.log("getUserInfo", data);
    },
    async goTo(url) {
      if (url === "Alipay") {
        await alipayAuth();
        // console.log(111111);
        this.getData(true);
      } else {
        uni.navigateTo({
          url,
        });
      }
    },
    qiut() {
      this.$refs.button.hideLoading();
      this.showModal = true;
      CaseStore.del();
    },
    bindWx() {
      console.log(this.userInfo.openId);
      if (this.userInfo.openId) return;
      debugger;
      uni.login({
        provider: "weixin",
        fail(e) {
          console.log(e);
        },
        success: async ({ authResult }) => {
          console.log("authResult", authResult);

          const { data } = await request({
            url: "/base/User/WXBind",
            method: "POST",
            data: {
              accessToken: authResult.access_token,
              openId: authResult.openid,
              // unionid: authResult.openid,
            },
          });
          this.getData(true);
          console.log("11111111", data);
        },
      });
    },
    quits() {
      if (this.query.type == "flutter") {
        return FL.logOut();
      }
      LoginOut(true);
    },
    async chooseAvatar() {
      // #ifdef H5
      try {
        const path = await FL.imageCropper();
        console.log(11111);
        console.log(path);
        this.userInfo.avatar = path;
        uni.uploadFile({
          url: `${apiHost}${upLoadHost}?path=${upLoadPath}`,
          filePath: path,
          name: "file",
          complete: (res) => {
            const { data } = JSON.parse(res.data);
            console.log(res);
            this.userInfo.avatar = data;
            this.BaseUpdateUser(this.userInfo.avatar);
            // console.log(res);
          },
        });
      } catch (error) {
        console.log(error);
      }

      // #endif
      // #ifndef H5
      this.$u.route({
        url: "/m-subpack/base/pages/u-avatar-cropper/u-avatar-cropper",
        params: {
          destWidth: 300,
          rectWidth: 200,
          fileType: "jpg",
        },
      });
      // #endif
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/m-subpack/base/scss/main.scss";

.warp {
  padding: 10rpx 32rpx;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333333;
  font-size: 28rpx;
  border-bottom: 1px solid #e6e6e6;
  height: 100rpx;

  .sub {
    color: #999999;
    margin-left: 10rpx;
  }

  .noBind {
    font-size: 28rpx;
    font-weight: 500;
    color: #f32f34;
  }

  .userHead {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }

  .title {
    flex: 1;
  }
}

.button {
  margin-top: 40rpx;
  height: 88rpx;
}
</style>
