<template>
	<base-layout class="main">
		<u-navbar v-if="!isTx()"  :is-back="false" :is-fixed="true" title="">
			<view class="slot-wrap">
				<u-search :placeholder="placeholder" :clearabled="true" v-model="keyword" :action-text="searchText" @custom="cancle" @change="search"
				 height="64"></u-search>
			</view>
		</u-navbar>
		<view v-if="">
			<!-- Defi列表 -->
			<view class="list-box" v-if="type==0">
				<view class="list-item flex-row" v-for="item in list">
					<view class="font-m color-body flex-c" style="align-items: flex-start;" @click="toDetail(item)">
						<view class="flex-r">
							<image :src="item.token1_icon || defultIcon" style="width: 34rpx;min-width: 34rpx;height: 34rpx;margin-right: 10rpx;"
							 mode=""></image>
							<view>{{item.token0_symbol}}-{{item.token1_symbol}}</view>
						</view>
						<view class="color-s font-min " style="margin-top: 20rpx;">
							<text class="tag">{{item.market_exchange_list[0].ex_name}}</text>
							<text class="color-main">TVL:${{item.totalLiquidity}}...</text>
						</view>
					</view>
					<view style="align-items: flex-end;" class="color-body font-m flex-c" @click="copy(item.token1)">
						<view class="font-w">{{item.rate}}</view>
						<view class="font-min color-main">
							{{item.token1_symbol}}:{{item.token1.substr(0,3)}}...{{item.token1.substr(-3)}}
							<image src="/static/market/copy.png" mode="" style="width: 22rpx;min-width: 22rpx;height: 22rpx;margin-top: 20rpx;margin-left: 8rpx;"></image>
						</view>
						<!-- <view style="margin-top: 20rpx;">≈$ 0.15</view> -->
					</view>
					<view class="item">
						<view class="btn" :class="item.added==88888888?'btn-cancle':'btn-add'" @click="handleDefi(item.pair_contract_address,item.added)">
							{{item.added==88888888?$t('market.msg33',['已添加']):$t('ibinz.msg47',['添加'])}}
						</view>
					</view>
				</view>
			</view>
			<!-- 行情列表 -->
			<view class="list-box" v-if="type==1">
				<view class="list-item flex-row" v-for="item in list">
					<view class="flex-r">
						<image :src="item.icon_url || defultIcon" style="width: 80rpx;min-width: 80rpx;height: 80rpx;margin-right: 30rpx;"
						 mode=""></image>
						<view class="flex-c" style="align-items: flex-start;">
							<view class=" font-w color-body font-m flex-c">{{item.symbol}}</view>
							<view style="margin-top: 10rpx;" class="color-main font-min">{{item.name}}</view>
						</view>
					</view>
					<view class="item">
						<view class="btn" :class="item.added==88888888?'btn-cancle':'btn-add'" @click="handleMarket(item.hid,item.added)">
							{{item.added==88888888?$t('market.msg33',['已添加']):$t('ibinz.msg47',['添加'])}}
						</view>
					</view>
				</view>
			</view>
		</view>

	</base-layout>
</template>

