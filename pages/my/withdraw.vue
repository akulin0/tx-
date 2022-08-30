<!-- 提现 -->
<template>
	<base-layout>
<!--		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>-->
		<view class="content">
			<view class="font-body title-box">{{$t('home.txt42',['余额'])}}：<span class="font-l font-w">{{money}}</span></view>
			<view class="flex-j-a input-box">
				<input class="uni-input" :placeholder="placeholder" v-model="address" focus />
				<image src="/static/my/saoyisao.png" mode="" style="width: 38rpx;height: 38rpx;" @click="code()"></image>
			</view>
			<view class="flex-j-a input-box">
				<input class="uni-input" :placeholder="placeholder1" v-model="num" />
				<view class="font-body" style="color: #FE510F;" @click="all()">{{$t('home.txt85',['全部'])}}</view>
			</view>
			<view class="font-t font-w" style="margin: 40rpx 0;">{{$t('ibinz.msg130',['旷工费'])}}</view>
			<view class="flex-align">
				<view class="list-box color-s">
					<view class="box">
						<view class="font-t">{{$t('home.txt89',['慢'])}}</view>
						<view class="font-mins">0.000007BTC</view>
						<view class="font-mins">≈$0.25</view>
					</view>
					<view class="font-mins text">≈{{$t('ibinz.msg131',['60分钟'])}}</view>
				</view>
				<view class="list-box color-s">
					<view class="box">
						<view class="font-t">{{$t('home.txt89',['慢'])}}</view>
						<view class="font-mins">0.000007BTC</view>
						<view class="font-mins">≈$0.25</view>
					</view>
					<view class="font-mins text">≈{{$t('ibinz.msg131',['60分钟'])}}</view>
				</view>
			</view>
			<view class="btn flex-center color-r font-l" :class="[!address || !num?'btn1':'']" @click="save()">{{$t('ibinz.msg132',['立即提现'])}}</view>
		</view>
		
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				address: '',
				num: '',
				money: '2559.00',
				navTitle:this.$t('ibinz.msg116',['提现']),
				placeholder:this.$t('ibinz.msg128',['请输入提现地址']),
				placeholder1:this.$t('ibinz.msg129',['请输入提现数量'])
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
			all(){
				this.num=this.money
			},
			save(){
				if(!this.address || !this.num){
					uni.showToast({
						title:this.$t('ibinz.msg143',['请输入完整信息!']),
						icon:'none'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
			},
			code(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 40rpx 30rpx 0;
	}

	.title-box {
		margin-bottom: 47rpx;
	}

	.input-box {
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;

		input {
			font-size: 28rpx;
			flex: 1;
		}
	}

	.list-box {
		border: 1px solid #CCCCCC;
		border-radius: 10rpx;
		margin-right: 13rpx;
		.box {
			padding: 19rpx 17rpx 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-bottom: 1px solid #ccc;
		}
		.text{
			text-align: center;
			margin: 10rpx 0;
		}
	}

	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 95rpx;
		border-radius: 44rpx;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}

	.btn1 {
		opacity: 0.5;
	}
</style>
