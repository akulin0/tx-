<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title-width="500" :title="navTitle" style="border-bottom: 1px solid #E6E6E6;" :title-bold="true">
			</u-navbar>
			<view class="copymoney">
				<view style="font-size: 30rpx;color: #333;margin: 38rpx 0;">{{$t('home.txt123',['请根据您抄写的助记词，按顺序选择填充'])}}</view>
				<view class="box ">
					<view v-for="(item,index) in word" :key='index' class="item commonfont">
						<span>{{item.v}}</span>
						<image src="/static/index/err.png" class="err" @click="del(item,index)" v-if="item.c" mode="">
						</image>
					</view>
				</view>
				<view style="color: #FF1425;font-size: 24rpx;margin-top: 20rpx;height: 30rpx;" v-if="tips">
					{{$t('home.txt124',['助记词顺序错误，请检查您抄写的是否正确!'])}}</view>
				<view style="position: absolute;bottom: 40rpx;width: 690rpx;">
					<base-button ref='button' @submit="gocode" :disable="disabled" :title="btnTitle"></base-button>
				</view>
				<view class="box"
					:style="tips?'background-color: #fff;margin-top: 30rpx;':'background-color: #fff;margin-top: 20rpx;'">
					<view v-for="(item,index) in words" :key='index' @click="select(item,index)"
						:style="item.s?'width: 188rpx;background: #b6b6b6;color:#c5c5c5':'width: 188rpx;'"
						class="items commonfont">{{item.v}}</view>
				</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import {clearWallet} from "@/decorator/wallet"
	export default {
		data() {
			return {
				word: [, , , , , , , , , , , , ],
				index: 0,
				tips: false,
				disabled: true,
				currentid: [],
				correct: [],
				mnemonics: "",
				words: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				navTitle:this.$t('home.txt122',['验证助记词']),
				btnTitle:this.$t('home.txt56',['确认'])
			}
		},
		created() {
			let data = uni.getStorageSync('mnemonics')
			this.correct = data.split(' ')
			this.words = this.sorts(data.split(' '))
			this.words = this.words.map((item) => {
				return {
					v: item,
					s: false
				}
			})
			this.word = this.words.map((item) => {
				return {
					v: '',
					c: false
				}
			})
			console.log(this.words)
		},
		methods: {
			sorts(arr) {

				var len = arr.length;
				for (var i = 0; i < len; i++) {
					var index = Math.floor(Math.random() * (len - i));
					var tem = arr[index];
					arr[index] = arr[len - i - 1];
					arr[len - i - 1] = tem;
				}
				return arr
			},
			select(v, i) {
				let err = false
				this.word.filter((item) => {
					if (item.c) return err = true
				})

				if (err) return

				console.log(11)
				if (v.s) return
				else {
					v.s = true
					this.currentid.push(i)
					this.word = this.word.map((item) => {
						return {
							v: item.v || '',
							c: false
						}
					})
					this.word[this.index] = {
						v: v.v
					}
					if (this.correct[this.index] != this.word[this.index].v) {
						this.word[this.index] = {
							v: v.v,
							c: true
						}
						this.tips = true;
						return
					} else {
						this.tips = false

						if (this.index < 11) {
							this.word[this.index] = {
								v: v.v,
								c: false
							}
							this.index++
						} else {

							this.word[this.index] = {
								v: v.v,
								c: false
							}
							let mnemonics = this.word.map((item) => {
								return item.v
							})
							this.disabled = false
							console.log(mnemonics.toString().replace(/,/g, ' '))
							this.mnemonics = mnemonics.toString().replace(/,/g, ' ')
						}
					}
				}
			},
			del(v, i) {
				this.word[i] = {
					v: "",
					c: false
				}
				if ((i - 1) > -1) this.word[i - 1].c = false
				else {
					this.word = this.words.map((item) => {
						return {
							v: '',
							c: false
						}
					})
					this.index = 0
				}
				let current = this.currentid.length - 1
				this.words[this.currentid[current]].s = false
				this.currentid.splice(current, 1)
			},
			// 确认
			async gocode() {
				this.$refs.button.hideLoading()
				//mnemonicsType 1 创建钱包-验证助记词接口 2 钱包详情-导出助记词验证 3 邮箱注册-创建钱包-验证助记词
				let type = uni.getStorageSync('mnemonicsType')
				let url = '/reg-by-word-verification-word' // 助记词注册-验证助记词
				if (type == 1) {
					url = '/wallet-create-verificationword' //创建钱包-验证助记词
					clearWallet();
				} else if (type == 2) {
					uni.navigateBack({
						delta: 4
					})
					return
				} else if (type == 3) {
					url = '/wallet-create-verificationword' //邮箱注册-创建钱包-验证助记词
				}
				let {
					data,
					errorMessage
				} = await request({
					url: url,
					method: 'post',
					data: {
						"mnemonics": this.mnemonics
					}
				})
				if (errorMessage == 'success') {
					if (type == 1) {
						uni.removeStorageSync('mnemonicsType')
						uni.switchTab({
							url: 'index'
						})
					} else if (type == 2) {
						uni.navigateTo({
							url: "/pages/wallet/walletDetail"
						})
					} else {
						uni.setStorageSync("token", data.token);
						uni.setStorageSync("auid", data.id)
						uni.setStorageSync("password", data.password);
						
						uni.switchTab({
							url: '/pages/index/index'
						})
						// uni.navigateTo({
						// 	url: '/pages/login/setPass'
						// })
					}

				}

			},
			//页面跳转
			topage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.copymoney {
		padding: 0 30rpx;

		.commonfont {
			font-size: 28rpx;
			color: #333;
		}

		.err {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: -10rpx;
			top: -10rpx;
		}

		.commonfonts {
			font-size: 26rpx;
			color: #FF1425;

			>view {
				line-height: 40rpx;
			}
		}

		.box {
			width: 690rpx;
			height: 446rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.item,
			.items {
				width: 190rpx;
				height: 80rpx;
				background: #FFFFFF;
				border-radius: 4rpx;
				font-size: 28rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: 500;
				color: #333333;
				position: relative;
				margin-right: 28rpx;
			}

			.items {
				border: 1px solid #E5E5E5;
			}

			>.item:nth-child(1),
			.items:nth-child(1) {
				margin-top: 28rpx;
				margin-left: 28rpx;
			}

			>.item:nth-child(2),
			.items:nth-child(2) {
				margin-top: 28rpx;
			}

			>.item:nth-child(3),
			.items:nth-child(3) {
				margin-top: 28rpx;
			}

			>.item:nth-child(4),
			.items:nth-child(4) {
				margin-left: 28rpx;
			}

			>.item:nth-child(7),
			.items:nth-child(7) {
				margin-left: 28rpx;
			}

			>.item:nth-child(10),
			.items:nth-child(10) {
				margin-left: 28rpx;
			}
		}
	}
</style>
