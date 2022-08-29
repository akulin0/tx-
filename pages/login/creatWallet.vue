<!-- 创建钱包 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title="navTitle" style="border-bottom: 1px solid #E6E6E6;" :title-bold="true"></u-navbar>
			<view style="padding: 0 30rpx;">
				<view class="input-item">
					<view class="commonfont">{{$t('home.txt30',['钱包名称'])}} ( {{$t('home.txt26',['Telegram Pocket'])}} )</view>
					<input type="text" :placeholder="placeholder" placeholder-style="color:#B3B3B3;" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'" class="i-items" v-model="data.name" />
				</view>
				<view class="input-item" style="height: 246rpx;position: relative;">
					<!-- 密码强度 -->
					<view class="passType flex-align" v-if="data.pass">
						<view class="type">{{showpassType}}</view>
						<u-line-progress class="linetype" :percent="percents" height="14" :show-percent='false' :round="true"
						 :active-color="activecolor"></u-line-progress>
					</view>
					<view class="commonfont">{{$t('home.txt32',['设置密码'])}}</view>
					<input type="password" style="height: 68rpx;margin-top: 32rpx;" @input="changepass" :placeholder="placeholder1"
					 placeholder-style="color:#B3B3B3;" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'" class="i-items" v-model="data.pass" />
					<input type="password" style="height: 68rpx;margin-top: 32rpx;" :placeholder="placeholder2" placeholder-style="color:#B3B3B3;"
					 class="i-items" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'" v-model="data.repass" />
				</view>
				<view class="input-item">
					<view class="commonfont">{{$t('home.txt36',['提示信息'])}}</view>
					<input type="text" :placeholder="placeholder3" placeholder-style="color:#B3B3B3;" class="i-items"
					 v-model="data.demo" :placeholder-class="$i18n.locale=='en-US'?'font-m':'font-body'"/>
				</view>
				<base-button v-if="data.name && data.pass && data.repass" ref="button" @submit="submit()" :title="navTitle" />
				<button v-else class="nosubmit"><view class="tex">{{$t('home.txt15',['创建钱包'])}}</view></button>
				
				<view class="flex-align" style="height: 40rpx;margin: 100rpx 0;font-size: 24rpx;" >
					<view  class="yuan">
						<image v-if="select" @click="select=false" style="width: 24rpx;height: 24rpx;min-width: 24rpx;" src="/static/biticon/select.png"
						 mode=""></image>
						<image v-else @click="select=true" src="/static/biticon/noselect.png" style="width: 24rpx;height: 24rpx;min-width: 24rpx;" mode=""></image>
					</view>
			
					<view>
						<span style="margin-left: 10rpx;">{{$t('home.txt37',['我已仔细阅读并同意'])}}</span><span class="font-co" @click="topage('/pages/agreement?type=1')">《{{$t('home.txt38',['服务条列'])}}》</span>{{$t('home.txt39',['及'])}}<span class="font-co" @click="topage('/pages/agreement?type=2')">《{{$t('home.txt40',['隐私条款'])}}》</span>
					</view>
					
				</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	
	// import {
	// 	lightwallet
	// } from "@/eth-wallet-js-master/dist/lightwallet.min.js";
	// import {
	// 	web3
	// } from "@/eth-wallet-js-master/dist/web3.min.js";
	// import {
	// 	eth-wallet-js
	// } from "@/eth-wallet-js-master/dist/eth-wallet-js.js";
	var ethers = require('ethers');
	import {
		request
	} from "@/m-subpack/base";

	import Md5 from "@/components/md5.js";
	export default {
		data() {
			return {
				select: false,
				show: false,
				title: '',
				activecolor: "",
				showpassType: this.$t('home.txt113',['弱']),
				percents: 0,
				data: {
					pass: '',
					name: "",
					repass: '',
					demo: "",			
				},
				navTitle:this.$t('home.txt15',['创建钱包']),
				// placeholder:this.$t('home.txt31',['请输入钱包名称']),
				placeholder1:this.$t('ibinz.msg32'),
				placeholder2:this.$t('home.txt33',['请再次输入密码']),
				placeholder3:this.$t('home.txt35',['请输入提示信息（可不填）']),
				
			}
		},
		onLoad(o) {
			this.data.name = o.name
			this.title = o.title
		},
		methods: {
			// 密码强度
			changepass(e) {
				let val = e.detail.value
				let lv = 0
				if (/\d/.test(val)) {
					lv++;
				}
				if (/[a-z]/.test(val)) {
					lv++;
				}
				if (/[A-Z]/.test(val)) {
					lv++;
				}
				if (/\W/.test(val)) {
					lv++;
				}
				switch (lv) {
					case 1:
						this.showpassType = this.$t('home.txt113',['弱']);
						this.activecolor = '#fa3534';
						this.percents = 33;
						break;
					case 2:
						this.showpassType = this.$t('home.txt113',['弱']);
						this.activecolor = '#fa3534';
						this.percents = 33;
						break;
					case 3:
						this.showpassType = this.$t('login.msg19',['中']);
						this.activecolor = '#ff9900';
						this.percents = 66;
						break;
					case 4:
						this.showpassType = this.$t('login.msg20',['强']);
						this.activecolor = '#19be6b';
						this.percents = 100;
						break;
				}
			},
			//页面跳转
			async submit() {
				if(!this.select){
					uni.showToast({
						title:this.$t('login.msg35',['请先阅读并同意《用户服务协议》和《隐私政策》']),
						icon:'none'
					})
					this.$refs.button.hideLoading()
				}else if(this.data.pass.length<8 ||  this.data.repass.length<8){
					uni.showToast({
						title:  this.$t('ibinz.msg32', ['请输入密码，至少8位']),
						duration: 1000,
						icon: 'none'
					})
					this.$refs.button.hideLoading()
				}else{
					// try{
						// const {
						// 	data
						// } = await request({
						// 	url: '/reg-by-word-create-wallet',
						// 	method: 'post',
						// 	data: {
						// 		"alert": this.data.demo,
						// 		"name":  this.data.name,
						// 		"password":this.data.pass,
						// 		"rpassword": this.data.repass,
								
						// 	}
						// })
					
						var wallet = ethers.Wallet.createRandom();
						var address = wallet.address;
						var path = wallet.path;
						var mnemonic = wallet.mnemonic;
						var privateKey = wallet.privateKey;
						// console.log("私钥", privateKey)
						// console.log("钱包地址：",address)
						// console.log("钱包：",wallet)
						// console.log("助记词：",mnemonic)
						// console.log("path",  privateKey)
						uni.setStorageSync(
							`${privateKey}`,
							{
								address,
								mnemonic,
								privateKey,
							}
						)			
					
						uni.switchTab({
							url: '/pages/index/index',
						})
						this.$refs.button.hideLoading()
					// }catch(e){
						//TODO handle the exception
					// 	this.$refs.button.hideLoading()
					// }
				}
				
				
			},
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			finishs(e) {
				console.log('输入结束，当前值为：' + e);
				this.show = false
				uni.navigateTo({
					url: 'index'
				})
			}
		}
	}
	
	
</script>

<style lang="scss" scoped>
	.passbox {
		width: 590rpx;
		height: 560rpx;
		background: #FFFFFF;
		padding: 40rpx;

		.passbox-title {
			width: 100%;
			text-align: center;
			font-size: 34rpx;
			font-weight: 500;
			color: #333333;
		}
	}

	.nosubmit {
		width: 599.1rpx;
		height: 110rpx;
		top: 100rpx;
		background: #3A83F7FF;
		// box-shadow: 0px 2px 10px 0px rgba(23, 119, 226, 0.4);
		border-radius: 30rpx;
		font-size: 30rpx;
		line-height: 96rpx;
		color: #fff;
		
	}

	.tex {
		top: 8rpx;
		position: relative;
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
		// font-size: 26rpx;
		font-weight: 500;
		color: #2DA5E1;
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
	
	.yuan {
		position: relative;
		transform: translate(-20rpx, 34rpx);
	}
</style>
