<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="登录" :is-back="isMustLogin ==2" />
		<!-- logo -->
		<view class="logo">
			<image :src="Logo"></image>
		</view>
		<!-- 切换登录类型 -->
		<view class="tab">
			<view @click="changeLoginTypes(item)" class="item" v-for="item in LoginTypes" :class="{active:ActiveLoginTypes == item.type}">
				{{item.title}}
				<view class="line"></view>
			</view>
		</view>

		<!-- 表单提交 -->
		<view class="content">
			<view class="input-box">
				<input placeholder="请输入手机号" id="userName" maxlength="11" @input="onInput" @blur="onInput" v-model="formData.userName"
				 type="number" />
			</view>
			<view class="input-error">{{errors.userName}} </view>
			<view class="input-box" v-if="ActiveLoginTypes==1">
				<input placeholder="验证码" id="code" maxlength="4" @input="onInput" @blur="onInput" v-model="formData.code"
				 type="number" />
				 <view class="send" @click="sends">{{send}}</view>
			</view>
			<view class="input-error" v-if="ActiveLoginTypes==1">{{errors.code}} </view>
			<view class="input-box" v-if="ActiveLoginTypes==2">
				<!-- #ifndef H5 -->
				<input placeholder="请确认登录密码" id="password" @input="onInput" @blur="onInput" v-model="formData.password"
				 password />
				 <!-- #endif-->
				 <!-- #ifdef H5 -->
				<view @click="showinput('password')" style="font-size:16px;width:100%;">
					<view v-if="!passwordd" style="color:grey">请确认登录密码</view>
					<view v-if="passwordd">{{passwordd}}</view>
				</view>
				<!-- #endif-->
			</view>
			<view class="input-error" v-if="ActiveLoginTypes==2">{{errors.password}} </view>
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="登录" />
		
			<view class="link" style="margin-top: 41rpx;"> 
				<view>还没有账号，</view>
				<view class="main" @click="goTo('register')">去注册</view>
				<view style="flex:1"></view>
				<view @click="goTo('forgotPassword')">忘记密码？</view>
			</view>
			<!-- <view class="ThirdAppLogin">
				<view class="iconfont" style="color: #18B566;" @click="wxLogn">&#xe61b;</view>
			</view> -->
		</view>
		
		<!-- 服务协议隐私政策 -->
		<view class="agreement link">
			<span class="iconfont" @click="changeAgreement" :class="{main:isAgreement}">{{isAgreement?'&#xe631;':"&#xe633;"}}</span>
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
		LoginOut
	} from "@/m-subpack/base";
	
	import {
		Logo,
		LoginTypes,
		ActiveLoginTypes
	} from "@/config";

	export default {
		data() {
			return {
				isMustLogin:uni.getStorageSync("isMustLogin"),
				//从配置中拿logo
				Logo,
				LoginTypes,
				ActiveLoginTypes,
				btnOK: 0,
				timer: 60,
				send: '发送验证码',
				timer1: null,
				//按钮是否可以点击
				disable: true,
				//是否同意协议
				isAgreement: false,
				passwordd:"",
				//提交formData
				formData: {
					userName: "",
					password: "",
					code:"",
				},
				//错误信息
				errors: {
					userName: "",
					password: "",
					code:"",
				},
			};
		},
		methods: {
			showinput(type) {
				const _this = this;
				FL.showinput(_this.formData[type],type ,(data) => {
					console.log(data.type);
					_this[`${data.type}d`] = data.d;
					_this.formData[`${data.type}`] = data.value;
					_this.verification(data.type, data.value);
				});
			},
			goTo(url) {
				uni.navigateTo({
					url
				})
			},
			changeLoginTypes(item){
				this.ActiveLoginTypes = item.type;
				switch(this.ActiveLoginTypes){
					case 1:
					console.log(111);
						this.formData.password = "";
						this.errors.password = "";
					break;
					case 2:
					console.log(111);
						this.formData.code = "";
						this.errors.code = "";
					break;
				}
				this.disableChange();
			},
			changeAgreement() {
				this.isAgreement = !this.isAgreement;
			},
			async sends() {
				this.verification("userName", this.formData.userName);
				if (this.errors.userName) return;

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
							userPhone: this.formData.userName,
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
			async submit() {
				if (!this.isAgreement) {
					 uni.showToast({
						title: "请先同意《用户服务协议》和《隐私政策》",
						icon:'none'
					})
					this.$refs.button.hideLoading();
					return;
				}
				try {
					let _data = {
						userPhone:this.formData.userName,
						checkCode:this.formData.code,
						password:md5(this.formData.password),
					}
					if(this.ActiveLoginTypes ==1){
						delete _data.password
					}
					const {data} = await request({
						url:"/base/Login/UserLogin",
						method:"POST",
						data:_data
					});
					Login(data);
					console.log("data",data)
				} catch (error) {
					
				}
				this.$refs.button.hideLoading();
			},
			wxLogn(){
				uni.login({
						provider: "weixin",
						fail(e) {
							console.log(e);
						},
						success: async ({
							authResult
						}) => {
							console.log("authResult", authResult);
						
							const {
								data
							} = await request({
								url: "/base/Login/ThirdAppLogin",
								method:"POST",
								data: {
									accessToken: authResult.access_token,
									openId: authResult.openid,
									provider:"wechat"
									// unionid: authResult.openid,
								},
							});
							// this.getData(true)
							console.log("11111111",data);
							Login(data);
						},
				
					});
				
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
					case "password":
						this.errors.password = "";
						if (!value) {
							this.errors.password = "请输入密码"
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
				const formData = {...this.formData};
				switch(this.ActiveLoginTypes){
					case 1:
						delete formData.password;
					break;
					case 2:
						delete formData.code;
					break;
				}
				for (let o in formData) {
					console.log(!this.errors[o] && !formData[o]);
					this.disable = !!this.errors[o] || !formData[o];
					if (this.disable) break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/m-subpack/base/scss/main.scss";
	.tab{
		display: flex;
		height: 50rpx;
		margin-bottom: 50rpx;
		padding: 0 42rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #B3B3B3;
		.item{
			flex:1;
		}
		
		.item.active{
			color: #333333;
			position: relative;
			.line{
				position: absolute;
				bottom: -10rpx;
				width: 20%;
				height: 5rpx;
				background: #1B1B1B;
				border-radius: 3px;
			}
		}
		
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
		flex: 1;
	}
	
	.send{
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
	
	.ThirdAppLogin{
		display: flex;
		align-items: center;
		justify-content: center;
		.iconfont{
			font-size: 36px;
		}
		
	}
</style>
