<template>
  <view class="invit">
    <u-navbar backgroundColor="#fff" title="邀请好友" />
    <view class="box">
      <view class="box1">
        <view>邀请码:{{ code }}</view>
        <view class="copy" @click="copyText()">复制</view>
      </view>
      <image :src="shareBg" class="shareBg" mode=""></image>
    </view>
    <view class="swiper">
      <swiper
        previous-margin="120rpx"
        next-margin="120rpx"
        circular
        :current="current"
        @change="currentChange"
      >
        <swiper-item v-for="(item, index) in shareImageList" :key="index">
          <view class="item" :class="{ active: current == index }">
            <canvas
              :id="'qrcode-' + index"
              v-show="!cache[item]"
              :canvas-id="'qrcode-' + index"
            />
            <image v-show="cache[item]" :src="cache[item]" />
          </view>
        </swiper-item>
      </swiper>
      <view class="shareBtn">
        <view @click="share">
          <view class="iconfont weixin">&#xe61b;</view>
          微信好友
        </view>
        <view @click="save" style="margin-left: 120rpx">
          <view class="iconfont weixin imgfile">&#xe61e;</view>
          保存图片
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfo,request } from "@/m-subpack/base";
import uQRCode from "@/m-subpack/base/libs/pkluqrcode.js";

