<template>
  <view>
    		<u-navbar v-if="!isTx()" :is-back="true" :is-fixed="true" :title="title" :title-bold="true"
    			style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
    <view class="moneyList">
      <view class="m-nav flexs">
        <view v-for="(item,index) in bitlist" :key="index">
          <!-- 					<image :src="item.select" v-if="currentCategory==item.category" mode=""></image>
                    <image :src="item.img" v-else @click="changeSelect(item,index) " mode=""></image> -->
          <image :src="item.icon_select" v-if="currentCategory==item.category" mode=""></image>
          <image :src="item.icon_un_select" v-else @click="changeSelect(item,index) " mode=""></image>
        </view>
      </view>
      <view class="m-titles flexs">
        <!-- <view class="titlesub">{{currentText}}</view> -->
        <view class="titlesub">{{ 'Telegram Pocket' }}</view>
        <image src="/static/biticon/jia.png" class="jia" mode=""></image>
        <!-- <view class="commonfont" @click="showAdd=true">{{$t('ibinz.msg7',["添加钱包"])}}</view> -->
      </view>
      <view>
        <view class="flexs" v-for="(item,index1) in walletList" :key="index1">
          <view class="node">
            <image src="/static/biticon/node.png" mode=""></image>
            <u-line color="#999999" length="136" style="width: 24px;" border-style="dashed" direction='col'>
            </u-line>
          </view>
          <view class="items flexs" @click="goTo('/pages/wallet/walletDetail',item)">
            <view class="tip"></view>
            <view style="margin-left: 30rpx;">
              <view>
                <text class="color-f8" v-if="currentText == 'DLMU' && index1 == 0">{{ $t('home.txt148', ['初始']) }}
                </text>
                {{ 'Telegram Pocket' }}
              </view>
              <view class="flexs" style="align-items: flex-end;">
                <view class="commonfonts" @click="sign(event)">{{ item.addressx }}</view>

                <!-- <image class="copy" src="/static/biticon/copy.png" @click.stop="copy(item.address)"
                  mode="">
                </image> -->
                <view class="square">
                  <text class="tex" @click="dianji()">复制</text>
                </view>
              </view>
            </view>
            <view>
              <image src="/static/biticon/currentselect1.png"
                     v-if="item.is_select==true"
                     style="width: 32rpx;height: 32rpx;margin-right: 40rpx;" mode=""></image>
              <view class="Manage-Wallet" v-if="item.is_select==true"></view>
              <!-- <view class="m-btn" @click.stop="selectMoney(item,index1)" v-else>
                {{$t('ibinz.msg8',["选择钱包"])}}</view> -->
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 选择钱包 -->
    <u-popup v-model="showAdd" mode="bottom">
      <view class="parent">
        <view class="across"></view>
      </view>

      <view class="otherMoney">
        <view class="commonfont" style="font-size: 30rpx;border-bottom: 1rpx solid #E6E6E6;"
              @click="goTo('/pages/index/addcreate?type=1','')">{{ $t('ibinz.msg12', ['创建钱包']) }}
        </view>
        <view class="commonfont" style="font-size: 30rpx;border-bottom: 8rpx solid #E6E6E6;"
              @click="goTo('/pages/index/addcreate?type=2','')">{{ $t('ibinz.msg13', ['导入钱包']) }}
        </view>
        <!-- <view class="commonfonts" style="font-size: 30rpx;" @click="showAdd=false">{{$t('ibinz.msg14',["取消"])}} -->
        <!-- </view> -->
      </view>
    </u-popup>


  </view>
</template>

<script type="text/javascript" src="your-path/dist/lightwallet.min.js"></script>
<script src="your-path/dist/web3.min.js"></script>
<script src="your-path/dist/eth-wallet-js.js"></script>
<script>
import {getWalletList} from '../../libs/wallet';

var ethers = require('ethers');

import {
  Assets
} from '@/decorator/wallet';
import {
  Component,
  Vue
} from 'vue-property-decorator';

import {
  request,
  navigateTo
} from '@/m-subpack/base';


