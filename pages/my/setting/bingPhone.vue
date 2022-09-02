<!-- 绑定手机号 -->
<template>
	<base-layout>
		<u-navbar v-if="!isTx()"  :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
	</base-layout>
</template>

<script>
	export default {
		data() {
			return {
				navTitle:this.$t('ibinz.msg96',['风险提示'])
	
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




