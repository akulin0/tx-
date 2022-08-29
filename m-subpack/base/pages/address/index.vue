<template>
	<view class="address">
		<u-navbar :is-back="true" is-fixed title="收货地址"  :border-bottom="false">

		</u-navbar>
		<view class="item" v-for="(res, index) in siteList" :key="res.id" v-if="siteList.length>0">
			<view class="top"  @click="getAddress(res)">
				<view class="name">{{ res.userName }}</view>
				<view class="phone">{{ res.userPhone }}</view>

			</view>
			<view class="bottom">
				<span  @click="getAddress(res)"><text v-if="res.isDefault==1">[默认地址]</text>{{res.address}} {{res.houseNumber}}</span>
				<u-icon @click="edit(res)" name="edit-pen" :size="40" color="#999999"></u-icon>
			</view>
		</view>
		<view class="bottom-h">
			
		</view>
		<base-noData v-if="siteList.length==0" />
		<view class="bottom-nav">
			<view class="addSite" @tap="toAddSite">
				<view class="add">
					<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		request,
		navigateBack
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				siteList: [],
				type: ""
			};
		},
		onLoad(o) {
			this.type = o.type

		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
			let {list} =	await request({
					url:"/base/User/BaseGetAddressList",
					method:"POST",
					data:{
						  "pageIndex": 1,
						  "pageSize": 20
					}
				})
				console.log(list)
				this.siteList =list;
				console.log(this.siteList)
			},
			toAddSite() {
				uni.navigateTo({
					url: 'addSite'
				});
			},
			edit(item) {
				uni.navigateTo({
					url: 'addSite?id='+item.id
				});
			},
			async getAddress(item) {
				if (this.type == 1) {
					navigateBack(item);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "@/m-subpack/base/scss/main.scss";
	.address {
		background-color: #fff;
		min-height: 100vh;
	}
	.item {
		padding: 30rpx 0;
		border-bottom: 1px solid #E6E6E6;
		margin: 0 30rpx;
		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

		}
	}

	.bottom {
		display: flex;
		margin-top: 10rpx;
		font-size: 28rpx;
		align-items: center;
		justify-content: space-between;
		color: #999999;
		text {
			color: #FA7528;
			font-size: 28rpx;
		}
	}
	.bottom-h {
		height: 140rpx;
		width: 100%;
	}
	.bottom-nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 30rpx;
		height: 130rpx;
		background-color: #fff;
	}
	.addSite {
		display: flex;
		justify-content: space-around;
		height: 88rpx;

		background: $base-address-bgColor;
		border-radius: 60rpx;
		font-size: 30rpx;
		
		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>
