<!-- 助记词找回 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="navText" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;" title-width="500"></u-navbar>
		<view class="content">
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="title1" :class="[$i18n.locale == 'en-US'?'font-m':'font-body']">{{$t('ibinz.msg31',['新密码'])}}</view>
					<input class="uni-input" :placeholder="placeholder" v-model="newPass" password />
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(2)" v-if="newPass"></image>
			</view>
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view  :class="[$i18n.locale == 'en-US'?'titles1':'title1',$i18n.locale == 'en-US'?'font-m':'font-body']">{{$t('ibinz.msg33',['确认新密码'])}}</view>
					<input class="uni-input" :placeholder="placeholder1" v-model="agenPass" password />
				</view>
				<image src="/static/my/del.png" mode="" class="img" @click="clear(3)" v-if="agenPass"></image>
			</view>
			<view class="btn flex-center color-r font-l" :class="[ !newPass || !agenPass?'btn1':'']" @click="save">{{$t('ibinz.msg37',["确认"])}}</view>
		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				newPass: '',
				agenPass: '',
				navText:this.$t('ibinz.msg113',['助记词找回']),
				placeholder:this.$t('ibinz.msg32',['请输入新密码']),
				placeholder1:this.$t('ibinz.msg34',['请确认新密码']),
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
			save() {
				if (!this.agenPass || !this.newPass) {
					return
				} else if (this.agenPass != this.newPass) {
					uni.showToast({
						title: this.$t('ibinz.msg35',['两次密码输入不一致']),
						icon: 'none'
					})
				} else {
					uni.reLaunch({
					    url: '/pages/my/setting/setting'
					})
				}
			},
			clear(type) {
				switch (type) {
					case 2:
						this.newPass = ''
						break;
					case 3:
						this.agenPass = ''
						break;
					default:
						break;
				}
			},
			toPage(){
				uni.navigateTo({
					url:'/pages/my/setting/forgetPass'
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 11rpx 30rpx 0;
	}

	.slot-right {
		margin-right: 32rpx;
	}

	.input-box {
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;

		.img {
			width: 30rpx;
			height: 30rpx;
		}

		.title1 {
			width: 30%;
		}
		
		.titles1{
			width: 44%;
		}

		input,
		textarea {
			font-size: 28rpx;
			flex: 1;
		}

		textarea {
			height: 100rpx;
		}
	}

	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 87rpx;
		border-radius: 44rpx;
		
		background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}

	.btn1 {
		opacity: 0.5;
	}
</style>

