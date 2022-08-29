<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :is-fixed="true" :title="title" style="border-bottom: 1px solid #E6E6E6;"
				:title-bold="true"></u-navbar>
			<view class="importbox">
				<view class="input-item">
					<view class="commonfont flex-j-a">
						<view>{{$t('home.txt81',['收款地址'])}}</view>
						<image src="/static/index/book.png" style="width: 34rpx;height: 34rpx;" mode=""
							@click="topage(`/pages/my/addressBook?type=1`)"></image>
					</view>
					<input type="text" :placeholder="placeholder" placeholder-style="color:#B3B3B3;font-size:28rpx"
						class="i-items" v-model="data.address" />
				</view>
				<view class="input-item">
					<view class="commonfont flex-j-a">
						<view>{{$t('home.txt83',['转账金额'])}}</view>
						<view style="font-weight: 500;" @click="topage('/pages/index/tokenList')">
							{{symbol}}
							<u-icon name="arrow-right" size="28"></u-icon>
						</view>

					</view>
					<view class="moenyval">
						<input type="number"  @keyup="inputChangeMoney(data.money)" :placeholder="placeholder1" placeholder-style="color:#B3B3B3;font-size:28rpx"
							class="i-items" v-model="data.money" />
						<!-- <span class="all" @click='all()'>{{$t('home.txt85',['全部'])}}</span> -->
					</view>
				</view>
				<view class="commonfont flex-j-a">
					<view>
						{{$t('home.txt86',['余额'])}}
					</view>
					<view style="font-weight: 500;">{{balance}} {{symbol}}</view>
				</view>
			</view>
			<view style="width: 100%;height: 20rpx;background-color: #F5F5F5;"></view>
			<view class="mystyle" v-if="currentWallet.category!=3">
				<view class="commonfont">
					{{$t('home.txt87',['矿工费'])}}
				</view>
				<view class="flex-j-a">
					<view class="transdemo" v-for="(item,index) in list" :key="index" @click="current=index"
						:style="current==index?'border-color:#2DA5E1':''">
						<view class="demofont" :style="current==index?'color:#2DA5E1':''">{{item.t}}</view>
						<view class="demofonts" :style="current==index?'color:#2DA5E1':''">
							<view>{{feeInfo[item.v] || 0}}{{symbol}}</view>
							<view>≈${{feeInfo[item.m] || 0}}</view>
						</view>
						<view class="demofontsub" :style="current==index?'color:#2DA5E1':''">
							≈{{item.s}}{{$t('home.txt88',['分钟'])}}</view>
						<image src="/static/index/select.png" v-if="current==index" class="select" mode=""></image>
					</view>

				</view>


			</view>
			<base-button v-if="data.address&&data.money" style="margin: 60rpx auto;width: 690rpx;" ref="button"
				@submit="confim()" :title="btnTitle" />
			<button v-else class="nosubmit">{{$t('home.txt56',['确认'])}}</button>
<!-- 			<u-popup v-model="show" mode="center" border-radius="20" :closeable='false'>
				<view class="popupboxs">
					<view class="codepass">{{$t('home.txt54',['验证密码'])}}</view>
					<input password v-model="pass" class="codeinput" />
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
		</view>
	</base-layout>
</template>

