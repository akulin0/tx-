<!-- Token详情 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"
			style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="head-box">
				<view class="flex-align box">
					<image :src="info.icon" mode=""></image>
					<view class="font-w font-max">{{info.symbol}}</view>
				</view>
				<view style="display: flex; flex-direction: row; justify-content: space-between;">
					<view class="font-body">{{$t('home.txt115',['资产余额'])}}</view>
					<view class="font-w font-max">{{info.balance || 0}}</view>
				</view>
				<view class="title font-body">≈${{info.value || 0}}</view>			
			</view>
			<view>
				<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="change" bg-color='none'
					active-color='#049EFF'></u-tabs>
				<view v-if="infoList.length==0" class="flex-column none-box">
					<image src="/static/index/none.png" mode="" class="none-img"></image>
					<view class="font-m">{{$t('home.txt116',['暂无记录'])}}</view>
				</view>
				<view style="padding: 22rpx 30rpx 0;">
					<view class="list flex-j-a" v-for="(item,index) in infoList" @click="clickDetails(item)">
						<view class="list-box">
						<!-- 转出 -->
						<image src="/static/index/out.png" mode="" class="img" v-if="item.address==walletInfo.address"></image>
						<!-- 转入 -->
						<image src="/static/index/shift.png" mode="" class="img" v-else></image>
						<view>
							<view class="font-t" v-if="item.address==walletInfo.address">{{item.target_address | setAddress}} <span class='status' :style="item.status == 1 ?'color:#28DB54':item.status== 0 ?'color:#FF8B00':'color:#ff3344'">
							{{item.statusName}}
							</span></view>
							<view class="font-t" v-else>{{item.address | setAddress}} <span class='status' :style="item.status == 1 ?'color:#28DB54':item.status== 0 ?'color:#FF8B00':'color:#ff3344'">{{item.statusName}}</span></view>
							<view class="color-main font-m" style="margin-top:18rpx" >{{item.create_date}}</view>
							<view class="color-main font-m text" v-if="item.remark">{{$t('home.txt112',['备注'])}}：{{ item.remark }}</view>
						</view>
					
					</view>
					
					<view class="box" >
						<view v-if="item.status != 2"><span v-if="item.address==walletInfo.address && item.amount!=0">-</span><span v-if="item.address!=walletInfo.address&& item.amount!=0">+</span>{{item.amount}}</view>
						<image src="/static/index/bianji.png" mode="" class="img2"
							@click="toPage(`/pages/index/remark?id=${item.id}&remark=${item.remark}`)"></image>
					</view>
					
					</view>
					<view class="more" v-if="isNoMore=='nomore' && infoList.length != 0">{{$t('find.msg12',['没有更多了'])}}</view>
					<!-- <view class="list flex-j-a">
						<view class="list-box">
							
							<view>
								<view class="font-t">0s8dE521d...D45185f8</view>
								<view class="color-main font-m" style="margin: 18rpx 0;">2021-12-23 12:12:12</view>
								<view class="color-main font-m text">备注：填写相关备注内容内容内容几亿已以已机场东内容</view>
							</view>
						</view>
						<view class="box">
							<view>-100</view>
							<image src="/static/index/bianji.png" mode="" class="img2"></image>
						</view>
					</view> -->

				</view>

			</view>
			<view class="btn-box flex-j-a">
				<view class="btn1 flex-center" @click="toPage(`/pages/index/userMoney?info=${JSON.stringify(info)}`)">{{$t('home.txt117',['转账'])}}
				</view>
				<view class="btn2 flex-center color-r" @click="toPage(`/pages/index/getMoney?info=${JSON.stringify(info)}`)">{{$t('home.txt92',['收款'])}}</view>
			</view>
		</view>

	</base-layout>
</template>

