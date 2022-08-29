<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="上级邀请码" />
		<!-- 表单提交 -->
		<view class="content">
			<view class="bind">*手机号/邀请码只能填一次，保存后不能修改</view>
			<view class="input-box">
				<!-- <view class="title">上级邀请码或手机号</view> -->
				<input placeholder="请输入上级邀请码或手机号" id="nickname" maxlength="11" @change="onInput" @input="onInput" @blur="onInput"
				 v-model="formData.nickname" />
			</view>
			<view class="input-error">{{errors.nickname}} </view>

			<!-- button -->
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="保存" />
			<!-- button-end -->

			<u-popup v-model="show" mode="center" border-radius="14">
				<view class="comm">
					<view class="header">请确定邀请人</view>

					<image :src="userHead"></image>
					<view class="msg">{{userName}}</view>
					<view class="btn">
						<view @click="hide">取消</view>
						<view class="sub" @click="sub">确认</view>
					</view>
				</view>
			</u-popup>

		</view>

	</view>
</template>

<script>
	import {
		sleep,
		request,
		getUserInfo,
		navigateBack
	} from "@/m-subpack/base"
	import {

		userHead
	} from "@/config";
	export default {
		data() {
			return {
				//按钮是否可以点击
				show: false,
				userName: "",
				disable: true,
				userHead,
				//提交formData
				formData: {
					nickname: "",
					// certificate:"",
				},
				//错误信息
				errors: {
					nickname: "",
					// certificate:"",
				},

			};
		},
		onLoad(option) {
	
			this.query = option ||{};
		},
		methods: {

			async sub() {
				// await sleep(1000);
				this.show = false;
				this.$refs.button.hideLoading();
				let {
					errorMessage
				} = await request({
					url: "/base/User/AddInviteParent",
					method: "POST",
					data: {
						"n": this.formData.nickname
					}
				})
				const _this = this;
				uni.showToast({
					title: this.$t('ibinz.msg64',['提交成功']),
					duration: 1000,
					icon: 'none',
					async success() {
						await sleep(1000)
						await getUserInfo(true)
						navigateBack()
						FL.doTask(_this.query.taskId);
					}
				})
				
			},

			async submit() {
				this.$refs.button.hideLoading();
				try {
					let {
						data
					} = await request({
						url: "/base/User/GetMyParentInfo",

						params: {
							"shareCode": this.formData.nickname
						}
					})
					this.userName = data.userName;
					this.userHead = data.avatar || userHead;

					this.show = true;
				} catch (e) {
					//TODO handle the exception
				}



			},
			hide() {
				this.show = false;
			},
			onInput(e) {
				this.verification(e.currentTarget.id, e.detail.value);

			},
			verification(name, value) {
				switch (name) {
					case "nickname":
						this.errors.nickname = "";
						if (!value) {
							this.errors.nickname = "请输入上级邀请码或手机号"
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

	.comm {
		width: 550rpx;
		text-align: center;
		padding-top: 42rpx;

		.header {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}

		.btn {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			border-top: 1px solid #CCCCCC;

			view {
				flex: 1;
				height: 85rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
			}

			.sub {
				border-left: 1px solid #CCCCCC;
				color: #FA7528;
			}
		}

		.msg {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;

		}

		image {
			margin-top: 56rpx;
			width: 102rpx;
			height: 102rpx;
			border-radius: 50%;
		}
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
</style>
