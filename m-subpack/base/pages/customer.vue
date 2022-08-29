<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="意见反馈" />
		<!-- 表单提交 -->
		<view class="content">
			<!-- <view class="bind">客服电话</view>

			<view class="title" @click="customerCall">
				{{customer}}
				<u-icon class="sub" size="26" name="arrow-right" />
			</view> -->
			<view class="bind" style="margin-top: 70rpx;">问题和意见</view>
			<textarea class="textarea" placeholder="请输入问题和意见" id="certificate" maxlength="200" @input="onInput" @blur="onInput" v-model="formData.certificate"
			  />
			<view class="input-error">{{errors.certificate}} </view>
			<!-- button -->
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="提交" />
			<!-- button-end -->

		</view>

	</view>
</template>

<script>
	import {request,sleep} from "@/m-subpack/base"
	import {customer} from "@/config"
	export default {
		data() {
			return {
				customer,
				//按钮是否可以点击
				disable: true,
				//提交formData
				formData: {
					certificate: "",
				},
				//错误信息
				errors: {
					certificate: "",
				},

			};
		},
		methods: {


				
			async submit() {

				try {
					const {dara} = await request({
						url:"/base/User/Base_AddFeedBack",
						method:"POST",
						data:{
							backContent:this.formData.certificate,
						}
					});
					uni.showToast({
						title: this.$t('ibinz.msg64',['提交成功']),
						icon: "none",
						duration:1000
					});
					await sleep(1000)
					uni.navigateBack()
					
				} catch (error) {
					console.error(error)
				}
				this.$refs.button.hideLoading();
			},
			async customerCall(){
				uni.makePhoneCall({
					phoneNumber:customer
				})
			},
			onInput(e) {
				this.verification(e.currentTarget.id, e.detail.value);

			},
			verification(name, value) {
				switch (name) {
					
					case "certificate":
						this.errors.certificate = "";
						if (!value) {
							this.errors.certificate = "请输入意见反馈"
						}
						break;


				}
				this.disableChange();

			},
			disableChange() {
				const formData = { ...this.formData
				};
				for (let o in formData) {
					this.disable = !!this.errors[o] || !formData[o];
					if (this.disable) break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/m-subpack/base/scss/main.scss";

	.title {
		width: 140rpx;
		font-size: 28rpx;
		color: #999999;
		display: flex;
		align-items: center;
	}

	.button {
		margin-top: 80rpx;
	}

	.login {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		// padding:28rpx 45rpx 50rpx;

		.logo {
			display: flex;
			justify-content: center;
			margin: 28rpx 0 59rpx;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
			}
		}
	}

	.content {
		margin-top: 28rpx;
		flex: 1;
	}

	.send {
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}

	.link {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 50rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #808080;

		span {
			padding: 20rpx;
		}
	}

	.main {
		color: $main-color;
	}

	.info {
		font-size: 24rpx;
		color: #F32F34;
		line-height: 38rpx;
	}

	.bind {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.textarea{
		padding: 26rpx 30rpx;
		width: 100%;
		background: #FAFAFA;
		border: 1px solid #E6E6E6;
		box-sizing: border-box;
	}
</style>
