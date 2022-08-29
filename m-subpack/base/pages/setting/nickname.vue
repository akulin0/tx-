<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="昵称" />
		<!-- 表单提交 -->
		<view class="content">
			<view class="input-box">
				<view class="title">昵称</view>
				<input placeholder="请输入昵称" id="nickname" maxlength="10" @input="onInput" @blur="onInput" v-model="formData.nickname" />
			</view>
			<view class="input-error">{{ errors.nickname }} </view>
			<!-- button -->
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="保存" />
			<!-- button-end -->
		</view>
	</view>
</template>

<script>
	import {
		request,
		getUserInfo
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				//按钮是否可以点击
				disable: true,
				//提交formData
				formData: {
					nickname: "",
				},
				//错误信息
				errors: {
					nickname: "",
				},
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			async getData() {
				const {
					userName
				} = await getUserInfo();
				this.formData.nickname = userName;
			},
			async submit() {
				try {
					await request({
						url: "/base/User/BaseUpdateUser",
						method: "POST",
						data: {
							userName: this.formData.nickname,
						},
					});
					await getUserInfo(true);
					uni.navigateBack();
				} catch (error) {

				}


				this.$refs.button.hideLoading();
			},
			onInput(e) {
				this.verification(e.currentTarget.id, e.detail.value);
			},
			verification(name, value) {
				switch (name) {
					case "nickname":
						this.errors.nickname = "";
						if (!value) {
							this.errors.nickname = "请输入昵称";
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
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/m-subpack/base/scss/main.scss";

	.title {
		width: 120rpx;
		font-size: 28rpx;
		color: #000000;
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
</style>
