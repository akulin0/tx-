<template>
	<mescroll-uni :fixed="false" :up="upOption" :down="downOption" @init="mescrollInit" @down="downCallback" @up="upCallback"
	 class="list-body">
		<slot name="content" :isSkeleton="isSkeleton" :data="List"></slot>
	</mescroll-uni>

</template>

<script>
	import MescrollMixin from "@/m-common/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/m-common/mescroll-uni/mescroll-uni.vue";
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollUni,
		},
		props: ["size", "keys", "init","upuse"],
		watch: {
			init(value) {
				console.log(this);
				
				if (value && this.isSkeleton) {
					this.mescroll.resetUpScroll(false);
				}
			},
		},
		data() {
			console.log("init",this.init);
			return {
				List: [],
				downOption: {
					auto: this.init || false,
				},
				upOption: {
					use:  true,
					auto: this.init || false,
					page: {
						size: this.size,
					},
					textNoMore: "-- 没有更多了 --",
					empty: {
						use: true, // 是否显示空布局
						icon: "/static/noData.png", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
						tip: "~ 暂无数据 ~", // 提示
					},
				},
				isSkeleton: true,
			};
		},
		created() {
			// this.upOption.use = this.upuse

		},
		methods: {
			reload(){
				this.mescroll.resetUpScroll(false);
			},
			upCallback(page) {
				console.log("page", page);
				this.$emit(
					"getData", {
						pageIndex: page.num,
						keys: this.keys,
					},
					(opt) => {
						console.log("opt",opt);
						if (opt.pageIndex == 1) {
							this.List = opt.data;
						} else {
							this.List = this.List.concat(opt.data);
						}
						this.isSkeleton = false;
						this.mescroll.endBySize(opt.curPageLen, opt.totalSize);
					}
				);
			}
		},
	};
</script>
<style scoped lang="scss">
	.list-body {
		height: 100%;
	}
</style>
