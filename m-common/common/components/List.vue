<template>
	<view class="list-page" :style="{
	  backgroundColor: backgroundColor,
	}">
		<slot></slot>
	</view>
</template>

<script>
	import MescrollMixin from "@/m-common/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/m-common/mescroll-uni/mescroll-uni.vue";
	
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollUni,
		},
		props: [ 'size','backgroundColor','statusBarHeights'],
		data() {
			return {
				upOption: {
					page: {
						size: this.size
					},
					textNoMore:'-- 没有更多了 --',
					empty: {
						use: true, // 是否显示空布局
						icon: "/static/noData.png", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
						tip: '~ 暂无数据 ~' // 提示
					}
				},
				isSkeleton: true,
			};
		},
		methods: {
			// downCallback(){
			// 	this.mescroll.resetUpScroll();
			// },
			upCallback(page) {
				console.log('page', page);
				this.$emit("getData",page.num);
			},
			end(opt) {
				this.mescroll.endBySize(opt.curPageLen,opt.totalSize);
				this.isSkeleton = false;
			}
		},
	};
</script>
<style scoped lang="scss">
	.list-page {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-bottom));
		overflow: hidden;
	}
</style>
