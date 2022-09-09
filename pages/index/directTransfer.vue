<!-- 我的页面 -->
<template>
  <base-layout>
    <view>

      <u-navbar v-if="!isTx()"  :is-back="false" :is-fixed="true" :title="title" style="border-bottom: 1px solid #E6E6E6;" :title-bold="true">
        <image src="/static/left.png" style="width: 21rpx; height: 39rpx; margin: 15rpx;" @click="back()" class="left"></image>
      </u-navbar>
<!--      <image src="/static/left.png" @click="Refresh" style="height: 39rpx; width: 21rpx;"></image>-->
<!--      <view v-if="!isTx()" class="arrow">直接转账</view>-->
      <view class="importbox">
        <view class="input-item">
          <view class="commonfont flex-j-a">
            <view>{{ $t('home.txt81', ['收款地址']) }}</view>
            <image src="/static/index/book.png" style="width: 34rpx;height: 34rpx;" mode=""
                   @click="topage(`/pages/my/addressBook?type=1`)"></image>
          </view>
          <input type="text" :placeholder="placeholder" placeholder-style="color:#B3B3B3;font-size:28rpx"
                 class="i-items" v-model="address" @input="func"/>
        </view>
        <view class="input-item">
          <view class="commonfont flex-j-a">
            <view>{{ $t('home.txt83', ['转账金额']) }}</view>
            <view style="font-weight: 500;" @click="topage('/pages/index/tokenList')">
              {{ Currency }}
              <u-icon name="arrow-right" size="28"></u-icon>
            </view>
          </view>
          <view class="moenyval">
            <input type="number" @keyup="inputChangeMoney(money)" :placeholder="placeholder1"
                   placeholder-style="color:#B3B3B3;font-size:28rpx"
                   class="i-items" v-model="money" @input="func"/>
            <!-- <span class="all" @click='all()'>{{$t('home.txt85',['全部'])}}</span> -->
          </view>
        </view>
        <view class="commonfont flex-j-a">
          <view>
            {{ $t('home.txt86', ['余额']) }}
          </view>
          <view style="font-weight: 500;">{{ balance }} {{ Currency }}</view>
        </view>
      </view>
      <view style="width: 100%;height: 20rpx;background-color: #F5F5F5;"></view>
      <view class="commonfont" style="margin-left: 30rpx;">
        {{ $t('home.txt87', ['矿工费']) }}
      </view>
      <view class="mystyle" v-show="currentWallet.category!=3">
        <view class="flex-j-box">
          <view @click="close_custom" style="display: flex;flex-direction: row;">
              <view class="transdemo" v-for="(item,index) in list" :key="index" @click="current=index"
                    :style="current==index?'border-color:#2DA5E1':''">
                <view class="demofont" :style="current==index?'color:#2DA5E1':''">{{ item.t }}</view>
                <view class="demofonts" :style="current==index?'color:#2DA5E1':''">
                  <view>{{ feeInfo[item.v] || 0 }}{{ symbol }}</view>
                  <view>≈${{ feeInfo[item.m] || 0 }}</view>
                </view>
                <view class="demofontsub" :style="current==index?'color:#2DA5E1':''">
                  ≈{{ item.s }}{{ $t('home.txt88', ['秒']) }}
                </view>
                <image src="/static/index/select.png" v-show="current==index" class="select" mode=""></image>
              </view>
          </view>
          <!--自定义-->
          <view @click="customize">
            <view class="transdemo" v-for="(index) in custom" @click="current=index" :style="current==index?'border-color:#2DA5E1':''">
              <view :style="current==index?'color:#2DA5E1':''" class="cust">自定义</view>
              <image src="/static/index/select.png" v-show="current==index" class="select" mode=""></image>
            </view>
          </view>
        </view>
      </view>
      <view class="box-state" v-if="state === true">
        <view class="text-stay">自定义矿工费</view>
        <view class="text-box">
          <text>Gas Price(Gwei)</text>
          <text style="position: relative;transform: translateX(20rpx);">Gas Limit(gas)</text>
        </view>
        <view class="box-input">
            <input class="uni-input" type="digit" value="5" v-model="Gwei"/>
            <input class="uni-input" type="digit" v-model="rate"/>
        </view>
        <view class="mode-box">
            <view class="text-stay" style="position: relative;transform: translateY(-20rpx);" >预计时间：3秒</view>
            <view class="mode-input text-stay" style="position: relative;transform: translateY(-20rpx);">{{(rate * Gwei) / 1000000000}}BNB≈${{(((rate * Gwei) / 1000000000) * usdPrice).toFixed(4)}}</view>
        </view>
      </view>
      <base-button v-if="address&&money" style="margin: 60rpx auto;width: 690rpx;" ref="button"
                   @submit="confim()" :title="btnTitle"/>
      <button v-else class="nosubmit">{{ $t('home.txt56', ['确认']) }}</button>
      <!-- 			<u-popup v-model="show" mode="center" border-radius="20" :closeable='false'>
              <view class="popupboxs">
                <view class="codepass">{{$t('home.txt54',['验证密码'])}}</view>
                <input password v-model="pass" class="codeinput" />
                <view style="color: #666;font-size: 26rpx;" @click="topage('/pages/wallet/resetPass')">
                  {{$t('home.txt57',['忘记密码'])}}
                </view>
                <view class="line"></view>
                <view class="confim flex-j-a">
                  <view @click="cancel()">{{$t('home.txt55',['取消'])}}</view>
                  <view style="border-left: 1px solid #E5E5E5;color:#2DA5E1 ;" @click="confim()">
                    {{$t('home.txt56',['确认'])}}
                  </view>
                </view>
              </view>
            </u-popup> -->
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog ref="inputClose" v-model="pass" mode="input" title="请输入密码" value="请输入密码"
                          placeholder="请输入密码" @confirm="dialogInputConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>
  </base-layout>
