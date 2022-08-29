<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="更换手机号" />

		<!-- 表单提交 -->
		<view class="content">
			<view class="bind">当前绑定手机：{{mobile}}</view>
			<view class="input-box">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" id="userName" maxlength="11" @input="onInput" @blur="onInput"
					v-model="formData.userName" type="number" />
			</view>
			<view class="input-error">{{errors.userName}} </view>
			<view class="input-box">
				<view class="title">验证码</view>
				<input placeholder="验证码" id="code" maxlength="4" @input="onInput" @blur="onInput"
					v-model="formData.code" type="number" />
				<view class="send" @click="sends">{{send}}</view>
			</view>
			<view class="input-error">{{errors.code}} </view>
			<!-- button -->
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="确认" />
			<!-- button-end -->

		</view>

	</view>
</template>

<script>
	import {
		request,
		getUserInfo,
		// LoginOut
	} from "@/m-subpack/base";
	import {LoginOut} from "@/m-common/common"
	import {
		mobileVar,
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				mobile: "",
				//按钮是否可以点击
				disable: true,
				time: 0,
				btnOK: 0,
				timer: 60,
				send: "发送验证码",
				//提交formData
				formData: {
					userName: "",

					code: "",

				},
				//错误信息
				errors: {
					userName: "",
					code: "",
				},

			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			async getData() {
				const {
					userPhone
				} = await getUserInfo();
				this.mobile = userPhone;
			},

			// 发送验证码
			async sendCodes() {
				var _this = this;
				if (_this.timer == 60) {
					//调用接口
					uni.showToast({
						title:"发送短信中...",
						icon:"none",
						duration:2000
					})
					
					let res = await request({
						url: "/base/Login/SendCode",
						method: "POST",
						params: {
							userPhone: _this.formData.userName,
						},
					});
					if (res.errorMessage == 'ok') {
						uni.hideToast()
						this.btnOK = 3;
						this.timer1 = setInterval(() => {
							this.timer--;
							this.send = +this.timer + "s后重新获取";
							if (this.timer == 0) {
								this.send = "发送验证码";
								clearInterval(this.timer1);
								this.timer = 60;
								this.btnOK = 0;
							}
						}, 1000);
					}
					return;
				}
				return;
			},
			sends() {
				this.verification("userName", this.formData.userName);
				if (this.errors.userName) return;
				if (this.btnOK == 0) {
					//改版变量
					this.btnOK = 1;
					this.sendCodes()
				} else if(this.btnOK==3) {
					uni.showToast({
						title: '验证码已发送，注意接收！',
						icon: 'none'
					})
				}else {
					uni.showToast({
						title: '请勿频繁点击！',
						icon: 'none'
					})
				}
			},
			async submit() {
				if (this.disable) return;
				try {
					const {
						dara
					} = await request({
						url: "/base/User/BaseEditPhone",
						method: "POST",
						data: {
							userPhone: this.formData.userName,
							checkCode: this.formData.code,
						}
					});
					LoginOut();
					uni.switchTab({
						url:"/pages/index/index2"
					})
				} catch (error) {
					console.error(error)
				}
				this.$refs.button.hideLoading();
			},
			onInput(e) {
				this.verification(e.currentTarget.id, e.detail.value);

			},
			verification(name, value) {
				switch (name) {
					case "userName":
						this.errors.userName = "";
						if (!value) {
							this.errors.userName = "请输入手机号"
						} else if (!mobileVar(value)) {
							this.errors.userName = "请输入正确的手机号"
						}
						break;
					case "code":
						this.errors.code = "";
						if (!value) {
							this.errors.code = "请输入验证码"
						}
						break;
				}
				this.disableChange();

			},
			disableChange() {
				const formData = {
					...this.formData
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

	.bind {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 70rpx;
	}
</style>
