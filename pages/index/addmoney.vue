<!-- 我的页面 -->
<template>
  <base-layout>
    <view>
      <u-navbar :is-back="true" :title="titles" :title-bold="true">
      </u-navbar>
      <view style="padding: 0 30rpx;">
        <view class="input-item">
          <view class="commonfont">{{ $t('home.txt30', ['钱包名称']) }} ({{ 'Telegram Pocket' }})</view>
          <input type="text" :placeholder="searchText" placeholder-style="color:#B3B3B3;font-size:28rpx;"
                 class="bgcol"/>

          <!-- 输入框里的默认值 -->
          <!-- <input type="text" :placeholder="searchText" placeholder-style="color:#B3B3B3;font-size:28rpx"
            class="bgcol" v-model="data.name" /> -->
        </view>
        <view class="input-item" style="height: 246rpx;position: relative;">
          <!-- 密码强度 -->
          <view class="passType flex-align" v-if="data.pass">
            <view class="type">{{ showpassType }}</view>
            <u-line-progress class="linetype" :percent="percents" height="14" :show-percent='false'
                             :round="true" :active-color="activecolor"></u-line-progress>
          </view>
          <view class="commonfont">{{ $t('home.txt32', ['设置密码']) }}</view>
          <input type="password" style="height: 68rpx;margin-top: 32rpx;" maxlength="20" @input="changepass"
                 placeholder="请输入密码，至少8位" placeholder-style="color:#B3B3B3;font-size:26rpx" class="i-items"
                 v-model="data.pass"/>
          <input type="password" style="height: 68rpx;margin-top: 32rpx;" maxlength="20"
                 :placeholder="searchText2" placeholder-style="color:#B3B3B3;font-size:26rpx" class="i-items"
                 v-model="data.repass"/>
        </view>
        <view class="input-item">
          <view class="commonfont">{{ $t('home.txt36', ['提示信息']) }}</view>
          <input type="text" :placeholder="'请输入提示信息（可不填）'" placeholder-style="color:#B3B3B3;font-size:26rpx"
                 class="i-items" v-model="data.demo"/>
        </view>
        <!-- <base-button v-if="select" ref="button" class="nosubmit" @submit="submit()" :title="btnText" /> -->
        <base-button v-if="select" ref="button" class="nosubmit" @submit="submit()" :title="btnText"/>
        <button v-else class="nosubmit">
          <view class="tex">{{ $t('home.txt22', ['创建钱包']) }}</view>
        </button>

        <view class="flex-r lef" style="height: 80rpx;margin: 100rpx 0;font-size: 26rpx;">
          <image v-if="select" @click="select=false" style="width: 36rpx;height: 36rpx;min-width: 36rpx;"
                 src="/static/biticon/select.png" mode=""></image>
          <image v-else @click="select=true" src="/static/biticon/noselect.png"
                 style="width: 36rpx;height: 36rpx;min-width: 36rpx;" mode=""></image>
          <view style="margin-left: 10rpx;">
            <span>{{ $t('home.txt37', ['我已仔细阅读并同意']) }}</span>
            <span class="font-co" @click="topage('/pages/agreement?type=1')">{{ $t('home.txt38', ['服务条列']) }}</span>
            {{ $t('home.txt39', ['及']) }}
            <span class="font-co" @click="topage('/pages/agreement?type=2')">{{ $t('home.txt40', ['隐私条款']) }}</span>
          </view>


        </view>
      </view>

    </view>
  </base-layout>
</template>

<script>
import {request} from '@/m-subpack/base';
import {createWallet, saveWallet} from '../../libs/wallet';

import Md5 from '@/components/md5.js';
import {clearWallet} from '@/decorator/wallet';

