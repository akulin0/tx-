<template>
	<view class="box">
		<u-navbar :is-back="true" :custom-back="close"> </u-navbar>
		<view style="padding: 0 50rpx">
			<view class="p-title">欢迎登录</view>
			<view class="p-titles">{{ appName }}</view>
			<image class="bgimg" src="/static/loginbg.png" mode=""></image>
			<!-- 表单 -->

			<u-button :loading="isLoading" class="weixin" @click="wxLogin">
				<image src="/static/weixinlogin.png" style="width: 68rpx; height: 54rpx; margin-right: 14rpx" mode="">
				</image>
				<span>微信登录</span>
			</u-button>
			<base-Login-footer ref="footer" type="telLogn" />
		</view>
	</view>
</template>

<script>
	import {
		Logo,
		appName,
		wxappAppId
	} from "@/config";
	import {
		md5,
		request,
		sleep
	} from "@/m-subpack/base";
	import {
		Login
	} from "@/m-common/common";
	export default {
		data() {
			return {
				isLoading: false,
				Logo,
				appName,
				show: false,
				timer: 60,
				send: "发送验证码",
				token: "",
				rules: {
					name: {
						require: "请输入账号",
						mobile: "账号格式不正确",
					},
					code: {
						require: "请输入验证码",
					},
				},
				formData: {
					name: "",
					code: "",
				},
			};
		},
		methods: {
			close() {
				uni.$emit("__login", "");
			},
			async wxLogin() {
				this.isLoading = true;
				try {
					console.log("----------");
					const code = await FL.sendWeChatAuth();
					console.log("---------- code", code);
					const img = getCanvasFp();
					const ip = returnCitySN;
					this.uuid = md5(img + JSON.stringify(ip));
					console.log("----------uuid", this.uuid);
					let openinstall = {}
					try {
						openinstall = await FL.openinstall();
						openinstall = openinstall || {}
					} catch (e) {
						openinstall = {}
					}
					console.log("----------");
					const _formData = {
						provider: "wechat",
						appId: wxappAppId,
						code: code,
						shareCode: openinstall.code,
						installCode: this.uuid,
					}
					console.log("----------", JSON.stringify(_formData));
					const {
						data
					} = await request({
						url: "/base/Login/LoginV2",
						method: "POST",
						data: _formData,
					});

					if (!data.token) {
						uni.$emit("__login", "code", {
							shareCode: openinstall.code,
							code: code,
						});
					} else {
						Login(data.token);
						uni.$emit("__login", "");
					}
					console.log(data);
				} catch (e) {
					//TODO handle the exception
				}
				this.isLoading = false;

			},
		},
	};
</script>
<style scoped lang="scss">
	.weixin {
		width: 650rpx;
		height: 100rpx;
		background: #50b849;
		border-radius: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 36rpx;
		margin-top: 280rpx;
		margin-bottom: 180rpx;
	}

	.p-title {
		font-size: 60rpx;
		margin-top: 108rpx;
		font-weight: 600;
		color: #000000;
	}

	.bgimg {
		width: 92rpx;
		height: 204rpx;
		position: absolute;
		right: 0;
		top: 128rpx;
	}

	.p-titles {
		font-size: 40rpx;
		font-weight: 500;
		color: #000000;
		margin-top: 34rpx;
	}

	.box {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #fff;
		z-index: 99;
	}
</style>
