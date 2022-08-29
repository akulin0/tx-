<template>
	<base-layout>
		<view>
			 <web-view :src="url"></web-view>
		</view>
	</base-layout>
</template>

<script>
	export default{
		data(){
			return{
				url:''
			}
		},
		onLoad(option) {
			this.url=option.url
		}
	}
</script>

<style>
	
</style>
