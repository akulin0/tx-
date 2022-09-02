<!-- 钱包详情 -->
<template>
  <base-layout>
    <u-navbar v-if="!isTx()" :is-back="true" :title-width="500" :is-fixed="true" :title="title" :title-bold="true"
              style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
    <view class="content">
      <view class="box flex-align">
        <image :src="walletInfo.icon_url" mode="" class="img1"></image>
        <view class="whole">
          <view class="flex-align">
            <view class="font-m font-w">{{ walletInfo.name }}</view>
            <image src="/static/index/bianji.png" mode="" class="img2" @click="showCheck(0)"></image>
          </view>
          <view class="flex-align">
            <view class="font-s color-main">
              {{ walletInfo.address.substring(0, 6) }}***{{ walletInfo.address.substring(30) }}
            </view>
            <image src="/static/index/copy.png" mode="" class="img3" @click="copy(walletInfo.address)">
            </image>
          </view>
        </view>
      </view>
      <!-- list导出方式： -->
      <view style="margin-top: 24rpx;">
        <view class="list flex-j-a font-t" @click="showCheck(2)">
          <view>{{ $t('ibinz.msg17', ['导出助记词']) }}</view>
          <image src="/static/my/more.png" mode=""></image>
        </view>
        <view class="list flex-j-a font-t" @click="showCheck(1)">
          <view>{{ $t('ibinz.msg18', ['导出私钥']) }}</view>
          <image src="/static/my/more.png" mode=""></image>
        </view>
        <view class="list flex-j-a font-t" @click="showCheck(3)">
          <view>{{ $t('ibinz.msg19', ['导出Keystore']) }}</view>
          <image src="/static/my/more.png" mode=""></image>
        </view>
        <!--        <view class="list flex-j-a font-t" @click="toPage('/pages/my/setting/passEdit?type=1')">-->
        <!--          <view>{{ $t('ibinz.msg20', ['修改密码']) }}</view>-->
        <!--          <image src="/static/my/more.png" mode=""></image>-->
        <!--        </view>-->
        <!--        <view class="list flex-j-a font-t" @click="toPage('/pages/wallet/resetPass')">-->
        <!--          <view>{{ $t('ibinz.msg21', ['重置密码']) }}</view>-->
        <!--          <image src="/static/my/more.png" mode=""></image>-->
        <!--        </view>-->

      </view>
<!--      <view class="btn flex-center color-r font-l" @click="showCheck(4)">{{ $t('ibinz.msg22', ['删除钱包']) }}</view>-->
      <!--导出助记词 私钥 key弹框 -->
      <u-modal v-model="show" :show-cancel-button="true" :title="title" @confirm="sure">
        <view class="slot-content slot">
          <!--更换钱包名输入框 -->
          <input type="text" value="" v-model="walletName" v-if="state==1" maxlength="12"/>
          <!-- 验证密码 输入框-->
          <view v-else>
            <input type="text" value="" password v-model="password"/>
            <view class="font-m color-s" style="margin-top: 24rpx;" @click="toPass()">
              {{ $t('ibinz.msg23', ['忘记密码']) }}
            </view>
          </view>

        </view>
      </u-modal>
      <!-- 私钥弹框 -->
      <u-popup v-model="show1" mode="center" border-radius="20" :closeable="true">
        <view style="padding: 40rpx 30rpx; width: 616rpx;">
          <view style="text-align: center;" class="font-max">{{ $t('ibinz.msg18', ['导出私钥']) }}</view>
          <!-- 铭文 -->
          <view class="pop-box" v-show="type1==0">
            <textarea :disabled="true" v-model="keyContent" style="height: 150rpx;" class="font-s"/>
            <view class="font-s title" @click="copy(keyContent)">{{ $t('ibinz.msg24', ['导出私钥']) }}</view>
          </view>
          <!-- 二维码 -->
          <view v-show="type1==1" class="canvas">
            <canvas canvas-id="qrcode" style="width: 360rpx;height: 360rpx;"/>
          </view>
          <view class="btn-code font-l color-r flex-center" @click="changes">
            {{ text }}
          </view>
        </view>
      </u-popup>
    </view>
  </base-layout>
</template>

<script>
import uQRCode from '@/m-subpack/base/libs/uqrcode.js';
import {request} from '@/m-subpack/base';
import {clearWallet} from '@/decorator/wallet';
import {
  editWallet,
  getCurrentWallet,
  getWalletInfo,
  getWalletKeystore,
  getWalletMnemonic,
  getWalletPrivateKey
} from '../../libs/wallet';
import {toPage} from '../../libs/utils';