@Component({})
@Assets()
export default class Idnex extends Vue {
  bitlist = [];
  title = '';
  currentCategory = 0;
  currentText = '';
  showAdd = false;
  walletList = [];
  addressx = 0;
  addres = 0;

  onLoad({chainName}) {
    // this.currentText = chainName || 'BSC'
  }

  async onShow() {

    this.currentCategoryText = {
      4: this.$t('home.txt26', ['Telegram X']),
      2: this.$t('home.txt27', ['以太坊']),
      3: this.$t('home.txt28', ['波场']),

    };
    this.title = this.$t('ibinz.msg2', ['管理钱包']);
    await this.getList();
    await this.init();
    await this.getwalletList(uni.getStorageSync('currentWallet').name);
    this.currentCategory = this.currentWallet.category;

    this.currentText = this.currentWallet.category_name;
    console.log(this);
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
  }

  changeSelect(item) {
    this.currentCategory = item.category;
    this.currentText = item.name;

    this.getwalletList(item.category);
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
    const data = await getWalletList(this.currentText);
    console.log(data,'------------');
    let walletList = data.map((item) => {
      console.log(item,item.id == uni.getStorageSync('currentWallet').id,'---------------');
      item.addressx = item.address.substring(0, 6) + '***' + item.address.substring(30);
      item.is_select = item.id == uni.getStorageSync('currentWallet').id
      return item;

    });
    this.walletList = walletList;
  }

  selectMoney(item) {

    this.walletList.map(v => {
      v.is_select = false;
      return v;
    });
    item.is_select = true;
    this.changeCurrentWallet(item);
    // this.close();
  }


