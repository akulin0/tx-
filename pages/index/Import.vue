<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title="title" style="border-bottom: 1px solid #E6E6E6;" :title-bold="true">
			</u-navbar>
			<view class="homebox">
				<view class="flex-j-a items" @click="topage('/pages/index/Import1')">
					<view class="flex-j-a ">
						<image src="/static/index/import0.png" style="width: 64rpx;height: 64rpx;min-width: 64rpx;" mode="">
						</image>
						<view style="margin-left: 30rpx;">
							<view class="title">{{$t('home.txt99',['私钥导入'])}}</view>
							<view class="value">{{$t('home.txt100',['通过输入明文私钥或扫描二维码进行导入'])}}</view>
						</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="flex-j-a items" @click="topage('/pages/index/Import2')" v-if="walletInfo.category!=3">
					<view class="flex-j-a ">
						<image src="/static/index/import1.png" style="width: 64rpx;height: 64rpx;min-width: 64rpx;" mode="">
						</image>
						<view style="margin-left: 30rpx;">
							<view class="title">{{$t('home.txt101',['助记词导入'])}}</view>
							<view class="value">{{$t('home.txt102',['通过输入助记词或扫描二维码进行导入'])}}</view>
						</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="flex-j-a items" @click="topage('/pages/index/Import3')"
					v-if="walletInfo.category==2 || walletInfo.category==4">
					<view class="flex-j-a ">
						<image src="/static/index/import2.png" style="width: 64rpx;height: 64rpx;min-width: 64rpx;" mode="">
						</image>
						<view style="margin-left: 30rpx;">
							<view class="title">{{$t('home.txt103',['Keystore导入'])}}</view>
							<view class="value">{{$t('home.txt104',['输入Keystore文件或扫描二维码进行导入'])}}</view>
						</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				//category 1、比特币；2、以太坊；3、波场；4、Telegram X
				walletInfo: {}, //导入的钱包体系
				title:this.$t('home.txt98',['导入方式']),
			}
		},
		onLoad(opt) {
			this.walletInfo = JSON.parse(opt.wallet)
			console.log("导入-钱包", this.walletInfo);
		},
		methods: {
			//页面跳转
			topage(url) {
        this.toPage(url + '?name=' + this.walletInfo.name + "&title=" + this.walletInfo.title + "&category=" + this
            .walletInfo.category)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.homebox {
		margin-top: 40rpx;
		padding: 0 30rpx;
	}

	.items {
		height: 140rpx;
		width: 100%;
		border-bottom: 1px solid #E6E6E6;

		.title {
			font-size: 30rpx;
			font-weight: 500;
			color: #333333;
		}

		.value {
			font-size: 26rpx;
			font-weight: 500;
			color: #999999;
		}
	}
</style>
