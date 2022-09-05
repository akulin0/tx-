<template>
  <view class="wallet-content" @click="(!showOther && !addcreate) ? clickCancel() : close()">
    <u-popup v-model="show" mode="bottom" border-radius="30" :closeable="false" :mask-close-able='false'>
      <!-- 标题栏 -->
      <view class="subHeader">
        <view class="title" @click="goTo('/pages/my/wallet')" style="display: flex;justify-content: center; height: 107rpx; align-items: center;">{{
            $t('home.txt19', ['钱包列表'])
          }}
        </view>
      <view class="topIcon" style="text-align: center;">
<!--        <view class="icon"></view>-->
          <!--            <image src="/static/wangluo.png" class="icon"></image>-->
        </view>
        <view class="moneyList" v-if="showOther">
          <!-- <view class="m-header flexs"> -->
          <!-- 	<view class="commonfont" @click="goTo('/pages/my/wallet')">{{
                    $t("home.txt18", ["管理钱包"])
                  }}</view> -->
          <!-- <view class="m-title" style="text-align: center;">{{
                    $t("home.txt19", ["钱包列表"])
                  }}</view> -->
          <!-- <view @click="close" style="width: 60rpx;text-align: right;">
              <u-icon name="close" style="" size="32"></u-icon>
            </view> -->
          <!-- </view> -->
          <!-- 		<view class="m-nav flexs">
            <view v-for="(item,index) in bitlist" :key="index" >
              <image :src="`/static/biticon/category/${item.name}.png`"  v-if="currentCategory==item.category" mode=""></image>
              <image :src="`/static/biticon/category/${item.name}_.png`"  v-else @click="changeSelect(item,index) " mode=""></image>
            </view>
          </view>
          <view class="m-titles flexs">
            <view class="titlesub">{{currentText}}</view>
            <view class="commonfont" @click="showOther=false">{{
                    $t("home.txt20", ["添加钱包"])
                  }}</view>
          </view> -->
          <!-- 图标导航栏 -->
          <view class="iconNav">
            <view class="nav-item" v-for="(item,index) in bitlist" :key="index">
              <image :src="item.icon_select" v-if="currentCategory==item.category" mode="" style="height: 60rpx; width: 60rpx;"></image>
              <image :src="item.icon_un_select" v-else @click="changeSelect(item, index)" mode="" style="height: 60rpx; width: 60rpx;"></image>

            </view>
          </view>

          <view class="listBox">
           <!-- 币安链标题 -->
            <view class="subTitle">
              <view class="titlesub">{{chin}}</view>
              <view class="commonfont text-right flex-1" @click="getClassify(false)">
                <image src="/static/index/add.png" class="icon-add" mode=""></image>
              </view>
            </view>
            <template v-if="walletList.length">
              <view class="item" ref="class" v-for="(item,index) in walletList" :key="index"
                    @click="selectMoney(item,index)" :class="{'active':item.selected==true}">
                <view class="content">
                  <view class="title">
                    <view>
                      <text class="color-f8"
                            v-if="currentText == 'DLMU' && index == 0">{{ $t('home.txt148', ['初始']) }}
                      </text>
                      {{ item.name }}
                    </view>
<!--                    <view class="dot"></view>-->
                    <image v-if="item.selected==true" src="/static/index/dot.png" class="dot"></image>
                  </view>
                  <view class="adr">
                    <text>{{ item.addressx }}</text>
                    <view class="copyBtn" @click="copy(item.address)">复制</view>
                  </view>
                </view>
              </view>
            </template>
          </view>

        </view>
      </view>
      <view class="addcreate" v-if="addcreate" style="padding: 30rpx 30rpx;">
        <view class="input-item">
          <view class="commonfont">{{ $t('home.txt30', ['设置钱包名称']) }}</view>
          <input type="text" :placeholder="searchText" @input="changename"
                 placeholder-style="color:#B3B3B3;font-size:28rpx" class="i-items" v-model="data.name"/>
          <view class="hint-box">{{ hintname }}</view>
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
                 :placeholder="searchText3" placeholder-style="color:#B3B3B3;font-size:26rpx" class="i-items"
                 v-model="data.pass"/>
          <input type="password" style="height: 68rpx;margin-top: 32rpx;" maxlength="20" @input="changerepass"
                 :placeholder="searchText2" placeholder-style="color:#B3B3B3;font-size:26rpx" class="i-items"
                 v-model="data.repass"/>

        </view>
        <view class="red">{{ hintpwd }}</view>
        <view class="hint-box">{{ $t('home.txt142') }}</view>

        <button class="nosubmit" @click="getsubmit()"> {{ $t('home.txt22', ['创建钱包']) }}</button>
        <button class="nosubmit bg-f5" style="font-size: 30rpx;" @click="clickCancel">{{
            $t('home.txt24', ['取消'])
          }}
        </button>
      </view>
      <view class="otherMoney" v-if="!showOther && !addcreate">
        <view class="commonfont" v-if="!isClassify" style="font-size: 30rpx;border-bottom: 1rpx solid #E6E6E6;"
              @click="getSubmit('/pages/index/addcreate?type=1')">{{
            $t('home.txt22', ['创建钱包'])
          }}
        </view>
        <view class="commonfont" v-if="!isClassify" style="font-size: 30rpx;border-bottom: 8rpx solid #E6E6E6;"
              @click="goTo('/pages/index/addcreate?type=2')">{{
            $t('home.txt23', ['导入钱包'])
          }}
        </view>
        <view class="commonfont" v-if="isClassify" style="font-size: 30rpx;border-bottom: 1rpx solid #E6E6E6;"
              @click="goTo('/pages/index/network-list')">{{
            $t('home.txt143', ['网络管理'])
          }}
        </view>
        <!-- 				<view class="commonfont" style="font-size: 30rpx;" @click="clickCancel">{{
                  $t("home.txt24", ["取消"])
                }}</view> -->
      </view>
    </u-popup>
  </view>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {request} from '@/m-subpack/base';
