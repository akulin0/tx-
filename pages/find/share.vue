<template>
  <base-layout>
    <view class="navbar">
      <u-icon
        name="arrow-left"
        class="icon"
        color="#606266"
        size="44"
        @click="goBack()"
      ></u-icon>
      <view class="title">{{ $t("find.msg20", ["分享"]) }}</view>
    </view>
    <view id="dom">
      <view class="top"> </view>
      <view class="main">
        <view class="font-w font-max title" style="margin-bottom: 60rpx">{{
          info.title
        }}</view>
        <view class="font-s color-main" style="margin-bottom: 44rpx">{{
          info.create_time
        }}</view>
        <view>
          {{ info.content }}
        </view>
        <image src="/static/find/new2.png" mode="" class="news"></image>
      </view>
    </view>
    <!-- <canvas
      id="share"
      canvas-id="share"
      style="width: 750px; height: 1600px; position: fixed; z-index: -1"
    /> -->

    <!-- 底部按钮 -->
    <view style="height: 190rpx">
      <view class="bottom">
        <!-- 	<view class="flex-column">
					<image src="/static/find/weixin.png" mode=""></image>
					<view class="font-min color-s">{{$t('find.msg21',['微信好友'])}}</view>
				</view>
				<view class="flex-column">
					<image src="/static/find/friend.png" mode=""></image>
					<view class="font-min color-s">{{$t('find.msg22',['朋友圈'])}}</view>
				</view> -->
        <view class="flex-column" @click="save()">
          <image src="/static/find/local.png" mode=""></image>
          <view class="font-min color-s">{{
            $t("find.msg23", ["保存本地"])
          }}</view>
        </view>
      </view>
    </view>
  </base-layout>
</template>

