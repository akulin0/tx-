<template>
	<view>
		<u-popup v-model="show" mode="bottom" border-radius="30" :closeable="false" :mask-close-able='false'>
			<view class="moneyList" v-if="showOther">
				<view class="m-header flexs">
					<view class="commonfont" @click="goTo('/pages/my/wallet')">{{
								  $t("home.txt18", ["管理钱包"])
								}}</view>
					<view class="m-title" style="text-align: center;">{{
								  $t("home.txt19", ["钱包列表"])
								}}</view>
								
					<view @click="close" style="width: 60rpx;text-align: right;">
						<u-icon name="close" style="" size="32"></u-icon>
					</view>
				</view>
				<view class="m-nav flexs">
					<view v-for="(item,index) in bitlist" :key="index">
						<image :src="item.select" v-if="currentSelect==index" mode=""></image>
						<image :src="item.img" v-else @click="changeSelect(item,index) " mode=""></image>
					</view>
				</view>
				<view class="m-titles flexs">
					<view class="titlesub">{{currentText}}</view>
					<view class="commonfont" @click="showOther=false">{{
								  $t("home.txt20", ["添加钱包"])
								}}</view>
				</view>
				<view>
					<view class="flexs" v-for="(item,index1) in nodelist" :key="index1">
						<view class="node">
							<image src="/static/biticon/node.png" mode=""></image>
							<u-line color="#999999" length="136" style="width: 24px;" border-style="dashed"
								direction='col'></u-line>
						</view>
						<view class="items flexs">
							<view class="tip"></view>
							<view style="margin-left: 30rpx;">
								<view><text class="color-f8" v-if="currentText == 'DLMU' && index1 == 0">{{$t('home.txt148',['初始'])}}</text>{{item.name}}</view>
								<view class="flexs" style="align-items: flex-end;">
									<view class="commonfonts">{{item.addressx}}</view>
									<image class="copy" src="/static/biticon/copy.png" @click="copy(item.address)"
										mode="">
									</image>
								</view>
							</view>
							<view>
								<!-- <image src="/static/biticon/currentselect.png"
									v-if="bitlist[currentSelect].isCheck==true && item.state==1"
									style="width: 80rpx;height: 80rpx;margin-right: 60rpx;" mode=""></image> -->
								<view class="m-btn" @click="selectMoney(item,index)" >{{
								  $t("home.txt21", ["选择钱包"])
								}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="otherMoney" v-else>
				<view class="commonfont" style="font-size: 30rpx;border-bottom: 1rpx solid #E6E6E6;"
					@click="goTo('/pages/index/addcreate?type=1')">{{
								  $t("home.txt22", ["创建钱包"])
								}}</view>
				<view class="commonfont" style="font-size: 30rpx;border-bottom: 8rpx solid #E6E6E6;"
					@click="goTo('/pages/index/addcreate?type=2')">{{
								  $t("home.txt23", ["导入钱包"])
								}}</view>
				<view class="commonfonts" style="font-size: 30rpx;" @click="showOther=true">{{
								  $t("home.txt24", ["取消"])
								}}</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
  import {saveCurrentWallet} from '../libs/wallet';
	export default {
		data() {
			return {
				show: false,
				showOther: true, //选择钱包
				currentSelect: 0, //默认显示的钱包种类
				currentText: 'DLMU',
				// 钱包 种类列表
				bitlist: [
					// {
					// 	img: "/static/biticon/bit_.png",
					// 	select: "/static/biticon/bit.png",
					// 	text: this.$t("home.txt25", ["比特币"]),
					// 	category: 1,
					// 	isCheck: true
					// },
					{
						img: "/static/biticon/dolami_.png",
						select: "/static/biticon/dolami.png",
						text: 'DLMU',
						category: 4,
						isCheck: true
					},
					{
						img: "/static/biticon/ethereum_.png",
						select: "/static/biticon/ethereum.png",
						text: 'ETH',
						category: 2,
						isCheck: false
					},
					{
						img: "/static/biticon/tron_.png",
						select: "/static/biticon/tron.png",
						text: 'TRX',
						category: 3,
						isCheck: false
					},
				],
				nodelist: [],
				selectIndex: 0
			}
		},
		props: ['showT', 'category', 'type'],
		beforeUpdate() {

			// 	this.currentText=this.bitlist[this.currentSelect].text
			// 	console.log("currentText: ",this.currentText);
		},
		watch: {
			category(v) {
				// console.log('12121', v)

			},
			type(e) {
				console.log("typetype", e);
			}
		},
		mounted() {
				this.getList();
		},
		methods: {
			// 钱包tab切换
			changeSelect(item, index) {
				this.nodelist = []
				this.currentSelect = index
				this.bitlist[index].isCheck = true
				this.getMoeny(item.category)
				this.currentText = item.text
			},
			// 钱包列表  category:1、比特币；2、以太坊；3、波场；4、Telegram X
			async getMoeny(category) {
				console.log(category, 'category');
				var wallet = JSON.parse(uni.getStorageSync("currentWallet"))
				if (!wallet) {
					console.log('没有选中钱包');
					category = 4
				}
				let {
					data,
					errorMessage
				} = await request({
					url: '/wallet-get-all-wallet-list',
					method: 'get',
					params: {
						"category": category,
					}
				})
				this.nodelist = data.map((item) => {
					item.addressx = item.address.substring(0, 6) + '***' + item.address.substring(30)
					item.select = false
					if (item.id == wallet.id) {
						item.select = true
					}
					return item

				})
				if (!wallet) {
					console.log("bitlist9999: ", this.bitlist);
					// this.bitlist[1].isCheck=true
					this.bitlist[0].isCheck = true
					// this.selectIndex=1
					// uni.setStorageSync('currentWallet', this.bitlist[1])

					uni.setStorageSync('currentWallet', this.bitlist[0])
          saveCurrentWallet(this.bitlist[0])
				}
				// console.log("钱包列表", this.nodelist);
			},
			// 选择钱包
			async selectMoney(item, index) {
				console.log(item);
				this.selectIndex = index
				this.bitlist.map((item, index) => {
					if (index == this.currentSelect) {
						item.isCheck = true
					} else {
						item.isCheck = false
					}
				})

				// let {
				// 	data,
				// 	errorMessage
				// } = await request({
				// 	url: '/wallet-update-Wallet-State',
				// 	method: 'get',
				// 	params: {
				// 		"walletId": item.id,
				// 	}
				// })
				console.log(22222,this.type,111,this.category);
				if (this.category && !this.type) {
					console.log("receiveWallet");
					uni.setStorageSync('receiveWallet', item)
				} else {
					console.log("currentWallet");
					uni.setStorageSync('currentWallet', item)
          saveCurrentWallet(item)
				}

				this.$emit("changeWallet",item);
				item.select = true
				this.show = false
				uni.showTabBar()
				this.currentSelect = 0
				if (!this.category) {
					this.getMoeny(4)
				}

				this.currentText = this.$t("home.txt26", ["Telegram X"])
			},
			goTo(url) {
				this.show = false
				uni.showTabBar()
				this.showOther = true
        this.toPage(url)
			},
			copy(v) {
				uni.setClipboardData({
					data: v,
					success: function() {
						this.$refs.uToast.show({
							title: this.$t("home.txt16", ["复制成功"]),
							type: 'success'
						})
					}
				});
			},
			close() {
				this.show = false
				uni.showTabBar()
			},
			async	getList(){
					let {
						data,
						errorMessage
					} = await request({
						url: '/wallet-getChainCategory',
						method: 'get',
					})
				this.bitlist = data;
				for(var index in data){
				    this.currentCategoryText[data[index].category] = data[index].name;
				
				}
			},
			changeMoney() {
				uni.hideTabBar()
				this.currentSelect = 0
				this.show = true
				if (!this.category) {
					this.getMoeny(4)
				}
				console.log('接收钱包类型', this.category);
				if (this.category) {
					this.bitlist = [
							{
								img: "https://dolaimi.oss-us-west-1.aliyuncs.com/common/BNB.png",
								select: "https://dolaimi.oss-us-west-1.aliyuncs.com/common/BNB_.png",
								text: 'BNB',
								category: 6,
								isCheck: true
							},
							{
								img: "https://dolaimi.oss-us-west-1.aliyuncs.com/common/HB.png",
								select: "https://dolaimi.oss-us-west-1.aliyuncs.com/common/HB_.png",
								text: 'HB',
								category: 7,
								isCheck: true
							},
							{
								img: "/static/biticon/dolami_.png",
								select: "/static/biticon/dolami.png",
								text: this.$t("home.txt26", ["Telegram X"]),
								category: 4,
								isCheck: true
							},
							{
								img: "/static/biticon/ethereum_.png",
								select: "/static/biticon/ethereum.png",
								text: this.$t("home.txt27", ["以太坊"]),
								category: 2,
								isCheck: false
							},
							{
								img: "/static/biticon/tron_.png",
								select: "/static/biticon/tron.png",
								text: this.$t("home.txt28", ["波场"]),
								category: 3,
								isCheck: false
							},
						],
						this.bitlist.map((item) => {
							console.log("item: ", item);
							if (item.category == this.category) {
								this.bitlist = []
								this.bitlist.push(item)
							}
						})
					this.currentText = this.bitlist[0].text
					this.getMoeny(this.bitlist[0].category)
					console.log("this.bitlist: ", this.bitlist);
				}
			},

		}
	}
</script>

<style scoped lang="scss">
	.color-f8{
		color: #FF8B00;
		margin-right: 10rpx;
	}
	.flexs {
		display: flex;
		flex-direction: row;
	}

	.commonfont {
		font-size: 26rpx;
		font-weight: 500;
		color: #2DA5E1;
	}

	.commonfonts {
		font-size: 26rpx;
		font-weight: 500;
		color: #999999;
	}

	.otherMoney {
		width: 750rpx;
		height: 296rpx;
		background: #FFFFFF;

		>view {
			width: 750rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
			background: #FFFFFF;
		}
	}

	.moneyList {
		width: 750rpx;
		height: 944rpx;
		width: calc(100% - 60rpx);
		padding: 0 30rpx;
		background: #FFFFFF;

		.node {
			image {
				width: 24rpx;
				height: 24rpx;
			}
		}

		.items {
			width: 640rpx;
			height: 130rpx;
			background: #FFFEFF;
			box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
			border-radius: 16rpx;
			margin-top: 16rpx;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.m-btn {
				width: 150rpx;
				height: 60rpx;
				background: #2DA5E1;
				margin-right: 30rpx;
				font-size: 24rpx;
				line-height: 60rpx;
				text-align: center;
				font-weight: 500;
				color: #FFFFFF;
			}

			.copy {
				width: 22rpx;
				height: 22rpx;
				margin-left: 20rpx;
				margin-bottom: 4rpx;
			}

			.tip {
				position: absolute;
				width: 4rpx;
				height: 26rpx;
				background: #2DA5E1;
				border-radius: 2px;
				left: 0;
				top: 34rpx;
			}
		}

		.m-titles {
			height: 66rpx;
			align-items: flex-end;
			justify-content: space-between;

			.titlesub {
				font-size: 34rpx;
				font-weight: bold;
				color: #333333;
			}
		}

		.m-nav {
			width: 750rpx;
			height: 80rpx;
			background: #F5F5F5;
			align-items: center;
			margin-left: -30rpx;
			padding-left: 30rpx;

			image {
				width: 60rpx;
				height: 60rpx;
				margin-right: 60rpx;
			}
		}

		.m-header {
			align-items: center;
			height: 90rpx;
			justify-content: space-between;
		}

		.m-title {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
		}
	}
</style>