  goTo(url, item) {
    if (item) {
      this.toPage(`${url}?address=${item.address}&name=${item.name}&chainName=${this.currentText}&type=${this.currentCategory}`);
    } else {
      this.showAdd = false;
      this.toPage(url);
    }
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

  sign(event) {

  }


}
// import {
// 	request
// } from "@/m-subpack/base";
// export default {
// data() {
// 	return {
// 		showAdd: false, //添加钱包弹框
// 		currentSelect: 0, //当前选中的钱包种类 category:1、比特币；2、以太坊；3、波场；4、Telegram X
// 		currentText: this.$t('ibinz.msg9', ["Telegram X"]),
// 		title: this.$t('ibinz.msg2', ["管理钱包"]),
// 		bitlist: [
// 			// {
// 			// 	img: "/static/biticon/bit_.png",
// 			// 	select: "/static/biticon/bit.png",
// 			// 	text:  this.$t('ibinz.msg6', ["比特币"]),
// 			// 	category: 1,
// 			// 	isCheck: true
// 			// },
// 			{
// 				img: "/static/biticon/dolami_.png",
// 				select: "/static/biticon/dolami.png",
// 				text:  this.$t('ibinz.msg9', ["哆唻咪"]),
// 				category: 4,
// 				isCheck: false
// 			},
// 			{
// 				img: "/static/biticon/ethereum_.png",
// 				select: "/static/biticon/ethereum.png",
// 				text:  this.$t('ibinz.msg10', ["以太坊"]),
// 				category: 2,
// 				isCheck: false
// 			},
// 			{
// 				img: "/static/biticon/tron_.png",
// 				select: "/static/biticon/tron.png",
// 				text: this.$t('ibinz.msg11', ["波场"]),
// 				category: 3,
// 				isCheck: false
// 			},
// 		],
// 		nodelist: [],
// 		selectIndex: 0
// 	}
// },
// 	props: ['showT'],
// 	created() {
// 		this.getMoeny()
// 	},
// methods: {

// 	sign (event) {
// 		 console.log(event)
// 	}

// // 钱包类别切换 category:1、比特币；2、以太坊；3、波场；4、Telegram X
// changeSelect(item, index) {
// 	this.currentSelect = index
// 	this.getMoeny(item.category)
// 	this.currentText = item.text
// 	this.bitlist[index].isCheck = true
// },
// // 当前钱包种类的钱包列表
// async getMoeny(category) {
// 	var wallet = JSON.parse(uni.getStorageSync("currentWallet"))
// 	let {
// 		data,
// 		errorMessage
// 	} = await request({
// 		url: '/wallet-get-all-wallet-list',
// 		method: 'get',
// 		params: {
// 			"category": this.bitlist[this.currentSelect].category,

// 		}
// 	})
// 	this.nodelist = data.map((item) => {
// 		item.addressx = item.address.substring(0, 6) + '***' + item.address.substring(30)
// 		item.select = false
// 		if (item.id == wallet.id) {
// 			item.select = true
// 		}
// 		return item

// 	})
// 	// console.log("钱包列表", this.nodelist);
// },
// // 选择钱包
// async selectMoney(item, index) {
// 	this.selectIndex = index
// 	this.bitlist.map((item, index) => {
// 		if (index == this.currentSelect) {
// 			item.isCheck = true
// 		} else {
// 			item.isCheck = false
// 		}
// 	})
// 	let {
// 		data,
// 		errorMessage
// 	} = await request({
// 		url: '/wallet-update-Wallet-State',
// 		method: 'get',
// 		params: {
// 			"walletId": item.id,
// 		}
// 	})
// 	uni.setStorageSync('currentWallet', item)
// 	this.$emit("changeWallet")
// 	item.select = true
// 	this.show = false
// 	this.getMoeny(this.currentSelect)

// },
// goTo(url, id) {
// 	if (id) {
// 		uni.navigateTo({
// 			url: url + '?id=' + id
// 		})

// 	} else {
// 		this.showAdd = false
// 		uni.navigateTo({
// 			url: url
// 		})

// 	}


// },
// copy(v) {
// 	var _this=this
// 	uni.setClipboardData({
// 		data: v,
// 		success: function() {
// 			_this.$refs.uToast.show({
// 				title: _this.$t('home.txt16',['复制成功']),
// 				type: 'success'
// 			})
// 		}
// 	});
// },
// close() {
// 	this.show = false
// 	uni.showTabBar()
// },

// changeMoney() {
// 	uni.hideTabBar()
// 	this.show = true
// },

// }
// }
</script>

<style scoped lang="scss">
.color-f8 {
  color: #FF8B00;
  margin-right: 10rpx;
}

.flexs {
  display: flex;
  flex-direction: row;
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
  height: 296rpx;
  background: #FFFFFF;

  > view {
    width: 750rpx;
    height: 96rpx;
    line-height: 96rpx;
    text-align: center;
    background: #FFFFFF;
  }
}

.moneyList {
  width: 750rpx;
  height: 944rpx;
  width: calc(100% - 60rpx);
  padding: 0 30rpx;
  background: #FFFFFF;
  margin-top: 20rpx;

  .node {
    image {
      width: 24rpx;
      height: 24rpx;
    }
  }

  .items {
    width: 640rpx;
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
    align-items: flex-end;
    justify-content: space-between;

    .titlesub {
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
    }
  }

  .m-nav {
    width: 750rpx;
    height: 80rpx;
    background: #F5F5F5;
    align-items: center;
    margin-left: -30rpx;
    padding-left: 30rpx;

    image {
      width: 60rpx;
      height: 60rpx;
      margin-right: 60rpx;
    }
  }

  .m-header {
    align-items: center;
    height: 90rpx;
    justify-content: space-between;
  }

  .m-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
  }
}

.parent {
  width: 56rpx;
  height: 8rpx;
}

.across {
  border-top: 10rpx solid #3E8BF6;
  border-radius: 4rpx;
  position: relative;
  transform: translateX(350rpx);
}

.whole {
  width: 750px;
  height: 365px;
  background: #F5FAFD;
  border-radius: 40px 40px 0px 0px;
}

.square {
  width: 68.4rpx;
  height: 34.6rpx;
  background: #F0F2F6;

  .tex {
    font-size: 22rpx;
    color: #54A3DC;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// .Manage-Wallet {
// 	width: 32px;
// 	height: 32px;
// 	background: #FFFFFF;
// 	border-radius: 50%;
// }

.jia {
  width: 36rpx;
  height: 36rpx;

}
</style>
