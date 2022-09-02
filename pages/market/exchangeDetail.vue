<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="navTitle" title-color="#333333" :title-bold="true"></u-navbar>
		<view class="msg font-s" v-if="showMsg">
			<view>{{ $t('market.msg2', ['任何人都可以在去中心化交易所里上架代币，包括同名的代币以及无法卖出等各种功能的代币。请一定做好研究并核对好合约地址。']) }}</view>
			<view class="btn" @click="close">{{ $t('market.msg3', ['关闭']) }}</view>
		</view>
		<view class="main flex-col">
			<view class="flex-r">
				<image :src="info.token1_icon || defultIcon" style="width: 74rpx;height: 74rpx;margin-right: 23rpx;" mode=""></image>
				<view class="font-x">{{ info.token1_symbol }}</view>
			</view>
			<view class="flex-row info">
				<view>{{ $t('market.msg4', ['代币合约']) }}</view>
				<view class="flex-r" @click="copy(info.token1)">
					<view>{{ info.token1.substr(0, 15) }}...{{ info.token1.substr(-5) }}</view>
					<image  src="/static/my/copy.png" mode="" style="width: 24rpx;height: 24rpx;margin-left: 18rpx;"></image>
				</view>
			</view>
			<view class="flex-row info">
				<view>{{ $t('market.msg5', ['上线价格']) }}</view>
				<view>{{ info.market_exchange_list[0].online_price }}</view>
			</view>
			<view class="flex-row info">
				<view>{{ $t('market.msg6', ['上线时间']) }}</view>
				<view>{{ info.createTime }}</view>
			</view>
			<view class="flex-row info">
				<view>DEX</view>
				<view class="flex-r">
					<image src="/static/find/internet.png" mode="" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
					<view>{{ info.market_exchange_list[0].ex_name }}</view>
				</view>
			</view>
		</view>
		<view class="card mar color-body">
			<view class="card-top">
				<view style="margin-bottom: 24rpx;" class="font-m color-s">{{ $t('market.msg7', ['流动资金池']) }}</view>
				<view class="flex-row font-max">
					<view class="">${{ info.totalLiquidity }}</view>
					<view class="color-main">{{ info.market_exchange_list[0].total_liquidity_change_24h }}％</view>
				</view>
			</view>
			<view style="margin: 20rpx 0;" class="font-m color-s">{{ $t('market.msg8', ['流动池中的代币']) }}</view>
			<view class="flex-r font-max" style="padding-bottom: 30rpx;">
				<image :src="info.token0_icon || defultIcon" style="width: 42rpx;height: 42rpx;" mode=""></image>
				<view>{{ info.market_exchange_list[0].reserve0 }} {{ info.token0_symbol }}</view>
			</view>
			<view class="flex-r font-max" style="padding-bottom: 30rpx;">
				<image :src="info.token1_icon || defultIcon" style="width: 42rpx;height: 42rpx;" mode=""></image>
				<view>{{ info.market_exchange_list[0].reserve1 }} {{ info.token1_symbol }}</view>
			</view>
		</view>
		<view class="card mar font-max">
			<view class="font-m color-s">{{ $t('market.msg9', ['当前价格']) }}</view>
			<view class="color-body " style="margin: 24rpx 0;">{{ info.token0_symbol }}:{{ info.token1_symbol }}={{ info.market_exchange_list[0].rate }}</view>
			<view class="flex-row">
				<view class="font-m color-s">≈${{ info.currentPrice }}</view>
				<view class="color-f1">{{ info.percentPrice }}%</view>
			</view>
		</view>
		<view class="card mar font-max color-body">
			<view class="font-m color-s" style="margin-bottom: 24rpx;">{{ $t('market.msg10', ['24小时交易量']) }}</view>
			<view class="flex-row">
				<view class="font-m color-s">${{ info.newVolume }}</view>
				<view class="color-main">{{ info.market_exchange_list[0].volume_change_24h }}%</view>
			</view>
		</view>
		<view class="card mar font-max color-body">
			<view class="font-m color-s" style="margin-bottom: 24rpx;">{{ $t('market.msg11', ['24小时交易次数']) }}</view>
			<view class="flex-row">
				<view class="font-m color-s">{{ info.txs }}</view>
				<view class="color-3">{{ info.txs_weight }}%</view>
			</view>
		</view>