import {Assets} from '@/decorator/wallet';
import {createWallet, getWalletList, saveWallet, saveCurrentWallet, getCurrentWallet} from '../libs/wallet.js';
import Image from "@/m-common/common/components/image.vue";
@Component({
  components: {Image}
})
@Assets()
export default class Wellet extends Vue {

  @Prop()


  @Prop
  type;
  addcreate = false;
  show = false;
  showOther = true;
  isClassify = false;
  cont_dot = false;
  currentCategory = 0;
  percents = 0;
  currentText = '';
  bitlist = [];
  walletAll = [];
  walletList = [];
  searchText = '';
  btnText: '';
  searchText2 = '';
  searchText3 = '';
  showpassType = '';
  category = '';
  activecolor = '';
  hintname = '';
  hintpwd = '';
  chin = '币安智能链'
  data: Person = {
    pass: '',
    name: '',
    repass: '',
    demo: ''
  };
  currentCategoryText = {};

  mounted() {
    this.searchText = this.$t('home.txt31', ['请输入钱包名称']);
    this.searchText2 = this.$t('home.txt33', ['请再次输入密码']);
    this.searchText3 = this.$t('ibinz.msg32');
    this.currentText = this.$t('home.txt26', ['Telegram X']);
    this.showpassType = this.$t('home.txt113', ['弱']);
    this.btnText = this.$t('home.txt22', ['创建钱包']);
    this.getwalletList(getCurrentWallet().category);
    this.getList();
  }

  clickCancel() {
    this.showOther = true;
    this.addcreate = false;
  }

  getClassify(status) {
    console.log("chang", bitlist)
    this.showOther = false;
    this.isClassify = status;
  }

  changename(e) {
    let val = e.detail.value;
    if (val.length) {
      this.hintname = '';
    } else {
      this.hintname = this.$t('home.txt31', ['请输入钱包名称']);
    }

  }

  // 密码强度
  changepass(e) {
    let val = e.detail.value;
    if (val.length) {
      this.hintpwd = '';
    } else {
      this.hintpwd = this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']);
    }

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
  }
  getSubmit(url){

    this.toPage(url)
    this.close()
  }
  //创建钱包
  async getsubmit() {

    if (!this.data.name) {
      this.hintname = this.$t('home.txt31', ['请输入钱包名称']);
    }
    if (!this.data.pass || !this.data.repass) {
      this.hintpwd = this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']);
    }
    if (this.data.pass != this.data.repass) {
      this.hintpwd = this.$t('home.txt125', ['密码不一致']);
    } else if (this.data.pass.length < 8 || this.data.repass.length < 8) {
      this.hintpwd = this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']);
    } else {

      // 创建
      const wallet = await createWallet(this.data.pass);

      let {
        data,
        errorMessage
      } = await request({
        url: '/wallet-create',
        method: 'post',
        data: {
          address: wallet.address,
          chainName: this.currentText,
          'alert': this.data.demo,
          'category': this.currentCategory,
          'name': this.data.name,
          // "password": this.data.pass,
          // "rpassword":this.data.repass,
          'type': 1
        }
      });

      // 保存
      await saveWallet(Object.assign({
        name: this.data.name,
        chainName: this.currentText,
        remark: this.data.demo,
        pwd: this.data.pass,
        id: data.id
      }, wallet));

      // let {
      // 	data,
      // 	errorMessage
      // } = await request({
      // 	url: '/wallet-create',
      // 	method: 'post',
      // 	data: {
      // 		"alert": this.data.demo,
      // 		"category": this.currentCategory,
      // 		"name": this.data.name,
      // 		"password": this.data.pass,
      // 		"rpassword": this.data.repass,
      // 		"type": 1
      // 	}
      // })

      this.data = {
        pass: '',
        name: '',
        repass: '',
        demo: ''
      };
      this.showOther = true;
      this.addcreate = false;

      this.getwalletList(this.currentCategory);

    }
  }

