<!-- 热门代币 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="false" title="">
				<view class="slot-wrap head-box">
					<u-navbar :is-back="true" :title-bold="true" style="top: 20rpx;">
						<!-- <image src="../../static/message/retrun.png.png" class="left_"></image> -->
						<u-search :placeholder="placeholder" v-model="keyword" :action-text="title" :clearabled="true"
							:action-style="actionSty" @custom="cancle" @change="search" class="hunt-for" :show-action="false"></u-search>
					</u-navbar>
					<!-- <u-search :placeholder="placeholder" v-model="keyword" :action-text="title" :clearabled="true"
						:action-style="actionSty" @custom="cancle" @change="search" class="hunt-for" :show-action="false"></u-search> -->
				</view>
			</u-navbar>
			<view class="content">
				<view class="font-body title">{{$t('home.txt97',['热门代币'])}}</view>
				<base-noData v-if="list.length==0" />
				<view v-else>
					<view class="flexs list" v-for="(item,index) in list" :key="index"
						@click="goTo(`/pages/index/TokenDetails?info=${JSON.stringify(item)}`)" >
						<view class="flexs" style="align-items: center;margin-left: 30rpx;">
							<image style="width: 80rpx;height: 80rpx;margin-right: 16rpx;" :src="item.icon_url" mode=""
								@error="item.icon_url='/static/find/internet.png'">
							</image>
							<view>
								<view class="font-t font-w color-body">{{item.symbol}}</view>
								<view class="font-s color-main">
									{{item.address | format}}
								</view>
							</view>
						</view>
						<view style="margin-right: 30rpx;" >
							<image src="/static/index/del.png" v-if="item.is_added" style="width: 40rpx;height: 40rpx;"
								mode="" @click.stop="handle(2,item.id)"></image>
							<image src="/static/index/tianjia.png" v-else style="width: 40rpx;height: 40rpx;" mode=""
								@click.stop="handle(1,item.id)"></image>
						</view>
					</view>
					<view class="more">{{$t('find.msg12',['没有更多了'])}}</view>
				</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		Assets
	} from "@/decorator/wallet"
		import {
			request
		} from "@/m-subpack/base";
		import {
			checkLogin,
		} from "@/m-common/common"
		export default {
			data() {
				return {
					isNoMore: "none",
					defaultImg: "/static/find/internet.png",
					keyword: '',
					placeholder: this.$t('home.txt96', ['输入token或合约地址']),
					title: this.$t('home.txt55', ['取消']),
					actionSty: {
						color: "#2DA5E1"
					},
					list: [],
					walletInfo: {}, //当前钱包信息
					pageIndex: 1,
				}
			},
			filters: {
				format(val) {
					if (val == null) {
						return ''
					} else {
						return val.slice(0, 9) + '...' + val.slice(-9)
					}
				}
			},
			onLoad() {
				this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
			},
			onShow() {
				this.list = []
				this.pageIndex = 1
				this.getList()
			},
	
			onReachBottom() {
				if (this.isNoMore == "nomore") return
				this.getList()
			},
			methods: {
	
				// 取消搜索返回
				cancle() {
					uni.setStorageSync("isHot", 1);
					uni.reLaunch({
						url:"/pages/index/index"
					})
				},
				
				search(e) {
					console.log(11111111);
					this.getList();
				},
				// isShow(item){
				// 	const keyword= this.keyword.toUpperCase()
				// 	return (item.symbol.toUpperCase().indexOf(keyword)>=0 || item.address.toUpperCase().indexOf(keyword)>=0);
					
				// },
				// 详情
				goTo(url) {
          this.toPage(url)
				},
				// 代币列表  category:1、比特币；2、以太坊；3、波场；4、Telegram X
				async getList() {
					uni.showLoading({
						title: "加载中..."
					})
					let {
						data,
						errorMessage
					} = await request({
						url: '/wallet-get-coin-list',
						method: 'post',
						data: {
							"param": this.keyword,
							"page": this.pageIndex,
							"wallet_id": this.walletInfo.id,
							"limit": 20
						}
					})
					uni.hideLoading()
					this.isNoMore = data.records.length == 0 ? "nomore" : "none";
					this.pageIndex++
					this.list = this.list.concat(data.records)
				},
				search() {
					this.list = []
					this.pageIndex = 1
					this.getList()
				},
				//type  1添加 2删除
				async handle(type, id) {
					checkLogin()
					try {
						const {
							data
						} = await request({
							url: '/wallet-add-coin',
							method: "POST",
							data: {
								"coin_id": id,
								"wallet_id": this.walletInfo.id,
								"type": type
							}
						})
						this.list.map(item => {
							if (item.id == id) {
								item.is_added = !item.is_added
							}
						})

					} catch (e) {
						uni.showToast({
							title: e.errorMessage,
							icon: "none"
						})
					}

					// uni.showToast({
					// 	title: "已添加",
					// 	duration: 1000
					// })


				},
				change() {
					if (!this.keyword) {
						this.list = []
						this.pageIndex = 1
						this.getList()
					}
				}
			},
		}
</script>

<style scoped lang="scss">
	.head-box {
		width: 100%;
		padding: 0 30rpx;
	}

	.content {
		padding: 0 30rpx 60rpx 30rpx;

		position: relative;
		top: 40rpx;
		.title {
			margin: 20rpx 0 30rpx;
		}

		.flexs {
			display: flex;
			flex-direction: row;
		}

		.list {
			justify-content: space-between;
			align-items: center;
			margin: 0 auto 20rpx;
			width: 690rpx;
			height: 150rpx;
			background: #FFFEFF;
			box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
			border-radius: 20rpx;
		}

		.columns {
			display: flex;
			flex-direction: column;
		}
		
	}
	
	.nav-title {
		top: 20rpx !important;
	}
	
	.hunt-for {
		left: -10rpx; 
		position: relative;
		width: 627rpx;
		height: 76rpx;
		transform: translateY(20rpx);
	}
	/deep/ .u-icon__icon.uicon-nav-back.u-iconfont {
		top: 20rpx !important;
	}
</style>