</template>

<script lang="ts">
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

import {getCurrentWallet, getWalletPrivateKey, getWalletPwd} from '@/libs/wallet';
import UniDataPickerView from "@/uni_modules/uni-data-picker/components/uni-data-pickerview/uni-data-pickerview.vue";
import Image from "@/m-common/common/components/image.vue";

@Component({
  components: {Image, UniDataPickerView}
})
@Assets()
export default class Idnex extends Vue {

  show = false;
  pass = '';
  title = '';
  placeholder = '';
  placeholder1 = '';
  btnTitle = '';
  data = {
    gwei: '',
    gas: '',
  };
  address =  '';
  money = '';
  symbol = 'BNB';
  list = [];
  current = 1;
  balance = '';
  feeInfo = {};
  unit = '';
  unit1 = '';
  currentWallet = {};
  flag = false;
  Currency_name = "";
  custom = '';
  state = false;
  rate = '21000';
  from = uni.getStorageSync("from_address");
  usdPrice = '';
  Gwei = '5';
  sy = uni.getStorageSync("_coinList")[0].symbol;
  Currency = this.getQueryString() ? this.getQueryString() : this.sy;
  coin_id = uni.getStorageSync("_coinList")[0].coin_id;
  id = '';
  // coin_list = uni.getStorageSync("_coinList")[0].coin_id;
  func = this.debounce(this.getFee,1200);

  onLoad(opt: any) {
    // let z = Object.keys(opt).length
    // if (z !== 0) {
      this.flag = false;
      this.address = opt ? opt.address: "";
      // this.symbol = opt.symbol;
      this.balance = opt.balance ? opt.balance : uni.getStorageSync("_coinList")[0].balance;
      this.currentWallet = {...getCurrentWallet()};
      this.Currency_name = uni.getStorageSync("symbol");
      // this.coin_id = uni.getStorageSync("_coinList")[0].coin_id;
      this.getFee();
    // }
  }