  async getwalletList(category) {


    // let {
    // 		data,
    // 		errorMessage
    // 	} = await request({
    // 		url: '/wallet-get-all-wallet-list',
    // 		method: 'get',
    // 		data: {
    // 			category: category
    // 		}
    // 	});
    console.log(this.currentText);
    this.walletList = [];

    const data = await getWalletList(this.currentText);

    this.walletList = data.map((item) => {
      item.addressx = item.address.substring(0, 6) + '***' + item.address.substring(30);
      item.selected = item.id === getCurrentWallet().id
      return item;

    });

    // let {
    // 	data,
    // 	errorMessage
    // } = await request({
    // 	url: '/wallet-get-all-wallet-list',
    // 	method: 'get',
    // 	data: {
    // 		category: category
    // 	}
    // });

    // let walletList = data.map((item) => {
    // 	item.addressx = item.address.substring(0, 6) + '***' + item.address.substring(30)
    //
    // 	return item
    //
    // })
    // this.walletList = walletList;
  }

  async getList() {
    let {
      data,
      errorMessage
    } = await request({
      url: '/wallet-getChainCategory',
      method: 'get',
    });
    this.bitlist = data;
    for (var index in data) {
      this.currentCategoryText[data[index].category] = data[index].name;
    }
  }

  close() {

    this.show = false;
    // this.$nextTick(() => {
    //   uni.showTabBar();
    // });

  }

  changeSelect(item, index) {
    let inde = uni.getStorageSync("chin")
    this.chin = inde[index]
    this.currentCategory = item.category;
    this.currentText = this.currentCategoryText[this.currentCategory];
    this.getwalletList(item.category);
  }

  async changeMoney() {
      await this.init();
      this.currentWallet = getCurrentWallet()
      this.currentCategory = this.category || this.currentWallet.category;
      this.currentText = this.currentCategoryText[this.currentCategory] || this.currentWallet.category_name;

      await this.getwalletList()
    // console.log("changeMoney", process.env.NODE_ENV);

    this.show = true;
    // uni.hideTabBar();
  }

  selectMoney(item) {
    console.log("ref", this.$refs.class)
    this.$emit('changeWallet', item);
    item['category_name'] = this.currentText
    item['category'] = this.currentCategory
    // uni.setStorageSync('currentWallet', item);
    saveCurrentWallet(item)
    this.$forceUpdate();
    this.close();


    if(this.isTx()){
      android.refresh(false,0)
    }else {
      uni.reLaunch({
        url:'/pages/index/index'
      })
    }
  }

  goTo(url) {
    this.show = false;
    uni.showTabBar();
    this.showOther = true;
    this.toPage(url);
  }

  copy(v) {
    uni.setClipboardData({
      data: v,
      success: function () {
        this.$refs.uToast.show({
          title: this.$t('home.txt16', ['复制成功']),
          type: 'success'
        });
      }
    });
  }

}
</script>

<style scoped lang="scss">
.color-f8 {
  color: #FF8B00;
  margin-right: 10rpx;
}

.wallet-content {
  position: relative;
}

.flexs {
  display: flex;
  flex-direction: row;
}

.red {
  color: red;
}

.commonfont {

  font-size: 26rpx;
  font-weight: 500;
  color: #2DA5E1;
}

.commonfonts {
  font-size: 26rpx;
  font-weight: 500;
  color: #999999;
}

.otherMoney {
  width: 750rpx;
  // height: 346rpx;
  background: #F5FAFD;

  view {
    width: 750rpx;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    background: #F5FAFD;
  }
}

