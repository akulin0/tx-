<template>
	<view>
		<view class="" style="height: 40rpx;">
			
		</view>
		<view class="title">
				
				<view class="back" @click="goback">
					<image src="/static/message/retrun.png.png" mode=""></image>
				</view>
				<view class="name">
					<view class="titleName">{{title.name}}</view>
					<view class="status">{{title.status}}</view>
				</view>
		
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['title'],
		methods:{
			goback(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.titleName{
		
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.status{
		
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;
	}
	.title{
			padding: 0 30rpx;
		height: 88rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.back{
		width: 33%;
		image{
			width: 18rpx;
			height: 30rpx;
		}
	}
	.name{
		width: 33%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
</style>
