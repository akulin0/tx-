<!-- 地址本编辑、添加 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="title" :title-bold="true"
			 :custom-back="goBack"></u-navbar>
		<view class="content">
			<!-- <picker @change="bindPickerChange" :value="index" :range="array" :range-key="'title'">
				<view class="flex-j-a pick">
					<view class="flex-align">
						<image :src="array[index].img" mode="" class="pick-img" v-if="index>-1"></image>
						<view class="uni-input" v-if="index>-1">{{array[index].title}}</view>
						<view v-else style="color: #b3b3b3;">请选择钱包体系</view>
					</view>

					
				</view>
			</picker> -->
			<view class="moneybag">钱包体系</view>
			<view @click="toPage('/pages/index/addcreate?type=4')" class="flex-j-a pick">
				<view class="flex-align">
					<image :src="info.img" mode="" class="pick-img" v-if="info.img"></image>
					<view class="uni-input moneybag" v-if="info.title">{{info.title}}</view>
					<view v-else style="color: #b3b3b3; background-color: #F4F4F4;" class="system"><view class="tex">{{$t('ibinz.msg53',["请选择钱包体系"])}}</view></view>
				</view>

			</view>
			<image src="/static/my/more.png" mode="" style="width: 14rpx;height: 24rpx;" class="location-more"></image>
			
			<view class="font-title">{{$t('ibinz.msg54',["地址信息"])}}</view>
			<view class="font-body">
				<view class="flex-j-a input-box">
					<view class="flex-align" style="flex: 1;">
						<!-- <view :class="[$i18n.locale == 'en-US'?'titles1':'title1']">{{$t('ibinz.msg54',["地址"])}}</view> -->
						<input class="uni-input" focus :placeholder="placeholder" v-model="address" />
					</view>
					<!-- <image src="/static/my/saoyisao.png" mode="" style="width: 38rpx;height: 38rpx;" @click="code()">
					</image> -->
				</view>
				<view class="input-name-head input-box">
					<view class="flex-align" style="flex: 1;">
						<!-- <view class="title1">{{$t('ibinz.msg57',["名称"])}}</view> -->
						<input class="input-neme" :placeholder="placeholderQ" v-model="name" />
					</view>
				</view>
				<view class="flex-j-a input-box ">
					<view class="text-box" style="flex: 1;">
						<view :class="[$i18n.locale == 'en-US'?'titles2':'title1']">{{$t('ibinz.msg59',["备注(选填)"])}}</view>
						<textarea @blur="bindTextAreaBlur" :placeholder="placeholderf" v-model="remark"  class="remarks-content"/>
					</view>
				</view>
			</view>
			<view class="del-btn flex-center" v-if="id!='undefined'" @click="del()">{{$t('ibinz.msg61',["删除"])}}</view>
			<base-button :title="basetitle" ref="button" v-if="address && name && info.index>-1" :disable="false"
				@submit="save()" class="btn"></base-button>
			<view class="btn flex-center color-r font-l btn1" @click="save()" v-else>{{$t('ibinz.msg62',["保存"])}}</view>
			<!-- <view class="btn flex-center color-r font-l" :class="[!address || !name || !remark || info.index<0?'btn1':'']" @click="save()">保存</view> -->
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	import Helper from "@/function.js"
	export default {
		data() {
			return {
				title: '',
				basetitle:this.$t('ibinz.msg62', ["保存"]),
				address: '',
				name: '',
				remark: '',
				placeholder:this.$t('ibinz.msg56', ["请输入地址"]),
				placeholderQ:this.$t('ibinz.msg58', ["请输入名称"]),
				placeholderf:this.$t('ibinz.msg60', ["请输入备注内容"]),
				info: {
					img: '',
					title: '',
					index: -1
				},
				id: '',
				list: [{
						img: "/static/biticon/bit.png",
						title: this.$t('ibinz.msg6', ["比特币"]),
					},

					{
						img: "/static/biticon/ethereum.png",
						title: this.$t('ibinz.msg10', ["以太坊"]),
					},
					{
						img: "/static/biticon/tron.png",
						title: this.$t('ibinz.msg11', ["波场"]),
					},
					{
						img: "/static/biticon/dolami.png",
						title: this.$t('ibinz.msg9', ["Telegram X"]),
					}
				],
			}
		},
		components: {

		},
		onLoad(option) {
			if (option.type == 0) {
				uni.removeStorageSync("id")
				uni.removeStorageSync("info")
				this.id = option.id

			} else if (option.type == 1) {
				uni.setStorageSync("info", option)
				this.id = uni.getStorageSync("id")
				if (this.id) {
					this.getDetail()
				} else {
					this.id = 'undefined'
					this.info = uni.getStorageSync("info")
				}
			}
			if (this.id != 'undefined') {
				this.title = this.$t('ibinz.msg45', ["编辑"])
				uni.setStorageSync('id', this.id)
				this.getDetail()
			} else {
				this.title = this.$t('ibinz.msg47', ["添加"])
			}

		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		methods: {
			async getDetail() {
				uni.showLoading({
					title: this.$t('ibinz.msg48', ["加载中"])
				})
				let {
					data
				} = await request({
					url: '/user_contact-get',
					method: 'get',
					params: {
						id: this.id
					}
				})
				console.log(data,'---')
				this.address = data.wallet_address
				this.name = data.name
				this.remark = data.remark
				let info = uni.getStorageSync("info")
				if (info) {
					this.info = uni.getStorageSync("info")
				} else {
					this.info.img = this.list[data.wallet_category-1].img
					this.info.title = this.list[data.wallet_category-1].title
					this.info.index = data.wallet_category
				}
				uni.hideLoading()

			},
			async save() {
				if (this.info.index > -1 && this.address && this.name) {
				
					if (!Helper.regAZaz(this.address)) {
						uni.showToast({
							title:  this.$t('home.txt138', ["地址信息只支持字母或数字"]),
							icon: 'none'
						})
						this.$refs.button.hideLoading()
						return
					}
					if (this.id != 'undefined') {
						try {
							const {
								data
							} = await request({
								url: '/user_contact-update',
								method: 'post',
								data: {
									id: this.id,
									name: this.name,
									remark: this.remark,
									wallet_address: this.address,
									wallet_category: parseInt(this.info.index)
								}
							})
							uni.showToast({
								title: this.$t('ibinz.msg49', ["修改成功"]),
								icon: 'none',
							})
							uni.removeStorageSync("id")
							uni.removeStorageSync("info")
							uni.navigateBack()
						} catch (e) {
							//TODO handle the exception
							
						}
						this.$refs.button.hideLoading()
					} else {
						try {
							const {
								data
							} = await request({
								url: '/user_contact-save',
								method: 'post',
								data: {
									name: this.name,
									remark: this.remark,
									wallet_address: this.address,
									wallet_category: parseInt(this.info.index)
								}
							})
							uni.showToast({
								title:  this.$t('ibinz.msg50', ["添加成功"]),
								icon: 'none'
							})
							uni.removeStorageSync("id")
							uni.removeStorageSync("info")
							uni.navigateBack()
						} catch (e) {
							//TODO handle the exception
						
						}
						this.$refs.button.hideLoading()

					}

				} else {
					uni.showToast({
						title:  this.$t('ibinz.msg51', ["请填写完整信息"]),
						icon: 'none'
					})
				}
			},
			async del() {
				const {
					data
				} = await request({
					url: '/user_contact-batchdel',
					method: 'post',
					data: {
						ids: this.id
					}
				})
				uni.removeStorageSync("id")
				uni.removeStorageSync("info")
				uni.showToast({
					title: this.$t('ibinz.msg52', ["删除成功"]),
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			},
			code() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
			},
			toPage(url) {
				uni.redirectTo({
					url: url
				})
			},
			goBack(){
				uni.navigateBack();
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 30rpx;
	}

	.pick {
		height: 100rpx;

		.pick-img {
			width: 40rpx;
			height: 40rpx;
			margin-right: 23rpx;
		}
	}

	.title {
		margin: 30rpx 0;
	}

	.input-box {
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;

		.title1 {
			width: 30%;

		}
		
		.titles1{
			width: 46%;
			font-size: 26rpx;
		}
		.titles2{
			width: 40%;
			font-size: 26rpx;
		}

		input,
		textarea {
			font-size: 28rpx;
			// flex: 1;
			position: relative;
			left: -40rpx;
			top: 40rpx
		}
		textarea {
			height: 100rpx;
		}
	}

	.text-box {
		display: flex;
		align-items: flex-start;
	}

	.btn {
		width: 599.1rpx;
		height: 110rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 160rpx;
		border-radius: 30rpx;
		
		background: #3A83F7;
		// box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}

	// .btn1 {
	// 	opacity: 0.5;
	// }

	.del-btn {
		// width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 87rpx;
		border-radius: 44rpx;
		border: 1px solid #2DA5E1;
		color: #129FF4;
		margin-bottom: -57rpx;
	}
	
	.uni-input {
		width: 690rpx;
		height: 103rpx;
	}
	
	.moneybag {
		position: relative;
		font-size: 30rpx;
		color: #333333;
		left: 20rpx;
	}
	
	.system {
		width: 690rpx;
		height: 103rpx;
		border-radius: 20rpx;
		position: relative;
		transform: translate(-70rpx, 10rpx);
		margin: 10rpx
	}
	
	.tex {
		position: relative;
		top: 30rpx;
		right: -20rpx;
	}
	
	.font-title {
		font-size: 30rpx;
		position: relative;
		top: 80rpx;
		left: 20rpx;
	}
	
	.input-neme {
		position: relative ;
		top: 8rpx !important;
	}
	
	.input-name-head {
		position: relative ;
		transform: translateY(-20rpx) ;
	}
	
	.remarks-content {
		top: 80rpx !important;
		left: -170rpx !important;
	}
	
	.location-more {
		position: relative;
		transform: translate(650rpx, -40rpx);
		width: 17rpx;
		height: 30rpx;
	}
</style>
