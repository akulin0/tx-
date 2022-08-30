<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title-width="500" :title="title" title-color="#ffffff" back-icon-color="#ffffff"
				:background="{background:'#2DA5E1'} "></u-navbar>
			<view class="bgcolor">

			</view>
			<view class="exbox">
				<view class="classbase flex-j-a">
					<view class=" flex-j-a" @click="selectType(1)">
						<image :src="selectData.icon_url" class="baseimg" mode=""></image>
						<view style="margin: 0 16rpx 0 10rpx;font-size: 20rpx;">{{selectData.name}}</view>
						<u-icon name="arrow-down-fill" size="26"></u-icon>
					</view>
					<!-- <image src="/static/index/exchange.png" style="width: 38rpx;height: 34rpx;" mode=""></image> -->
					<!-- @click="exchangeData" -->
					<view class=" flex-j-a" @click="selectType(2)">
						<image :src="selectDatas.icon_url" class="baseimg" mode=""></image>
						<view style="margin: 0 16rpx 0 10rpx;font-size: 20rpx;">{{selectDatas.name}}</view>
						<u-icon name="arrow-down-fill" size="26"></u-icon>
					</view>
				</view>
				<view class="base-items">
					<view class="base-title">{{$t('home.txt42',['余额'])}}：{{Money}}</view>
					<view class="flex-j-a">
						<input type="number" class="base-put" :placeholder="placeholderT1" @confirm='changeNumber()'
							placeholder-style="color:#B3B3B3;font-size:28rpx" v-model="number" />
						<input type="text" class="base-put" style="text-align: right;"
							placeholder-style="color:#B3B3B3;font-size:28rpx" :placeholder="placeholderT2"
							:disabled="true" v-model="exchangeFee.actual_amount" />
					</view>
				</view>

				<view class="base-items">
					<view class="base-title" @click="open()">{{$t('home.txt46',['选择接收钱包'])}}
						<u-icon style="margin-left: 12rpx;" name="arrow-down-fill" size="20"></u-icon>
					</view>
					<view class="flex-j-a">
						<input type="text" class="base-put" disabled style="width: 100%;" :placeholder="placeholderT3"
							placeholder-style="color:#B3B3B3;font-size:28rpx" v-model="data.address" />
					</view>
				</view>
				<!-- <view style="height: 126rpx;display: flex;flex-direction: column;justify-content: center;">
					<view style="font-size: 28rpx;color: #333;">{{$t('home.txt48',['参考汇率'])}}</view>
					<view style="font-size: 28rpx;color: #808080;">1{{selectData.name}}={{usdtMoney}}USDT</view>
				</view> -->
				<!-- <view style="height: 126rpx;display: flex;flex-direction: column;justify-content: center;">
					<view style="font-size: 28rpx;color: #333;">{{$t('home.txt49',['手续费'])}}</view>
					<view style="font-size: 28rpx;color: #808080;">
						{{$t('home.txt50',['需支付'])}}{{exchangeFee.exchange_fee || 0}}{{$t('home.txt51',['个币'])}}

					</view>
				</view> -->
				<view v-if="number&&data.address">
					
					<base-button :disable="false" ref='button' @submit="confim()" :title="placeholderT4"
						style='margin-top: 50rpx;'></base-button>
				</view>
				
				<view v-else>
					<base-button :disable="true" ref='button' :title="placeholderT4" style='margin-top: 50rpx;'>
					</base-button>
				</view>
			</view>
			<view class="bglist">
				<view class="flexs " style="align-items: center;">
					<view class="line2"></view>
					<view style="margin-left: 12rpx;">
						{{$t('home.txt53',['交易记录'])}}
					</view>
				</view>
				<view class="imglist">
					<noData v-if="recordlists.length==0"></noData>
					<view v-for="(item,index) in recordlists" :key="index" class="msitem" v-else>
						<view class="timez">
							{{item.update_date}}
						</view>
						<view class="ms-item flex-j-a">
							<view class=" flex-j-a">
								<image class="msimg" :src="item.from_icon_url" mode=""></image>
								<view>
									<view class="ms-title">{{item.from_name}}</view>
									<view class="ms-text">
										{{item.address.substring(0,9)+'...'+item.address.substring(36)}}
									</view>
								</view>
							</view>
							<view class="ms-val">{{item.amount}}</view>
						</view>
						<view>
							<image src="/static/index/transicon.png"
								style="width: 10rpx;height: 32rpx;margin-left: 32rpx;" mode=""></image>
						</view>
						<view class="ms-item flex-j-a">
							<view class=" flex-j-a">
								<image class="msimg" :src="item.to_icon_url" mode=""></image>
								<view>
									<view class="ms-title">{{item.to_name}}</view>
									<view class="ms-text">
										{{item.address.substring(0,9)+'...'+item.address.substring(36)}}
									</view>
								</view>
							</view>
							<view class="ms-val">{{item.actual_amount}}</view>
						</view>
						<view class="line"></view>
					</view>
				</view>

			</view>
