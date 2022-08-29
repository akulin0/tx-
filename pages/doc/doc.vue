<template>
	<view>
		<me-preview-word :docUrl="url"></me-preview-word>
	</view>
</template>

<script>
	import mePreviewWord from '@/components/me-preview-word/me-preview-word'
	export default {
		data() {
			return {
				url: '',
				title: '',
				view: {},
			}
		},
		onLoad(options) {
			this.url = options.url
			this.title = options.title
			this.view = new plus.nativeObj.View('aps', {
				bottom: '80px',
				zIndex: '10',
				left: '20px',
				height: '30px',
				width: '60px'
			});
			//给view填充背景。
			this.view.drawRect({
				color: 'rgba(91,183,28,1)',
				borderWidth: '2px',
				radius: '14px'
			}, {
				top: '0px',
				left: '0px',
				width: '100%',
				height: '100%'
			});
			//给view加上文字
			this.view.drawText('下载', {
				top: '0px',
				left: '0px',
				width: '100%',
				height: '100%'
			}, {
				align: 'center',
				color: '#fff'
			});
			//给按钮加上点击事件
			this.view.addEventListener("click", this.download, false)
			//让view显示出来
			this.view.show()
			

		},
		onUnload() {
			//#ifdef APP-PLUS
					this.view.close()
				//#endif
		},
		methods: {
			download() {
				uni.showLoading({
					title:'下载中..'
				})
				uni.downloadFile({
					url: this.url,
					success(res) {
						if (res.statusCode === 200) {
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: (red) => {
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存：' + red.savedFilePath, //保存路径
										duration: 3000,
									});
								}
							})
						}
					}
				})
			}
		},
		components: {
			mePreviewWord,
		},
	}
</script>

<style lang="scss">
	.slot-wrap {
		margin-right: 35rpx;
	}
</style>
