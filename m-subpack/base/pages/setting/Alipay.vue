<template>
	<view class="login page">
		<u-navbar is-fixed backgroundColor="#fff" title="绑定支付宝" />
		<!-- 表单提交 -->
		<view class="content" >
			<view class="bind">支付宝账户</view>
			<view class="input-box">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" id="nickname" maxlength="11" @input="onInput" @blur="onInput" v-model="formData.nickname"
				 type="text" />
			</view>
			<view class="input-error">{{errors.nickname}} </view>
			<view class="input-box">
				<view class="title">账户</view>
				<input placeholder="请输入账户" id="certificate"  @input="onInput" @blur="onInput" v-model="formData.certificate"
				 type="text" />
			</view>
			<view class="input-error">{{errors.certificate}} </view>
			<view class="info">注：请仔细核对收款姓名和账户，若填写错误提现款项将 无法追回</view>
			<!-- button -->
			<base-button ref="button" class="base-button" @submit="submit" :disable="disable" title="确定" />
			<!-- button-end -->
			
		</view>
		
	</view>
</template>

<script>
	import {sleep,request,getUserInfo,navigateBack} from "@/m-subpack/base"
	export default {
		data() {
			return {
				//按钮是否可以点击
				disable: true,
				//提交formData
				formData: {
					nickname: "",
					certificate:"",
				},
				//错误信息
				errors: {
					nickname: "",
					certificate:"",
				},
				
			};
		},
		methods: {
			
			
			
			async submit() {
				
				await sleep(1000);
				this.$refs.button.hideLoading();
				let {
					errorCode
				} = await request({
					url: "/base/WithdrawAccount/Base_withdrawAccount",
					method: "POST",
					data: {
						"type": 1,//账号类型，0=微信，1=支付宝，2=银行卡
						"payAccount": this.formData.certificate,//支付账号、银行卡号
						"accountName": this.formData.nickname,//账号用户姓名
						// "bankName": "string",//银行名称
						// "subBankName": "string",//支行名称
						"state": 1 //状态，0=禁用，1=启用，255=删除
					}
				})
				if(errorCode==0) {
					uni.showToast({
						title: this.$t('ibinz.msg64',['提交成功']),
						duration:1000,
						icon:'none',
						async success() {
							await sleep(1000)
							await getUserInfo(true);
							navigateBack()
						}
					})
				}
			},
			onInput(e) {
				this.verification(e.currentTarget.id, e.detail.value);

			},
			verification(name, value) {
				switch (name) {
					case "nickname":
						this.errors.nickname = "";
						if (!value) {
							this.errors.nickname = "请输入姓名"
						} 
						break;
					case "certificate":
						this.errors.certificate = "";
						if (!value) {
							this.errors.certificate = "请输入账户"
						} 
						break;	
					
					
				}
				this.disableChange();

			},
			disableChange() {
				const formData = {...this.formData};
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
	
	.title{
		width: 140rpx;
		font-size: 28rpx;
		color: #000000;
	}
	
	.button{
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
	
	.info{
		font-size: 24rpx;
		color: #F32F34;
		line-height: 38rpx;
	}
	.bind{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 20rpx;
	}
</style>
