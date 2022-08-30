<!-- 群聊 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"></u-navbar>
		
		<base-noData v-if="list.length == 0" />
		<view  v-else v-for="(item,index) in list" class="list" >
			<view class="flex-align">
				<image class="img-box"  :src="item.icon_select" mode=""></image>
				<view class="title-box">
					<view class="font-l title">{{item.name}}</view>
				</view>
				<image @click="clickOperate(item, 2)" class="icon-del" src="../../static/index/icon-del.png"></image>
			</view>
		</view>
		<view class="title-box-nav">未展示网络</view>
		<view   v-for="(item,index) in delList" class="list" >
			<view class="flex-align">
				<image class="img-box"  :src="item.icon_select" mode=""></image>
				<view class="title-box">
					<view class="font-l title">{{item.name}}</view>
				</view>
				<image @click="clickOperate(item, 1)" class="icon-del" src="../../static/index/icon-add.png"></image>
			</view>
		</view>
		<view class="btn flex-center color-r font-l"  @click="getadd">{{ btnTitle }}</view>
		
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				isEnter:true,
				list: [],
				delList: [],
				auid: '',
				defList: [],
				navTitle: this.$t("home.txt143", ["网络管理"]),
				btnTitle: this.$t('home.txt144', ['添加自定义网络']),
			}
		},
		mounted() {
			this.getList();
		},
		onShow() {
			this.getList();
			
		},
		methods: {
			async	getList(){
				let {
					data,
					errorMessage
				} = await request({
					url: '/wallet-getChainCategory',
					method: 'get',
				})
				
				this.list = data;
				this.getAll();
			},
			async getAll(){
					let {
						data,
						errorMessage
					} = await request({
						url: '/wallet-getChainAllCategory',
						method: 'get',
					})
					this.defList = data;
				//去重
				let newData = data;
				for(let i1 in this.list){
				for(let i in newData){
						if(newData[i].category == this.list[i1].category){
							newData.splice(i,1);
						}
					}
				}
				this.delList = newData;
			},
			getadd(){
        this.toPage('/pages/index/add-netword')
			},
			toPage(url) {
        this.toPage(url)
			},
			async clickOperate(item, type){
				let {
					data,
					errorMessage
				} = await request({
					url: '/wallet-updateMyNet',
					method: 'POST',
					data: {
						category: item.category,
						type: type
					}
				})
				
				this.getList();
				
			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head-box {
		background-color: #fff;
		border-bottom: 1px solid #E6E6E6;
		padding: 0 30rpx 20rpx;

		.input-box {
			height: 64rpx;
			background: #F5F5F5;
			border-radius: 32rpx;
			width: 100%;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
		}
	}

	.list {
		border-bottom: 1px solid #eee;
		padding: 20rpx 30rpx;

		.image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
		}

		.img-box {
			width:60rpx;
			min-width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 60rpx;
			color: #FFFFFF;
			margin-right: 20rpx;
		}

		.title-box {
			flex: 1;

			.title {
				width: 90%;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1; 
				-webkit-box-orient: vertical;
			}
		}
		.icon-del{
			width: 50rpx;
			height: 50rpx;
		}

		.img {
			width: 14rpx;
			height: 24rpx;
			margin-left: 10rpx;
		}

	}
	.btn-view {
		height: 200rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 996;
		background-color: #FFFFFF;
	
		.btn {
			width: 650rpx;
		}
	
		.btn1 {
			opacity: 0.3;
		}
	}
	.title-box-nav{
		padding: 20rpx;
		background-color: #F1F1F1;
		color: #999;
		font-size: 28rpx;
	}
	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: 20rpx auto;
		box-sizing: border-box;
		border-radius: 44rpx;
		
		background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}
</style>
