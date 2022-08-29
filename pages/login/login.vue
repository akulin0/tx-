<!-- 登录 -->
<template>
	<base-layout class="box-whole">
		<view class="box-whole">
			<view class="navbar flex-j-a">
				<!-- <image src="/static/login/cha.png" mode="" class="img-cha" @click="closePage()"></image> -->
			<!-- 	<view style="width: 25%;">
					<xfl-select :list="list" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="false"
						:style_Container="'font-size: 32rpx;border: none;'" :placeholder="'placeholder'"
						:initValue="selTitle" :selectHideType="'hideAll'" @change="changeLang">
					</xfl-select>
				</view> -->
				<!-- <view class="font">Ttelegram</view>
				<image src="/static/login/fanhui@2x.png" mode="" class="img-right" @click="closePage()"></image> -->
			</view>
			<view class="center">
				<image src="/static/login/logo.png" mode="" class="logo"></image>
				<view class="font-whole">
					<text class="text-title orientation_X">TelegramX</text>
					<text class="text-title orientation_money">专业的数字资产管理钱包</text>
					
					<text class="paragraph_1">
						支持多币储存，智能费率，可随时安全可靠的访
					<br />
						<text class="paragraph_2">问TelegramX</text>
					</text>
				</view>
			</view>
			<view class="del-btn center-email Email-login" v-if="type==0" @click="toPage('/pages/login/creatWallet')">
				{{$t('login.msg13',['创建钱包'])}}</view>
			<view class="del-btn center-email Email-login" v-else @click="toPage('/pages/login/wordLogin')">
				{{$t('login.msg7',['助记词导入'])}}</view>
			
		<!-- 	<view class="del-btn center-email Email-login" v-if="type==0" @click="toPage('/pages/login/phoneRegister')">
				{{$t('login.msg14',['邮箱注册'])}}
				
				</view> -->
				
			<!-- <view class="del-btn center-email Email-login" v-else @click="toPage('/pages/login/accountLogin')">
				{{$t('login.msg2',['邮箱登录'])}}
			
				</view>	 -->
				
			<view class="font-body foot" @click="check()" v-if="type==0">
				{{$t('login.msg17',['已有账号'])}}，<span>{{$t('login.msg18',['去登录'])}}</span>
				<image src="/static/login/right.png" mode=""></image>
			</view>
			<view class="font-body foot" @click="check()" v-else>
				{{$t('login.msg15',['还没有账号'])}}，<span>{{$t('login.msg16',['去注册'])}}</span>
				<image src="/static/login/right.png" mode=""></image>
			</view>
			<!-- <view class="font-body foot" @click="check()" v-else>
				{{$t('login.msg17',['已有账号'])}}，<span>{{$t('login.msg18',['去登录'])}}</span>
				<image src="/static/login/right.png" mode=""></image>
			</view> -->
		</view>
	</base-layout>
</template>

<script>
	import i18n, {
		changeLang
	} from "@/lang/index.js"
	import xflSelect from '@/components/xfl-select/xselect.vue';
	
	const locale = {
		"English": "en-US",
		"简体中文": "zh-CN",
		"हिन": "en-US",
	}

	const _lang = {
		"en-US": "English",
		"zh-CN": "简体中文",
		
	}
	export default {
		data() {

			return {
				list: [ //要展示的数据
					'English',
					'简体中文',
					
					// 'हिन'
				],
				type: 0,
				selTitle: _lang[i18n.locale],
				
			}
		},
		components: {
			xflSelect
		},
		onLoad() {
			
		},
		onShow: function() {
			
		},
		onPullDownRefresh() {

		},

		methods: {
			changeLang(value) {
				console.log("value: ",value);
				const _locale = locale[value.newVal]
				changeLang(_locale);
			},
			check() {
				this.type = !this.type
			},
			toPage(url) {
				uni.navigateTo({
					url: url,
				})
				let s = "http://192.168.2.162:8080/#" + url
				if (navigator.userAgent.includes("TelegramXAPP")) {
					if ((url === '/pages/login/wordLogin' || url === '/pages/login/accountLogin')) {
						android.startNewActivity(true, s);	
					}			
				}
			},
			// agree() {
			// 	this.isCheck = !this.isCheck
			// },
			closePage() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			
		}

	}
