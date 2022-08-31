<template>
	<view class="chat-details">
		<!-- 头部 -->
<!--		<u-navbar :is-back="false" :title="-->
<!--        toTargetName" :title-width="600">-->
<!--			<view class="slot-wrap" @click="back">-->
<!--				<image src="/static/message/retrun.png.png" mode="" style="width: 17rpx;height: 30rpx;"></image>-->
<!--			</view>-->
<!--		</u-navbar>-->
		<!-- <view class="hint-box">{{ $t("hisbag.txt97", ["提示：因数字资产属于风险行业，请在能接受风险范围内理性参与！"]) }}</view> -->
		<!-- 消息内容 -->
		<view class="chatMsg"  @click="changeIsmore" :style="{
        paddingTop: keyH + 10 + 'px',
        paddingBottom: dH + bH + 'px',
      }">
			<Chat @stopTalking="stopTalking" :chatList="getChatDetais" :toTargetAvatar="toTargetAvatar"
				:fromAvatar="`https://dolaimi.oss-us-west-1.aliyuncs.com/dlm/photo/20211117/1637118242288.png`" :way="way" />
		</view>

		<!-- 底部 -->
		<view class="bottom" :style="{ bottom: bH + 'px' }">
			<image class="sound" src="/static/message/set/speak.png" mode="" @click="key()" v-if="isVoice"></image>
			<textarea maxlength="10000" @blur="bindTextAreaBlur" auto-height v-model="val" @input="inputsome"
				@focus="his" @confirm="send('TEXT')" adjust-position="false" placeholder="输入消息..."
				@linechange="linechange()" v-if="!isVoice" :focus="isFocus" />
				
			<!-- <view v-else class="speak-box font-body" @longpress="record()" @touchend="stopRecord()">按住说话</view> -->
			<view style="z-index: 999;" class="speak-box font-body"
				:class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']" @longpress="record"
				@touchend="stopRecord">{{ voiceTis }}</view>


			
			<!-- 更多 -->
			<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
			<image class="sound" src="/static/message/more.png.png" v-if="inputsomes" @click="more"></image>
			<view v-else class="sendBtn" @click="send('TEXT')" style="margin: 0">发送</view>
		</view>
		<!-- 更多 -->
		<view class="more moreBox" v-if="chatMsg == 'isMore'">
			<view v-for="(item, i) in moreList" :key="i" class="moreItem" @click="chooseWho(item)">
				<image :src="item.pic" mode=""></image>
				<view>{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Chat from "@/components/message/chat.vue";
	import Title from "@/components/message/chatTitle.vue";
	import Emotion from "@/components/emoji/emoji.vue";
	import tkiFileManager from "@/components/tki-file-manager/tki-file-manager.vue"
	import {
		emojiList
	} from "@/config";
	import {
		sendMsg,
		init,
		chatHttp,
		uploadFile
	} from "@/m-common/m-chat/index";
	import {sleep, infoRequest} from "@/m-subpack/base"
	import {
		getUserInfo
	} from "@/m-subpack/base";
	import {
		userHead
	} from "@/config";
  import {toTabBar} from '../../../libs/utils';
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	innerAudioContext.autoplay = true;

	export default {
		props: ["fromUser", "toTarget", "receiveTarget", "toTargetAvatar", "way",
			"number", "remark", "type"
		],
		data() {
			return {
				isSend: true,
				myWithdraw: true,
				tarWithdraw: true,
				stopVcBtn: false,
				imgVal: '',
				setTop: false,
				alias: '',
				chatMsg: "chatMsg",
				userHead,
				inputsomes: true,
				list: [],
				val: "",
				top: 0,
				isVoice: false,
				initPoint: {
					identifier: 0,
					Y: 0,
				},
				//录音相关参数
				toTargetName: this.$t("ibinz.msg4", ["意见反馈"]),
				recordTis: "手指上滑 取消发送",
				voiceTis: "按住 说话",
				recording: false,
				willStop: false,
				recordTimer: null,
				recordLength: 0,
				moreList: [{
						pic: "/static/message/set/file.png",
						name: "文件",
					}
				],
				emojiList: emojiList,
				keyH: 0,
				pH: 0,
				bH: 0,
				dH: 55,
				fromAvatar: "",
				text: "uni-app",
				voicePath: "",
				isFocus: false,
				audio: {},
				limit: 10,
				pageIndex: 1,
				isNoMore: "none",
			};
		},
		watch: {
			chatMsg(v){
				if(v == 'chatMsg'){
					this.inputsomes = false;
				}else{
					this.inputsomes = true;
				}
				
			}
		},
		computed: {
			getChatDetais() {
				this.list.forEach((item, index) => {
					this.list[index].isPlay = false
				})
				return this.list;
			},
		},
		components: {
			Chat,
			Title,
			Emotion,
			tkiFileManager
		},
		// onPullDownRefresh() {
		// 	console.log('++')
		// 	if (this.isNoMore == "nomore") return;
		// 	this.pageIndex++
		// 	this.getData();
		// },
		mounted() {
			uni.showModal({
				title: this.$t("hisbag.txt58", ["温馨提示"]),
				content: this.$t("hisbag.txt97", ["数字资产行业投入有一定风险，请在能接受的风险范围内理性参与！"]),
				showCancel:false,
				confirmText:  this.$t("hisbag.txt64", ["确定"])
			});
			this.getData();
		},
		updated() {
			uni.pageScrollTo({
				scrollTop: 999999999999,
				duration: 0,
			});

		},

		methods: {
			resultPath(e) {
				if(!e){
					uni.showToast({
						icon:'none',
						title:'暂不支持该类型文件'
					})
				}
				console.log(e)
				if(e.indexOf('.docx') != -1 ||  e.indexOf('.pdf') != -1 || e.indexOf('.doc') != -1 || e.indexOf('.ppt') != -1 || e.indexOf('.pptx') != -1 || e.indexOf('.xls') != -1 || e.indexOf('.xlsx') != -1) {
					uni.showToast({
						icon:'none',
						title:'上传成功' 
					})
					const path = 'file://'+e
					const that = this
					uploadFile({
						file: path,
						url: "/v1/upstream_message/uploadFile",
						cb: (res) => {
							let data = JSON.parse(res.data);
							console.log(data.data,'数据')
							let titleArr = data.data.split('/')
							let title = titleArr[titleArr.length-1]
							let msg = {
								url:data.data,
								title
							}
							that.send("doc", msg);
							
						},
						failCb:err=>{
							console.log(err,'上传失败')
						}
					});
				}
				else{
					uni.showToast({
						icon:'none',
						title:'只支持Word、Excel、PPT、PDF等文件'
					})
				}
				
			},
			back() {
				// uni.switchTab({
				// 	url: '/pages/my/my'
				// })
        toTabBar('/pages/my/my',4)

      },
			stopTalking(payload) {
				this.audio = payload.audio
				if (payload.status) {
					this.stopVcBtn = true
				} else {
					this.stopVcBtn = false
				}
			},
			his(e) {
				this.chatMsg = "chatMsg";
				this.bH = 0;
				// this.keyH = e.detail.height;
				// var _this = this
				// uni.onKeyboardHeightChange(res => {
				// 	console.log(res.height,'----')
				// 	// _this.keyH = 600
				// })

				// uni.getSelectedTextRange({
				// 	success: res => {
				// 		console.log('getSelectedTextRange res', res.start, res.end)
				// 	}
				// })
			},

			goback() {
				uni.navigateBack();
			},
			// 设置
			set(toTarget, way) {
				this.$emit("go", toTarget, way, this.alias, this.setTop, this.isNoMore, this.myWithdraw, this
					.tarWithdraw);
				console.log(this.setTop, 'setop1')
			},
			handleEmotion(i) {
				console.log("i", i);
				this.val += i;
				// if()
			},
			emoji() {
				this.chatMsg = "emoji";
				this.getHight();
			},
			getHight() {
				let that = this;
				setTimeout(() => {
					uni.getSystemInfo({
						success: function(res) {
							// res - 各种参数
							let info = uni.createSelectorQuery().select(".moreBox");
							info
								.boundingClientRect(function(data) {
									//data - 各种参数
									that.bH = data.height;
								})
								.exec();
						},
					});
				}, 100);
			},
			linechange() {
				let that = this;
				setTimeout(() => {
					uni.getSystemInfo({
						success: function(res) {
							// res - 各种参数
							let info = uni.createSelectorQuery().select(".bottom");
							info
								.boundingClientRect(function(data) {
									//data - 各种参数
									that.dH = data.height;

									console.log("pppp", that.dH);
								})
								.exec();
						},
					});
				}, 100);
			},
			//切换到语音
			voice() {
				this.isVoice = !this.isVoice;

			},
			//切换键盘
			key() {
				this.isVoice = !this.isVoice;
				this.isFocus = true;
			},
			more() {
				this.chatMsg = "isMore";
				this.val = "";
				this.getHight();
			},
			forMart(time) {
				if (time) {
					console.log("time", time);
					var date = new Date(time * 1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
					// console.log("data", date)
				} else {
					var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				}
				var Y = date.getFullYear() + "-";
				var M =
					(date.getMonth() + 1 < 10 ?
						"0" + (date.getMonth() + 1) :
						date.getMonth() + 1) + "-";
				var D =
					(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
				var h =
					(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
				var m =
					(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
					":";
				var s =
					date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				return Y + M + D + h + m + s;
			},
			focus() {
				this.chatMsg = "chatMsg";
			},
			changeIsmore() {
				this.chatMsg = "chatMsg";
				this.bH = 0;
			},
			inputsome(e) {
				if (this.val.trim() != "") {
					this.inputsomes = false;
				} else {
					this.inputsomes = true;
				}
			},
			
			chooseWho(item) {

				const that = this;
				if (item.name == "文件") {
					uni.showActionSheet({
						title: "选择上传类型",
						//   itemList: ["图片", "视频"],
						itemList: ["图片"],
						success: (res) => {
							console.log(res);
							if (res.tapIndex == 0) {
								uni.showLoading({
									title: '图片上传中'
								});
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ["album"], //从相册选择
									success: (res) => {
										uploadFile({
											file: res.tempFilePaths[0],
											url: "/v1/upstream_message/uploadFile",
											cb: (res) => {
												console.log(res.data, "data");
												const url = JSON.parse(res.data);
												console.log(url.data, "aa");
												console.log("123");
												this.imgVal = url.data;
												that.send("IMAGE", this.imgVal);
												uni.hideLoading();
											},
										});
									},

								});
							} else if (res.tapIndex == 1) {
								console.log("视频");
								// 上传视频
								uni.chooseVideo({
									maxDuration: 60,
									count: 1,
									success: (res) => {
										uni.showLoading({
											title: '视频上传中'
										});
										const is30M = res.size / 1024 / 1024 < 30;
										if (is30M) {
											let videoFile = res.tempFilePath;
											uploadFile({
												file: videoFile,
												url: "/v1/upstream_message/uploadFile",
												cb: (res) => {
													console.log(res.data, "data");
													const url = JSON.parse(res.data);
													this.val = url.data;
													// this.val = url.data +
													// 	'?x-oss-process=image/quality,q_80'
													that.send("VIDEO");
													uni.hideLoading();

													// console.log(url.data, 'aa')
													// console.log('123')
												},
											});
										} else {
											uni.hideLoading();
											uni.showToast({
												icon: 'none',
												title: '视频大小不能大于30M'
											})
										}


										// this.src = responent.tempFilePath;  //头条
									},

								});
							} else {
								this.$refs.filemanager._openFile()
							}
						},
						fail() {
							uni.hideLoading();
						}
					});
				}

				if (item.name == "语音通话") {
					// uni.navigateTo({
					// 	url: "/pages/message/pj/pj?toTarget=" + this.toTarget,
					// });
				}
			},
			urlTobase64(url) {
				uni.request({
					url: url,
					method: "GET",
					responseType: "arraybuffer",
					success: (res) => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						this.val = "data:image/jpeg;base64," + base64; //不加上这串字符，在页面无法显示
						this.send("IMAGE");
					},
				});
			},
			async getData() {
				uni.showLoading({
					title: this.$t('ibinz.msg48', ['加载中'])
				})
				const userInfo = await getUserInfo();
				
				const res = await infoRequest({
					url:"/page-opinion",
					method:"POST",
					data:{
						pageNumber: this.pageIndex,
						pageSize: this.limit,
						 userId: userInfo.userId
					}
				});
				let data = res.data.map(v=>{
					return {
						body: { body: v.image || v.text },
						type: v.image ? "IMAGE" : "TEXT",
						createTime: v.create_time,
						fromUserAvatar: v.head_portrait,
						fromUserName: v.user_name,
						toTargetName:  v.user_id == -1 ? "管理员" : "",
						toMe: v.user_id == -1 ? 1 : 0,
						way: "P2P"
					}
				});
				this.isNoMore = data.length == 0 ? "nomore" : "none";

				if (this.pageIndex == 1) {
					uni.setStorageSync("isNoMore", 'none');
					this.list = this.list.concat(data.reverse());
				} else {
					if (data.length == 0) {
						uni.setStorageSync("isNoMore", 'nomore');
					} else {
						uni.setStorageSync("isNoMore", 'none');
					}
					console.log(data.length, 'length')
					let oldMsg = []
					data.reverse().forEach((item, index) => {
						(oldMsg.push(data[index]))
					})
					this.list.unshift(oldMsg)
					console.log(oldMsg, '什么鬼东西');
					console.log(this.list, 'ls')
				}

				

				this.pageIndex++;
				uni.hideLoading();
			},
			async send(type, val, toTarget) {
				if (!val && type != 'CARD') {
					if (!this.val) {
						uni.showToast({
							icon: 'none',
							title: this.$t("message.txt98", ["请输入消息"]),
							duration: 1500,
						});
						return;
					}
				}
				console.log
				this.inputsomes = true;
				const msgVal = val ? val : this.val
				if (this.isSend) {
					this.isSend = false
					const {dara} = await infoRequest({
						url:"/opinion",
						method:"POST",
						data:{
							head_portrait: uni.getStorageSync("Base-UserInfo").avatar,
							image: type != 'TEXT' ? msgVal : '',
							text: type == 'TEXT' ? msgVal : '',
							user_id: uni.getStorageSync("Base-UserInfo").userId,
							user_name: uni.getStorageSync("Base-UserInfo").userName,
						}
					});
					// await sendMsg({
					// 	toTarget: this.share && toTarget != 'toTarget' ? this.receiveTarget : this.toTarget,
					// 	way: this.way,
					// 	type: type,
					// 	body: {
					// 		body: msgVal,
					// 	},
					// });
					// let param = {
					// 	body: {
					// 		body: msgVal,
					// 	},
					// 	type: type,
					// 	toMe: 0,
					// 	createTime: this.forMart(),
					// };
					let param = {
						body: {
							body: msgVal,
						},
						type: type,
						createTime: this.forMart(),
						toMe: 0,
						way: "P2P"
					}
					console.log(param, '有没得只嘛');
					this.list.push(param);
					//滑动到最底部
					uni.pageScrollTo({
						scrollTop: 99999999999
					})
					this.isSend = true
					console.log("正常不");
					// this.chatMsg = "emoji";
					console.log(this.val, '只对不啊');
					if (type == 'TEXT') {
						this.imgVal = ''
					}
					this.val = "";
				}

			},
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value);
			},
		},
	};
