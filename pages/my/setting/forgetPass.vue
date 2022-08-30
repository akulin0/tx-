<!-- 忘记交易密码 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navText" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;" title-width="500"></u-navbar>
		<view class="content">
			<view v-for="(item,index) in list" class="list flex-j-a font-body" @click="toPage(item.url)">
				<view>{{item.title}}</view>
				<image src="/static/my/more.png" mode="" class="img"></image>
			</view>
		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				navText:this.$t('ibinz.msg102',['忘记交易密码']),
				list: [{
						title: this.$t('ibinz.msg103',['通过验证码找回']),
						url: '/pages/my/setting/codeFind?type=0'
					},
					{
						title: this.$t('ibinz.msg104',['通过助记词找回']),
						url: '/pages/index/verifpass'
					}
				]

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
		padding: 11rpx 30rpx 0;
	}

	.list {
		border-bottom: 1px solid #E6E6E6;
		padding: 36rpx 0;

		.img {
			width: 14rpx;
			height: 24rpx;
			margin-left: 21rpx;
		}
	}
</style>