  async onShow() {
    this.getQueryString()
    // let index = uni.getStorageSync("index");
    // this.id = uni.getStorageSync("coin_id");
    // this.coin_id = this.id[index] ? this.id[index] : this.coin_list;
    // console.log("onShow", index);
    this.title = this.$t('home.txt80', ['直接转账']);
    this.placeholder = this.$t('home.txt82', ['请输入或粘贴钱包地址']);
    this.btnTitle = this.$t('home.txt56', ['确认']);
    this.placeholder1 = this.$t('home.txt84', ['请输入数量']);
    this.list = [{
      t: this.$t('home.txt89', ['慢']),
      v: 'safeGasPrice',
      m: 'safeGasPriceDollar',
      s: '3'
    },
      {
        t: this.$t('home.txt90', ['推荐']),
        v: 'proposeGasPrice',
        m: 'proposeGasPriceDollar',
        s: '3'
      },
      {
        t: this.$t('home.txt91', ['快']),
        v: 'fastGasPrice',
        m: 'fastGasPriceDollar',
        s: '3'
      },
    ];
    this.custom = [{
      t: "自定义",
      v: 'fastGasPrice',
      m: 'fastGasPriceDollar',
      s: '3'
    }];


    // await this.init();
    this.currentWallet = getCurrentWallet();
    // console.log("this.symbol", !this.symbol)
    // if (!this.symbol) {
    //   this.symbol = this.coinLists[0].symbol;
    //   this.coin_id = this.coinLists[0].coin_id;
    //   this.balance = this.coinLists[0].balance;
    // }
    console.log('1111111111111111111');
    console.log(this.currentWallet.category, '----------');
    switch (this.currentWallet.category) {
      case 1:
        this.unit = 'sat/b';
        this.unit1 = 'byte';
        break;
      case 2:
        this.unit = 'gwei';
        this.unit1 = 'gas';
        break;
      case 4:
        this.unit = '未知';
        this.unit1 = '未知';
        break;
      default:
        break;
    }
    if (!this.gasPrice && this.currentWallet.category != 3) this.getFee();
    // console.log(this.getFee(this.coin_id), '--11-----');
  }


  async topage(url) {
    console.log(url);
    // if (navigator.userAgent.includes("TelegramXAPP")) {
    //   console.log("点击", url)
    //   let s =" http://192.168.2.162:8080/#" + url
    //   android.startNewActivity(true, s);
    // }

    const data = await navigateTo(url);
    // if (address) {
    //   this.address = data.address;
    // } else {
    //   this.symbol = data.symbol;
    //   this.coin_id = data.coin_id;
    //   this.balance = data.balance;
    //   console.log(this);
    //   // debugger
    // }
  }

  //获取矿工手续费
  async getFee() {
    let coin_id = this.coin_id;
    uni.showLoading({
      title: this.$t('home.txt17', ['加载中'])
    });
    // console.log("money", this.data.money)
    const {address} = getCurrentWallet();
    const {
      data
    } = await request({
      url: '/walletselect_fee',
      method: 'post',
      params: {
        coin_id: coin_id,
        amount: this.money,
        from: address,
        to: this.address,
      }
    });
    this.feeInfo = data;
    this.data.gwei = data.proposeGas;
    this.data.gas = data.gasLimit;
    this.gasPrice = data.proposeGasPrice;
    this.gasPriceDollar = data.proposeGasPriceDollar;
    this.usdPrice = data.usdPrice;
        uni.hideLoading();
    // console.log('feeInfo: ', this.feeInfo);
  }

  //转账
  submit() {
    this.show = true;
    this.$refs.button.hideLoading();
  }

  inputChangeMoney(v) {
    v = v.replace(/[^\d]/g, '');
  }

  inputDialogToggle() {
    this.$refs.inputDialog.open();
  }

  async dialogInputConfirm(val) {
    const {address, category_name} = getCurrentWallet();
    if (val !== await getWalletPwd(category_name, address)) {
      return uni.showToast({
        title: '密码错误',
        icon: 'none',
      });
    }


    this.flag = true;
    this.confim();
    // setTimeout(() => {
    // uni.hideLoading()
    // console.log(val)
    // this.value = val
    // 关闭窗口后，恢复默认内容
    this.$refs.inputDialog.close();
    // }, 3000)
  }

