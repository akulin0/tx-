<template>
	<base-layout class="main">
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" title="myDApps" title-color="#333333" :title-bold="true"></u-navbar>
		<!-- 占位 -->
		<view style="height: 20rpx;background-color: #f5f5f5;"></view>
		<!-- <base-noData v-if="list.length==0" /> -->
		<!-- 列表 -->
		<view class="bottom-content">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id"
				@click="handle" :options="options" btn-width="120" @content-click="goApp">
				<view class="item">
					<image mode="aspectFill" :src="item.icon_url" style="min-width: 100rpx;" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap flex-j-a">
						<view>
							<view class="title">{{ item.title }}</view>
							<view class="text color-main font-s">{{ item.desc }}</view>
						</view>
					</view>
				</view>
			</u-swipe-action>
			<view class="more" v-if="isNoMore=='nomore'">{{$t('find.msg12',['没有更多了'])}}</view>
		</view>
		<!-- 点击跳转第三方app提示-弹框 -->
		<u-modal v-model="showMSg" :content="content" :title="modalTitle" :show-cancel-button="true"
			:confirm-text="modalText" :mask-close-able="true" @confirm="goPage(1)" :title-style="titleSty"
			:content-style="contentSty"></u-modal>
		<!-- 不支持当前钱包弹框 -->
		<u-modal v-model="isShow" :mask-close-able="true" :content="content1" :show-cancel-button="true"
			:confirm-text="modalText1" @confirm="goPage(2)"></u-modal>
		<!-- 选择钱包弹框 -->
		<wallet ref="wallet" @changeWallet="changeWallet" :category="category" :type='type'></wallet>

	</base-layout>
</template>

<script>
	import wallet from "@/components/wallet.vue";
	import {
		infoRequest,
		jsonToParams
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				type: 1,
				category: "",
				isNoMore: "none",
				pageIndex: 1,
				list: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: this.$t('ibinz.msg61', ['删除']),
					style: {
						backgroundColor: '#FE5248'
					}
				}],
				modalTitle: "",
				modalText: this.$t('find.msg9', ['知道了']),
				modalText1: this.$t('home.txt21', ['选择钱包']),
				showMSg: false, //点击第三方app提示弹框
				titleSty: { //点击第三方app提示弹框样式
					color: '#333333',
					fontWeight: "bold",
					fontSize: "32rpx",
					margin: "0 30rpx"
				},
				contentSty: { //点击第三方app提示弹框样式
					color: '#333333',
					fontSize: "28rpx"
				},
				//点击第三方app弹框内容
				content: "",
				isShow: false, //不支持当前钱包提示弹框
				content1: "", //不支持当前钱包提示弹框内容
				item: {}, //当前的Dapp信息
				walletInfo: {}, // 当前钱包信息
			}
		},
		onLoad() {
			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
		},
		onShow() {
			this.list = []
			this.pageIndex = 1
			this.getMyDapp()
		},
		components: {
			wallet
		},
		onReachBottom() {
			if (this.isNoMore == "nomore") return
			this.getMyDapp()
		},
		onPullDownRefresh() {
			this.pageIndex = 1
			this.list = []
			this.getMyDapp()
		},
		methods: {
			// 我的Dapp
			async getMyDapp() {
				uni.showLoading({
					title: "加载中..."
				})
				let obj = {
					pageNumber: this.pageIndex,
					pageSize: 20,
				};
				const {
					data
				} = await infoRequest({
					url: '/news/list/my-dapp?' + jsonToParams(obj),
					method: "GET",
				})
				this.isNoMore = data.list.length == 0 ? "nomore" : "none";
				this.pageIndex++
				uni.hideLoading()
				this.list = this.list.concat(data.list)
				console.log("我的Dapp", data.list);

			},
			// 删除
			async handle(index, index1) {
				// index list item 下标  index1：option下标
				let item = this.list[index]
				try {
					let obj = {
						dapp_id: item.dapp_id,
						state: 0,
					};
					const {
						data
					} = await infoRequest({
						url: "/news/list/add-dapp?" + jsonToParams(obj),
						method: "GET",
					});
					this.list.splice(index, 1);
				} catch (e) {
					uni.showToast({
						title: e.errorMessage,
						icon: "none"
					})
				}

			},
			//isshow:不支持弹框 showMsg 提醒弹框
			goApp(index) {
				// console.log("当前钱包", this.walletInfo);
				// console.log("item", this.list[index]);
				let item = this.list[index]
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
            // this.toPage('/pages/webView?url=' + item.url)
            this.toPage( item.url)
					} else {
						this.content =
							`提示：您所访问的页面将进入第三方DApp《${item.title}》,您在第三方Dapp上的使用行为将适用该第三方DApp的《隐私政策》和《用户协议》，由《${item.title}》直接并单独向您承担责任。`
						this.modalTitle = `您所访问的页面将进入第三方DApp《${item.title}》`
						this.showMSg = true
					}

				} else {
					this.content1 = `当前DAPP只支持${item.support}钱包`
					this.isShow = true
				}

			},
			//type:1 跳转第三方app  2管理钱包
			goPage(type) {
				if (type == 1) {
          this.toPage(this.item.url)
				} else {
					// 不支持当前钱包 -选择钱包弹框
					this.$refs.wallet.changeMoney()
				}

			},
			// 选择钱包
			changeWallet() {
				this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
				if (this.item.state == 2) {
          this.toPage(this.item.url)
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
	.main {
		color: #333333;
		font-size: 28rpx;
		padding-bottom: 50rpx;
	}

	.content {
		padding: 0 30rpx;
	}

	.look-collection {
		height: 100rpx;
		line-height: 100rpx;
		flex: 1;
	}

	.bottom-content {
		padding-top: 10rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;

		.item {
			display: flex;
			flex-direction: row;
			border-bottom: 1rpx solid #E6E6E6;
			padding: 20rpx 0;

			image {
				width: 100rpx;
				height: 100rpx;
				flex: 0 0 120rpx;
				margin-right: 20rpx;
				border-radius: 20rpx;
			}

			.title-wrap {
				flex: 1;
			}

			.title {
				text-align: left;
				font-size: 34rpx;
				color: #333333;
				font-weight: 800;

			}

			.text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}


		}

		// .item:nth-last-of-type(1) {
		// 	border-bottom: none;
		// }
	}
</style>
