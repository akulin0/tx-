<template>
	<base-layout>
		<ChatDetails ref="ChatList"  :type="type"  />
    <u-navbar v-if="!isTx()" :is-back="true" :is-fixed="true" title="意见反馈" :title-bold="true"
              style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
	</base-layout>
</template>

<script>
	import ChatDetails from "@/m-common/m-chat/components/details1.vue"
	
	export default {
		data() {
			return {
				receiveTarget: "",
				toTarget: "",
				toTargetAvatar: "",
				toTargetName: "",
				untoTargetName: "",
				number: 0,
				remark: '',
				type: '',
				fromUser:'',
				isNoMore: '',
				way: '' //P2P:一对一  P2R：一对多
			}
		},
		
		onLoad(opt) {
			// this.toTarget = opt.toTarget;
			// this.share = opt.share;
			// this.fromUser = opt.fromUser;
			// this.receiveTarget = opt.receiveTarget;
			// this.toTargetName = opt.toTargetName;
			// this.toTargetAvatar = opt.toTargetAvatar;
			// console.log(this.toTargetAvatar, '头像哦');
			// this.untoTargetName = opt.untoTargetName;
			// this.number = opt.number;
			// this.remark = opt.remark;
			// this.way = opt.way;
			// this.type = opt.type;
			// uni.setNavigationBarTitle({	
			// 	title: this.toTargetName
			// });
			// const that = this
		
		},
		
		async onPullDownRefresh() {
			if (uni.getStorageSync('isNoMore') == 'nomore'){
				uni.stopPullDownRefresh()
				uni.showToast({
					icon:'none',
					title:'已无更多数据'
				})
				return false
			}
			await this.$refs.ChatList.getData();
			uni.stopPullDownRefresh()
		},
		components: {
			ChatDetails,
		},
		watch:{
			toSet(id, way,alias,setTop, isNoMore){
				console.log(isNoMore, 'id, way,alias,setTop, isNoMore');
			}
		},
		methods: {
			//way: P2P:单聊  P2R：群聊
			toSet(id, way,alias,setTop, isNoMore,myWithdraw,tarWithdraw) {
				console.log(id, "传值");
				this.isNoMore = isNoMore;
				uni.navigateTo({
					url: "/pages/message/chatSetting?type=" + way + '&target=' + id+'&alias='+alias+'&setTop='+setTop+'&myWithdraw='+myWithdraw+'&tarWithdraw='+tarWithdraw
				})

			}
		}
	}
</script>

<style>

</style>
