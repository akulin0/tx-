<template>
	<base-layout class="main">
		<u-navbar :is-back="false" :is-fixed="true" :border-bottom="true">
			<view class="navbar">
				<view class="flex1">
				<!-- 	<view class="item" v-for="(item, index) in topNav" :key="index"
						:class="{ active: index == topNavCur }" @click="selectTopNav(index)">{{item.name}}</view> -->
					<view class="item" v-for="(item, index) in topNav" :key="item.query.type"
						:class="{ active: item.query.type == topNavCur }" @click="selectTopNav(item.query.type)">{{item.name}}</view>
				</view>
				<image class="icon" src="/static/find/ic-search.png" @click="goTo('/pages/find/search')"></image>
			</view>
		</u-navbar>
		<!-- DAPP页面 -->
		<view v-if="topNavCur == 1">
			<!-- 轮播 -->
			<view class="banner">
				<u-swiper class="full" v-if="$i18n.locale == 'en-US'" mode="rect" effect3d circular border-radius="25"
					img-mode="scaleToFill"></u-swiper>
				<u-swiper class="full" v-else :list="bannerList" mode="rect" effect3d circular border-radius="25"
					img-mode="scaleToFill"></u-swiper>
			</view>
			<!-- 我的DApps -->
			<view class="flex-row" style="padding:20rpx 30rpx;" v-if="isLogin && myList.length > 0">
				<view class="mainTitle">{{ $t('my', ['我的']) }}DApps</view>
				<view class="flex-r color-main font-m" @click="goTo('/pages/find/myDApps')">
					<view>{{ $t('find.msg5', ['更多']) }}</view>
					<image src="/static/my/more.png" style="width: 14rpx;height: 24rpx;margin-left: 13rpx;" mode="">
					</image>
				</view>
			</view>
			<DApps :list="myList" @goApp="goApp"></DApps>
			<!-- 热门推荐 -->
			<view style="padding:20rpx 30rpx;" class="mainTitle">{{ $t('find.msg6', ['热门推荐']) }}</view>
			<DApps :list="hotList" @goApp="goApp"></DApps>

			<!-- 广告位 -->
			<view class="adBox">
				<image class="item" src="/static/find/ad-1.png"></image>
				<image class="item" src="/static/find/ad-2.png"></image>
			</view>
			<!-- 收付有礼 抱一抱 -->
			<!-- 	<view class="section-view flex-row" v-if="$i18n.locale == 'en-US'">
				<image
					:src="item"
					mode=""
					v-for="(item, index) in actionListUs"
					:key="index"
					@click="goTo('/pages/find/detail?type=' + index)"
					style="width: 330rpx;height: 176rpx;"
				></image>
			</view> -->

			<!-- 		<view class="section-view flex-row" v-else>
				<image
					:src="item"
					mode=""
					v-for="(item, index) in actionList"
					:key="index"
					@click="goTo('/pages/find/detail?type=' + index)"
					style="width: 330rpx;height: 176rpx;"
				></image>
			</view> -->
			<!-- tabs -->
			<view style="margin: 0 30rpx;">
				<u-tabs :list="tabList" :current="tabCur" :font-size="32" @change="change"
					active-color="#000000" inactive-color="#848484" :bar-style="{background:'#3678F5'}" is-scroll></u-tabs>
			</view>
			<!-- list列表 -->
			<view class="bottom-content">
				<AppList hideBorder :list="appList" @go="goApp"></AppList>
				<view @click="checkMore" class="look-more flex-r" v-if="appList.length !== 0">
					<view style="color: #2DA5E1;">{{ $t('find.msg7', ['查看更多']) }}</view>
					<image src="/static/index/right3.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<!--快讯 组件  -->
		<News :dateList="timeList" :newsList="dateList" v-if="topNavCur == 2" @share="share"></News>
		<!--文章 组件  -->
		<Article :list="articleList" v-if="topNavCur == 3" @toDetail="toDetail"></Article>
		<!--应用中心 组件  -->
		<Appcenter v-if="topNavCur == 4" @toCenter="toCenter"></Appcenter>
		
		<!-- 点击跳转第三方app提示-弹框 -->
		<u-modal v-model="showMSg" :content="content" :title="modalTitle" :show-cancel-button="true"
			:confirm-text="modalText" :cancel-text="cancelText" :mask-close-able="true" @confirm="goPage(1)"
			:title-style="titleSty" :content-style="contentSty"></u-modal>
		<!-- 不支持当前钱包弹框 -->
		<u-modal v-model="isShow" :title="modalTitle1" :mask-close-able="true" :content="content1"
			:show-cancel-button="true" :cancel-text="cancelText" :confirm-text="modalText1" @confirm="goPage(2)">
		</u-modal>
		<!-- 选择钱包弹框 -->
		<wallet ref="wallet" @changeWallet="changeWallet" :category="category" :type="type"></wallet>
	</base-layout>