<script  lang="ts">
	import {
		request
	} from "@/m-subpack/base";
	import {
		Assets
	} from "@/decorator/wallet"
	import {
		Component,
		Vue
	} from "vue-property-decorator";
  import {getCurrentWallet} from '@/libs/wallet';
	@Component({
		filters: {
			setAddress(val) {
				if (val == null) {
					return ''
				} else {
					return val.slice(0, 9) + '...' + val.slice(-9)
				}
			},
			setremark(val) {
				if (val == null) {
					return ''
				} 
				else if(val.length>9) {
					return val.slice(0, 9) + '...' 
				} else {
					return val
				}
			}
		},
	})
	@Assets()
	export default class Idnex extends Vue {
		tabList= [];
		current= 0;
		list= [];
		info={};
		infoList=[];
		navTitle= '';
		Rate=0;
		Moneys=0;
		walletInfo={};
		page = 1;
		limit = 10;
		type = '';
		isNoMore = "none";
		onLoad(opt) {
				let newInfo =	JSON.parse(opt.info);
				this.info = {...newInfo,otherType:true}
		}
		
		onReachBottom() {
			if (this.isNoMore == "nomore") return;
			this.getList(this.type);
		}
		async onShow() {
			
			this.tabList = [{name: this.$t('home.txt85',['全部'])}, {name: this.$t('home.txt6',['转入'])}, {name: this.$t('home.txt5',['转出'])}];
			this.list = [1];
			this.navTitle = this.$t('home.txt114',['Token详情']);
			await this.init();
			this.walletInfo = getCurrentWallet();
			this.getList();
			// this.infoList = [];
			// let infoList = [];
			// const _assetAll = this.assetAll || [];
			// _assetAll.map((item,index)=>{
			// 	if(this.currentWallet.category == item.wallet_category ){
			// 		if(index<20){
			// 			this.infoList.push(item);
			// 		}else{
			// 			infoList.push(item);
			// 		}
					
			// 	}
			// })
			// setTimeout(()=>{
			// 	this.infoList = [...this.infoList, ...infoList];
			// },1000)
			
		}
		// 获取资产记录列表
		async getList(type) {
			uni.showLoading({
				title: this.$t('ibinz.msg48',['加载中'])
			})
			let coin_id
			if(this.info.coin_id){
				coin_id=this.info.coin_id
			}else{
				coin_id=this.info.id
			}
			
			let {
				data,
				errorMessage
			} = await request({
				url: '/transaction',
				method: 'get',
				params:{
					address:this.walletInfo.address,
					coinId:coin_id,
					page: this.page,
					limit: this.limit,
					type:type ? type : ''
				}
			})
			let dataList = [];
			dataList = data.map(v=>{
				return{
					...v,
					statusName: this.getName(v.status, v.type)
					
				}
			});
			this.isNoMore = dataList.length == 0 ? "nomore" : "none";
			this.page++;
			this.infoList = this.infoList.concat(dataList)
			uni.hideLoading();
		}
		getName(status, type){
			if(status == 0){
				return this.$t('google.txt13',['已提交：待区块确认'])
			//成功 && 转出
			}else if(status == 1 && type == 1){
				return this.$t('google.txt17',['转出成功'])
			//成功 && 转入
			}else if(status == 1 && type == 2){
				return this.$t('google.txt16',['转入成功'])
			}else{
				return this.$t('google.txt15',['转账失败']) 
			}
		}
		clickDetails(item){
			if(item.status == 1){
				this.walletDetail(item.id);
				
				
			}
		}
		async walletDetail(walletId) {
			let {
				data,
			} = await request({
				url: '/get-transaction-details',
				method: 'get',
				params: {
					id: walletId,
				}
			})
			if(data){
        this.toPage(`/pages/index/TransactionDetails?Info=${JSON.stringify(data)}`)
			}
			
		}
		change(index) {
			this.infoList=[];
			this.current = index;
			this.page = 1;
			if(this.current==1){

				this.getList(2)
				this.type = 2
			}else if(this.current==2){
				//转出
				this.getList(1)
				this.type = 1
			}else{
				this.getList()
				return
			}
		}
	}


	
	
	
	
// 	import {
// 		request
// 	} from "@/m-subpack/base";
// 	export default {
// 		data() {
// 			return {
// 				tabList: [{
// 					name: this.$t('home.txt85',['全部'])
// 				}, {
// 					name: this.$t('home.txt6',['转入'])
// 				}, {
// 					name: this.$t('home.txt5',['转出']),
// 				}],
// 				current: 0,
// 				list: [1],
// 				info: {},
// 				infoList:[],
// 				navTitle:this.$t('home.txt114',['Token详情']),
// 				Rate:0,
// 				Moneys:0
// 			}
// 		},
// 		onLoad(opt) {
// 			this.info = JSON.parse(opt.info)
// 			this.walletInfo = JSON.parse(uni.getStorageSync("currentWallet"))
			
