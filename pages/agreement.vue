<template>
	<base-layout>
		<view>
			<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"
				style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
				<view style="padding: 30rpx;" v-if="type != 5">
					<rich-text :nodes="content"></rich-text>
					
				</view>
				<view v-else>
					<image v-if="$i18n.locale == 'zh-CN'" class="about-img" src="../static/about-z.jpg"></image>
					<image v-else class="about-img" src="../static/about-e.jpg"></image>
				</view>
		</view>
	</base-layout>
</template>

<script>
	import {
		request, infoRequest
	} from "@/m-subpack/base";
	export default {
		data() {
			return {
				url: "",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				type: '',
				content: '',
				navTitle: ''
			}
		},
		onLoad(opt) {
			this.type = opt.type
			console.log(this.type);
			switch (this.type) {
				case '1':
					this.navTitle = this.$t('ibinz.msg146', ['用户协议'])
					break;
				case '2':
					this.navTitle = this.$t('ibinz.msg147',['隐私政策'])
					break;
				case '3':
					this.navTitle = this.$t('ibinz.msg148',['关于我们'])
					break;
				case '4':
					this.navTitle = this.$t('ibinz.msg161', ['风险提示'])
					break;
				case '5':
					this.navTitle = this.$t("hisbag.txt10", ["关于"])
					break;
				default:
					break;

			}
			if(this.type != 5){
				this.getData()
			}
		
		},
		
		methods: {
			async getData() {
				uni.showLoading({
				  title: this.$t("ibinz.msg48", ["加载中"]),
				});
				let {
					data
				} = await infoRequest({
					url: '/news/list/find_html',
					method: 'get',
					header:{
						lang:this.$i18n.locale
					},
					params: {
						"url": `/pages/agreement?type=${this.type}`,
					}
				})
				 uni.hideLoading();
				this.content = `${data.htmlTxt}`;
			
				// console.log("this.content: ",this.content);
			}
		}

	}
</script>

<style>
	.about-img{
		width: 750rpx;
		height: 1688rpx;
	}
</style>