<!-- 		<view class="card mar font-max color-body">
			<view class="font-m color-s" style="margin-bottom: 100rpx;">{{ $t('market.msg12', ['价格走势']) }}</view>
			<image src="/static/find/action01.png" mode="" style="height: 140rpx;"></image>
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"></canvas>
		</view> -->
		<view class="flex-row exchange">
			<view class="font-w color-body font-l">{{ $t('market.msg13', ['最新交易']) }}</view>
			<view class="flex-r" @click="getDeFidetails">
				<image src="/static/market/fresh.png" style="width: 30rpx;height: 24rpx;margin-right: 8rpx;" mode=""></image>
				<view class="font-m" style="color: #2DA5E1;">{{ $t('market.msg14', ['刷新']) }}</view>
			</view>
		</view>
		<!--下拉筛选  -->
		<view class="flex-row" style="margin: 0 60rpx;display: flex;" v-if="name == 'Uniswap'">
			<!--交易类型筛选  -->
			<view style="width: 300rpx;">
				<xselect
					:list="changeList"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 58rpx; font-size: 26rpx;'"
					:placeholder="placeholder"
					:initValue="placeholder"
					:selectHideType="'hideAll'"
					@change="checked"
				></xselect>
			</view>
			<!--数据条数筛选  -->
		<!-- 	<view style="width: 300rpx;">
				<xselect
					:list="changeList2"
					:clearable="false"
					:showItemNum="5"
					:listShow="false"
					:isCanInput="false"
					:style_Container="'height: 58rpx; font-size: 26rpx;'"
					:initValue="selText"
					:selectHideType="'hideAll'"
					@change="checked1"
				></xselect>
			</view> -->
		</view>
		<!-- 列表 Justswap -->
		<view class="list-view font-body color-body" v-if="list.length && name == 'Justswap'">
			<view class="list-box" v-for="item in list">
				<view class="item">
					<view class="color-0 width1" v-if="item.type == 1">买入</view>
					<view class="color-3 width1" v-if="item.type == 2">卖出</view>
					<view class="color-0 width1" v-if="item.type == 3">新增</view>
					<view class="color-3 width1" v-if="item.type == 4">移除</view>
					<view class="width1">{{  item.type == 2 ? (item.tokenAmount/numbeInt).toFixed(4)  : (item.trxAmount/100000).toFixed(4)  }}</view>
					<view class="width2 " v-if="item.type == 1"><image src="/static/market/enter.png" mode="" style="width: 21rpx;height: 14rpx;"></image></view>
					<view class="width2 " v-if="item.type == 2"><image src="/static/market/out.png" mode="" style="width: 21rpx;height: 14rpx;"></image></view>
					<view class="width2 " v-if="item.type == 3"><image src="/static/market/icon-add.png" style="width: 25rpx;height: 24rpx;"></image></view>
					<view class="width2 " v-if="item.type == 4"><image src="/static/market/icon-remove.png" mode="" style="width: 25rpx;height: 24rpx;"></image></view>
					<view class="width1">{{ item.type !=2 ? (item.tokenAmount/numbeInt).toFixed(4) :  (item.trxAmount/100000).toFixed(4) }}</view>
				</view>
				<view class="item">
					<view class="font-min color-main width1">{{ simplyToRelativeTime(item.blockTime) }}</view>
					<view class="width1">{{ item.type == 2 ? item.tokenSymbol : 'TRX' }}</view>
					<view class="width2"></view>
					<view class="width1">{{ item.type != 2 ?  item.tokenSymbol : 'TRX' }}</view>
				</view>
			</view>
			<!-- 分页 -->
			<view class="flex-r fen">
				<image src="/static/my/more.png" mode="" class="arrows-left" @click="forward(0)"></image>
				<view style="margin: 0 30rpx;">
					{{ currentPage }}
					<text style="margin: 0 10rpx;">/</text>
					{{ totalPage }}
				</view>
				<image src="/static/my/more.png" mode="" style="width: 14rpx;height: 25rpx;" @click="forward(1)"></image>
			</view>
		</view>
		
		<!-- //列表 Uniswap  买卖 -->
		<view class="list-view font-body color-body" v-if="name == 'Uniswap' && (changeType == 2 || changeType == 0)">
			<view class="list-box" v-for="item in list">
				<view class="item">
					<view class="color-0 width1" v-if="item.amount0Out == 0">买入</view>
					<view class="color-3 width1" v-else>卖出</view>
					<view class="width1">{{ item.amount0Out == '0' ? (item.amount1Out*10/10).toFixed(4) : (item.amount0Out*10/10).toFixed(4) }}</view>
					<view class="width2 " v-if="item.amount0Out == 0"><image src="/static/market/enter.png" mode="" style="width: 21rpx;height: 14rpx;"></image></view>
					<view class="width2 " v-else><image src="/static/market/out.png" mode="" style="width: 21rpx;height: 14rpx;"></image></view>
					<view class="width1">{{ item.amount1In == '0' ? (item.amount0In*10/10).toFixed(4) : (item.amount1In*10/10).toFixed(4) }}</view>
				</view>
				<view class="item">
					<view class="font-min color-main width1">{{ simplyToRelativeTime(item.transaction.timestamp*1000) }}</view>
					<view class="width1">{{  item.amount0Out == '0' ? getSymbol(item.pair.token1.symbol) : getSymbol(item.pair.token0.symbol) }}</view>
					<view class="width2"></view>
					<view class="width1">{{ item.amount1In == '0' ? getSymbol(item.pair.token0.symbol) : getSymbol(item.pair.token1.symbol) }}</view>
				</view>
			</view>
			<!-- 分页 -->
	<!-- 		<view class="flex-r fen">
				<image src="/static/my/more.png" mode="" class="arrows-left" @click="forward(0)"></image>
				<view style="margin: 0 30rpx;">
					{{ currentPage }}
					<text style="margin: 0 10rpx;">/</text>
					{{ totalPage }}
				</view>
				<image src="/static/my/more.png" mode="" style="width: 14rpx;height: 25rpx;" @click="forward(1)"></image>
			</view> -->
		</view>
		<!-- 移除 -->
		<view class="list-view font-body color-body" v-if="name == 'Uniswap' && changeType ==3 ">
			<view class="list-box" v-for="item in uniswapInfo.burns ">
				<view class="item">
					<view class="color-0 width1">移除</view>
					<view class="width1">{{ (item.amount1*10/10).toFixed(4) }}</view>
					<view class="width2 "><image src="/static/market/icon-remove.png" mode="" style="width: 25rpx;height:24rpx;"></image></view>
					<view class="width1">{{ (item.amount0*10/10).toFixed(4) }}</view>
				</view>
				<view class="item">
					<view class="font-min color-main width1">{{ simplyToRelativeTime(item.transaction.timestamp*1000) }}</view>
					<view class="width1">{{ getSymbol(item.pair.token1.symbol) }}</view>
					<view class="width2"></view>
					<view class="width1">{{ getSymbol(item.pair.token0.symbol) }}</view>
				</view>
			</view>
			<!-- 分页 -->
	<!-- 		<view class="flex-r fen">
				<image src="/static/my/more.png" mode="" class="arrows-left" @click="forward(0)"></image>
				<view style="margin: 0 30rpx;">
					{{ currentPage }}
					<text style="margin: 0 10rpx;">/</text>
					{{ totalPage }}
				</view>
				<image src="/static/my/more.png" mode="" style="width: 14rpx;height: 25rpx;" @click="forward(1)"></image>
			</view> -->
		</view>
		
		<!--  新增-->
		<view class="list-view font-body color-body" v-if="name == 'Uniswap' && changeType == 4">
			<view class="list-box" v-for="item in uniswapInfo.mints">
				<view class="item">
					<view class="color-0 width1">新增</view>
					<view class="width1">{{ (item.amount1*10/10).toFixed(4) }}</view>
					<view class="width2 "><image src="/static/market/icon-add.png" mode="" style="width: 25rpx;height: 24rpx;"></image></view>
						<view class="width1">{{ (item.amount0*10/10).toFixed(4) }}</view>
				</view>
				<view class="item">
					<view class="font-min color-main width1">{{ simplyToRelativeTime(item.transaction.timestamp*1000) }}</view>
					<view class="width1">{{ getSymbol(item.pair.token1.symbol) }}</view>
					<view class="width2"></view>
					<view class="width1">{{ getSymbol(item.pair.token0.symbol) }}</view>
				</view>
			</view>
			<!-- 分页 -->
	<!-- 		<view class="flex-r fen">
				<image src="/static/my/more.png" mode="" class="arrows-left" @click="forward(0)"></image>
				<view style="margin: 0 30rpx;">
					{{ currentPage }}
					<text style="margin: 0 10rpx;">/</text>
					{{ totalPage }}
				</view>
				<image src="/static/my/more.png" mode="" style="width: 14rpx;height: 25rpx;" @click="forward(1)"></image>
			</view> -->
		</view>
		
		<!-- 点击第三方app提示弹框 -->
		<u-modal
			v-model="showMSgModal"
			:content="content1"
			:title="modelText"
			:show-cancel-button="true"
			:confirm-text="modelTitle"
			:mask-close-able="true"
			@confirm="goPage(1)"
			:title-style="titleSty"
			:content-style="contentSty"
		></u-modal>
		<view class="pt2"></view>
		<!-- 底部定位 -->
		<!-- <view class="bottom">
			<view class="btn" @click="openWebUrl">{{ $t('market.msg18', ['去交易']) }}</view>
		</view> -->
	</base-layout>
