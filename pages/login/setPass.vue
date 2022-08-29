<!-- 设置资金密码 -->
<template>
	<base-layout>
		<u-popup v-model="show" mode="center" border-radius="20" :closeable="true" @close="toPage()" width="700">
			<view class="font-max title">
				{{$t('login.msg24',['设置资金密码'])}}
			</view>
			<view class="content">
				<view class="font-m text">{{$t('login.msg25',['为了保障您的账户资金安全请先设置资金密码'])}}</view>
				<view>
					<u-message-input :maxlength="6" @finish="finish" :dot-fill="true"></u-message-input>
				</view>
				<view class="font-s" style="margin-top: 19rpx;color: #FF5050;">{{$t('login.msg26',['交易密码必须为6位数字'])}}</view>
				<view class="btn color-r flex-center" @click="save()">{{$t('home.txt56',['确认'])}}</view>
			</view>

		</u-popup>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Md5 from "@/components/md5.js"
	export default {
		data() {
			return {
				show: true,
				num: ''
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			toPage() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			async save() {
				if (this.num) {
					const {
						res
					} = await request({
						url: '/set-fund-password',
						method: 'post',
						data: {
							"fund_password": this.num
						}
					})
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}

			},
			finish(e) {
				this.num = e
				console.log('输入结束，当前值为：' + e);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		text-align: center;
		margin-top: 20rpx;
	}

	.content {
		width: 100%;
		padding: 0 34rpx;
		box-sizing: border-box;

		.text {
			margin: 89rpx 0 35rpx;
		}

		.btn {
			height: 88rpx;
			background: #2DA5E1;
			box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
			border-radius: 44rpx;
			width: 100%;
			margin: 90rpx 0 60rpx;
		}
	}
</style>
