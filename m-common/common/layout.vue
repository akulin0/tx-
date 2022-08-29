<template>
	<view>
		<slot></slot>
		<!-- input 输入框弹窗 -->
	<!-- 	<mInput/> -->
	</view>
</template>

<script>
	// import mInput  from "../modal/m-input.vue"
	export default {
		data() {
			return {
				type:"",
			}
		},
		components:{
			mInput
		},
		methods: {
			//显示页面
			show(type,data){
				this.type = type;
				uni.hideTabBar();
			},
			hide(){
				uni.showTabBar();
			}
		}
	}
</script>

<style>
</style>
