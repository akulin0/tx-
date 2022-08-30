<template>
	<view>
		<slot></slot>
	</view>
</template>

<script>
	import { project } from "@/config.js";
 	export default {
		data() {
			return {
				isShowIndexPop: false,
				login: "",
				setHeight: 0,
				option: {},
				showuppop: false,
			};
		},
		created() {
			// var _this = this;
			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		_this.setHeight = `${(res.screenHeight - 80) * 2}`;
			// 	},
			// });

			// uni.$on("__login", (type, option) => {
			// 	// #ifndef  MP-WEIXIN
			// 	const __agreement = uni.getStorageSync("__agreement");
			// 	//#endif
			// 	// #ifdef  MP-WEIXIN
			// 	const __agreement = 1000
			// 	//#endif
			// 	if (__agreement || type == "update") {
			// 		this.login = type;
			// 		this.show = !!type;
			// 		this.option = option;
			// 		// !!type ? uni.hideTabBar() : uni.showTabBar();
			// 	} else {
			// 		uni.$emit("__agreement", true);
			// 	}
			// });
			// if(project=='group') {
			// 	uni.$on("__showIndexPop", (type) => {
			// 		this.isShowIndexPop = type;
			// 	})
			// } 
			

			// uni.$on("__agreement", (type, isTrue) => {
			// 	this.showuppop = type;

			// 	if (isTrue) {
			// 		uni.setStorageSync("__agreement", "1000");
			// 	}
			// })
			// const isNoLogin = !uni.getStorageSync("token");
			// const __agreement = uni.getStorageSync("__agreement");
			// if (isNoLogin && !__agreement) {
			// 	uni.$emit("__agreement", isNoLogin);
			// }
		},
		methods: {
			indexPopClose() {
				uni.$emit("__showIndexPop", false);
				uni.showTabBar();
			},
			goTx() {
				uni.$emit("__showIndexPop", false);
				uni.showTabBar();
        this.toPage("/pages/my/myWallet?state=1")
			},
			close() {
				uni.$emit("__login", "");
			},
		},
	};
</script>


<style lang="scss">
	.indexPop {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.indexPop_ {
		position: relative;
	}

	.indexPopBg {
		width: 750rpx;
		height: 100vh;
		background: #000000;
		opacity: 0.8;
		position: absolute;
		top: 0;
		left: 0;
	}

	.indexPOPItem {
		width: 750rpx;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.close {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: -25rpx;
		top: -25rpx;
	}

	.indexPopJInb {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		top: 126rpx;

		font-size: 52rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #f35425;
	}

	.text {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		top: 200rpx;

		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #bf8154;

		span {
			font-size: 32rpx;
			color: #d62f17;
		}
	}

	.indexPopImg {
		z-index: 88;
		position: relative;

		image {
			width: 577rpx;
			height: 624rpx;
		}
	}

	.fiexd {
		position: fixed;
		top: 0;
		left: 0rpx;
		z-index: 88;
	}
</style>
