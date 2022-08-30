<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title="title" style="border-bottom: 1px solid #E6E6E6;" :title-bold="true">
			</u-navbar>
			<view class="copypass">
				<image src="/static/index/copymoney.png" style="width: 200rpx;height: 200rpx;margin: 190rpx 0 100rpx 0;"
					mode=""></image>
				<view style="color: #333;font-size: 36rpx;font-weight: bold;">{{$t('home.txt76',['请勿截图'])}}</view>
				<view style="color: #999999;font-size: 28rpx;margin-top: 46rpx;" v-if="category!=3 && category!=5">
					{{$t('home.txt77',['如果有人获取了你的助记词将直接获取你的资产'])}}
				</view>
				<view style="color: #999999;font-size: 28rpx;margin-bottom: 210rpx;" v-if="category!=3 && category!=5">
					{{$t('home.txt78',['请抄下助记词并存放在安全的地方'])}}
				</view>
				<view style="color: #999999;font-size: 28rpx;margin-top: 46rpx;" v-if="category==3 || category==5">
					{{$t('home.txt134',['如果有人获取了你的私钥将直接获取你的资产'])}}
				</view>
				<view style="color: #999999;font-size: 28rpx;margin-bottom: 210rpx;" v-if="category==3 || category==5">
					{{$t('home.txt135',['请抄下助记词并存放在安全的地方'])}}
				</view>

				<base-button ref="button" :title="btnTitle" style="width: 690rpx;" @submit="ok()"></base-button>
			</view>
		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				title: this.$t('home.txt75', ["备份钱包"]),
				btnTitle: this.$t('home.txt79', ["我知道了"]),
				category: "", //1、比特币；2、以太坊；3、波场；4、Telegram X
			}
		},
		onLoad(opt) {
			//category 1、比特币；2、以太坊；3、波场；4、Telegram X
			this.category = opt.category
			// console.log(this.category,1);
		},
		methods: {
			async ok() {
				this.$refs.button.hideLoading()
				if (this.category == 3 || this.category == 5) {
          this.toPage('copyKey')
          // uni.navigateTo({
					// 	url: 'copyKey'
					// })
				} else {
          this.toPage('copymoney')
					// uni.navigateTo({
					// 	url: 'copymoney'
					// })
				}

			},

		}
	}
</script>

<style lang="scss" scoped>
	.copypass {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 30rpx;
	}
</style>
