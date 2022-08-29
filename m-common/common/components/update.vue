<template>
	
	<view class="update">
		<view class="mske"></view>
		<view class="content">
			<view class="body">
				<image src="https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/update.png"></image>
				<view class="button" @click="download">立即下载</view>
			</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		props:["option"],
		data() {
			return {
				show: true
			}
		},
		methods: {
			download(){
				FL.r_upgrade({
				  apk: this.option.packUrl,
				});
			},
		}

	}
</script>

<style scoped lang="scss">
	.update {
		.mske{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0,0,0,.5);
			z-index: 999;
		}
		
		
		.content{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 999;
			.body{
				width: 570rpx;
				
				
				position: relative;
				
				image {
					width: 570rpx;
					height:681rpx;
				}
			}
			
			.button{
				background:#eb160e;
				border-radius: 100rpx;
				position: absolute;
				bottom: 50rpx;
				left: 35rpx;
				width: 500rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 20rpx;
				box-sizing: border-box;
				
			}
			
		}
		
	}
</style>
