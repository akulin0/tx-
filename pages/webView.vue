<template>
	<base-layout>
		<view>
			<!-- <u-navbar :is-back="true" :is-fixed="true" title="我的客服" ></u-navbar> -->
			<!-- #ifdef MP-WEIXIN -->
			<web-view :webview-styles="webviewStyles" :src="url" title=""></web-view>
			<!-- #endif -->
			<web-view :src="url" title=""></web-view>
		</view>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(opt) {

			if (opt.url.length > 0) {
				let _url = opt.url;
				
					this.url = opt.url;
				
				
			}
			
		}

	}
</script>

<style>

</style>
