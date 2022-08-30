<template>
	<view class="agreementList page">
		<u-navbar is-fixed title="关于"></u-navbar>
		<!-- logo -->
		<view class="logo">
			<image :src="Logo" mode=""></image>
		</view>
		<view style="margin: 0 30rpx">
			<u-cell-group>
				<u-cell-item style="border-bottom: 1px solid #e6e6e6" @click="clickbtn(1)" paddings="26rpx 0" title="检查更新" :value="'v'+versionCode"
				 :arrow="true" arrow-direction="right"></u-cell-item>
				<u-cell-item style="border-bottom: 1px solid #e6e6e6" @click="clickbtn('agreement?type=1')" paddings="26rpx 0"
				 title="用户协议" :arrow="true" arrow-direction="right" :border-bottom="true">
				</u-cell-item>
				<u-cell-item style="border-bottom: 1px solid #e6e6e6" @click="clickbtn('agreement?type=2')" paddings="26rpx 0"
				 title="隐私政策" :arrow="true" arrow-direction="right" :border-top="true">
				</u-cell-item>
				<u-cell-item style="border-bottom: 1px solid #e6e6e6" @click="clickbtn('agreement?type=3')" paddings="26rpx 0"
				 title="关于我们" :arrow="true" arrow-direction="right" v-if="project!='law'">
				</u-cell-item>
			</u-cell-group>
			<view v-if="isUpdata" @click="isUpdata=false" style="height: 100vh;width: 100%; position: fixed;top: 0upx;left: 0;display: flex;align-items: center;justify-content: center;z-index: 77777777;">
				<view class="" style="background: #000000;z-index: 66666;opacity: 0.5;width: 100%;height: 100vh;position: fixed;position: fixed;top: 0upx;z-index: 7777777777777;">

				</view>
				<view class="upbg" @click.stop style="z-index: 99999999999999999;">

					<view class="" v-if="IsReadyUpdate" style="position: relative;">
						<image src="/static/upDataBg.png" mode="" style="width: 570upx;height: 742upx;"></image>
						<view class="" style="position: absolute;top: 282upx;left: 0;">
							<view class="" style="color: #FE4351;font-size: 36upx;font-weight:800;width: 570upx;text-align: center;">
								发现新版本 {{updateInfo.versionName}}
							</view>
							<view class="" style="margin: 47upx auto 29upx 40upx;">
								本次版本更新内容
							</view>

							<view class="" style="line-height: 36upx;margin-left: 40upx;width: 436upx;font-size: 28upx;">
								{{updateInfo.content}}
							</view>
							<view class="updateBtn" style="margin-left: 40upx;display: flex;justify-content: flex-start;margin-top: 46upx;">
								<view class="btnup btn1" @click="closeUpdata">
									暂不升级
								</view>
								<view class="btnup btn2" @click="updata">
									立即升级
								</view>
							</view>
						</view>
					</view>
					<view v-else style="width: 570upx;height: 482upx;background: #FFFFFF;display: flex;justify-content: center;align-items: center;flex-direction: column;border-radius: 15upx;">
						<view class="" style="height: 143upx;line-height: 143upx;color: #1A1A1A;font-size: 36upx;font-weight: 800;">
							版本更新
						</view>
						<view class="" style="color: #1A1A1A;font-size: 30upx;">
							正在为您更新，请耐心等待
						</view>
						<view class="progress-box" style="margin-top: 102upx;width: 476upx;margin-bottom: 62upx;">
							<progress :percent="updateProgress" activeColor="#FE4351" show-info stroke-width="3" />
						</view>
						<view style="width: 476upx;height: 75upx;line-height: 75upx;text-align: center;color: #666666;font-size: 30upx;border:1px solid rgba(230,230,230,1);margin-bottom: 40upx;"
						 @click="cancelUpdate">取消下载</view>
					</view>
					<!-- <view class="" style="margin-top: 47upx;font-size: 28upx;color: #1A1A1A;">
	  			
	  		</view> -->
				</view>
			</view>
			<view class="list-box font-body" v-if="chatAppKey=='DUOLAIMI'">
				<view class="url-list flex-j-a" @click="toPage(item.url)" v-for="(item,index) in list">
					<view>
						{{item.title}}
					</view>
					<image src="/static/message/set/more.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Helper from "@/function.js"
	import {
		Logo,
		project,
		chatAppKey
	} from "@/config";
	import {
		request
	} from "@/m-subpack/base";
	var downloadTask = {}
	export default {
		data() {
			return {
				Logo,
				project,
				chatAppKey,
				phone: '400-0000-000',
				token: '',
				info: {},
				versionCode: "",
				isUpdata: false,
				updateInfo: {}, //具体更新的内容
				IsReadyUpdate: true,
				updateProgress: 0,
				list:[
					{
						title:'官方网站',
						url:'http://www.dolaimi.org'
					},
					{
						title:'Twitter',
						url:'https://twitter.com/dolaimi_org'
					},
					{
						title:'Facebook',
						url:'https://www.facebook.com/www.dolaimi.org'
					},
					{
						title:'YouTube',
						url:'https://www.youtube.com/channel/UChU9HO_oF20muG77HkkXCDQ'
					}
				]
			};
		},
		onLoad(opt) {
			var _this = this;
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				_this.versionCode = wgtinfo.version;
			})
			// #endif
			// #ifdef H5
			this.versionCode = systemInfo.version || "0.0.0"
			// #endif
		},
		methods: {
			clickbtn(e) {
				if (e != 1) {
          this.toPage(e)
					// uni.navigateTo({
					// 	url: e,
					// });
				} else {

					// #ifdef APP-PLUS
					this.getUpdate()
					// #endif
					if (project == 'group') {
						FL.update()
					}
				}
			},
			cancelUpdate() {
				var _this = this;
				uni.showModal({
					content: '是否停止更新',
					success: res => {
						if (res.confirm) {
							downloadTask.abort();
							_this.isUpdata = false
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			closeUpdata() {
				this.isUpdata = false
			},
			updata() {
				this.IsReadyUpdate = false;
				var _this = this;
				downloadTask = uni.downloadFile({
					url: _this.updateInfo.packUrl, //仅为示例，并非真实的资源
					success: (downloadResult) => {
						if (downloadResult.statusCode === 200) {
							if (downloadResult.statusCode === 200) {
								console.log(downloadResult);
								uni.showLoading({
									title: "正在更新..."
								})
								plus.runtime.install(downloadResult.tempFilePath, {
									force: false
								}, function() {
									uni.hideLoading();
									console.log('install success...');
									plus.runtime.restart();
								}, function(e) {
									uni.hideLoading();
									uni.showModal({
										content: e.message,
										showCancel: false,
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
								});
							}
						}
					},
					complete: function() {

						_this.isUpdata = false;
					}
				});

				downloadTask.onProgressUpdate((res) => {
					_this.updateProgress = res.progress;
					//console.log('已经下载的数据长度' + res.totalBytesWritten);
					//console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

					// 测试条件，取消下载任务。
					//if (res.progress > 50) {
					//downloadTask.abort();
					//}
				});
			},
			async getUpdate() {
				var _this = this;
				console.log(_this.versionCode, '_this.versionCode')
				plus.runtime.getProperty(plus.runtime.appid, async (wgtinfo) => {
					let versionCode = ""
					let appName = ""
					let url = ""
					if (project == "law") {
						url = "/base/Update/Index"
						appName = "law"
						versionCode = wgtinfo.version
					}
					if (project === "DUOLAIMI") {
						url = "/getApp"
						appName = "DUOLAIMI"
						versionCode = wgtinfo.version
					}
					var os = uni.getSystemInfoSync().platform;
					console.log(wgtinfo.versionCode, 'wgtinfo.versionCode');
					var params = {
						appName: appName,
						os: os,
						versionCode: versionCode
					}
					console.log(params, url)

					const {
						data
					} = await request({
						url,
						method: "post"
					})
					if (data.version != wgtinfo.version) {
						_this.isUpdata = true;
						_this.IsReadyUpdate = true;
						_this.updateInfo = {
							packUrl: data.download_url,
						}
						_this.updata();
					}




					// 	_this.updateInfo = res.data.data;





				})
			},
			toPage(url){
        this.toPage('/pages/my/setting/server?url='+url)
				// uni.navigateTo({
				// 	url:'/pages/my/setting/server?url='+url
				// })
			}
		},
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.agreementList {
		background-color: #fff;
		min-height: 100vh;
	}

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

	.btnup {
		width: 230upx;
		height: 75upx;
		line-height: 75upx;
		font-size: 30upx;
		border-radius: 5upx;
		text-align: center;
	}

	.btn1 {
		margin-right: 31upx;
		color: #666666;
		border: 1upx solid rgba(230, 230, 230, 1);
	}

	.btn2 {
		color: #FFFFFF;
		border: 1upx solid #FE4351;
		// border:1upx solid rgba(230,230,230,1);
		background: #FE4351;
	}

	.upbg {
		z-index: 999999999999999;
		opacity: 1;
		width: 570upx;
		height: 742upx;
		// background: url(../../static/upDataBg.png) no-repeat center;
		// background-size: 570upx 742upx;

	}

	page {
		background: #F7F7F7;
	}

	.title {
		height: 128upx;
		background: #ffffff;
		opacity: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
		line-height: 128upx;
		padding-top: 24upx;
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ffffff;
		opacity: 1;
	}

	.uni-item-image {
		width: 24upx;
		height: 48upx;
		margin-left: 16upx;
	}

	.uni-per-font {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		margin-left: 14upx;
		color: rgba(153, 153, 153, 1);
		opacity: 1;
	}

	.left {
		width: 24upx;
		height: 48upx;
		margin-left: 24upx;
	}

	.setup {
		/* height: 188upx; */
		background: rgba(255, 255, 255, 1);
		opacity: 1;
	}

	.per {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-left: 24upx;

		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;

		opacity: 1;
		height: 110upx;
		border-bottom: 1upx solid #ebebeb;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
	}

	.icons {
		width: 13upx;
		height: 20upx;
		margin-right: 24upx;
		margin-left: 24upx;
	}

	.uni-per {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.uni-btn {
		background: rgba(255, 255, 255, 1);
		margin-right: 114upx;
		line-height: 100upx;
		text-align: center;
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: 400;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: rgba(255, 255, 255, 1);
		margin-left: 114upx;
		width: 522upx;
		margin-top: 140upx;
		height: 100upx;
		background: rgba(254, 40, 77, 1);
		opacity: 1;
		border-radius: 54upx;
	}

	.list-box {
		border-top: 14rpx solid rgb(230, 230, 230);
		color: #606266;

		.url-list {
			padding: 26rpx 32rpx;
			border-bottom: 1px solid rgb(230, 230, 230);

			image {
				width: 14rpx;
				height: 24rpx;
			}
		}
	}

	a {}
</style>