</script>

<style scoped lang="scss">
	.navbar {
		// padding: 30rpx 30rpx 0;
		// height: calc(var(--status-bar-height) + 100rpx);

		.img {
			width: 28rpx;
			height: 28rpx;
		}

	}
	.font {
		font-size: 36rpx;
		font-family: PingFangSC-Regular;
		color: #000000;
		font-weight: Regular;
		transform: translateX(230rpx);
	}
	.text-title {
		font-size: 36rpx;
		font-family: BaiJamjuree-Bold;
		color: #000000;
		font-weight: Bold;
		
		// transform: translate(0, 50%);
	}
	
	.paragraph_1 {
	  width: 540rpx;
	  height: 66rpx;
	  overflow-wrap: break-word;
	  color: rgba(142, 148, 167, 1);
	  font-size: 24rpx;
	  font-family: PingFangSC-Light; 
	  font-weight: lighter;
	  margin: 31rpx;
	}

	.paragraph_2 {
		width: 540rpx;
		height: 66rpx;
		overflow-wrap: break-word;
		color: rgba(142, 148, 167, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Light;
		text-align: left;
		margin: 61rpx 0 0 0;
		font-weight: lighter;
	}
	
	
	.text_3 {
		width: 375rpx;
		height: 31rpx;
		overflow-wrap: break-word;
		color: rgba(0, 0, 0, 1);
		font-size: 32rpx;
		font-family: PingFangSC-Medium;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
		margin: 30rpx 0 0 158rpx;
		opacity: 0;
	}
	
	.uni-input-input {
		font: none !important;
	}

	.logo {
		width: 302rpx;
		height: 310rpx;
		// top: -110rpx;
	}

	.btn {
		width: 318.8rpx;
		height: 113rpx;
		margin: auto;
		box-sizing: border-box;
		border-radius: 20rpx;
		
		background: #007aff;
		// box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
		position: relative;
		transform: translate(180rpx, 100rpx);
	}

	.del-btn {
		width: 318.8rpx;
		height: 113rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 30rpx;
		border-radius: 20rpx;
		border: 3rpx solid ;
		color: #129FF4;
		text-align: left;
		white-space: nowrap;
		line-height: 40px;
		// margin: 45px 0 0 100px;
	}
	
	
	.title-box {
		margin-left: 66rpx;
		margin-top: 41rpx;

		.imgs {
			width: 24rpx;
			height: 24rpx;
			margin-right: 11rpx;
		}
	}

	span {
		color: #2DA5E1;
	}

	.foot {
		// position: fixed;
		// bottom: 76rpx;
		width: 100%;
		text-align: center;
		margin: 60rpx auto;
		image {
			width: 13rpx;
			height: 22rpx;
			margin-left: 10rpx;
		}
	}
	
	// .Email-login {
	// 	position: relative;
	// 	transform: translate(30rpx, -104rpx);
	// }
	
	// .monic-location {
	// 	position: relative;
	// 	transform: translate(180rpx, 100rpx);
	// }
	
	.money{
		display: flex;
	}
	
	.tex-icon {
		color: #999999;
		padding: 1px;
	}
	
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 240rpx auto;
		flex-direction: column;
	}
	
	.center-email {
		display: flex;
		align-items: center;
		justify-content: center;
		// margin: 193rpx auto;
		flex-direction: column;
	}
	
	.font-whole {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 56rpx;
	}
	
	.orientation_money {
		margin: 30rpx;
	}
	
	.box-whole {
		height: 100%;
	}
	
	page{
		height:100%;
	}
</style>
