<!-- 我的页面 -->
<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :title="navTitle" style="border-bottom: 1px solid #E6E6E6;"
			:title-bold="true" :custom-back="goBack"></u-navbar>
			<view class="usermoney">
				<view class="flex-j-a">
					<view v-for="(item,index) in list" :key='index' class="transitem" @click="topage(item.u)">
						<image class="trans" :src="`/static/index/trans${index}.png`" mode="aspectFit"></image>
						<view style="text-align:center;" :style="{fontSize:$i18n.locale == 'en-US'?'22rpx':''}" :class="$i18n.locale == 'en-US'?'us-class':''" class="fon">{{item.t}}</view>
					</view>
				</view>
				<view style="align-items: center;display: flex;margin-top: 60rpx;">
					<view class="line2"></view>
					<view style="margin-left:12rpx;font-size: 36rpx;font-weight: bold;">
						{{$t('home.txt121',['转账历史'])}}
					</view>
				</view>
				<noData v-if="dataList.length<1"></noData>
				<view v-else class="list-items" v-for="(item,index) in dataList" @click="clickDetails(item)">
					<view class="list-box">
						<!-- 转出 -->
						<image src="/static/index/out.png" style="width: 38rpx;height: 30rpx;margin-right:20rpx;margin-bottom: 56rpx;"  v-if="item.address==walletInfo.address"></image>
						<!-- 转入 -->
						<image src="/static/index/shift.png" style="width: 38rpx;height: 30rpx;margin-right:20rpx ;margin-bottom: 56rpx;" v-else></image>
						<view>
							<view class="font-t" v-if="item.address==walletInfo.address">{{item.target_address | setAddress}} <span class='status' :style="item.status == 1 ?'color:#28DB54':item.status== 0 ?'color:#FF8B00':'color:#ff3344'">
							{{item.statusName}}
							</span></view>
							<view class="font-t" v-else>{{item.address | setAddress}} <span class='status' :style="item.status == 1 ?'color:#28DB54':item.status== 0 ?'color:#FF8B00':'color:#ff3344'">{{item.statusName}}</span></view>
							<view class="color-main font-m" style="margin-top:18rpx" >{{item.create_date}}</view>
							<view class="color-main font-m text" v-if="item.remark">{{$t('home.txt112',['备注'])}}：{{ item.remark }}</view>
						</view>
					</view>
					<view class="box" v-if="item.status !=2">
						<view style="margin-top: 34rpx;"><span v-if="item.address==walletInfo.address && item.amount!=0">-</span><span v-if="item.address!=walletInfo.address&& item.amount!=0">+</span>{{item.amount}}</view>
					</view>
				</view>
				<view class="more" v-if="isNoMore=='nomore' && dataList.length != 0">{{$t('find.msg12',['没有更多了'])}}</view>
			</view>
		</view>
	</base-layout>
</template>

