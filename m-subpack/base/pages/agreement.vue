<template>
	<view class="agreement">
		<u-navbar  v-if="data.title=='玩法介绍'"  :is-fixed="true" :background="background"></u-navbar>
		<u-navbar :is-fixed="true" :title="data.title" v-else></u-navbar>
		
		<!-- logo -->
		<view v-if="data.title=='玩法介绍'" style="position: absolute;top: 0;">
			<rich-text :nodes="data.rich"></rich-text>
		</view>
		<view class="content" v-else>
			<rich-text :nodes="data.rich"></rich-text>
		</view>
		
	</view>
</template>

<script>

	import { userAgreement,privacyPolicy,about,grade,Playgame } from "@/config";
	
	const type = {
		"1":{
			title:"用户服务协议",
			rich:userAgreement
		},
		"2":{
			title:"隐私政策",
			rich:privacyPolicy
		},
		"3":{
			title:"关于我们",
			rich:about
		},
		"4":{
			title:"等级说明",
			rich:grade
		},
		"5":{
			title:"玩法介绍",
			rich:Playgame
		}
	}

	export default {
		data() {
			return {
				data:type["1"],
				background:{
					backgroundColor:'none'
				}
			};
		},
		onLoad(opt){
			this.data = type[opt.type];
			console.log("this.data: ",this.data);
			// this.state=opt.type
		},
	}
</script>

<style lang="scss" scoped>
	.agreement {
		background-color: #fff;
		min-height: 100vh;
	}
	.content{
		padding: 32rpx;
	}
</style>
