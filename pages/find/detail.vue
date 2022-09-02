<template>
	<base-layout class="main">
		<u-navbar  v-if="!isTx()" :is-back="true" :is-fixed="true" :title="navTitle" title-color="#333333" :title-bold="true">
		</u-navbar>
		<view v-if="$i18n.locale == 'en-US'">
			<view class="pic" style="background-image: url(/static/find/bg-banner-r-z.png);" v-if="type==0"></view>
			<view class="pic" style="background-image: url(/static/find/bao-e.png);" v-else></view>
		</view>
		<view v-else>
			<view class="pic" style="background-image: url(/static/find/bg-banner-l-z.png);" v-if="type==0"></view>
			<view class="pic" style="background-image: url(../../static/find/bao.png);" v-else></view>
		</view>
	</base-layout>
</template>

<script>
	import {
		infoRequest
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				type: 0, //0 收付有礼详情1抱一抱详情
				imageURL: "",
				navTitle: this.$t('find.msg1', ['详情'])
			}
		},
		onLoad(opt) {
			this.type = opt.type
			if (opt.type == 0) {
				this.imageURL = "/static/find/shou.png"
			} else {
				this.imageURL = "/static/find/bao.png"
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.main {}

	.pic {
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
	}
</style>