</template>

<script>
import { infoRequest, request ,jsonToParams} from '@/m-subpack/base';
import xselect from '@/components/xfl-select/xselect.vue';
import uCharts from '../../components/u-charts/u-charts.js';
import dayjs from 'dayjs';

import openPage from '@/js/flutter/openPage.js';
import {getCurrentWallet} from '../../libs/wallet';

export default {
	data() {
		return {
			defultIcon: '/static/market/defultIcon.png', //默认icon
			navTitle: this.$t('market.msg1', ['交易详情']),
			selText: this.$t('market.msg16', ['60条']),
			showMsg: true, //是否显示提示
			showMSgModal: false,
			titleSty: {
				//点击第三方app提示弹框样式
				color: '#333333',
				fontWeight: 'bold',
				fontSize: '32rpx',
				margin: '0 20rpx'
			},
			contentSty: {
				//点击第三方app提示弹框样式
				color: '#333333',
				fontSize: '28rpx'
			},
			content1: '',
			navText: this.$t('home.txt24', ['取消']),
			modelTitle: this.$t('find.msg9', ['知道了']),
			id: '', //DeFi的id
			isShowType: '',
			modelText: '',
			numbeInt: 10,
			list: [],
			name: '',
			uniswapInfo: {}, //uni
			totalPage: 10, //总页数
			pagesize: 10, //每页显示条数
			currentPage: 1, //当前页
			changeList: [
				//交易类型筛选
				// {
				// 	value: this.$t('market.msg19', ['查看全部']),
				// 	type: 1
				// },
				{
					value: this.$t('market.msg39', ['买卖']),
					type: 2
				},
				{
					value: this.$t('market.msg40', ['移除']),
					type: 3
				},
				{
					value: this.$t('market.msg41', ['新增']),
					type: 4
				},
				// {
				// 	value: this.$t('market.msg23', ['只看减少流动性']),
				// 	type: 5
				// }
			],
			changeType: '', //交易类型
			changeList2: [
				//条数筛选
				{
					value: this.$t('market.msg16', ['60条']),
					num: 60
				},
				{
					value: this.$t('market.msg24', ['150条']),
					num: 150
				},
				{
					value: this.$t('market.msg25', ['300条']),
					num: 300
				}
			],
			number: 60, //条数
			info: {}, //详情
			placeholder: this.$t('market.msg15', ['筛选交易类型'])
		};
	},
	filters:{
		num(item){
			return item.toFixed(4)
		}
	},
	onLoad(opt) {
	  try {
      let item = JSON.parse(decodeURIComponent(opt.item));
      item.totalLiquidity = item.total_liquidity.substring(0, item.total_liquidity.indexOf('.') + 3); //流动资金池
      item.currentPrice = item.market_exchange_list[0].price.substring(0, item.market_exchange_list[0].price.indexOf('.') + 3); //当前价格
      item.percentPrice = item.market_exchange_list[0].percent_change_24h.substring(0, item.market_exchange_list[0].percent_change_24h.indexOf('.') + 3); //当前价格百分比
      item.newVolume = item.volume.substring(0, item.volume.indexOf('.') + 3); //24小时交易量
      this.name = item.market_exchange_list[0].ex_name;
      this.info = item;
    }catch (e) {
      uni.showToast({
        title: '未知错误',
        icon: 'none',
        duration: 2000,
        mask: true
      })
	    setTimeout(()=>{
        uni.navigateBack()
      },2000)
    }

	},
	onShow(){
		this.getDeFidetails();
	},
	components: {
		xselect,
		uCharts
	},
	filters: {
		// formatType(type) {
		// 	console.log(type)
		// 	switch (type) {
		// 		case 1:
		// 			return '卖出'
		// 		case 2:
		// 			return '买入'
		// 		case 3:
		// 			return '新增'
		// 		case 4:
		// 			return '移除'
		// 	}
		// let msg1 = this.$t('market.msg26',['卖出'])
		// let msg2 = this.$t('market.msg27',['买入'])
		// let msg3 = this.$t('market.msg28',['新增'])
		// let msg4 = this.$t('market.msg29',['移除'])
		// console.log(msg1)
		// }
	},
	methods: {
		getSymbol(v){
			if(v == 'WETH'){
				return  'ETH';
			}
			return v;
			
		},
		/**
		* 获取距离当前时间的时间长度
		* @param {Number} timestamp     - 要转换的时间参数（单位为秒）
		* @returns {String}
		*/
		simplyToRelativeTime(timestamp) {
		　　let currentUnixTime = Math.round((new Date()).getTime() / 1000);       // 当前时间的秒数
		　　let deltaSecond = currentUnixTime - parseInt(timestamp/1000, 10);            // 当前时间与要转换的时间差（ s ）
		　　let result;
		 
		　　if (deltaSecond < 60) {
		　　　　result = deltaSecond + '秒前';
		　　} else if (deltaSecond < 3600) {
		　　　　result = Math.floor(deltaSecond / 60) + '分钟前';
		　　} else if (deltaSecond < 86400) {
		　　　　result = Math.floor(deltaSecond / 3600) + '小时前';
		　　} else {
		　　　　result = Math.floor(deltaSecond / 86400) + '天前';
		　　}
		　　return result;
		},
		// 关闭提示
		close() {
			this.showMsg = false; //
		},
		async getDeFidetails(){
			let dataInfo = {} ;
			let url = this.name == 'Uniswap' ? '/Market/DeFi_details_uniswap' : '/Market/DeFi_details_justswap';
			if(this.name == 'Uniswap'){
				dataInfo = { pair_contract_address: this.info.pair_contract_address};
			}else{
				dataInfo = {
					pair_contract_address: this.info.pair_contract_address,
					pagesize: this.pagesize,
					pageNumber: this.currentPage
				}
			}
			const {
					data, pages
				} = await infoRequest({
					url: url, 
					method: "GET",
					data:dataInfo
					
				})
			if(this.name == 'Justswap'){
				this.list = data;
				//处理换算位数
				let num = [10];
				for(let i = 1; i< data[0].tokenDecimal; i++){
					num.push(0);
				}
				this.numbeInt = parseInt(num.toString().replace(/[,]/g,""));
				this.totalPage = pages;
			}else{
				this.list = data.swaps;
				this.uniswapInfo = data;
			}
			
		},
		// 交易类型-筛选
		checked(e) {
			// console.log(1111, e)
			this.changeType = e.orignItem.type;
		},
		//条数-筛选
		checked1(e) {
			// console.log(222, e)
			this.number = e.orignItem.num;
			console.log(1111, this.number);
		},
		// 分页-0 后退 1 前进
		forward(type) {
			if (type == 0) {
				if (this.currentPage == 1) {
					return;
				} else {
					this.currentPage--;
					this.getDeFidetails();
				}
			} else {
				if (this.currentPage == this.totalPage) {
					return;
				} else {
					this.currentPage++;
					this.getDeFidetails();
				}
			}
		},
		copy(v) {
			uni.setClipboardData({
				data: v,
				success: function() {
					console.log('success');
				}
			});
		},
		async getWalletPrivateKey() {
			const wallet = getCurrentWallet();
			console.log(this.info, 'aaaaaaa');
			let eth = {};
			try {
				
				//ETH = 2  DLM = 4
				if (wallet.category == 2 || wallet.category == 3) {
					// console.log(11111111111);
					const { data } = await request({
						url:
							'/getWalletPrivateKey?' +
							jsonToParams({
								wallet_id: wallet.id
							}),
						method: 'GET'
					});
					// console.log(11111111111);
					eth = {
						...wallet,
						private_key: data.private_key_original
					};
				}
			} catch (e) {
				console.log(1111111111, e);
				//TODO handle the exception
			}

			this.methodChannelData = {
				url: this.info.market_exchange_list[0].url,
				...eth
			};
			console.log("methodChannelData",this.methodChannelData)

			openPage(this.methodChannelData);
		},
		goPage() {
			this.showMSgModal = false;
			this.getWalletPrivateKey();
		},
		openWebUrl() {
			this.modelText = `您所访问的页面将进入第三方DApp《${this.info.market_exchange_list[0].ex_name}》`;
			this.content1 = `提示：您所访问的页面将进入第三方DApp《${
				this.info.market_exchange_list[0].ex_name
			}》,您在第三方Dapp上的使用行为将适用该第三方DApp的《隐私政策》和《用户协议》，由《${this.info.market_exchange_list[0].ex_name}》直接并单独向您承担责任。`;
			this.showMSgModal = true;
		}
	}
};
</script>

