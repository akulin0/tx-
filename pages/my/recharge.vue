<!-- 充值 -->
<template>
	<base-layout>
		<u-navbar  v-if="!isTx()" :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="font-body">{{$t('home.txt42',['余额'])}}：<span class="font-l font-w">2559.00</span></view>
			<view class="flex-j-a input-box">
				<input class="uni-input" :placeholder="placeholder" v-model="money" />
			</view>
			<view class="btn flex-center color-r font-l" :class="[!money?'btn1':'']" @click="save()">{{$t('ibinz.msg127',['立即充值'])}}</view>
		</view>
		
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				navTitle:this.$t('ibinz.msg115',['充值']),
				placeholder:this.$t('ibinz.msg126',['请输入充值金额'])

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
		methods: {
			save(){
				if(!this.money){
					uni.showToast({
						title:this.$t('ibinz.msg142',['输入金额不能为空!']),
						icon:'none'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 40rpx 30rpx 0;
	}

	.input-box {
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;
		margin-top: 46rpx;
		input {
			font-size: 28rpx;
			flex: 1;
		}
	}

	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 110rpx;
		border-radius: 44rpx;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}

	.btn1 {
		opacity: 0.5;
	}
</style>