<script>
	import {
		infoRequest,
		jsonToParams
	} from "@/m-subpack/base";
	import {
		checkLogin,
	} from "@/m-common/common"
	export default {
		data() {
			return {
				searchText:this.$t('home.txt24',['取消']),
				placeholder: "",
				keyword: "", //搜索值
				type: 0, // type 0 DeFi 1行情
				pageIndex: 0,
				list: [],
				defultIcon: "/static/market/defultIcon.png", //默认icon
				isNoMore: "none",

			}
		},
		onLoad(opt) {
			// type 0 DeFi 1行情
			this.type = opt.type
			if (this.type == 0) {
				this.placeholder = this.$t('market.msg34',['输入名称或合约进行搜索'])
				this.getDeFiList()
			} else {
				this.placeholder = this.$t('market.msg35',['添加代币行情'])
				this.getMarkeList()
			}

		},
		onReachBottom() {
			// if (this.isNoMore == "nomore") return
			if (this.type == 0) {
				this.getDeFiList()
			} else {
				this.getMarkeList()
			}
		},
		onPullDownRefresh() {
			this.list = []
			this.pageIndex = 0
			if (this.type == 0) {
				this.getDeFiList()
			} else {
				this.getMarkeList()
			}
		},
		methods: {
			// 行情列表
			async getMarkeList() {
				uni.showLoading({
					title: this.$t('home.txt17',['加载中'])
				});
				const {
					data
				} = await infoRequest({
					url: '/market-select-list?start=' + this.pageIndex + "&key=" + this.keyword,
					method: "GET",
				})
				uni.hideLoading()
				console.log("行情列表", JSON.parse(JSON.stringify(data)));
				// this.isNoMore = data.length == 0 ? "nomore" : "none";
				this.pageIndex += 20
				this.list = this.list.concat(data)
			},
			// DeFi列表
			async getDeFiList() {
				uni.showLoading({
					title: this.$t('home.txt17',['加载中'])
				});
				const {
					data
				} = await infoRequest({
					url: '/defi-select?start=' + this.pageIndex + "&key=" + this.keyword,
					method: "GET",
				})
				uni.hideLoading()
				data.map(item => {
					item.totalLiquidity = item.total_liquidity.substring(0, 8);
					let num = item.market_exchange_list[0].rate.toString().length
					if (num > 15) {
						item.rate = item.market_exchange_list[0].rate.substring(0, 14) + `...`
					} else {
						item.rate = item.market_exchange_list[0].rate
					}
				})
				console.log("DeFi列表", JSON.parse(JSON.stringify(data)));
				// this.isNoMore = data.length == 0 ? "nomore" : "none";
				this.pageIndex += 20
				this.list = this.list.concat(data)
			},
			// DeFi列表详情
			toDetail(item) {
				console.log(111111);
				uni.navigateTo({
					url: "/pages/market/exchangeDetail?item=" + encodeURIComponent(JSON.stringify(item))

				})
			},
			// 取消搜索返回
			cancle() {
				uni.navigateBack({
					delta: 2
				})
			},
			// 搜索
			search(e) {
				this.list = []
				this.pageIndex = 0
				// 0 DeFi 1 行情
				if (this.type == 0) {
					this.getDeFiList()
				} else {
					this.getMarkeList()
				}
			},
			// 复制
			copy(num) {
				var _this=this
				uni.setClipboardData({
					data: num,
					success: function() {
						_this.$refs.uToast.show({
							title: _this.$t('home.txt16',['复制成功']),
							type: 'success'
						})
					}
				});
			},
			//DEFi-添加 删除
			async handleDefi(address, type) {
				checkLogin()
				if (type == 88888888) {
					const {
						data
					} = await infoRequest({
						url: '/delete-self?address=' + address,
						method: "GET",
					})
					// this.list.map(item => {
					// 	if (item.pair_contract_address == address) {
					// 		item.added = 0
					// 	}
					// })
					uni.showToast({
						title: "删除成功",
						duration: 1000
					})
					this.getDeFiList();
				} else {
					const {
						data
					} = await infoRequest({
						url: '/selfv?address=' + address,
						method: "GET",
					})
					// uni.showToast({
					// 	title: "已添加",
					// 	duration: 1000
					// })
					this.list.map(item => {
						if (item.pair_contract_address == address) {
							item.added = 88888888
						}
					})

				}
			},
			//行情- 添加 删除
			async handleMarket(id, type) {
				checkLogin()
				if (type == 88888888) {
					const {
						data
					} = await infoRequest({
						url: '/deleteMarketData?hid=' + id,
						method: "GET",
					})
					// this.MarkeList.map(item => {
					// 	if (item.hid == id) {
					// 		item.added = 0
					// 	}
					// })
				uni.showToast({
					title: "删除成功",
					duration: 1000
				})
				this.getMarkeList();

				} else {
					const {
						data
					} = await infoRequest({
						url: '/addMarketData?hid=' + id,
						method: "GET",
					})
					this.list.map(item => {
						if (item.hid == id) {
							item.added = 88888888
						}
					})
					// uni.showToast({
					// 	title: "已添加",
					// 	duration: 1000
					// })


				}
			},
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
		padding: 0 30rpx 30rpx 30rpx;
	}

	.list-box {

		.list-item {
			height: 130rpx;
			border-bottom: 1px solid #E6E6E6;

			.item {
				display: flex;
				justify-content: flex-end;
			}

			.btn {
				box-sizing: border-box;
				width: 110rpx;
				height: 62rpx;
				text-align: center;
				line-height: 62rpx;
				font-size: 24rpx;
				border-radius: 31rpx;
				color: #FFFFFF;
			}

			.btn-add {
				background-color: #2DA5E1;
			}

			.btn-cancle {
				background-color: #CCCCCC;
			}

			.tag {
				padding: 5rpx 10rpx;
				background-color: #EDEBEE;
				border-radius: 4rpx;
				margin-right: 10rpx;
			}
		}

		.list-item:nth-last-of-type(1) {
			border-bottom: none;
		}
	}

	.text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