<!-- 			<u-popup v-model="show" mode="center" border-radius="20" :closeable='false'>
				<view class="popupboxs">
					<view class="codepass">{{$t('home.txt54',['验证密码'])}}</view>
					<input type="password" v-model="data.password" class="codeinput" />
					<view style="color: #666;font-size: 26rpx;" @click="topage('/pages/wallet/resetPass')">
						{{$t('home.txt57',['忘记密码'])}}
					</view>
					<view class="line"></view>
					<view class="confim flex-j-a">
						<view @click="cancel()">{{$t('home.txt55',['取消'])}}</view>
						<view style="border-left: 1px solid #E5E5E5;color:#2DA5E1 ;" @click="confim()">
							{{$t('home.txt56',['确认'])}}
						</view>
					</view>
				</view>
			</u-popup> -->
			<u-popup v-model="shows" mode="bottom" height="400" border-radius="20" :closeable='false'>
				<view class="typelist">
					<!-- <u-search placeholder="搜索" v-model="keyword" :show-action='false'></u-search> -->
					<view v-for="(item,index) in lists" :key='index' @click="select(item,index,1)"
						class="type-item flex-j-a">
						<view class="flex-align">
							<image :src="item.icon_url" style="margin-right: 16rpx;" mode=""></image>
							<view>{{item.name}}</view>
						</view>
						<u-icon name="checkbox-mark" v-if="selectData.index==index" size="32" color="#2DA5E1"></u-icon>
					</view>
				</view>
			</u-popup>
			<u-popup v-model="shows2" mode="bottom" height="400" border-radius="20" :closeable='false'>
				<view class="typelist">
					<!-- <u-search placeholder="搜索" v-model="keyword" :show-action='false'></u-search> -->
					<view v-for="(item,index) in lists2" :key='index' @click="select(item,index,2)"
						class="type-item flex-j-a">
						<view class="flex-align">
							<image :src="item.icon_url" style="margin-right: 16rpx;" mode=""></image>
							<view>{{item.name}}</view>
						</view>
						<u-icon name="checkbox-mark" v-if="selectDatas.index==index" size="32" color="#2DA5E1"></u-icon>
					</view>
				</view>
			</u-popup>
			<wallet ref="wallet" @changeWallet="changeWallet" :category="category"></wallet>
		</view>
	</base-layout>
</template>

