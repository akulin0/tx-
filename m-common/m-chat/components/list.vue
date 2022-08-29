<template>
	<view class="chat-list">
		<view v-if="list.length>0">
			<view v-for="(item, index) in list" :key="'keyitem' + index" class="msgItem" @click="goDetail(item)">
				<view class="left">
					<view class="avtor" style="position: relative; ">
						<view v-if="item.way=='P2R'" style="background-color: royalblue;">{{$t('message.txt0',['群'])}}
						</view>
						<view v-else-if="item.way=='P2P' && (!item.fromUserAvatar)">
							{{item.imgName}}
						</view>
						<image  :src="item.fromUserAvatar" :error="userHead" style="border-radius: 12rpx" mode="" v-else>
						</image>
						<view v-if="item.unread == 0" style="position: absolute; top:0 ; right: -2rpx; width: 25rpx; height: 25rpx; border-radius: 50%; background-color: red; font-size: 10rpx;">
						</view>
						
					</view>
					<view>
						<view class="name">
							{{ item.alias ?  item.alias : item.toTargetName}}
						</view>
						<view class="ellipsis1 msgContent" v-if="item.type != 'CARD'">
							{{item.body.body | formatVal(item.type)}}
						</view>
						<view class="ellipsis1 msgContent" v-else>
							名片
						</view>
					</view>
				</view>
				<view class="right">
					<view class="time"> {{item.createTime.split(" ")[0]}}</view>
					<!-- <view class="unread" v-if="item.unread>0">{{item.unread}}</view> -->
				</view>
			</view>
		</view>

		<base-noData v-else />
	</view>

</template>

