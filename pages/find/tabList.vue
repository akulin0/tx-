<template>
	<base-layout class="main">
		<u-navbar :is-back="true" :is-fixed="true" :title="title" title-color="#333333" :title-bold="true">
		</u-navbar>
		<view v-if="list.length>0">
			<AppList :list="list" @go="goApp"></AppList>
			<view class="more" v-if="isNoMore=='nomore'">{{$t('find.msg12',['没有更多了'])}}</view>
		</view>
		<base-noData v-else />
		<!-- 点击跳转第三方app提示-弹框 -->
		<u-modal v-model="showMSg" :content="content" :cancel-text="cancelText" :title="modalTitle" :show-cancel-button="true"
			:confirm-text="modalText" :mask-close-able="true" @confirm="goPage(1)" :title-style="titleSty"
			:content-style="contentSty"></u-modal>
		<!-- 不支持当前钱包弹框 -->
		<u-modal v-model="isShow" :title="modalTitle1"  :cancel-text="cancelText" :mask-close-able="true" :content="content1" :show-cancel-button="true"
			:confirm-text="modalText1" @confirm="goPage(2)"></u-modal>
		<!-- 选择钱包弹框 -->
		<wallet ref="wallet" @changeWallet="changeWallet" :category="category" :type='type'></wallet>
	</base-layout>
</template>
<script>
	import wallet from "@/components/wallet2.vue";
	import {
		infoRequest,
		jsonToParams,
		isLogin
	} from "@/m-subpack/base";
	import AppList from "@/components/appList.vue"
	export default {
		data() {
			return {
				category: "",
				type: 1,
				modalTitle: "",
				modalText: this.$t('find.msg9', ['知道了']),
				modalText1: this.$t('home.txt21', ['选择钱包']),
				modalTitle1:  this.$i18n.locale == 'en-US' ?  'hint': '提示',
				cancelText: this.$i18n.locale == 'en-US' ?  'Cancel': '取消',
				showMSg: false, //点击第三方app提示弹框
				titleSty: { //点击第三方app提示弹框样式
					color: '#333333',
					fontWeight: "bold",
					fontSize: "32rpx"
				},
				contentSty: { //点击第三方app提示弹框样式
					color: '#333333',
					fontSize: "28rpx"
				},
				//点击第三方app弹框内容
				content: "",
				isShow: false, //不支持当前钱包提示弹框
				content1: "", //不支持当前钱包提示弹框内容
				title: "",
				list: [], //列表
				info: {}, //分类信息
				id: "", //分类id
				pageIndex: 1,
				isNoMore: "none",
				walletInfo: {}, //当前钱包信息
				item: {}, //当前Dapp信息
			}
		},
		onLoad(opt) {
			this.info = JSON.parse(opt.info)
			this.title = this.info.name
			this.id = this.info.id
			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
		},
		onShow() {
			this.pageIndex = 1;
			this.getList()
		},
		components: {
			AppList,
			wallet

		},
		onReachBottom() {
			if (this.isNoMore == "nomore") return
			this.getList()
		},
		onPullDownRefresh() {
			this.pageIndex = 1
			this.list = []
			this.getList()
		},
		methods: {
			// 列表
			async getList() {
				uni.showLoading({
					title: this.$t('home.txt17', ['加载中'])
				});
				let obj = {
					code: this.id,
					pageNumber: this.pageIndex,
					pageSize: 20,
				};
				const {
					data
				} = await infoRequest({
					url: '/news/list/list_more?' + jsonToParams(obj),
					method: "GET",
				})
				uni.hideLoading()
				// console.log("列表", data.records);
				this.isNoMore = data.list == 0 ? "nomore" : "none";
				this.pageIndex++
				this.list = this.list.concat(data.list)
			},
			//isshow:不支持弹框 showMsg 提醒弹框
			goApp(item) {
				if (!isLogin()) {
					uni.reLaunch({
						url: "/pages/login/login"
					})
					return
				}
				if (!item.wallet_category) {
					uni.showToast({
						title: "当前钱包不支持",
						icon: "none"
					})
					return
				}
				this.item = item
				this.category = item.wallet_category
				if (item.wallet_category == this.walletInfo.category || item.wallet_category == 0) {
					if (item.state == 2) {
            this.toPage('/pages/webView?url=' + item.url)
						// uni.navigateTo({
						// 	url: '/pages/webView?url=' + item.url
						// })
					} else {
						if(this.$i18n.locale == 'en-US'){
							this.content = `Risk warning： the page you visit will enter a third-party DAPP《${item.title}》Please carefully understand the "Privacy Policy" and "User Agreement" of the third-party DAPP, and participate carefully at your own risk!`;
							this.modalTitle = `You will enter a third-party DAPP《${item.title}》`;
						}else{
							this.content = `风险提示：您所访问的页面将进入第三方DAPP《${item.title}》请认真了解第三方DAPP《隐私政策》和《用户协议》在风险自担的前提下谨慎参与！`;
							this.modalTitle = `您将进入第三方DAPP《${item.title}》`;
						}
						this.showMSg = true
					}
				} else {
					if(this.$i18n.locale == 'en-US'){
						this.content1 = `Currently DAPP only supports${item.support} wallet`;
					}else{
						this.content1 = `当前DAPP只支持${item.support}钱包`;
					}
					this.isShow = true
				}
			},
			//type:1 跳转第三方app  2切换钱包
			goPage(type) {
				if (type == 1) {
          this.toPage('/pages/webView?url=' + this.item.url)
					// uni.navigateTo({
					// 	url: '/pages/webView?url=' + this.item.url
					// })
					this.addDapp()
				} else {
					// 不支持当前钱包 -选择钱包弹框
					this.$refs.wallet.changeMoney()
				}

			},
			// 添加我的Dapp
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
			// 选择钱包
			changeWallet() {
				this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
				if (this.item.state == 2) {
          this.toPage('/pages/webView?url=' + this.item.url)
					// uni.navigateTo({
					// 	url: '/pages/webView?url=' + this.item.url
					// })
				} else {
					this.content =
						`提示：您所访问的页面将进入第三方DApp《${this.item.title}》,您在第三方Dapp上的使用行为将适用该第三方DApp的《隐私政策》和《用户协议》，由《${item.title}》直接并单独向您承担责任。`
					this.modalTitle = `您所访问的页面将进入第三方DApp《${this.item.title}》`
					this.showMSg = true
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.main {
		padding: 0 30rpx 90rpx 30rpx;
	}

	.bottom-content {
		padding-top: 20rpx;

		.bottom-box {
			height: 150rpx;

			.bottom-right {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				padding: 0 34rpx;
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
</style>
