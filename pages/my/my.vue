<!-- 我的页面 -->
<template>
	<base-layout>
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <u-navbar  :is-back="false" title="" :title-width="227" class="zhiti":title-bold="true">
    </u-navbar>
			<view :class="[btn === false ? 'big-box':'big-box-night']">
				<view v-for="(item,index) in list"  class="flex-j-a list-box" @click="toPage(item.url)">
					<view class="align">
						<image :src="item.img" mode="" style="width: 40rpx;height: 40rpx;margin-right: 32rpx;" class="list-picture"></image>
						<view class="tex">{{item.title}}</view>
					</view>
					<u-badge v-if="index == 3 && info.opinion == 1" class="badge-num2" :is-dot="true" type="error" size="mini"></u-badge>
					<image src="/static/my/more.png" mode="" style="width: 14rpx;height: 24rpx;" class="more"></image>
					<u-popup v-model="show" v-if="item.url=='kf'" mode="bottom">
						<view class="phone flex-center" @click="toCall()">
							<image src="/static/my/phone.png" mode=""></image>
							<view class="font-max font-w">028-2356-4556</view>
						</view>
						<view class="font-l cancel-btn flex-center" @click="show=false">{{$t('home.txt24',["取消"])}}</view>
					</u-popup>
				</view>
				<image src="/static/my/advert.png" class="advert" @click="skip()"></image>
			</view>
	</base-layout>
</template>

