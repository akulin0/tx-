<!-- 助记词登录 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"   back-icon-name="nav-back" back-icon-size="40" back-icon-color="#333333" title-width="400" :title-size="$i18n.locale=='en-US'?'28':''">
			<!-- <view slot="right" class=" slot-right" :class="[$i18n.locale=='en-US'?'font-s':'font-body']">
				<view @click="toPage('/pages/login/accountLogin')">{{$t('login.msg2',['邮箱登录'])}}</view>
			</view> -->
		</u-navbar>
		<view class="content">
			<view class="text">{{$t('login.msg27',["请根据您备份到的助记词，按顺序选择填充"])}}</view>
			<view class="box">
				<view v-for="(item,index) in inputList" class="list case">
					<input type="text" v-model="list[item.key]"/>
				</view>
			</view>
		</view>
		<view class="btn flex-center color-r font-l" :class="[!list.inp1 || !list.inp2 || !list.inp3 || !list.inp4 || !list.inp5 || !list.inp6 || !list.inp7 || !list.inp8 || !list.inp9 || !list.inp10 || !list.inp11 || !list.inp12?'btn1':'']" @click="save()">{{$t('login.msg6',['登录'])}}</view>
		<view class="flex-align title-box">
			<image src="/static/biticon/select.png" mode="" class="imgs" v-if="isCheck"  @click="isCheck=false"></image>
			<image src="/static/biticon/noselect.png" mode="" class="imgs" v-else @click="isCheck=true"></image>
			<!-- <view class="font-s">{{$t('login.msg9',['我已经阅读并同意'])}} <span @click="toPage('/pages/agreement?type=1')">《{{$t('login.msg10',['用户服务协议'])}}》</span>{{$t('login.msg28',['和'])}}<span @click="toPage('/pages/agreement?type=2')">《{{$t('login.msg11',['隐私政策'])}}》</span></view> -->
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
				list:{
					inp1:'',
					inp2:'',
					inp3:'',
					inp4:'',
					inp5:'',
					inp6:'',
					inp7:'',
					inp8:'',
					inp9:'',
					inp10:'',
					inp11:'',
					inp12:'',
				},
				inputList:[
					{
						key:'inp1'
					},
					{
						key:'inp2'
					},
					{
						key:'inp3'
					},
					{
						key:'inp4'
					},
					{
						key:'inp5'
					},
					{
						key:'inp6'
					},
					{
						key:'inp7'
					},
					{
						key:'inp8'
					},
					{
						key:'inp9'
					},
					{
						key:'inp10'
					},
					{
						key:'inp11'
					},
					{
						key:'inp12'
					}
				],
				isCheck:false,
				navTitle:this.$t('home.txt122',['验证助记词'])
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
			async save(){
				//清空原密码
				uni.removeStorageSync("password");
				if(!this.list.inp1 || !this.list.inp2 || !this.list.inp3 || !this.list.inp4 || !this.list.inp5 || !this.list.inp6 || !this.list.inp7 || !this.list.inp8 || !this.list.inp9 || !this.list.inp10 || !this.list.inp11 || !this.list.inp12){
					return
				}else if(this.isCheck==false){
					uni.showToast({
						title:this.$t('login.msg35',['请先阅读并同意《用户服务协议》和《隐私政策》']),
						icon:'none'
					})
				}else{
					let account=''
					// this.list.map((item)=>{
					// 	console.log("item: ",item);
					// })
					for(let item in this.list){
						account+=this.list[item]+' '
					}
					console.log("account: ",account);
					const {data,errorMessage} = await request({
						url:'/login-by-mnemonics',
						method:'post',
						data:{
							"account":account,
							
						}
					})
					console.log("data: ",data);
					uni.setStorageSync("token", data.token)
					uni.setStorageSync("auid", data.id)
					uni.setStorageSync("password", data.password)
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
			},
			toPage(url){
				uni.navigateTo({
					url:url
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.slot-right {
		margin-right: 30rpx;
	}
	.content{
		padding: 49rpx 30rpx 40rpx;
		.box{
			background: #F4F4F4;
			border-radius: 20rpx;
			padding: 28rpx 28rpx 8rpx;
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			width: 640rpx;
			height: 492rpx;
			
			.list{
				width: 30%;
				margin-bottom: 20rpx;
				input{
					height: 80rpx;
					background-color: #FFFFFF;
					padding: 0 16rpx;
				}
			}
			
		}
	}
	.btn {
		width: 599.1rpx;
		height: 110rpx;
		margin:80rpx auto 50rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		
		background: #3A83F7;
		// box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}
	.btn1 {
		// opacity: 0.5;
		position: relative;
		top: 100rpx;
	}
	
	.title-box {
		margin-left: 50rpx;
		position: fixed;
		bottom: 66rpx;
		.imgs {
			width: 24rpx;
			min-width: 24rpx;
			height: 24rpx;
			margin-right: 11rpx;
		}
	}
	span{
		color: #2DA5E1;
	}
	
	.text {
		 text-align: center;
	}
	
	.case {
		position: relative;
		top: 20rpx;
		
	}
</style>
