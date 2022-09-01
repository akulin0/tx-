<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar v-if="!isTx()" :is-back="true" :title-width="500" :title="navTitle" style="border-bottom: 1px solid #E6E6E6;"
				:title-bold="true">
				<!-- <view class="navbar-right" slot="right">
					<view style="margin-right: 30rpx;" @click="scan()">
						<u-icon name="scan" size="38"></u-icon>
					</view>
				</view> -->
			</u-navbar>
			<view class="importbox">
				<u-input v-model="content" type="textarea" height="160" :auto-height="true" :placeholder="placeholder"
					border-color="#E6E6E6" :border="true" style="background-color: #FAFAFA;" />
				<view class="input-item">
					<view class="commonfont">{{$t('home.txt106',['钱包名称'])}} ({{title}})</view>
					<input type="text" :placeholder="placeholder1" placeholder-style="color:#B3B3B3;font-size:28rpx"
						class="i-items" v-model="name" />
				</view>
				<view class="input-item" style="height: 246rpx;position: relative;">
					<!-- 密码强度 -->
					<view class="passType flex-align" v-if="password">
						<view class="type">{{showpassType}}</view>
						<u-line-progress class="linetype" :percent="percents" height="14" :show-percent='false'
							:round="true" :active-color="activecolor"></u-line-progress>
					</view>
					<view class="commonfont">{{$t('home.txt107',['钱包密码'])}}</view>
					<input type="password" style="height: 68rpx;margin-top: 32rpx;" @input="changepass"
						:placeholder="placeholder2" placeholder-style="color:#B3B3B3;font-size:26rpx" class="i-items"
						v-model="password" />
					<input type="password" style="height: 68rpx;margin-top: 32rpx;" :placeholder="placeholder3"
						placeholder-style="color:#B3B3B3;font-size:26rpx" class="i-items" v-model="rpassword" />
				</view>
				<view class="input-item">
					<view class="commonfont">{{$t('home.txt36',['提示信息'])}}</view>
					<input type="text" :placeholder="placeholder4" placeholder-style="color:#B3B3B3;font-size:26rpx"
						class="i-items" v-model="alert" />
				</view>
				<view class="flex-r " style="height: 40rpx;margin: 30rpx 0 100rpx 0;font-size: 26rpx;">
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
	var tip = null;
	
	import {clearWallet} from "@/decorator/wallet"
  import {createWalletByPrivateKey, saveWallet} from '../../libs/wallet';
  import {toTabBar} from '../../libs/utils';
	export default {
		data() {
			return {
				select: false, //服务协议
				key: "", //私钥
				title: '', //钱包标题名称
				activecolor: "",
				showpassType: this.$t('home.txt113', ['弱']),
				percents: 0,
				"alert": "", //提示
				"content": "", // 私钥
				"name": "", //钱包名称
				"password": "",
				"rpassword": "",
				category: "", //钱包种类  1、比特币；2、以太坊；3、波场；4、Telegram X
				navTitle: this.$t('home.txt99', ['私钥导入']),
				placeholder: this.$t('home.txt105', ['输入明文私钥或扫描二维码，请注意大小写']),
				placeholder1: this.$t('home.txt31', ['请输入钱包名称']),
				placeholder2: this.$t('ibinz.msg32', ['密码至少8个字符,包含大小写字母和数字']),
				placeholder3: this.$t('home.txt33', ['请再次输入密码']),
				placeholder4: this.$t('home.txt35', ['请输入密码提示信息（可不填）']),
				btnTitle: this.$t('ibinz.msg13', ['导入钱包']),
        chainName: ''
			}
		},
		onLoad(o) {
			console.log("私钥导入", o);
			this.name = o.name
      this.chainName = o.name
			this.title = o.title
			this.category = o.category
			this.getWalletList()
		},
		
		methods: {
			//钱包列表
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
				tip = (data.length + 1)
				this.name = this.name + '-' + tip
			},
			topage(url){
        this.toPage(url)
			},
			scan() {
				uni.scanCode({
					success: function(res) {
						this.demo = res.result
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
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
						this.showpassType = this.$t('home.txt113', ['弱']);
						this.activecolor = '#fa3534';
						this.percents = 33;
						break;
					case 2:
						this.showpassType = this.$t('home.txt113', ['弱']);
						this.activecolor = '#fa3534';
						this.percents = 33;
						break;
					case 3:
						this.showpassType = this.$t('login.msg19', ['中']);
						this.activecolor = '#ff9900';
						this.percents = 66;
						break;
					case 4:
						this.showpassType = this.$t('login.msg20', ['强']);
						this.activecolor = '#19be6b';
						this.percents = 100;
						break;
				}
			},
			//导入钱包
			async submit() {
				if (!this.content || !this.rpassword || !this.password || !this.name) {
					uni.showToast({
						title: this.$t('home.txt130', ['请将信息补充完整']),
						icon: "none",
						duration: 1000
					})
					this.$refs.button.hideLoading()
					return
				}
				try {
					// const {
					// 	data,
					// 	errorMessage
					// } = await request({
					// 	url: '/wallet-import',
					// 	method: 'POST',
					// 	data: {
					// 		"alert": this.alert,
					// 		"content": this.content,
					// 		"name": this.name,
					// 		"password": this.password,
					// 		"rpassword": this.rpassword,
					// 		"category": this.category,
					// 		"type": 1
					// 	}
					// })


          const wallet = await createWalletByPrivateKey(this.content,this.password)

          let {
            data,
            errorMessage
          } = await request({
            url: '/wallet-create',
            method: 'post',
            data: {
              address: wallet.address,
              'alert': this.alert,
              'category': this.category,
              'name': this.name,
              'type': 1
            }
          });

          // 保存
          await saveWallet(Object.assign({
            name: this.name,
            chainName: this.chainName,
            remark: this.alert,
            pwd: this.password,
            id: data.id
          }, wallet));

          const currentWallet = {
            address: wallet.address,
            category_name: this.chainName,
            category: this.category,
            name: this.name,
            id: data.id,
          };

          uni.setStorageSync('currentWallet', currentWallet);
          saveCurrentWallet(currentWallet)

					this.$refs.button.hideLoading()
					uni.showToast({
						title: this.$t('home.txt131', ['导入成功']),
						duration: 1000,
					})
					clearWallet();
					setTimeout(() => {
            toTabBar('/pages/index/index',0)

          }, 1000);
				} catch (e) {
          console.log(e);
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
		padding: 0 30rpx;
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
