<!-- 我的代币列表 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" title="">
			<view class="slot-wrap head-box">
				<u-search :placeholder="placeholder" v-model="keyword" :action-text="seaText" :clearabled="true"
					:action-style="actionSty" @custom="cancle" @search="getGroupList()"></u-search>
			</view>
		</u-navbar>
		<view class="content">
			<view class="goods-items flexs flex-j-a" v-for="(item,index) in coinLists" :key="index"
				@click="toPage(item)">
				<view class="log flex-align">
					<image class="logo" :src="item.icon_url" mode=""></image>
					<view>{{item.symbol}}</view>
				</view>
				<view class="logr">
					<view>
						<view class="logr-t">{{item.balance}}</view>
						<view style="font-size: 22rpx;">≈${{item.Moneys}}</view>
					</view>
				</view>
			</view>
		</view>

	</base-layout>
</template>

<script lang="ts">
	// import {
	// 	Assets
	// } from "@/decorator/wallet"
	// import {
	// 	Component,
	// 	Vue
	// } from "vue-property-decorator";
  //
	// import {
	// 	request,
	// 	navigateBack
	// } from "@/m-subpack/base";


	// @Component({})
	// @Assets()
	// export default class Idnex extends Vue {
	// 	placeholder = "";
	// 	keyword = '';
	// 	seaText = "";
	// 	actionSty = {
	// 		color: "#2DA5E1"
	// 	};
  //
	// 	async onShow() {
	// 		this.placeholder = this.$t('home.txt118', ['搜索代币名称/合约/项目名称']);
	// 		this.seaText = this.$t('home.txt24', ['取消']);
	// 		this.init();
  //
	// 	}
  //
	// 	toPage(item) {
	// 		delete item.address;
	// 		navigateBack(item);
	// 	}
  //
	// 	isShow(item) {
	// 		const keyword = this.keyword.toUpperCase()
	// 		return (item.symbol.toUpperCase().indexOf(keyword) >= 0);
	// 	}
  //
	// 	cancle() {
	// 		uni.navigateBack({
	// 			delta: 1
	// 		})
	// 	}
	// }
	import {
		request
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				Rate: 0,
				keyword: '',
				actionSty: {
					color: "#2DA5E1"
				},
				coinList: [],
				coinLists: [],
				walletInfo: {},
				placeholder: this.$t('home.txt118', ['搜索代币名称/合约/项目名称']),
				seaText: this.$t('home.txt24', ['取消'])

			}
		},
		onLoad() {
			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
			this.getCoinList()
			this.getRate()
		},
		methods: {
			async getRate() {
				let {
					data,
					errorMessage
				} = await request({
					url: '/walletConversionRate',
					method: 'get',
					params: {
						"category": this.walletInfo.category
					}
				})
				this.Rate = data || 0
				console.log(data, '汇率')


			},
			// 获取资产列表余额
			async getWalletkBalance(id, index) {
				let {
					data,
					errorMessage
				} = await request({
					url: '/walletget-balance',
					method: 'get',
					params: {
            "coin_id": id,
						"wallet_id": this.walletInfo.id
					}
				})
				this.coinLists = [...this.coinList]

				this.coinLists[index].balance = Number(0)
				this.coinLists[index].Moneys = Number(0)

			},
			// 获取当前钱包添加的币种列表
			async getCoinList() {
				console.log('11', this.walletInfo);
				this.coinList = []
				let {
					data,
					errorMessage
				} = await request({
					url: '/wallet-get-added-coin-list',
					method: 'get',
					params: {
						"wallet_id": this.walletInfo.id,
					}
				})
				this.coinList = [...data]
				this.coinList.map((item, index) => {
					return this.getWalletkBalance(item.coin_id, index)
				})
			},
			toPage(item) {
				uni.redirectTo({
					url: '/pages/index/directTransfer?coin_id=' + item.coin_id + '&symbol=' + item.symbol
				})
			},
			cancle() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.head-box {
		width: 100%;
		padding: 0 30rpx;
	}

	.content {
		margin-top: 20rpx;

		.goods-items {
			width: 690rpx;
			height: 150rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background: #FFFEFF;
			box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
			border-radius: 20rpx;
			margin: 0rpx auto 20rpx;
			align-items: center;
			justify-content: space-between;

			.logr {
				align-items: center;

				.logr-t {
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
          display: flex;
          justify-content: flex-end;
				}

				.logr-s {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}
			}

			.log {
				align-items: center;
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
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
</style>