<style lang="scss" scoped>
	.pt2{
		padding-top: 2rpx;
	}
.msg {
	height: 150rpx;
	background-color: #fef0ed;
	color: #f1474f;
	padding: 26rpx 26rpx 12rpx 26rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-bottom: 10rpx;

	.btn {
		width: 84rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 20rpx;
		border: 1rpx solid #f1474f;
		margin-top: 12rpx;
	}
}

.main {
	color: #333333;
	font-size: 28rpx;
	padding: 30rpx;

	.info {
		margin-top: 28rpx;
		width: 100%;
	}
}

.mar {
	margin: 0 30rpx;
}

.card {
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
	border-radius: 20rpx;

	.card-top {
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #e6e6e6;
	}
}

.exchange {
	height: 100rpx;
	margin: 0 60rpx;
}

.change-type {
	margin: 0 60rpx 30rpx 60rpx;

	.select {
		width: 300rpx;
		padding: 15rpx 20rpx;
		height: 58rpx;
		box-sizing: border-box;
		border: 1rpx solid #cccccc;
		border-radius: 10rpx;
	}
}

.list-view {
	padding: 30rpx 60rpx 100rpx 60rpx;
	margin-bottom: 200rpx;

	.list-box {
		height: 130rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		border-bottom: 1rpx solid #e6e6e6;

		.item {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.width1 {
			width: 30%;
		}

		.width2 {
			width: 10%;
		}
	}
}

.fen {
	margin-top: 50rpx;
	justify-content: center;

	.arrows-left {
		transform: rotateY(180deg);
		width: 14rpx;
		height: 25rpx;
	}
}

.bottom {
	position: fixed;
	z-index: 99999;
	height: 150rpx;
	width: 100%;
	bottom: 0;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1rpx solid #e6e6e6;

	.btn {
		width: 650rpx;
		height: 88rpx;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
		border-radius: 44rpx;
		color: #ffffff;
		line-height: 88rpx;
		text-align: center;
	}
}

.charts {
	width: 100%;
	background-color: #ffffff;
}
</style>
