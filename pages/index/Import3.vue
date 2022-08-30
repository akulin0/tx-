<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title-width="500" :title="navTitle" style="border-bottom: 1px solid #E6E6E6;"
				:title-bold="true">
				<!-- <view class="navbar-right" slot="right">
					<view style="margin-right: 30rpx;" @click="scan()">
						<u-icon name="scan" size="38"></u-icon>
					</view>
				</view> -->
			</u-navbar>
			<view class="importbox">
				<view style="font-size: 26rpx;color: #333;margin-bottom: 20rpx;">
					{{$t('home.txt108',['直接复制粘贴Keystore文件内容至输入框。或者通过生成Keystore内容的二维码，扫描录入'])}}
				</view>
				<u-input v-model="content" type="textarea" height="160" :auto-height="true" :placeholder="placeholder"
					border-color="#E6E6E6" :border="true" style="background-color: #FAFAFA;" maxlength="500" />
				<view class="input-item">
					<view class="commonfont">{{$t('home.txt106',['钱包名称'])}} ({{title}})</view>
					<input type="text" :placeholder="placeholder1" placeholder-style="color:#B3B3B3;font-size:28rpx"
						class="i-items" v-model="name" />
					<view class="commonfont">{{$t('home.txt110',['Keystore密码'])}}</view>
					<input type="" :placeholder="placeholder2" placeholder-style="color:#B3B3B3;font-size:28rpx"
						class="i-items" v-model="password" password />
				</view>
				<view class="flex-align " style="height: 40rpx;margin: 200rpx 0 100rpx 0;font-size: 26rpx;">
					<image v-if="select" @click="select=false" style="width: 36rpx;height: 36rpx;min-width: 36rpx;"
						src="/static/biticon/select.png" mode=""></image>
					<image v-else @click="select=true" src="/static/biticon/noselect.png"
						style="width: 36rpx;height: 36rpx;min-width: 36rpx;" mode=""></image>
					<view style="margin-left: 10rpx;">
						<span>{{$t('home.txt37',['我已仔细阅读并同意'])}}</span>
						<span class="font-co" @click="topage('/pages/agreement?type=1')">{{$t('home.txt38',['服务条列'])}}</span>
						{{$t('home.txt39',['及'])}}
						<span class="font-co" @click="topage('/pages/agreement?type=2')">{{$t('home.txt40',['隐私条款'])}}</span>
					</view>

				</view>
				<base-button v-if="select" ref="button" @submit="submit()" :title="btnTitle" />
				<button v-else class="nosubmit">{{$t('ibinz.msg13',['导入钱包'])}}</button>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Md5 from "@/components/md5.js"
	import {clearWallet} from "@/decorator/wallet"
	export default {
		data() {
			return {
				select: false,
				activecolor: "",
				showpassType: this.$t('home.txt113', ['弱']),
				percents: 0,
				"content": "",
				"password": "",
				category: "", //钱包种类  1、比特币；2、以太坊；3、波场；4、Telegram X
				name: "", //钱包名称
				title: '', //钱包标题名称
				navTitle: this.$t('home.txt103', ['Keystore导入']),
				placeholder: this.$t('home.txt109', ['Keystore文本内容']),
				placeholder1: this.$t('home.txt31', ['请输入钱包名称']),
				placeholder2: this.$t('home.txt111', ['请输入钱包密码']),
				btnTitle: this.$t('ibinz.msg13', ['导入钱包']),
			}
		},
		onLoad(o) {
			console.log("keystore导入", o);
			this.category = o.category
			this.name = o.name
			this.title = o.title
			this.getWalletList()
		},
		
		methods: {
			//扫一扫
			scan() {
				uni.scanCode({
					success: function(res) {
						this.demo = res.result
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			topage(url){
        this.toPage(url)
			},
			//获取钱包列表
			async getWalletList() {
				let {
					data,
					errorMessage
				} = await request({
					url: '/wallet-get-all-wallet-list',
					method: 'get',
					params: {
						"category": this.category,
					}
				})
				let tip = (data.length + 1)
				this.name = this.name + '-' + tip
			},
			// 密码强度
			// changepass(e) {
			// 	let val = e.detail.value
			// 	let lv = 0
			// 	if (/\d/.test(val)) {
			// 		lv++;
			// 	}
			// 	if (/[a-z]/.test(val)) {
			// 		lv++;
			// 	}
			// 	if (/[A-Z]/.test(val)) {
			// 		lv++;
			// 	}
			// 	if (/\W/.test(val)) {
			// 		lv++;
			// 	}
			// 	switch (lv) {
			// 		case 1:
			// 			this.showpassType = '弱';
			// 			this.activecolor = '#fa3534';
			// 			this.percents = 33;
			// 			break;
			// 		case 2:
			// 			this.showpassType = '弱';
			// 			this.activecolor = '#fa3534';
			// 			this.percents = 33;
			// 			break;
			// 		case 3:
			// 			this.showpassType = '中';
			// 			this.activecolor = '#ff9900';
			// 			this.percents = 66;
			// 			break;
			// 		case 4:
			// 			this.showpassType = '强';
			// 			this.activecolor = '#19be6b';
			// 			this.percents = 100;
			// 			break;
			// 	}
			// },
			//导入
			async submit() {
				if (!this.content || !this.password) {
					uni.showToast({
						title: this.$t('home.txt130', ['请将信息补充完整']),
						icon: "none",
						duration: 1000
					})
					this.$refs.button.hideLoading()
					return
				}
				try {
					const {
						data,
						errorMessage
					} = await request({
						url: '/wallet-import-by-keystore',
						method: 'POST',
						data: {
							"alert": "1",
							"content": this.content,
							"password": this.password,
							"category": this.category,
							"type": 1,
							"name": this.name
						}
					})
					this.$refs.button.hideLoading()
					uni.showToast({
						title: this.$t('home.txt131', ['导入成功']),
						duration: 1000,
					})
					clearWallet();
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 1000);
				} catch (e) {
					this.$refs.button.hideLoading()
					uni.showToast({
						title: e.errorMessage,
						icon: "none"
					})
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.importbox {
		padding: 0 30rpx 60rpx 30rpx;
		margin-top: 50rpx;

		.nosubmit {
			width: 690rpx;
			height: 96rpx;
			
            background: #2DA5E1;
			box-shadow: 0px 2px 10px 0px rgba(23, 119, 226, 0.4);
			opacity: 0.5;
			border-radius: 100rpx;
			font-size: 30rpx;
			line-height: 96rpx;
			color: #fff;
		}

		.passType {
			position: absolute;
			right: 30rpx;
			font-size: 12rpx;

			.type {
				transform: scale(0.8);
				margin-right: 10rpx;
			}

			.linetype {
				width: 100rpx;
			}
		}

		.input-item {
			height: 178rpx;

			.i-items {
				height: 68rpx;
				border-bottom: 1px solid #E6E6E6;
			}
		}

		.font-co {
			font-size: 26rpx;
			font-weight: 500;
			color: #2DA5E1;
			margin: 0 10rpx;
		}

		.commonfont {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			margin: 30rpx 0;
		}

		.tip {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			text-align: right;
		}
	}
</style>