</template>
<script>
	import wallet from '@/components/wallet2.vue';
	import _ from 'lodash';
	import { infoRequest, jsonToParams, isLogin, request } from '@/m-subpack/base';
	import { checkLogin } from '@/m-common/common';
	import Article from '@/components/article.vue';
	import News from '@/components/news.vue';
	import Appcenter from '@/components/appcenter.vue';
	import AppList from '@/components/appList.vue';
	import DApps from '@/components/DApps.vue';
	// import CryptoJS from "crypto-js";
	import openPage from '@/js/flutter/openPage.js';
  import {isTx, toPage} from '../../libs/utils';

	export default {
		data() {
			return {
				type: 1,
				walletInfo: {}, //当前选中的钱包
				item: {}, //DApp详情
				topNavCur: 1, //顶部tab默认值
				placeholder: this.$t('find.msg4', ['搜索DApp或输入链接进入玩耍']),
				topNav: [{
						name: 'DAPP',
						query: {
							type: 1
						}
					},
					{
						name: this.$t('find.msg31', ['应用中心']),
						query: {
							type: 4
						}
					},
					{
						name: this.$t('find.msg2', ['快讯']),
						query: {
							type: 2
						}
					},
					{
						name: this.$t('find.msg3', ['文章']),
						query: {
							type: 3
						}
					},
	
			
				],
				size: 20,
				demo: '', //扫描内容
				bannerList: ['/static/find/banner1.png', '/static/find/banner2.png'], //banner-list
				bannerListe: ['/static/find/banner2-e.png', '/static/us3.png'],
				hotList: [], //热门推荐-list
				actionList: ['/static/find/banner-l.png', '/static/find/action02.png'], // 活动图片
				actionListUs: ['/static/find/banner-r.png', '/static/us5.png'], // 活动图片
				tabList: [{
						name: 'ETH',
						id: 40
					},
					{
						name: 'BSC',
						id: 41
					},
					{
						name: 'HECO',
						id: 42
					},
					{
						name: 'TRON',
						id: 47
					},
					{
						name: 'ETH 2.0',
						id: 74
					}
				], // tab分类
				tabCur: 0, //底部tab默认值
				size: 20,
				modalTitle: '', //跳转第三方app标题
				modalTitle1: this.$i18n.locale == 'en-US' ? 'hint' : '提示',
				modalText: this.$t('find.msg27', ['知晓确认']), //跳转第三方app确认
				cancelText: this.$i18n.locale == 'en-US' ? 'Cancel' : '取消',
				modalText1: this.$i18n.locale == 'en-US' ? 'Choose a wallet' : '选择钱包', //不支持当前钱包确认
				showMSg: false, //跳转第三方app提示弹框
				titleSty: {
					//跳转第三方app提示样式
					color: '#333333',
					fontWeight: 'bold',
					fontSize: '32rpx',
					margin: '0 28rpx'
				},
				contentSty: {
					//跳转第三方app提示样式
					color: '#333333',
					fontSize: '28rpx'
				},
				content: '', //跳转第三方app提示
				isShow: false, //不支持当前钱包弹框
				content1: '', //不支持当前钱包提示弹框内���
				articleList: [], // 文章列表
				timeList: [], //快讯列表
				dateList: {}, //快讯列表
				appList: [], //DAPP-tab底部列表
				pageIndex: 1,
				myList: [],
				isLogin: false,
				category: '' //支持的钱包种类
			};
		},
		components: {
			Article,
			News,
			AppList,
			DApps,
			wallet,
			Appcenter
		},

		onShow() {

			this.walletInfo = JSON.parse(uni.getStorageSync('currentWallet')) || {};
			if (!isLogin()) {
				this.isLogin = false;
				this.getHotDAPP(); //热门推荐
				this.getTabs(); //���表
			} else {
				this.isLogin = true;
				this.getMyDapp(); //我的Dapp
				this.getHotDAPP(); //热门推荐
				this.getTabs(); //列表
			}

			// this.getBanner(); //banner图
		},
		onReachBottom() {
			if (this.topNavCur == 3) {
				this.pageIndex++;
				this.getArticle();
			} else if (this.topNavCur == 2) {
				this.pageIndex += 20;
				this.getNews();
			} else if (this.topNavCur == 4) {
				
			}
		},
		onPullDownRefresh() {},
		methods: {
		// banner图
		// async getBanner() {
		// 	const {
		// 		data
		// 	} = await infoRequest({
		// 		url: "/news/list/banner",
		// 		method: "GET",
		// 	});
		// 	let list = []
		// 	data.map(item => {
		// 		list.push({
		// 			image: item.img_url
		// 		})
		// 	})
		// 	this.bannerList = list
		// },
		// 热门推荐DAPP
		async getHotDAPP() {
			const { data } = await infoRequest({
				url: '/news/list/home?categoryId=' + this.walletInfo.category,
				method: 'GET',
			});	
			console.log
			this.hotList = data;
				
			
		},
		// 底部 Dapp 列表
		async getTabs() {
			let obj = {
				code: this.tabList[this.tabCur].id,
				pageNumber: 1,
				pageSize: 8
			};
			const { data } = await infoRequest({
				url: '/news/list/list_more?' + jsonToParams(obj),
				method: 'GET'
			});
			
			this.appList = data.list;
		},
		// 我的Dapp
		async getMyDapp() {
			// uni.showLoading({
			// 	title: "加载中..."
			// })
			let obj = {
				pageNumber: 1,
				pageSize: 5
			};
			const { data } = await infoRequest({
				url: '/news/list/my-dapp?' + jsonToParams(obj),
				method: 'GET'
			});
	
			this.myList = data.list;

		},
		// 跳转
		goTo(url) {
      toPage(url)
		},
		// 底部列表 -查看更多
		checkMore() {
			let obj = this.tabList[this.tabCur];
      this.toPage('/pages/find/tabList?info=' + JSON.stringify(obj))
		},
		//点击Dapp  isshow:不支持弹框 showMsg 提醒弹框
		async goApp(item) {
			if (!isLogin()) {
				uni.reLaunch({
					url: '/pages/login/login'
				});
				return;
			}
			if (item.wallet_category == 88) {
				uni.showToast({
					title: '当前钱包不支持',
					icon: 'none'
				});
				return;
			}

			this.item = item;
			this.category = item.wallet_category;
			if (item.wallet_category == this.walletInfo.category || item.wallet_category == 0) {
				if (item.state == 2) {
					this.openWebUrl(this.item, this.item.url);
				} else {
					if(this.$i18n.locale == 'en-US'){
						this.content = `Risk warning： the page you visit will enter a third-party DAPP《${item.title}》Please carefully understand the "Privacy Policy" and "User Agreement" of the third-party DAPP, and participate carefully at your own risk!`;
						this.modalTitle = `You will enter a third-party DAPP《${item.title}》`;
					}else{
						this.content = `风险提示：您所访问的页面将进入第三方DAPP《${item.title}》请认真了解第三方DAPP《隐私政策》和《用户协议》在风险自担的前提下谨慎参与！`;
						this.modalTitle = `您将进入第三方DAPP《${item.title}》`;
					}
					
					this.showMSg = true;
				}
			} else if (!item.wallet_category) {
				uni.showToast({
					title: '当前钱包不支持',
					icon: 'none'
				});
				return;
			} else {
				if(this.$i18n.locale == 'en-US'){
					this.content1 = `Currently DAPP only supports${item.support} wallet`;
				}else{
					this.content1 = `当前DAPP只支持${item.support}钱包`;
				}
				
				this.isShow = true;
			}
		},
		//弹框 确认 type:1 支持当前钱包 跳转第三方app  2 不支持当前钱包
		goPage(type) {
			if (type == 1) {
				// uni.navigateTo({
				// 	url: '/pages/webView?url=' + this.item.url
				// })
				this.openWebUrl(this.item, this.item.url);
				// 我的Dapp列表数据不需要请求添加接口 有dapp_id字段就是dapp列表数据
				if (!this.item.dapp_id) {
					this.addDapp();
				}
			} else {
				// 不支持当前钱包 -选���钱包弹框
				this.$refs.wallet.changeMoney();
			}
		},
		// 添加到我的Dapp
		async addDapp() {
			let obj = {
				dapp_id: this.item.id,
				state: 1
			};
			const { data } = await infoRequest({
				url: '/news/list/add-dapp?' + jsonToParams(obj),
				method: 'GET'
			});
		},
		// 快讯接口
		async getNews() {
			const { data } = await infoRequest({
				url: '/news/list?start=' + this.pageIndex,
				method: 'GET'
			});
			console.log('快讯', data);
			data.map(item => {
				item.date = item.update_time.trim().split(' ')[0];
				item.time = item.update_time.trim().split(' ')[1];
				item.bgColor = item.tag_bg_color.substr(2, 6);
				item.textColor = item.tag_color.substr(2, 6);
				this.dateList[item.date] = this.dateList[item.date] || [];
				this.dateList[item.date].push(item);
			});
			uni.hideLoading();
			let lists = Object.keys(this.dateList);
			this.timeList = this.timeList.concat(lists);
			console.log('快讯', this.dateList);
		},
		// 文章接口
		async getArticle() {
			const { data } = await infoRequest({
				url: '/article',
				method: 'POST',
				data: {
					pageIndex: this.pageIndex,
					pageSize: 20
				}
			});

			console.log('1', data);
			let articleList = data.filter((item, index) => {
				item.author = item.author.replace(/\s*/g, '');
				if (item.author != 'TokenPocket钱包') {
					return item;
				}
			});
			console.log('2', articleList);
			let lists = articleList.filter((item, index) => {
				item.author = item.author.replace(/\s*/g, '');
				if (item.author != 'TokenPocket') {
					return item;
				}
			});
			console.log('3', lists);
			uni.hideLoading();
			this.articleList = this.articleList.concat(lists);
			console.log('文章', this.articleList);
		},
		// 快讯-分享
		share(item) {
			var w = plus.webview.create(
				'/static/share.html',
				'id',
				{
					top: uni.getSystemInfoSync().statusBarHeight,
					bottom: '0px'
				},
				item
			);
			w.show();
			// let urlStr = JSON.stringify(item)
			// urlStr = urlStr.replace(/\%/g, "%25");
			// urlStr = urlStr.replace(/\#/g, "%23");
			// urlStr = urlStr.replace(/\&/g, "%26");
			// uni.navigateTo({
			// 	url: '/pages/find/share?item=' + encodeURIComponent(urlStr),
			// })
		},
		// 顶部导航
		selectTopNav(index) {
			this.topNavCur = index;
			if (index == 4) {
				
			} else if (index == 2) {
				this.pageIndex = 0;
				this.timeList = [];
				this.dateList = {};
				// uni.showLoading({
				// 	title: "加载中..."
				// })
				this.getNews();
			} else if (index == 3) {
				this.articleList = [];
				this.pageIndex = 1;
				// uni.showLoading({
				// 	title: "加载中..."
				// })
				this.getArticle();
			}
		},
		//底部-tabs切换
		change(index) {
			this.tabCur = index;
			this.getTabs();
		},
		// 扫描
		scan() {
			uni.scanCode({
				success: function(res) {
					this.demo = res.result;
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		},
		//复制
		copy(v) {
			var _this = this;
			uni.setClipboardData({
				data: v,
				success: function() {
					_this.$refs.uToast.show({
						title: _this.$t('home.txt15', ['复制成功']),
						type: 'success'
					});
				}
			});
		},
		// 文章详情跳转
		toDetail(url) {
			// this.openWebUrl(url);
			// window.android.openDApp(url);
			// window.location = url;
      this.toPage('/pages/webView?url=' + url)
		},
		toCenter() {
			// this.openWebUrl(url);
			// window.android.openDApp(url);
			// window.location = url;
			console.log("点击到应用中心", url)
			// uni.navigateTo({
			// 	url: '/components/app-center'
			// })
		},
		// 选择钱包
		changeWallet(item) {
		  if(!isTx())
			  uni.showTabBar();
			// debugger
			// uni.setStorageSync('currentWallet', item);
			this.walletInfo = item;
			console.log(item, '选中');
			if (this.item.state == 2) {
				this.openWebUrl(this.item, this.item.url);
				// uni.navigateTo({
				// 	url: '/pages/webView?url=' + this.item.url
				// })
			} else {
				if(this.$i18n.locale == 'en-US'){
					this.content = `Risk warning： the page you visit will enter a third-party DAPP《${this.item.title}》Please carefully understand the "Privacy Policy" and "User Agreement" of the third-party DAPP, and participate carefully at your own risk!`;
					this.modalTitle = `You will enter a third-party DAPP《${this.item.title}》`;
				}else{
					this.content = `风险提示：您所访问的页面将进入第三方DAPP《${this.item.title}》请认真了解第三方DAPP《隐私政策》和《用户协议》在风险自担的前提下谨慎参与！`;
					this.modalTitle = `您将进入第三方DAPP《${this.item.title}》`;
				}
				this.showMSg = true;
			}
		},
		//浏览器钱包接口 type 2 ETH 3 波场 4 哆来咪
		async openWebUrl(item, url) {
			console.log(this.walletInfo, '当前钱包');
      console.log(item,'item');

      // if (url.startsWith('https')) {
			// 	uni.setStorageSync('DLMWallet', this.walletInfo);
			// 	// debugger
			// 	this.toPage('/pages/webView?url='+ url)
			// 	return;
			// }

			let eth = {};
			try {
				// debugger
				if (this.walletInfo.category == 2 || this.walletInfo.category == 4 || this.walletInfo.category == 3 || this.walletInfo.category == 6) {
					
					const { data } = await request({
						url:
							'/getWalletPrivateKey?' +
							jsonToParams({
								wallet_id: this.walletInfo.id
							}),
						method: 'GET'
					});

					// console.log(11111111111);
					eth = {
						...item,
						...this.walletInfo,
						private_key: data.private_key_original
					};
        }
			} catch (e) {
				// console.log(1111111111, e);
				//TODO handle the exception
			}
			
			// console.log(111,eth);
			if(this.walletInfo.category == 4){
				this.methodChannelData = {
					url:`${url}?address=${eth.address}`,
					...eth
				};
			}else{
				this.methodChannelData = {
					url,
					...eth
				};
			}
			
			console.log(this.methodChannelData, '看哈地址');
			// window.location = this.methodChannelData.url;
			//原跳转地址
			// openPage(this.methodChannelData);
			
			console.log("this.methodChannelData", this.methodChannelData)
			android.openDApp(JSON.stringify(this.methodChannelData));
			// if (this.methodChannelData.url) {
			// 	// debugger
			// 	window.location.href = this.methodChannelData.url
			// 	console.log("if", url)
			// 	return;
			// }
			
		}
	}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #ffffff;
	}

	.main {
		padding-bottom: 50rpx;
		
	}

	swiper {
		flex: 1;
		overflow: hidden;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex: 1;
		padding: 0 70rpx;
		color: rgba(0, 0, 0, 0.6);

		.active {
			color: rgba(0, 0, 0, 0.9);
			font-weight: bold;
		}
	}

	.search-view {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		width: 100%;
		padding: 0rpx 30rpx 10rpx 30rpx;
	}

	.banner {
		background-color: transparent !important;
		// width: 750rpx;
		// margin-top: 349rpx;

		.full {
			width: 100%;
			height: 100%;
			
			& /deep/ uni-swiper {
				background-color: transparent !important;
				height: 349rpx !important;
				
			}

			& /deep/ .u-swiper-indicator {
				padding: 0 !important;

				.u-indicator-item-rect {
					width: 16rpx;
					height: 5rpx;
					border-radius: 2rpx;
					background: #DEDEDE;
				}

				.u-indicator-item-rect.u-indicator-item-rect-active {
					background: #3174F6;
					width: 26rpx;
					height: 7rpx;
				}
			}
		}


	}

	.section-view {
		padding: 30rpx;
	}

	.bottom-content {
		// box-shadow: 0rpx 1rpx 16rpx 0rpx rgba(36, 56, 211, 0.12);
		// border-radius: 20rpx;
		padding: 10rpx 30rpx 30rpx 30rpx;
		margin: 20rpx 30rpx 30rpx 30rpx;

		.look-more {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			flex: 1;
		}
	}

	// 钱包弹框
	.pop-content {
		padding: 20rpx 0rpx;

		.head-list {
			height: 80rpx;
			background: #f5f5f5;

			.list {
				height: 100%;
				width: 120rpx;

				image {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}

		.box {
			padding: 30rpx;

			.title {
				color: #2DA5E1;
			}
		}

		.list-box {
			flex: 1;
			padding: 34rpx 0;
			background: #fffeff;
			box-shadow: 0px 1rpx 16rpx 0px rgba(36, 56, 211, 0.12);
			border-radius: 15rpx;
			padding-right: 30rpx;
		}

		.time-line {
			margin-top: 20rpx;
			height: 100%;
		}

		.list-title {
			border-left: 4rpx solid #2DA5E1;
			padding-left: 26rpx;
		}

		.list-content {
			margin: 0 20rpx 0 31rpx;
		}

		.btn {
			width: 150rpx;
			height: 60rpx;

			background: #2DA5E1;
			box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
			border-radius: 30rpx;
		}
	}

	// 添加钱包弹框
	.otherMoney {
		width: 750rpx;
		height: 296rpx;
		background: #ffffff;

		>view {
			width: 750rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
			background: #ffffff;
		}
	}

	.commonfont {
		font-size: 26rpx;
		font-weight: 500;
		color: #2DA5E1;
	}

	uni-image img {
		width: 100%;
		height: 250rpx;
	}

	.navbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;

		.flex1 {
			flex: 1;
			display: flex;
			align-items: center;

			.item {
				font-size: 36rpx;
				color: #999999;
				margin-right: 60rpx;
				// font-weight: bold;
				
				&.active {
					font-size: 44rpx;
					font-weight: 600;
					color: #000000;
					
				}
			}
		}

		.icon {
			width: 38rpx;
			height: 38rpx;
		}

	}

	.mainTitle {
		color: #000000;
		font-weight: bold;
		font-size: 36rpx;

		&:before {
			display: inline-block;
			width: 8rpx;
			height: 28rpx;
			content: '';
			background-color: #00BFF5;
			margin-right: 12rpx;
			border-radius: 28rpx;
		}
	}

	.adBox {
		margin: 38rpx 30rpx 48rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item {
			width: 326rpx;
			height: 170rpx;
		}
	}

	/deep/ .box-view .box {
		width: 20%;
	}
</style>
