<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :title="title" :title-bold="true" :border-bottom="true">
			<view slot="right" style="color: #F1474F;margin-right: 30rpx;" @click="del">
				删除
			</view>
		</u-navbar>
		
		<view class="list-box" v-if="list.length>0">
			<!-- DeFi自选列表 -->
			<view v-if="type==0">
			<view class="flex-r" v-for="(item, d) in list" :key="d" >
				<image src="/static/market/check.png" style="width: 34rpx;height: 34rpx;margin-right: 10rpx;" mode=""
					v-if="ids.indexOf(item.pair_contract_address)<0" @click="check(item)">
				</image>
				<image src="/static/market/checked.png" style="width: 34rpx;height: 34rpx;margin-right: 10rpx;" mode=""
					v-if="ids.indexOf(item.pair_contract_address)>=0" @click="check(item)">
				</image>
				<DeFiList :item="item" @toDetail="toDetail"></DeFiList>
			</view>
			</view>
			<!-- 行情列表 -->
			<view v-else>
				<view class="flex-r" v-for="(item, i) in list" :key="i">
					<image src="/static/market/check.png" style="width: 34rpx;height: 34rpx;margin-right: 10rpx;" mode=""
						v-if="ids.indexOf(item.hid)<0" @click="check(item)"></image>
					<image src="/static/market/checked.png" style="width: 34rpx;height: 34rpx;margin-right: 10rpx;" mode=""
						v-if="ids.indexOf(item.hid)>=0" @click="check(item)"></image>
					<MarketList :item="item"></MarketList>
				</view>
			</view>
			<view class="more" v-if="isNoMore=='nomore'">{{$t('find.msg12',['没有更多了'])}}</view>
		</view>
		<base-noData v-else />
	</view>
</template>

<script>
	import {
		infoRequest,
		jsonToParams
	} from "@/m-subpack/base";
	import {
		checkLogin,
	} from "@/m-common/common"
	import MarketList from "@/components/marketList.vue"
	import DeFiList from "@/components/DeFiList.vue"
	export default {
		data() {
			return {
				type: "", //0 defi自选 1行情列表
				title: "编辑行情",
				pageIndex: 1,
				list: [],
				ids: [], //选中的数据
				defultIcon: "/static/market/defultIcon.png", //默认icon
				isNoMore: "none"
			}
		},
		components: {
			MarketList,
			DeFiList,
		},
		onLoad(opt) {
			this.type = opt.type
			if (opt.type == 0) {
				this.title = "编辑DeFi自选"
			} else {
				this.title = "编辑行情"
			}
		},
		onShow() {
			uni.showLoading({
				title: "加载中..."
			})
			this.pageIndex = 1
			this.list = []
			this.ids = []
			if (this.type == 0) {
				this.getSelf()
			} else {
				this.getMarket()
			}
		},
		onReachBottom() {
			if (this.isNoMore == "nomore") return
			if (this.type == 0) {
				this.getSelf()()
			} else {
				this.getMarket()
			}
		},
		onPullDownRefresh() {
			this.list = []
			this.pageIndex = 1
			if (this.type == 0) {
				this.getSelf()()
			} else {
				this.getMarket()
			}
		},
		methods: {
			//DeFi- 自选
			async getSelf() {
				try {
					const {
						data,
						errorCode
					} = await infoRequest({
						url: "/new-selflist",
						method: "post",
						data:{
							pageNo: this.pageIndex,
							type: 0
							
						}
					})
					uni.hideLoading()
					console.log("自选列表", JSON.parse(JSON.stringify(data.list)));
					this.isNoMore = data.list.length == 0 ? "nomore" : "none";
					this.pageIndex++
					this.list = this.list.concat(data.list)
				} catch (e) {
					uni.showToast({
						title: e.errorMessage,
						icon: "none"
					})
				}
			},
			//行情列表
			async getMarket() {
				try {
					const {
						data
					} = await infoRequest({
						url: "/marketList?pageNo=" + this.pageIndex,
						method: "GET",
					})
					uni.hideLoading()
					data.list.map(item => {
						item.price1 = item.price_usd.substring(0, item.price_usd.indexOf(".") + 5);
						item.price2 = item.price_usd.substring(0, item.price_usd.indexOf(".") + 3);
						item.percent = item.percent_change_24h.substring(0, item.percent_change_24h
							.indexOf(".") +
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
					this.isNoMore = data.list.length == 0 ? "nomore" : "none";
					this.pageIndex++
					this.list = this.list.concat(data.list)
				} catch (e) {
					uni.showToast({
						title: e.errorMessage,
						icon: "none"
					})
				}

			},
			//勾选
			check(item) {
				console.log(5555, this.ids);
				if (this.type == 0) {
					const i = this.ids.indexOf(item.pair_contract_address)
					if (i < 0) {
						this.ids.push(item.pair_contract_address)
					} else {
						this.ids.splice(i, 1)
					}
				} else {
					const i = this.ids.indexOf(item.hid)
					if (i < 0) {
						this.ids.push(item.hid)
					} else {
						this.ids.splice(i, 1)
					}
				}

			},
			// 删除
			async del() {
				if (this.ids.length == 0) {
					uni.showToast({
						title: this.$t('market.msg37', ['请先勾选']),
						icon: "none"
					})
					return
				}
				let arr = [{
						url: '/delete-self?address=' + this.ids,
						method: "GET",
					},
					{
						url: '/deleteMarketData?hid=' + this.ids,
						method: "GET",
					}
				]
				try {
					const res = await infoRequest(arr[this.type])
					uni.showToast({
						title: this.$t('market.msg38', ['已删除']),
						duration: 1000,
					})
					this.pageIndex = 1
					this.list = []
					this.ids = []
					if (this.type == 0) {
						this.getSelf()
					} else {
						this.getMarket()
					}
				} catch (e) {
					uni.showToast({
						title: e.errorMessage,
						icon: "none"
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #FFFFFF;
	}

	.list-box {
		padding: 0 30rpx 30rpx 30rpx;
	}

	.text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
