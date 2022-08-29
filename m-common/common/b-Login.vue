<template>
	<view class="box">
		<view @click="subClick">
			<slot></slot>
		</view>
		<u-popup v-model="showPhone" mode="center" border-radius="14" width="420rpx">
			<view class="box">
				<view class="img">
					<image :src="Logo">
				</view>
				<view class="msg">申请获得您的公开信息</view>
				<view class="msg">（包含手机号等）</view>
				<button class="User-buttom" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">确认授权</button>
			</view>
		</u-popup>
		<u-popup v-model="show" mode="center" border-radius="14" width="420rpx">
			<view class="box">
				<view class="img">
					<image :src="Logo">
				</view>
				<view class="msg">申请获得您的公开信息</view>
				<view class="msg">（包含头像、昵称等）</view>
				<button class="User-buttom" open-type="getUserInfo" @getuserinfo="getUserInfo">确认授权</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		request,
		Login,
		isLogin
	} from "@/m-subpack/base";
	import {
		Logo
	} from "@/config"
	export default {
		props: ["title", "disable", "submit"],
		data() {
			return {
				isLogin:isLogin(),
				Logo,
				showPhone:false,
				show: false,
				formData: {},
			};
		},
		methods: {
			onGetPhoneNumber(e) {
				this.showPhone = false;
				// if(isLogin()) return;
				// debugger
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
				this.show = true;


				this.formData = {
					...this.formData,
					"encryptedDataByPhone": e.detail.encryptedData,
					"ivByPhone": e.detail.iv,
				};

			},
			async getUserInfo(e) {
				//获取微信手机号

				this.show = false;
				try {
					const {
						data
					} = await request({
						url: "/base/Login/WeixinReg",
						method: "POST",
						data: {
							...this.formData,
							"encryptedData": e.detail.encryptedData,
							"iv": e.detail.iv,
							// code,
						}

					})
					Login(data);
					this.$emit("submit");
				} catch (e) {
					const [err, {
						code
					}] = await uni.login({
						provider: "weixin",

					});
					this.formData.code = code;
				}

				
				// console.log(token);
			},
			subClick() {
				if(!isLogin()){
					// #ifdef  MP-WEIXIN
					const _this = this;
					uni.login({
						provider: "weixin",
						success({
							code
						}) {
							_this.formData.code = code;
						}
					});
					this.showPhone = true;
					// #endif 
					// #ifndef  MP-WEIXIN
					this.$emit("submit");
					// #endif 
				}else{
					this.$emit("submit");
				}
				
				
			},
		},
	};
</script>

<style lang="scss" scoped>
	.box {
		position: relative;
		align-items: center;
		display: inline-block;
		width: 100%;
	}

	.phone-button {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0;
		z-index: 222;
		background: none;
		border: none;

		&::after {
			border: 0;
		}
	}

	.User-buttom {
		background: $button-background;
		border-radius: 100rpx;
		margin: 30rpx;
		color: #fff;
		font-size: 32rpx;

		&::after {
			border: 0;
		}
	}

	.msg {
		text-align: center;
		color: #333;
		font-size: 32rpx;
		padding: 0 30rpx;
	}

	.box {
		.img {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 50rpx;
			padding-bottom: 30rpx;

			image {
				width: 120rpx;
				height: 120rpx;
			}
		}


	}
</style>