  //转账验证
  async confim() {
    if (!this.flag) {
      return this.$refs.inputDialog.open();
    }
    if (typeof this.current === "object") {
        this.current = 3
    }
    // debugger
    this.show = false;
    let current = '';
    let gasPrice = '';
    console.log("if,current", this.current)
    if (this.current == 4) {
      gasPrice = Number(this.data.gwei);
    } else {
      current = this.current;
      gasPrice = Number(this.data.gwei);
    }

    try {
      console.log(this.pass, '============');
      // if (this.pass !== await getWalletPwd()) {
      //   return uni.showToast({
      //     title: '密码错误',
      //     icon: 'none'
      //   });
      // }

      this.$refs.inputDialog.open();
      const {address, category_name,id,category} = getCurrentWallet();
      const {
        data
      } = await request({
        url: '/wallettransaction',
        method: 'post',
        data: {
          amount: this.money,
          coin_id: this.coin_id,
          target_address: this.address,
          wallet_id: id,
          address: address,
          category: category,
          private_key: await getWalletPrivateKey(category_name, address),
          //转账手续费 1、慢 2、标准 3、快
          transaction_fee_type: current,
          gas_price: gasPrice,
          gas_limit: this.data.gas,
        }
      });

      this.$refs.button.hideLoading();
      uni.showToast({
        title: this.$t('home.txt128', ['转账申请已提交'])
      });
      setTimeout(() => {
        uni.redirectTo({
          url: '/pages/index/userMoney'
        });
      }, 1500);
    } catch (e) {
      this.$refs.button.hideLoading();
      console.log(e);
      //TODO handle the exception
      this.pass = '';
    }

    // if(errorCode!=0){
    // 	this.pass=''
    // }
    // console.log("data: ",data);
  }

  //取消
  cancel() {
    this.show = false;
    this.pass = '';
  }

  customize() {
    this.state = true;
  }

  close_custom() {
    this.state = false;
  }


  debounce (func,time) {
    let context, args, timeId, timestamp
    function timeout() {
      const now = Date.now() - timestamp
      if (now >= 0 && now < time) {
        timeId = setTimeout(timeout, time - now)
      } else {
        timeId = null
        func.apply(context, args)
      }
    }
    function action() {
      context = this
      args = arguments
      timestamp = Date.now()
      if (!timeId) timeId = setTimeout(timeout, time)
    }
    return action
  }

  getQueryString() {
    // uni.getStorageSync("_coinList")[0].symbol
    var qs = window.location.hash.substr(1, window.location.hash.length), // 获取url中"?"符后的字串
        args = {}; // 保存参数数据的对象

    if (!qs.includes("?")) {
      return ''
    }
    // console.log("qs", qs)
    // let newStr = qs.substring("?");
    let newStr = qs.match(/\?(\S*)?/)[1];
    let items = newStr.length ? newStr.split("&") : [];
    let item = null;
    let len = items.length;
    for(var i = 0; i < len; i++) {
      item = items[i].split("=");
      var name = decodeURIComponent(item[0]),
          value = decodeURIComponent(item[1]);
      if(name) {
        args[name] = value;
      }
    }
    this.coin_id = args.coin_id;
    return args.symbol;
  }

  back () {
    let info = uni.getStorageSync("info")

    if (window.location.href.includes("type=1")) {
      return window.location.href = "#/pages/index/userMoney"
    } else {
      window.location.href = "#/pages/index/userMoney?info=" + info
    }
  }
}
// import {
// 	request
// } from "@/m-subpack/base";
// import Md5 from "@/components/md5.js"
// export default {
// 	data() {
// 		return {
// 			show: false,
// 			pass: "",
// 			title: this.$t('home.txt80', ['直接转账']),
// 			placeholder: this.$t('home.txt82', ['请输入或粘贴钱包地址']),
// 			placeholder1: this.$t('home.txt84', ['请输入数量']),
// 			list: [{
// 					t: this.$t('home.txt89', ['慢']),
// 					v: "safeGasPrice",
// 					m: "safeGasPriceDollar",
// 					s: "60"
// 				},
// 				{
// 					t: this.$t('home.txt90', ['推荐']),
// 					v: "proposeGasPrice",
// 					m: "proposeGasPriceDollar",
// 					s: "30"
// 				},
// 				{
// 					t: this.$t('home.txt91', ['快']),
// 					v: "fastGasPrice",
// 					m: "fastGasPriceDollar",
// 					s: "10"
// 				}
// 			],
// 			btnTitle: this.$t('home.txt56', ['确认']),
// 			current: 1,
// 			data: {
// 				gwei: "",
// 				gas: '',
// 				address: "",
// 				money: "",

