<template>
	<base-layout :class="[btn===false?'content-main':'content-main-night']">
		<view class="sticky">
			<u-navbar v-if="!isTx()"  class="nav-top" :is-back="false" :is-fixed="true">
				<view class="topNavbar">
					<view class="navbar">
						<view class="item color-main font-l" :class="{active:index==topNavCur}"
							@click="selectTopNav(index)" v-for="(item,index) in topNavList">{{item.name}}</view>
					</view>
					<view>
						<image src="/static/market/sou.png" mode="" style="width: 30rpx;height: 30rpx;"
							@click="goSearch">
						</image>
						<image src="/static/market/bianji.png" mode="" style="width: 28rpx;height: 28rpx;"
							@click="toEdit()">
						</image>
					</view>
				</view>
			</u-navbar>
			<!--分类栏 -->
			<view class="status-tar">
				<!-- <view style="height: 20rpx;width100%;background-color: #f5f5f5;"></view> -->
				<!-- DeFi 状态栏-->
				<view v-if="topNavCur==0">
					<u-tabs :list="tabList" :current="tabCur" :font-size="32" @change="change" active-color="#000000"
						inactive-color="#848484" :bar-style="{background:'#3678F5'}"></u-tabs>
				</view>
				<!-- 行情状态栏 -->
				<view class="font-body color-main" v-else>
					<view class="table flex-r" style="height: 80rpx;padding: 0 30rpx;">
						<view class="tableTitle flex1">{{$t('index',['资产'])}}</view>
						<view class="flex1">
							<view class="tableTitle">{{$t('market.msg30',['最新价'])}}</view>
							<!-- 	<view class="flex-c">
								升序
								<view class="triangle1" @click="screen(0)" :class="{triangle11:number==0}"></view>
								降序
								<view class="triangle2" @click="screen(1)" :class="{triangle22:number==1}"></view>
							</view> -->
						</view>
						<view class="">
							<view class="tableTitle">{{$t('market.msg31',['涨跌幅'])}}</view>
							<!-- 			<view class="flex-c">
								升序
								<view class="triangle1" @click="screen1(0)" :class="{triangle11:number1==0}"></view>
								降序
								<view class="triangle2" @click="screen1(1)" :class="{triangle22:number1==1}"></view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-box" v-if="topNavCur==0">
			<!-- DeFi列表 -->
			<template v-if="list.length"> 
				<view v-for="item in list">
					<DeFiList :item="item" @toDetail="toDetail(item)"></DeFiList>
					<!-- <DeFiList :item="item" @toDetail="item"></DeFiList> -->
				</view>
			</template>

		</view>
		<!-- 行情列表 -->
		<view class="list-box" v-else>
			<template v-if="list.length">
				<view v-for="(item,index) in list">
					<MarketList :item="item"></MarketList>
				</view>
			</template>
			<view class="more" v-if="isNoMore=='nomore'">{{$t('find.msg12',['没有更多了'])}}</view>
		</view>
		<base-noData v-if="list.length==0" />
	</base-layout>