<script>
	import 
		noData
	 from "@/m-common/common/components/noData.vue";
	import {
		request,
		navigateTo
	} from "@/m-subpack/base";
  import {toTabBar} from '../../libs/utils';
	export default {
		data() {
			return {
				list: [{
						t: this.$t('home.txt80',['直接转账']),
						u: "directTransfer"
					},
					{
						t: this.$t('home.txt119',['地址簿转账']),
						u: "/pages/my/addressBook"
					},
					{
						t: this.$t('home.txt120',['扫码转账']),
						u: ""
					},
				],
				info: {},
				walletInfo:{},
				dataList:[],
				navTitle:this.$t('home.txt117',['转账']),
				page: 1,
				limit: 10,
				isNoMore: "none",
			}
		},
		onLoad(opt) {
			if(opt.info) this.info =  JSON.parse(opt.info) || {otherType:''}
			else this.info ={}
			this.walletInfo = uni.getStorageSync("currentWallet")
			this.getRecord()
			console.log("walletInfo: ",this.walletInfo);
		},
		onReachBottom() {
			if (this.isNoMore == "nomore") return;
			this.getRecord();
		},
		components:{
			noData
		},
		filters:{
			setAddress(val){
				if(!val){
					return '';
				}
				return val.slice(0, 9) + '...' + val.slice(-9)
			},
			setremark(val) {
				if (val == null) {
					return ''
				} 
				else if(val.length>9) {
					return val.slice(0, 9) + '...' 
				} else {
					return val
				}
			}
		},
		methods: {
			//页面跳转
			topage(url) {
				console.log(this.info)
				if (url) {
					if (url == 'directTransfer' && this.info.otherType) {
						uni.navigateTo({
							url: `directTransfer?symbol=${this.info.symbol}&coin_id=${this.info.coin_id}&balance=${this.info.balance}`
						})
					} else if(url == 'directTransfer') {
						uni.navigateTo({
							url: `directTransfer`
						})
					}
					else  {
						uni.navigateTo({
							url: url + `?type=1&info=${JSON.stringify(this.info)}`
						})

					}

				} else {
					uni.scanCode({
						success: function(res) {
							this.demo = res.result
							let isAdd = res.result.startsWith('dlm://address')
							if (isAdd) {
								let arr = res.result.split('/')
								let auid = arr[arr.length - 1]
								console.log("auid: ",auid);
								uni.navigateTo({
									url:'/pages/index/directTransfer?address='+auid
								})
							}
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
						}
					});
				}

			},
			clickDetails(item){
				if(item.status == 1){
					this.walletDetail(item.id);
					
					
				}
			},
			async walletDetail(walletId) {
				let {
					data,
				} = await request({
					url: '/get-transaction-details',
					method: 'get',
					params: {
						id: walletId,
					}
				})
				if(data){
					uni.navigateTo({
						url:`/pages/index/TransactionDetails?Info=${JSON.stringify(data)}`
					})
				}
				
			},
			//获取转账记录
			async getRecord(){
				uni.showLoading({
					title: this.$t('ibinz.msg48',['加载中'])
				})
				let {
					data
				} = await request({
					url: '/transaction',
					method: 'get',
					params:{
						address:this.walletInfo.address,
						page: this.page,
						limit: this.limit
					}
				})
				this.isNoMore = data.length == 0 ? "nomore" : "none";
				this.page++;
				this.dataList = this.dataList.concat(data.map((item)=>{
					if(item.amount==null) item.amount = 0
					return{
						...item,
					
						statusName: this.getName(item.status, item.type)
						
					}
				}))
				uni.hideLoading();
				console.log("data: ",data);
			},
			getName(status, type){
				if(status == 0){
					return this.$t('google.txt13',['区块确认中'])
				//成功 && 转出
				}else if(status == 1 && type == 1){
					return this.$t('google.txt17',['转出成功'])
				//成功 && 转入
				}else if(status == 1 && type == 2){
					return this.$t('google.txt16',['转入成功'])
				}else{
					return this.$t('google.txt15',['转账失败']) 
				}
			},
			goBack(){

        toTabBar('/pages/index/index',0)
      }

		}
	}
</script>

<style lang="scss" scoped>
	.us-class{
		height: 64rpx;
	}
	.status {
		margin-left: 20rpx;
	}
	.usermoney {
		padding: 30rpx;

		.list-items {
			height: 164rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 1px solid #E6E6E6;
				.list-box {
					display: flex;
					width: 85%;
					align-items: center;
					flex-direction: row;
					.imgss {
						min-width: 37rpx;
						width: 37rpx;
						height: 31rpx;
						margin-right: 19rpx;
					}
			
					.text {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1; //设置显示几行
						-webkit-box-orient: vertical;
					}
				}
			
				.box {
					flex: 1;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
			
					.img2 {
						width: 24rpx;
						height: 25rpx;
						margin-top: 17rpx;
					}
				}	
		}

		.demox {
			overflow: hidden;
			word-break: break-all;
			/* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;
			/* 超出部分省略号 */
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2;
		}

		.trans {
			width: 62rpx;
			height: 62rpx;
			position: relative;
			top: 10rpx;
		}

		.line2 {
			width: 8rpx;
			height: 32rpx;

			background: linear-gradient(0deg, #17a7f8, #17a7f8c9);
			border-radius: 4rpx;
		}

		.transitem {
			width: 216rpx;
			height: 152rpx;
			background: #FFFFFF;
			box-shadow: 0px 1px 16rpx 0px rgba(36, 56, 211, 0.12);
			border-radius: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin: 10rpx;
			image {
				margin-bottom: 20rpx;
			}
		}
		
		.fon {
			font-size: 26rpx;
			width: 109rpx;
			height: 25rpx;
			white-space : nowrap;
		}
	}
</style>
