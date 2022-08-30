<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="注册" />
		<!-- 表单提交 -->
		<view class="content">
			<view class="input-box">
				<input placeholder="请输入手机号" id="userPhone" maxlength="11" @input="onInput" @blur="onInput" v-model="formData.userPhone"
				 type="digit" />
			</view>
			<view class="input-error">{{ errors.userPhone }} </view>
			<view class="input-box">
				<input placeholder="验证码" id="code" maxlength="4" @input="onInput" @blur="onInput" v-model="formData.code" type="digit" />
				<view class="send" @click="sends">{{send}}</view>
			</view>
			<view class="input-error">{{ errors.code }} </view>

			<!-- 输入框 -->
			<view class="input-box">
				<!-- #ifndef H5 -->
				<input placeholder="请设置登录密码" id="password" @input="onInput" @blur="onInput" v-model="formData.password" password />
				<!-- #endif-->
				<!-- #ifdef H5 -->
				<view @click="showinput('password')" style="font-size: 16px; width: 100%">
					<view v-if="!passwordd" style="color: grey">请确认登录密码</view>
					<view v-if="passwordd">{{ passwordd }}</view>
				</view>
				<!-- #endif-->
			</view>
			<view class="input-error">{{ errors.password }} </view>
			<!-- 输入框-end -->

			<view class="input-box">
				<!-- #ifndef H5 -->
				<input placeholder="请确认登录密码" id="aginPassword" @input="onInput" @blur="onInput" v-model="formData.aginPassword"
				 password />
				<!-- #endif-->
				<!-- #ifdef H5 -->
				<view @click="showinput('aginPassword')" style="font-size: 16px; width: 100%">
					<view v-if="!aginPasswordd" style="color: grey">请确认登录密码</view>
					<view v-if="aginPasswordd">{{ aginPasswordd }}</view>
				</view>
				<!-- #endif-->
			</view>
			<view class="input-error">{{ errors.aginPassword }} </view>

			<view class="input-box">

				<input placeholder="请输入邀请码（非必填）" id="inviteCode" @input="onInput" @blur="onInput" v-model="inviteCode" />

			</view>
			<view class="input-error">{{ inviteCodeErrors }} </view>
			<!-- button -->
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="注册" />
			<!-- button-end -->
			<view class="link" style="margin-top: 41rpx">
				<view>已有账号，</view>
				<view class="main" @click="goTo('Login')">去登录</view>
				<view style="flex: 1"></view>
			</view>
		</view>
		<!-- 服务协议隐私政策 -->
		<view class="agreement link">
			<span class="iconfont" @click="changeAgreement" :class="{ main: isAgreement }">{{ isAgreement ? "&#xe631;" : "&#xe633;" }}</span>
			<view>我已经阅读并同意</view>
			<view class="main" @click="goTo('agreement?type=1')">《用户服务协议》</view>
			<view>和</view>
			<view class="main" @click="goTo('agreement?type=2')">《隐私政策》</view>
		</view>
	</view>
</template>

<script>
	import {
		mobileVar,
		sleep,
		request,
		md5,
		Login,
		LoginOut,
	} from "@/m-subpack/base";

	export default {
		data() {
			return {
				aginPasswordd: "",
				passwordd: "",
				time: 0,
				btnOK: 0,
				timer: 60,
				send: '发送验证码',
				timer1: null,
				//按钮是否可以点击
				disable: true,
				//是否同意协议
				isAgreement: false,
				inviteCode: "",
				inviteCodeErrors: "",
				//提交formData
				formData: {
					userPhone: "",
					password: "",
					code: "",
					aginPassword: "",
				},
				//错误信息
				errors: {
					userPhone: "",
					password: "",
					code: "",
					aginPassword: "",
				},
			};
		},
		methods: {
			showinput(type) {
				const _this = this;
				FL.showinput(_this.formData[type], type, (data) => {
					console.log(data.type);
					_this[`${data.type}d`] = data.d;
					_this.formData[`${data.type}`] = data.value;
					_this.verification(data.type, data.value);
				});
			},
			async sends() {
				this.verification("userPhone", this.formData.userPhone);
				if (this.errors.userPhone) return;

				if (this.btnOK == 0) {
					//改版变量
					this.btnOK = 1;
					this.sendCodes()
					//此处写你要做的事情，操作DOM，发送ajax请求等等。

					//3秒过后可以再次点击
					setTimeout(() => {
						this.btnOK = 0
					}, 1000);
				} else {
					uni.showToast({
						title: '请勿频繁点击！',
						icon: 'none'
					})
				}
			},
			// 发送验证码
			async sendCodes() {
				var _this = this;
				//debugger
				if (_this.timer == 60) {
					//调用接口
					await request({
						url: "/base/Login/SendCode",
						method: "POST",
						params: {
							userPhone: this.formData.userPhone,
						}
					})
					uni.showToast({
						title: '验证码已发送',
						icon: 'none'
					});
					// debugger
					this.timer1 = setInterval(() => {
						this.timer--;
						this.send = +this.timer + 's后重新获取';

						if (this.timer == 0) {
							this.send = '发送验证码';
							clearInterval(this.timer1);
							this.timer = 60;
							_this.btnOK = 0
						}
					}, 1000);
					return;
				}
				return;
			},
			goTo(url) {
				if (url == "Login") {
					return uni.navigateBack({
						delta: 1,
					});
				}

				// debugger
        this.toPage(url)
			},

			changeAgreement() {
				this.isAgreement = !this.isAgreement;
			},
			async downLoad() {
				await sleep(1000);
				if (this.time > 0) this.time--;
				this.downLoad();
			},
			async submit() {
				// debugger
				if (!this.isAgreement) {
					uni.showToast({
						title: "请先同意《用户服务协议》和《隐私政策》",
						icon: "none",
					});
					this.$refs.button.hideLoading();
					return;
				}
				try {
					const {
						dara
					} = await request({
						url: "/base/Login/AppReg",
						method: "POST",
						data: {
							userPhone: this.formData.userPhone,
							shareCode: this.inviteCode,
							checkCode: this.formData.code,
							password: md5(this.formData.password),
						},
					});
					uni.setStorageSync("isMustLogin",1);
					Login(dara);
				} catch (error) {
					console.error(error);
				}
				this.$refs.button.hideLoading();
			},
			onInput(e) {
				this.verification(e.currentTarget.id, e.detail.value);
			},
			verification(name, value) {
				switch (name) {
					case "userPhone":
						this.errors.userPhone = "";
						if (!value) {
							this.errors.userPhone = "请输入手机号";
						} else if (!mobileVar(value)) {
							this.errors.userPhone = "请输入正确的手机号";
						}
						break;
					case "password":
						this.errors.password = "";
						if (!value) {
							this.errors.password = "请设置登录密码";
						}
						break;
					case "aginPassword":
						this.errors.aginPassword = "";
						if (!value) {
							this.errors.aginPassword = "请输入密码";
						} else if (value != this.formData.password) {
							this.errors.aginPassword = "两次输入密码不一致";
						}
						break;
					case "code":
						this.errors.code = "";
						if (!value) {
							this.errors.code = "请输入验证码";
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

	.tab {
		display: flex;
		height: 50rpx;
		margin-bottom: 50rpx;
		padding: 0 42rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #b3b3b3;

		.item {
			flex: 1;
		}

		.item.active {
			color: #333333;
			position: relative;

			.line {
				position: absolute;
				bottom: -10rpx;
				width: 20%;
				height: 5rpx;
				background: #1b1b1b;
				border-radius: 3px;
			}
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
</style>
