<!-- 备注修改 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"
			style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="box font-body">
				<view>{{$t('home.txt112',['备注'])}}:</view>
				<textarea style="padding: 0 30rpx 30rpx 30rpx;"  :placeholder="placeholder" v-model="content" />
			</view>

		</view>
		<view class="btn flex-center color-r font-l" :class="[ !content?'btn1':'']" @click="save">
			{{$t('home.txt56',['确认'])}}</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base"; 
	export default {
		data() {
			return {
				content: '',
				navTitle: this.$t('home.txt112', ['备注']),
				id: '',
				placeholder:  this.$t('ibinz.msg60', ['请输入备注内容'])
			}
		},
		components: {

		},
		onLoad(option) {
			this.id = option.id
			if(option.remark && option.remark!='null')
			this.content = option.remark || ""
		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		methods: {
			async save() {
				const {
					data
				} = await request({
					url: '/transactionRemark',
					method: 'post',
					data: {
						id: this.id,
						remark: this.content
					}
				})
				uni.showToast({
					title:this.$t('message.txt92', ['设置成功']),
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1500)

			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 11rpx 30rpx 0;

		.box {
			border-bottom: 1px solid #E6E6E6;
			padding: 37rpx 0;
			display: flex;

			textarea {
				margin-left: 20rpx;
				flex: 1;
			}
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