<script lang="ts">
	import {
		Assets
	} from "@/decorator/wallet"
	import {
		Component,
		Vue
	} from "vue-property-decorator";

	import {
		request,
		navigateTo
	} from "@/m-subpack/base";


	@Component({})
	@Assets()
	export default class Idnex extends Vue {
		show = false;
		pass = "";
		title = "";
		placeholder = "";
		placeholder1 = "";
		btnTitle = "";
		data = {
			gwei: "",
			gas: '',
			address: "",
			money: "",
		};
		symbol = '';
		list = [];
		current = 1;
		balance = "";
		feeInfo = {};
		unit = "";
		unit1 = "";


		onLoad(opt: any) {
			this.data.address = opt.address;
			this.symbol = opt.symbol;
			this.coin_id = opt.coin_id;
			this.balance = opt.balance;
		}

		async onShow() {
			this.title = this.$t('home.txt80', ['直接转账']);
			this.placeholder = this.$t('home.txt82', ['请输入或粘贴钱包地址']);
			this.btnTitle = this.$t('home.txt56', ['确认']);
			this.placeholder1 = this.$t('home.txt84', ['请输入数量']);
			this.list = [{
					t: this.$t('home.txt89', ['慢']),
					v: "safeGasPrice",
					m: "safeGasPriceDollar",
					s: "60"
				},
				{
					t: this.$t('home.txt90', ['推荐']),
					v: "proposeGasPrice",
					m: "proposeGasPriceDollar",
					s: "30"
				},
				{
					t: this.$t('home.txt91', ['快']),
					v: "fastGasPrice",
					m: "fastGasPriceDollar",
					s: "10"
				}
			];


			await this.init();
			if (!this.symbol) {

				this.symbol = this.coinLists[0].symbol;
				this.coin_id = this.coinLists[0].coin_id;
				this.balance = this.coinLists[0].balance;
			}

			switch (this.currentWallet.category) {
				case 1:
					this.unit = 'sat/b'
					this.unit1 = 'byte'
					break;
				case 2:
					this.unit = 'gwei'
					this.unit1 = 'gas'
					break;
				case 4:
					this.unit = '未知'
					this.unit1 = '未知'
					break;
				default:
					break;
			}

			if (!this.gasPrice && this.currentWallet.category != 3) this.getFee(this.coin_id)
		}



		async topage(url) {
			const data = await navigateTo(url);
			if (data.address) {
				this.data.address = data.address;
			} else {
				this.symbol = data.symbol;
				this.coin_id = data.coin_id;
				this.balance = data.balance;
				console.log(this);
				// debugger
			}
		}

		//获取矿工手续费
		async getFee(coin_id) {
			uni.showLoading({
				title: this.$t('home.txt17', ['加载中'])
			})
			const {
				data
			} = await request({
				url: '/walletselect_fee',
				method: 'post',
				params: {
					coin_id: coin_id
				}
			})
			this.feeInfo = data
			this.data.gwei = data.proposeGas
			this.data.gas = data.gasLimit
			this.gasPrice = data.proposeGasPrice
			this.gasPriceDollar = data.proposeGasPriceDollar
			uni.hideLoading()
			console.log("data: ", data);
		}

		//转账
		submit() {
			this.show = true;
			this.$refs.button.hideLoading()
		}
		inputChangeMoney(v){
			 v = v.replace(/[^\d]/g, '')
		}
		//转账验证
		async confim() {
			// debugger
			this.show = false;
			let current = ''
			let gasPrice = ''
			if (this.current == 3) {
				gasPrice = Number(this.data.gwei)
			} else {
				current = this.current
				gasPrice = Number(this.data.gwei)
			}
			try {
				const {
					data
				} = await request({
					url: '/wallettransaction',
					method: 'post',
					data: {
						amount: this.data.money,
						coin_id: this.coin_id,
						target_address: this.data.address,
						wallet_id: this.currentWallet.id,
						password: this.pass,
						//转账手续费 1、慢 2、标准 3、快
						transaction_fee_type: current,
						gas_price: gasPrice
					}
				})
				this.$refs.button.hideLoading()
				uni.showToast({
					title: this.$t('home.txt128', ['转账申请已提交'])
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/index/userMoney'
					})
				}, 1500)
			} catch (e) {
				this.$refs.button.hideLoading()
				console.log(e);
				//TODO handle the exception
				this.pass = ''
			}


			// if(errorCode!=0){
			// 	this.pass=''
			// }
			// console.log("data: ",data);
		}

		//取消
		cancel() {
			this.show = false
			this.pass = ''
		}
	}
	// import {
	// 	request
	// } from "@/m-subpack/base";
	// import Md5 from "@/components/md5.js"
	// export default {
	// 	data() {
	// 		return {
	// 			show: false,
	// 			pass: "",
	// 			title: this.$t('home.txt80', ['直接转账']),
	// 			placeholder: this.$t('home.txt82', ['请输入或粘贴钱包地址']),
	// 			placeholder1: this.$t('home.txt84', ['请输入数量']),
	// 			list: [{
	// 					t: this.$t('home.txt89', ['慢']),
	// 					v: "safeGasPrice",
	// 					m: "safeGasPriceDollar",
	// 					s: "60"
	// 				},
	// 				{
	// 					t: this.$t('home.txt90', ['推荐']),
	// 					v: "proposeGasPrice",
	// 					m: "proposeGasPriceDollar",
	// 					s: "30"
	// 				},
	// 				{
	// 					t: this.$t('home.txt91', ['快']),
	// 					v: "fastGasPrice",
	// 					m: "fastGasPriceDollar",
	// 					s: "10"
	// 				}
	// 			],
	// 			btnTitle: this.$t('home.txt56', ['确认']),
	// 			current: 1,
	// 			data: {
	// 				gwei: "",
	// 				gas: '',
	// 				address: "",
	// 				money: "",

	// 			},
	// 			coin_id: '',
	// 			symbol: '',
	// 			walletInfo: {},
	// 			balance: '',
	// 			info: {},
	// 			feeInfo: {},
	// 			unit: '',
	// 			unit1: '',
	// 			gasPrice: 0,
	// 			gasPriceDollar: 0
	// 		}
	// 	},
	// 	onLoad(opt) {
	// 		//1、比特币；2、以太坊；3、波场；4、Telegram X
	// 		this.walletInfo = uni.getStorageSync("currentWallet")
	// 		if (uni.getStorageSync("address")) {
	// 			this.data.address = uni.getStorageSync("address")
	// 		}
	// 		console.log("this.walletInfo: ", this.walletInfo);
	// 		switch (this.walletInfo.category) {
	// 			case 1:
	// 				this.unit = 'sat/b'
	// 				this.unit1 = 'byte'
	// 				break;
	// 			case 2:
	// 				this.unit = 'gwei'
	// 				this.unit1 = 'gas'
	// 				break;
	// 			case 4:
	// 				this.unit = '未知'
	// 				this.unit1 = '未知'
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// 		if (Object.keys(opt).length == 0 || opt.info == 'undefined') {
	// 			console.log(1111);
	// 			this.getCoinList()
	// 		} else {
	// 			if (opt.info) {
	// 				console.log(222);
	// 				this.info = JSON.parse(opt.info)
	// 				this.symbol = this.info.symbol
	// 				if (this.info.coin_id) {
	// 					this.coin_id = this.info.coin_id
	// 				} else {
	// 					this.coin_id = this.info.id
	// 				}

	// 				this.getWalletkBalance(this.coin_id)
	// 			} else {
	// 				console.log(333);
	// 				if (opt.symbol) {
	// 					this.symbol = opt.symbol
	// 					if (opt.coin_id) {
	// 						this.coin_id = opt.coin_id
	// 					} else {
	// 						this.coin_id = opt.id
	// 					}

	// 					this.getWalletkBalance(this.coin_id)
	// 				} else {
	// 					this.getCoinList()
	// 				}

	// 			}

	// 		}

	// 		if (opt.address) {
	// 			this.data.address = opt.address
	// 		}
	// 		// if (this.walletInfo.category != 3) {
	// 		// 	this.getFee(this.coin_id)
	// 		// }
	// 	},
	// 	onUnload() {
	// 		uni.removeStorageSync("address");
	// 	},
	// 	methods: {
	// 		// 获取钱包余额
	// 		async getWalletkBalance(id) {
	// 			let {
	// 				data,
	// 				errorMessage
	// 			} = await request({
	// 				url: '/walletget-balance',
	// 				method: 'get',
	// 				params: {
	// 					"coin_id": id,
	// 					"wallet_id": this.walletInfo.id
	// 				}
	// 			})
	// 			this.balance = data.balance
	// 			console.log('钱包类型', this.walletInfo.category);
	// 			if (this.walletInfo.category != 3) {
	// 				console.log(999);
	// 				this.getFee(id)
	// 			}
	// 			console.log('钱包余额：', data.balance);
	// 		},
	// 		// 获取当前钱包添加的币种列表
	// 		async getCoinList() {
	// 			this.coinList = []
	// 			let {
	// 				data,
	// 				errorMessage
	// 			} = await request({
	// 				url: '/wallet-get-added-coin-list',
	// 				method: 'get',
	// 				params: {
	// 					"wallet_id": this.walletInfo.id,
	// 				}
	// 			})
	// 			this.coinList = data
	// 			console.log("this.coinList: ", this.coinList);
	// 			if (this.coinList.length != 0) {
	// 				this.symbol = this.coinList[0].symbol
	// 				this.coin_id = this.coinList[0].coin_id
	// 				this.getWalletkBalance(this.coin_id)
	// 			}

	// 		},
	// 		async confim() {
	// 			this.show = false;
	// 			let current = ''
	// 			let gasPrice = ''
	// 			if (this.current == 3) {
	// 				gasPrice = Number(this.data.gwei)
	// 			} else {
	// 				current = this.current
	// 				gasPrice = Number(this.data.gwei)
	// 			}
	// 			try {
	// 				const {
	// 					data
	// 				} = await request({
	// 					url: '/wallettransaction',
	// 					method: 'post',
	// 					data: {
	// 						amount: this.data.money,
	// 						coin_id: this.coin_id,
	// 						target_address: this.data.address,
	// 						wallet_id: this.walletInfo.id,
	// 						password: this.pass,
	// 						//转账手续费 1、慢 2、标准 3、快
	// 						transaction_fee_type: current,
	// 						gas_price: gasPrice
	// 					}
	// 				})
	// 				uni.showToast({
	// 					title: this.$t('home.txt128', ['转账申请已提交'])
	// 				})
	// 				setTimeout(() => {
	// 					uni.redirectTo({
	// 						url: '/pages/index/userMoney'
	// 					})
	// 				}, 1500)

	// 				console.log(1111)
	// 			} catch (e) {
	// 				//TODO handle the exception
	// 				this.pass = ''
	// 			}


	// 			// if(errorCode!=0){
	// 			// 	this.pass=''
	// 			// }
	// 			// console.log("data: ",data);
	// 		},
	// 		//取消
	// 		cancel() {
	// 			this.show = false
	// 			this.pass = ''
	// 		},
	// 		//获取矿工费
	// 		async getFee(coin_id) {
	// 			console.log(222233);
	// 			uni.showLoading({
	// 				title: this.$t('home.txt17', ['加载中'])
	// 			})
	// 			const {
	// 				data
	// 			} = await request({
	// 				url: '/walletselect_fee',
	// 				method: 'post',
	// 				params: {
	// 					coin_id: coin_id
	// 				}
	// 			})
	// 			this.feeInfo = data
	// 			this.data.gwei = data.proposeGas
	// 			this.data.gas = data.gasLimit
	// 			this.gasPrice = data.proposeGasPrice
	// 			this.gasPriceDollar = data.proposeGasPriceDollar
	// 			uni.hideLoading()
	// 			console.log("data: ", data);
	// 		},
	// 		//ETH币换算
	// 		async setValue() {
	// 			const {
	// 				data
	// 			} = await request({
	// 				url: '/walletCoinConvert',
	// 				method: 'post',
	// 				params: {
	// 					gas: this.data.gwei,
	// 					gasLimit: this.data.gas
	// 				}
	// 			})
	// 			this.gasPrice = data.ETH
	// 			this.gasPriceDollar = data.dollar
	// 			// console.log("data: ",data);
	// 		},
	// 		submit() {
	// 			if (this.balance >= this.data.money) {
	// 				this.show = true;

	// 			} else {
	// 				// uni.showToast({
	// 				// 	title: '余额不足',
	// 				// 	icon: 'none'
	// 				// })
	// 			}
	// 			this.$refs.button.hideLoading()
	// 		},
	// 		all() {
	// 			this.data.money = this.balance
	// 		},
	// 		//页面跳转
	// 		topage(url) {
	// 			uni.navigateTo({
	// 				url: url
	// 			})
	// 		},
	// 		addChange() {
	// 			uni.setStorageSync("address", this.data.address);
	// 			// console.log('收款地址',this.data.address);
	// 		},
	// 		goBack() {
	// 			uni.redirectTo({
	// 				url: '/pages/index/userMoney'
	// 			});
	// 		}
	// 	}
	// }
