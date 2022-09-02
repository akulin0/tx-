<template>
	<base-layout class="main">
		<u-navbar v-if="!isTx()" :is-back="false" :is-fixed="true" title="">
			<view class="slot-wrap">
				<u-search :placeholder="placeholder" v-model="keyword" :action-text="navText" @custom="cancle"
					@search="search" @change="change" height="64" @clear="clear"></u-search>
			</view>
		</u-navbar>
		<!-- 前往 -->
		<view class="font-body title" v-if="keyword">{{$t('find.msg14',['前往DApp'])}}: <text class="color-0"
				style="margin-left: 15rpx;" @click="change">{{keyword}}</text></view>
		<!-- 列表 -->
		<view class="bottom-content" v-if="searchResult.length>0 && keyword">
			<view class="bottom-box flex-r" v-for="item in searchResult" @click="goApp(item)">
				<image :src="item.icon_url"
					style="width: 100rpx;height: 100rpx;border-radius: 20rpx;min-width: 100rpx;">
				</image>
				<view class="bottom-right">
					<view class="color-body font-max f-w">{{item.title}}</view>
					<view class="color-main font-m text">{{item.desc}}</view>
				</view>
			</view>
		</view>
		<!-- <base-noData  /> -->
		<view class="font-t color-body title" v-if="!keyword && hotTag.length>0">{{$t('find.msg15',['热门搜索'])}}</view>
		<!-- 热门搜索tag -->
		<view class="tags" v-if="!keyword && hotTag.length>0">
			<view v-for="(item,i) in hotTag" :key='i' class="tagItem" @click="hotGo(item)">{{item.name}}</view>
		</view>
		<view class="flex-row title line" v-if="keyword==false">
			<view class="font-t color-body">{{$t('find.msg16',['历史记录'])}}</view>
			<image src="/static/find/del.png" mode="" style="width: 32rpx;height: 31rpx;" @click="show=true"
				v-if="historyList.length>0"></image>
		</view> 
		<!-- 历史记录列表 -->
		<view class="history-view" v-if="keyword==false && historyList.length>0">
			<t-slide ref="slide"  @del="del" @itemClick="goApp">
				<template  v-slot="{item}">
					<view class="history-item flex-r">
						<image :src="item.icon_url || defaultImg"
							style="width: 28rpx;height: 28rpx;margin-right: 18rpx;margin-bottom: 16rpx;min-width: 28rpx;"
							mode=""></image>
						<view class="flex-col">
							<view class="font-m color-s">{{item.title}}</view>
							<view class="font-min color-main text">{{item.url}}</view>
						</view>
					</view>
				</template>
			 </t-slide>
		</view>
		<!-- 点击第三方app提示弹框 -->
		<u-modal v-model="showMSg" :content="content1" :title="modelText" :show-cancel-button="true"
			:confirm-text="modelTitle" :mask-close-able="true" @confirm="goPage(1)" :title-style="titleSty"
			:content-style="contentSty"></u-modal>
		<!-- 不支持当前钱包弹框 -->
		<u-modal v-model="isShow" :mask-close-able="true" :content="content2" :show-cancel-button="true"
			:confirm-text="modalText1" @confirm="goPage(2)"></u-modal>

		<!-- 清除记录弹框 -->
		<u-modal v-model="show" :content="content" :mask-close-able="true" :show-cancel-button="true"
			@confirm="confirmClear"></u-modal>
		</view>
	</base-layout>
</template>