<script>
	import {
		customerView,
		aboutView,
		request,
		infoRequest
	} from "@/m-subpack/base";
  import Image from "../../m-common/common/components/image";

  export default {
    components: {Image},
    data() {
			return {
        btn: localStorage.getItem("btn") === "true",
				list: [{
						img: '/static/my/icon1.png',
						title: this.$t('ibinz.msg2',["管理钱包"]),
						url: '/pages/my/wallet'
					}, {
						img: '/static/my/icon2.png',
						title: this.$t('ibinz.msg3',["地址薄"]),
						url: '/pages/my/addressBook'
					}, {
						img: '/static/my/icon3.png',
						title: this.$t('ibinz.msg4',["意见反馈"]),
						url: '/pages/my/customer'
					},
					{
						img: '/static/my/yaoqinghaoyou.png',
						title: this.$t('ibinz.msg168', ["邀请好友"]),
						url: '/pages/my/invite'
					},
					{
						img: '/static/my/icon5.png',
						title: this.$t('ibinz.msg5',["关于我们"]),
						url: '/pages/my/agreementList'
					},
					// {
					// 	img: '/static/my/moon2.png',
					// 	title: this.$t('ibinz.msga',["暗夜模式"]),
					// 	url: '/pages/my/nightMode'
					// }
				],
				isCopy: false,
				show: false,
				newInfo: {},
				info: {
					userName: '',
					userId: '',
					avatar: ''
				}
			}
		},
		onLoad() {

		},
		onShow() {
			this.getInfo();
			uni.setTabBarItem({
				index: 0,
				text: this.$t("index", ["资产"]),
			})
			uni.setTabBarItem({
				index: 1,
				text: this.$t("markets", ["市场"]),
			})
			uni.setTabBarItem({
				index: 2,
				text: this.$t("finds", ["发现"]),
			})
			// uni.setTabBarItem({
			// 	index: 3,
			// 	text: this.$t("messages", ["消息"]),
			// })
			uni.setTabBarItem({
				index: 3,
				text: this.$t("my", ["我的"]),
			})
		},
		methods: {
			async getInfo() {
				const {
					data
				} = await request({
					url: '/getUserInfo',
					method: 'post',
				})
				this.info = {
					...data
				}
			},
			copy(id) {
				var _this = this
				if(_this.isCopy == true){
					uni.showToast({
						title: _this.$t('ibinz.msg26', ["已复制"]),
						icon:'none'
					})
					return;
				}

				uni.setClipboardData({
					data: id,
					success: function() {
						_this.isCopy = true;
						uni.showToast({
							title: _this.$t('ibinz.msg26', ["已复制"]),
							duration: 1000
						})
					}
				});
			},
			toCall() {
				uni.makePhoneCall({
					phoneNumber: '028-2356-4556' //仅为示例
				});
			},
			skip () {
				console.log("点击")
				window.location.href = '/www.telegramx.cc'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 30rpx;
		color: #333;
	}

	.set-box {
		padding-top: calc(var(--status-bar-height) + 50rpx);
		justify-content: flex-end;
	}

	.header {
		position: relative;
		transform: translate(-60rpx, 30rpx);
	}

	.message-box {
		margin: 100rpx 0 !important;

		.image {
			width: 108rpx;
			min-width: 108rpx;
			height: 108rpx;
			border-radius: 20rpx;
			margin-right: 24rpx;
			position: relative;
			transform: translate(-60rpx, 30rpx);
		}

		.box {
			flex: 1;
			height: 108rpx;
			padding: 10rpx 0;
			box-sizing: border-box;

			.flex {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// height: 100%;

				.copy {
					width: 70rpx;
					height: 34rpx;
					background: rgba(45, 165, 225, 0.2);
					border-radius: 4rpx;
					color: #fff;
					margin-left: 16rpx;
				}
			}

			.imgs {
				// height: 100%;
				// display: flex;
				align-items: center;
			}
		}
	}

	.account-box {
		height: 80rpx;
		border: 1px solid #E6E6E6;
		border-radius: 10rpx;
		padding: 0 21rpx;

		span {
			margin: 0 20rpx 0 15rpx;
		}
	}

	.imgbg-box {
		width: 100%;
		height: 130rpx;
		color: #F0E8FF;
		position: relative;
		margin: 30rpx 0 20rpx;

		image {
			height: 130rpx;
			width: 100%;
		}

		.left-box {
			position: absolute;
			top: 32rpx;
			left: 55rpx;
		}

		.right-box {
			position: absolute;
			top: 50rpx;
			right: 54rpx;
		}
	}

	.list-box {
		height: 110rpx;
		border-bottom: 1rpx solid rgba(185, 193, 217, 0.2);
		width: 700rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		background-color: #F4F4F4;
		margin: 20rpx;
		// transform: translate(-20rpx, -100rpx);
		.phone {
			height: 110rpx;

			color: #2DA5E1;
			border-bottom: 10rpx solid #F5F5F5;

			image {
				width: 24rpx;
				height: 30rpx;
				margin-right: 17rpx;

			}
		}

		.cancel-btn {
			height: 110rpx;
		}
	}
	.badge-num{
		top: -2rpx !important;
		right: 32rpx !important;
		width: 15rpx !important;
		height: 15rpx !important;
		padding: 0 !important;
		border-radius: 50%;
	}

	.badge-num2{
		right: 144rpx !important;
		top: -62rpx !important;
		right: 32rpx !important;
		width: 15rpx !important;
		height: 15rpx !important;
		padding: 0 !important;
		border-radius: 50%;
	}

	.font {
		position: relative;
		transform: translate(-130rpx, 110rpx);
		line-height: 80rpx;
	}

	.name {
		font-size: 38rpx;
		font-family: PingFangSC-Regular;
		line-height: 40rpx;
		color: #333333;
		position: relative;
		transform: translate(-50rpx, -80rpx);
	}

	.acccount {
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		line-height: 80rpx;
		color: #646470;
		transform: translate(-50rpx, -40rpx);
	}

	.small-icons {
		position: relative;
		transform: translate(400rpx, -300rpx);
		display: flex;
		flex-direction: row;
		align-content: center;
	}

	.button {
		background-color: rgba(58, 131, 247, 1);
		border-radius: 34rpx;
		height: 68rpx;
		margin-top: 25rpx;
		width: 165rpx;
		position: relative;
		transform: translate(210rpx, -90rpx);

		.text_1 {

				text-align: center;
				position: relative;
				top: -12rpx;
		}
	}

	.list-picture {
		position: relative;
		left: -30rpx;
		top: 2rpx;
	}

	//.more {
	//	right: 15rpx;
	//	position: fixed;
  //
	//}

	.site {
		position: relative;
		transform: translate(240rpx, -252rpx);
	}

	.set {
		position: relative;
		transform: translate(200rpx, -226rpx);
	}

	.messag {
		position: relative;
		transform: translate(60rpx, -199rpx);
	}

	.tex {
		position: relative;
		transform: translate(30rpx, -48rpx);
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
	}

	.align {
		position: relative;
		transform: translate(60rpx, 20rpx);
	}

	.big-box {
    height: 94vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

  .advert {
    width: 690rpx;
    height: 387rpx;
    //margin-top: 300rpx;
  }

  .big-box-night {
    height: 94vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("/static/my/bj.png");
    background-size: 100% 100%;
  }

  /* body 在横屏底下和竖屏底下一定要做好定位，不然*/
  /* 竖屏底下的查询 */
  @media screen and (orientation: portrait) {
    body {
      /* 防止页面被刘海遮住 */
      padding-top: constant(safe-area-inset-top);
      //以防万一写一个你本身适配其他手机的
      padding-top:0px;
    }
  }
  /* 横屏底下的查询 */
  @media screen and (orientation: landscape) {
    body {
      /* IOS 11支持*/
      padding-right: constant(safe-area-inset-right);
      padding-left: constant(safe-area-inset-left);
      padding-bottom: constant(safe-area-inset-bottom);//为底下圆弧的高度 34px
      /*IOS 11.2版本版本支持*/
      padding-right: env(safe-area-inset-right);
      padding-left: env(safe-area-inset-left);
      padding-bottom: env(safe-area-inset-bottom);
      //以防万一写一个你本身适配其他手机的
      padding-right:0px;
      padding-left:0px;
      padding-bottom:0px;
    }
  }
</style>
