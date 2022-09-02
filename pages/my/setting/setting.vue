<!-- 设置 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="false" :is-fixed="true" :title="title" :title-bold="true">
			<view class="slot-wrap" @click="back">
				<image src="../../../static/message/retrun.png.png" class="mlr30" style="width: 17rpx;height: 30rpx;"></image>
			</view>
			
		</u-navbar>
		<view class="content">
			<view v-for="(item,index) in list" class="list" @click="toPage(item.url,index)">
			<!-- <view v-for="(item,index) in list" class="list flex-j-a font-body" @click="toPage(item.url,index)"> -->
				<view class="headline">{{item.title}}</view>
				<view class="align">
					<!-- <view v-if="item.state=='' && index==0 && !info.phone" class="color-a">未绑定</view>
					<view v-if="item.state=='' && index==0 && info.phone" class="color-a">{{info.phone | setAccount}}</view> -->
					<view v-if="item.state=='' && index==0 && !info.email" class="color-a">{{$t('ibinz.msg85',["未设置"])}}</view>
					<view class="frame">
						<view v-if="item.state=='' && index==0 && info.email" class="color-a email">{{info.email}}</view>
						<view v-else class="color-a state">{{item.state}}</view>
					</view>
					<!-- <view v-if="item.state=='' && index==0 && info.email" class="color-a">{{info.email}}</view>
					<view v-else class="color-a">{{item.state}}</view> -->
					<image v-if="index != 0" src="/static/my/more.png" mode="" class="img"></image>
				</view>
			</view>
			<!-- <view class="list flex-j-a font-body">
				<view>{{$t('ibinz.msg86',["收钱到账语言提醒"])}}</view>
				<switch checked @change="switch1Change" />
			</view> -->
		</view>
		<view class="btn flex-center color-r font-l" @click="btn()">{{$t('ibinz.msg87',["退出登录"])}}</view>
	</base-layout>
</template>

<script>
	import {
		LoginOut,
		request
	} from "@/m-subpack/base";

	import {clearWallet} from "@/decorator/wallet"
	export default {
		data() {
			return {
				
				title: this.$t('ibinz.msg84',["设置"]),
				
				list: [
					// {
					// 	title: '手机号码',
					// 	state: '',
					// 	url: ''
					// },
					{
						title:  this.$t('ibinz.msg88',["邮箱"]),
						state: '',
						url: '/pages/my/setting/mailbox'
					},
					// {
					// 	title:  this.$t('ibinz.msg27',["修改安全密码"]),
					// 	url: '/pages/my/setting/passEdit?type=0'
					// },
					// {
					// 	title:  this.$t('ibinz.msg164',["重置安全密码"]),
					// 	url: '/pages/my/setting/passEdit?type=3'
					// },
					// {
					// 	title:  this.$t('ibinz.msg28',["修改交易密码"]),
					// 	url: '/pages/my/setting/passEdit?type=1'
					// },
					// {
					// 	title: this.$t('ibinz.msg105',["多语言"]),
					// 	url: '/pages/my/setting/language'
					// },
					// {
					// 	title: this.$t('ibinz.msg163',["绑定谷歌"]),
					// 	url: '/pages/my/setting/bindGoogle'
					// },
					// {
					// 	title: this.$t('ibinz.msg167',["谷歌换绑"]),
					// 	url: '/pages/my/setting/bindGoogleChange'
					// },
					{
						title: this.$t('ibinz.msg165',["重新绑定邮箱"]),
						state: '去绑定',
						url: '/pages/my/setting/bindMail'
					},
					
				],
				info: {}

			}
		},
		components: {

		},
		filters: {
			setAccount(data) {
				return data.substr(0, 3) + "****" + data.substr(7)
			}
		},
		onLoad() {


		},
		onShow: function() {
			this.getInfo()
		},
		onPullDownRefresh() {

		},
		methods: {
			back(){
				uni.reLaunch({
					url:"/pages/my/my"
				})
			},
			async getInfo() {
				const {
					data
				} = await request({
					url: '/getUserInfo',
					method: 'post',
					
				})
				this.info = { ...data
				}
				
				// uni.getStorageSync("account");
				uni.setStorageSync("loginInfo", { account: data.email });
				console.log("data: ", this.info);
			},
			toPage(url, index) {
				// if (index == 0) {
				// 	if(this.info.phone){
				// 		// uni.navigateTo({
				// 		// 	url:'/pages/my/setting/bindMobild?account='+this.info.account
				// 		// })
				// 		return
				// 	}else{
				// 		uni.navigateTo({
				// 			url:'/pages/my/setting/mobile'
				// 		})
				// 	}
				// } else 
				if(index==0){
					if(this.info.email){
						return
					}else{
            this.toPage(url)
					}
				}else{
          this.toPage(url)
				}

			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			async	logout(){
				let res = request({
					url: '/logout',
					method: 'get'
				})
			},
			btn() {
				this.logout();
				LoginOut()
				
				uni.removeStorageSync("currentWallet")
				uni.removeStorageSync('CURRENT_LANG') 
				uni.removeStorageSync("privateKey")
				uni.removeStorageSync("isTimestamp")
				
				uni.navigateTo({
					url: '/pages/login/login'
				})

				clearWallet();
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 11rpx 30rpx 0;
	}

	.list {
		// border-bottom: 1px solid #E6E6E6;
		// padding: 36rpx 0;

		.img {
			width: 17rpx;
			height: 30rpx;
			margin-left: 21rpx;
			position: relative;
			transform: translate(580rpx, -100rpx);
		}
	}

	.btn {
		width: 599.1rpx;
		height: 110rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 51rpx;
		border-radius: 30rpx;
		background: #3A83F7;
		position: relative;
		top: 420rpx;
		// box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}
	
	.frame {
		background-color: #F4F4F4;
		width: 690rpx;
		height: 103rpx;
		border-radius: 20rpx;
		position: relative;
		left: -80rpx;
		margin: 30rpx;
	}
	
	.headline {
		position: relative;
		top: 20rpx;
	}
	
	.email {
		transform: translate(15px, 15px);
	}
	
	.state {
		transform: translate(15px, 15px);
	}
</style>
