<template>
	<view class="msgItem"  @click="goDetail(item)">
		<view class="left">
			<view class="avtor">
				<image :src="item.cover" mode=""></image>
			</view>
			<view>
				<view class="name">
					{{item.title}}
				</view>
				<view class="ellipsis1 msgContent">
					 {{item.contents}}
				</view>
			</view>
		</view>
		<view class="right">
			<view class="time">{{item.createTime}}</view>
			<!-- <view class="unread" v-if="item.isUnread"></view> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['item'],
		methods:{
			goDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/message/msgDetail/msgDetail?id='+item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.msgItem{
		// height: 90rpx;
		padding: 45rpx 0;
		width: 100%;
		
		border-bottom: 1rpx solid #EBEBEB;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.avtor{
		image{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
		}
		margin-right: 20rpx;
		
	}
	
	.left{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-right: 20rpx;
	}
	.name{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #1A1A1A;
	}
	.msgContent{
		margin-top: 12rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	.right{
		display: flex;
		height: 80rpx;
		// justify-content: flex-end;
		flex-direction: column;
		// align-items: flex-start;
	}
	.time{
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #B3B3B3;
	}
	.unread{
		margin-top: 30rpx;
		width: 14rpx;
		height: 14rpx;
		background: #FA632D;
		border-radius: 50%;
		
	}
</style>
