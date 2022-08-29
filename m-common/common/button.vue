<template>
	<view class="i-button flexcenter" @click="buttonClick" :class="{
		'i-button-disable':disable,
		'i-button':!disable,
	}">
		
		<u-loading mode="flower" v-if="isLoading" color="#fff" size="42"></u-loading>
	
		<block v-if="!isLoading"> {{title}}</block>
	</view>
</template>

<script>
	export default {
		props: ["title","disable","submit"],
		data() {
			return {
				isLoading: false,
			}
		},
		methods: {
			 buttonClick() {
				if( this.disable) return;
				if(this.isLoading)return;
				this.isLoading = true;
				this.$emit("submit");	
			},
			hideLoading(){
				this.isLoading = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flexcenter{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.i-button {
		margin-top: 80rpx;
		background: $button-background;
		border-radius: $button-border-radius;
		color: #fff;
		height: 96rpx;
	}
	
	
	.i-button-disable{
		margin-top: 80rpx;
		background: $disable-color;
		border-radius: $button-border-radius;
		color: #fff;
		height: 96rpx;
	}

	
</style>
