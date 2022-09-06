<!-- 我的页面 -->
<template>
	<base-layout>
		<view :class="[btn === false?'box':'box-night']">
			<u-navbar :is-back="true" v-if="!isTx()" title="选择钱包体系" :title-width="227" class="zhiti":title-bold="true">
			</u-navbar>
			<view style="margin-top: 70rpx;">
				<view class="flexs list" v-for="(item,index) in list" :key="index" @click="current(item,index)">
					<view class="flexs" style="align-items: center;margin-left: 30rpx;">
						<image style="width: 80rpx;height: 80rpx;margin-right: 16rpx;" :src="item.icon_select" mode=""></image>
						<view>{{item.name}}</view>
					</view>
					<!-- <view style="margin-right: 30rpx;">
						<image v-if="item.select" style="width: 36rpx;height: 36rpx;" src="/static/biticon/select.png" mode=""></image>
						<image v-else src="/static/biticon/noselect.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
					</view> -->
				</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				//category 1、比特币；2、以太坊；3、波场；4、Telegram X
				list: [],
				type: 0,
        btn: localStorage.getItem("btn") === "true",
			}
		},
		onLoad(o) {
			//type: 1创建钱包 2 导入钱包 4 地址本编辑
			this.type = o.type;
      uni.setNavigationBarTitle({title:'选择钱包体系'})
			this.getList();
		},
		
		methods: {
		async	getList(){
			uni.showLoading({
			  title: this.$t("ibinz.msg48", ["加载中"]),
			});
				let {
					data,
					errorMessage
				} = await request({
					url: '/wallet-getChainCategory',
					method: 'get',
				})
      // uni.setStorageSync("chin", data.map((item) => {
      //     return item.title
      // }));

			this.list = data;
			 uni.hideLoading();
			},
			current(item, i) {
				if (this.type == 1) {
					uni.redirectTo({
						url: 'addmoney?name=' + item.name + "&title=" + item.title + "&category=" + item.category
					})
				} else if (this.type == 4) {
					uni.redirectTo({
						url: '/pages/my/addressEdit?img=' + item.img + "&title=" + item.title + '&index=' + item.category +
							'&type=1'
					})
				} else {
					uni.redirectTo({
						url: 'Import?wallet=' + JSON.stringify(item)
					})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
  .box{

  }
  .box-night{
    background-image: url("/static/my/bj.png");
    background-size: 100% 100%;
    height: 100vh;
  }

	.flexs {
		display: flex;
		flex-direction: row;
	}

	.list {
		justify-content: space-between;
		align-items: center;
		margin: 30rpx auto 20rpx;
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
	
	// .zhiti {
	// 	font-size: 36rpx !important;
	// 	font-weight: 400 !important;
	// }
</style>