</template>
<script>
	import {
		infoRequest,
		jsonToParams,
		isLogin
	} from "@/m-subpack/base";
	import {
		checkLogin,
	} from "@/m-common/common"
	import MarketList from "@/components/marketList.vue"
	import DeFiList from "@/components/DeFiList.vue"
	import DeFiListSkeleton from "@/components/DeFiListSkeleton.vue"
  import {toPage} from '../../libs/utils';

	export default {
		data() {
			return {
        btn: localStorage.getItem("btn")=== "true",
				topNavCur: 0, // 顶部tab-默认Defi
				topNavList: [{
						name: "DeFi",
						query: {
							type: 1
						}
					},
					{
						name: this.$t('market.msg32', ['行情']),
						query: {
							type: 2
						}
					},
					// {
					// 	name: "哆铼购",
					// 	query: {
					// 		type: 3
					// 	}
					// },
				],
				tabList: [], // DEFi-tab
				tabCur: 1, // DEFi-tab-默认热门
				list: [], //列表
				defultIcon: "/static/market/defultIcon.png", //默认icon
				number: -1, //行情-最新价-0 升序 1降序
				number1: -1, //行情-涨跌幅-0 升序 1降序
				size: 20,
				pageIndex: 1,
				isNoMore: "none",
			}
		},
		components: {
			MarketList,
			DeFiList,
			DeFiListSkeleton
		},

		onLoad() {
			if (!isLogin()) {
				this.isLogin = false
			} else {
				this.isLogin = true
			}
		},
		onShow() {
			this.topNavCur = 0
			this.tabCur = 1
			this.pageIndex = 1
			this.getTabs();
		},
		onReachBottom() {
			if (this.isNoMore == "nomore") return
			if (this.topNavCur == 0) {
				if (this.tabCur == 0) {
					this.getSelf()
				} else {
					this.getDeFi()
				}
			} else {
				this.getMarket()
			}

		},
		// onPullDownRefresh() {
		// 	this.list = []
		// 	this.marketList = []
		// 	this.pageIndex = 1
		// 	if (this.topNavCur == 0) {
		// 		if (this.tabCur == 0) {
		// 			this.getSelf()
		// 		} else {
		// 			this.getDeFi()
		// 		}
		// 	} else {
		// 		this.getMarket()
		// 	}

		// },
		methods: {
			//格式化时间
			formatDateTime(dateTime) {
				if (dateTime == null || dateTime == undefined || dateTime == '') {
					return ''
				} else {
					var date = dateTime.replace(/\//g, '/');
					date = date.replace(/\-/g, '/');
					date = date.replace("T", " ");
					date = date.replace(/Z/g, '')
					var arr = date.split(".");
					return arr[0];
				}
			},
			// 顶部导航切换
			selectTopNav(index) {
				this.topNavCur = index;
				//
				this.list = []
				this.tabCur = 1
				this.number = -1;
				this.number1 = -1;
				this.pageIndex = 1;
				this.isNoMore = "none"
				uni.hideLoading()
				if (this.topNavCur == 0) {
					this.getDeFi()
				} else {
					this.getMarket()
				}
			},
			//DeFi- tabs切换
			change(index) {
				this.tabCur = index;
				this.list = []
				this.pageIndex = 1
				this.isNoMore = "none"
				if (this.tabCur == 0) {
					if (!isLogin()) {
						uni.reLaunch({
							url: "/pages/login/login"
						})
						return
					}
					this.getSelf()
				} else {
					this.getDeFi()
				}

			},
			//DeFi- 获取tabs分类
			async getTabs() {
				const {
					data
				} = await infoRequest({
					// url: "/v1/classify_table",
					url: "/v1/classify_table",
					method: "GET",
				})
				data.map(item => {
					item.name = item.title
				})
				// console.log("tabs分类", data);
				this.tabList = data
				this.getDeFi()
			},
			//DeFi- 自选列表
			async getSelf() {
				uni.showLoading({
					title: "加载中..."
				})
				try {
					const {
						data,
						errorCode
					} = await infoRequest({
						url: "/new-selflist",
						method: "post",
						data: {
							pageNo: this.pageIndex,
							type: 0

						}
					})
					uni.hideLoading()
					// console.log("自选列表", JSON.parse(JSON.stringify(data.list)));

					data.list.map(item => {


						item.newPrice = Math.floor(item.market_exchange_list[0].price * 1000) / 1000


					})
					this.isNoMore = data.list.length == 0 ? "nomore" : "none";
					this.pageIndex++
					this.list = this.list.concat(data.list)

				} catch (e) {

				}


			},
			//DeFi- 列表
			async getDeFi() {
				uni.showLoading({
					title: "加载中..."
				})
				let obj = {
					pageIndex: this.pageIndex,
					pageSize: 10,
					value: this.tabList[this.tabCur].tag
				}
				const {
					data
				} = await infoRequest({
					// url: "/v1/dex_pair_market",
					url: "/v1/dex_pair_market",
					method: "POST",
					data: obj
				})
				uni.hideLoading()
				// data.map(item => {
				// 	item.updateTime = this.formatDateTime(item.update_time)
				// 	item.createTime = this.formatDateTime(item.create_time)
					// item.newPrice = item.market_exchange_list[0].price.substring(0, item.market_exchange_list[
					// 		0].price.indexOf(".") +
					// 	3)

					//console.log("data.map", item.market_exchange_list[0].price)
					// item.newPrice = Math.floor(item.market_exchange_list[0].price * 1000) / 1000

					// type 0-跌 1-平 2-涨
					// if (item.percent_change_24h.charAt(0) == "-") {
					// 	item.type = 0
					// } else if (item.percent_change_24h.charAt(0) == 0) {
					// 	item.type = 1
					// } else {
					// 	item.type = 2
					// }
				// })
	
				this.isNoMore = data.length == 0 ? "nomore" : "none";
				this.pageIndex++
				this.list = this.list.concat(data)
				
			},
			//行情列表
			async getMarket() {
				uni.showLoading({
					title:"加载中..."
				})
				let {
					data
				} = await infoRequest({
					url: "/Market?pageNo=" + this.pageIndex,
					method: "GET",
				})
				data.map(item => {
					item.price1 = item.price_cny.substring(0, item.price_cny.indexOf(".") + 5);
					item.price2 = item.price_usd.substring(0, item.price_usd.indexOf(".") + 3);
					item.percent = item.percent_change_24h.substring(0, item.percent_change_24h.indexOf(".") +
									3);
								// type 0-跌 1-平 2-涨
					if (item.percent_change_24h.charAt(0) == "-") {
						item.type = 0
					} else if (item.percent_change_24h.charAt(0) == 0) {
						item.type = 1
					} else {
						item.type = 2
					}
					if (item.token == undefined) {
						let obj = {
							icon_url: ""
						}
						item.token = obj
					}
				})
				uni.hideLoading()
				console.log("行情列表", JSON.parse(JSON.stringify(data)));
				this.isNoMore = data.length == 0 ? "nomore" : "none";
				this.pageIndex++
				this.list = this.list.concat(data)
				console.log("this.list", this.list);
			},	
			// 搜索
			goSearch() {
				if (!isLogin()) {
					uni.reLaunch({
						url: "/pages/login/login"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/market/marketSearch?type=" + this.topNavCur
				})
			},
			// 行情--最新价-排序
			screen(i) {
				this.number = i
			},
			// 行情--涨跌幅-排序
			screen1(i) {
				this.number1 = i
			},

			// 编辑
			toEdit() {
				// if (!isLogin()) {
				// 	uni.reLaunch({
				// 		url: "/pages/login/login"
				// 	})
				// 	return
				// }
				if (this.topNavCur == 0) {
					if (this.tabCur == 0) {
						// uni.navigateTo({
						// 	url: "/pages/market/editMarket?type=0"
						// })
            toPage( "/pages/market/editMarket?type=0")
					} else {
						uni.showToast({
							title: this.$t('market.msg36', ['仅DeFi自选数据可更改']),
							icon: "none"
						})
					}
				} else {
					// uni.navigateTo({
					// 	url: "/pages/market/editMarket?type=1"
					// })
          toPage("/pages/market/editMarket?type=1")
				}
			},
			// DeFi-列表详情
			toDetail(item) {
				// console.log("列表详情", this.obj.name)
				// uni.navigateTo({
				// 	url: "/pages/market/exchangeDetail?item=" + encodeURIComponent(JSON.stringify(item))
				// })

        toPage("/pages/market/exchangeDetail?item=" + encodeURIComponent(JSON.stringify(item)))

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.sticky {
		position: sticky;
		top: 0;
		z-index: 999;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #FFFFFF;
	}
  //.sticky-night {
  //  position: sticky;
  //  top: 0;
  //  z-index: 999;
  //  flex: 1;
  //  flex-direction: column;
  //  overflow: hidden;
  //}
  .content-main-night{
    padding-bottom: 80rpx;
    background-image: url("/static/my/bj.png");
    background-size: 100% 100%;
  }
	.content-main {
		padding-bottom: 80rpx;
	}

	.slot-wrap {
		width: 100%;
		padding: 0 50rpx;
		height: 100%;

		.top-nav {
			width: 300rpx;
		}

		.active {
			color: #333333;
			font-weight: bold;
		}

		.empty {
			width: 50rpx;
			height: 40rpx;
		}
	}

	.status-tar {
		// border-bottom: 1rpx solid #e6e6e6;
		width: 100%;
		margin-top: 20rpx;
	}

	.list-box {
		padding: 0 30rpx 30rpx 30rpx;
	}

	.width1 {
		width: 45%;
	}

	.width2 {
		width: 30%;
	}

	.width3 {
		width: 25%;
	}

	.width11 {
		width: 20%;
	}

	.width22 {
		width: 45%;
	}

	.width33 {
		width: 35%;
	}

	.flex-end {
		justify-content: flex-end;
	}

	//正序 三角形
	.triangle1 {
		width: 0;
		height: 0;
		border: 10rpx solid #D3D3D3;
		border-top-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
		margin-bottom: 6rpx;
	}

	.triangle11 {
		width: 0;
		height: 0;
		border: 10rpx solid #999999;
		border-top-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
		margin-bottom: 6rpx;
	}

	// 倒序 三角形
	.triangle2 {
		width: 0px;
		height: 0px;
		border: 10rpx solid #D3D3D3;
		border-bottom-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
	}

	.triangle22 {
		width: 0px;
		height: 0px;
		border: 10rpx solid #999999;
		border-bottom-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
	}

	.more {
		font-size: 22rpx;
		padding: 20rpx;
		text-align: center;
		color: #ccc;
	}

	.topNavbar {
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.navbar {
			display: flex;
			align-items: center;

			.item {
				margin-right: 62rpx;
				font-size: 36rpx;
				color: #999999;

				&.active {
					font-weight: bolder;
					font-size: 44rpx;
					color: #000000;
				}
			}
		}

		image {
			margin-left: 32rpx;
		}
	}

	.table {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.flex1 {
			flex: 1;
		}

		.flex2 {
			flex: 2;
		}

		.tableTitle {
			font-size: 32rpx;
			color: #333333;
		}
	}
	
	/deep/ .font-m {
		font-size: 30rpx;
		font-weight: bold;
		
	}
	
	/deep/ .font-min.color-main {
		margin-top: -8rpx !important;
	}
</style>