<script>
	import {
		infoRequest,
		jsonToParams,
		request
	} from "@/m-subpack/base";
	
	import tSlide  from "@/components/t-slide/t-slide.vue"

	import openPage from '@/js/flutter/openPage.js';
	
	export default {
		components:{tSlide},
		data() {
			return {
				defaultImg: "/static/find/internet.png",
				walletInfo: {}, // 当前钱包详情
				item: {}, // dapp详情
				modalText1: this.$t('home.txt21', ['选择钱包']),
				titleSty: { //点击第三方app提示弹框样式
					color: '#333333',
					fontWeight: "bold",
					fontSize: "32rpx",
					margin: "0 20rpx"
				},
				contentSty: { //点击第三方app提示弹框样式
					color: '#333333',
					fontSize: "28rpx"
				},
				//点击第三方app弹框内容
				content1: this.$t('find.msg10', [
					'提示：您所访问的页面将进入第三方DApp《ChainZ Arena》,您在第三方Dapp上的使用行为将适用该第三方DApp的《隐私政策》和《用户协议》，由《ChainZ Arena》直接并单独向您承担责任。'
				]),
				keyword: "", //搜索值
				isSearch: true,
				show: false, //清除弹框
				showMSg: false, //提示弹框
				content: this.$t('find.msg17', ['确认清空历史记录']),
				hotTag: [{ name: 'Justswap', url: '' },{ name: 'Uniswap', url: '' }], //热门搜索标签
				//搜索结果列表
				searchResult: [],
				//历史记录列表
				historyList: [],
				dataList:[],
				placeholder: this.$t('find.msg4', ['搜索DApp或输入链接进入玩耍']),
				navText: this.$t('home.txt24', ['取消']),
				modelText: this.$t('find.msg8', ['您所访问的页面将进入第三方DApp《chainZ Arena》']),
				modelTitle: this.$t('find.msg9', ['知道了']),
				isShow: false, //不支持当前钱包提示弹框
				content2: this.$t('find.msg11', ["当前DAPP只支持以太坊钱包"]), //不支持当前钱包提示弹框内容
			}
		},
		onLoad() {
			this.keyword = ""
			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
			this.historyList = uni.getStorageSync('historyList') || [];
			 this.$nextTick(()=>{
				this.$refs.slide.assignment(this.historyList)
			})
		},
		onShow() {
			
		},
		methods: {
			//删除
			del(data){
				for(var i= 0; i< this.historyList.length; i++){
					if(data.url == this.historyList[i].url){
						this.historyList.splice(i, 1);
					}
				}
				uni.setStorageSync('historyList', this.historyList);
			},
		
			// 清空搜索栏
			clear() {
				this.searchResult = []
			},
			//清除历史记录
			confirmClear() {
				this.historyList = []
				uni.setStorageSync('historyList', [])
			},
			// 跳转第三方dapp
			// isshow:不支持弹框 showMsg 提醒弹框
			goApp(item) {
				console.log("当前钱包", this.walletInfo);
				console.log("item", item);
				//链接
				if (!item.support) {
          this.toPage('/pages/webView?url=' + item.url)
				//APP
				} else {
					 this.item = item;
					 this.modelText = `您所访问的页面将进入第三方DApp《${item.title}》`;
					 this.content1 = `提示：您所访问的页面将进入第三方DApp《${item.title}》,您在第三方Dapp上的使用行为将适用该第三方DApp的《隐私政策》和《用户协议》，由《${item.title}》直接并单独向您承担责任。`;
					 this.showMSg = true
				}
			},
			//type:1 跳转第三方app  2管理钱包
			goPage(type) {
				// debugger
				// debugger
				if (type == 1) {
					this.addDapp()
					if(JSON.stringify(this.historyList).indexOf(JSON.stringify(this.item))===-1){
						this.historyList.unshift(this.item)
						uni.setStorageSync('historyList', this.historyList);
					}
					if(this.item.url == '/pages/hisbag/index'){
            this.toPage(this.item.url)
						return;
					}else{
						this.getWalletPrivateKey(this.item.url);
					}
					
				} else {
          this.toPage('/pages/my/wallet')
				}

			},
			async getWalletPrivateKey(url){
				console.log(1111,url);
				const wallet = JSON.parse(uni.getStorageSync("currentWallet"));
				// console.log("wallet",wallet)
				let eth = {};
				try {
					//以太坊
					if (wallet.category == 2 || wallet.category == 3 || wallet.category == 4) {
						// console.log(11111111111);
						// debugger
						const { data } = await request({
							url:
								'/getWalletPrivateKey?' +
								jsonToParams({
									wallet_id: wallet.id
								}),
							method: 'GET'
						});
						// console.log(11111111111);
						eth = {
							...wallet,
							private_key: data.private_key_original
						};
						// debugger
					}
				} catch (e) {
					console.log(1111111111, e);
					//TODO handle the exception
				}
				
				
				if(wallet.category== 4){
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
						
						
						
				console.log("methodChannelData",this.methodChannelData)
				openPage(this.methodChannelData);
			},
			// 添加到我的Dapp
			async addDapp() {
				let obj = {
					dapp_id: this.item.id,
					state: 1,
				};
				const {
					data
				} = await infoRequest({
					url: "/news/list/add-dapp?" + jsonToParams(obj),
					method: "GET",
				});
			},
			// 取消搜索返回
			cancle() {
				uni.navigateBack({
					delta: 2
				})
			},
			// 边搜边请求
			async change() {
				if (!this.keyword) {
					this.searchResult = []
				}
				const {
					data
				} = await infoRequest({
					url: "/news/list/find-dapp?like=" + this.keyword,
					method: "GET",
				});
				this.searchResult = data
			},
			// 回车搜索 跳链接
			search(e) {
				if (!this.keyword) {
					uni.showToast({
						title: this.placeholder,
						icon: "none"
					})
					return
				}
				if(JSON.stringify(this.historyList).indexOf(JSON.stringify(e))===-1){
					this.historyList.unshift({ url: e });
					uni.setStorageSync('historyList', this.historyList);
				}
				var regular =
					/^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
				if (regular.test(e)) {
					// uni.navigateTo({
					// 	url: '/pages/webView?url=' + e
					// })
					// debugger
					if(!e.startsWith("http")){
						e = `http://${e}`
					}
					
					console.log(1111111,e);
					this.getWalletPrivateKey(e);
				} 
					//else {
					// uni.showToast({
					// 	title: "网页无法打开",
					// 	icon: "none"
					// })

				// }

			},
			// 点击热门标签
			hotGo(item) {
				if(item.name == 'Domiswap'){
          this.toPage(item.url)
				}else if(item.name == 'Uniswap'){
					let info = {
						"id" : 2,
						"is_delete" : false,
						"create_time" : "2021-06-08 11:07:46",
						"update_time" : "2021-07-08 14:25:36",
						"state" : 0,
						"code" : "88",
						"wallet_category" : 2,
						"url" : "https://uniswap.token.im/#/swap",
						"title" : "Uniswap",
						"icon_url" : "https://mofangcheng.oss-cn-beijing.aliyuncs.com/duolaimi/photo/20210608/1623122085046.jpg",
						"support" : "ETH",
						"top" : "4",
						"desc" : "基于自动化做市商兑换池的去中心化交易所"
					  };
					  this.goApp(info);
				}else{
					let info = {
						"id" : 3,
						"is_delete" : false,
						"create_time" : "2021-06-08 11:16:27",
						"update_time" : "2021-07-08 14:25:41",
						"state" : 0,
						"code" : "88",
						"wallet_category" : 3,
						"url" : "https://justswap.io/",
						"title" : "Justswap",
						"icon_url" : "https://mofangcheng.oss-cn-beijing.aliyuncs.com/duolaimi/photo/20210608/1623122242683.jpg",
						"support" : "TRX",
						"top" : "5",
						"desc" : "波场网络的第一个去中心化Token交换协议"
					  };
					this.goApp(info);
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #FFFFFF;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
		padding: 0 30rpx;
	}

	.main {
		padding: 0 30rpx;
	}

	.title {
		padding: 30rpx 0;
	}

	.bottom-content {
		.bottom-box {
			height: 150rpx;

			.bottom-right {
				margin-left: 20rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				border-bottom: 1rpx solid #E6E6E6;

			}

			.text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}

		.bottom-box:nth-last-of-type(1)>.bottom-right {
			border-bottom: none;
		}
	}

	.tags {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.tagItem {
			padding: 0 20rpx;
			height: 66rpx;
			line-height: 66rpx;
			background: #F0F0F0;
			border-radius: 10rpx;
			margin-right: 26rpx;
			margin-bottom: 20rpx;

			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #808080;
		}

	}

	.history-view {
		padding-bottom: 50rpx;

		.history-item {
			border-bottom: 1rpx solid #E6E6E6;
			height: 120rpx;
		}

		.text {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}

	}
</style>