</script>

<style lang="scss">
	.hint-box{
		position: fixed;
		top: 40%;
		left: 0;
		right: 0;
		background-color: #929292;
		padding: 10rpx;
		width: 500rpx;
		height: 300rpx;
		// margin: 20rpx 20rpx;
		line-height: 46rpx;
		min-height: 21rpx;
		text-align: cener;
		font-size: 20rpx;
		color: #333;
		z-index: 999;
		background: #FFF1CE;
		border-radius: 10rpx;
	}
	.slot-wrap {
		width: 32rpx;
		height: 32rpx;
		padding-right: 30rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.sendemoji {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		background-color: #f5f5f5;
		padding-bottom: 16rpx;
	}

	.sendBtn {
		background: #049eff;
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		margin-top: 12rpx;
		margin-right: 32rpx;
		color: #ffffff;
	}

	input {
		width: 486rpx;
		height: 76rpx;
		outline: none;
		text-indent: 1rem;
		background: #ffffff;
		border-radius: 10rpx;
		// margin-left: 13rpx;
		margin-right: 18rpx;
	}

	.isMore {
		height: calc(100vh - 450rpx);
		background: #f0f0f0;
	}

	.emoji {
		height: calc(100vh - 680rpx);
		background: #f0f0f0;
	}

	.bottom {
		padding: 18rpx 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #f5f5f5;
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 100;
		box-sizing: border-box;
	}

	.sound {
		width: 50rpx;
		height: 50rpx;
		margin-right: 18rpx;
	}

	.speak-box {
		height: 80rpx;
		background: #f5f5f5;
		border-radius: 40rpx;
		flex: 1;
		margin-right: 20rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.more {
		height: 220rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 60rpx;
		background: #fff;
		text-align: center;
		box-sizing: border-box;
	}

	.moreItem {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		line-height: 44rpx;

		image {
			width: 124rpx;
			height: 124rpx;
		}
	}

	.titleName {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.status {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;
	}

	.title {
		padding: 0 30rpx;
		height: 88rpx;
		display: flex;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		align-items: center;
	}

	.back {
		width: 33%;

		image {
			width: 18rpx;
			height: 30rpx;
		}
	}

	.name {
		width: 33%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.chat-details {
		// display: flex;
		// flex-direction: column;
		// height: 100vh;
		background-color: #f5f5f5;
	}

	.chatMsg {
		min-height: calc(100vh - 130rpx);
		box-sizing: border-box;
		position: relative;
		padding-bottom: 130rpx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #fff;
		border: 1px solid #e0e0e0;
		padding: 18rpx 32rpx;

		textarea {
			background: #f5f5f5;
			border-radius: 40rpx;
			flex: 1;
			padding: 20rpx 25rpx;
			font-size: 28rpx;
			margin-right: 20rpx;
		}
	}

	.moreBox {
		z-index: 20;
		position: fixed;
		width: 100%;
		bottom: 0;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx;

		image {
			width: 25rpx;
			height: 30rpx;
		}
	}

	@import "@/m-common/m-chat/components/style.scss";
</style>