// 			console.log("token详情", this.info);
// 		},
// 		onShow() {
// 			this.getList()
// 			this.getRate()
// 		},
// 		filters:{
// 			setAddress(val){
// 				return val.slice(0, 9) + '...' + val.slice(-9)
// 			}
// 		},
// 		methods: {
// 			change(index) {
// 				this.current = index;
// 				if(this.current==1){
// 					//转入
// 					this.infoList=[]
// 					this.getList(1)
// 				}else if(this.current==2){
// 					//转出
// 					this.infoList=[]
// 					this.getList(2)
// 				}else{
// 					this.getList()
// 					return
// 				}
// 			},
// 			// async getWalletkBalance() {
// 			// 	// console.log("walletInfo: ",this.walletInfo);
// 			// 	let {
// 			// 		data,
// 			// 		errorMessage
// 			// 	} = await request({
// 			// 		url: '/walletget-balance',
// 			// 		method: 'get',
// 			// 		params: {
// 			// 			"coin_id": info.balance,
// 			// 			"wallet_id": this.walletInfo.id
// 			// 		}
// 			// 	})
// 				// this.coinLists = [...this.coinList]
			
// 				// this.coinLists[index].balance = Number(data.balance).toFixed(4)
// 			// 	this.coinLists[index].Moneys = Number(data.balance * this.Rate).toFixed(4)
// 			// 	this.totalMoney += Number(this.coinLists[index].Moneys)
// 			// },
// 			async getRate() {
// 				let {
// 					data,
// 					errorMessage
// 				} = await request({
// 					url: '/walletConversionRate',
// 					method: 'get',
// 					params: {
// 						"category": this.walletInfo.category
// 					}
// 				})
// 				this.Rate = data || 0
// 				this.Moneys=Number(this.info.balance * this.Rate).toFixed(4)
// 				console.log(data, '汇率')
			
// 			},
// 			// 获取记录

// 			toPage(url) {
// 				uni.navigateTo({
// 					url: url
// 				})
// 			}
// 		}
// 	}
</script>

<style lang="scss" scoped>
	.content {
		padding-bottom: 178rpx;
	}
	.status {
		margin-left: 20rpx;
	}
	.head-box {
		padding: 30rpx 30rpx 26rpx;
		border-bottom: 20rpx solid #F5F5F5;

		.box {
			padding: 20rpx 0;
			border-bottom: 1px solid #E6E6E6;
			margin-bottom: 33rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				margin-right: 16rpx;
			}
		}

		.title {
			text-align: end;
			color: #B3B3B3;
		}
	}

	.none-box {
		margin-top: 129rpx;
		color: #B3B3B3;

		.none-img {
			width: 320rpx;
			height: 215rpx;
			margin-bottom: 48rpx;
		}
	}

	.list {
		height: 100%;
		align-items: flex-start;
		border-bottom: 1px solid #E6E6E6;
		padding: 30rpx 0;

		.list-box {
			display: flex;
			width: 85%;

			.img {
				min-width: 37rpx;
				width: 37rpx;
				height: 31rpx;
				margin-right: 19rpx;
			}

			.text {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1; //设置显示几行
				-webkit-box-orient: vertical;
			}
		}

		.box {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.img2 {
				width: 24rpx;
				height: 25rpx;
				margin-top: 17rpx;
			}
		}


	}

	.btn-box {
		position: fixed;
		background-color: #FFFFFF;
		width: 100%;
		bottom: 0rpx;
		padding: 20rpx 40rpx 40rpx;
		box-sizing: border-box;

		view {
			width: 320rpx;
			height: 88rpx;
			border-radius: 20rpx;
		}

		.btn1 {
			background-color: rgb(230, 241, 255);
			color: #2DA5E1;
		}

		.btn2 {
			
			background: #2DA5E1;
			box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
		}
		
		.box-price {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		
	}
</style>