<script>
	import _ from 'lodash';
	import {
		init,
		chatHttp
	} from "../index.js"
	import {
		getUserInfo,
	} from "@/m-subpack/base";
	import {
		userHead,
		chatAppKey
	} from "@/config"
	export default {
		filters: {
			formatVal(val, type) {
				if (type === 'IMAGE') {
					return '[图片]'
				} else if (type === 'AUDIO') {
					return '[语音]'
				} else if (type === 'VIDEO') {
					return '[视频]'
				} else if (type === 'CARD') {
					return '[名片]'
				} else if (type === 'REDPACKET') {
					return '[红包]'
				} else if (type === 'doc') {
					return '[文件]'
				}
				 else {
					return val
				}
			}
		},
		data() {
			return {
				userHead,
				list: [],
				noData: false,
				fromAvatar: '',
			}
		},

		mounted() {
		console.log('18n',)
			// init(() => {
			// 	this.getData();

			// });
			init(() => {
				this.getData();
			});

			uni.$on("downstream_message", (item) => {
				this.getData()
				const innerAudioContext = uni.createInnerAudioContext();
				if (item.type === 'REDPACKET') {
					if(this.$i18n.locale == 'zh-CN'){
						innerAudioContext.src ='/static/audio/red-cn.mp3'
					}
					else {
						innerAudioContext.src ='/static/audio/red-en.mp3'
					}
				} else {
					innerAudioContext.src ='/static/audio/chat.mp3'
				}
				innerAudioContext.play()
			})
		},
		methods: {
			async goDetail(item) {
				item.unread=1
				this.$forceUpdate()
				this.$emit("goDetail", item);
			},
			// a(){
			// 	uni.vibrate({
			// 	    success: function () {
			// 	        console.log('success');
			// 	    }
			// 	});
			// },
			async getList() {
				const {
					data
				} = await chatHttp({
					url: "/v1/user/getList",
					method: "POST",
					params: {
						num: 998,
						appKey: chatAppKey
					}
				});
				const list = this.list || [];
				data.map(item => {
					// console.log(this.list.filter(item => item.auid === item.fromUser));
					const _data = this.list.filter(items => items.auid === item.fromUser);

					// debugger
					if (_data.length == 0) {

						this.list.push({
							body: {
								body: ""
							},
							createTime: item.createTime,
							fromUser: item.fromUser,
							fromUserAvatar: item.avatar,
							fromUserName: item.name,
							read: 0,
							toTarget: item.toTarget,
							toTargetAvatar: item.avatar,
							toTargetName: item.name,
							type: "TEXT"
						})
					}

				})
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
			async getData() {
				const userInfo = await getUserInfo()
				const {
					data
				} = await chatHttp({
					url: "/v1/history/list_session",
					method: "POST",
					// data: {
					// 	// auid: userInfo.userId,
					// 	startTimestamp: 0,
					// 	endTimestamp: new Date().getTime(),
					// }
				});



				// let datalist = _.orderBy(data, function(e) {
				// 	return e.createTime
				// }, ['desc'])



				this.list = data.map((item) => {

					// console.log(1,item);
					// console.log(3,userInfo.userId);
					if (userInfo.userId == item.fromUser) {
						var _item = item;
						item.fromUsers = _item.fromUser;
						item.fromUser = _item.toTarget;
						item.fromUserAvatar = _item.toTargetAvatar;
						item.fromUserName = _item.toTargetName;
						item.toTarget = _item.fromUser;
						item.toTargetAvatar = _item.fromUserAvatar;
						item.toTargetName = _item.fromUserName;
						console.log("item.toTargetName", item.toTargetName);
					}

					// console.log(2,item);
					var date = new Date();
					let mouth = date.getMonth() + 1
					if (mouth < 10) mouth = "0" + mouth
					let cureentDate = date.getFullYear() + '-' + mouth + "-" + date.getDate();
					let cureentTime = item.createTime.split(" ")[0]
					let beforeTime = item.createTime.substring(8, 10)
					if (cureentDate == cureentTime) {
						item.createTime = item.createTime.split(" ")[1]
					} else if ((date.getDate() - 1) == beforeTime) {
						item.createTime = "昨天"
					}
					// if (item.way == "P2R") {
					// 	this.getGroup(item)
					// }
					if (item.alias) {
						item.imgName = item.alias.slice(0, 1)
					} else if (item.fromUserName) {
						item.imgName = item.fromUserName.slice(0, 1)
					} else if (item.toTargetName) {
						item.imgName = item.toTargetName.slice(0, 1)
					}
					return item
				})
				// this.getList();
				console.log(this.list, '-----')
			},
			// async getGroup(item) {
			// 	const {
			// 		data
			// 	} = await chatHttp({
			// 		url: '/v1/room/get',
			// 		method: 'post',
			// 		data: {
			// 			rid: item.toTarget
			// 		}
			// 	})
			// 	item.toTargetAvatar = data.avatar
			// 	item.toTargetName = data.name

			// }
		}
	}
</script>

<style lang="scss">
	.chat-list {
		// padding: 0 30rpx;
	}

	.msgItem {
		// height: 90rpx;
		padding: 45rpx 0;
		width: 100%;
		border-bottom: 1rpx solid #EBEBEB;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.avtor {
		image {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
		}

		view {
			background-color: #7FA7DA;
			width: 90rpx;
			height: 90rpx;
			border-radius: 10rpx;
			text-align: center;
			line-height: 90rpx;
			color: #FFFFFF;
			font-size: 40rpx;
			// font-weight: bold;
		}

		margin-right: 20rpx;

	}

	.left {
		overflow: hidden;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		// margin-right: 20rpx;
		// flex: 1;
	}

	.ellipsis1 {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.name {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #1A1A1A;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.msgContent {
		margin-top: 12rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.right {
		text-align: right;
		width: 230rpx;
	}

	.time {

		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #B3B3B3;
	}

	.unread {
		margin-top: 30rpx;
		width: 32rpx;
		height: 32rpx;
		background: #FA632D;
		border-radius: 50%;
		text-align: center;
		line-height: 32rpx;
		color: #FFFFFF;
		font-size: 22rpx;
	}
</style>