export default {
  data() {
    return {
      //钱包icon: category 1、比特币；2、以太坊；3、波场；4、Telegram X
      imgList: [{
        img: '/static/my/top2.png',
        category: 1
      }, {
        img: '/static/my/top3.png',
        category: 2
      }, {
        img: '/static/my/top6.png',
        category: 3
      }, {
        img: '/static/biticon/dolami.png',
        category: 4
      }],
      type: '',
      show: false, //导出弹框
      title: this.$t('ibinz.msg15', ['钱包详情']),
      state: '', //1 更换钱包输入框
      walletName: '', //钱包名
      index: '',
      show1: false, //私钥弹框
      text: this.$t('ibinz.msg16', ['二维码']),
      type1: 0, //导出私钥-0明文 1二维码
      keyContent: '', //私钥内容
      password: '', //验证密码
      //钱包详情
      walletInfo: {
        address: '',
      },
      icon: '', //当前钱包图标
      category: '', //钱包种类 category 1、比特币；2、以太坊；3、波场；4、Telegram X
      mode: '', //弹框-确认 1、私钥；2、助记词；3、keystore
      walletId: '', //钱包id

      chainName: ''
    };
  },
  components: {},
  onLoad(opt) {
    console.log(opt);
    this.walletName = opt.name || getCurrentWallet().name;
    this.chainName = opt.chainName || getCurrentWallet().category_name;
    this.walletInfo.address = opt.address ||  getCurrentWallet().address;
    this.category = opt.category;

    this.keyContent = '';
    if (this.keyContent) {
      this.show1 = true;
    }
    // this.walletId = opt.id
    // console.log("钱包id", this.walletId);
  },
  onShow() {
    this.walletDetail();
  },
  onPullDownRefresh() {

  },
  methods: {
    // category 1、 比特币； 2、 以太坊； 3、 波场； 4、 Telegram X
    // 获取钱包的详情
    async walletDetail() {
      // let currentWallet = uni.getStorageSync('currentWallet');

      // console.log('当前选中的钱包', currentWallet);

      // let {
      // 	data,
      // } = await request({
      // 	url: '/wallet-get',
      // 	method: 'get',
      // 	params: {
      // 		id: this.walletId,
      // 	}
      // })
      this.walletInfo = await getWalletInfo(this.chainName, this.walletInfo.address);
      // console.log(" 钱包详情", this.walletInfo);
      // this.category = data.category
      // this.imgList.map(item => {
      // 	if (this.category == item.category)
      // 		this.icon = item.img
      // })
      // if (this.walletId == currentWallet.id) {
      // 	currentWallet.name = this.walletInfo.name
      // 	console.log('bbbbb', currentWallet);

      // }

    },
    // 复制
    copy(data) {
      var _this = this;
      uni.setClipboardData({
        data: data,
        success: function () {
          uni.showToast({
            title: _this.$t('ibinz.msg26', ['已复制']),
            duration: 1000
          });
        }
      });
    },
    // 私钥 ：0铭文、1二维码切换
    changes() {
      this.type1 = !this.type1;
      if (this.type1 == 0) {
        this.text = this.$t('ibinz.msg16', ['二维码']);
      } else {
        this.text = this.$t('ibinz.msg25', ['明文']);
        this.make(this.keyContent);
      }
    },
    del() {
      this.title = this.$t('home.txt54', ['验证密码']);
      this.show = true;
      this.state = '';
    },
    toPass() {
      uni.navigateTo({
        url: '/pages/wallet/resetPass'
      });
    },
    //修改密码-重置密码

    //导出弹框  mode : 0:更改钱包名 1私钥  2助记词 3keyStore 4 删除钱包
    showCheck(mode) {
      this.password = '';
      this.keyContent = '';
      this.walletName = '';

      this.mode = mode;
      if (mode == 0) {
        this.show = true;
        this.title = this.$t('wallet.msg12', ['更换钱包名']);
        this.state = 1;
      } else {
        this.title = this.$t('home.txt54', ['验证密码']);
        this.state = '';
        this.sure();
      }

    },
    // 导出弹框-确定按钮
    sure() {
      this.toExport();
    },
    // 确定导出  mode：0 更换钱包名 1、私钥；2、助记词；3、keystore 4删除钱包
    async toExport() {
      uni.removeStorageSync('googleCode');
      // console.log("确认类型", this.mode);
      if (this.mode == 0 || this.mode == 4) {
        this.editWallet();
      } else {
        try {
          // let {
          //   data,
          //   errorMessage
          // } = await request({
          //   url: '/wallet-export',
          //   method: 'POST',
          //   data: {
          //     'id': this.walletInfo.id,
          //     'mode': this.mode,
          //     'password': this.password
          //   }
          // });
          // 1、私钥
          if (this.mode == 1) {

            const key = await getWalletPrivateKey(this.chainName, this.walletInfo.address);

            this.show = false;
            this.keyContent = key;
            this.show1 = true;
            this.keyContent = key;
          } else if (this.mode == 2) { // 助记词
            const data = await getWalletMnemonic(this.chainName, this.walletInfo.address);
            if (!data) {
              return uni.showToast({
                title: '错误，不存在助记词',
                icon: 'none'
              });
            }
            uni.setStorageSync('mnemonics', data);
            uni.setStorageSync('mnemonicsType', 2);
            toPage('/pages/index/copypass');

          } else if (this.mode == 3) {
            const data = await getWalletKeystore(this.chainName, this.walletInfo.address);
            if (!data) {
              return uni.showToast({
                title: '错误，不存在keystore',
                icon: 'none'
              });
            }
            uni.setStorageSync('keystore', data);
            toPage('/pages/wallet/exportKey');
          }
        } catch (e) {
          // uni.showToast({
          // 	title: e.errorMessage,
          // 	icon: "none"
          // })
        }
      }
    },
    // 删除钱包  修改钱包名 mode：0 更换钱包名 1、私钥；2、助记词；3、keystore 4删除钱包
    // tyep: 0为修改 1 为删除，
    async editWallet() {
      let query = {};
      if (this.mode == 0) {
        query = {
          'password': '',
          'name': this.walletName,
          'type': 0,
          'walletID': this.walletInfo.id
        };
      } else if (this.mode == 4) {
        query = {
          'password': this.password,
          'type': 1,
          'walletID': this.walletInfo.id
        };
      }
      // let {
      // 	data,
      // 	errorMessage
      // } = await request({
      // 	url: '/walletupdateWalletName',
      // 	method: 'POST',
      // 	data: query
      // })
      await editWallet(this.chainName, this.walletInfo.address, {name: query.name});
      // debugger
      clearWallet();
      if (this.mode == 0) {
        this.walletDetail();
        this.show = false;
        uni.showToast({
          title: this.$tc('ibinz.msg36', '操作成功'),
          duration: 1000
        });
        // uni.reLaunch({
        //   url: '/pages/index/index'
        // });
      } else if (this.mode == 4) {

        // uni.removeStorageSync("currentWallet")
        uni.showToast({
          title: this.$tc('ibinz.msg36', '操作成功'),
          duration: 1000
        });
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/index/index'
          });
        }, 2000);
      }

    },
    async make(key) {
      //二维码距离底部和右侧距离 还有内部间距
      const margin = 0;
      uQRCode.make({
        canvasId: 'qrcode',
        componentInstance: this,
        text: `${key}`,
        size: 180,
        margin: margin,
        backgroundColor: 'rgba(255,255,255,0)',
        foregroundColor: '#000000',
        fileType: 'png',
        // errorCorrectLevel: uQRCode.errorCorrectLevel.H,
        success: res => {
          console.log(res);
        }
      });
    },
    bindTextAreaBlur: function (e) {
      console.log(e.detail.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 40rpx 30rpx 0;

  .box {
    padding: 35rpx 30rpx;
    box-shadow: 0px 1rpx 16rpx 0px rgba(36, 56, 211, 0.12);
    border-radius: 20rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    .img1 {
      width: 80rpx;
      height: 80rpx;
      margin-right: 16rpx;
    }

    .img2 {
      width: 22rpx;
      height: 22rpx;
      margin-left: 23rpx;
    }

    .img3 {
      width: 24rpx;
      height: 25rpx;
      margin-left: 24rpx;
    }
  }

  .list {
    padding: 36rpx 0;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: space-between;

    image {
      width: 14rpx;
      height: 24rpx;
    }
  }

  .btn {
    width: 100%;
    height: 88rpx;
    margin: auto;
    box-sizing: border-box;
    margin-top: 150rpx;
    border-radius: 44rpx;

    background: #2DA5E1;
    box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
  }

  .slot {
    padding: 40rpx 30rpx 33rpx;
    border-bottom: 1px solid #E5E5E5;

    input {
      height: 88rpx;
      background-color: #F5F5F5;
      border-radius: 10rpx;
      padding: 0 20rpx;
    }
  }

  .pop-box {
    background-color: #F5F5F5;
    border-radius: 10rpx;
    margin: 40rpx 0rpx;
    padding-bottom: 19rpx;

    textarea {
      padding: 29rpx 34rpx 10rpx 21rpx;
      box-sizing: border-box;
    }

    .title {
      text-align: right;
      margin-right: 21rpx;
    }
  }

  .canvas {
    margin: 41rpx auto 49rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .btn-code {
    width: 90%;
    height: 88rpx;

    background: #2DA5E1;
    box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
    border-radius: 44rpx;
    margin: auto;
  }

  .whole {
    display: flex;
    flex-direction: column;
  }
}
</style>
