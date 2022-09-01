<template>
	<view :class="[btn === false?'index':'index-night']">
		<view class="index-content" v-if="walletInfo">
			<view :class="[btn === false?'header flexs headpiece':'header-night flexs headpiece']">
				<view class="changes flexs header-img" @click="open">
					<span style="margin-left: 20rpx;width:70%;" class="text-sty">{{walletInfo.name}}</span>
					<span>
						<image class="icon-switch" :src="[btn === false?require('../../static/index/31right.png'):require('../../static/index/night/fh-n.png')]"></image>
					</span>
				</view>
				<view class="flexs headerimg">
					<image :src="[btn === false?require('../../static/index/money.png'):require('../../static/index/night/qb-n.png')]" @click="goTo('/pages/index/addcreate?type=1')" mode=""></image>
					<!-- <image src="/static/index/sao.png" @click="scan()" mode=""></image> -->
				</view>
			</view>

			<view class="card-content">
				<view class="totalbox columns">
					
					<image :src="btn === false?require('../../static/index/totalbg.png'):require('../../static/index/night/card-n.png')" class="bgiimg" mode=""></image>
					<image src="/static/index/diamond.png"  class="diamond"></image>
					
					<view class="totalp" @click="goTo(`/pages/wallet/walletDetail?id=${walletInfo.id}`)">
						<view class="totalh flexs">
							<view class="flexs " style="align-items: center;">
								<view style="margin-right: 20rpx;font-size: 28rpx;font-weight: lighter;" class="assets">
									{{ $t("home.txt2", ["我的资产"])}}
								</view>
								<!-- x显示 隐藏 资产 -->
								<image class="look" src="/static/index/look.png" v-if="showMoney"
									@click.stop="showMoney=false" alt="">
									<image class="look" src="/static/index/nolook.png" v-else
										@click.stop="showMoney=true" alt="">
							</view>
							<view :class="[btn===false?'moneydetail flexs':'moneydetail-night flexs']">
								<!-- <span
									:style="{fontSize:$i18n.locale == 'en-US'?'22rpx':''}">{{$t("home.txt3", ["钱包详情"]) }}</span> -->
								<image style="margin-left: 8rpx;margin-top: 6rpx;" class="righta"
                       :src="btn === false?require('../../static/index/right3.png'):require('../../static/index/night/xq-n.png')" alt="">
									<view class="details">
										详情
									</view>
							</view>
						</view>
						<view class="moneyval">
							<span v-if="showMoney" class="number">${{totalMoney.toFixed(4)}}</span>
							<span v-else>****</span>
						</view>
						<view class="moneydemo flexs">
							<!-- 		<view style="opacity: 0.6;">
								{{ $t("home.txt4", ["收付有礼 持续进行中"])}}
							</view> -->
							<!-- <image src="/static/index/daizi.png" style="width:84rpx ;height:94rpx;margin-left: 10rpx;" mode=""></image> -->
							<!-- <image src="/static/index/topW.png" class="topW animate__swing animate__animated animate__infinite " 
								mode="">
							</image> -->
						</view>
						
						<view class="dotted-line"></view>
						<view class="totalfooter flexs tex-ion" :style="{fontSize:$i18n.locale == 'en-US'?'22rpx':'26rpx'}">
							<view class="rows" @click.stop="goTo('userMoney')" style="margin-right: 20rpx;">
								<image src="/static/index/total31.png" alt="" class="inc">
									<span style="margin-left: 12rpx;" class="text-loction"> {{
								  $t("home.txt5", ["转账"])
								}}</span>
							</view>
							<view class="line"></view>
							<view class="rows take-in" @click.stop="goTo('getMoney')">
								<image :src="btn === false?require('../../static/index/shoukuan1.png'):require('../../static/index/night/sk-n.png')" alt="" class="inc">
									<span style="margin-left: 12rpx;" class="text-loction">{{
								  $t("home.txt6", ["收款"])
								}}</span>
							</view>
							<!-- <view class="line"></view> -->
							<!-- <view class="flexs rows " @click.stop="goTo('bitExchange')">
								<image src="/static/index/zhuan.png" alt="" class="inc">
									<span style="margin-left: 12rpx; font-size: 28rpx;" class="text-loction">{{
								  $t("home.txt7", ["闪兑"])
								}}</span>
							
							</view> -->
						</view>
					</view>
				</view>
			</view>
			<view class="search flexs" style="padding: 0 32rpx">
				<view class="flexs " style="align-items: center;">
					<!-- <view class="line2"></view> -->
					<view class="vertical"></view>
					<view :class="[btn === false?'vertical-text':'vertical-text-night']" >
						{{walletInfo.category_name}}{{$t("home.txt8", ["资产"])}}
					</view>
					<!-- <u-icon @click="refreshWalletkBalance()" name="reload" style="margin-left: 10rpx;" size="30"> -->
					</u-icon>
				</view>
				<view class="flexs">
					<!-- <view style="width: 200rpx;">
						<u-search :placeholder="searchText
								  
								" bg-color="#EEF6FF" :show-action="false" placeholder-color="#9CC9FF" shape="square"
							search-icon-color="#2DA5E1" v-model="keyword" action-text="" @search="searchBank()"
							height="64"></u-search>
					</view> -->
					<view class="addbit">
						<image :src="btn === false?img:img1"
							style="width: 65rpx;height: 65rpx;margin-right: 15rpx; top: 4rpx;"@click="goTo('/pages/index/hotToken')"></image>
						<image  :src="btn === false?require('../../static/index/add.png'):require('../../static/index/night/add-n.png')" style="width: 65rpx;height: 65rpx; top: 4rpx;" mode=""
							@click="goTo('/pages/index/hotToken')"></image>
					</view>
				</view>
			</view>
			<view class="showlist" style="overflow-y: scroll;">
				<view class="goods columns" style="padding: 0 32rpx;">
					<!-- {{coinLists}} -->
					<view :class="[btn === false?'goods-items flexs':'goods-items-night flexs']" v-for="(item,index) in coinLists" :key="index"
						@click="goTo(`/pages/index/TokenDetails?info=${JSON.stringify(item)}`)">
						<view class="log flexs">
							<image class="logo" :src="item.icon" mode=""></image>
							<view>{{item.symbol}}</view>
						</view>
						<view class="flexs logr">
							<view class="whole">
								<view class="logr-t">{{item.balance.toFixed(5) }}</view>
								<view style="font-size: 22rpx; color: #999999;" class="value-yuan">${{item.value.toFixed(2) }}</view>
							</view>
							<!-- <image src="/static/index/right2.png" class="rightD" mode=""></image> -->
						</view>
					</view>
				</view>

			</view>
		<!-- 	<image src="/static/us1.png" class="ad" @click="goTo('/pages/agreement?type=4')"
				v-if="$i18n.locale == 'en-US'">
			</image>
			<image src="/static/index/ad.png" class="ad" @click="goTo('/pages/agreement?type=4')" v-else></image>
 -->			<wallet ref="wallet" @changeWallet="changeWallet"></wallet>
		</view>
		<view v-else>

			<image src="/static/index/noWallet.png" style="width: 750rpx;height: 750rpx;margin-left: 0rpx;" mode="">
			</image>
			<view class="noWallet">
				<view class="noWallettitle">{{ $t("home.txt10", ["数字资产钱包"])}}</view>
				<view class="noWallettip">{{ $t("home.txt11", ["支持多条主链生态"])}}</view>
				<view class="flex-j-right" @click="goTo('/pages/index/addcreate?type=2')" style="padding: 30rpx;">
					<view class="flex-j-right">
						<image src="/static/index/tip1.png" style="width: 50rpx;height: 48rpx;" mode=""></image>
						<view style="margin-left: 20rpx;">
							<view style="font-size: 30rpx;font-weight: 500;color: #333333;">{{
								  $t("home.txt12", ["我有钱包"])
								}}</view>
							<view style="font-size: 26rpx;font-weight: 500;color: #999;">{{
								  $t("home.txt13", ["导入钱包"])
								}}</view>
						</view>
					</view>
					<u-icon name="arrow-right" size="30"></u-icon>
				</view>
				<view style="height: 1px; width: 620rpx;margin-left: 100rpx;background-color: #f1f1f1;"></view>
				<view class="flex-j-right" @click="goTo('/pages/index/addcreate?type=1')" style="padding: 30rpx;">
					<view class="flex-j-right">
						<image src="/static/index/tip2.png" style="width: 50rpx;height: 48rpx;" mode=""></image>
						<view style="margin-left: 20rpx;">
							<view style="font-size: 30rpx;font-weight: 500;color: #333333;">
								{{ $t("home.txt14", ["我没有钱包"])}}
							</view>
							<view style="font-size: 26rpx;font-weight: 500;color: #999;">{{ $t("home.txt15", ["创建钱包"])}}
							</view>
						</view>
					</view>
					<u-icon name="arrow-right" size="30"></u-icon>
				</view>
			</view>
		</view>
		<!-- 		<view class="modal-content-pwd" v-if="isPassword && password && isTimestamp > 0">
			<view class="modal-content-view">
				<view class="title">{{ $t("home.txt141", ["请输入安全密码"])}}</view>
				<view class="input-box">
					<input password v-model="pass" class="codeinput"  />
				</view>
				
				<view class="btn flex-center color-r font-l" :class="pass ?'btn1':''" @click="clickTo()">{{$t('hisbag.txt64',['确定'])}}</view>
			</view>
		</view> -->
		<u-toast ref="uToast" />
		<!-- 版本更新 -->
		<view v-if="isUpdata" @click="isUpdata=true"
			style="height: 100vh;width: 100%; position: fixed;top: 0upx;left: 0;display: flex;align-items: center;justify-content: center;z-index: 77777777;">
			<view class=""
				style="background: #000000;z-index: 66666;opacity: 0.5;width: 100%;height: 100vh;position: fixed;position: fixed;top: 0upx;z-index: 7777777777777;">

			</view>
			<view class="upbg" @click.stop style="z-index: 99999999999999999;">

				<view class="" v-if="IsReadyUpdate" style="position: relative;">
					<image src="/static/upDataBg.png" mode="" style="width: 570upx;height: 742upx;"></image>
					<view class="" style="position: absolute;top: 282upx;left: 0;">
						<view class=""
							style="color: #FE4351;font-size: 36upx;font-weight:800;width: 570upx;text-align: center;">
							{{this.$t('ibinz.msg150',['发现新版本'])}}
						</view>
						<view class="" style="margin: 47upx auto 29upx 40upx;">
							{{this.$t('ibinz.msg151',['本次版本更新内容'])}}
						</view>

						<view class="" style="line-height: 36upx;margin-left: 40upx;width: 436upx;font-size: 28upx;">
							{{updateInfo.script}}
						</view>
						<view class="updateBtn"
							style="margin-left: 40upx;display: flex;justify-content: flex-start;margin-top: 46upx;">
							<view class="btnup btn1" @click="closeUpdata">
								{{this.$t('ibinz.msg152',['暂不升级'])}}
							</view>
							<view class="btnup btn2" @click="updata">
								{{this.$t('ibinz.msg153',['立即升级'])}}
							</view>
						</view>
					</view>
				</view>
				<view v-else
					style="width: 570upx;height: 482upx;background: #FFFFFF;display: flex;justify-content: center;align-items: center;flex-direction: column;border-radius: 15upx;">
					<view class=""
						style="height: 143upx;line-height: 143upx;color: #1A1A1A;font-size: 36upx;font-weight: 800;">
						{{this.$t('ibinz.msg154',['版本更新'])}}
					</view>
					<view class="" style="color: #1A1A1A;font-size: 30upx;">
						{{this.$t('ibinz.msg155',['正在为您更新，请耐心等待'])}}
					</view>
					<view class="progress-box" style="margin-top: 102upx;width: 476upx;margin-bottom: 62upx;">
						<progress :percent="updateProgress" activeColor="#FE4351" show-info stroke-width="3" />
					</view>
					<view
						style="width: 476upx;height: 75upx;line-height: 75upx;text-align: center;color: #666666;font-size: 30upx;border:1px solid rgba(230,230,230,1);margin-bottom: 40upx;"
						@click="cancelUpdate">{{this.$t('ibinz.msg156',['取消下载'])}}</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script lang="ts">

	import {
		Assets
	} from "@/decorator/wallet"
	import {
		Component,
		Vue
	} from "vue-property-decorator";
	import {
		md5,
		request
	} from "@/m-subpack/base";

	import {
		changeApi
	} from "@/config";

	import wallet from "@/components/wallet.vue"
	let downloadTask: any = {}

	@Component({
		components: {
			wallet
		}
	})
	@Assets()
	export default class Idnex extends Vue {
    data(){
      return{
        btn: localStorage.getItem("btn") === "true",
        img:require('../../static/index/search.png'),
        img1:require('../../static/index/night/find-n.png'),
      }
    };
		token = '';
		showMoney = true;
		pass: any = '';
		versionCode = '';
		isUpdata = false;
		isPassword = false;
		isTimestamp = null;
		password = uni.getStorageSync('password'); //获取是否有原密码
		updateInfo = {}; //具体更新的内容
		walletInfo = uni.getStorageSync("currentWallet");
		IsReadyUpdate = true;
		updateProgress = 0;
    totalMoney = 0
		coinLists = [];
		onShow() {
      if (this.isTx()) {
        uni.hideTabBar();
      }
		  this.walletInfo = uni.getStorageSync("currentWallet")
      this.token = uni.getStorageSync("token");
			this.isPassword = uni.getStorageSync("isPassword");
			this.isTimestamp = uni.getStorageSync("isTimestamp");
			if (uni.getStorageSync("currentWallet").id) {
				this.getCoinAllList();
			}
			this.init();
			// #ifdef APP-PLUS
			const _this = this;
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				_this.versionCode = wgtinfo.version;
				_this.getUpdate()
			})
			// #endif

			uni.setTabBarItem({
				index: 0,
				text: this.$t("index", ["资产"]),
			})
			uni.setTabBarItem({
				index: 1,
				text: this.$t("markets", ["市场"]),
			})
			uni.setTabBarItem({
				index: 2,
				text: this.$t("finds", ["发现"]),
			})
			uni.setTabBarItem({
				index: 3,
				text: this.$t("messages", ["电报"]),
			})
			uni.setTabBarItem({
				index: 4,
				text: this.$t("my", ["我的"]),
			})


		}
		//所有钱包地址
		async getCoinAllList() {
			let coinList = {};
      // console.log(this.walletInfo,'-0---------------');
      let _coinList = coinList[this.walletInfo.id] || [];
			if (_coinList.length == 0) {

				let {
					data,
					errorMessage
				} = await request({
					url: '/walletGetCoinBalanceByWalletId',
					method: 'get',
					data: {
						"wallet_id": this.walletInfo.id,
					}
				})
				_coinList = data.list;
				this.coinLists = _coinList;
        this.totalMoney = data.sum_value;

			}

			this.coinLists = _coinList;
			uni.setStorageSync("isHot", 0);


			coinList[this.walletInfo.id] = _coinList;

		}
		cancelUpdate() {
			var _this = this;
			uni.showModal({
				content: _this.$t('ibinz.msg157', ['是否停止更新']),
				success: res => {
					if (res.confirm) {
						downloadTask.abort();
						_this.isUpdata = false
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
		closeUpdata() {
			this.isUpdata = false
		}
		updata() {
			this.IsReadyUpdate = false;
			var _this = this;
			console.log(downloadTask, 'xx')
			console.log(_this.updateInfo, 'xxww')
			downloadTask = uni.downloadFile({
				url: _this.updateInfo.packUrl, //仅为示例，并非真实的资源
				success: (downloadResult) => {
					if (downloadResult.statusCode === 200) {
						if (downloadResult.statusCode === 200) {
							console.log(downloadResult);
							uni.showLoading({
								title: _this.$t('ibinz.msg158', ['正在更新...'])
							})
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {
								uni.hideLoading();

								plus.runtime.restart();
							}, function(e) {
								uni.hideLoading();
								uni.showModal({
									content: e.message,
									showCancel: false,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							});
						}
					}
				},
				complete: function() {

					_this.isUpdata = false;
				}
			});
			console.log(downloadTask, 'xx')
			downloadTask.onProgressUpdate((res) => {
				_this.updateProgress = res.progress;

			});
		}

		async clickTo() {
			if (this.password.length > 30) {
				if (md5(this.pass) == this.password) {
					this.isPassword = false;
					uni.setStorageSync("isPassword", false);
				} else {
					uni.showToast({
						title: this.$t('home.txt146', ["安全密码不正确"]),
						icon: 'none',
						duration: 1000
					})
				}
			} else {
				if (this.pass == this.password) {
					this.isPassword = false;
					uni.setStorageSync("isPassword", false);
				} else {
					uni.showToast({
						title: this.$t('home.txt146', ["安全密码不正确"]),
						icon: 'none',
						duration: 1000
					})
				}

			}


		}
		async getUpdate() {
			var _this = this;
			plus.runtime.getProperty(plus.runtime.appid, async (wgtinfo) => {
				let url = "/getApp"
				let appName = "DUOLAIMI"
				let versionCode = wgtinfo.version

				var os = uni.getSystemInfoSync().platform;


				var params = {
					appName: appName,
					os: os,
					versionCode: versionCode
				}


				const {
					data
				} = await request({
					url,
					method: "post"
				});
				changeApi(data.api_domain);
				if (os == "ios") return;

				console.log('域名地址', data.api_domain)
				if (data.version > wgtinfo.version) {

					_this.isUpdata = true;
					_this.IsReadyUpdate = true;
					_this.updateInfo = {
						packUrl: data.download_url,
						script: data.script
					}
					_this.updata();
				}

			})
		}



		goTo(url) {
      this.toPage(url)
		}

		open() {
			this.$refs.wallet.changeMoney()
		}

		changeWallet(item ? : any) {
			this.changeCurrentWallet(item);

		}


	}
</script>

<style scoped lang="scss">
	
	html,body { font-family: myFont, sans-serif; }

	.icon-switch {
		width: 12rpx;
		height: 21rpx;
		margin-left: -56rpx;
		position: relative;
		transform: translate(32rpx, 14rpx);
	}

	.ad {
		position: fixed;
		bottom: 0;
	}

	.showlist {
		padding-bottom: 200rpx;
		left: 51rpx;
	}

	.animate__animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	.animate__animated.animate__infinite {
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
	}

	@-webkit-keyframes swing {
		20% {
			-webkit-transform: rotate3d(0, 0, 1, 15deg);
			transform: rotate3d(0, 0, 1, 15deg);
		}

		40% {
			-webkit-transform: rotate3d(0, 0, 1, -10deg);
			transform: rotate3d(0, 0, 1, -10deg);
		}

		60% {
			-webkit-transform: rotate3d(0, 0, 1, 5deg);
			transform: rotate3d(0, 0, 1, 5deg);
		}

		80% {
			-webkit-transform: rotate3d(0, 0, 1, -5deg);
			transform: rotate3d(0, 0, 1, -5deg);
		}

		to {
			-webkit-transform: rotate3d(0, 0, 1, 0deg);
			transform: rotate3d(0, 0, 1, 0deg);
		}
	}

	@keyframes swing {
		20% {
			-webkit-transform: rotate3d(0, 0, 1, 15deg);
			transform: rotate3d(0, 0, 1, 15deg);
		}

		40% {
			-webkit-transform: rotate3d(0, 0, 1, -10deg);
			transform: rotate3d(0, 0, 1, -10deg);
		}

		60% {
			-webkit-transform: rotate3d(0, 0, 1, 5deg);
			transform: rotate3d(0, 0, 1, 5deg);
		}

		80% {
			-webkit-transform: rotate3d(0, 0, 1, -5deg);
			transform: rotate3d(0, 0, 1, -5deg);
		}

		to {
			-webkit-transform: rotate3d(0, 0, 1, 0deg);
			transform: rotate3d(0, 0, 1, 0deg);
		}
	}

	.animate__swing {
		-webkit-transform-origin: top center;
		transform-origin: top center;
		-webkit-animation-name: swing;
		animation-name: swing;
	}

	.topW {
		width: 64rpx;
		height: 64rpx;
		margin-left: 18rpx;
	}

	.index {
		width:auto;
    height: 94vh;
		display: flex;
    flex-direction: column;
    align-items: center;
	}
  .index-night{
    width:auto;
    height: 94vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    //background-image: url("/static/my/bj.png");
    //background-size: 100% 100%;
  }
  .index-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .card-content{
    //margin-top: 40rpx;
    width: 100%;
    display: flex;
    justify-content: center
  }

	.noWallet {
		width: 750rpx;
		//height: 630rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		//margin-left: -30rpx;
		margin-top: -56rpx;
		position: absolute;

		.noWallettitle {
			font-size: 34rpx;
			font-weight: bold;
			color: #333333;
			margin-left: 30rpx;
			margin-top: 40rpx;
		}

		.noWallettip {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			margin-left: 30rpx;
		}
	}

	.commonfont {
		font-size: 24rpx;
		font-weight: 500;
		color: #2DA5E1;
	}

	.commonfonts {
		font-size: 24rpx;
		font-weight: 500;
		color: #999999;
	}

	.otherMoney {
		width: 750rpx;
		height: 296rpx;
		background: #FFFFFF;

		>view {
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
				font-size: 28rpx;
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
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
		}
	}

	.ad {
		width: 690rpx;
		height: 130rpx;
		min-height: 130rpx;
		// padding-bottom: 20rpx;
	}

	.goods {

		.goods-items {
			width: 690rpx;
			height: 100rpx;
			background: #FFFEFF;
			// box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
			// border-radius: 20rpx;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #EFEFEF;
			display: flex;
			flex-wrap: nowrap;
			align-content: center;
			
			.logr {
				align-items: center;

				.logr-t {
					font-size: 34rpx;
					// font-weight: bold;
					color: #333333;
					// position: relative;
					// transform: translate(60rpx, -27rpx);
					display: flex;
					align-items: center;
				}

				.logr-s {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}
			}

			.log {
				align-items: center;
				// padding-left: 30rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
				position: relative;
				display: flex;
				align-content: center;
			}

			.logo {
				width: 70rpx;
				height: 70rpx;
				margin-right: 16rpx;
			}

			.rightD {
				width: 40rpx;
				height: 40rpx;
				margin-right: 30rpx;
				margin-left: 38rpx;
			}
		}
    .goods-items-night {
      width: 690rpx;
      height: 100rpx;
      color: #FFFFFF;
      // box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
      // border-radius: 20rpx;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #EFEFEF;
      display: flex;
      flex-wrap: nowrap;
      align-content: center;

      .logr {
        align-items: center;

        .logr-t {
          font-size: 34rpx;
          // font-weight: bold;
          color: #FFFFFF;
          // position: relative;
          // transform: translate(60rpx, -27rpx);
          display: flex;
          align-items: center;
        }

        .logr-s {
          font-size: 24rpx;
          font-weight: 500;
          color: #FFFFFF;
        }
      }

      .log {
        align-items: center;
        // padding-left: 30rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #FFFFFF;
        position: relative;
        display: flex;
        align-content: center;
      }

      .logo {
        width: 70rpx;
        height: 70rpx;
        margin-right: 16rpx;
      }

      .rightD {
        width: 40rpx;
        height: 40rpx;
        margin-right: 30rpx;
        margin-left: 38rpx;
      }
    }
	}

	.search {
		height: 64rpx;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		
		.addbit {
			// width: 64rpx;
			// height: 64rpx;
			// background: #EEF6FF;
			// border-radius: 15rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			// justify-content: center;
			margin-left: 20rpx;
		}

		.line2 {
			width: 8rpx;
			height: 32rpx;

			background: linear-gradient(0deg, #0263FF, #17A7F8);
			border-radius: 4rpx;
		}

	}

	.totalbox {
		width: 710rpx;
		height: 326rpx;
		color: #FFFFFF;
		position: relative;

		.bgiimg {
			width: 710rpx;
			height: 326rpx;
      border: #FFFFFF solid 1px;
      border-radius: 30rpx;
			position: absolute;
			// top: -40rpx;
		}

		.moneydemo {
			font-size: 28rpx;
			font-weight: 400;
			align-items: center;
			color: #FFFFFF;
			height: 80rpx;
		}

		.moneyval {
			font-size: 50rpx;
			font-weight: 800;
			color: #FFFFFF;
			height: 70rpx;
			position: relative;
			left: 20rpx;
			top: 20rpx;
		}

		.totalp {
			position: absolute;
			z-index: 11;
			width: 714rpx;
			height: 344rpx;
			// top: -40rpx;
			>view {
				margin-left: 30rpx;
				margin-right: 30rpx;
			}
		}

		.totalh {
			margin-top: 20rpx;
			font-size: 24rpx;
			height: 60rpx;
			justify-content: space-between;
			align-items: center;

			.moneydetail {
				font-size: 30rpx;
				color: #2DA5E1;
				align-self: flex-start;
			}
      .moneydetail-night {
        font-size: 30rpx;
        color: #FFFFFF;
        align-self: flex-start;
      }
		}



		.look {
			width: 26rpx;
			height: 20rpx;
			position: relative;
			top: 20rpx;
			left: 11rpx;
		}

		.righta {
			width: 25rpx;
			height: 25rpx;
			margin-right: 25rpx;
			position: relative;
			left: 68rpx;
			top: 14rpx;
		}

		.totalfooter {
			height: 100rpx;
			align-items: center;
			justify-content: space-around;
			right: 14rpx;

			.line {
				width: 1px;
				height: 34rpx;
				background: #FFFFFF;
				opacity: 0.6;
			}

			image {
				width: 42rpx;
				height: 42rpx;
				margin-right: 12rpx;
				padding-top: 12rpx;
			}
		}
	}

	.header {
		height: 90rpx;
		align-items: flex-end;
		justify-content: space-between;
		padding-top: var(--status-bar-height);
		position: sticky;
		top: 0;
		z-index: 999;
		background-color: #fff;
		margin: 0 -30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 20rpx;

		.changes {
			width: 118rpx;
			height: 65rpx;
			background: #3B86F6;
			border-radius: 32rpx;
			color: #F3F3F3;

			font-size: 25.17rpx;
			// font-weight: 62;
			// line-height: 20rpx;
			justify-content: space-between;

			.text-sty {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				position: relative;
				top: 14rpx;
			}
		}

		.headerimg {
			image {
				width: 48rpx;
				height: 48rpx;
				right: 12rpx;
			}
		}

	}
  .header-night {
    height: 90rpx;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: var(--status-bar-height);
    position: sticky;
    top: 0;
    z-index: 999;
    margin: 0 -30rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    padding-bottom: 20rpx;

    .changes {
      width: 118rpx;
      height: 65rpx;
      border-radius: 32rpx;
      border: #FFFFFF 1px solid;
      color: #F3F3F3;
      font-size: 25.17rpx;
      // font-weight: 62;
      // line-height: 20rpx;
      justify-content: space-between;

      .text-sty {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        top: 14rpx;
      }
    }

    .headerimg {
      image {
        width: 48rpx;
        height: 48rpx;
        right: 12rpx;
      }
    }

  }
	.rows{
		
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		top: 8rpx;
		position: relative;
		left: 30rpx;
	}

	.flexs {
		display: flex;
		flex-direction: row;
		font-size: 36rpx;
		justify-content: space-between;
		font-weight: 500rpx;

		.btns {


			width: 332rpx;
			height: 72rpx;
			line-height: 72rpx;
			margin-top: 40rpx;
			font-size: 28rpx;
			text-align: center;
			// background: rgba(45, 165, 225, 0.2);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			opacity: 1;

			image {
				width: 44rpx;
				height: 44rpx;
				
			}
		}
	}

	.columns {
		display: flex;
		flex-direction: column;
	}

	.modal-content-pwd {
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		color: #222;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: CENTER;

		.modal-content-view {

			// margin-top: 200rpx;
			padding: 0 30rpx;

			.title {
				text-align: center;
				font-size: 40rpx;
			}

			.input-box {
				padding: 42rpx 0;
				border-bottom: 1px solid #DCDCDC;
				color: #999;
			}


			.input-box {
				padding: 42rpx 0;
				border-bottom: 1px solid #DCDCDC;
			}

			.btn {
				width: 650rpx;
				height: 96rpx;
				margin: 80rpx auto 50rpx;
				box-sizing: border-box;
				border-radius: 48rpx;

				background: #2DA5E1;
				box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
			}
		}

	}
	
	.details {
		position: relative;
		right: 50rpx;
		top: 11rpx;
	}
	
	.assets {
		position: relative;
		left: 20rpx;
		top: 20rpx;
	}
	
	.number {
		font-size: 48rpx;
		color: #FFFFFF;
		// font-family:  PingFangSC-Ultralight, sans-serif;
		font-weight: bold;
		letter-spacing:5rpx;
	}

	.inc {
		position: relative;
	    top: -20rpx;
		width: 39rpx;
		right: -12rpx;
	}
	
	.vertical {
		width: 8rpx;
		height: 28rpx;
		background: linear-gradient(14deg, #4EADF7, #32CCF2, #43B0EF);
		border-radius: 8rpx;
		left: 32rpx;
	}
  .vertical-text{
    font-weight: bold;
    color: black;
  }
  .vertical-text-night {
    font-weight: bold;
    color: #FFFFFF;
  }
	
	.header-img {
		position: relative;
		transform: translate(20rpx, 10rpx) !important;
	}
	
	//.headpiece {
	//	position: relative;
	//	transform: translate(-2rpx, 30rpx) !important;
	//}
	
	.diamond {
		width: 81rpx;
		height: 81rpx;
		position: relative;
		transform: translate(590rpx, 120rpx);
	}
	
	.dotted-line {
		border-top:white 1px dashed;
		width: 690rpx;
		opacity: 0.3;
		position: relative;
		left: -10rpx;
	}
	
	.tex-ion {
		position: relative;
		transform: translateX(20rpx);
	}
	
	.text-loction {
		position: relative;
		transform: translateY(-14rpx);
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
	}
	

	
	.take-in {
		left: -20rpx;
	}
	
	.name {
		position: relative;
		left: 22rpx;
	}
	
	.whole {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
	}
	
	.flex-j-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

  .uni-tabbar.uni-tabbar-bottom .uni-tabbar {
    position: fixed !important;
    bottom: 0 !important;
  }
</style>
