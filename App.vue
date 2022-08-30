<script>
import {request, Login,isLogin} from '@/m-subpack/base';
// import { MethodChannel } from '@/js/flutter/flutter.js';
// import login from "pages/login/login.vue"

// let methodChannel;
// let methodChannelData;

// try {
// 	methodChannel = new MethodChannel('topMain');
// 	methodChannel.$on('flutterView', e => {
// 		console.log('flutterView', e);
// 		console.log('flutterView', methodChannelData);
// 		if (e.callbackId) {
// 			// callbackId存在说明，需要回调数据
// 			methodChannel.callback(e.callbackId, methodChannelData);
// 		} else {
// 			uni.showToast({
// 				title: JSON.stringify(e),
// 				icon: 'none'
// 			});
// 		}
// 	});
// } catch (e) {}

// uni.$on('flutterOpenPage', data => {
// 	methodChannelData = data;
// 	var flutter = uni.requireNativePlugin('sn-flutter');
// 	flutter.openPage({
// 		instanceId: 'topMain',
// 		id: 'main'
// 	});
// });

export default {

  data() {

  },


  beforeCreate() {
    // const domModule = uni.requireNativePlugin('typeface')
    // domModule.addRule('fontFace', {
    // 	'fontFamily': "myIconfont",
    // 	'src': "url('/typeface/static/Pacifico.ttf')"
    // });
  },

  onLaunch: function () {
    const locale = uni.getStorageSync('CURRENT_LANG') || 'en-US';
    this._i18n.locale = locale;
    uni.setStorageSync('isPassword', true);

    //当前时间 获取对比是不是 登录进入
    // let newTasp = new Date().getTime();
    // let timestamp = uni.getStorageSync('timestamp') ? uni.getStorageSync('timestamp') : new Date().getTime();
    // uni.setStorageSync('isTimestamp', newTasp - timestamp);

    //
    // let s = uni.$on('toPage', function (data) {
    //   console.log('监听', typeof data);
    //   return data;
    // });
    this.hideTabBar()

    if(!isLogin()){
      this.login();
    }



  },


  onShow: function () {
    this.hideTabBar()
    uni.$on('downstream_message', item => {
      uni.vibrateLong({
        success: function () {
          console.log('success');
          uni.hideToast();
        }
      });
    });
  },

  onHide: function () {
    console.log('App Hide');
  },
  methods: {
    async login() {
      try {
        const res = await request({
          url: `/uuid/${Date.now()}`,
          method: 'post'
        });
        const data = res.data;
        console.log('-----------------登录信息:', data);
        Login(data.token);
      } catch (e) {

      }
    },
    // 隐藏tabbar
    hideTabBar(){
      if (navigator.userAgent.includes('TelegramXAPP')) {
        uni.hideTabBar();
      }
    }
  }


};
</script>

<style lang="scss">
uni-modal .uni-modal__bd {
  white-space: pre-wrap;
  text-align: left;
}

uni-modal .uni-modal__bd {
  max-height: 600rpx;
}

page {
  background: #fff;
}

.text-right {
  text-align: right;
}

.fr {
  float: right;
}

.padding-main {
  padding: 20rpx 30rpx;
}

.font-mins {
  font-size: 20rpx;
}

.font-min {
  font-size: 22rpx;
}

.font-s {
  font-size: 24rpx;
}

.font-m {
  font-size: 26rpx;
}

.font-body {
  font-size: 28rpx;
}

.font30 {
  font-size: 30rpx;
}

.font-l {
  font-size: 32rpx;
}

.font-max {
  font-size: 34rpx;
}

.font-t {
  font-size: 30rpx;
}

.font-u {
  font-size: 36rpx;
}

.font-x {
  font-size: 40rpx;
}

.color-body {
  color: #333333;
}

.color-b {
  color: #b3b3b3;
}

.color-s {
  color: #666666;
}

.color-main {
  color: #999999;
}

.color-d {
  color: #e5bc90;
}

.color-c {
  color: #c97f2a;
}

.color-a {
  color: #808080;
}

.color-r {
  color: #ffffff;
}

.fc0 {
  color: rgba(0, 0, 0, 0.9);
}

.color-g {
  color: #25b75c;
}

.color-e {
  color: #f10e0e;
}

.color-f1 {
  color: #f1474f;
}

.color-3 {
  color: #30b481;
}

.color-0 {
  color: #2DA5E1;
}

.font-w {
  font-weight: bold;
}

.color-f {
  color: #fa7528;
}

.flex-j-a {
  display: flex;
  align-items: center;
  // justify-content: center;
}

.flex-j {
  display: flex;
  align-items: center;
  justify-content: center;
}

.f-w {
  font-weight: 800;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20rpx;
}

.flex-column {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

.flex-c-s {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.flex-center-column {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.flex-align {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-r {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-c {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.flex-col-a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.flex-r-a {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.flex-1 {
  flex: 1;
}

.toe-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toe-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.toe-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.exchangeDetail {
  background-color: #f5f5f5;

  view.u-indicator-item-number {
    margin-right: 30rpx;
  }

  view.swiper-item {
    height: 100%;
  }
}

.more {
  font-size: 22rpx;
  padding: 20rpx;
  text-align: center;
  color: #ccc;
}

.plr30 {
  padding: 0 30rpx;
}

.mlr30 {
  margin: 0 30rpx;
}

.ptb30 {
  padding: 30rpx 0;
}

.pb25 {
  padding-bottom: 25rpx;
}

.pb30 {
  padding-bottom: 30rpx;
}

.mt20 {
  margin-top: 20rpx;
}

.mtb20 {
  margin: 20rpx 0;
}

.mb10 {
  margin-bottom: 10rpx;
}

.mb40 {
  margin-bottom: 40rpx;
}

.line2 {
  width: 8rpx;
  height: 32rpx;
  background: linear-gradient(0deg, #0263ff, #17a7f8);
  border-radius: 4rpx;
}

uni-slider {
  margin: 30rpx 0 30rpx 30rpx;
}

uni-slider .uni-slider-handle-wrapper {
  height: 20rpx;
}

.align {
  position: relative;
  transform: translate(60rpx, 20rpx);
}
</style>