<script>
import { infoRequest } from "@/m-subpack/base";
import uQRCode from "@/m-subpack/base/libs/uqrcode.js";
// import html2canvas from "html2canvas";
export default {
  data() {
    return {
      info: {},
      // navTitle: this.$t('find.msg20', ['分享']),
      code: "",
      imageShare: "",
    };
  },
  onLoad(option) {
    console.log("快讯", JSON.parse(decodeURIComponent(option.item)));
    this.info = JSON.parse(option.item);
  },
  created() {
    // this.uQRCode();
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    // 生成二维码
    // async make() {
    // 	const size = 320;
    // 	//二维码距离底部和右侧距离 还有内部间距
    // 	const margin = 0;
    // 	uQRCode.make({
    // 		canvasId: 'qrcode',
    // 		componentInstance: this,
    // 		text: 'uQRCode',
    // 		size: uni.upx2px(size - margin),
    // 		margin: margin,
    // 		backgroundColor: 'rgba(255,255,255,0)',
    // 		foregroundColor: '#000000',
    // 		fileType: 'png',
    // 		// errorCorrectLevel: uQRCode.errorCorrectLevel.H,
    // 		success: res => {
    // 			console.log(res)
    // 		}
    // 	})
    // },
    // uQRCode() {
    // 	uni.showToast({
    // 		icon: "none",
    // 		title: "图片生成中"
    // 	})
    // 	const _this = this;
    // 	//邀请链接
    // 	const shareLink = "http://dm.cdridge.com/#/?id=";
    // 	const size = 380;
    // 	const margin = 20;
    // 	const width = 750;
    // 	const height = 1600;
    // 	uQRCode.make({
    // 		canvasId: 'share',
    // 		componentInstance: _this,
    // 		text: shareLink + _this.code,
    // 		size: size,
    // 		margin: 0,
    // 		backgroundColor: "#ffffff",
    // 		foregroundColor: "#000000",
    // 		fileType: "jpg",
    // 		x: 184,
    // 		y: height - size - margin * 1.2 - 512,
    // 		drawQRBefore(ctx) {
    // 			//绘制背景图
    // 			ctx.drawImage("/static/share.png", 0, 0, width, height);
    // 			//绘制邀请码
    // 			ctx.font = 'normal 400 50px sans-serif';
    // 			ctx.setFillStyle('#F56E45')
    // 			ctx.fillText(_this.code, 276, 490);
    // 		},
    // 		drawQREnd(ctx) {

    // 		},
    // 		fail(e) {

    // 		},
    // 		success(res) {
    // 			_this.imageShare = res;
    // 			uni.hideLoading()

    // 		},
    // 	});
    // },
    save() {
      var w = plus.webview.create(
        "/static/share.html",
        "id",
        {},
        {
          hid: 179952,
          status: 0,
          create_time: "2021-06-11 04:24:04",
          update_time: "2021-06-11 04:24:04",
          title: "加密支付平台 Wirex 添加支持 UMA 等六种代币",
          content:
            "链闻消息，加密支付平台 Wirex 添加支持 UMA、OMG、BAT、ZRX、SNX 和 FTT。",
          content_md5: "440241f9dd4ce00fb8b0e45104ff08ae",
          source: "链闻",
          img_url: "",
          news_type_id: "0.0",
          news_level: "0.0",
          tag_title: "快讯",
          tag_bg_color: "0xD2E8FF",
          tag_color: "0x2890FE",
          top_icon: "https://tp-statics.cdn.bcebos.com/news/News-1.png",
          bottom_icon: "https://tp-statics.cdn.bcebos.com/news/News-3.png",
          app_id: "-1.0",
          application: null,
          lang: "zh-Hans",
          news_type: ["{hid=0.0, title=快讯, desc=普通快讯, lang=zh-Hans}"],
          date: "2021-06-11",
          time: "04:24:04",
          bgColor: "D2E8FF",
          textColor: "2890FE",
        }
      );
      w.show();

      //   var pages = getCurrentPages(); //获取当前页面信息
      //   var page = pages[pages.length - 1];
      //   var bitmap = null;
      //   var currentWebview = page.$getAppWebview();
      //   bitmap = new plus.nativeObj.Bitmap("amway_img");
      //   // 将webview内容绘制到Bitmap对象中
      //   currentWebview.draw(
      //     bitmap,
      //     function () {
      //       // console.log('截屏绘制图片成功');
      //       //这里我将文件名用四位随机数拼接了，不然会出现当前图片替换上一张图片只能保存一张图片的问题
      //       let rand = Math.floor(Math.random() * 10000);
      //       let saveUrl = "_doc/" + rand + "a.jpg";
      //       bitmap.save(
      //         saveUrl,
      //         {},
      //         function (i) {
      //           // console.log('保存图片成功：' + JSON.stringify(i));
      //           uni.saveImageToPhotosAlbum({
      //             filePath: i.target,
      //             success: function () {
      //               // bitmap.clear(); //销毁Bitmap图片
      //               uni.showToast({
      //                 title: "保存图片成功",
      //                 mask: false,
      //                 duration: 1500,
      //               });
      //             },
      //           });
      //         },
      //         function (e) {
      //           console.log("保存图片失败：" + JSON.stringify(e));
      //         }
      //       );
      //     },
      //     function (e) {
      //       console.log("截屏绘制图片失败：" + JSON.stringify(e));
      //     }
      //   );
      //currentWebview.append(amway_bit);
    },

    // // 保存图片
    // saveImage() {
    // 	let _this = this
    // 	// #ifndef H5
    // 	uni.saveImageToPhotosAlbum({
    // 		filePath: this.imageShare,
    // 		success(res) {
    // 			uni.showToast({
    // 				title: "保存成功",
    // 			});
    // 			// _this.qrShow = false
    // 		}
    // 	})
    // 	// // #endif
    // 	// // #ifdef H5
    // 	// _app.showToast('保存了');
    // 	// _this.qrShow = false
    // 	// // #endif
    // },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  background-image: url(/static/find/new1.png);
  height: 400rpx;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}

.navbar {
  height: 80rpx;
  position: absolute;
  top: var(--status-bar-height);
  right: 0;
  left: 0;
  text-align: center;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    position: absolute;
    left: 0;
  }
}

.main {
  color: #333333;
  font-size: 28rpx;
  padding: 0rpx 30rpx 0rpx 30rpx;
  // margin-bottom: 190rpx;

  .news {
    width: 100%;
    height: 300rpx;
  }
}

.bottom {
  height: 190rpx;
  background-color: #f5f5f5;
  position: fixed;
  z-index: 999;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 50rpx;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  image {
    width: 96rpx;
    height: 96rpx;
    margin-bottom: 15rpx;
  }
}
</style>
