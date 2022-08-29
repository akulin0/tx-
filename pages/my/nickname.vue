<!-- 昵称 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="flex-j-a input-box">
				<view class="flex-align" style="flex: 1;">
					<view class="title1 font-body">{{$t('ibinz.msg122',['昵称'])}}</view>
					<input maxlength="10" class="uni-input" focus :placeholder="placeholder" v-model="name" />
				</view>
				<image src="/static/my/del.png" mode="" style="width: 30rpx;height: 30rpx;" v-if="name" @click="del()"></image>
			</view>
			<view class="btn flex-center color-r font-l" :class="[!name?'btn1':'']" @click="goBack()">{{$t('home.txt56',['确认'])}}</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				name:'',
				navTitle:this.$t('ibinz.msg122',['昵称']),
				placeholder:this.$t('ibinz.msg125',['请输入昵称'])
			}
		},
		components: {
	
		},
		onLoad() {
			
	
		},
		onShow: function() {
	
		},
		onPullDownRefresh() {
	
		},
		methods: {
			async goBack(){
				if(this.name){
					const {data} =await request({
						url:'/update-nickname',
						method:'post',
						data:{
							"nick_name":this.name
						}
					})
					uni.showToast({
						title:this.$t('ibinz.msg140',['昵称设置成功']),
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
					
				}else{
					uni.showToast({
						title:this.$t('ibinz.msg141',['输入内容不能为空!']),
						icon:'none'
					})
				}
				
			},
			del(){
				this.name=''
			}
		}
	
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 11rpx 30rpx 0;
	}
	.input-box{
		padding: 37rpx 0;
		border-bottom: 1px solid #E6E6E6;
		.title1{
			width: 28%;
		}
		input,textarea{
			font-size: 28rpx;
			flex: 1;
		}
		textarea{
			height: 100rpx;
		}
	}
	.btn{
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 87rpx;
		border-radius: 44rpx;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}
	.btn1{
		opacity: 0.5;
	}
</style>

