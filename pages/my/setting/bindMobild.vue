<template>
	<view class="login page">
		<u-navbar v-if="!isTx()"  is-fixed backgroundColor="#fff" :title="navTitle" title-width="500"/>
		<view class="warp">
			<image src="/static/my/image.png" />
			<view class="base">{{$t('ibinz.msg94',['当前绑定手机'])}}：{{account | setAccount}}</view>
			<base-button @submit="goTo()" class="base-button" :title="btnText" />
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				account:'',
				navTitle:this.$t('ibinz.msg93',['绑定手机']),
				btnText:this.$t('ibinz.msg95',['更换手机号'])
			}
		},
		onLoad(opt) {
			this.account=opt.account
		},
		filters: {
			setAccount(data) {
				return data.substr(0, 3) + "****" + data.substr(7)
			}
		},
		methods:{
			goTo(){
				uni.navigateTo({
					url:'/pages/my/setting/mobile?account='+this.account
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/m-subpack/base/scss/main.scss";

	.warp {
		text-align: center;
		padding-top: 95rpx;

		image {
			width: 108rpx;
			height: 160rpx;
		}

		.base {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			padding-top: 50rpx;
			padding-bottom: 170rpx;
		}

		.base-button {
			height: 88rpx;
			margin: 0 30rpx;
		}

	}
</style>