</script>

<style lang="scss" scoped>
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
			padding: 0 16rpx;
			box-sizing: border-box;
		}
	}

	.importbox,
	.mystyle {
		padding: 0 30rpx;
		margin-top: 50rpx;

		.setdemo {
			width: 630rpx;
			padding: 30rpx;
			height: 204rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			margin: 30rpx 0 40rpx 0;

			input {
				padding: 0 18rpx;
				box-sizing: border-box;
			}

			.gas {
				font-size: 22rpx;
				font-weight: 500;
				color: #999999;
			}

			.timei {
				font-size: 24rpx;
				font-weight: 500;
				color: #333333;
				text-align: end;
			}

			input {
				width: 304rpx;
				height: 80rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin: 20rpx 0 40rpx 0;
			}
		}

		.set {
			line-height: 196rpx;
			text-align: center;
		}

		.transdemo {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 164rpx;
			height: 196rpx;
			background: #FFFFFF;
			border: 1px solid #CCCCCC;
			border-radius: 10rpx;
			position: relative;

			.select {
				position: absolute;
				top: -2rpx;
				right: -2rpx;
				width: 30rpx;
				height: 24rpx;
			}

			.demofont {
				font-size: 30rpx;
				font-weight: 500;
				color: #666666;
				height: 40rpx;
				line-height: 60rpx;
			}

			.demofonts {
				font-size: 20rpx;
				font-weight: 500;
				color: #B3B3B3;
				margin: 28rpx 0 24rpx 0;

				>view {
					text-align: center;
				}
			}

			.demofontsub {
				font-size: 20rpx;
				font-weight: 500;
				color: #666666;
				text-align: center;
				line-height: 40rpx;
				width: 100%;
				border-top: 1px solid #D9D9D9;
			}
		}

		.all {
			display: inline-block;
			width: 80rpx;
			height: 36rpx;
			background: #FFFFFF;
			border: 1px solid #B3B3B3;
			border-radius: 18rpx;
			text-align: center;
			line-height: 36rpx;
			font-size: 26rpx;
			color: #999999;
			position: absolute;
			right: 0;
			top: 10rpx;
		}

		.moenyval {
			position: relative;
		}


		.input-item {
			height: 178rpx;

			.i-items {
				height: 68rpx;
				border-bottom: 1px solid #E6E6E6;
			}
		}

		.font-co {
			font-size: 26rpx;
			font-weight: 500;
			color: #2DA5E1;
		}

		.tip {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			text-align: right;
		}
	}

	.commonfont {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin: 30rpx 0;
	}

	.nosubmit {
		margin: 60rpx auto;
		padding-bottom: 20rpx;
		width: 690rpx;
		height: 96rpx;
		
		background: #2DA5E1;
		box-shadow: 0px 2px 10px 0px rgba(23, 119, 226, 0.4);
		opacity: 0.5;
		border-radius: 100rpx;
		font-size: 30rpx;
		line-height: 96rpx;
		color: #fff;
	}
</style>