var tip = null;
export default {
  data() {
    return {
      select: false,
      // searchText: this.$t('home.txt31', ['请输入钱包名称']),
      searchText2: this.$t('home.txt33', ['请再次输入密码']),
      // searchText3: this.$t('ibinz.msg32', ['请输入密码，至少8位']),
      // searchText4: this.$t('home.txt35', ['请输入提示信息（可不填）']),
      btnText: this.$t('home.txt22', ['创建钱包']),
      title: '', //钱包类型
      titles: this.$t('home.txt22', ['创建钱包']),
      activecolor: '',
      showpassType: this.$t('home.txt113', ['弱']),
      percents: 0,
      category: '',
      name: '', //钱包名称
      data: {
        pass: '',
        name: '',
        repass: '',
        demo: ''
      }
    };
  },

  onLoad(o) {
    console.log('创建钱包参数', o);

    //category 1、比特币；2、以太坊；3、波场；4、Telegram X
    this.title = o.title;
    this.category = o.category;
    this.name = o.name;
    this.getWalletList();

  },
  methods: {
    //钱包列表
    async getWalletList() {
      let {
        data,
        errorMessage
      } = await request({
        url: '/wallet-get-all-wallet-list',
        method: 'get',
        params: {
          'category': this.category,
        }
      });
      tip = (data.length + 1);
      this.data.name = this.name + '-' + tip;
    },
    // 密码强度
    changepass(e) {
      let val = e.detail.value;
      let lv = 0;
      if (/\d/.test(val)) {
        lv++;
      }
      if (/[a-z]/.test(val)) {
        lv++;
      }
      if (/[A-Z]/.test(val)) {
        lv++;
      }
      if (/\W/.test(val)) {
        lv++;
      }
      switch (lv) {
        case 1:
          this.showpassType = this.$t('home.txt113', ['弱']);
          this.activecolor = '#fa3534';
          this.percents = 33;
          break;
        case 2:
          this.showpassType = this.$t('home.txt113', ['弱']);
          this.activecolor = '#fa3534';
          this.percents = 33;
          break;
        case 3:
          this.showpassType = this.$t('login.msg19', ['中']);
          this.activecolor = '#ff9900';
          this.percents = 66;
          break;
        case 4:
          this.showpassType = this.$t('login.msg20', ['强']);
          this.activecolor = '#19be6b';
          this.percents = 100;
          break;
      }
    },
    //创建钱包
    async submit() {
      try {
        if (this.data.pass != this.data.repass) {
          uni.showToast({
            title: this.$t('home.txt125', ['密码不一致']),
            duration: 1000,
            icon: 'none'
          });
          this.$refs.button.hideLoading();

        } else if (this.data.pass.length < 8 || this.data.repass.length < 8) {
          uni.showToast({
            title: this.$t('ibinz.msg32', ['请输入密码，至少8位']),
            duration: 1000,
            icon: 'none'
          });
          this.$refs.button.hideLoading();
        } else {
          // 创建
          const data = await createWallet(this.data.pass);
          // 保存
          await saveWallet(Object.assign({
            name: this.data.name,
            chainName: this.name,
            remark: this.data.demo,
            pwd: this.data.pass
          }, data));



          // let {
          // 	data,
          // 	errorMessage
          // } = await request({
          // 	url: '/wallet-create',
          // 	method: 'post',
          // 	data: {
          // 		"alert": this.data.demo,
          // 		"category": this.category,
          // 		"name": this.data.name,
          // 		"password": this.data.pass,
          // 		"rpassword":this.data.repass,
          // 		"type": 1
          // 	}
          // })
          // clearWallet();
          uni.showToast({
            title: this.$t('ibinz.msg36', ['操作成功']),
            duration: 1000
          });

          setTimeout(() => {
            this.$refs.button.hideLoading();

            this.toPage('/pages/my/wallet')
          }, 2000);

        }

      } catch (e) {
        this.$refs.button.hideLoading();
      }

    },
    topage(url) {
      this.toPage(url);

    },
  }
};
</script>

<style lang="scss" scoped>
.passbox {
  width: 590rpx;
  height: 560rpx;
  background: #FFFFFF;
  padding: 40rpx;

  .passbox-title {
    width: 100%;
    text-align: center;
    font-size: 34rpx;
    font-weight: 500;
    color: #333333;
  }
}

.nosubmit {
  width: 599.1rpx;
  height: 110rpx !important;

  background: #3A83F7 !important;
  // box-shadow: 0px 2px 10px 0px rgba(23, 119, 226, 0.4);
  // opacity: 0.5;
  border-radius: 30rpx !important;
  font-size: 30rpx !important;
  line-height: 96rpx !important;
  color: #fff;
  position: relative;
  transform: translate(-20px, 30px);
}

.passType {
  position: absolute;
  right: 30rpx;
  font-size: 12rpx;

  .type {
    font-size: 16rpx;
    margin-right: 10rpx;
  }

  .linetype {
    width: 100rpx;
  }
}

.input-item {
  height: 178rpx;

  .i-items {
    height: 68rpx;
    border-bottom: 1px solid #E6E6E6;

  }
}

.font-co {
  color: #2DA5E1;
  margin: 0 10rpx;
}

.commonfont {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
  margin: 30rpx 0;
}

.tip {
  font-size: 28rpx;
  font-weight: 500;
  color: #333333;
  text-align: right;
}

.tex {
  top: 8rpx;
  position: relative;
}

.bgcol {
  -webkit-box-shadow: 0 0 0 1000px #F4F4F4 inset;
  border-radius: 20rpx;
  width: 660rpx;
  height: 80rpx;
  border-bottom: 1px solid #E6E6E6;
  left: 30rpx;
  padding: 20rpx;
}

.lef {
  left: 20rpx;
  position: relative;
}


</style>