// 			},
// 			coin_id: '',
// 			symbol: '',
// 			walletInfo: {},
// 			balance: '',
// 			info: {},
// 			feeInfo: {},
// 			unit: '',
// 			unit1: '',
// 			gasPrice: 0,
// 			gasPriceDollar: 0
// 		}
// 	},
// 	onLoad(opt) {
// 		//1、比特币；2、以太坊；3、波场；4、Telegram X
// 		this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
// 		if (uni.getStorageSync("address")) {
// 			this.data.address = uni.getStorageSync("address")
// 		}
// 		console.log("this.walletInfo: ", this.walletInfo);
// 		switch (this.walletInfo.category) {
// 			case 1:
// 				this.unit = 'sat/b'
// 				this.unit1 = 'byte'
// 				break;
// 			case 2:
// 				this.unit = 'gwei'
// 				this.unit1 = 'gas'
// 				break;
// 			case 4:
// 				this.unit = '未知'
// 				this.unit1 = '未知'
// 				break;
// 			default:
// 				break;
// 		}
// 		if (Object.keys(opt).length == 0 || opt.info == 'undefined') {
// 			console.log(1111);
// 			this.getCoinList()
// 		} else {
// 			if (opt.info) {
// 				console.log(222);
// 				this.info = JSON.parse(opt.info)
// 				this.symbol = this.info.symbol
// 				if (this.info.coin_id) {
// 					this.coin_id = this.info.coin_id
// 				} else {
// 					this.coin_id = this.info.id
// 				}

// 				this.getWalletkBalance(this.coin_id)
// 			} else {
// 				console.log(333);
// 				if (opt.symbol) {
// 					this.symbol = opt.symbol
// 					if (opt.coin_id) {
// 						this.coin_id = opt.coin_id
// 					} else {
// 						this.coin_id = opt.id
// 					}

// 					this.getWalletkBalance(this.coin_id)
// 				} else {
// 					this.getCoinList()
// 				}

// 			}

// 		}

// 		if (opt.address) {
// 			this.data.address = opt.address
// 		}
// 		// if (this.walletInfo.category != 3) {
// 		// 	this.getFee(this.coin_id)
// 		// }
// 	},
// 	onUnload() {
// 		uni.removeStorageSync("address");
// 	},
// 	methods: {
// 		// 获取钱包余额
// 		async getWalletkBalance(id) {
// 			let {
// 				data,
// 				errorMessage
// 			} = await request({
// 				url: '/walletget-balance',
// 				method: 'get',
// 				params: {
// 					"coin_id": id,
// 					"wallet_id": this.walletInfo.id
// 				}
// 			})
// 			this.balance = data.balance
// 			console.log('钱包类型', this.walletInfo.category);
// 			if (this.walletInfo.category != 3) {
// 				console.log(999);
// 				this.getFee(id)
// 			}
// 			console.log('钱包余额：', data.balance);
// 		},
// 		// 获取当前钱包添加的币种列表
// 		async getCoinList() {
// 			this.coinList = []
// 			let {
// 				data,
// 				errorMessage
// 			} = await request({
// 				url: '/wallet-get-added-coin-list',
// 				method: 'get',
// 				params: {
// 					"wallet_id": this.walletInfo.id,
// 				}
// 			})
// 			this.coinList = data
// 			console.log("this.coinList: ", this.coinList);
// 			if (this.coinList.length != 0) {
// 				this.symbol = this.coinList[0].symbol
// 				this.coin_id = this.coinList[0].coin_id
// 				this.getWalletkBalance(this.coin_id)
// 			}

