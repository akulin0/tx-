<!-- 公告详情 -->
<template>
	<base-layout>
		<u-navbar :is-back="true" :is-fixed="true" :title="navText" :title-bold="true"  style="border-bottom: 1px solid #E6E6E6;"></u-navbar>
		<view class="content">
			<view class="font-max font-w title">{{info.title}}</view>
			<view class="time font-s">{{info.create_time}}</view>
			<rich-text :nodes="content"></rich-text>
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
				id:'',
				info:{},
				content: '', //文本内容
				navText:this.$t('find.msg1',['详情']),
				auid: uni.getStorageSync("auid") || {}
				
			}
		},
		components: {

		},
		onLoad(option) {
			this.id=option.id
			this.getData()
		},
		onShow: function() {

		},
		onPullDownRefresh() {

		},
		methods: {
			async getData() {
				const {
					data
				} = await infoRequest({
					url: '/notice-get',
					method: 'get',
					params: {
						id: this.id,
						uid: this.auid
					}
				})
				this.content = this.formatRichText(data.content);
				this.info=data;
				console.log("data: ",this.info);
			},
			goodsDetail() {
				
			},
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText(html){
			  let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
			    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			    return match;
			  });
			  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
			    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
			    return match;
			  });
			  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
			  return newContent;
			}
		}

	}
</script>
	
<style lang="scss" scoped>
	.content{
		padding: 0 32rpx;
	}
	.title{
		text-align: center;
		width: 100%;
		margin: 50rpx 0 60rpx;
	}
	.time{
		color: #B3B3B3;
		margin-bottom: 37rpx;
	}
</style>