import {
  shareBg,
  shareImageList,
  shareLink,
  shareOption,
  ghAppId,
} from "@/config";
export default {
  data() {
    return {
      code: "",
      //海报图片地址
      shareImageList,
      //复制背景说明介绍图地址
      shareBg,
      //海报缓存
      // cache: uni.getStorageSync("shareImage") || {},
      cache: {},
      avatar: "",
      current: 0,
    };
  },
  components: {},
  onReady() {
    this.getData();
  },
  onLoad() {},
  methods: {
    async getData() {
      const data = await getUserInfo();
      console.log("分享code", data);
      this.code = data.shareCode;
      this.data = data;
      this.renderQRCode();
    },
    // 复制邀请码文子
    async copyText() {
      // #ifdef H5
      await FL.clipboard(this.code);
      uni.showToast({
        title: "复制成功",
      });
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: this.code,
        success: () => {
          uni.showToast({
            title: "复制成功",
          });
        },
      });
      // #endif
    },
    renderQRCode() {
      shareImageList.map((item, index) => {
        //  #ifndef MP-WEIXIN
        // const { data } = await request({
        //   url: "/shop/Image/GetBase64File",
        //   method: "POST",
        //   params: {
        //     url: encodeURI(item),
        //   },
        // });
        this.drawQRCode(item, index);
        // #endif
        //  #ifdef MP-WEIXIN
        this.drawQRCode("../../" + item, index);
        // #endif
      });
    },

    drawQRCode(url, number) {
      const _this = this;
      if (_this.cache[url]) return;
      //海报宽度
      const width = 500;
      //海报高度
      const height = 934;
      //海报二维码大小
      const size = 140;
      //二维码距离底部和右侧距离 还有内部间距
      const margin = 20;
      // console.log("11111",_this.data.userName);

      uQRCode.make({
        canvasId: `qrcode-${number}`,
        componentInstance: _this,
        text: shareLink + _this.code,
        size: uni.upx2px(size - margin),
        margin: uni.upx2px(0),
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        x: uni.upx2px(width / 2 - 60),
        y: uni.upx2px(height / 2 + 194),
        drawImage: {
          url: url,
          x: 0,
          y: 0,
          width: uni.upx2px(width),
          height: uni.upx2px(height),
        },
        drawHead: {
          url: _this.data.avatar,
          x: uni.upx2px(width / 2 - 120),
          y: uni.upx2px(height - margin - 100),
          width: uni.upx2px(40),
          height: uni.upx2px(40),
        },
        // drawUserText: {
        //   text: _this.data.userName,
        //   x: uni.upx2px(margin+10),
        //   y: uni.upx2px(height - 70),
        // },
        drawUserCode: {
          text: "邀请码" + _this.code,
          x: uni.upx2px(width / 2 - 70),
          y: uni.upx2px(height - margin - 72),
        },
        fail(e) {
          console.error(e);
        },
        success(res) {
          console.log(res);
          // _this.cache[url] = res.TE;
          // #ifdef APP-PLUS || MP
          uni.saveFile({
            tempFilePath: res,
            success: function (res) {
              _this.cache[url] = res.savedFilePath;
              uni.setStorageSync("shareImage", _this.cache);
              console.log("---------", _this.cache);
            },
          });
          // #endif

          // #ifdef H5
          console.log(res);
          _this.cache[url] = res;
          // uni.setStorageSync("shareImage", _this.cache);
          //#endif
        },
      });
    },
    // 保存图片
    async save() {
      let url = this.cache[this.shareImageList[this.current]];

      // try {
      //   url = canvas.toDataURL("image/jpg");
      // } catch (error) {
      //   console.error(error);
      // }
      // var url = canvas.toDataURL('image/jpg');

      // const url = this.cache[this.shareImageList[this.current]];
      // console.log(url);
      // #ifndef H5
      uni.saveImageToPhotosAlbum({
        filePath: url,
        success(res) {
          uni.showToast({
            title: "保存成功",
          });
          _this.qrShow = false;
        },
      });
      // #endif
      // #ifdef H5
      const data = url.split(",");
      await FL.imageSave({
        data: data[1],
      });
      uni.showToast({
        title: "保存成功",
      });
      // #endif
      console.log(url);
    },
    share() {
      const url = this.cache[this.shareImageList[this.current]];
      // #ifndef H5
      if (!ghAppId) {
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 0,
          href: shareLink + this.code,
          title: shareOption.title,
          summary: shareOption.summary,
          imageUrl: url,
          success: function (res) {
            console.log("success:" + JSON.stringify(res));
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
          },
        });
      } else {
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 5,
          imageUrl: url,
          title: shareOption.title,
          miniProgram: {
            id: ghAppId,
            path: "/pages/index/index?id=" + this.code,
            type: 0,
            webUrl: shareLink + this.code,
          },
          success: (ret) => {
            // // console.log('成功：', JSON.stringify(ret));
            // let res = request({
            //   url: "/group/Task/GetShareGift",
            //   method: "POST",
            //   params: {},
            // });
            // console.log("res: ", res);
          },
        });
      }

      // #endif
      // #ifdef H5
      // FL.shareMiniProgram({
      //   imageUrl: "https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/base/share1.png",
      //   title: shareOption.title,
      //   path: "/pages/index/index?id=" + this.code,
      //   webUrl: shareLink + this.code,
      //   description: "",
      // });
      const data = url.split(",");
      FL.ShareImageToWeChat({
        imageUrl: data[1],
      });
      // #endif
    },
    currentChange(e) {
      this.current = e.detail.current;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/m-subpack/base/scss/main.scss";

.invit {
  background-color: #f5f5f5;
  min-height: 100vh;

  .shareBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40rpx;
    padding-bottom: 60rpx;

    view {
      text-align: center;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      font-size: 24rpx;
    }

    .weixin {
      font-size: 80rpx;
      color: rgb(70, 187, 54);
      margin-bottom: 10rpx;
    }

    .imgfile {
      color: rgb(252, 168, 0);
    }
  }

  .box {
    height: 228rpx;
    border-radius: 20rpx;
    margin: 20rpx 30rpx;
    padding: 10rpx 30rpx;
    position: relative;

    .box1 {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #fff;
      height: 70rpx;
      position: absolute;
      z-index: 11;

      .copy {
        width: 100rpx;
        height: 42rpx;
        background: #fff;
        border-radius: 5rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: $main-color;
        text-align: center;
        line-height: 42rpx;
        margin-left: 50rpx;
      }
    }

    .shareBg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 228rpx;
      border-radius: 20rpx;
    }
  }
}

.swiper {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  swiper {
    height: 934rpx;

    swiper-item {
      .item {
        background: #8f8f8f;
        width: 500rpx;
        height: 100%;
        transform: scale(0.8);
        transition: transform 0.5s ease-in, color 0.3s ease-out;
        canvas,
        image {
          width: 500rpx;
          height: 934rpx;
        }
      }

      .item.active {
        transform: scale(1);
      }
    }
  }
}
</style>