// 		},
// 		async confim() {
// 			this.show = false;
// 			let current = ''
// 			let gasPrice = ''
// 			if (this.current == 3) {
// 				gasPrice = Number(this.data.gwei)
// 			} else {
// 				current = this.current
// 				gasPrice = Number(this.data.gwei)
// 			}
// 			try {
// 				const {
// 					data
// 				} = await request({
// 					url: '/wallettransaction',
// 					method: 'post',
// 					data: {
// 						amount: this.data.money,
// 						coin_id: this.coin_id,
// 						target_address: this.data.address,
// 						wallet_id: this.walletInfo.id,
// 						password: this.pass,
// 						//转账手续费 1、慢 2、标准 3、快
// 						transaction_fee_type: current,
// 						gas_price: gasPrice
// 					}
// 				})
// 				uni.showToast({
// 					title: this.$t('home.txt128', ['转账申请已提交'])
// 				})
// 				setTimeout(() => {
// 					uni.redirectTo({
// 						url: '/pages/index/userMoney'
// 					})
// 				}, 1500)

// 				console.log(1111)
// 			} catch (e) {
// 				//TODO handle the exception
// 				this.pass = ''
// 			}


// 			// if(errorCode!=0){
// 			// 	this.pass=''
// 			// }
// 			// console.log("data: ",data);
// 		},
// 		//取消
// 		cancel() {
// 			this.show = false
// 			this.pass = ''
// 		},
// 		//获取矿工费
// 		async getFee(coin_id) {
// 			console.log(222233);
// 			uni.showLoading({
// 				title: this.$t('home.txt17', ['加载中'])
// 			})
// 			const {
// 				data
// 			} = await request({
// 				url: '/walletselect_fee',
// 				method: 'post',
// 				params: {
// 					coin_id: coin_id
// 				}
// 			})
// 			this.feeInfo = data
// 			this.data.gwei = data.proposeGas
// 			this.data.gas = data.gasLimit
// 			this.gasPrice = data.proposeGasPrice
// 			this.gasPriceDollar = data.proposeGasPriceDollar
// 			uni.hideLoading()
// 			console.log("data: ", data);
// 		},
// 		//ETH币换算
// 		async setValue() {
// 			const {
// 				data
// 			} = await request({
// 				url: '/walletCoinConvert',
// 				method: 'post',
// 				params: {
// 					gas: this.data.gwei,
// 					gasLimit: this.data.gas
// 				}
// 			})
// 			this.gasPrice = data.ETH
// 			this.gasPriceDollar = data.dollar
// 			// console.log("data: ",data);
// 		},
// 		submit() {
// 			if (this.balance >= this.data.money) {
// 				this.show = true;

// 			} else {
// 				// uni.showToast({
// 				// 	title: '余额不足',
// 				// 	icon: 'none'
// 				// })
// 			}
// 			this.$refs.button.hideLoading()
// 		},
// 		all() {
// 			this.data.money = this.balance
// 		},
// 		//页面跳转
// 		topage(url) {
// 			uni.navigateTo({
// 				url: url
// 			})
// 		},
// 		addChange() {
// 			uni.setStorageSync("address", this.data.address);
// 			// console.log('收款地址',this.data.address);
// 		},
// 		goBack() {
// 			uni.redirectTo({
// 				url: '/pages/index/userMoney'
// 			});
// 		}
// 	}
// }
</script>

<style lang="scss" scoped>
.popupboxs {
  width: 556rpx;
  height: 324rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;

  .line {
    width: 616px;
    height: 1px;
    margin-top: 28rpx;
    background-color: #E5E5E5;
    margin-left: -30rpx;
  }

  .confim {
    position: absolute;
    height: 108rpx;
    bottom: 0;

    > view {
      text-align: center;
      line-height: 108rpx;
      width: 278rpx;
    }
  }

  .codepass {
    font-size: 34rpx;
    font-weight: 500;
    color: #333333;
    text-align: center;
  }

  .codeinput {
    width: 556rpx;
    height: 80rpx;
    margin: 30rpx auto;
    background: #F5F5F5;
    border-radius: 10rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
  }
}

