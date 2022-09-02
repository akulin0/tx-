<!-- 我的账户 -->
<template>
	<base-layout>
		<u-navbar  v-if="!isTx()" :is-back="true" :is-fixed="true" :title="navText" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="box color-r">
				<image src="/static/my/bg.png" mode=""></image>
				<view class="box-view">
					<view class="font-body">
						{{$t('home.txt42',['余额'])}}：<span class="font-max font-w">2559.00</span>
					</view>
					<view class="flex-align btns font-body">
						<view class="btn1 flex-center" @click="toPage('/pages/my/recharge')">{{$t('ibinz.msg115',['充值'])}}</view>
						<view class="btn2 flex-center" @click="toPage('/pages/my/withdraw')">{{$t('ibinz.msg116',['提现'])}}</view>
					</view>
				</view>
			</view>
			<view class="list-box">
				<view class="flex-j-a">
					<view class="font-body title-sty">提现</view>
					<view class="font-w">2354.00</view>
				</view>
				<view class="flex-j-a font-s color-main" style="margin-top: 28rpx;">
					<view>2021-1-47 12:41:12</view>
					<view>手续费:10:22</view>
				</view>
			</view>
			<view class="list-box">
				<view class="flex-j-a">
					<view class="font-body title-sty">收红包-来自李可</view>
					<view class="font-w">2354.00</view>
				</view>
				<view class="flex-j-a font-s color-main" style="margin-top: 28rpx;">
					<view>2021-1-47 12:41:12</view>
					<view style="color: #FE510F;">已全额退款</view>
				</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				navText:this.$t('ibinz.msg114',['我的账户'])

			}
		},
		components: {

		},
		onLoad() {


		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 24rpx 30rpx 30rpx;
	}

	.box {
		height: 278rpx;
		width: 100%;
		position: relative;
		margin: 24rpx 0 22rpx;

		image {
			height: 278rpx;
			width: 100%;
		}

		.box-view {
			height: 278rpx;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			padding: 37rpx 39rpx 51rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;

			.btns {
				justify-content: flex-end;

				view {
					width: 150rpx;
					height: 60rpx;
					border-radius: 30rpx;
				}

				.btn1 {
					background-color: #FFFFFF;
					color: #2DA5E1;
					margin-right: 20rpx;
				}

				.btn2 {
					border: 1px solid #FFFFFF;
					box-sizing: border-box;
				}
			}
		}
	}

	.list-box {
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;

		.title-sty {
			width: 75%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2; //设置显示几行
			-webkit-box-orient: vertical;
		}
	}
</style>