.moneyList {

  width: 750rpx;
  height: 944rpx;
  //width: calc(100% - 60rpx);
  //padding: 0 30rpx;
  background: #F5FAFD;
  display: flex;
  flex-direction: row;
  .node {
    image {
      width: 24rpx;
      height: 24rpx;
    }
  }

  .items {
    width: 580rpx;
    height: 130rpx;
    background: #FFFEFF;
    box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
    border-radius: 16rpx;
    margin-top: 16rpx;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .m-btn {
      width: 150rpx;
      height: 60rpx;

      background: #2DA5E1;
      box-shadow: 0px 2px 10px 0px rgba(23, 119, 226, 0.4);
      border-radius: 30rpx;
      margin-right: 30rpx;
      font-size: 24rpx;
      line-height: 60rpx;
      text-align: center;
      font-weight: 500;
      color: #FFFFFF;
    }

    .copy {
      width: 22rpx;
      height: 22rpx;
      margin-left: 20rpx;
      margin-bottom: 4rpx;
    }

    .tip {
      position: absolute;
      width: 4rpx;
      height: 26rpx;
      background: #2DA5E1;
      border-radius: 2px;
      left: 0;
      top: 34rpx;
    }
  }

  .m-titles {
    height: 66rpx;
    margin-top: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .titlesub {
      font-size: 34rpx;
      font-weight: bold;
      color: #333333;
    }

  }

  .icon-add {
    width: 36rpx;
    height: 36rpx;

  }

  .m-nav {
    position: absolute;
    left: 0;
    top: 90rpx;
    width: 150rpx;
    background: #F5F5F5;
    align-items: center;
    height: 900rpx;
    overflow-y: auto;

    .nav-item {
      height: 120rpx;
      text-align: center;

      image {
        margin-top: 20rpx;
        width: 60rpx;
        height: 60rpx;
        // margin-right: 60rpx;
      }


      &.classify {
        position: fixed;
        width: 150rpx;
        height: 150rpx;
        background-color: #fff;
        bottom: 0;

        image {
          width: 42rpx;
          height: 35rpx;
          margin-top: 55rpx;

        }
      }
    }

  }

  .m-header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    align-items: center;
    height: 90rpx;
    padding: 0 30rpx;
    justify-content: space-between;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1rpx solid #F1F1F1;
  }

  .m-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;

    image {


      width: 54rpx;
      height: 8rpx;
    }
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

  // margin: 30rpx 0;
}

.tip {
  font-size: 28rpx;
  font-weight: 500;
  color: #333333;
  text-align: right;
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

.nosubmit {
  margin: 40rpx 0;
  width: 690rpx;
  height: 96rpx;

  background: #2DA5E1;
  // box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
  border-radius: 100rpx;
  font-size: 30rpx;
  line-height: 96rpx;
  color: #fff;

  &.bg-f5 {
    background: none;
    border: 1px solid #2DA5E1;
    color: #2DA5E1;
  }
}

.addcreate {
  height: 900rpx;
}

.hint-box {
  padding-top: 20rpx;
  color: red;
  font-size: 28rpx;
}

.right-box {
  width: 580rpx;
  position: absolute;
  right: 0;
  top: 90rpx;
  height: 720rpx;
  padding-bottom: 50rpx;
  overflow-y: auto;
}

.topIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5FAFD;
  border-bottom: 1px solid #E9E9E9;

  .icon {
    width: 56rpx;
    height: 8rpx;
    background: #3E8BF6;
    border-radius: 4rpx;
  }
}

.moneyList {

  .subHeader {
    padding: 0 0rpx 50rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150rpx;
    height: 35rpx;
    .title {
      font-size: 36rpx;
      color: #333333;
    }

    .icon {
      width: 42rpx;
      height: 42rpx;
    }
  }

  .iconNav {
    width: 166rpx;
    overflow-x: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #F6F6F8;
    margin-top: 20rpx;
    .nav-item {
      margin-bottom: 34rpx;

      //image {
      //  width: 82rpx;
      //  height: 82rpx;
      //}
    }
  }


  .subTitle {
    //margin: 47rpx 0 33rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 556rpx;
    margin: 22rpx 29rpx 26rpx 27rpx;
    .titlesub {
      font-size: 36rpx;
      color: #333333;
      font-weight: bold;
    }

    .icon-add {
      width: 36rpx;
      height: 36rpx;
    }
  }

  .listBox {
    display: flex;
    align-items: flex-start;
    width: 615rpx;
    flex-direction: column;
    background-color: #FCFDFF;
    .item {
      background: #FFFFFF;
      border-radius: 20rpx;
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 26rpx 31rpx 19rpx 28rpx ;
      width: 556rpx;
      height: 146rpx;

      .content {
        flex: 1;
        padding: 23rpx;
        .title {
          font-size: 30rpx;
          margin-bottom: 17rpx;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .dot {
          background: #FFFFFF;
          margin-right: 31rpx;
          }
        }

        .adr {
          color: #999999;
          font-size: 26rpx;
          display: flex;
          align-items: center;

          .copyBtn {
            width: 68rpx;
            height: 35rpx;
            background: rgba(236, 245, 251, 0.6600);
            border-radius: 5rpx;
            line-height: 35rpx;
            text-align: center;
            color: #54A3DC;
            font-size: 22rpx;
            margin-left: 24rpx;
          }
        }
      }

      .dot {
        width: 32rpx;
        height: 32rpx;
        background: #E3DFDF;
        border-radius: 50%;
      }

      &.active {
        background: #3E8BF6;
        color: #FFFFFF;

        .adr {
          color: #FCFCFC;

          .copyBtn {
            color: #FFFFFF;
            background: rgba(240, 242, 246, 0.6600);
          }
        }
      }
    }
  }
}

</style>
