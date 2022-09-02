<!-- 地址本 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="title" :title-bold="true"
			 :custom-back="goBack"></u-navbar>
		<!-- <base-Item :init="true"  :size="size" @getData="getList" class="goodslists">
			<view slot="content" slot-scope="{ data }"> -->
		<view class="content">
			<view class="none-box flex-center-column" v-if="list.length==0">
				<image src="/static/my/none.png" mode="" class="img"></image>
				<view class="color-main font-body">{{$t('ibinz.msg44',["暂无数据"])}}</view>
			</view>
			<view class="box color-r" v-for="(item,index) in list"  @click="toPick(item)" v-if="!category || category == item.wallet_category">
				<image src="/static/my/bg.png" mode=""></image>
				
				<view class="box-view">
					<view style="display: flex;">
						<image :src="imgList[(item.wallet_category-1)]" mode=""
							style="width: 45rpx;min-width: 45rpx;height: 45rpx;margin-right: 17rpx;"></image>
						<view>
							<view class="font-max font-w box-title">{{item.name}}</view>
							<view class="font-body" style="margin-top: 19rpx;">{{item.wallet_address | setAddress}}
							</view>
						</view>
					</view>
					<view class="flex-align btns " :class="[$i18n.locale == 'en-US'?'font-s':'font-body']">
						<view class="btn1 flex-center" :class="[$i18n.locale == 'en-US'?'btn-box':'']"
							@click.stop="toPage(item.id)">{{$t('ibinz.msg45',["编辑"])}}</view>
						<view class="btn2 flex-center" :class="[$i18n.locale == 'en-US'?'btn-box':'']"
							@click.stop="copy(item.wallet_address)">{{$t('ibinz.msg46',["复制地址"])}}</view>
					</view>
				</view>
			</view>

			<view class="add-btn font-l flex-center color-r" @click="toPage()">{{$t('ibinz.msg47',["添加"])}}</view>
		</view>
		<!-- </view>
		</base-Item> -->
	</base-layout>
</template>

<script>
	import {
		request,
		navigateBack,
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				pageIndex: 1,
				size: 15,
				list: [],
				title: this.$t('ibinz.msg3', ["地址薄"]),
				type: '',
				imgList: ['/static/biticon/bit.png',  '/static/biticon/ethereum.png',
					'/static/biticon/tron.png','/static/biticon/dolami.png'
				],	
				// 钱包类型  category:1、比特币；2、以太坊；3、波场；4、Telegram X
				category: '',
				info:{}
			}
		},
		components: {

		},
		onLoad(option) {
			if(option.info) this.info =  JSON.parse(option.info)  || {}
			
			if (option.type) {
				this.type = option.type
				// this.coin_id = option.coin_id
				if(this.type == 1){
					const currentWallet = JSON.parse(uni.getStorageSync("currentWallet"))
					
					this.category =currentWallet.category;
				}
			}


		},
		filters: {
			setAddress(val) {
				return val.slice(0, 9) + '...' + val.slice(-9)
			}
		},
		onShow: function() {
			this.getList()
		},
		onPullDownRefresh() {

		},
		methods: {
			async getList() {
				uni.showLoading({
					title: this.$t('ibinz.msg48', ["加载中"])
				})
				// const pageIndex = page.pageIndex || 1;
				const {
					data
				} = await request({
					url: '/user_contact-page',
					method: 'get',
					params: {
						limit: this.size,
						page: this.pageIndex
					}
				})
				console.log("list: ", data.records);
				this.list = data.records
				uni.hideLoading()
				// end(opt);
			},
			toPick(item) {
				if (this.type == 1) {
					uni.redirectTo({
						url: `/pages/index/directTransfer?symbol=${this.info.symbol || ''}&coin_id=${this.info.coin_id|| ''}&balance=${this.info.balance ||''}&address=${item.wallet_address}`
					})
				} else {
					return
				}
	
			},
			copy(address) {
				uni.setClipboardData({
					data: address,
					success: function() {
						console.log('success');
					}
				});
			},
			toPage(id) {
				uni.navigateTo({
					url: '/pages/my/addressEdit?id=' + id + '&type=0'
				})
			},
			goBack() {
				console.log(333333);
				// uni.navigateTo({
				// 	url: '/pages/my/addressEdit?id=' + 1 + '&type=0'
				// })
				if(this.type !=1){
					uni.switchTab({
						url: '/pages/my/my'
					});
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 24rpx 21rpx;

		.box {
			height: 278rpx;
			width: 100%;
			position: relative;

			image {
				height: 278rpx;
				width: 100%;
			}

			.box-view {
				height: 278rpx;
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				padding: 37rpx 39rpx 51rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;

				.box-title {
					// border: 1px solid red;
					flex: 1;
					width: 57%;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1; //设置显示几行
					-webkit-box-orient: vertical;
					word-wrap: break-word
				}

				.btns {
					justify-content: flex-end;

					view {
						width: 150rpx;
						height: 60rpx;
						border-radius: 30rpx;
					}

					.btn-box {
						width: 175rpx;
					}

					.btn1 {
						background-color: #FFFFFF;
						color: #2DA5E1;
						margin-right: 20rpx;
					}

					.btn2 {
						border: 1px solid #FFFFFF;
						box-sizing: border-box;
					}
				}
			}
		}

		.add-btn {
			height: 110rpx;
			background: #3A83F7;
			// box-shadow: 0px 1px 5px 0px rgba(23, 119, 226, 0.4);
			border-radius: 30rpx;
			width: 599.1rpx;
			margin-top: 210rpx;
			position: relative;
			transform: translate(60rpx, 100rpx);
		}

		.none-box {
			margin-top: 159rpx;
			align-items: center;

			.img {
				width: 535rpx;
				height: 376rpx;
				margin-bottom: 12rpx;
			}
		}

	}
</style>
