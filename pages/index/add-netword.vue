<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title="titles" style="border-bottom: 1px solid #E6E6E6;" :title-bold="true">
			</u-navbar>
			<view style="padding: 0 30rpx;">
				<view class="hint-box">
					{{$t('network.txt12',['DOLAIMI无法验证自定义网络的安全性，请仅添加可信任的网络。'])}}
				</view>
				<view class="input-item">
					<view class="commonfont">{{$t('network.txt1',['网络系列'])}}</view>
					<input type="text" @click="show=true"  disabled :placeholder="searchText" placeholder-style="color:#B3B3B3;font-size:28rpx"
						class="i-items" v-model="data.net_name" />
					<image class="icon-right" src="/static/my/more.png" ></image>
				</view>
				<view class="input-item">
					<view class="commonfont">{{$t('network.txt2',['网络名称'])}} </view>
					<input type="text" :placeholder="searchText2" placeholder-style="color:#B3B3B3;font-size:26rpx"
						class="i-items" v-model="data.title" />
				</view>
				<view class="input-item">
					<view class="commonfont">{{$t('network.txt3',['节点链接RPC'])}} </view>
					<input type="text" :placeholder="searchText3" placeholder-style="color:#B3B3B3;font-size:26rpx"
						class="i-items" v-model="data.rpc" />
				</view>
				<view class="input-item">
					<view class="commonfont">Chain ID</view>
					<input type="number" :placeholder="searchText4" placeholder-style="color:#B3B3B3;font-size:26rpx"
						class="i-items" v-model="data.china_id" />
				</view>
				<view class="input-item">
					<view class="commonfont">{{$t('network.txt4',['默认代币符合(选填)'])}} </view>
					<input type="text" :placeholder="searchText5" placeholder-style="color:#B3B3B3;font-size:26rpx"
						class="i-items" v-model="data.name" />
				</view>
				<view class="input-item">
					<view class="commonfont">{{$t('network.txt5',['区块链浏览器(选填)'])}} </view>
					<input type="text" :placeholder="searchText6" placeholder-style="color:#B3B3B3;font-size:26rpx"
						class="i-items" v-model="data.browser" />
				</view>
				<view class="input-item">
				</view>
			</view>

		</view>
		<view class="btn-box flex-j-a">
			<view class="btn1 flex-center" @click="toPage(`/pages/index/network-list`)">{{$t('ibinz.msg14',['取消'])}}
			</view>
			<view class="btn2 flex-center color-r" @click="submit">{{ btnText }}</view>
		</view>
		<u-popup  v-model="show"  mode="bottom" border-radius="30" :closeable="false" :mask-close-able='false'>
			<view class="otherMoney" >
				<view class="commonfont" @click="clickCategory(1)"  style="font-size: 30rpx;border-bottom: 1rpx solid #E6E6E6;"
					>{{
								  $t("network.txt13", ["以太坊系列"])
								}}</view>
				<view class="commonfont"  @click="clickCategory(2)" style="font-size: 30rpx;border-bottom: 8rpx solid #E6E6E6;"
					>{{
								  $t("network.txt14", ["波卡系列"])
								}}</view>
				
				<view class="commonfont" style="font-size: 30rpx;" @click="clickCancel">{{
								  $t("home.txt24", ["取消"])
								}}</view>
			</view>
		</u-popup>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Md5 from "@/components/md5.js"
	import {clearWallet} from "@/decorator/wallet"
	var tip = null;
	export default {
		data() {
			return {
				select: false,
				searchText: this.$t('network.txt10', ['请选择网络系列']),
				searchText2: this.$t('network.txt6', ['请自定义网络名称']),
				searchText3: this.$t('network.txt8', ['请输入节点链接']),
				searchText4: this.$t('network.txt11', ['请输入Chain ID']),
				searchText5: this.$t('network.txt7', ['请输入默认代币符合']),
				searchText6: this.$t('network.txt9', ['请输入区块链浏览器链接']),
				btnText: this.$t('ibinz.msg62', ['保存']),
				title: '', //钱包类型
				titles: this.$t('home.txt145', ['自定义钱包']),
				activecolor: "",
				showpassType: this.$t('home.txt113', ['弱']),
				percents: 0,
				category: "",
				show: false,
				name: "", //钱包名称
				data: {
					browser: "",
					china_id: 0,
					name: "",
					net_category: 1,
					net_name: this.$t("network.txt13", ["以太坊系列"]),
					rpc: "",
					title: ""
				}
			}
		},

		onLoad() {

		},
		methods: {
			//搜索
			toPage(url) {
        this.toPage(url)
			},
			clickCategory(type){
				this.data.net_category = type;
				this.data.net_name = type == 1 ? this.$t("network.txt13", ["以太坊系列"]) :  this.$t("network.txt14", ["波卡系列"]);
				this.show = false;
			},
			//创建钱包
			async submit() {
				if(!this.data.title){
					uni.showToast({
						title: this.searchText2,
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				if(!this.data.rpc){
					uni.showToast({
						title: this.searchText3,
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				if(!this.data.china_id){
					uni.showToast({
						title: this.searchText4,
						duration: 1000,
						icon: 'none'
					})
					return;
				}
					let {
						data,
						errorMessage
					} = await request({
						url: '/wallet-addChainNet',
						method: 'post',
						data: this.data
					})
        this.toPage('/pages/index/network-list')


        // uni.navigateTo({
				// 		url: '/pages/index/network-list'
				// 	})
			},
			topage(url) {
        this.toPage(url)
			},
			clickCancel(){
				this.show = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hint-box{
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #F8F4E8;
		color: #C58441;
		border-radius: 10rpx;
		font-size: 24rpx;
	}
	.passbox {
		width: 590rpx;
		height: 560rpx;
		background: #FFFFFF;
		padding: 40rpx;

		.passbox-title {
			width: 100%;
			text-align: center;
			font-size: 34rpx;
			font-weight: 500;
			color: #333333;
		}
	}

	.nosubmit {
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

	.passType {
		position: absolute;
		right: 30rpx;
		font-size: 12rpx;

		.type {
			font-size: 16rpx;
			margin-right: 10rpx;
		}

		.linetype {
			width: 100rpx;
		}
	}

	.input-item {
		height: 178rpx;
		position: relative;
		.i-items {
			height: 68rpx;
			border-bottom: 1px solid #E6E6E6;
		}
		.icon-right{
			position: absolute;
			right: 30rpx;
			top: 80rpx;
			width: 12rpx;
			height: 24rpx;
		}
	}

	.font-co {
		color: #2DA5E1;
		margin: 0 10rpx;
	}

	.commonfont {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin: 30rpx 0;
	}

	.tip {
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		text-align: right;
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
	}
	.otherMoney {
		width: 750rpx;
		// height: 346rpx;
		background: #FFFFFF;
	
		>view {
			width: 750rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #FFFFFF;
		}
	}

	
</style>
