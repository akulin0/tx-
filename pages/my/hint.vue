<!-- 风险提示 -->
<template>
	<base-layout>
		<u-navbar  v-if="!isTx()" :is-back="true" :is-fixed="true" :title="navText" :title-bold="true" style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="text">
			<rich-text :nodes="data.rich"></rich-text>
		</view>
	</base-layout>
</template>

<script>
	import { riskWarning } from "@/config";
	const type = {
		"1":{
			rich:riskWarning
		}
	}
	export default {
		data() {
			return {
				data:type["1"],
				navText:this.$t('ibinz.msg117',['风险提示'])
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

		}

	}
</script>

<style lang="scss" scoped>
	.text {
		padding: 30rpx;
		view{
			line-height: 1.5;
			font-size: 30rpx;
		}
	}
</style>
