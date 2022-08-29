<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="实名认证" />
		<!-- 表单提交 -->
		<view class="content">
			<view class="bind">为了您的账户安全，请填写真实的个人资料</view>
			<view class="input-box">
				<view class="title">真实姓名</view>
				<input placeholder="请输入真实姓名" id="nickname" maxlength="11" @input="onInput" @blur="onInput" v-model="formData.nickname" />
			</view>
			<view class="input-error">{{errors.nickname}} </view>
			<view class="input-box">
				<view class="title">证件号码</view>
				<input placeholder="请输入证件号码" id="certificate" maxlength="18" @input="onInput" @blur="onInput" v-model="formData.certificate" type="idcard" />
			</view>
			<view class="input-error">{{errors.certificate}} </view>
			<view class="info">注：若同一个人有多个账号，根据规定，实名信 息只能绑定一 个账号，即一个实名信息只能认证一次，不能使用第二次</view>
			<!-- button -->
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="提交" />
			<!-- button-end -->

		</view>

	</view>
</template>

<script>
	import {
		isCardNo,
		request,
		getUserInfo,
		navigateBack
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				//按钮是否可以点击
				disable: true,
				//提交formData
				formData: {
					nickname: "",
					certificate: "",
				},
				//错误信息
				errors: {
					nickname: "",
					certificate: "",
				},

			};
		},
		onLoad(option) {
			this.getData();
			this.query = option ||{};
		},
		methods: {
			async getData() {
				const {
					trueName,
					idCard
				} = await getUserInfo();
				this.formData.nickname = trueName;
				this.formData.certificate = idCard;
			},
			async submit() {

				try {
					await request({
						url: "/base/User/BaseCardCertification",
						method: "POST",
						data: {
							"trueName": this.formData.nickname,
							"idCard": this.formData.certificate,
						},
					});
					await getUserInfo(true);
					
					navigateBack();
					if(this.query.taskId)
					FL.doTask(this.query.taskId)
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
							this.errors.nickname = "请输入真实姓名"
						}
						break;
					case "certificate":
						this.errors.certificate = "";
						if (!value) {
							this.errors.certificate = "请输入证件号码"
						} else if (!isCardNo(value)) {
							this.errors.certificate = "请输入正确的证件号码"
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

	.info {
		font-size: 24rpx;
		color: #999999;
		line-height: 38rpx;
	}

	.bind {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 70rpx;
	}
</style>
