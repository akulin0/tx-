<template>
	<web-view :src="preUll+docUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				// preUll: 在线显示解析的服务地址
				// docUrl: 文档地址

				// preUll: 'http://view.xdocin.com/xdoc?_xdoc=', //云文档服务 http://view.xdocin.com/index.html 
				// preUll: 'http://view.officeapps.live.com/op/view.aspx?src=', //微软接口
				// docUrl: 'http://61.155.209.43:7007/static/pdfs/patientSign/32052419680121611X-7174.docx',
				// docUrl: 'http://view.xdocin.com/doc/preview.docx',
			}
		},
		mounted() {
			var currentWebview = this.$scope
			console.log(currentWebview)
		},
		props: {
			preUll: { //解析器地址
				type: String,
				default: 'http://view.xdocin.com/xdoc?_xdoc=' //云文档服务 http://view.xdocin.com/index.html 
			},
			docUrl: { //文档地址
				type: String,
				require: true
			}
		}

	}
</script>

<style>

</style>
