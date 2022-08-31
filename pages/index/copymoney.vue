<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title="title" :title-width="500" style="border-bottom: 1px solid #E6E6E6;" :title-bold="true">
			</u-navbar>
			<view class="copymoney">
				<view style="font-size: 30rpx;color: #333;margin: 38rpx 0;">{{$t('home.txt67',['助记词用于恢复钱包及重置钱包密码，请准确无误抄写助记词，并存放在安全的地方。'])}}
				</view>
				<view class="box ">
					<view v-for="(item,index) in word" :key='index' class="item commonfont">{{item}}</view>
				</view>
				<view class="commonfonts" style="margin-top: 60rpx;">
					<view style="font-size: 28rpx;">{{$t('home.txt68',['注意：'])}}</view>
					<view>· {{$t('home.txt69',['请勿将助记词透漏给任何人'])}}</view>
					<view>· {{$t('home.txt70',['助记词一旦丢失，资产将无法恢复'])}}</view>
					<view>· {{$t('home.txt71',['请勿通过截屏、网络传输的方式进行备份保存'])}}</view>
					<view>· {{$t('home.txt72',['遇到任何情况，请不要轻易卸载钱包APP'])}}</view>
				</view>
				<view style="position: absolute;bottom: 154rpx;width: 690rpx;" :style="{bottom:$i18n.locale == 'en-US'?'50rpx':'154rpx'}">
					<base-button ref='button' @submit="gocode" :title="btnTitle"></base-button>
					<view style="color: #2DA5E1; font-size: 28rpx;text-align: center;margin-top: 20rpx;"
						@click="copy()"> {{$t('home.txt74',['复制助记词'])}}</view>
				</view>

			</view>

		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				title:this.$t('home.txt66', ["备份助记词"]),
				btnTitle:this.$t('home.txt73', ["备份完成，进行验证"]),
				word: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			}
		},
		onLoad(opt) {
			let data = uni.getStorageSync('mnemonics')
      this.word = data.phrase.split(' ')
		},
		methods: {
			gocode() {
				this.$refs.button.hideLoading()
        this.toPage('verifpass?type=' + this.type)
        // uni.navigateTo({
				// 	url: 'verifpass?type=' + this.type
				// })
			},
			copy() {
				var _this=this
				uni.setClipboardData({
					data: uni.getStorageSync('mnemonics'),
					success: function() {
						_this.$refs.uToast.show({
							title: _this.$t('home.txt16',['复制成功']),
							type: 'success'
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.copymoney {
		padding: 0 30rpx;

		.commonfont {
			font-size: 28rpx;
			color: #333;
		}

		.commonfonts {
			font-size: 26rpx;
			color: #FF1425;

			>view {
				line-height: 40rpx;
			}
		}

		.box {
			width: 690rpx;
			height: 446rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.item {
				width: 190rpx;
				height: 80rpx;
				background: #FFFFFF;
				border-radius: 4rpx;
				font-size: 28rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: 500;
				color: #333333;
				margin-right: 28rpx;
			}

			>.item:nth-child(1) {
				margin-top: 28rpx;
				margin-left: 28rpx;
			}

			>.item:nth-child(2) {
				margin-top: 28rpx;
			}

			>.item:nth-child(3) {
				margin-top: 28rpx;
			}

			>.item:nth-child(4) {
				margin-left: 28rpx;
			}

			>.item:nth-child(7) {
				margin-left: 28rpx;
			}

			>.item:nth-child(10) {
				margin-left: 28rpx;
			}
		}
	}
</style>
