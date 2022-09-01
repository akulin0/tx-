<template>
	<view>
		<view v-for="(item,i) in chatList" :key="i">
			<!-- 对方 -->
			<view v-if="item.toMe==1">
				<template v-if="way == 'P2R'">
					<view class="time" style="text-align: center;">{{item.createTime}}</view>
					<view class="time" style="text-align: left;padding-left: 162rpx;">
						{{ item.alias || item.fromUserName}}
					</view>
				</template>
				<view class="time" v-if="way != 'P2R'" style="text-align: left;padding-left: 162rpx;">
					{{ item.createTime }}
				</view>
				<view class="chatMsgItem">
					<!-- 头像 -->
					<view class="avtor">
						<image :src="item.avatar || fromAvatar" mode="" v-if="item.avatar || fromAvatar"></image>
						<view v-else class="img-box">{{(item.fromUserName||'').slice(0,1)}}</view>
					</view>
					<!-- <rich-text class="padding-left-sm padding-right-sm" style="word-break:break-all;" :nodes="item.content"></rich-text> -->
					<view v-if="item.type =='CUSTOM'"
						style="display: flex;justify-content: center;align-items: center;">
						<view style="margin-left: 30rpx;">
							<image v-for="(ite,i) in item.emojiPic" :key='i'
								style="width:30px !important;height:30px;display:inline-block;vertical-align:middle; "
								:src="ite"></image>
						</view>
					</view>
					<view v-if="item.type =='AUDIO'">
						<view @tap="handleAudio(item.body.body,item)" class="contents"
							style="display: flex;align-items: center; margin-left: 30rpx; line-height: 50rpx;">
							<view class="xin"></view>
							<view class="length">{{item.body.body.length}}</view>
							<image v-if="!item.isPlay" src="../../static/audio-staic.jpg" mode=""
								style="width: 40rpx; height: 50rpx; margin-left: 8rpx;"></image>
							<image v-else src="../../static/audio.gif" mode=""
								style="width: 40rpx; height: 50rpx; margin-left: 8rpx;"></image>
								<view v-if="item.play == 0 || item.play == null" class="red-cirle"></view>
						</view>
						
						
					</view>
					<view v-if="item.type =='TEXT'" class="you">
						<view class="contents">
							<view class="xin"></view>
							<ChatContent :content="item.body.body" @click="copy(item.body.body)"></ChatContent>
						</view>
					</view>
					<view v-if="item.type =='IMAGE'">
						<image @tap="fnOpenPreviewImg(item.body.body)" :src="item.body.body" class="radius"
							mode="widthFix" style="margin-right:48%;max-width: 50%;" :data-url="item.content"></image>
					</view>
					<view v-if="item.type == 'CARD'">
						<view class="card-box" @click="enterFirends(item)">
							<view class="card-title">个人名片</view>
							<view class="card-t flex-j-a border-bottom">
								<view class="flex-align">
									<image :src="item.body.body.toTargetAvatar" mode="" class="image"></image>
									<view class="font-l">{{ item.body.body.untoTargetName }}</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="item.type == 'REDPACKET'">
						<view @click="openRedEnvelope(item,index)" class="red-packet">
							<image src="/static/message/red-envelope.png" >
							</image>

							<view class="blessing" style="left: 0">
								{{item.body.body.msg}}
								<!-- {{row.msg.content.blessing}} -->
							</view>
						</view>
					</view>
					<view v-if="item.type == 'doc'">
						<view class="card-box"style="box-sizing: border-box; display: flex; justify-content: space-between;  align-items: center; padding: 0 30rpx;"  @click="showDoc(item.body.body.url,item.body.body.title)">
									<view style="margin-right:80rpx; width: 380rpx; white-space: normal; word-break: break-all;">{{ item.body.body.title }}</view>
								<image src="/static/file.png" mode="" style="width: 200rpx; height: 100rpx;"></image>
						</view>
					</view>
					<view v-if="item.type =='VIDEO'">
						<video v-if="body == item.body.body" :src="item.body.body" class="radius" :id="'video'+i"
							:ref="'video'+i" mode="widthFix" style="max-width: 85%;margin-right: 10%;"
							@fullscreenchange="closeFull" play-btn-position="center"></video>
						<image v-else @click="enterVideo(item,i)" class="radius" src="../../static/video.jpg"
							mode="widthFix" style="max-width: 80%;margin-right: 14%;"></image>
					</view>
				</view>

			</view>
			<!-- 我 -->
			<view v-if="item.toMe==0" style="margin-left: 100rpx;">
				<view class="time" style="text-align: right;padding-right: 162rpx;">{{item.createTime}}</view>
				<view class="chatMsgItemMe">
					<view v-if="item.type =='AUDIO'">
						<view @tap="handleAudio(item.body.body,item)" class="contentsMe"
							style="display: flex;align-items: center; margin-right: 30rpx; line-height: 50rpx;">
							<view class="xinMe"></view>
							<view class="length">{{item.body.body.length}}</view>
							<image v-if="!item.isPlay" src="../../static/audio-l-static.jpg" mode=""
								style="width: 40rpx; height: 50rpx; margin-left: 8rpx;"></image>
							<image v-else src="../../static/audio-l.gif" mode=""
								style="width: 40rpx; height: 50rpx; margin-left: 8rpx;"></image>
						</view>
					</view>
					<view v-if="item.type =='CUSTOM'"
						style="display: flex;justify-content: center;align-items: center;">
						<view style="margin-right: 30rpx;">
							<image v-for="(ite,i) in item.emojiPic" :key='i'
								style="width:30px !important;height:30px;display:inline-block;vertical-align:middle; "
								:src="ite"></image>
						</view>
					</view>
					<view v-if="item.type =='TEXT'" class="you">
						<view class="contentsMe">
							<view class="xinMe"></view>
							<ChatContent :content="item.body.body"></ChatContent>
						</view>
					</view>
					<view v-if="item.type =='IMAGE'">
						<image @tap="fnOpenPreviewImg(item.body.body)" :src="item.body.body" class="radius"
							mode="widthFix" style="max-width: 50%;margin-left: 48%;" :data-url="item.content"></image>
					</view>
					<view v-if="item.type =='VIDEO'">
						<video v-if="body == item.body.body" :src="item.body.body" class="radius" :id="'video'+i"
							:ref="'video'+i" mode="widthFix" style="max-width: 85%;margin-left: 10%;"
							@fullscreenchange="closeFull"></video>
						<image v-else @click="enterVideo(item,i)" class="radius" src="../../static/video.jpg"
							mode="widthFix" style="max-width: 80%;margin-left: 14%;"></image>
					</view>
					<view v-if="item.type == 'REDPACKET'">
						<view @click="openRedEnvelope(item,index)" class="red-packet" style="margin-right: 30rpx;">
							<image src="/static/message/red-envelope.png">
							</image>

							<view class="blessing" style="right:0">
								{{item.body.body.msg}}
								<!-- {{row.msg.content.blessing}} -->
							</view>
						</view>
					</view>
					<view v-if="item.type == 'doc'">
						<view class="card-box"style="box-sizing: border-box; display: flex; justify-content: space-between;  align-items: center; padding: 0 30rpx;"  @click="showDoc(item.body.body.url,item.body.body.title)">
									<view style="margin-right:80rpx; width: 380rpx; white-space: normal; word-break: break-all;">{{ item.body.body.title }}</view>
								<image src="/static/file.png" mode="" style="width: 200rpx; height: 100rpx;"></image>
						</view>
					</view>
					<view v-if="item.type == 'CARD'">
						<view class="card-box" @click="enterFirends(item)">
							<view class="card-title">个人名片</view>
							<view class="card-t flex-j-a border-bottom">
								<view class="flex-align">
									<image :src="item.body.body.toTargetAvatar" mode="" class="image"></image>
									<view class="font-l">{{ item.body.body.untoTargetName }}</view>
								</view>
							</view>
						</view>
					</view>
				
					<!-- 头像 -->
					<view class="avtor">
						<image :src="avatar" mode="" v-if="avatar"></image>
						<view v-else class="img-box">{{item.imgName}}</view>
					</view>
				</view>

			</view>
		</view>
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image :src="redAvatar"></image>

					</view>
					<view class="from">来自{{fromUserName}}</view>
					<view class="blessing">{{bless}}</view>
					<view class="money" :class="{'info':!isMoney}">{{money}}</view>
					<view class="showDetails" @click="enterDetail" style="bottom: 50rpx;">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	

	import {
		UserStore
	} from "@/m-common/common";
	import ChatContent from "@/components/message/chatContent.vue"
	import {
		chatHttp,
	} from "@/m-common/m-chat/index.js";
	
	export default {
		data() {
			return {
				redAvatar: '',
				avatar: '',
				Audio: uni.createInnerAudioContext(),
				AudioExam: null, //正在播放音频的实例
				body: '',
				fromUserName: '',
				bless: '',
				money: '',
				windowsState: '',
				redPkgId: '',
				isMoney: true,
				title: 'Hello',
				showIndex:null
			}
		},
		props: ['chatList', 'toTargetAvatar', 'fromAvatar', 'way'],
		components: {
			ChatContent,
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo', this)
			this.videoContext.requestFullScreen();

		},
		created() {
			console.log(this.chatList, 'list 数据查看');
			this.videoContext = uni.createVideoContext('myVideo', this);
			this.videoContext.requestFullScreen();

			UserStore.watch((data) => {
				data.avatar = data.avatar || "qwewqe";
				this.avatar = data.avatar;

			}, true);

			const that = this
			this.Audio.onEnded(function(item) {
				// that.chatList.forEach((item,index)=>{
				// 	that.chatList[index].isPLay=false

				// })
				// that.$forceUpdate()
				that.chatList.forEach((item, index) => {
					that.chatList[index]['isPlay'] = false
				})
				that.$forceUpdate()
				console.log(that.chatList, 'end')
				that.$emit('stopTalking', false)
			})
			// console.log(this.chatList,'------------');
			// this.$parent.chatList.map((item)=>{
			// 	console.log("item: ",item);
			// })
			// this.chatList.map((item)=>{
			// 	// console.log("111111111111: ",item);
			// 	item.imgName=item.fromUserName.slice(0,1)
			// })
		},
		methods: {
			showDoc(url,title){
        this.toPage('/pages/doc/doc?url='+url+'&title='+title)
			},
			enterDetail() {
        this.toPage('/pages/message/HM-details?redPkgId=' + this.redPkgId)
			},
			discard() {
				return;
			},
			// 打开红包
			openRedEnvelope(item) {

				uni.showLoading({
					title: '加载中...'
				});
				this.redPkgId = item.body.body.redpackId
				if (!JSON.parse(uni.getStorageSync('currentWallet'))) {
					uni.showToast({
						icon: 'none',
						title: '请先绑定钱包'
					})
					uni.hideLoading();
					return false
				}
				const {
					address
				} = JSON.parse(uni.getStorageSync('currentWallet'))
				chatHttp({
					url: '/v1/redpacket/accept',
					method: 'post',
					data: {
						redPkgId: item.body.body.redpackId,
						address
					},
					success: res => {
						console.log(res,'r')
						uni.hideLoading();
						if (res.data.errorCode != 0) {
							this.money = res.data.errorMessage
							this.isMoney = false
						} else {
							this.money = res.data.data
							this.Audio.src = '/static/audio/red-get.mp3'
							this.Audio.play()
						}
						this.redAvatar = item.avatar
						this.fromUserName = item.fromUserName
						this.bless = item.body.body.msg
						this.windowsState = 'show';
						
					}
				})


			},
			// 关闭红包弹窗
			closeRedEnvelope() {
				this.windowsState = 'hide';
				setTimeout(() => {
					this.windowsState = '';
				}, 200)
			},
			enterVideo(item, i) {
				this.body = item.body.body
				let videoContext = uni.createVideoContext(`video${i}`, this);
				setTimeout(() => {
					videoContext.requestFullScreen({
						direction: 0
					});
					videoContext.play()
				}, 100)

			},
			closeFull(e) {
				console.log(e, '这是视频')
				if (!e.detail.fullScreen) {
					this.body = ''
				}
			},
			enterFirends(item) {
				console.log(item, '朋友啊')
				const targetId = item.body.body.toTarget
        this.toPage('../../pages/message/addFriend?targetId=' + targetId)
				// uni.navigateTo({
				// 	url: '../../pages/message/addFriend?targetId=' + targetId
				// })
			},
			videoPlay(i) {
				console.log('12', i)
				let videoContext = uni.createVideoContext(`video${i}`, this);
				videoContext.play()
				videoContext.requestFullScreen({
					direction: 0
				})
			},
			quitFull(i, e) {
				console.log(i, e, 'xxx')
			},
			//控制播放还是暂停音频文件
			handleAudio(item, it) {
				if(it.toMe == 1) {
					chatHttp({
						url:'/v1/upstream_message/play/audio',
						method:'POST',
						data:{
							mid:it.id,
						},
						success:res=>{
							it.play=1
							this.$forceUpdate()
						}
					})
				}
				
				this.chatList.forEach((item, index) => {
					this.chatList[index]['isPlay'] = false
				})
				this.$forceUpdate()
				if (this.Audio.paused) {
					it.isPlay = true
					this.stopTalking(true)
				} else {
					it.isPlay = false
					this.stopTalking(false)
				}
				this.AudioExam = item;
				this.Audio.paused ? this.playAudio(item, it) : this.stopAudio(item, it);
				this.$forceUpdate()
			},
			//播放音频
			playAudio(item, it) {
	
				it.isPlay = true
				
				this.Audio.src = item.url;
				this.Audio.play();
				this.$forceUpdate()
			},
			//停止音频
			stopAudio(item, it) {
				this.Audio.src = '';
				this.Audio.stop();
				it.isPlay = false
				this.$forceUpdate()
			},
			stopTalking(status) {
				if (status) {
					this.$emit('stopTalking', {
						status: true,
						audio: this.Audio
					})
				} else {
					this.$emit('stopTalking', {
						status: false,
						audio: this.Audio
					})
				}
			},
			//预览图片
			fnOpenPreviewImg(url) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = url
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			// fnOpenPreviewImg(url) {
			// 	console.log(url,'item')
			// 	let imgArray = [];
			// 	uni.previewImage({
			// 		urls:url
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
	@import "@/m-common/m-chat/components/style.scss";

	.show {
		display: block;

		.mask {
			top: 0;
			opacity: 1;
		}

		.layer {
			transform: translate3d(0, -85vh, 0) scale3d(1, 1, 1);
		}
	}

	.from,
	.blessing,
	.money,
	.showDetails {
		width: 90%;
		padding: 5rpx 5%;
		display: flex;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
	}

	.from {
		margin-top: 90rpx;
	}

	.money {
		font-size: 100rpx;
		color: #f8d757;
		display: flex;
		padding-top: 20rpx;
	}

	.showDetails {
		position: absolute;

		align-items: center;
		font-size: 28rpx;
		color: #f8d757;

		.icon {
			font-size: 26rpx;
			color: #f8d757;
		}
	}

	.open-redenvelope {
		width: 100%;
		height: 59vh;
		background-color: #cf3c35;
		position: relative;

		.top {
			position: absolute;
			top: 0;
			height: 200rpx;
			width: 100%;
			background-color: #fe5454;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			border-radius: 0 0 100% 100%;
			box-shadow: inset 0 -20rpx 0 #9c1712;

			.close-btn {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: flex-end;
				margin-bottom: 30rpx;

				.icon {
					color: #9c1712;
					margin-top: 10rpx;
					margin-right: 10rpx;
				}
			}

			image {
				width: 130rpx;
				height: 130rpx;
				border: solid 12rpx #cf3c35;
				border-radius: 100%;

				margin-bottom: -65rpx;
			}

			margin-bottom: 65rpx;
		}

	}

	.windows {
		.mask {
			position: fixed;
			top: 100%;
			width: 100%;
			height: 100%;
			z-index: 1000;
			background-color: rgba(0, 0, 0, .6);
			opacity: 0;
			transition: opacity .2s ease-out;
		}

		.layer {
			position: fixed;
			width: 80%;
			height: 70%;
			left: 10%;
			z-index: 1001;
			border-radius: 20rpx;
			overflow: hidden;
			top: 100%;
			transform: scale3d(.5, .5, 1);
			transition: all .2s ease-out;
		}

		&.show {
			display: block;

			.mask {
				top: 0;
				opacity: 1;
			}

			.layer {
				transform: translate3d(0, -85vh, 0) scale3d(1, 1, 1);
			}
		}

		&.hide {
			display: block;

			.mask {
				top: 0;
				opacity: 0;
			}

			.layer {
				//transform: translate3d(0,-85vh,0) scale3d(.5,.5,1);
			}
		}
	}

	.red-packet {
		position: relative;
		width: 320rpx;
		height: 400rpx;
		image {
			width: 320rpx;
			height: 400rpx;
		}

		.blessing {
			position: absolute;
			bottom: 20%;
			color: #e9b874;
			line-height: 40rpx;
			text-align: center;
			overflow: hidden;
			// 最多两行
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}

	}

	.card-box {
		width: 440rpx;
		height: 182rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-right: 20rpx;

		.card-title {
			height: 56rpx;
			line-height: 56rpx;
			font-size: 22rpx;
			color: #666;
			margin: 0 20rpx;
			border-bottom: 1px solid #e6e6e6;
		}

		.card-t {
			margin: 20rpx;
			font-size: 32rpx;
			color: #333;

			image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 20rpx;
			}

			.font-l {
				padding-left: 20rpx;
			}
		}
	}

	.time {

		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.chatMsgItem {
		padding: 19rpx 30rpx;
		display: flex;
		justify-content: flex-start;
	}

	.chatMsgItemMe {
		padding: 19rpx 30rpx;
		display: flex;
		justify-content: flex-end;
	}

	.contents {
		padding: 22rpx;
		color: #FFFFFF;
		background: #4BBAFF;
		border-radius: 10rpx;
		position: relative;
		max-width: calc(100vw - 300rpx);
	}

	.xin {
		width: 20rpx;
		height: 20rpx;
		border-radius: 4rpx;
		background: #4BBAFF;
		transform: rotate(45deg);
		position: absolute;
		top: 30rpx;
		left: -10rpx
	}

	.you {
		margin-right: 30rpx;
	}

	.avtor {
		width: 80rpx;
		margin-right: 28rpx;

		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 22rpx;
		}

		.img-box {
			background-color: #7FA7DA;
			width: 90rpx;
			height: 90rpx;
			border-radius: 10rpx;
			text-align: center;
			line-height: 90rpx;
			color: #FFFFFF;
			font-size: 40rpx;
		}
	}

	.contentsMe {
		padding: 22rpx;
		color: #FFFFFF;
		background: #00BDFF;
		display: flex;
		flex-wrap: wrap;
		border-radius: 10rpx;
		position: relative;
		display: flex;
		max-width: calc(100vw - 300rpx);
	}

	.xinMe {
		width: 20rpx;
		height: 20rpx;
		border-radius: 4rpx;
		background: #4BBAFF;
		transform: rotate(45deg);
		position: absolute;
		top: 30rpx;
		right: -10rpx
	}

	.info {
		margin-top: 45rpx;
		font-size: 45rpx !important;
	}
	.red-cirle {
		margin-left: 20rpx;
		height: 20rpx;
		width: 20rpx;
		background-color: red;
		border-radius: 50%;
	}
</style>