<script>
	import {
		md5,
		request,
		jsonToParams
	} from "@/m-subpack/base";
	import wallet from "@/components/wallet2.vue"
	import noData from "@/m-common/common/components/noData.vue"
	export default {
		data() {
			return {
				title: this.$t('home.txt41', ['币币兑换']),
				placeholderT1: this.$t('home.txt43', ['转出数量']),
				placeholderT2: this.$t('home.txt44', ['接收数量']),
				placeholderT3: this.$t('home.txt147', ['请选择']),
				placeholderT4: this.$t('home.txt52', ['开始兑换']),
				number2: '',
				number: "",
				exchangeFee: {
					exchange_fee: "",
					actual_amount: "",
					bigDecimal: ''
				},
				show: false,
				shows: false,
				shows2: false,
				disabled: true,
				pass: '',
				Money: "",
				usdtMoney: '',
				data: {
					address: '',
					number: null,
					password: "",
					wallet_id: ''
				},
				keyword: "",
				selectData: {
					id: 0,
				},
				selectDatas: {
					id: 0,
				},
				lists: [],
				lists2: [],
				recordlists: [],
				pageIndex: 1,
				coinInfo1: {},
				coinInfo2: {},
				currentWallet: {},
				oldList: [],
				category: '',
			}
		},
		components: {
			wallet,
			noData
		},
		watch: {
			data(v) {
				console.log(v)
			},
			number(v) {
				this.changeNumber(v)
			}
		},
		onShow() {
			this.data.address = uni.getStorageSync('receiveWallet').address || ""
			// this.currentWallet = uni.getStorageSync('currentWallet')
		},
		onLoad() {



			console.log('钱包信息aaaaa',uni.getStorageSync('currentWallet').id);
			this.data.wallet_id = uni.getStorageSync('currentWallet').id


			this.getData()
			//钱包类型  category:1、比特币；2、以太坊；3、波场；4、Telegram X
			// let  category = uni.getStorageSync('currentWallet').category || ""
			// switch (category) {
			// 	case 1:
			// 		this.category = 'BTC'
			// 		break;
			// 	case 2:
			// 		this.category = 'ETH'
			// 		break;
			// 	case 3:
			// 		this.category = 'TRX'
			// 		break;
			// 	case 4:
			// 		this.category = 'DLM'
			// 		break;
			// }
			// console.log(this.category)
			// this.getMsgList()

			//wallet_category
		},
		onUnload() {
			uni.removeStorageSync('receiveWallet');
		},
		methods: {
			async rule() {
				this.show = true
				// this.data.password = ""
				// if (this.Money < 0.001) {
				// 	uni.showToast({
				// 		title: '余额不足,请充值！',
				// 		icon: 'none',
				// 		duration: 1000
				// 	})
				// 	this.$refs.button.hideLoading()
				// 	return
				// } else {
				// 	this.show = true
				// }
			},
			async initList2(item) {
				// console.log("item: ", item);
				//symbol
				this.lists2 = [];
				let {
					data,
					errorMessage
				} = await request({
					url: '/exchangeCoins',
					method: 'get',
					params: {
						category: item.wallet_category,
						symbol: item.symbol
					}
				})
				console.log("data: ", data);
				this.lists2 = data
				this.selectDatas = {
					...this.lists2[0],
					index: 0
				}
				this.category = this.selectDatas.wallet_category
				// this.oldList.map(item => {
				// 	if (item.wallet_category != data.wallet_category && item.symbol == data.symbol) {
				// 		this.lists2.push(item);
				// 	}
				// })

				// this.selectDatas = this.lists2[0]
			},
			async getData() {
				console.log("加载中")
				
				uni.showLoading({
					title: this.$t("home.txt17", ["加载中"])
				})
	
			
				this.lists = []
				this.currentWallet = uni.getStorageSync('currentWallet')
				console.log('钱包信息', this.currentWallet);
				let {
					data,
					errorMessage
				} = await request({
					url: '/exchangeCoins',
					method: 'get'
				})

				this.oldList = data.map((item) => {
					item.value = item.id
					return item
				})
				this.oldList.map((item) => {
					if (item.wallet_category == this.currentWallet.category) {
						this.lists.push(item);
					}

				})
				// console.log("this.oldList: ", this.lists);

				this.selectData = {
					...this.lists[0],
					index: 0
				}
				console.log('选中第一个币：', this.selectData);
				// this.selectDatas = {
				// 	...this.lists[1],
				// 	index: 1
				// }

				this.initList2(this.lists[0]);

				//this.lists2 = this.lists
				this.getRate(this.selectData.wallet_category)
				this.getMoney(this.selectData.id, uni.getStorageSync('currentWallet').id || "")
				uni.hideLoading()
				// console.log("兑换币列表: ",this.selectData);
				// this.coinInfo1=this.selectData
				// this.coinInfo2=this.selectDatas
			},

			topage(url) {
        this.toPage(url)
			},
			exchangeData() {
				let briade = this.selectData
				this.selectData = this.selectDatas
				this.selectDatas = briade
			},
			select(v, i, type) {
				if (type == 1) {
					this.initList2(v)

				} else {
					this.data.address = ""
					uni.removeStorageSync('receiveWallet');
				}
				// if (this.selectDatas.index == i) {
				// 	this.selectDatas = this.selectData
				// 	this.selectData = {
				// 		...v,
				// 		index: i
				// 	}
				// 	this.shows = false
				// } else if (this.selectData.index == i) {
				// 	this.selectData = this.selectDatas
				// 	this.selectDatas = {
				// 		...v,
				// 		index: i
				// 	}
				// 	this.shows2 = false
				// } else {
				if (this.currentType == 1) {
					this.selectData = {
						...v,
						index: i
					}
					this.shows = false


				} else {
					this.selectDatas = {
						...v,
						index: i
					}
					this.shows2 = false
				}
				// }
				console.log('xuanze', this.selectData.id);
				this.getMoney(this.selectData.id, uni.getStorageSync('currentWallet').id || "")
				this.category = this.selectDatas.wallet_category
				// console.log('uuuuuuuuuu',this.category);
				if (this.selectData.wallet_category) this.getRate(this.selectData.wallet_category)
				else this.usdtMoney = 0
			},
			async changeNumber(v) {
				let params = {
					amount: v,
					from_coin_id: this.selectData.id,
					to_coin_id: this.selectDatas.id
				}
				let {
					data,
					errorMessage
				} = await request({
					url: '/exchange-fee',
					method: 'post',
					data: params
				})
				this.exchangeFee = data

			},
			async getMsgList() {
				let params = {
					wallet_id: uni.getStorageSync('currentWallet').id || "",
					pageNumber: 1,
					pageSize: 10
				}
				let {
					data,
					errorMessage
				} = await request({
					url: '/exchange-record?' + jsonToParams(params),
					method: 'get',

				})
				this.recordlists = data

			},
			async getMoney(coin_id, wallet_id) {
				let {
					data,
					errorMessage
				} = await request({
					url: '/walletget-balance',
					method: 'get',
					params: {
						"coin_id": coin_id,
						wallet_id: wallet_id
					}
				})
				this.Money = data.balance || 0
				// console.log(data, '汇率')

			},
			async getRate(category) {
				let {
					data,
					errorMessage
				} = await request({
					url: '/walletConversionRate',
					method: 'get',
					params: {
						"category": category
					}
				})
				this.usdtMoney = data || 0
				// console.log(data, '汇率')

			},
			selectType(i) {
				this.currentType = i
				if (i == 1) this.shows = true
				else {
					this.shows2 = true;
					this.data.address = ""
				}
			},
			changeWallet(item) {
				// let currentWallet = uni.getStorageSync('currentWallet')
				this.data.address =item.address || ""
				// this.getData()
				// this.getMoney(this.selectData.id, currentWallet.id)
				// console.log("当前钱包", this.walletInfo)
			},
			async confim() {
				// 钱包类型  category:1、比特币；2、以太坊；3、波场；4、Telegram X
				// this.show = false;
				
				if (this.Money < 0.001) {
					uni.showToast({
						title: '余额不足,请充值！',
						icon: 'none',
						duration: 1000
					})
					this.$refs.button.hideLoading()
					return
				} 
				var address = this.data.address;
				// console.log('qia',this.selectDatas.wallet_category);
				// switch (this.selectDatas.wallet_category) {
				// 	case 1:
				// 		if (address.startsWith("1") == false && address.startsWith("3") == false && address.startsWith(
				// 				"bc") == false) {
				// 			this.show = false
				// 			uni.showToast({
				// 				title: "选择的钱包类型不匹配",
				// 				icon: "none"
				// 			})
				// 			this.$refs.button.hideLoading()

				// 			return;
				// 		}
				// 		break;

				// 	case 2:
				// 		if (address.startsWith("0x") == false) {
				// 			this.show = false
				// 			uni.showToast({
				// 				title: "选择的钱包类型不匹配",
				// 				icon: "none"
				// 			})
				// 			this.$refs.button.hideLoading()
				// 			return;
				// 		}
				// 		break;

				// 	case 3:
				// 		// console.log("666: ",address.startsWith("T"));
				// 		if (address.startsWith("T") == false) {
				// 			this.show = false
				// 			uni.showToast({
				// 				title: "选择的钱包类型不匹配",
				// 				icon: "none"
				// 			})
				// 			this.$refs.button.hideLoading()
				// 			return;
				// 		}
				// 		break;

				// 	case 4:
				// 		if (address.startsWith("D") == false) {
				// 			this.show = false
				// 			uni.showToast({
				// 				title: "选择的钱包类型不匹配",
				// 				icon: "none"
				// 			})
				// 			this.$refs.button.hideLoading()
				// 			return;
				// 		}
				// 		break;
				// }



				// console.log('钱包id',this.data.wallet_id);

				let dataObj  = {
							address: this.data.address,
							password: this.data.password,
							wallet_id: this.data.wallet_id,
							from_coin_id: this.selectData.id,
							to_coin_id: this.selectDatas.id,
							amount: this.number,
							password: this.data.password
							
						};
				try {
					let {
						data,
						errorMessage
					} = await request({
						url: '/exchange',
						method: 'post',
	
						data: dataObj
					})
					if (errorMessage == "success") {
						uni.showToast({
							title: this.$t('home.txt126', ['兑换成功']),
							duration: 1000
						})
						this.number = '';
						this.data.number = "";
						this.data.address = '';
						this.data.password = "";
						this.exchangeFee.actual_amount = "";
						this.getMsgList();
						this.getMoney(this.selectData.id, uni.getStorageSync('currentWallet').id)
					}
					this.$refs.button.hideLoading()
					this.show = false
				} catch (e) {
					//TODO handle the exception
					this.$refs.button.hideLoading()
					this.show = false
				}

			},
			cancel() {
				this.show = false
				this.$refs.button.hideLoading()
			},
			open() {
				// console.log("--------- ",this.category);
				if (this.category) this.$refs.wallet.changeMoney()

				// this.category=this.currentWallet.category

			},
			//页面跳转
			topage(url) {
        this.toPage(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bgcolor {
		height: 478rpx;
		width: 750rpx;
		position: absolute;
		background: linear-gradient(180deg, #2DA5E1, #FFFFFF);
	}

	.typelist {
		padding: 30rpx;

		.type-item {
			height: 124rpx;
			border-bottom: 1px solid #E5E5E5;

			image {
				width: 64rpx;
				height: 64rpx;
			}
		}
	}

	.popupboxs {
		width: 556rpx;
		height: 324rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;

		.line {
			width: 616px;
			height: 1px;
			margin-top: 28rpx;
			background-color: #E5E5E5;
			margin-left: -30rpx;
		}

		.confim {
			position: absolute;
			height: 108rpx;
			bottom: 0;

			>view {
				text-align: center;
				line-height: 108rpx;
				width: 278rpx;
			}
		}

		.codepass {
			font-size: 34rpx;
			font-weight: 500;
			color: #333333;
			text-align: center;
		}

		.codeinput {
			width: 556rpx;
			height: 80rpx;
			margin: 30rpx auto;
			background: #F5F5F5;
			border-radius: 10rpx;
		}
	}

	.imglist {
		margin-top: 40rpx;
		width: 690rpx;
		// min-height: 900rpx;
		background: #FFFFFF;
		box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
		border-radius: 20rpx;

		.msitem {
			padding: 30rpx;
			height: 306rpx;
			display: flex;
			flex-direction: column;

			.line {
				height: 1px;
				background-color: #E5E5E5;
				width: 100%;
				margin-top: 30rpx;
			}

			.ms-item {
				height: 98rpx;
			}

			.ms-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
			}

			.ms-text {
				font-size: 26rpx;
				font-weight: 500;
				color: #999999;
			}

			.ms-val {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
		}

		.msimg {
			width: 64rpx;
			height: 64rpx;
			margin-right: 18rpx;
		}

		.timez {
			width: 270rpx;
			height: 36rpx;
			background: #FAFAFA;
			font-size: 24rpx;
			line-height: 36rpx;
			text-align: center;
			font-weight: 500;
			color: #666666;
			border-radius: 10rpx;
		}
	}

	.exbox {
		width: 630rpx;
		padding: 30rpx;
		// height: 807rpx;
		position: absolute;
		z-index: 11;
		left: 0;
		right: 0;
		margin: 20rpx auto;
		background: #FFFFFF;
		box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
		border-radius: 20rpx;

		.base-items {
			height: 166rpx;
			border-bottom: 1px solid #E5E5E5;

			.base-title {
				padding-top: 20rpx;
				font-size: 28rpx;
				color: #333;
			}

			.base-put {
				height: 100rpx;
				display: flex;
				align-items: center;
			}
		}

		.classbase {
			border-bottom: 1px solid #E5E5E5;
			height: 104rpx;


			.baseimg {
				width: 64rpx;
				height: 64rpx;
			}
		}
	}

	.flexs {
		display: flex;
		flex-direction: row;
	}

	.line2 {
		width: 8rpx;
		height: 32rpx;
		background: linear-gradient(0deg, #0263FF, #17A7F8);
		border-radius: 4rpx;
	}

	.bglist {
		margin: 700rpx 30rpx 0 30rpx;
	}
</style>