.importbox,
.mystyle {
  padding: 0 30rpx;
  margin-top: 50rpx;

  .setdemo {
    width: 630rpx;
    padding: 30rpx;
    height: 204rpx;
    background: #F5F5F5;
    border-radius: 10rpx;
    margin: 30rpx 0 40rpx 0;

    input {
      padding: 0 18rpx;
      box-sizing: border-box;
    }

    .gas {
      font-size: 22rpx;
      font-weight: 500;
      color: #999999;
    }

    .timei {
      font-size: 24rpx;
      font-weight: 500;
      color: #333333;
      text-align: end;
    }

    input {
      width: 304rpx;
      height: 80rpx;
      background: #FFFFFF;
      border-radius: 10rpx;
      margin: 20rpx 0 40rpx 0;
    }
  }

  .set {
    line-height: 196rpx;
    text-align: center;
  }

  .transdemo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 164rpx;
    height: 196rpx;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 10rpx;
    position: relative;
    justify-content: center;
    margin: 10rpx;
    .select {
      position: absolute;
      top: -2rpx;
      right: -2rpx;
      width: 30rpx;
      height: 24rpx;
    }

    .demofont {
      font-size: 30rpx;
      font-weight: 500;
      color: #666666;
      height: 40rpx;
      line-height: 60rpx;
    }

    .demofonts {
      font-size: 20rpx;
      font-weight: 500;
      color: #B3B3B3;
      margin: 28rpx 0 24rpx 0;

      > view {
        text-align: center;
      }
    }

    .demofontsub {
      font-size: 20rpx;
      font-weight: 500;
      color: #666666;
      text-align: center;
      line-height: 40rpx;
      width: 100%;
      border-top: 1px solid #D9D9D9;
    }
  }

  .all {
    display: inline-block;
    width: 80rpx;
    height: 36rpx;
    background: #FFFFFF;
    border: 1px solid #B3B3B3;
    border-radius: 18rpx;
    text-align: center;
    line-height: 36rpx;
    font-size: 26rpx;
    color: #999999;
    position: absolute;
    right: 0;
    top: 10rpx;
  }

  .moenyval {
    position: relative;
  }


  .input-item {
    height: 178rpx;

    .i-items {
      height: 68rpx;
      border-bottom: 1px solid #E6E6E6;
    }
  }

  .font-co {
    font-size: 26rpx;
    font-weight: 500;
    color: #2DA5E1;
  }

  .tip {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
    text-align: right;
  }
}

.commonfont {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
  margin: 30rpx 0;
}

.nosubmit {
  margin: 60rpx auto;
  padding-bottom: 20rpx;
  width: 690rpx;
  height: 96rpx;

  background: #2DA5E1;
  box-shadow: 0px 2px 10px 0px rgba(23, 119, 226, 0.4);
  opacity: 0.5;
  border-radius: 100rpx;
  font-size: 30rpx;
  line-height: 96rpx;
  color: #fff;
}

.cust {
  font-size: 30rpx;
  font-weight: 500;
  color: #666666;
  line-height: 62rpx;
}

.box-state {
  margin: 30rpx 40rpx;
  height: 350rpx;
  width: 680rpx;
  background-color: #F5F6F8;
  border-radius: 12rpx;
}

.flex-j-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.uni-input {
  width: 280rpx;
  height: 70rpx;
  background-color: white;
  border-radius: 12rpx;
  padding: 10rpx;
}

.box-input {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10rpx;
}

.text-stay {
  padding: 30rpx
}

.text-box {
  display: flex;
  margin-right: 96rpx;
  justify-content: space-around;
}

.mode-box {
  display: flex;
  justify-content: space-between;
}

.arrow {
  position: relative;
  transform: translate(195rpx, 20rpx);
}

.box-back {
  display: flex;
}

.left {
  padding: 14rpx 14rpx 14rpx 24rpx;
}
</style>
