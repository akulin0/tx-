<!-- 多语言 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navTitle" :title-bold="true"
			style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view v-for="(item,index) in list" class="list flex-j-a font-body" @click="check(item.lang)">
				<view>{{item.title}}</view>
				<image src="/static/my/gou.png" mode="" class="img" v-if="checkLang==item.lang"></image>
			</view>
		</view>
		<view class="btn flex-center color-r font-l" @click="save">{{$t('home.txt56',['确认'])}}</view>
	</base-layout>
</template>

<script>
	import i18n, {
		changeLang
	} from "@/lang/index.js"
	const locale = {
		"简体中文": "zh-CN",
		"English": "en-US",
		"हिन": "en-US",
	}

	const _lang = {
		"zh-CN": "简体中文",
		"en-US": "English",
	}
	export default {
		data() {
			return {
				list: [{
						title: '简体中文',
						lang:'zh-CN'
					},
					{
						title: 'English',
						lang:'en-US'
					},
					// {
					// 	title: 'हिन'
					// }
				],
				choose: 0,
				navTitle: this.$t('ibinz.msg105', ['多语言']),
				checkLang:'zh-CN'
			}
		},
		components: {

		},
		onLoad() {


		},
		onShow: function() {
			this.checkLang=uni.getStorageSync('CURRENT_LANG')
			console.log("语言 ",uni.getStorageSync('CURRENT_LANG'));
		},
		onPullDownRefresh() {

		},
		methods: {
			check(index) {
				this.checkLang = index
			},
			save() {
				// console.log("value: ",value);
				let _locale =''
					_locale=this.checkLang
				
				console.log(_locale, '什么语言');
				changeLang(_locale);
				// uni.navigateBack({
				// 	delta: 1
				// })
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 11rpx 30rpx 0;
	}

	.list {
		border-bottom: 1px solid #E6E6E6;
		padding: 36rpx 0;

		.img {
			width: 30rpx;
			height: 21rpx;
		}
	}

	.btn {
		width: 650rpx;
		height: 88rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 98rpx;
		border-radius: 44rpx;
		
background: #2DA5E1;
		box-shadow: 0px 2rpx 10rpx 0px rgba(23, 119, 226, 0.4);
	}
</style>
